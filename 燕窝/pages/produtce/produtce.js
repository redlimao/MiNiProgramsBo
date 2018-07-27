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
    goods_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      types: options.type
    })
    // =========动态设置title
    wx.setNavigationBarTitle({
      title: options.data
    })
    wx.request({
      url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Goods/shouye',
      data: {type:options.type},
      method: "GET",
      success: function (res) {
        if (res.data == 1) {
          that.setData({
            empty: 1,
          })
        } else {
          that.setData({
            empty: 0,
            list: res.data
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
    wx.request({
      url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Goods/shouye',
      data: { card: e.target.dataset.id },
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
  },
  // ===商品详情跳转
  shopName: function (e) {
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  }
})