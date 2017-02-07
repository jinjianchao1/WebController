<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016-9-2
 * Time: 15:35
 */

namespace Common;


class MemcacheKey
{
    public $keys = array();

    /**
     * @return mixed
     */
    public function getKeyCount()
    {
        return count($this->keys);
    }

    public function setKey($key)
    {
        if(in_array($key,$this->keys))
        {
            self::array_remove_value($this->keys,$key);
        }
        $this->keys[$this->getKeyCount()+1] = $key;
    }

    /**
     * 移除给定值的元素
     * @param $arr
     * @param $var
     */
    static public function array_remove_value(&$arr, $var)
    {
        foreach ($arr as $key => $value)
        {
            if (is_array($value))
            {
                array_remove_value($arr[$key], $var);
            } else
            {
                $value = trim($value);
                if ($value == $var)
                {
                    unset($arr[$key]);
                } else
                {
                    $arr[$key] = $value;
                }
            }
        }
    }
}