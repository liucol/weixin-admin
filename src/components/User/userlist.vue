<template>
    <div>
            <div class="header">
                    <h1 class="page-header">
                        玩家列表
                    </h1>
                </div>
                <div id="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="newsbuttons">
                                <div class="searchgamebag">
                                    <div class="searchinput searchbyname">
                                        <div class="starttimewap">
                                            <label>开始时间：</label>
                                            <input v-model="starttime"/> 
                                            <span>例子：2018-07-28 15:00:00</span>
                                        </div>
                                        <div class="endtimewap">
                                            <label>结束时间：</label>
                                            <input v-model="endtime"/>
                                            <span>例子：2018-07-28 16:00:00</span>
                                        </div>
                                    </div>
                                    <span class="searchuserbutton" @click="getuser()">查询</span>
                                    <span class="importuserbutton" @click="importuser()">导出</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Advanced Tables -->
                            <div class="table-responsive userListTable">
                                <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                    <thead>
                                    <tr>
                                        <!-- <th>ID</th> -->
                                        <th>游戏名称</th>
                                        <th>角色</th>
                                        <th>区服</th>
                                        <th>区号</th>
                                        <th>支付方式</th>
                                        <th>交易单号1</th>
                                        <th>交易单号2</th>
                                        <th>新注册账号</th>
                                        <th>手机号</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody> 
                                        <tr
                                            v-for="(list,index) in userlist"
                                        >
                                            <!-- <td>{{list.Id}}</td> -->
                                            <td>{{list.GameName}}</td>
                                            <td>{{list.RoleName}}</td>
                                            <td>{{list.Zone}}</td>
                                            <td>{{list.ZoneNum}}</td>
                                            <td>{{list.PayType}}</td>
                                            <td>{{list.Order1}}</td>
                                            <td>{{list.Order2}}</td>
                                            <td>{{list.Account}}</td>
                                            <td>{{list.PhoneNum}}</td>
                                            <td>     
                                                -
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--End Advanced Tables -->
                        </div>
                    </div>
                    <!--分页-->
                    <!-- <div class="row">
                        <div class="col-md-12 paginationWrap">
                            <nav aria-label="...">
                                <span class="total">共 16 页</span>
                                <ul class="page">
                                    <li class="disabled"><a href="#"><i class="iconfont">&#xe697;</i></a></li>
                                    <li class="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                    <li><a href="#"><i class="iconfont">&#xe6a7;</i></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div> -->
                </div>
                <!--确定删除弹窗-->
                <div class="modal fade" id="deleteButtonModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="myModalLabel">提示</h4>
                            </div>
                            <div class="modal-body">
                                您确定要删除吗？
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-primary deleteSureBtn">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import url from 'js/api.js'
    export default {
        data() {
            return {
                starttime: "",
                endtime: "",
                userlist: null
            }
        },
        created() {

        },
        methods: {
            getuser() {
                var starttimedata = this.starttime,
                    endtimedata = this.endtime

                if (starttimedata == "") {
                    alert("开始时间不能为空")
                    return
                }

                if (starttimedata != "" && endtimedata != "") {
                    var startsorttime = changetime(starttimedata),
                        endsorttime = changetime(endtimedata)

                    if (startsorttime > endsorttime) {
                        alert("结束时间不能小于开始时间")
                        return
                    }
                }

                axios.get(url.pnuserlist + "?startTime=" + starttimedata + "&endTime=" + endtimedata).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg,
                        data = res.data.Data

                    this.userlist = data
                    if (code == 0) {
                        if (data.length == 0) {
                            alert("该时间段没有数据哟")
                        }
                    } else {
                        alert(msg)
                    }

                })

                function changetime(strtime) {
                    var repdata = strtime.replace(/-/g, '/'), //转换成特定格式： 2018/07/12 12:00:00
                        dataobj = new Date(repdata), //转换成时间对象
                        sorttime = dataobj.getTime()

                    return sorttime
                }
            },
            importuser() {
                if (this.userlist == null) {
                    alert("错误原因：1，还没查询。   2，该时间段没有数据哟。")
                } else {
                    //列标题
                    var str = '<tr><td>游戏名称</td><td>角色名</td><td>区服</td><td>区号</td><td>支付方式</td><td>交易单号1</td><td>交易单号2</td><td>新注册账号</td><td>手机号</td><td>提交日期</td></tr>'
                        //循环遍历，每行加入tr标签，每个单元格加td标签
                    for (let i = 0; i < this.userlist.length; i++) {
                        str += '<tr>'
                        for (let item in this.userlist[i]) {
                            //增加\t为了不让表格显示科学计数法或者其他格式 \u200C
                            if (item == "Order1" || item == "Order2" || item == "Account") {
                                str += `<td style="mso-number-format:'\@';" >${ this.userlist[i][item]}</td>`
                            } else {
                                str += `<td>${ this.userlist[i][item]}</td>`
                            }

                        }
                        str += '</tr>'
                    }
                    //Worksheet名
                    var worksheet = 'Sheet1'
                    var uri = 'data:application/vnd.ms-excel;base64,'

                    //下载的表格模板数据
                    var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
                                    xmlns:x="urn:schemas-microsoft-com:office:excel" 
                                    xmlns="http://www.w3.org/TR/REC-html40">
                                    <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
                                    <x:Name>${worksheet}</x:Name>
                                    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
                                    </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
                                    </head><body><table>${str}</table></body></html>`
                        //下载模板
                        //window.location.href = uri + base64(template);
                    window.open(uri + base64(template), "_blank")
                }
                //输出base64编码
                function base64(s) {
                    return window.btoa(unescape(encodeURIComponent(s)))
                }
            }
        }
    }
</script>
<style>
    #page-inner .newsbuttons {
        border-bottom: 1px solid #DFDFDF;
        margin-bottom: 40px;
        overflow: hidden;
    }
    
    #page-inner .addnews {
        display: inline-block;
        padding: 5px 10px 10px 10px;
        border-radius: 5px;
        margin-bottom: -5px;
        background-color: #01D19C;
        color: #fff;
    }
    
    #page-inner .searchuser {
        display: inline-block;
    }
    
    #page-inner .starttimewap {
        margin-bottom: 15px;
    }
    
    #page-inner .endtimewap {
        margin-bottom: 15px;
    }
    
    #page-inner .searchinput {
        display: block;
        margin-left: 15px;
    }
    
    #page-inner .searchinput input {
        border: 1px solid #ccc;
        width: 150px;
        padding: 4px;
        border-radius: 4px;
    }
    
    #page-inner .searchuserbutton,
    #page-inner .importuserbutton {
        display: inline-block;
        margin-left: 88px;
        padding: 5px 62px;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
    }
    
    #page-inner .searchuserbutton {
        background-color: #FF982E;
    }
    
    #page-inner .importuserbutton {
        background-color: #263131;
    }
    
    .userListTable tbody tr {
        background-color: #FAFAFA;
    }
    
    .userListTable thead {
        background-color: #4D4C51;
        color: #E3E2E7;
    }
    
    .userListTable thead th {
        padding-left: 20px !important;
        border-color: transparent !important;
        border-bottom: 1px solid #4D4C51 !important;
    }
    
    .imgwap img {
        width: 40px;
    }
    
    .userListTable thead th:nth-last-child(1) {
        padding-left: 0;
        text-align: center;
    }
    
    .userListTable tbody td {
        padding-left: 20px !important;
    }
    
    .userListTable tbody td:nth-last-child(1) {
        padding-left: 0;
        text-align: center;
    }
    
    .table-hover>tbody>tr:hover {
        background-color: #E0F4F2;
    }
    
    .userListTable tbody a {
        display: inline-block;
    }
    
    .userListTable .table {
        margin-bottom: 0 !important;
    }
    
    .editor {
        cursor: pointer;
    }
    
    .operateButton {
        display: inline-block;
        padding: 3px 17px;
        border-radius: 15px;
        background-color: #F8FFFC;
    }
    
    .modifyButton {
        border: 1px solid #01D19C;
        text-decoration: none;
        color: #01D19C;
    }
    
    .modifyButtonA {
        margin-right: 5px;
    }
    
    .deleteButton {
        cursor: pointer;
        border: 1px solid #A8A8B0;
        color: #A8A8B0;
    }
</style>