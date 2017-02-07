<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016-9-2
 * Time: 14:13
 */

namespace Common;


class SelfFunction
{
    static public function  ConvertUTF8ToGB2312($word)
    {
        return mb_convert_encoding($word,"UTF-8","GB2312");
    }

    static public function ConvertGB2312ToUTF8($word)
    {
        return mb_convert_encoding($word,"gb2312","utf-8");
    }
}