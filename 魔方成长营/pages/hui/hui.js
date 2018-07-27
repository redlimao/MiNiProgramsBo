// pages/hui/hui.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    empty:0
  },
  onLoad:function(){
    var that=this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
              url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Pay/yu',
            data: { code: ress.code,type:1 },
            method: 'GET',
            success: function (res) {
              if(res.data.list==1){
                that.setData({
                  empty:1
                })
              }else{
                that.setData({
                  list: res.data.list
                })
              }
            }
          })
        }
      }
    })
  },
  tiName: function (e) {
    var ti_id = 2;
    var app = getApp()
    app.requestti_id = ti_id;
    var money_id=e.currentTarget.dataset.id;
    var app = getApp()
    app.requestmoney_id =  money_id;
    wx.navigateTo({
      url: '../chong/chong',
    })
  }
})