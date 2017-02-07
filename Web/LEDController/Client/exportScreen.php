<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="../Css/themes/default/easyui.css"/>
    <link rel="stylesheet" type="text/css" href="../Css/themes/default/color.css"/>
    <link rel="stylesheet" type="text/css" href="../Css/themes/icon.css">
    <script type="text/javascript" src="../Script/jquery.min.js"></script>
    <!--    <script type="text/javascript" src="http://cdn.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>-->
    <script type="text/javascript" src="../Script/jquery.easyui.min.js"></script>
    <!--    <script src="http://cdn.hcharts.cn/highstock/highstock.js"></script>-->
    <!--    <script src="http://cdn.hcharts.cn/highstock/modules/exporting.js"></script>-->
    <title>LED控制系統</title>
</head>
<body>
<form id="fm" method="post" enctype="multipart/form-data">
    <div style="margin:20px">
        <input id="name" name="name" class="easyui-filebox" label="文件:" labelPosition="top"
               data-options="buttonText:'选择',prompt:'选择屏幕配置文件...'" style="width:90%">
        </br>
        <a id="btnUpload" href="#" class="easyui-linkbutton" style="width:100%" onclick="uploadFiles();">上传</a>
    </div>
</form>
</body>
</html>
<script type="text/javascript">
    function uploadFiles() {
             $('#fm').form('submit', {
                            url: 'Upload.php?type=1',
                             success: function (result) {
                                 alert(result);
                                 //var result = eval('(' + result + ')');
                                 //可以写一些提示的代码等等..
                             }
                     });
         }
</script>