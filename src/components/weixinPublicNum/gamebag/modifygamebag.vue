<template>
        <div>
            <div class="header">
                <h1 class="page-header">
                    修改游戏包
                </h1>
                <ol class="breadcrumb">
                    <li>公众号功能</li>
                    <li>
                        <a href="#/publicnum/gamebaglist">游戏包列表</a>
                    </li>
                    <li class="active">
                            修改游戏包
                        <span class="back" @click="back()">返回</span>
                    </li>
                </ol>
            </div>
            <div id="page-inner">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="col-lg-12 modifygamebagFormWrapper">
                            <div class="modifygamebagForm">
                                <div class="modifygamebagInput">
                                    <label>原游戏：</label>
                                    <!-- <input v-model="gamebag.OldName"/> -->
                                    <select v-model="gamebag.OldName">
                                        <option disabled value="">请选择</option>
                                        <option 
                                                v-for="(list,index) in OldName"
                                                v-bind:value="list.OldName"
                                                :data-index="index"
                                                >{{list.OldName}}</option>
                                    </select>
                                </div>
                                <div class="modifygamebagInput">
                                    <label>操作系统：</label>
                                    <input v-model="gamebag.System"/>
                                </div>
                                <div class="modifygamebagInput">
                                    <label>游戏名称：</label>
                                    <input v-model="gamebag.Name"/>
                                </div>
                                <div class="modifygamebagInput">
                                    <label>区服：</label>
                                    <input v-model="gamebag.Zone"/>
                                </div>
                                <div class="modifygamebagInput">
                                    <label>登录方式：</label>
                                    <select  v-model="gamebag.Login">
                                        <option disabled value="">请选择</option>
                                        <option value="注册或一键登录">注册或一键登录</option>
                                        <option value="QQ或微信授权登录">QQ或微信授权登录</option>
                                    </select>      
                                </div>
                                <div class="modifygamebagInput">
                                    <label>下载链接：</label>
                                    <input v-model="gamebag.DownLink"/>
                                </div>
                                <div class="modifygamebagInput">
                                    <label>游戏图片：</label>
                                </div>
                            </div>
                            <div class="modifygamebagSubmit">
                                <span id="SubmitButton" @click = "modifygamebag()">提交</span>
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
                    origingame: null,
                    OldName: [],
                    Link: [],
                    gamebagid: null,
                    gamebag: null
                }
            },
            created() {
                this.getgamebagid()
                this.getorigingame()
                this.getgamebag()
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
                getgamebagid(){
                    let urlarry = location.hash.split('?')[1],
                    gamebagid = qs.parse(urlarry).id
                    this.gamebagid = gamebagid
                },
                getgamebag(){
                    axios.get(url.pngetgamebag+"/"+this.gamebagid).then(res => {
                        var data = res.data.Data,
                            code = res.data.Code,
                            msg = res.data.Msg
                            
                            if(code == 0){
                               this.gamebag = data
                            }else if(code == 2){
                                window.location.href = url.login
                            }else{
                                alert(msg)
                            }
                            
                    })
               },
               modifygamebag(){
                    var Id = this.gamebag.Images.Id
                    this.gamebag.Images.Id = parseInt(Id)

                    axios.post(url.pnmodifygamebag,this.gamebag).then(res => {
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
    
        .modifygamebagFormWrapper {
            background-color: #fff;
            padding: 5% 10%;
        }
    
        .modifygamebagForm {
            padding: 1px;
        }
    
        #page-inner .modifygamebagForm label {
            width: 150px;
            text-align: right;
        }
    
        .modifygamebagForm input,
        .modifygamebagForm select {
            border: 1px solid #ccc;
            width: 300px;
            padding: 4px;
            border-radius: 4px;
        }
    
        .modifygamebagForm .modifygamebagInput {
            margin-bottom: 20px;
        }
    
        .modifygamebagSubmit span {
            display: inline-block;
            padding: 5px 36px;
            margin-left: 150px;
            cursor: pointer;
            border-radius: 5px;
            background-color: #01D19C;
            color: #fff;
        }
    </style>