//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentIndex : 0,
    empty :0
  },

  //事件处理函数
  onLoad: function () {
    var that = this;
    wx.login({
      success:function(ress){
        // console.log(ress);
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/collects',
            data: { code: ress.code },
            method: "GET",
            success: function (ress) {
              console.log(ress.data.h);
              if (ress.data.h !== 1) {
                that.setData({
                  myCollect: ress.data.h
                })
              } else {
                that.setData({
                  empty: 1
                })
              }
            }
          })
        }
      }
    })

  },
  tapName : function(e){
    var shop_id = e.currentTarget.id;
    console.log(shop_id);
    var app = getApp();
    app.requestshop_id = shop_id;
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  }
})
