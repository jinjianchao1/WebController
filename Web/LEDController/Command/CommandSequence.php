<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016-8-29
 * Time: 16:45
 */

namespace Command;
use Common\Collection;
use Command\CommandBody;
use Command\TWComm;
use Command\PLCComm;
use DAL\PLCDAL;
//use Common\SqliteHelper;
use Common\MysqlHelper;
date_default_timezone_set('prc');

/**
 * Class CommandSequence
 * @package Command
 * 执行命令队列
 */
class CommandSequence
{
    /**
     * @var MysqlHelper
     * 数据库操作类
     */
    var $db;
    /**
     * @var \Command\TWComm
     * 箱体通讯库
     */
    var $twComm;
    var $plcComm;
    var $plcDal;
    /**
     * CommandSequence constructor.
     */
    public function __construct()
    {
        $this->db = new MysqlHelper('localhost', 'root', '', "ledcontroller");
        $this->twComm = new TWComm();
        $this->plcComm = new PLCComm();
        $this->plcDal = new PLCDAL();
    }

    /**
     *
     */
    function __destruct()
    {
        // TODO: Implement __destruct() method.

    }

    /**
     *  命令写入队列数据库
     * @param \Command\CommandBody $command
     * @param int $expire
     */
    public function insertCommand(CommandBody $command, $expire = 60)
    {
        $jsonCode = json_encode($command);
        $this->db->select('MemCache',"`Key`","`Key`='" . $command->commandId . "'");
        $data = $this->db->fetchArray(MYSQL_ASSOC);
//        if(count($data)==0)
//        {
            $sqlArr = array();
            $sqlArr['`Key`'] = $command->commandId;
            $sqlArr['Value'] = $jsonCode;
            $sqlArr['Level'] = $command->getCommandLevel();
            $sqlArr['Status'] = 1;
            $sqlArr['CreateDate'] = $command->getCommandDate();
            $sqlArr['UpdateDate'] = $command->getCommandDate();
            $sqlArr['Tag'] = $command->getTag();
            $lastId = $this->db->insert('MemCache',$sqlArr);
//        }
//        else
//        {
//            $sqlArr = array();
//            $sqlArr['Value'] = $jsonCode;
//            $sqlArr['Level'] = $command->getCommandLevel();
//            $sqlArr['Status'] = 1;
//            $sqlArr['CreateDate'] = date('Y-m-d H:i:s',time());
//            $sqlArr['UpdateDate'] = date('Y-m-d H:i:s',time());
//            $condition = "`Key`='"  .$command->commandId . "'";
//            $this->db->update('MemCache',$sqlArr,$condition);
//        }
    }

    /**
     * 获取命令队列
     * @param $status 0-队列中的所有命令 1-未执行的命令 2-正在执行的明明 3-执行成功 4-执行失败
     * @param string $fields
     * @return array
     */
    public function  getAllCommand($status, $fields='*')
    {
        $result = array();
        if($status==0)
        {
            $sql = "select " . $fields . " from MemCache  ORDER BY id";
        }
        else
        {
            $sql = "select " . $fields . " from MemCache WHERE Status=" . $status . " ORDER BY Level";
        }

        $this->db->query($sql);
        $queryResult = $this->db->fetchArray(MYSQL_ASSOC);
        $result['count'] = count($queryResult);
        $data = array();
        $index = 0;
        foreach($queryResult as $query)
        {
            $data[$index++] = $query;
        }
        $result['data'] = $data;
        return $result;
    }

    /**
     * 执行命令
     * @param $cmdID 命令队列中的ID
     * @return array|null{'status':true|false,'data':obj|null,'msg':str|null}
     */
    public function executeCommand($cmdID)
    {
        $sql = "select * from MemCache WHERE ID=$cmdID";
        $this->db->query($sql);
        $queryResult = $this->db->fetchArray(MYSQL_ASSOC);
        $key = $queryResult[0]["Key"];
        $jsonValue =$queryResult[0]["Value"];
        $paraValue = $jsonValue["commandPara"];
        $tag = $queryResult[0]["Tag"];
        $result = null;
        if($tag==1) {//箱体控制
            switch ($key) {
                case "setBrightness":
                    $percent = $paraValue['percent'];
                    $cs = $paraValue['cs'];
                    $mbAddr = $paraValue['mbAddr'];
                    $moduleAddr = $paraValue['moduleAddr'];
                    $result = $this->executeSetBrightness($cmdID, $percent, $cs, $mbAddr, $moduleAddr);
                    break;
                case "setGamma":
                    $value = $paraValue['value'];
                    $mbAddr = $paraValue['mbAddr'];
                    $moduleAddr = $paraValue['moduleAddr'];
                    $result = $this->executeSetGamma($cmdID, $value, $mbAddr, $moduleAddr);
                    break;
                case "setCalibrationOnOff":
                    $value = $paraValue['value'];
                    $mbAddr = $paraValue['mbAddr'];
                    $moduleAddr = $paraValue['moduleAddr'];
                    $result = $this->executeSetCalibrationOnOff($cmdID, $value, $mbAddr, $moduleAddr);
                    break;
                case "setDisplayMode":
                    $mode = $paraValue['mode'];
                    $color = $paraValue['color'];
                    $mbAddr = $paraValue['mbAddr'];
                    $moduleAddr = $paraValue['moduleAddr'];
                    $result = $this->executeSetDisplayMode($cmdID, $mode, $color, $mbAddr, $moduleAddr);
                    break;
            }
        }
        else if($tag==2) {//PLC控制
            switch ($key) {
                case "setReadPLCStatus":
                    $result = $this->executeReadPLCStatus($cmdID);
                    break;
            }
        }
        return $result;
    }

