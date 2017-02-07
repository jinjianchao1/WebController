<?php
header('Content-Type:text/html; charset=UTF-8');
include('../My_Global.php');
use \Command\CommandBody;
use Command\CommandFunID;
$result = false;

$json =file_get_contents("php://input");
$json = json_decode($json,true);

//执行命令
switch($json['func'])
{
    case 'loadAllCommands'://加载所有命令
        $result = loadCommands($json);
        break;
    case 'execute':
        $result = executeCommand($json['ID']);
        break;
}

$re = array();
$re['status'] = $result['status'];
$re['msg'] = $result['msg'];
$re['data'] = $result['data'];
echo json_encode($re);
exit();

/**************************************** 命令队列端调用 **************************************************************/


function loadCommands($data)
{
    $statusData = $data['data'];
    global $commandSeq;
    $fileds = "ID,`Key`,Level,Status,CreateDate";
    $commands = $commandSeq->getAllCommand($statusData['status'],$fileds);
    $result = array();
    $result['status'] = true;
    $result['data']=$commands;
    $result['msg'] = '';
    return $result;
}

function executeCommand($id)
{
    global $commandSeq;
    $cmdResult = $commandSeq->executeCommand($id);
    $result = array();
    $result['status'] = true;
    $result['data']=$cmdResult;
    $result['msg'] = '';
    return $result;
}

function stopCommand()
{
    global $commandSeq;
//    $commands = $commandSeq->testExecuteCommand($id);
//    $result = array();
//    $result['status'] = true;
//    $result['data']=$commands;
//    $result['msg'] = '';
//    return $result;
}
/**********************************************************************************************************************/
