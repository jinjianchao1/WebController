<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/11/17
 * Time: 15:22
 */

namespace Command;


class PLCComm
{
    /**
     * TWComm constructor.
     */
    public function __construct()
    {
    }

    /**
     * @param $ip
     * @return int
     */
    public function openDev($ip)
    {
        $dev=0;

        return $dev;
    }

    /**
     * @param $dev
     */
    public function closeDev($dev)
    {

    }

    public  function ReadPLCStatus($dev)
    {
        $wait = rand(1,4);
        sleep($wait);
        $result = array();
        $result['status'] = true;
        //0,3,0,64,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,451,0,194,0,442,65535,65535,65535,924,65535,65535,65535,
        //1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        //0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        $demodata = "0,3,0,64,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,451,0,194,0,442,65535,65535,65535,924,65535,65535,65535,";
        $demodata .="1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,";
        $demodata .="0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
        $result['data']=$demodata;
        $result['msg'] = null;
        return $result;
    }

    public  function ReadPLCTime($dev)
    {
        $wait = rand(1,4);
        sleep($wait);
        $result = array();
        $result['status'] = true;
        $demodata = "0,3,0,8,2000,0,0,0,0,7,35,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,";
        $demodata .="0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,";
        $demodata .="0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
        $result['data']=$demodata;
        $result['msg'] = null;
        return $result;
    }
}