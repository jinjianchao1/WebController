<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/11/2
 * Time: 10:41
 */

namespace DAL;

use Common\Collection;
use Command\CommandBody;
//use Common\SqliteHelper;
use Common\MysqlHelper;

date_default_timezone_set('prc');

class PLCDAL
{
    var $db;

    public function __construct()
    {
        $this->db = new MysqlHelper('localhost', 'root', '', "ledcontroller");
    }

    function __destruct()
    {
        // TODO: Implement __destruct() method.

    }

    public function initData($iniFile)
    {
        $this->db->delete('plc');
        $iniArr = parse_ini_file($iniFile, true);
        $plcParams = $iniArr['PLCParms'];
        $plcCount = $plcParams['Count'];
        //写入PLC信息
        for ($i = 0; $i < $plcCount; $i++) {
            $plcName = $plcParams['Name' . $i];
            $plcAddr = $plcParams['Addr' . $i];
            $plcConnMode = intval($plcParams['ConnMode' . $i]);
            $commStr = "";
            if ($plcConnMode == 0) {
                $commStr = $plcParams['Comm' . $i];
            } else {
                $commStr = $plcParams['IP' . $i] . ":" . $plcParams['Port' . $i];
            }
            $sqlArr = array();
            $sqlArr['ID'] = $i;
            $sqlArr['Name'] = $plcName;
            $sqlArr['Address'] = $plcAddr;
            $sqlArr['CommMode'] = $plcConnMode;
            $sqlArr['CommStr'] = $commStr;
            $sqlArr['S_Id'] = 1;
            $sqlArr['Comment'] = $plcName;
            $sqlArr['CreateDate'] = date('Y-m-d H:i:s', time());
            $sqlArr['UpdateDate'] = date('Y-m-d H:i:s', time());
            $this->db->insert('plc', $sqlArr);

        }


//
        //设备信息
        $plcs = $this->getPLCS();
        $this->db->delete('plc_monitor');
        $devParams = $iniArr['DeviceParms'];

        foreach ($plcs as $plc) {
            $plcID = $plc['ID'];
            $devCount = $devParams['Count'];
            for ($i = 0; $i < $devCount; $i++) {
                if ($devParams['PLC_ID' . $i] == $plcID) {
                    $devName = $devParams['Name' . $i];
                    $dev_num = $devParams['ID' . $i];
                    $sqlArr = array();
                    $sqlArr['PLC_Id'] = $plcID;
                    $sqlArr['Monitor_Name'] = $devName;
                    $sqlArr['Monitor_Type'] = -2;
                    $sqlArr['Monitro_Tag'] = 2;
                    $sqlArr['Dev_Num'] = $dev_num;
                    $this->db->insert('plc_monitor', $sqlArr);
                }
            }

            //PLC手/自动数据初始化
//            $this->db->select("plc_monitor","*","Monitor_Type=-1 and PLC_Id=$plcID");
//            $queryResult = $this->db->fetchRecordCount();
//            if($queryResult==0)
//            {
//                $arr = array();
//                $arr['PLC_Id'] = $plcID;
//                $arr['Monitro_Tag'] = 1;
//                $arr['Monitor_Name'] = "手/自动";
//                $arr['Monitor_Type'] =-1;
//                $this->db->insert('plc_monitor',$arr);
//            }

//            //plc 时间数据初始化
//            $this->db->select("plc_monitor","*","Monitor_Type=-2 and PLC_Id=$plcID");
//            $queryResult = $this->db->fetchRecordCount();
//            if($queryResult==0)
//            {
//                $arr = array();
//                $arr['PLC_Id'] = $plcID;
//                $arr['Monitro_Tag'] = 1;
//                $arr['Monitor_Name'] = "PLC时间";
//                $arr['Monitor_Type'] =-1;
//                $this->db->insert('plc_monitor',$arr);
//            }
        }
//
//
//
//        return $queryResult;
    }

    public function getMonitorData()
    {
        $result = array();
        $sql = "SELECT * FROM plc_monitor where Monitro_Tag='1' and PLC_Id='0'";
        $this->db->query($sql);
        $queryResult = $this->db->fetchArray(MYSQL_ASSOC);
        return $queryResult;
    }

    public function writeMonitorLog($queryResult)
    {
        foreach ($queryResult as $item) {
            $sid = 0;
            $objName = $item['Monitor_Name'];
            $pType = $item['ID'];
            $value = $item['Monitor_Value'];
            $date = date('Y-m-d H:i:s', time());
            $arr = array();
            $arr['S_id'] = $sid;
            $arr['Obj_name'] = $objName;
            $arr['P_type'] = $pType;
            $arr['Value'] = $value;
            $arr['CreateDate'] = $date;
            $this->db->insert('monitor_log', $arr);
        }
    }

    /**
     * 读取报警温度
     * @return array
     */
    public function getWarnTemperature()
    {
        $result = array();
        $sql = "SELECT * FROM plc_warn_param where Param_Name='Temperature'";
        $this->db->query($sql);
        $queryResult = $this->db->fetchArray(MYSQL_ASSOC);
        return $queryResult;
    }

    /**
     * 写入报警温度
     * @param $temperature
     */
    public function setWarnTemperature($temperature)
    {
        $arr = array();
        $arr['Param_Value'] = $temperature;
        $this->db->update('plc_warn_param', $arr, 'Param_Name=\'Temperature\'');
    }

    public function getPLCS()
    {
        $result = array();
        $sql = "SELECT * FROM plc";
        $this->db->query($sql);
        $queryResult = $this->db->fetchArray(MYSQL_ASSOC);
        return $queryResult;
    }
}