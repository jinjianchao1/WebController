<?php
header('Content-Type:text/html; charset=UTF-8');
include('../My_Global.php');
use \DAL\PLCDAL;
$data = $_REQUEST;

$result = $data['action'];
switch($data['action'])
{
    case 1://获取PLC信息
        $result = getPLCS();
        break;
    case 2://获取监视量信息
        $result = getMonitorData();
        break;
}

echo json_encode($result);
exit();

/**************************************** 命令队列端调用 **************************************************************/

/**
 * 获取监视数据
 * @return array
 */
function getMonitorData()
{
    $dal = new PLCDAL();
    $queryResult = $dal->getMonitorData();
    $result = array();
    $result["total"] = count($queryResult);

    $tmpData = array();
    //foreach($queryResult as $item)
    foreach ($queryResult as $key =>&$item)
    {
        //$item['Monitor_Value'] = (50 + rand(-10,10)) . '';
        $item['Monitor_Value'] = $item['Monitor_Value'];
        $arr = array('name'=>$item['Monitor_Name'],'value'=>$item['Monitor_Value'],'group'=>'监视量');
        $tmpData[] = $arr;
    }
    $dal->writeMonitorLog($queryResult);

    $result["rows"] = $tmpData;
    return $result;
}

function getPLCS()
{
    $dal = new PLCDAL();
    $plcs = $dal->getPLCS();
    return $plcs;
}
