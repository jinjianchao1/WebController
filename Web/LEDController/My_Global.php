<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016-8-30
 * Time: 9:48
 */

use Command\CommandSequence as CommandSequence;
use Command\CommandBody as CommandBody;
define('BASE_PATH',str_replace('\\','/',realpath(dirname(__FILE__).'/'))."/");
//define('DB_NAME',BASE_PATH . '/DB/db.s3db');
spl_autoload_register(function ($class_name) {
    include $class_name . '.php';
});

$commandSeq = new CommandSequence();

function insertCommandBody($id,$level,$para,$commandText,$tag=1)
{
    global $commandSeq;
    $commandBody = new CommandBody();
    $commandBody->commandId = $id;
    $commandBody->commandLevel = $level;
    $commandBody->commandPara = $para;
    $commandBody->commandText = $commandText;
    $commandBody->tag = $tag;
    $commandSeq->insertCommand($commandBody);
}

function loadBrightnessLevel()
{
    global $commandSeq;
    $result = array();
    $result['status'] = true;
    $result['data']=$commandSeq->loadBrightnessLevel();
    $result['msg'] = '';
    return $result;
}

/*
*功能：对字符串进行加密处理
*参数一：需要加密的内容
*参数二：密钥
*/
function encrypt($str,$key='leyard'){ //加密函数
    srand((double)microtime() * 1000000);
    $encrypt_key=md5(rand(0, 32000));
    $ctr=0;
    $tmp='';
    for($i=0;$i<strlen($str);$i++){
        $ctr=$ctr==strlen($encrypt_key)?0:$ctr;
        $tmp.=$encrypt_key[$ctr].($str[$i] ^ $encrypt_key[$ctr++]);
    }
    return base64_encode(passport_key($tmp,$key));
}

/*
*功能：对字符串进行解密处理
*参数一：需要解密的密文
*参数二：密钥
*/
function decrypt($str,$key='leyard'){ //解密函数
    $str=passport_key(base64_decode($str),$key);
    $tmp='';
    for($i=0;$i<strlen($str);$i++){
        $md5=$str[$i];
        $tmp.=$str[++$i] ^ $md5;
    }
    return $tmp;
}

/*
*辅助函数
*/
function passport_key($str,$encrypt_key){
    $encrypt_key=md5($encrypt_key);
    $ctr=0;
    $tmp='';
    for($i=0;$i<strlen($str);$i++){
        $ctr=$ctr==strlen($encrypt_key)?0:$ctr;
        $tmp.=$str[$i] ^ $encrypt_key[$ctr++];
    }
    return $tmp;
}
