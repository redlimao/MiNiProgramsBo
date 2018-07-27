// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex: 0,
    empty:0,
    emptys:0,
    emptyss:0,
    user:'',
    gou:1,
    car:''
  },
  onShow: function (options) {
    var that = this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Center/collectss',
            data: {code:ress.code},
            method: "GET",
            success: function (res) {
                console.log(res);
              if (res.data.o == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  list: res.data.o,
                  user: res.data.user_id
                })
              }
              if (res.data.t == 1) {
                that.setData({
                  emptys: 1
                })
              } else {
                that.setData({
                  lists: res.data.t,
                  user: res.data.user_id
                })
              }
              if (res.data.h == 1) {
                that.setData({
                  emptyss: 1
                })
              } else {
                that.setData({
                  car: res.data.h
                })
              }
            }
          })
        }
      }
    })
  },
  // ===商品详情跳转
  shopName: function (e) {
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    var types_id = e.currentTarget.dataset.id;
    var app = getApp();
    app.requesttypes_id = types_id;
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  },
  // delete 
    // ==========================删除
  delName(e) {
    var id = e.currentTarget.dataset.index;
    var user = this.data.user;
    var that = this;
    wx.showModal({
      title: '确认删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Center/collectss_del/goods_id/',
            data: { goods_id: id,user_id:user},
            method: "GET",
            success: function (res) {
              console.log(res)
              if (res.data.info == 1) {
                that.setData({
                  emptyss: 1
                })
              } else {
                that.setData({
                  car: res.data.info,
                  emptyss: 0
                })
              }
              if (res.data.info.status==1){
                wx.showToast({
                  title: '删除成功！'})
              }
            }
          })
        }
      }
    })
  },
})