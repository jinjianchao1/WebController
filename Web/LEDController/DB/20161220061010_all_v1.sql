--
-- MySQL database dump
-- Created by DBManage class. 
-- http://www.5ixuexiwang.com 
--
-- 主机: localhost
-- 生成日期: 2016 年  12 月 20 日 06:10
-- MySQL版本: 5.5.8-log
-- PHP 版本: 5.3.3

--
-- 数据库: `ledcontroller`
--

-- -------------------------------------------------------

--
-- 表的结构autobrightlevel
--

DROP TABLE IF EXISTS `autobrightlevel`;
CREATE TABLE `autobrightlevel` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ENV_Light` int(11) NOT NULL COMMENT '环境亮度',
  `Light_Percent` int(11) NOT NULL COMMENT '亮度百分比',
  `CS` int(11) NOT NULL COMMENT '色温值',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 autobrightlevel
--

INSERT INTO `autobrightlevel` VALUES('1','200','90','7400');
INSERT INTO `autobrightlevel` VALUES('2','210','60','7600');
--
-- 表的结构control_unit
--

DROP TABLE IF EXISTS `control_unit`;
CREATE TABLE `control_unit` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动增长，唯一标识',
  `S_Id` int(11) NOT NULL COMMENT '所属显示屏ID',
  `In_Row` int(11) NOT NULL COMMENT '所在行',
  `In_Column` int(11) NOT NULL COMMENT '所在列',
  `UnitRowCount` int(11) NOT NULL COMMENT '箱体行数',
  `UnitColumnCount` int(11) NOT NULL COMMENT '箱体列数',
  `CommMode` int(11) NOT NULL DEFAULT '1' COMMENT '通讯方式 0:串口，1：网络',
  `CommStr` varchar(100) NOT NULL COMMENT '通讯地址 当CommMode=0时,标示串口号,当CommMode=1时,标示IP地址',
  `Comment` text COMMENT '备注',
  `CreateDate` datetime NOT NULL COMMENT '创建时间',
  `UpdateDate` datetime DEFAULT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`ID`),
  KEY `FK_Control_Unit` (`S_Id`),
  CONSTRAINT `FK_Control_Unit` FOREIGN KEY (`S_Id`) REFERENCES `screen` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 control_unit
--

INSERT INTO `control_unit` VALUES('1','1','1','1','2','2','1','192.168.0.32','','2016-01-01 00:00:00','2016-01-01 00:00:00');

--
-- 表的结构memcache
--

DROP TABLE IF EXISTS `memcache`;
CREATE TABLE `memcache` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Key` varchar(100) NOT NULL,
  `Value` text NOT NULL,
  `Level` int(11) NOT NULL DEFAULT '1',
  `Status` int(11) DEFAULT '1' COMMENT '1:未执行 2-正在执行 3-成功 4-失败',
  `CreateDate` datetime NOT NULL,
  `UpdateDate` datetime NOT NULL,
  `Tag` int(11) NOT NULL COMMENT '命令类别，1-客户端命令 2-自动逻辑(PLC)',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 memcache
--

--
-- 表的结构monitor_log
--

DROP TABLE IF EXISTS `monitor_log`;
CREATE TABLE `monitor_log` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动增长，唯一标识',
  `S_id` int(11) NOT NULL DEFAULT '0' COMMENT '显示屏ID',
  `Obj_name` varchar(100) NOT NULL COMMENT '目标对象',
  `P_type` int(11) NOT NULL COMMENT '监视量类别ID',
  `Value` text NOT NULL COMMENT '监视量值',
  `CreateDate` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=33167 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 monitor_log
--

--
-- 表的结构opt_log
--

DROP TABLE IF EXISTS `opt_log`;
CREATE TABLE `opt_log` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动增长，唯一标识',
  `S_id` int(11) NOT NULL COMMENT '显示屏ID',
  `U_id` int(11) NOT NULL DEFAULT '0' COMMENT '操作者ID',
  `U_Name` varchar(100) DEFAULT '""' COMMENT '操作者',
  `S_Name` varchar(100) DEFAULT NULL COMMENT '显示屏名称',
  `Object` varchar(100) DEFAULT NULL COMMENT '操作对象,如:亮度',
  `CreateDate` datetime NOT NULL COMMENT '创建时间',
  `Details` varchar(500) DEFAULT NULL COMMENT '详细信息',
  `M_id` int(11) NOT NULL COMMENT 'Memcache表中的ID',
  `Status` int(11) NOT NULL DEFAULT '-1' COMMENT '如果是命令操作，则表示执行状态，否则为-1',
  PRIMARY KEY (`ID`),
  KEY `FK_Opt_Log` (`S_id`)
) ENGINE=InnoDB AUTO_INCREMENT=503 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 opt_log
--

--
-- 表的结构parameter
--