    /*******************************************辅助方法***********************************************************/
    /**
     * 加载亮度级别
     */
    public function loadBrightnessLevel()
    {
        $sql = "SELECT ID,ENV_Light,Light_Percent,CS FROM	autobrightlevel";
        $this->db->query($sql);
        $queryResult = $this->db->fetchArray(MYSQL_ASSOC);
        return $queryResult;
    }

    /**
     * 更新命令执行状态(类内部调用)
     * @param $cmdID
     * @param $status
     * @return array {'status':true|false,'data':obj|null,'msg':str|null}
     */
    private function updateCommandStatus($cmdID, $status)
    {
        $sqlArr = array();
        $sqlArr['status'] = $status;
        $sqlArr['UpdateDate'] = date('Y-m-d H:i:s',time());
        $condition = "`ID`='"  . $cmdID . "'";
        $this->db->update('MemCache',$sqlArr,$condition);
        if($status==3 || $status==4)
        {
            $this->db->delete('Memcache',$condition);
        }
        $result = array();
        $result['status'] = true;
        $result['data']=null;
        $result['msg'] = null;
        return $result;
    }

    /**
     * 加载所有控制箱体信息
     */
    private function loadAllControlledUnit()
    {
        $sql = "SELECT * FROM 	control_unit ";
        $this->db->query($sql);
        $queryResult = $this->db->fetchArray(MYSQL_ASSOC);
        return $queryResult;
    }

    private function loadAllPLC()
    {
        $sql = "SELECT * FROM 	plc ";
        $this->db->query($sql);
        $queryResult = $this->db->fetchArray(MYSQL_ASSOC);
        return $queryResult;
    }

    /**
     * 加载PLC监视量数据
     * @param $plcID
     * @return array
     */
    private function loadPLCMonitorData($plcID)
    {
        $sql = "select * from plc_monitor where PLC_Id=$plcID";
        $this->db->query($sql);
        $queryResult = $this->db->fetchArray(MYSQL_ASSOC);
        return $queryResult;
    }

    /**
     * 更新PLC监视量的值
     * @param $monitorID
     * @param $val
     */
    private function updatePLCmonitorData($plcID,$monitorID,$val)
    {
        $sqlArr = array();
        $sqlArr['Monitor_Value'] = $val;
        $condition = "`ID`='"  . $monitorID . "' and PLC_Id='$plcID'";
        $this->db->update('plc_monitor',$sqlArr,$condition);
    }

    /**
     * 更新PLC开关设备状态
     * @param $plcID
     * @param $devID
     * @param $val
     */
    private function updatePLCDevData($plcID,$devID,$val)
    {
        $sqlArr = array();
        $sqlArr['Dev_Value'] = $val;
        $condition = "`ID`='"  . $devID . "' and PLC_Id='$plcID'";
        $this->db->update('plc_dev',$sqlArr,$condition);
    }

