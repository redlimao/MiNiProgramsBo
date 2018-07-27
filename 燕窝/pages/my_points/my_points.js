// pages/producet/producet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex: 0,
    curFenIndex: 0,
    empty: 0,
    types: 2,
    goods_id: "",
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/User/ka',
            data: { code:ress.code },
            method: "GET",
            success: function (res) {
              if (res.data == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  empty: 0,
                  list: res.data
                })
              }
            }
          })
        }
      }
    })
  },
  // ===大导航
  tabFun: function (e) {
    this.setData({
      curHdIndex: e.target.dataset.id,
      curFenIndex: 0
    });
    var that = this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/User/ka',
            data: { code:ress.code,card: e.target.dataset.id },
            method: "GET",
            success: function (res) {
              if (res.data == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  empty: 0,
                  list: res.data
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
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  },
   // ===下拉显示信息
  laName: function (e) {
    var flag = this.data.flag
    var index = e.currentTarget.dataset.id;
    var list=this.data.list;
    var pan = list[index].pan
    if (pan == 0) {
      list[index].pan = 1
      this.setData({
        list: list
      })
    } else {
      list[index].pan = 0
      this.setData({
        list: list
      })
    }
  }
})