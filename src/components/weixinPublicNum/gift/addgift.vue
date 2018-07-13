<template>
    <div>
        <div class="header">
            <h1 class="page-header">
                新增礼包
            </h1>
            <ol class="breadcrumb">
                <li>公众号功能</li>
                <li>
                    <a href="#/publicnum/giftlist">礼包列表</a>
                </li>
                <li class="active">
                    新增礼包
                    <span class="back" @click= "back()">返回</span>
                </li>
            </ol>
        </div>
        <div id="page-inner">
            <div class="row">
                <div class="col-lg-12">
                    <div class="col-lg-12 addgiftFormWrapper">
                        <div class="addgiftForm">
                            <div class="addgiftInput">
                                <label>原游戏：</label>
                                <!-- @change="choseindex" -->
                                <select v-model="gift.OldName" @change="choseindex"> 
                                    <option disabled value="">请选择</option>
                                    <option 
                                            v-for="(list,index) in OldName"
                                            v-bind:value="list.OldName"
                                            :data-index="index"
                                            >{{list.OldName}}</option>
                                </select>
                            </div>
                            <div class="addgiftInput">
                                <label>礼包名称：</label>
                                <input v-model="gift.Name"/>
                            </div>
                            <div class="addgiftInput">
                                <label>礼包描述：</label>
                                <input v-model="gift.Description"/>
                            </div>
                            <div class="addgiftInput">
                                <label>前置礼包：</label>
                                <select v-model="gift.Previous"> 
                                    <option disabled value="">请选择</option>
                                    <option 
                                            v-for="(list,index) in giftlist"
                                            v-bind:value="list.Id"
                                            >{{list.Name}}</option>
                                </select>
                            </div>
                            <div class="addgiftInput">
                                <label>有效期：</label>
                                <input placeholder="2018-07-01 00:00:00" v-model="gift.Expiredate"/>  
                                <span>格式：2018-07-01 00:00:00</span>
                            </div>
                            <div class="addgiftInput">
                                <label>间隔领取时间：</label>
                                <input placeholder="00:00:00" v-model="gift.Intervals"/>
                                <span>格式：时:分:秒</span>
                            </div>
                            <div class="addgiftInput">
                                <label>礼包状态：</label>
                                <select v-model="gift.Status"> 
                                    <option disabled value="">请选择</option>
                                    <option 
                                            v-for="(list,index) in giftstatus"
                                            v-bind:value="list.id"
                                            >{{list.status}}</option>
                                </select>
                            </div>
                            <div class="addgiftInput">
                                <label>icon：</label>
                                <label for="gifticon" class="gifticonbutton">上传图片</label>
                                <input id="gifticon"  type="file" name="uploadfile" class="uploadpic" @change="upimg('#gifticon',2)"/>
                                <div class="imgShow clearfix">
                                    <div class="imgwrap" v-show="gifticon.Linkdir">
                                        <img :src="gifticon.Linkdir" class="fileimg"><i @click="deleticon()" class="delet">x</i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>礼包游戏图片：</label>
                                <div class="imgwrap clearfix">
                                    <div class="checkimgwrap" v-for="(list,index) in choselink">
                                        <img class="checkimg" :src="list.Linkdir"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="addgiftSubmit">
                            <span id="SubmitButton" @click="addgift()">提交</span>
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
    import $ from 'jquery'

    export default {

        data() {
            return {
               giftstatus:[
                   {
                       id: 0,
                       status:'正常'
                   },
                   {
                       id: 1,
                       status:'挂起'
                   }
                ],
               addoriginimg: url.pnaddoriginimg,
               origingame: null,
               giftlist: [],  //原游戏下的礼包
               OldName: [],
               giftpicture: [],
               choselink: [],
               gift:{
                  OldName: "",
                  Name: "",
                  Description: "",
                  Previous: null,
                  Expiredate: "",
                  Icon: "",
                  Intervals: "",
                  Status: "",
                  Image:{
                        Id: ""
                    }
               },
               gifticon: {
                  Linkdir: null
               }
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
                            var data = res.data.Data
                            this.origingame = data

                            for(var i=0;i<data.length;i++){
                                var oldnameobj = {
                                    index: i,
                                    Id: data[i].Id,
                                    OldName: data[i].OldName
                                },
                                giftpictureobj ={
                                    index: i,
                                    Id: data[i].Id,
                                    OldName: data[i].OldName,
                                    GiftPicture: data[i].GiftPicture
                                }

                                this.OldName.push(oldnameobj)
                                this.giftpicture.push(giftpictureobj)    
                            }
                        }else if(code == 2){
                            window.location.href = url.login
                        }else{
                            alert(msg)
                        }
                    
                    })
            },
            choseindex(){
                var OldName = this.gift.OldName
                for(var i=0; i<this.giftpicture.length; i++){
                    if(this.giftpicture[i].OldName == OldName){
                        this.choselink = this.giftpicture[i].GiftPicture
                        this.gift.Image.Id = this.giftpicture[i].Id
                        //this.addoriginimg = this.addoriginimg + "/"+ this.giftpicture[i].Id
                        //获取礼包
                        axios.get(url.pngiftlist+"?image="+this.giftpicture[i].Id).then(res => {
                              this.giftlist = res.data.Data
                        })
                    }
                }
                this.gifticon.Linkdir = null
            },
            addgift(){
                var Id = this.gift.Image.Id,
                    Previous = this.gift.Previous,
                    Status = this.gift.Status,
                    Intervalsarr = this.gift.Intervals.split(":")  //间隔领取时间

                this.gift.Image.Id = parseInt(Id)
                this.gift.Previous = parseInt(Previous)
                this.gift.Status = parseInt(Status)

                this.gift.Intervals = parseInt(Intervalsarr[0]*3600)+parseInt(Intervalsarr[1]*60)+parseInt(Intervalsarr[2])  //换算成秒
                
                axios.post(url.pnaddgift,this.gift).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg

                    if(code == 0){
                        window.location.href = "#/publicnum/giftlist"
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
                            url = this.addoriginimg+"/"+this.gift.Image.Id

                            form.append("uploadfile", current_pic)
                            if(type == 2){
                                form.append("type", 2)
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
                                _this.gift.Icon = dataobj.Id
                                _this.gifticon = dataobj
                            })
            },
            deleticon(){
                axios.get(url.pnorigingamedeletimg+'/'+this.gifticon.Id).then(res => {
                        var code = res.data.Code,
                            msg = res.data.Msg,
                            data = res.data.Data

                        if(code == 0){
                            this.gifticon.Linkdir = null
                            $("#gifticon").val("")
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
    .clearfix:after{
        content: '';
        display: block;
        clear: both;
    }
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

    .addgiftFormWrapper {
        background-color: #fff;
        padding: 5% 10%;
    }

    .addgiftForm {
        padding: 1px;
    }

    #page-inner .addgiftForm label {
        width: 150px;
        text-align: right;
    }

    .addgiftForm input,
    .addgiftForm select {
        border: 1px solid #ccc;
        width: 300px;
        padding: 4px;
        border-radius: 4px;
    }

    .addgiftForm .addgiftInput {
        margin-bottom: 20px;
    }

    .addgiftSubmit span {
        display: inline-block;
        padding: 5px 36px;
        margin-left: 150px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #01D19C;
        color: #fff;
    }
    /* .imgoption img{
        width: 100px;
        height: 100px;
    } */
    .imgwrap{
        margin-left: 150px;
    }
    .checkimgwrap{
        float: left;
        margin-right: 20px;
    }
    .checkimgbox{
        width: 20px !important;
    }
    .checkimg{
        width: 300px;
    }
    .gifticonbutton{
        width: 98px !important;
        padding: 5px 20px;
        background: #ccc;
        border-radius: 5px;
        cursor: pointer;
    }
    #gifticon{
        display: none;
    }
    .fileimg{
        width: 150px;
    }
    .delet{
        cursor: pointer;
    }
</style>