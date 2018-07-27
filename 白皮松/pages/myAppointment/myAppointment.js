//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    empty :0,
    currentIndex : 0
  },

  //事件处理函数

  onLoad: function () {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/orders',
            data: { code: ress.code,yu_ding:1},
            method: "GET",
            success: function (ress) {
              console.log(ress);
              // var flag = that.data.flag;
              if(ress.data.info !== 1){
                that.setData({
                  info: ress.data.info, 
                })
              }else{
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
  //跳转到详情页面
  bindtags:function(e){
    var shop_id = e.currentTarget.id;
    console.log(shop_id);
    var app = getApp();
    app.requestshop_id = shop_id;
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })    
  },
  //完成预定
  bindcomplete:function(e){
    var that = this;
    var orders_id = e.currentTarget.id;
    // console.log(orders_id);
    wx.showModal({
      title: '订单确认提示',
      content: '该订单是否完成？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/orders_wan',
            data: { orders_id: orders_id},
            method:'GET',
            success:function(ress){
              console.log(ress);
              if(ress.data.info == 2){
                wx.showModal({
                  title: '未完成预定',
                  icon: 'fail',
                  duration: 2000
                })
              }else{

                that.setData({
                  info:ress.data.info
                })
              }
            }
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