DROP TABLE IF EXISTS `parameter`;
CREATE TABLE `parameter` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动增长，唯一标识',
  `Name` varchar(100) NOT NULL COMMENT '参数名称',
  `Type` int(11) NOT NULL DEFAULT '2' COMMENT '参数类别：1：监视量,2：状态量',
  `Comment` text COMMENT '备注',
  `CreateDate` datetime NOT NULL COMMENT '创建时间',
  `UpdateDate` datetime DEFAULT NULL COMMENT '最后更新时间',
  `Key` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 parameter
--

INSERT INTO `parameter` VALUES('1','亮度','2','亮度\r\n数据格式{percent:100,cs:7300,r:65535,g:65535,b:65535}','2016-10-20 00:00:00','2016-10-20 00:00:00','setBrightness');
INSERT INTO `parameter` VALUES('6','GAMMA','2','GAMMA\r\n数据格式:{gamma:2.4,r:2.4,g:2.4,b:2.4}','2016-10-20 00:00:00','2016-10-20 00:00:00','');
INSERT INTO `parameter` VALUES('10','黑场时间','2','黑场时间{value:0}','2016-10-20 00:00:00','2016-10-20 00:00:00','');
INSERT INTO `parameter` VALUES('11','行消隐时间','2','行消隐时间\r\n{value:0}','2016-10-20 00:00:00','2016-10-20 00:00:00','');
INSERT INTO `parameter` VALUES('12','显示模式','2','显示模式：0显示模式，1测试模式\r\n{mode:0,color:0}','2016-10-20 00:00:00','2016-10-20 00:00:00','');
INSERT INTO `parameter` VALUES('14','校正开关','2','校正开关\r\n{value:0}','2016-10-20 00:00:00','2016-10-26 00:00:00','');
--
-- 表的结构plc
--

DROP TABLE IF EXISTS `plc`;
CREATE TABLE `plc` (
  `ID` int(11) NOT NULL COMMENT '自动增长，唯一标识',
  `Name` varchar(100) NOT NULL COMMENT '参数名称',
  `Address` varchar(100) NOT NULL COMMENT 'PLC地址',
  `CommMode` int(11) NOT NULL COMMENT '通讯方式 0:串口，1：网络',
  `CommStr` varchar(100) NOT NULL COMMENT '通讯地址 当CommMode=0时,标示串口号 当CommMode=1时，标示IP地址',
  `S_Id` int(11) NOT NULL COMMENT '显示屏ID',
  `Comment` text COMMENT '备注',
  `CreateDate` datetime NOT NULL COMMENT '创建时间',
  `UpdateDate` datetime NOT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`ID`),
  KEY `FK_PLC` (`S_Id`),
  CONSTRAINT `FK_PLC` FOREIGN KEY (`S_Id`) REFERENCES `screen` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 plc
--

INSERT INTO `plc` VALUES('0','PLC','0','1','192.168.0.254:10000','1','PLC','2016-11-25 15:27:58','2016-11-25 15:27:58');
--
-- 表的结构plc_dev
--

DROP TABLE IF EXISTS `plc_dev`;
CREATE TABLE `plc_dev` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PLC_Id` int(11) NOT NULL COMMENT '所属PLC ID',
  `Dev_Name` varchar(100) NOT NULL COMMENT '设备名称',
  `Dev_Num` int(11) NOT NULL COMMENT '设备ID号，表示在PLC中的位置',
  `Create_Date` datetime NOT NULL COMMENT '创建日期',
  `Dev_Value` int(11) DEFAULT NULL COMMENT '开关状态',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 plc_dev
--

INSERT INTO `plc_dev` VALUES('1','1','设备1','1','2016-11-02 00:00:00','');
INSERT INTO `plc_dev` VALUES('2','1','设备2','1','2016-01-02 00:00:00','');
--
-- 表的结构plc_monitor
--

DROP TABLE IF EXISTS `plc_monitor`;
CREATE TABLE `plc_monitor` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PLC_Id` int(11) NOT NULL COMMENT '所属PLC',
  `Monitor_Name` varchar(100) NOT NULL COMMENT '监视量名称',
  `Monitor_Type` int(11) DEFAULT NULL COMMENT '监视量类型',
  `Monitor_Param1` varchar(100) DEFAULT NULL COMMENT '参数1',
  `Monitor_Param2` varchar(100) DEFAULT NULL COMMENT '参数2',
  `Monitor_Param3` varchar(100) DEFAULT NULL COMMENT '参数3',
  `Monitor_Conn_Route` int(11) DEFAULT NULL COMMENT '监视量所连接通道的',
  `Monitor_Precision` int(11) DEFAULT NULL COMMENT '监视量精度',
  `Monitor_Value` varchar(100) DEFAULT ' ' COMMENT '监视量的值，在获取数据的时候计算',
  `Monitro_Tag` int(11) NOT NULL COMMENT '类别，1-监视量，2-状态量',
  `Dev_Num` int(11) DEFAULT NULL COMMENT '设备ID号，表示在PLC中的位置(对状态量有效)',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=410 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 plc_monitor
