<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="./Css/themes/default/easyui.css"/>
    <link rel="stylesheet" type="text/css" href="./Css/themes/default/color.css"/>
    <link rel="stylesheet" type="text/css" href="./Css/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="./Script/uploadify/uploadify.css"/>
    <script type="text/javascript" src="./Script/jquery.min.js"></script>
    <script type="text/javascript" src="./Script/uploadify/jquery.uploadify.js"></script>
<!--    <script type="text/javascript" src="http://cdn.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>-->
    <script type="text/javascript" src="./Script/jquery.easyui.min.js"></script>
<!--    <script src="http://cdn.hcharts.cn/highstock/highstock.js"></script>-->
    <script src="./Script/highstock.js"></script>
<!--    <script src="http://cdn.hcharts.cn/highstock/modules/exporting.js"></script>-->
    <title>LED控制系統</title>
</head>
<body>
<body class="easyui-layout">
<form>
    <div data-options="region:'north',border:false" style="height:60px;background:#B3DFDA;padding:10px">
        <span style="font-size: larger; font-weight: bold">LED綜合控制系統</span>
        <span><input id="file_upload" name="file_upload" type="file" multiple="true" ></span>
        <span><a href="#" class="easyui-linkbutton" data-options="">导入PLC数据</a></span>
    </div>
    </form>
<!--    <div data-options="region:'west',split:true,title:'West'" style="width:150px;padding:10px;">-->
<!--        west content-->
<!--    </div>-->
    <div data-options="region:'east',split:true,collapsible:false,collapsed:false" style="width:280px;">
        <div id="tt" class="easyui-tabs" fit="true" pill="false" justified="true" tabPosition="bottom">
<!--            <div title="命令队列" style="padding-bottom: 1px;">-->
<!--                <div  class="easyui-panel" fit="true"  style="padding:10px;">-->
<!---->
<!--                </div>-->
<!--            </div>-->
            <div title="监控区" style="padding-bottom:1px">
                    <table id="pg" style="width:100%"></table>

            </div>
        </div>
    </div>
    <div data-options="region:'south',split:true,border:true" style="height:200px;padding:0px;">
        <div id="tt1" class="easyui-tabs" data-options="tools:'#tab-tools'" fit="true" pill="false"  tabPosition="bottom">
           <div title="队列" style="padding-bottom: 1px;">
               <div id="cmdSeq" class="easyui-panel" fit="true"  style="padding:0px;">

               </div>
           </div>
            <div title="结果" style="padding-bottom:1px">
                <div id="cmdResult" class="easyui-panel" fit="true"  style="padding:0px;">

                </div>
            </div>
        </div>
    </div>
    <div id="tab-tools">
        <a id="btnclear" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-no'"></a>
    </div>
    <div data-options="region:'center',title:'操控区'" style="padding: 15px;">
        <input id="txtPercent" class="easyui-numberspinner" value="100" data-options="min:0,max:100,increment:10" style="width:150px;" label="亮度:"/>
        <input id="txtCS" class="easyui-numberspinner" value="7300" data-options="min:3200,max:9300,increment:100" style="width:150px;" label="色温:"/>
        <a id="btnBrightness" href="#" class="easyui-linkbutton c1" style="width:80px">设置</a>
        <br/><br/>
        <input id="txtGamma" class="easyui-numberspinner" value="2.4" precision="1" data-options="min:0,max:10,increment:0.1" style="width:150px;" label="Gamma:"/>
        <a id="btnGamma" href="#" class="easyui-linkbutton c1" style="width:80px">设置</a>
        <br/><br/>
        <select id="cbCalibrationOnOff" class="easyui-combobox" name="state" label="校正开关:" labelPosition="left" style="width:150px;">
            <option value="0">开</option>
            <option value="1">关</option>
        </select>
        <a id="btnCalibrationOnOff" href="#" class="easyui-linkbutton c1" style="width:80px">设置</a>
        </br/></br/>
        <select id="cbDisplayMode" class="easyui-combobox" name="state" label="显示模式:" labelPosition="left" style="width:200px;">
            <option value="0">视频模式</option>
            <option value="1">测试模式</option>
        </select>
        <select id="cbDisplayColor" class="easyui-combobox" name="state"  labelPosition="left" style="width:100px;">
            <option value="1">红</option>
            <option value="2">绿</option>
            <option value="3">蓝</option>
            <option value="4">白</option>
            <option value="5">黑</option>
        </select>
        <a id="btnDisplayMode" href="#" class="easyui-linkbutton c1" style="width:80px">设置</a>
        </br> </br> </br>
        显示屏开关:<input class="easyui-switchbutton" checked>
        </br> </br> </br>
        <a id="btnOptLog" href="#" class="easyui-linkbutton c1" style="width:80px">操作日志</a>
        <div id="win_opt_log" class="easyui-window" title="操作日志" style="width:900px;height:500px"
             data-options="modal:true,closed:true">
            <table id="gridLog">     </table>
            <div id="tb" style="padding:2px 5px;">
                操作日期: <input class="easyui-datebox" style="width:110px"/>
                到: <input class="easyui-datebox" style="width:110px"/>
                <a href="#" class="easyui-linkbutton" iconCls="icon-search">查询</a>
            </div>
        </div>
        <a id="btnMonitorLog" href="#" class="easyui-linkbutton c1" style="width:80px">监测日志</a>
        <div id="win_monitor_log" class="easyui-window" title="监测日志" style="width:900px;height:450px"
             data-options="modal:true,closed:true">
            <div>
                <select id="cbCalibrationOnOff" class="easyui-combobox" name="state" label="检测量:" labelPosition="left" style="width:200px;">
                    <option value="0">环境亮度</option>
                    <option value="1">温度</option>
                </select>
            </div>
            <div id="container" style="height: 400px; min-width: 310px"></div>
        </div>
    </div>

