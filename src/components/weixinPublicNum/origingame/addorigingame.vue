<template>
        <div>
            <div class="header">
                <h1 class="page-header">
                    新增原游戏
                </h1>
                <ol class="breadcrumb">
                    <li>公众号功能</li>
                    <li>
                        <a href="#/publicnum/origingamelist">原游戏列表</a>
                    </li>
                    <li class="active">
                        新增原游戏
                        <span class="back" @click= "back()">返回</span>
                    </li>
                </ol>
            </div>
            <div id="page-inner">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="col-lg-12 addorigingameFormWrapper">
                            <div class="addorigingameForm">
                                <div class="addorigingameInput">
                                    <label>原游戏：</label>
                                    <input v-model="origingamename.OldName"/>
                                </div>
                                <div  class="addorigingameInput">    
                                    <label>下载链接：</label>
                                    <input v-model="origingamename.DownLink"/>
                                    <span id="SubmitButton" @click="addorigingameinfo()">提交原游戏</span>
                                </div>
                                <div class="addorigingameInput">
                                    <form id="upimg">
                                        <label>游戏图片：</label>
                                        <input type="file" id="picture" name="uploadfile" class="uploadpic" @change="upimg('#picture',0)" value="上传图片"/>
                                        <div class="imgShow clearfix">
                                            <div class="imgwrap"
                                                 v-for="(list,index) in origingame.Link"
                                            >
                                                <img  :src="list.Linkdir"  class="fileimg"><i @click="delet(list.Id,index)" class="delet">x</i>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="addorigingameInput">
                                    <label>礼包游戏图片：</label>
                                    <input type="file" id="slidepicture" name="uploadfile" class="uploadpic" @change="upimg('#slidepicture',1)" value="上传图片"/>
                                    <div class="imgShow clearfix">
                                        <div class="imgwrap"
                                             v-for="(list,index) in origingame.slidelink"
                                        >
                                            <img  :src="list.Linkdir" class="fileimg"><i @click="deletslideimg(list.Id,index)" class="delet">x</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="addorigingameSubmit">
                                <span id="SubmitButton" @click="submite()">提交图片</span>
                                <span>温馨提示：提交图片前请先提交原游戏相关信息哟~</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <script>
        import $ from 'jquery'
        import axios from 'axios'   
        import url from 'js/api.js' 
    
        export default {
    
            data() {
                return {
                    origingamename: {
                        OldName: null,
                        DownLink: null
                    },
                    addoriginimg: url.pnaddoriginimg,
                    origingame: {
                        Id: null,
                        OldName: null,
                        Link: [],   //原游戏图片
                        slidelink: []  //原游戏礼包列表显示的图片
                    },
                    dataimgwrap: null
                   
                }
            },
            created() {
            },
            methods: {
                // addorigingame(){
                //     axios.post(url.pnaddorigingame,this.origingame).then(res => {
                //         var code = res.data.Code,
                //             msg = res.data.Msg

                //         if(code == 0){
                //             window.location.href = "#/publicnum/origingamelist"
                //         }else if(code == 2){
                //             window.location.href = url.login
                //         }else{
                //             alert(msg)
                //         }
                //     })
                // },
                addorigingameinfo(){
                    axios.post(url.pnaddorigingame,this.origingamename).then(res => {
                        var code = res.data.Code,
                            msg = res.data.Msg,
                            data = res.data.Data

                        if(code == 0){
                            alert("提交成功")
                            this.origingame.Id = data.Id
                            this.origingame.OldName = data.OldName

                            this.addoriginimg = this.addoriginimg + '/'+data.Id
                        }else if(code == 2){
                            window.location.href = url.login
                        }else{
                            alert(msg)
                        }
                    })
                },
                upimg(dom,type){
                    // dom： 图片上传的dom节点
                    //type: 0-游戏包搜索的原游戏图片上传    2-礼包领取游戏列表的图片上传
                    var $picture = $(dom),
                        current_pic = $picture[0].files[0],
                        _this = this
                        
                        var form = new FormData(),
                            url = this.addoriginimg

                            form.append("uploadfile", current_pic)
                            if(type == 1){
                                form.append("type", 1)
                            }

                            var settings = {
                                "async": true,
                                "crossDomain": true,
                                "url": url,
                                "method": "POST",
                                "processData": false,
                                "contentType": false,
                                "mimeType": "multipart/form-data",
                                "data": form
                            }


                            axios(settings).then(res => {
                                var dataobj = res.data.Data
                                if(type == 0){
                                    _this.origingame.Link.push(dataobj)
                                }else if(type == 1){
                                    _this.origingame.slidelink.push(dataobj)
                                }
                                
                            })
                },
                delet(id,index){
                    axios.get(url.pnorigingamedeletimg+'/'+id).then(res => {
                        var code = res.data.Code,
                            msg = res.data.Msg,
                            data = res.data.Data

                        if(code == 0){
                            this.origingame.Link.splice(index,1)
                            $("#picture").val("")
                        }else if(code == 2){
                            window.location.href = url.login
                        }else{
                            alert(msg)
                        }
                    })
                },
                deletslideimg(id,index){
                    axios.get(url.pnorigingamedeletimg+'/'+id).then(res => {
                        var code = res.data.Code,
                            msg = res.data.Msg,
                            data = res.data.Data

                        if(code == 0){
                            this.origingame.slidelink.splice(index,1)
                            $("#slidepicture").val("")
                        }else if(code == 2){
                            window.location.href = url.login
                        }else{
                            alert(msg)
                        }
                    })
                },
                submite(){
                    window.location.href = "#/publicnum/origingamelist"
                },
                back(){
                    window.history.back()
                }
                
            },
            watch: {
               
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
    
        /*表单*/
    
        .addorigingameFormWrapper {
            background-color: #fff;
            padding: 5% 10%;
        }
    
        .addorigingameForm {
            padding: 1px;
        }
    
        #page-inner .addorigingameForm label {
            width: 155px;
            text-align: right;
        }
    
        .addorigingameForm input,
        .addorigingameForm select {
            border: 1px solid #ccc;
            width: 300px;
            padding: 4px;
            border-radius: 4px;
        }
    
        .addorigingameForm .addorigingameInput {
            margin-bottom: 20px;
        }
    
        #SubmitButton {
            display: inline-block;
            padding: 5px 36px;
            margin-left: 150px;
            cursor: pointer;
            border-radius: 5px;
            background-color: #01D19C;
            color: #fff;
        }
        .uploadpic{
            width: 83px !important;
            display: inline-block !important;
        }
        .imgShow{
            border: 1px solid #ccc;
            width: 822px;
            padding: 10px;
            margin-left: 154px;
            margin-top: 20px;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .clearfix:after{
            content: "";
            display: block;
            clear: both;
        }
        .imgShow img{
            width:  300px;
        }
        .imgShow  .imgwrap{
            position: relative;
            float: left;
            margin-right: 20px;
            margin-bottom: 20px;
            width:  300px;
        }
        .imgShow  .imgwrap .delet{
            position: absolute;
            cursor: pointer;
        }
    </style>