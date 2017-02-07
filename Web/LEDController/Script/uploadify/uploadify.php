<?php

header('Content-Type: text/html; charset=UTF-8');
include('../../My_Global.php');
use \DAL\PLCDAL;

//指定目标文件夹
$targetFolder = './../../Upload/'.'day_'.date('ymd').'/';

if (!empty($_FILES)) {
	$tempFile = $_FILES['Filedata']['tmp_name'];
	if (!file_exists($targetFolder)){//如果指定文件夹不存在，则创建文件夹
		mkdir($targetFolder , 0777);
	}
	$fileParts = pathinfo($_FILES['Filedata']['name']);

	//根据日期加随机数生成新名字
	///$targetFile =$targetFolder.$_FILES['Filedata']['name'];//这句是保存原来的文件名
	$newFilename=$targetFolder.date("YmdHis").mt_rand(1000,9999).'.'.$fileParts['extension'];
	//转移所上传的文件
	if(move_uploaded_file($_FILES['Filedata']['tmp_name'],$newFilename))
	{
		$plcDal = new PLCDAL();
		$plcDal->initData($newFilename);
		echo '1';
	}
	//如果移动失败
	else{
		echo 'Invalid file type.';
	}
	//$_FILES['upfile']['name']与$_FILES['Filedata']['name']是同一个意思
	//同样$_FILES['upfile']['tmp_name']与$_FILES['Filedata']['tmp_name']也是同一个意思

}

?>