    /**
     * 解析PLC寄存器数据，并写入数据库
     * @param $plcID
     * @param $regData
     */
    private function analyzePLCMonitorData($plcID,$regData)
    {
        $regArr = explode(',',$regData);
        $monitorData = $this->loadPLCMonitorData($plcID);
        foreach($monitorData as $row)
        {
            $resultText = "";
            switch($row['Monitor_Type'])
            {
                case 1://烟感
                    $val = $regData[4];
                    $resultText = $val==0?'正常':'异常';
                    $this->updatePLCmonitorData($plcID,$row['ID'],$resultText);
                    break;
                case 6://当前温度
                    $routeID = $row['Monitor_Conn_Route'];
                    $param1 = $row['Monitor_Param1'];
                    $param2 = $row['Monitor_Param2'];
                    $param3 = $row['Monitor_Param3'];
                    //int pdvale = int.Parse(arow[0].ItemArray[16 + int.Parse(id) - 1 + 4].ToString());
                    $index = 16 + $routeID -1 + 4;
                    $val =floatval($regArr[$index]);
                    $nowTemperature = $param1 + ($val - $param2) / $param3;
                    if($nowTemperature<-20)
                    {
                        $resultText = "连接异常";
                    }
                    else
                    {
                        $resultText = $nowTemperature;
                    }
                    $this->updatePLCmonitorData($plcID,$row['ID'],$nowTemperature);
                    break;
                case 2://报警温度
                    $warnTemperature = $this->plcDal->getWarnTemperature();
                    echo json_encode($warnTemperature);
                    $this->updatePLCmonitorData($plcID,$row['ID'],$warnTemperature[0]['Param_Value']);
                    break;
                case 3://关闭温度
                    $routeID = $row['Monitor_Conn_Route'];
                    $param1 = $row['Monitor_Param1'];
                    $param2 = $row['Monitor_Param2'];
                    $param3 = $row['Monitor_Param3'];
                    $index = 24 + $routeID -1 + 4;
                    $val =floatval($regArr[$index]);
                    if($param3==0)
                    {
                        $resultText = "0℃";
                    }
                    else
                    {
                        $resultText = $param1 + ($val - $param2)/$param3;
                    }
                    $this->updatePLCmonitorData($plcID,$row['ID'],$resultText);
                    break;
                case 7://环境亮度 电压 湿度等
                    $routeID = $row['Monitor_Conn_Route'];
                    $param1 = $row['Monitor_Param1'];
                    $param2 = $row['Monitor_Param2'];
                    $param3 = $row['Monitor_Param3'];
                    //int pdvale = int.Parse(arow[0].ItemArray[16 + int.Parse(id) - 1 + 4].ToString());
                    $index = 16 + $routeID - 1 + 4;
                    $val = floatval($regArr[$index]);
                    if($param3==0)
                    {
                        $resultText = "0";
                    }
                    else
                    {
                        $resultText = $param1 + ($val - $param2)/$param3;
                    }
                    $this->updatePLCmonitorData($plcID,$row['ID'],$resultText);
                    break;
                case -1://手/自动状态，自定义类别
                    $resultText = $regArr[5]==0?"手动":"自动";
                    $this->updatePLCmonitorData($plcID,$row['ID'],$resultText);
                    break;
                case 4://设备开关状态
                    $routeID = $row['Monitor_Conn_Route'];
                    $index = $routeID + 3;
                    $val = $regArr[$index];
                    $resultText="";
                    if($val && $val !="")
                    {
                        $val = floatval($val);
                        if($val==0)
                        {
                            $resultText="关闭";
                        }
                        else
                        {
                            $resultText="开启";
                        }
                    }
                    $this->updatePLCmonitorData($plcID,$row['ID'],$resultText);
                    break;
            }
        }
    }

    /**
     * 解析PLC时间
     * @param $plcID
     * @param $regData
     */
    private function analyzePLCTime($plcID,$regData)
    {
        $regArr = explode(',',$regData);
        $monitorData = $this->loadPLCMonitorData($plcID);
        foreach($monitorData as $row)
        {
            $resultText = "";
            switch($row['Monitor_Type'])
            {
                case 1://烟感
                    $val = $regData[4];
                    $resultText = $val==0?'正常':'异常';
                    $this->updatePLCmonitorData($plcID,$row['ID'],$resultText);
                    break;
            }
        }
    }
    /*******************************************辅助方法结束******************************************************/


    /************************************** 执行箱体方法  ******************************************************/

    /**
     * 设置亮度
     * @param $cmdID 命令队列表中的ID
     * @param $dev 设备号
     * @param $percent 亮度百分比
     * @param $cs 色温
     * @param $mbAddr 主板地址
     * @param $moduleAddr 模块地址
     * @return array {'status':true|false,'data':obj|null,'msg':str|null}
     */
    private function executeSetBrightness($cmdID, $percent, $cs, $mbAddr, $moduleAddr)
    {
        $this->updateCommandStatus($cmdID,2);
        $ctrUnit = $this->loadAllControlledUnit();
        foreach($ctrUnit as $query)
        {
            $ip = $query['CommStr'];
            $dev = $this->twComm->openDev($ip);
            $cmdResult = $this->twComm->setBrightness($dev,$percent,$cs,$mbAddr,$moduleAddr);
        }

        if($cmdResult["status"]==true)
        {
            $this->updateCommandStatus($cmdID,3);
        }
        else
        {
            $this->updateCommandStatus($cmdID,4);
        }
        $result = array();
        $result['status'] = $cmdResult["status"];
        $result['data']=null;
        $result['msg'] = null;
        return $result;
    }

