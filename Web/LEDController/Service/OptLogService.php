<?php
header('Content-Type:text/html; charset=UTF-8');
include('../My_Global.php');
use \DAL\OptLogDAL;
$data = $_REQUEST;

$result = $data['action'];
switch($data['action'])
{
    case 1://操作日志
        $result = loadOptLog($_REQUEST['page'],$_REQUEST['rows']);
        break;
    case 2://读取最后一条数据
        $result = loadLastOptLog();
}

echo json_encode($result);
exit();

/**************************************** 命令队列端调用 **************************************************************/

/*
 *
 */
function loadOptLog($page,$rows)
{
//    $result = array();
//    $sql = "SELECT * FROM opt_log WHERE CreateDate>='" .$dateFrom . "' AND CreateDate<='" . $dateTo . "'";
//
//    $this->db->query($sql);
//    $queryResult = $this->db->fetchArray(MYSQL_ASSOC);
//    $result["total"] = count($queryResult);
//    foreach($queryResult as $query)
//    {
//
//    }
//    $result["rows"] = $queryResult;
//    return $result;

    $dal = new OptLogDAL();
    $queryResult = $dal->getLogs($page,$rows);
    $result = array();
    $result["total"] = $dal->getLogsCount();

    $tmpData = array();
    foreach($queryResult as $item)
    {
        $arr = array('sname'=>$item['S_Name'],'content'=>$item['Object'],'detail'=>$item['Details'],'optdate'=>$item['CreateDate']);
        $tmpData[] = $arr;
    }

    $result["rows"] = $tmpData;
    return $result;
}

function loadLastOptLog()
{
    $dal = new OptLogDAL();
    $queryResult = $dal->getLastLog();
    return $queryResult;
}