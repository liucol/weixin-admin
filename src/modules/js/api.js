/**
 * Created by User on 2018/3/27.
 */
let url ={
  login: '/',
  pngamebaglist: '/admin/package/list',  //游戏包列表
  pnaddgamebag: '/admin/package/add',  //添加游戏包
  pndeletgamebag: '/admin/package/delete',  //删除游戏包
  pngetgamebag: '/admin/package/edit',  //获取指定游戏包
  pnmodifygamebag: '/admin/package/save',  //修改游戏包
  pnfreezegamebag: '/admin/package/freeze', //冻结  解冻游戏包
  pnorigingamelist: '/admin/image/list', //原游戏列表
  pnaddorigingame: '/admin/image/add',  //原游戏添加
  pndeletorigingame: '/admin/image/delete',  //删除原游戏
  pnaddoriginimg: '/admin/image/addpic',  //添加图片
  pnmodifyorigingame: '/admin/image/edit',  //修改原游戏
  pnsavemodifyorigingame: '/admin/image/save',  //保存-修改原游戏
  pnorigingamedeletimg: '/admin/image/deletepic', //删除图片
  pneditorupimg: '/admin/upload',   //游戏简介富文本 里面的 图片上传
  pnaddgift: '/admin/image/addgift', //添加礼包
  pngiftlist: '/admin/image/gift/list', //礼包列表
  pndeletgift: '/admin/image/gift/delete', //删除礼包
  pngetgift: '/admin/image/editgift', //获取一条礼包
  pnmodifygift: '/admin/image/gift/save', //保存礼包修改
  pngiftcdkeylist: '/admin/image/listcdkey', //礼包cdkey列表
  pnimportfile: '/admin/image/addcdkey',  //导入礼包
  pndeletbatchcdkey: '/admin/image/expiredcdkey', //删除批次cdkey
}

//开发环境和真实环境的切换
let  host = ''   //http://192.168.1.174:8080  http://chxweb.chuxinhudong.com

for(let  key in url){
  if(url.hasOwnProperty(key)){
      url[key] = host + url[key]
  }
}

export default url
