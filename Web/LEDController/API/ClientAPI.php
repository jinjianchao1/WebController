<?php
header('Content-Type:text/html; charset=UTF-8');
include('../My_Global.php');
use \Command\CommandBody;
use Command\CommandFunID;
$result = false;
if($_REQUEST['tag'] == 1) {//用户操作
    $data = $_REQUEST;
    switch($data['func'])
    {
        case 'setBrightness'://亮度
            $result = sendBrightness($data);
            break;
        case'setGamma'://Gamma
            $result = sendGamma($data);
            break;
        case 'setCalibrationOnOff'://校正模式开关
            $result = sendCalibrationOnOff($data);
            break;
        case "setDisplayMode":
            $result = sendDisplayMode($data);
            break;
        case 'loadAllCommands'://加载所有命令
            $result = loadCommands($data);
            break;
    }
}
else if($_REQUEST['tag']==2) {//自动逻辑
    $data = file_get_contents("php://input");
    $data = json_decode($data,true);
    switch($data['func'])
    {
        case 'setReadPLCStatus'://自动逻辑，读取PLC状态
            $result = setReadPLCStatus($data);
            break;
        case 'setBrightness'://设置亮度
            $result = sendBrightnessForPLC($data);
            break;
        case 'setDevOnOff'://设备开关
            $result = setDevOnOff($data);
            break;
        case 'loadBrightnessLevel':
            $result = loadBrightnessLevel();
            break;
    }
}

$re = array();
$re['status'] = $result['status'];
$re['msg'] = $result['msg'];
$re['data'] = $result['data'];
echo json_encode($re);
exit();

/**************************************** Web 端调用 **************************************************************/

/**
 * 亮度命令写入队列
 * @param $source
 * @return array
 */
function sendBrightness($source)
{
    $data = $source['data'];
    $percent = $data['percent'];
    $cs = $data['cs'];

    $para = array();
    $para["mbAddr"] = 0;
    $para["moduleAddr"] = 0;
    $para["percent"] = $percent;
    $para["cs"] = $cs;
    insertCommandBody($source['func'],2,$para,$source['commandText'],1);
    $result = array();
    $result['status'] = true;
    $result['data']='';
    $result['msg'] = '';
    return $result;
}

/**
 * GAMMA命令写入队列
 * @param $source
 * @return array
 */
function sendGamma($source)
{
    $data = $source['data'];
    $value = $data['value'];
    $para = array();
    $para["mbAddr"] = 0;
    $para["moduleAddr"] = 0;
    $para["value"] = $value;
    insertCommandBody($source['func'],2,$para,$source['commandText'],1);
    $result = array();
    $result['status'] = true;
    $result['data']='';
    $result['msg'] = '';
    return $result;
}

/**
 * 校正开关命令写入队列
 * @param $source
 * @return array
 */
function sendCalibrationOnOff($source)
{
    $data = $source['data'];
    $value = $data['value'];
    $para = array();
    $para["mbAddr"] = 0;
    $para["moduleAddr"] = 0;
    $para["value"] = $value;
    insertCommandBody($source['func'],1,$para,$source['commandText'],1);
    $result = array();
    $result['status'] = true;
    $result['data']='';
    $result['msg'] = '';
    return $result;
}

/**
 * 工作模式命令写入队列
 * @param $source
 * @return array
 */
function sendDisplayMode($source)
{
    $data = $source['data'];
    $mode = $data['mode'];
    $color = $data['color'];
    $para = array();
    $para["mbAddr"] = 0;
    $para["moduleAddr"] = 0;
    $para["mode"] = $mode;
    $para['color'] = $color;
    insertCommandBody($source['func'],1,$para,$source['commandText'],1);
    $result = array();
    $result['status'] = true;
    $result['data']='';
    $result['msg'] = '';
    return $result;
}

/**
 * 加载命令队列
 * @param $data
 * @return array
 */
function loadCommands($data)
{
    $statusData = $data['data'];
    global $commandSeq;
    $commands = $commandSeq->getAllCommand($statusData['status']);
    $result = array();
    $result['status'] = true;
    $result['data']=$commands;
    $result['msg'] = '';
    return $result;
}
/*************************************** Web端调用结束 *********************************************************/

/**************************************** 自动逻辑处理端调用 ***************************************************/
/**
 * @param $source
 * @return array
 */
function setReadPLCStatus($source){
    //0,3,0,64,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,451,0,194,0,442,65535,65535,65535,924,65535,65535,65535,
    //1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    $data = $source['data'];
    $para = array();
    insertCommandBody($source['func'],2,$para,$source['commandText'],2);
    $result = array();
    $result['status'] = true;
    $result['data']='';
    $result['msg'] = '';
    return $result;
}

/**
 * 亮度设置（PLC）
 * @param $source
 * @return array
 */
function sendBrightnessForPLC($source)
{
    $data = $source['data'];
    $percent = $data['percent'];
    $cs = $data['cs'];

    $para = array();
    $para["mbAddr"] = 0;
    $para["moduleAddr"] = 0;
    $para["percent"] = $percent;
    $para["cs"] = $cs;
    insertCommandBody($source['func'],2,$para,$source['commandText'],2);
    $result = array();
    $result['status'] = true;
    $result['data']='';
    $result['msg'] = '';
    return $result;
}

/**
 * 设备开关
 * @param $source
 * @return array
 */
function setDevOnOff($source)
{
    //{func:'setDevOnOff',commandText:'设备描述',data:{key:devID,value:0|1}}
    $data = $source['data'];
    $devID = $data['devID'];
    $value = $data['value'];

    $para = array();
    $para["mbAddr"] = 0;
    $para["moduleAddr"] = 0;
    $para["devID"] = $devID;
    $para["value"] = $value;
    insertCommandBody($source['func'],2,$para,$source['commandText'],2);
    $result = array();
    $result['status'] = true;
    $result['data']='';
    $result['msg'] = '';
    return $result;
}

/**************************************** 自动逻辑处理端调用结束 ***********************************************/