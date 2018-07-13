<template>
        <div>
            <div class="header">
                <h1 class="page-header">
                    修改原游戏
                </h1>
                <ol class="breadcrumb">
                    <li>公众号功能</li>
                    <li>
                        <a href="#/publicnum/origingamelist">原游戏列表</a>
                    </li>
                    <li class="active">
                            修改原游戏
                        <span class="back" @click="back()">返回</span>
                    </li>
                </ol>
            </div>
            <div id="page-inner">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="col-lg-12 modifyorigingameFormWrapper">
                            <div class="modifyorigingameForm">
                                <div class="modifyorigingameInput">
                                    <label>原游戏：</label>
                                    <input v-model="origingame.OldName"/>
                                </div>
                                <div class="modifyorigingameInput">
                                    <label>下载链接：</label>
                                    <input v-model="origingame.DownLink"/>
                                </div>
                                <div class="modifyorigingameInput">
                                    <label>游戏图片：</label>  
                                    <input type="file" id="picture" class="uploadpic" @change="upimg('#picture',0)" value="上传图片"/>
                                    <div class="imgShow clearfix">
                                        <div class="imgwrap"
                                             v-for="(list,index) in origingame.Link"
                                        >
                                            <img  :src="list.Linkdir"  class="fileimg"><i @click="delet(list.Id,index,0)" class="delet">x</i>
                                        </div>
                                    </div>
                                </div>
                                <div class="modifyorigingameInput">
                                    <label>礼包游戏图片：</label>
                                    <input type="file" id="slidepicture" class="uploadpic" @change="upimg('#slidepicture',1)"  value="上传图片"/>
                                    <div class="imgShow clearfix">
                                        <div class="imgwrap"
                                             v-for="(list,index) in origingame.GiftPicture"
                                        >
                                            <img  :src="list.Linkdir"  class="fileimg"><i @click="delet(list.Id,index,1)" class="delet">x</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modifyorigingameSubmit">
                                <span id="SubmitButton" @click="modifyorigingame()">提交</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <script>
        import axios from 'axios'   
        import url from 'js/api.js' 
        import qs from 'qs'
    
        export default {
    
            data() {
                return {
                    origingameid: null,
                    origingame: {
                        Id: null,
                        OldName: null,
                        DownLink: null,
                        Link:[],
                        GiftPicture:[]
                    },
                    addoriginimg: url.pnaddoriginimg
                }
            },
            created() {
                this.getorigingameid()
                this.getorigingame()
            },
            methods: {
                getorigingameid(){
                    let urlarry = location.hash.split('?')[1],
                    origingameid = qs.parse(urlarry).id
                    this.origingameid = origingameid
                    this.addoriginimg  = this.addoriginimg+"/"+origingameid
                },
                getorigingame(){
                    axios.get(url.pnmodifyorigingame+"/"+this.origingameid).then(res => {
                        var data = res.data.Data,
                            code = res.data.Code,
                            msg = res.data.Msg
                            
                            if(code == 0){
                               this.origingame.Id = data.Id
                               this.origingame.OldName = data.OldName
                               this.origingame.DownLink = data.DownLink

                               var datalink = data.Link,
                                   datagiftpicture = data.GiftPicture

                               for(var i =0;i<datalink.length;i++){
                                    this.origingame.Link.push(datalink[i])
                               }

                               for(var i =0;i<datagiftpicture.length;i++){
                                    this.origingame.GiftPicture.push(datagiftpicture[i])
                               }

                            }else if(code == 2){
                                window.location.href = url.login
                            }else{
                                alert(msg)
                            }
                            
                    })
               },
               modifyorigingame(){
                    axios.post(url.pnsavemodifyorigingame,this.origingame).then(res => {
                        var code = res.data.Code,
                            msg = res.data.Msg
                            
                        if(code == 0){
                            window.location.href = "#/publicnum/origingamelist"
                        }else if(code == 2){
                            window.location.href = url.login
                        }else{
                            alert(msg)
                        }
                    })

                    //window.location.href = "#/publicnum/origingamelist"
               },
               upimg(dom,type){
                    var $picture = $(dom),
                        // $imgShow = $(".imgShow"),
                        current_pic = $picture[0].files[0],
                        r = new FileReader(),
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
                                    _this.origingame.GiftPicture.push(dataobj)
                                }
                                
                            })
                },
               delet(id,index,type){
                    axios.get(url.pnorigingamedeletimg+'/'+id).then(res => {
                        var code = res.data.Code,
                            msg = res.data.Msg,
                            data = res.data.Data

                        if(code == 0){
                            if(type == 0){
                                this.origingame.Link.splice(index,1)
                            }else if(type == 1){
                                this.origingame.GiftPicture.splice(index,1)
                            }
                            
                        }else if(code == 2){
                            window.location.href = url.login
                        }else{
                            alert(msg)
                        }
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
    
        /*表单*/
    
        .modifyorigingameFormWrapper {
            background-color: #fff;
            padding: 5% 10%;
        }
    
        .modifyorigingameForm {
            padding: 1px;
        }
    
        #page-inner .modifyorigingameForm label {
            width: 150px;
            text-align: right;
        }
    
        .modifyorigingameForm input,
        .modifyorigingameForm select {
            border: 1px solid #ccc;
            width: 300px;
            padding: 4px;
            border-radius: 4px;
        }
    
        .modifyorigingameForm .modifyorigingameInput {
            margin-bottom: 20px;
        }
    
        .modifyorigingameSubmit span {
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