<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/10/24
 * Time: 15:24
 */

namespace Command;


class TWComm
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

    /**
     * @param $dev
     */
    public function stop($dev)
    {

    }

    /**
     * @param $dev
     * @param $percent
     * @param $colortemperature
     * @param int $mbAddr
     * @param int $moduleAddr
     * @return bool
     */
    public function setBrightness($dev, $percent, $colortemperature, $mbAddr=0, $moduleAddr=0)
    {
        $wait = rand(1,4);
        sleep($wait);
        $result = array();
        $result['status'] = true;
        $result['data']=null;
        $result['msg'] = null;
        return $result;
    }

    /**
     * @param $dev
     * @param $value
     * @param int $mbAddr
     * @param int $moduleAddr
     * @return bool
     */
    public function setGamma($dev, $value, $mbAddr=0, $moduleAddr=0)
    {
        $wait = rand(1,4);
        sleep($wait);
        $result = array();
        $result['status'] = true;
        $result['data']=null;
        $result['msg'] = null;
        return $result;
    }

    public function setCalibrationOnOff($dev, $value, $mbAddr=0, $moduleAddr=0)
    {
        $wait = rand(1,4);
        sleep($wait);
        $result = array();
        $result['status'] = true;
        $result['data']=null;
        $result['msg'] = null;
        return $result;
    }

    public function setDisplayMode($dev, $mode,$color, $mbAddr=0, $moduleAddr=0)
    {
        $wait = rand(1,4);
        sleep($wait);
        $result = array();
        $result['status'] = true;
        $result['data']=null;
        $result['msg'] = null;
        return $result;
    }
}