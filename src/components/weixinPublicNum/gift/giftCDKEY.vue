<template>
    <div>
            <div class="header">
                    <h1 class="page-header">
                        {{giftName}}CDKEY列表
                    </h1>
                    <ol class="breadcrumb">
                        <li>公众号功能</li>
                        <li>
                            <a href="#/publicnum/giftlist">礼包列表</a>
                        </li>
                        <li class="active">
                            CDKEY列表
                            <span class="back" @click= "back()">返回</span>
                        </li>
                    </ol>
                </div>
                <div id="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="newsbuttons">
                                <div class="batch">
                                     <label>批次：</label> 
                                     <input v-model="batch"/> 
                                </div>
                                <label class="addnews" for="importfile">导入礼包CDKEY</label>
                                <input id="importfile" type="file" @change="importfile('#importfile')"/>
                                <label class="deletbatch" @click="batchdelet()">删除</label>
                                <!-- <div class="searchgiftcdkey">
                                    <div class="searchinput searchbyname">
                                            <label>游戏名称：</label>
                                            <select v-model="gwaddgiftcdkeys.game.id"> 
                                            <select>
                                                    <option  value="">请选择</option>
                                                    <option 
                                                        v-for="(list,index) in gamelist"
                                                        v-bind:value="list.id">{{list.name}}</option>
                                            </select>
                                    </div>
                                    <span class="searchsbmit">搜索</span>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Advanced Tables -->
                            <div class="table-responsive giftcdkeyTable">
                                <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>批次</th>
                                        <th>礼包名称</th>
                                        <th>CDK(礼包码)</th>
                                        <th>创建时间</th>
                                        <th>状态</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                        v-for="(list,index) in giftcdkey"
                                    >
                                        <td>{{list.Id}}</td>
                                        <td>{{list.Batch}}</td>
                                        <td>{{list.Gift.Name}}</td>
                                        <td>{{list.Key}}</td>
                                        <td class="center">{{list.CreateTime}}</td>
                                        <td v-if="list.Status == 0">未领取</td>
                                        <td v-if="list.Status == 1">已领取</td>
                                        <td v-if="list.Status == 2">已过期</td>
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
                                            <a href="#/publicnum/modifygiftcdkey" class="modifyButtonA"><span class="operateButton modifyButton">修改</span></a>
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
                                <button type="button" class="btn btn-primary deleteSureBtn" @click = "deletgiftcdkey()">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>
<script>
    import axios from 'axios'   
    import qs from 'qs'
    import url from 'js/api.js'

    export default {
        data() {
            return {
                giftId: null,
                giftName: null,
                giftcdkey: null,
                //deletgiftcdkeyid: null,
                batch: null
            }
        },
        created() {
           this.getgiftid()
           this.getgiftcdkey()
        },
        methods: {
            getgiftid(){
                let urlarry = location.hash.split('?')[1],
                    giftid = qs.parse(urlarry).Id,
                    giftname = qs.parse(urlarry).Name

                this.giftId = giftid
                this.giftName = giftname
            },
            getgiftcdkey(){
                axios.get(url.pngiftcdkeylist+"?gift="+this.giftId).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg

                    if(code == 0){
                        this.giftcdkey = res.data.Data
                    }else if(code == 2){
                        window.location.href = url.login
                    }else{
                        alert(msg)
                    }
                   
                })
            },
            getgiftcdkeyid(id){
                this.deletgiftcdkeyid = id 
            },
            batchdelet(){
                if(!this.batch){
                   alert("亲，批次不能为空哟~")
                   return
                }

                axios.get(url.pndeletbatchcdkey+"?gift="+this.giftId+"&batch="+this.batch).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg

                    if(code == 0){
                        // setTimeout(function(){
                        //     window.location.reload()
                        // },100)
                    }else if(code == 2){
                        window.location.href = url.login
                    }else{
                        alert(msg)
                    }
                   
                })
            },
            importfile(dom){
                var $file = $(dom),
                    filename = $file[0].files[0],
                    _this = this

                if(!_this.batch){
                   alert("亲，批次不能为空哟~")
                   return
                }    

                var form = new FormData()

                    form.append("uploadfile", filename)
                    form.append("giftid", _this.giftId)
                    form.append("batch", _this.batch)

                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": url.pnimportfile,
                        "method": "POST",
                        "processData": false,
                        "contentType": false,
                        "mimeType": "multipart/form-data",
                        "data": form
                    }


                    axios(settings).then(res => {
                        var dataobj = res.data.Data

                            _this.giftcdkey = dataobj
                    })
            },
            back(){
              window.history.back()
            }
        }
    }
</script>
<style>
/*返回*/

.back {
    display: inline-block;
    padding: 3px 15px;
    margin-left: 30px;
    background-color: #337ab7;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
}
#page-inner .newsbuttons{
    border-bottom: 1px solid #DFDFDF;
    margin-bottom: 40px;
    overflow: hidden;
}
#page-inner .addnews{
    display: inline-block;
    padding: 5px 10px 10px 10px;
    border-radius: 5px;
    margin-bottom: -5px;
    background-color: #01D19C;
    color: #fff;
    cursor: pointer;
}
#page-inner .deletbatch{
    background-color:#7E6092;
    color:  #fff;
    display: inline-block;
    padding: 5px 10px 10px 10px;
    border-radius: 5px;
    margin-bottom: -5px;
    cursor: pointer;
}
#importfile{
    display: none;
}
.batch{
    display: inline-block;
}
#page-inner  .searchgiftcdkey{
    display: inline-block;
}
#page-inner  .searchinput{
    display: inline-block;
    margin-left:  15px;
}
#page-inner  .searchinput select,
.batch input{
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
.giftcdkeyTable tbody tr{
    background-color: #FAFAFA;
}
.giftcdkeyTable thead{
    background-color: #4D4C51;
    color: #E3E2E7;
}
.giftcdkeyTable thead th{
    padding-left: 20px !important;
    border-color: transparent !important;
    border-bottom: 1px solid #4D4C51 !important;
}
.giftcdkeyTable thead th:nth-last-child(1){
    padding-left: 0;
    text-align: center;
}
.giftcdkeyTable tbody td{
    padding-left: 20px !important;
}
.giftcdkeyTable tbody td:nth-last-child(1){
    padding-left: 0;
    text-align: center;
}

.table-hover>tbody>tr:hover{
    background-color: #E0F4F2;
}

.giftcdkeyTable tbody a{
    display: inline-block;
}
.giftcdkeyTable .table{
    margin-bottom: 0 !important;
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
    margin-right: 10px;
}
.deleteButton{
    cursor: pointer;
    border: 1px solid #A8A8B0;
    color: #A8A8B0;
}
</style>