<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016-8-29
 * Time: 16:48
 */

namespace Common;


class Collection
{
    private $_members=array();

    //添加一个对象到集合
    public  function addItem($obj,$key=null)
    {
        if($key)
        {
            if(isset($this->_members[$key]))
            {
                throw  new exception("Key \"$key\" already in use!");
            }
            else
            {
                $this->_members[$key]=$obj;
            }
        }
        else
        {
            $this->_members[]=$obj;
        }
    }

    //从集合删除一个对象
    public function removeItem($key)
    {
        if(isset($this->_members[$key]))
        {
            unset($this->_members[$key]);
        }
        else
        {
            throw new exception("Invalid Key \"$key\"!");
        }
    }

    //得到一个对象
    public function getItem($key)
    {
        if(isset($this->_members[$key]))
        {
            return $this->_members[$key];
        }
        else
        {
            throw new  exception("Invalid Key \"$key\"!");
        }
    }

    //返回所有的键
    public function Keys()
    {
        return array_keys($this->_members);
    }

    //返回集合中对象的个数
    public function length()
    {
        return sizeof($this->_members);
    }

    //判断某个键是否存在
    public function exists($key)
    {
        return (isset($this->_members[$key]));
    }

    public function clear()
    {
        $_members = array();
    }
}