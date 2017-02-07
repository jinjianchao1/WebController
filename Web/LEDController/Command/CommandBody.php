<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016-8-29
 * Time: 16:30
 */

namespace Command;

/**
 * 命令体
 * @package Command
 */
class CommandBody
{
    var $commandId;
    var $commandText;
    var $commandPara;
    var $commandLevel;
    var $commandObj;
    var $commandDate;
    var $updateDate;
    var $tag;

    /**
     * @return mixed
     */
    public function getTag()
    {
        return $this->tag;
    }

    /**
     * @param mixed $tag
     */
    public function setTag($tag)
    {
        $this->tag = $tag;
    }

    /**
     * CommandBody constructor.
     * @param $commandId
     */
    public function __construct()
    {
        $this->commandDate = date('Y-m-d H:i:s',time());
        $this->updateDate =  date('Y-m-d H:i:s',time());
    }

    /**
     * @return mixed
     */
    public function getCommandDate()
    {
        return $this->commandDate;
    }

    /**
     * @param mixed $commandDate
     */
    public function setCommandDate($commandDate)
    {
        $this->commandDate = $commandDate;
    }

    /**
     * @return mixed
     */
    public function getUpdateDate()
    {
        return $this->commandDate;
    }

    /**
     * @param mixed $commandDate
     */
    public function setUpdateDate($commandDate)
    {
        $this->updateDate = $commandDate;
    }

    /**
     * @return mixed
     */
    public function getCommandId()
    {
        return $this->commandId;
    }

    /**
     * @param mixed $commandId
     */
    public function setCommandId($commandId)
    {
        $this->commandId = $commandId;
    }

    /**
     * @return mixed
     */
    public function getCommandText()
    {
        return $this->commandText;
    }

    /**
     * @param mixed $commandText
     */
    public function setCommandText($commandText)
    {
        $this->commandText = $commandText;
    }

    /**
     * @return mixed
     */
    public function getCommandPara()
    {
        return $this->commandPara;
    }

    /**
     * @param mixed $commandPara
     */
    public function setCommandPara($commandPara)
    {
        $this->commandPara = $commandPara;
    }

    /**
     * @return mixed
     */
    public function getCommandLevel()
    {
        return $this->commandLevel;
    }

    /**
     * @param mixed $commandLevel
     */
    public function setCommandLevel($commandLevel)
    {
        $this->commandLevel = $commandLevel;
    }

    /**
     * @return mixed
     */
    public function getCommandObj()
    {
        return $this->commandObj;
    }

    /**
     * @param mixed $commandObj
     */
    public function setCommandObj($commandObj)
    {
        $this->commandObj = $commandObj;
    }
}