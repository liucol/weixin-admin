<template>
    <div>
        <div class="header">
            <h1 class="page-header">
                新增游戏包
            </h1>
            <ol class="breadcrumb">
                <li>公众号功能</li>
                <li>
                    <a href="#/publicnum/gamebaglist">游戏包列表</a>
                </li>
                <li class="active">
                    新增游戏包
                    <span class="back" @click= "back()">返回</span>
                </li>
            </ol>
        </div>
        <div id="page-inner">
            <div class="row">
                <div class="col-lg-12">
                    <div class="col-lg-12 addgamebagFormWrapper">
                        <div class="addgamebagForm">
                            <div class="addgamebagInput">
                                <label>原游戏：</label>
                                <select v-model="gamebag.OldName" @change="choseindex">
                                    <option disabled value="">请选择</option>
                                    <option 
                                            v-for="(list,index) in OldName"
                                            v-bind:value="list.OldName"
                                            :data-index="index"
                                            >{{list.OldName}}</option>
                                </select>
                            </div>
                            <div class="addgamebagInput">
                                <label>操作系统：</label>
                                <select  v-model="gamebag.System">
                                    <option disabled value="">请选择</option>
                                    <option value="安卓">安卓</option>
                                    <option value="IOS">IOS</option>
                                </select>
                            </div>
                            <div class="addgamebagInput">
                                <label>游戏名称：</label>
                                <input v-model="gamebag.Name"/>
                            </div>
                            <div class="addgamebagInput">
                                <label>区服：</label>
                                <input v-model="gamebag.Zone"/>
                            </div>
                            <div class="addgamebagInput">
                                <label>登录方式：</label>
                                <select  v-model="gamebag.Login">
                                    <option disabled value="">请选择</option>
                                    <option value="注册或一键登录">注册或一键登录</option>
                                    <option value="QQ或微信授权登录">QQ或微信授权登录</option>
                                </select>    
                            </div>
                            <div class="addgamebagInput">
                                <label>下载链接：</label>
                                <input v-model="gamebag.DownLink"/>
                            </div>
                            <div class="addgamebagInput">
                                <label>游戏图片：</label>
                                <!-- <select v-model="gamebag.Images.Id">
                                    <option value="">请选择游戏</option>
                                    <option 
                                        v-for="(list,index) in choselink"
                                        v-bind:value="list.Id"
                                        class="imgoption"
                                        >
                                        {{list.Id}}
                                        <img :src="list.Data"/>
                                    </option>
                                </select>  -->
                                <div class="imgwrap clearfix">
                                    <div class="checkimgwrap" v-for="(list,index) in choselink">
                                        <img class="checkimg" :src="list.Linkdir"/>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                        <div class="addgamebagSubmit">
                            <span id="SubmitButton" @click="addgamebag()">提交</span>
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

    export default {

        data() {
            return {
               origingame: null,
               OldName: [],
               Link: [],
               choselink: [],
               gamebag:{
                  OldName: null,
                   System: null,
                   Name: null,
                   Zone: null,
                   Login: null,
                   DownLink: null,
                   Images: {
                       Id: null
                   }
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
                                linkobj ={
                                    index: i,
                                    Id: data[i].Id,
                                    OldName: data[i].OldName,
                                    Link: data[i].Link
                                }

                                this.OldName.push(oldnameobj)
                                this.Link.push(linkobj)    
                            }
                        }else if(code == 2){
                            window.location.href = url.login
                        }else{
                            alert(msg)
                        }
                    
                    })
            },
            choseindex(){
                var OldName = this.gamebag.OldName
                for(var i=0; i<this.Link.length; i++){
                    if(this.Link[i].OldName == OldName){
                        this.choselink = this.Link[i].Link
                        this.gamebag.Images.Id = this.Link[i].Id
                    }
                }
            },
            addgamebag(){
                var Id = this.gamebag.Images.Id
                this.gamebag.Images.Id = parseInt(Id)

                axios.post(url.pnaddgamebag,this.gamebag).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg

                    if(code == 0){
                        window.location.href = "#/publicnum/gamebaglist"
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

    .addgamebagFormWrapper {
        background-color: #fff;
        padding: 5% 10%;
    }

    .addgamebagForm {
        padding: 1px;
    }

    #page-inner .addgamebagForm label {
        width: 150px;
        text-align: right;
    }

    .addgamebagForm input,
    .addgamebagForm select {
        border: 1px solid #ccc;
        width: 300px;
        padding: 4px;
        border-radius: 4px;
    }

    .addgamebagForm .addgamebagInput {
        margin-bottom: 20px;
    }

    .addgamebagSubmit span {
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
</style>