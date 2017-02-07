<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/10/26
 * Time: 11:33
 */

namespace DAL;
use Common\Collection;
use Command\CommandBody;
//use Common\SqliteHelper;
use Common\MysqlHelper;
date_default_timezone_set('prc');

class OptLogDAL
{
    var $db;
    /**
     * CommandSequence constructor.
     */
    public function __construct()
    {
        $this->db = new MysqlHelper('localhost', 'root', '', "ledcontroller");

    }

    function __destruct()
    {
        // TODO: Implement __destruct() method.

    }

    public function getLogsCount($dateFrom='1900-01-01',$dateTo='2999-01-01')
    {
        $sql = "SELECT count(*) FROM opt_log WHERE CreateDate>='$dateFrom' AND CreateDate<='$dateTo'";
        $this->db->query($sql);
        $queryResult = $this->db->fetchRecordCount();
        return $queryResult;
    }

    public function  getLogs($pageIndex=1,$pageSize=15, $dateFrom='1900-01-01',$dateTo='2999-01-01')
    {
        //SELECT * FROM opt_log LIMIT (1-1) * 10,(1 * page)
        $result = array();
        $limit1 = ($pageIndex-1) * $pageSize;
        $limit2 = $pageSize;
        $sql = "SELECT * FROM opt_log WHERE CreateDate>='$dateFrom' AND CreateDate<='$dateTo' limit $limit1,$limit2";
        $this->db->query($sql);
        $queryResult = $this->db->fetchArray(MYSQL_ASSOC);
        return $queryResult;
    }

    public function getLastLog()
    {
        $result = array();
        $sql = "SELECT * FROM opt_log  ORDER BY ID DESC LIMIT 1";
        $this->db->query($sql);
        $queryResult = $this->db->fetchArray(MYSQL_ASSOC);
        return $queryResult;
    }
}