</body>
</body>
</html>
<script type="text/javascript">
    var mycolumns = [[
        {field:'name',title:'名称',width:100,sortable:true},
        {field:'value',title:'值',width:100,resizable:false}
    ]];

    function decodeUTF8(str) {
        return str.replace(/(\\u)(\w{4}|\w{2})/gi, function ($0, $1, $2) {
            return String.fromCharCode(parseInt($2, 16));
        });
    }

    function LoadComamnds() {
        var url = "./API/ClientAPI.php?tag=1";
        var data = {func:'loadAllCommands',data:{status:0}};
        $.ajax({
            type: 'POST',
            url: url ,
            data: data ,
            async:true,
            dataType: 'json',
            success:function(ret)
            {
                //alert(JSON.stringify(ret));
                var data1 = ret.data;
                var cmdData = data1.data;
               //alert(JSON.stringify(cmdData));
                var html="";
                $.each(cmdData,function(n,value){
                    var status = "等待中...";
                    switch(value.Status)
                    {
                        case "1":
                            status = "等待中...";
                            break;
                        case "2":
                            status = "正在执行...";
                            break;
                        case "3":
                            status = "执行成功...";
                            break;
                        case "4":
                            status = "执行失败...";
                            break;
                    }
                    tmp = $.parseJSON(value.Value);

                    html+="<div>";
                    html+="<label>[" + tmp.commandDate + "] " + unescape(tmp.commandText) + "</label>";
                    html+="<label>" + status + "</label>";
                    html+="</div>";

                });
                $("#cmdSeq").html(html);
            },
            error:function(ret)
            {
                alert(JSON.stringify(ret));
            }
        });
    }

    function loadPLCMonitorData() {
        var url = "./Service/PLCService.php?action=2";
        $('#pg').propertygrid({
            url:url,
            showGroup: true,
            scrollbarSize: 0
        });
    }

    var lastOptLogID = -1;
    function loadLastOptLog(){
        //./Service/OptLogService.php?action=1
        var url = "./Service/OptLogService.php?action=2";
        $.ajax({
            type: 'POST',
            url: url ,
            async:true,
            dataType: 'json',
            success:function(ret)
            {
                $.each(ret,function(n,value){
                    //tmp = JSON.stringify(value);
                    if(value.Status==1 || value.Status == 2) return;
                    if(lastOptLogID==value.ID) return;
                    if(lastOptLogID==-1)
                    {
                        lastOptLogID = value.ID;
                        return;
                    }
                    lastOptLogID = value.ID;
                    //alert(tmp)
                    detailJson = $.parseJSON( value.Details);
                    txt = "";
                    commandDate = detailJson.updateDate;

                    exestate="成功";
                    if(value.Status=="3")
                    {
                        exestate="成功";
                    }
                    else if(value.Status=="4")
                    {
                        exestate="失败";
                    }

                    switch(detailJson.commandId)
                    {
                        case "setGamma":
                            paraJson = detailJson.commandPara;
                            txt += "[" + commandDate + "]";
                            txt += value.Object;
                            txt += "(值:" + paraJson.value + ")";
                            txt += exestate;
                            break;
                        case "setBrightness":
                            paraJson = detailJson.commandPara;
                            txt += "[" + commandDate + "]";
                            txt += value.Object;
                            txt += "(亮度:" + paraJson.percent + "色温:" + paraJson.cs + ")";
                            txt += exestate;
                            break;
                        case "setCalibrationOnOff":
                            paraJson = detailJson.commandPara;
                            txt += "[" + commandDate + "]";
                            txt += value.Object;
                            tmp = "校正开";
                            if(paraJson.value == "0")
                            {
                                tmp = "校正开";
                            }
                            else
                            {
                                tmp = "校正关";
                            }
                            txt += "(" + tmp + ")";
                            txt += exestate;
                            break;
                        case "setDisplayMode":
                            paraJson = detailJson.commandPara;
                            txt += "[" + commandDate + "]";
                            txt += value.Object;
                            mode = "视频模式";
                            if(paraJson.mode == "0")
                            {
                                mode = "视频模式";
                            }
                            else
                            {
                                mode = "测试模式";
                            }
                            var color = "黑"
                            switch(paraJson.color)
                            {
                                case "1":
                                    color = "红"
                                    break;
                                case "2":
                                    color = "绿"
                                    break;
                                case "3":
                                    color = "蓝"
                                    break;
                                case "4":
                                    color = "白"
                                    break;
                                case "5":
                                    color = "黑"
                                    break;
                            }

                            txt += "(" + mode + ":" + color + ")";
                            txt += exestate;
                            break;
                    }
                    //alert(txt);
                    html="<div>";
                    html+="<label>" + txt + "</label>";
//                    html+="<label>" + status + "</label>";
                    html+="</div>";
                    $("#cmdResult").append(html);
                });
            },
            error:function(ret)
            {
                alert(JSON.stringify(ret));
            }
        });
    }

    $(function(){
        loadPLCMonitorData();
        setInterval(LoadComamnds, 200);
        setInterval(loadLastOptLog,200);
        setInterval(loadPLCMonitorData,60000);

        Highcharts.setOptions({

            global: {

                useUTC: false

            },

            lang:{

                months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月','九月',  '十月','十一月', '十二月'],

                weekdays:['星期日',  '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                shortMonths:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月','九月',  '十月','十一月', '十二月']
            }

        });

        $("#btnBrightness").bind("click",function(){
            var url = "./API/ClientAPI.php?tag=1";

            var data = {func:'setBrightness',commandText:escape('亮度'),data:{percent:$("#txtPercent").val(),cs:$("#txtCS").val()}};
            $.ajax({
                type: 'POST',
                url: url ,
                data: data ,
                async:true,
                dataType: 'json',
                success:function(ret)
                {
                    if(ret.status==true)
                    {
                        //alert("设置成功");
                    }
                    else
                    {
                        alert('设置失败.失败原因:' + ret.error);
                    }
                },
                error:function(ret)
                {
                    alert(JSON.stringify(ret));
                }
            });
        });

        $("#btnGamma").bind("click",function(){
            var url = "./API/ClientAPI.php?tag=1";
            var data = {func:'setGamma',commandText:'GAMMA',data:{value:$("#txtGamma").val()}};
            $.ajax({
                type: 'POST',
                url: url ,
                data: data ,
                async:true,
                dataType: 'json',
                success:function(ret)
                {
                    if(ret.status==true)
                    {
                        //alert("设置成功");
                    }
                    else
                    {
                        alert('设置失败.失败原因:' + ret.error);
                    }
                },
                error:function(ret)
                {
                    alert(JSON.stringify(ret));
                }
            });
        });

        $("#btnCalibrationOnOff").bind("click",function(){
            var url = "./API/ClientAPI.php?tag=1";
            var data = {func:'setCalibrationOnOff',commandText:escape('校正开关'),data:{value:$("#cbCalibrationOnOff").combobox('getValue')}};
            $.ajax({
                type: 'POST',
                url: url ,
                data: data ,
                async:true,
                dataType: 'json',
                success:function(ret)
                {
                    if(ret.status==true)
                    {
                       // alert("设置成功");
                    }
                    else
                    {
                        alert('设置失败.失败原因:' + ret.error);
                    }
                },
                error:function(ret)
                {
                    alert(JSON.stringify(ret));
                }
            });
        });

        $("#btnDisplayMode").bind("click",function(){
            var url = "./API/ClientAPI.php?tag=1";
            var data = {func:'setDisplayMode',commandText:escape('显示模式'),data:{mode:$("#cbDisplayMode").combobox('getValue'),color:$("#cbDisplayColor").combobox('getValue')}};
            $.ajax({
                type: 'POST',
                url: url ,
                data: data ,
                async:true,
                dataType: 'json',
                success:function(ret)
                {
                    if(ret.status==true)
                    {
                        // alert("设置成功");
                    }
                    else
                    {
                        alert('设置失败.失败原因:' + ret.error);
                    }
                },
                error:function(ret)
                {
                    alert(JSON.stringify(ret));
                }
            });
        });

        $("#btnOptLog").bind("click",function(){
            queryParam = {};
            $('#gridLog').datagrid({
                toolbar: '#tb',
                url:'./Service/OptLogService.php?action=1',
                queryParam:queryParam,
                rownumbers:true,
                singleSelect:true,
                pagination:true,
                loadMsg:'数据加载中...',
                emptyMsg:'没有操作记录',
                columns:[[
                    {field:'sname',title:'显示屏',width:150},
                    {field:'content',title:'操作内容',width:180},
                    {field:'detail',title:'详细内容',width:370},
                    {field:'optdate',title:'操作日期',width:130},
                ]]
            });
            p = $('#gridLog').datagrid('getPager');
            $(p).pagination({
                pageSize: 15,//每页显示的记录条数，默认为10
                pageList: [5,10,15],//可以设置每页记录条数的列表
                beforePageText: '第',//页数文本框前显示的汉字
                afterPageText: '页    共 {pages} 页',
                displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
                /*onBeforeRefresh:function(){
                 $(this).pagination('loading');
                 alert('before refresh');
                 $(this).pagination('loaded');
                 }*/
            });
            $("#win_opt_log").window('open');
        });

        $("#btnMonitorLog").bind("click",function(){
            $.getJSON('http://datas.org.cn/jsonp?filename=json/aapl-c.json&callback=?', function (data) {
                // Create the chart
                $('#container').highcharts('StockChart', {
                    rangeSelector: {

                        buttons: [{//定义一组buttons,下标从0开始

                            type: 'week',

                            count: 1,

                            text: '1周'

                        },{

                            type: 'month',

                            count: 1,

                            text: '1月'

                        }, {

                            type: 'month',

                            count: 3,

                            text: '3月'

                        }, {

                            type: 'month',

                            count: 6,

                            text: '6月'

                        }, {

                            type: 'ytd',

                            text: '1季度'

                        }, {

                            type: 'year',

                            count: 1,

                            text: '1年'

                        }, {

                            type: 'all',

                            text: '全部'

                        }],

                        buttonTheme: {

                            width: 36,

                            height: 16,

                            padding: 1,

                            r: 0,

                            stroke: '#68A',

                            zIndex: 7

                        },

                        inputDateFormat: '%Y-%m-%d',

                        inputEditDateFormat: '%Y-%m-%d',

                        selected: 1//表示以上定义button的index,从0开始

                    },
                    title: {
                        text: '监测日志'
                    },
                    navigator: {
                        enabled: false
                    },
                    series: [{
                        name: '监测值',
                        data: data,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            });
            $('#win_monitor_log').window('open');  // open a window
            //$('#win_monitor_log').window('refresh', './Client/Opt_Log.php');
        });

        $("#btnclear").bind("click",function(){
            $("#cmdSeq").html('');
            $("#cmdResult").html('');
        });

        <?php $timestamp = time();?>
        $('#file_upload').uploadify({
            'formData'     : {
                'timestamp' : '<?php echo $timestamp;?>',
                'token'     : '<?php echo md5('unique_salt' . $timestamp);?>'
            },
            'buttonClass' : 'some-class',
            buttonText:"上传PLC文件",
            'swf'      : './Script/uploadify/uploadify.swf',
            'uploader' : './Script/uploadify/uploadify.php'
        });
    });
</script>