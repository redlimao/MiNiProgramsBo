// pages/lookmessage/lookmessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      empty:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      // console.log(options.scene);
      //转介认证
      if (options.scene) {
          var sence = decodeURIComponent(options.scene);
      } else {
          var sence = 0;
      }
      wx.login({
          success: function (ress) {
              if (ress.code) {
                  wx.getUserInfo({
                      success: function (res) {
                          wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/user_orders',
                              data: { code: ress.code },
                              method: "GET",
                              success: function (res) {
                                console.log(res)
                                  //商品
                                  if (res.data.goods != 1) {
                                      that.setData({
                                          goods: res.data.info,
                                      })
                                  } else {
                                      that.setData({
                                          empty: 1,
                                          goods: res.data.info,
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
  //商品详情
  shopName: function (e) {
      var shop_id = e.currentTarget.id;
      var app = getApp();
      app.requestshop_id = shop_id;
      wx.navigateTo({
          url: '../shop_details/shop_details',
      })
  }

})