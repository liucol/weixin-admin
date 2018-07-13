<template>
        <div>
                <div class="header">
                        <h1 class="page-header">
                            原游戏列表
                        </h1>
                        <ol class="breadcrumb">
                            <li>公众号功能</li>
                            <li class="active">原游戏列表</li>
                        </ol>
            
                    </div>
                    <div id="page-inner">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="newsbuttons">
                                    <a href="#/publicnum/addorigingame"><span class="addnews">新增原游戏</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <!-- Advanced Tables -->
                                <div class="table-responsive origingameListTable">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>原游戏</th>
                                            <th>下载链接</th>
                                            <th>游戏图片</th>
                                            <th>礼包游戏图片</th>
                                            <th>游戏简介</th>
                                            <th>操作</th>
                                        </tr>
                                        </thead>
                                        <tbody> 
                                        <tr
                                            v-for="(list,index) in origingame"
                                        >
                                            <td>{{list.Id}}</td>
                                            <td>{{list.OldName}}</td>
                                            <td>{{list.DownLink}}</td>
                                            <td class="imgwap">
                                                <img 
                                                    v-for="(list,index) in list.Link"
                                                    :src="list.Linkdir"
                                                    />
                                            </td>
                                            <td class="imgwap">
                                                <img 
                                                    v-for="(list,index) in list.GiftPicture"
                                                    :src="list.Linkdir"
                                                    />
                                            </td>
                                            <td><a :href="'#/publicnum/origingameintroduct?id='+list.Id" class="editor">编辑</a></td>
                                            <td>     
                                                <a :href="'#/publicnum/modifyorigingame?id='+list.Id" class="modifyButtonA"><span class="operateButton modifyButton">修改</span></a>
                                                <span class="operateButton deleteButton" data-toggle="modal" data-target="#deleteButtonModal" @click="getorigingameid(list.Id)">删除</span>
                                            </td>
                                        </tr>
                                        <!-- <tr>
                                            <td>1</td>
                                            <td>xx</td>
                                            <td>bbb</td>
                                            <td>
                                                <a href="#/publicnum/modifyorigingame" class="modifyButtonA"><span class="operateButton modifyButton">修改</span></a>
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
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title" id="myModalLabel">提示</h4>
                                </div>
                                <div class="modal-body">
                                    您确定要删除吗？
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                    <button type="button" class="btn btn-primary deleteSureBtn"  @click = "deletorigingame()">确定</button>
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
                    origingame: null,
                    deletorigingameid: null
                }
            },
            created() {
               this.getorigingame()
            },
            methods: {
                getorigingame(){
                    axios.get(url.pnorigingamelist).then(res => {
                        var code = res.data.Code,
                            msg = res.data.Msg

                        if(code == 0){
                            this.origingame = res.data.Data
                        }else if(code == 2){
                            window.location.href = url.login
                        }else{
                            alert(msg)
                        }
                    
                    })
                },
                getorigingameid(id){
                    this.deletorigingameid = id
                },
                deletorigingame(){
                    axios.get(url.pndeletorigingame+"/"+this.deletorigingameid).then(res => {
                        var code = res.data.Code,
                            msg = res.data.Msg

                        if(code == 0){
                            setTimeout(function(){
                                window.location.reload()
                            },100)
                        }else if(code == 2){
                            window.location.href = url.login
                        }else{
                            alert(msg)
                        }
                        
                    })
                }
            }
        }
    </script>
    <style>
    #page-inner .newsbuttons{
        border-bottom: 1px solid #DFDFDF;
        margin-bottom: 40px;
        overflow: hidden;
    }
    #page-inner  .addnews{
        display: inline-block;
        padding: 5px 10px 10px 10px;
        border-radius: 5px;
        margin-bottom: -5px;
        background-color: #01D19C;
        color: #fff;
    }
    #page-inner  .searchorigingame{
        display: inline-block;
    }
    #page-inner  .searchinput{
        display: inline-block;
        margin-left:  15px;
    }
    #page-inner  .searchinput select{
        border: 1px solid #ccc;
        width: 150px;
        padding: 4px;
        border-radius: 4px;
    }
    #page-inner  .searchsbmit{
        display: inline-block;
        margin-left: 15px;
        padding: 3px 15px;
        background-color: #FF982E;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
    }
    .origingameListTable tbody tr{
        background-color: #FAFAFA;
    }
    .origingameListTable thead{
        background-color: #4D4C51;
        color: #E3E2E7;
    }
    .origingameListTable thead th{
        padding-left: 20px !important;
        border-color: transparent !important;
        border-bottom: 1px solid #4D4C51 !important;
    }
    .imgwap img{
        width: 40px;
    }
    .origingameListTable thead th:nth-last-child(1){
        padding-left: 0;
        text-align: center;
    }
    .origingameListTable tbody td{
        padding-left: 20px !important;
    }
    .origingameListTable tbody td:nth-last-child(1){
        padding-left: 0;
        text-align: center;
    }
    
    .table-hover>tbody>tr:hover{
        background-color: #E0F4F2;
    }
    
    .origingameListTable tbody a{
        display: inline-block;
    }
    .origingameListTable .table{
        margin-bottom: 0 !important;
    }
    .editor{
        cursor: pointer;
    }
    .operateButton{
        display: inline-block;
        padding: 3px 17px;
        border-radius: 15px;
        background-color: #F8FFFC;
    }
    .modifyButton{
        border: 1px solid #01D19C;
        text-decoration: none;
        color: #01D19C;
    }
    .modifyButtonA{
        margin-right: 5px;
    }
    .deleteButton{
        cursor: pointer;
        border: 1px solid #A8A8B0;
        color: #A8A8B0;
    }
    </style>