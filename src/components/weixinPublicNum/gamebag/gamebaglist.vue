<template>
    <div>
        <div class="header">
            <h1 class="page-header">
                游戏包列表
            </h1>
            <ol class="breadcrumb">
                <li>公众号功能</li>
                <li class="active">游戏包列表</li>
            </ol>

        </div>
        <div id="page-inner">
            <div class="row">
                <div class="col-md-12">
                    <div class="newsbuttons">
                        <a href="#/publicnum/addgamebag">
                            <span class="addnews">新增游戏包</span>
                        </a>
                        <div class="searchgamebag">
                            <div class="searchinput searchbyname">
                                <label>游戏名称：</label>
                                <!-- <select v-model="gwaddgamebags.game.id"> -->
                                <select v-model="origingamename">
                                    <option value="">全部</option>
                                    <option 
                                        v-for="(list,index) in OldName"
                                        v-bind:value="list.Name">{{list.Name}}</option>
                                </select>
                            </div>
                            <span class="searchsbmit" @click="search()">搜索</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <!-- Advanced Tables -->
                    <div class="table-responsive gamebagListTable">
                        <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>原游戏</th>
                                    <th>操作系统</th>
                                    <th>游戏名称</th>
                                    <th>区服</th>
                                    <th>登录方式</th>
                                    <th>下载链接</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(list,index) in gamebaglist">
                                    <td>{{list.Id}}</td>
                                    <td>{{list.OldName}}</td>
                                    <td>{{list.System}}</td>
                                    <td>{{list.Name}}</td>
                                    <td class="center">{{list.Zone}}</td>
                                    <td>{{list.Login}}</td>
                                    <td>{{list.DownLink}}</td>
                                    <td v-if="list.Status == 0">正常</td>
                                    <td v-if="list.Status == 1">冻结</td>
                                    <td>
                                        <a :href="'#/publicnum/modifygamebag?id='+list.Id" class="modifyButtonA">
                                            <span class="operateButton modifyButton">修改</span>
                                        </a>
                                        <span class="operateButton deleteButton" data-toggle="modal" data-target="#deleteButtonModal" @click="getgamebagid(list.Id)">删除</span>
                                        <span class="operateButton freezeButton" @click="freezeopera(list.Id,1)">冻结</span>
                                        <span class="operateButton unfreezeButton"  @click="freezeopera(list.Id,0)">解冻</span>
                                    </td>
                                </tr>
                                <!-- <tr>
                                        <td>1</td>
                                        <td>xx</td>
                                        <td>mm</td>
                                        <td>nnn</td>
                                        <td>yyy</td>
                                        <td class="center">sss</td>
                                        <td>kkk</td>
                                        <td>bbb</td>
                                        <td>
                                            <a href="#/publicnum/modifygamebag" class="modifyButtonA"><span class="operateButton modifyButton">修改</span></a>
                                            <span class="operateButton deleteButton" data-toggle="modal" data-target="#deleteButtonModal">删除</span>
                                        </td>
                                    </tr> -->
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
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">提示</h4>
                    </div>
                    <div class="modal-body">
                        您确定要删除吗？
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary deleteSureBtn" @click="deletgamebag()">确定</button>
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
                origingamename: "",
                OldName: [],
                gamebaglist: null,
                deletgamebagid: null
            }
        },
        created() {
            this.getgamebaglist()
        },
        methods: {
            getgamebaglist() {
                axios.get(url.pngamebaglist).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg,
                        data = res.data.Data,
                        oldnamearray = []

                    if (code == 0) {
                        this.gamebaglist = data

                       for(var i=0;i<data.length;i++){
                            var indexof = oldnamearray.indexOf(data[i].OldName)
                           
                            if(indexof < 0){
                                var oldgameobj = {
                                       Id: data[i].Id,
                                       Name: data[i].OldName
                                    }
                                    
                                oldnamearray.push(data[i].OldName)
                                this.OldName.push(oldgameobj)
                            }
                       }
                        
                    } else if (code == 2) {
                        window.location.href = url.login
                    } else {
                        alert(msg)
                    }

                })
            },
            search(){
                axios.get(url.pngamebaglist + "?OldName=" + this.origingamename).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg,
                        data = res.data.Data

                    if (code == 0) {
                        this.gamebaglist = data
                    } else if (code == 2) {
                        window.location.href = url.login
                    } else {
                        alert(msg)
                    }
                })
            },
            getgamebagid(id) {
                this.deletgamebagid = id
            },
            deletgamebag() {
                axios.get(url.pndeletgamebag + "/" + this.deletgamebagid).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg

                    if (code == 0) {
                        setTimeout(function () {
                            window.location.reload()
                        }, 100)
                    } else if (code == 2) {
                        window.location.href = url.login
                    } else {
                        alert(msg)
                    }

                })
            },
            freezeopera(gamebagid,setid){
                axios.get(url.pnfreezegamebag + "/"+gamebagid+"?flag=" + setid).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg

                    if (code == 0) {
                        setTimeout(function () {
                            window.location.reload()
                        }, 100)
                    } else if (code == 2) {
                        window.location.href = url.login
                    } else {
                        alert(msg)
                    }
                })
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

    #page-inner .searchgamebag {
        display: inline-block;
    }

    #page-inner .searchinput {
        display: inline-block;
        margin-left: 15px;
    }

    #page-inner .searchinput select {
        border: 1px solid #ccc;
        width: 150px;
        padding: 4px;
        border-radius: 4px;
    }

    #page-inner .searchsbmit {
        display: inline-block;
        margin-left: 15px;
        padding: 3px 15px;
        background-color: #FF982E;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
    }

    .gamebagListTable tbody tr {
        background-color: #FAFAFA;
    }

    .gamebagListTable thead {
        background-color: #4D4C51;
        color: #E3E2E7;
    }

    .gamebagListTable thead th {
        padding-left: 20px !important;
        border-color: transparent !important;
        border-bottom: 1px solid #4D4C51 !important;
    }

    .gamebagListTable thead th:nth-last-child(1) {
        padding-left: 0;
        text-align: center;
    }

    .gamebagListTable tbody td {
        padding-left: 20px !important;
    }

    .gamebagListTable tbody td:nth-last-child(1) {
        padding-left: 0;
        text-align: center;
    }

    .table-hover>tbody>tr:hover {
        background-color: #E0F4F2;
    }

    .gamebagListTable tbody a {
        display: inline-block;
    }

    .gamebagListTable .table {
        margin-bottom: 0 !important;
    }

    .operateButton {
        display: inline-block;
        padding: 3px 17px;
        border-radius: 15px;
        background-color: #F8FFFC;
        cursor: pointer;
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
        border: 1px solid #A8A8B0;
        color: #A8A8B0;
    }
    .freezeButton{
       border: 1px solid #E83A1E;
       color: #E83A1E;
    }
    .unfreezeButton{
        border: 1px solid rgb(124, 65, 218);
        color: rgb(124, 65, 218);
    }
</style>