    /**
     * 设置GAMMA
     * @param $cmdID
     * @param $dev
     * @param $value
     * @param $mbAddr
     * @param $moduleAddr
     * @return array
     */
    private function executeSetGamma($cmdID, $value, $mbAddr, $moduleAddr)
    {
        $this->updateCommandStatus($cmdID,2);
        $ctrUnit = $this->loadAllControlledUnit();
        foreach($ctrUnit as $query) {
            $ip = $query['CommStr'];
            $dev = $this->twComm->openDev($ip);
            $cmdResult = $this->twComm->setGamma($dev, $value, $mbAddr, $moduleAddr);
        }
        if($cmdResult["status"]==true)
        {
            $this->updateCommandStatus($cmdID,3);
        }
        else
        {
            $this->updateCommandStatus($cmdID,4);
        }
        $result = array();
        $result['status'] = $cmdResult["status"];
        $result['data']=null;
        $result['msg'] = null;
        return $result;
    }

    /**
     * 设置校正开关状态
     * @param $cmdID
     * @param $dev
     * @param $value
     * @param $mbAddr
     * @param $moduleAddr
     * @return array
     */
    private function executeSetCalibrationOnOff($cmdID, $value, $mbAddr, $moduleAddr)
    {
        $this->updateCommandStatus($cmdID,2);//设置命令为执行状态
        $ctrUnit = $this->loadAllControlledUnit();
        foreach($ctrUnit as $query) {
            $ip = $query['CommStr'];
            $dev = $this->twComm->openDev($ip);
            $cmdResult = $this->twComm->setCalibrationOnOff($dev, $value, $mbAddr, $moduleAddr);
        }
        if($cmdResult["status"]==true)
        {
            $this->updateCommandStatus($cmdID,3);//设置命令执行成功
        }
        else
        {
            $this->updateCommandStatus($cmdID,4);//设置命令执行失败
        }
        $result = array();
        $result['status'] = $cmdResult["status"];
        $result['data']=null;
        $result['msg'] = null;
        return $result;
    }

    /**
     * 设置显示模式
     * @param $cmdID
     * @param $dev
     * @param $mode
     * @param $color
     * @param $mbAddr
     * @param $moduleAddr
     * @return array
     */
    private function executeSetDisplayMode($cmdID, $mode, $color, $mbAddr, $moduleAddr)
    {
        $this->updateCommandStatus($cmdID,2);
        $ctrUnit = $this->loadAllControlledUnit();
        foreach($ctrUnit as $query) {
            $ip = $query['CommStr'];
            $dev = $this->twComm->openDev($ip);
            $cmdResult = $this->twComm->setDisplayMode($dev, $mode, $color, $mbAddr, $moduleAddr);
        }
        if($cmdResult["status"]==true)
        {
            $this->updateCommandStatus($cmdID,3);
        }
        else
        {
            $this->updateCommandStatus($cmdID,4);
        }
        $result = array();
        $result['status'] = $cmdResult["status"];
        $result['data']=null;
        $result['msg'] = null;
        return $result;
    }

    /************************************** 执行箱体方法结束 *****************************************************/

    /************************************** 执行PLC方法  ******************************************************/
    private function executeReadPLCStatus($cmdID)
    {
        $this->updateCommandStatus($cmdID,2);
        $ctrPlc = $this->loadAllPLC();
        $cmdResult = array();
        $index=0;
        foreach($ctrPlc as $query)
        {
            $ip = $query['CommStr'];
            $dev = $this->plcComm->openDev($ip);
            //读取PLC监视量信息
            $tmpResult = $this->plcComm->ReadPLCStatus($dev);
            if($tmpResult["status"]==true)
            {
                $this->analyzePLCMonitorData($query['ID'], $tmpResult['data']);
                $cmdResult['plc'. $query['Address']] = $tmpResult['data'];
            }
            //读取PLC时间
            $tmpResult = $this->plcComm->ReadPLCTime($dev);
            if($tmpResult["status"]==true)
            {
                $this->analyzePLCTime($query['ID'], $tmpResult['data']);
                $cmdResult['plc'. $query['Address']] = $tmpResult['data'];
            }
        }

//        if($cmdResult["status"]==true)
//        {
           // $this->updateCommandStatus($cmdID,3);
//        }
//        else
//        {
//            $this->updateCommandStatus($cmdID,4);
//        }
        $result = array();
        $result['status'] = true;
        $result['data']=$cmdResult;
        $result['msg'] = null;
        return $result;
    }
    /************************************** 执行PLC方法结束 *****************************************************/
}