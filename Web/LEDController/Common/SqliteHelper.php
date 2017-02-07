<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016-9-8
 * Time: 10:22
 */

namespace Common;

class SqliteHelper {
    var $link;
    var $querynum = 0;

    /**
     * 根据sql文件内容生成数据库
     * @param $dbFile
     */
    function InstallDB($dbFile) {
        $file_handle = fopen($dbFile, "r");
        try{
            $this->BeginTran();
            while (!feof($file_handle)) {
                $line = fgets($file_handle);
                if (substr(trim($line), 0, 1) != "#" && trim($line) != "") {
                    $this->Query($line);
                }
            }
            $this->CommitTran();
        }
        catch(Exception $e){
            //$this->RollbackTran();
        }
        fclose($file_handle);
    }

    /**
     * 打开数据库，如果数据库文件不存在，
     * 则在同一个目录下查找指定的sql文件，
     * 生成数据库，并打开。
     * @param $dbname
     */
    function Open($dbname) {
        $existDB = true;
        if (!file_exists($dbname)) {
            $existDB = false;
        }
        if (!($this->link = new \SQLite3($dbname))) {
            $this->halt('数据库打开失败,名称:' . $dbname);
        } else {
            if (!$existDB) {
                $buildSqlName = substr($dbname,0,strrpos($dbname,".")) . ".sql";
                $this->InstallDB($buildSqlName);
                $this->link = new \SQLite3($dbname);
            }
        }
    }

    /**
     * 查询数据
     * @param $sql
     * @return bool
     */
    function Query($sql) {
        $this->querynum++;
        if ($query = $this->link->query($sql)) {
            return $query;
        } else {
            $this->halt('查询失败', $sql);
            return false;
        }
    }

    /**
     * 查询数据，并将结果以数组的形式返回
     * @param $sql
     * @return array|bool
     */
    function QueryAsArray($sql) {
        $get_all_data = array();
        if ($query = $this->query($sql)) {
            while($row = $query->fetchArray(SQLITE3_ASSOC)){
                $get_all_data[] = $row;
            }
            unset($query);
            return $get_all_data;
        } else {
            $this->halt('Sqlite Query Error', $sql);
            return false;
        }
    }

    /**
     *开启事务操作
     */
    function BeginTran(){
        $this->Query("begin transaction");
    }

    /**
     *提交事务
     */
    function CommitTran(){
        $this->Query("commit transaction");
    }

    /**
     *回滚事务
     */
    function RollbackTran(){
        $this->Query("rollback transaction");
    }

    /**
     * 插入数据，并返回最后一次插入所产生的自动增长ID
     * @param $table
     * @param $iarr 键值对数组
     * @return int
     */
    function Insert($table, $iarr) {
        $value = $this->InsertSql($iarr);
        $this->Query('INSERT INTO "' . $table . '" ' . $value);
//        return sqlite_last_insert_rowid($this->link);
        return $this->link->lastInsertRowID();
    }

    function Update($table, $uarr, $condition = '') {
        $value = $this->UpdateSql($uarr);
        if ($condition) {
            $condition = ' WHERE ' . $condition;
        }
        $this->Query('UPDATE "' . $table . '"' . ' SET ' . $value . $condition);
        //return sqlite_changes($this->link);
    }

    /*ִ��Delete��䣬����������Delete������Ӱ�������*/
    function Delete($table, $condition = '') {
        if ($condition) {
            $condition = ' WHERE ' . $condition;
        }
        $this->Query('DELETE "' . $table . '"' . $condition);
        //return sqlite_changes($this->link);
    }

    /*���ַ�תΪ���԰�ȫ�����sqliteֵ������a'aתΪa''a*/
    /*
    function EnCode($str) {
    if (strpos($str, "\0") === false) {
    if (strpos($str, '\'') === false) {
    return $str;
    } else {
    return str_replace('\'', '\'\'', $str);
    }
    } else {
    $str = str_replace("\0", '', $str);
    if (strpos($str, '\'') === false) {
    return $str;
    } else {
    return str_replace('\'', '\'\'', $str);
    }
    }
    }
    */
    function EnCode($str) {
        return sqlite_escape_string($str);
    }

    /*�����԰�ȫ�����sqliteֵתΪ������ֵ������a''aתΪa'a*/
    function DeCode($str) {
        if (strpos($str, '\'\'') === false) {
            return $str;
        } else {
            return str_replace('\'\'', '\'', $str);
        }
    }

    /**
     * 将对应的列和值生成对应的insert语句，如：array('id' => 1, 'name' => 'name')返回("id", "name") VALUES (1, 'name')
     * @param $iarr 键值对数组
     * @return string
     */
    function InsertSql($iarr) {
        if (is_array($iarr)) {
            $fstr = '';
            $vstr = '';
            foreach ($iarr as $key => $val) {
                $fstr .= '"' . $key . '", ';
                $vstr .= '\'' . $val . '\', ';
            }
            if ($fstr) {
                $fstr = '(' . substr($fstr, 0, -2) . ')';
                $vstr = '(' . substr($vstr, 0, -2) . ')';
                return $fstr . ' VALUES ' . $vstr;
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    /*����Ӧ���к�ֵ���ɶ�Ӧ��insert��䣬�磺array('id' => 1, 'name' => 'name')����"id" = 1, "name" = 'name'*/
    function UpdateSql($uarr) {
        if (is_array($uarr)) {
            $ustr = '';
            foreach ($uarr as $key => $val) {
                $ustr .= '"' . $key . '" = \'' . $val . '\', ';
            }
            if ($ustr) {
                return substr($ustr, 0, -2);
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    /*���ض�Ӧ�Ĳ�ѯ��ʶ�Ľ����һ��*/
    function GetRow($query, $result_type = SQLITE_ASSOC) {
        return sqlite_fetch_array($query, $result_type);
    }

    /*��ղ�ѯ�����ռ�õ��ڴ���Դ*/
    function Clear($query) {
        $query = null;
        return true;
    }

    /*�ر����ݿ�*/
    function Close() {
        return $this->link->close();
    }

    function halt($message = '', $sql = '') {
        //$ei = sqlite_last_error($this->link);
        $ei = $this->link->lastErrorCode();
        $message .= '<br />Sqlite Error: ' . $ei . ', ' . sqlite_error_string($ei);
        if ($sql) {
            $sql = '<br />sql:' . $sql;
        }
        exit ('DataBase Error.<br />Message: ' . $message . $sql);
    }
}