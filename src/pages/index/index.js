/**
 * Created by User on 2018/3/27.
 */
// import 'css/common.css'
// import './index.css'

import Vue from 'vue'
import axios from 'axios'
// import Bar from "components/Bar.vue"
// import Ts from "components/Ts.vue"


import Router from 'vue-router'
Vue.use(Router)

let routes = [{
        path: '', //首页
        components: require("../../components/Index.vue")
    },
    {
        path: '/publicnum/origingamelist', //原游戏列表
        components: require("../../components/weixinPublicNum/origingame/origingamelist.vue")
    },
    {
        path: '/publicnum/addorigingame', //添加原游戏
        components: require("../../components/weixinPublicNum/origingame/addorigingame.vue")
    },
    {
        path: '/publicnum/modifyorigingame', //修改原游戏
        components: require("../../components/weixinPublicNum/origingame/modifyorigingame.vue")
    },
    {
        path: '/publicnum/origingameintroduct', //原游戏简介编辑
        components: require("../../components/weixinPublicNum/origingame/origingameintroduct.vue")
    },
    {
        path: '/publicnum/gamebaglist', //游戏包列表
        components: require("../../components/weixinPublicNum/gamebag/gamebaglist.vue")
    },
    {
        path: '/publicnum/addgamebag', //添加游戏包
        components: require("../../components/weixinPublicNum/gamebag/addgamebag.vue")
    },
    {
        path: '/publicnum/modifygamebag', //修改游戏包
        components: require("../../components/weixinPublicNum/gamebag/modifygamebag.vue")
    },
    {
        path: '/publicnum/giftlist', //游戏礼包列表
        components: require("../../components/weixinPublicNum/gift/giftlist.vue")
    },
    {
        path: '/publicnum/addgift', //添加礼包
        components: require("../../components/weixinPublicNum/gift/addgift.vue")
    },
    {
        path: '/publicnum/modifygift', //修改礼包
        components: require("../../components/weixinPublicNum/gift/modifygift.vue")
    },
    {
        path: '/publicnum/giftcdkey', //添加礼包CDKEY
        components: require("../../components/weixinPublicNum/gift/giftCDKEY.vue")
    },
    {
        path: '/publicnum/userlist', //用户列表
        components: require("../../components/User/userlist.vue")
    }
]

//创建router实例
let router = new Router({
    routes
})



let app = new Vue({
    el: "#wrapper",
    router,
    data: {
        lists: null,
        indexp: 0,
        gwindex: null,
        indexc: null,
        navlist: [{
                a: {
                    name: '首页',
                    link: '/#',
                    fonticon: 'fa-dashboard'
                }
            },
            {
                a: {
                    fonticon: 'fa-sitemap',
                    name: '公众号功能',
                },
                b: [{
                        name: '原游戏',
                        link: '/publicnum/origingamelist'
                    },
                    {
                        name: '游戏包',
                        link: '/publicnum/gamebaglist'
                    },
                    {
                        name: '礼包',
                        link: '/publicnum/giftlist'
                    }
                ]
            }, {
                a: {
                    name: '玩家',
                    link: '/publicnum/userlist',
                    fonticon: 'fa-dashboard'
                }
            },
        ]
    },
    created() {

    },
    methods: {
        clicknav1(index) {
            this.indexp = index
        },
        clickgw(index) {
            this.gwindex = index
        }
    },
    components: {

    }
})