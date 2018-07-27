// pages/xun/xun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Servers/index',
      data: {},
      method: "GET",
      success: function (res) {
        that.setData({
          list:res.data.info,
          lun:res.data.lun
        })
      }
    })
  },
  xunName:function(e){
    var jia_id = e.currentTarget.id;
    var app = getApp();
    app.requestjia_id = jia_id;
    wx.navigateTo({
      url: '../xun_details/xun_details',
    })
  },
  aboutName: function () {
    wx.navigateTo({
      url: '../mains/mains',
    })
  },
  bannerName:function(e){
    var guang_id = e.currentTarget.id;
    var app = getApp();
    app.requestguang_id = guang_id;
    wx.navigateTo({
      url: '../guang_details/guang_details',
    })
  },
  // ====刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Servers/index',
      data: {},
      method: "GET",
      success: function (res) {
        that.setData({
          list: res.data.info,
          lun: res.data.lun
        })
        wx.stopPullDownRefresh()
      }
    })
  }

})