--

INSERT INTO `plc_monitor` VALUES('405','0','显示屏','-2','','','','','','1','2','0');
INSERT INTO `plc_monitor` VALUES('406','0','空调','-2','','','','','','1','2','1');
INSERT INTO `plc_monitor` VALUES('407','0','温度','1','1','1','1','1','1','1','1','');
INSERT INTO `plc_monitor` VALUES('408','0','环境亮度','1','1','1','1','1','1','1','1','');
INSERT INTO `plc_monitor` VALUES('409','0','烟感','1','1','1','1','1','1','正常','1','');
--
-- 表的结构plc_route
--

DROP TABLE IF EXISTS `plc_route`;
CREATE TABLE `plc_route` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Route_Name` varchar(100) NOT NULL COMMENT '通道名称',
  `PLC_Id` int(11) NOT NULL COMMENT '所属PLC',
  `Route_Dev_Id` int(11) NOT NULL COMMENT '此设备的ID号，依次递增',
  `Route_LC` int(11) NOT NULL COMMENT '属于哪个LC  (LC：即多个输出口绑定到一个设备)—关联设备的ID号',
  `Route_Output` int(11) NOT NULL COMMENT '输出的通道地址',
  `Create_Date` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 plc_route
--

INSERT INTO `plc_route` VALUES('1','01','1','0','0','0','2016-11-02 00:00:00');
INSERT INTO `plc_route` VALUES('2','02','1','1','0','1','2016-11-02 00:00:00');
INSERT INTO `plc_route` VALUES('3','03','1','2','1','2','2016-11-02 00:00:00');
--
-- 表的结构plc_warn_param
--

DROP TABLE IF EXISTS `plc_warn_param`;
CREATE TABLE `plc_warn_param` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Param_Name` varchar(100) NOT NULL COMMENT '报警参数名称',
  `Param_Value` float NOT NULL COMMENT '报警参数值',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 plc_warn_param
--

INSERT INTO `plc_warn_param` VALUES('1','Temperature','47');
INSERT INTO `plc_warn_param` VALUES('2','Voltage','10');
INSERT INTO `plc_warn_param` VALUES('3','VoltageUpLimit','15');
INSERT INTO `plc_warn_param` VALUES('4','VoltageDownLimit','5');
INSERT INTO `plc_warn_param` VALUES('5','VoltageClose','256');
--
-- 表的结构screen
--

DROP TABLE IF EXISTS `screen`;
CREATE TABLE `screen` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动增长，唯一标识',
  `Name` varchar(100) NOT NULL COMMENT '屏幕名称',
  `Comment` text COMMENT '备注',
  `CreateDate` datetime NOT NULL COMMENT '创建时间',
  `UpdateDate` datetime NOT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 screen
--

INSERT INTO `screen` VALUES('1','Screen1','','2016-10-25 00:00:00','2016-10-25 00:00:00');
--
-- 表的结构screen_parameter
--

DROP TABLE IF EXISTS `screen_parameter`;
CREATE TABLE `screen_parameter` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动增长，唯一标识',
  `S_Id` int(11) NOT NULL COMMENT '显示屏ID',
  `P_Id` int(11) NOT NULL COMMENT '参数ID',
  `Value` text NOT NULL COMMENT '参数值',
  `CreateDate` datetime NOT NULL COMMENT '创建时间',
  `UpdateDate` datetime NOT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`ID`),
  KEY `FK_Screen_Parameter` (`S_Id`),
  KEY `FK_Screen_Parameter_P_ID` (`P_Id`),
  CONSTRAINT `FK_Screen_Parameter` FOREIGN KEY (`S_Id`) REFERENCES `screen` (`ID`),
  CONSTRAINT `FK_Screen_Parameter_P_ID` FOREIGN KEY (`P_Id`) REFERENCES `parameter` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 screen_parameter
--

INSERT INTO `screen_parameter` VALUES('1','1','1','{percent:100,cs:7300,r:65535,g:65535,b:65535}','2016-11-04 00:00:00','2016-11-04 00:00:00');
INSERT INTO `screen_parameter` VALUES('2','1','6','{gamma:2.4,r:2.4,g:2.4,b:2.4}','2016-11-04 00:00:00','2016-11-04 00:00:00');
INSERT INTO `screen_parameter` VALUES('3','1','14','{value:0}','2016-11-04 00:00:00','2016-11-04 00:00:00');
--
-- 表的结构tablename1
--

DROP TABLE IF EXISTS `tablename1`;
CREATE TABLE `tablename1` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ENV_Light` int(11) NOT NULL COMMENT '环境亮度',
  `Ligh_Percent` int(11) NOT NULL COMMENT '亮度百分比',
  `CS` int(11) NOT NULL COMMENT '色温值',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 tablename1
--

