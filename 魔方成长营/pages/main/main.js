// pages/main/main.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    name:"",
    flag:0,
    dou:""
  },
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Users/wo',
                data: { code: ress.code },
                method: "GET",
                success: function (res) {
                  that.setData({
                    name:res.data.nickname,
                    dou:res.data.dou
                  })
                  var douid = res.data.dou;
                  var app=getApp();
                  app.requestdouid=douid;
                  if(res.data.pin==1){
                    that.setData({
                      flag:1
                    })
                  } else if (res.data.pin == 2){
                    that.setData({
                      flag: 2
                    })
                  } else if (res.data.pin == 3) {
                    that.setData({
                      flag: 3
                    })
                  } else if (res.data.pin == 4) {
                    that.setData({
                      flag: 4
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  selfName:function(){
    var renid = 0;
    var app = getApp();
    app.requestrenid = renid;
    wx.navigateTo({
      url: '../message/message',
    })
  },
  selfNames: function () {
    var renid=1;
    var app=getApp();
    app.requestrenid=renid;
    wx.navigateTo({
      url: '../message/message',
    })
  },
  shangName:function(){
    wx.navigateTo({
      url: '../message/message',
    })
  },
  collectName:function(){
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  rankName:function(){
    wx.navigateTo({
      url: '../rank/rank',
    })
  },
  tiName:function(){
    wx.navigateTo({
      url: '../chong/chong',
    })
  },
  mingName:function(){
    wx.navigateTo({
      url: '../mingxi/mingxi',
    })
  },
  detailName: function (e) {
    var pinid=this.data.flag;
    var app=getApp();
    app.requestpinid=pinid;
    wx.navigateTo({
      url: '../list/list',
    })
  },
  //===============转发
  onShareAppMessage: function (res) {
    return {
      title: '魔方成长营',
      path: '/pages/actives/actives',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  missName:function(){
    wx.navigateTo({
      url: '../miss/miss',
    })
  },
  // 刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Users/wo',
                data: { code: ress.code },
                method: "GET",
                success: function (res) {
                  that.setData({
                    name: res.data.nickname,
                    dou: res.data.dou
                  })
                  if (res.data.pin == 1) {
                    that.setData({
                      flag: 1
                    })
                  } else if (res.data.pin == 2) {
                    that.setData({
                      flag: 2
                    })
                  } else if (res.data.pin == 3) {
                    that.setData({
                      flag: 3
                    })
                  } else if (res.data.pin == 4) {
                    that.setData({
                      flag: 4
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
    wx.stopPullDownRefresh()
  },
  chongName:function(){
    var ti_id=1;
    var app=getApp()
    app.requestti_id=ti_id;
    wx.navigateTo({
      url: '../chong/chong',
    })
  },
  tuiName: function () {
    wx.navigateTo({
      url: '../hui/hui',
    })
  }
})