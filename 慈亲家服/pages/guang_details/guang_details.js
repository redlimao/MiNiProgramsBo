var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    nodes: [{
      name: "div,strong"
    }],
  },
  onLoad: function (options) {
    var guang_id = getApp().requestguang_id;
    var that = this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Ad/index',
      data: { id: guang_id },
      method: "GET",
      success: function (res) {
        var article = res.data.content
        WxParse.wxParse('article', 'html', article, that, 5)
      }
    })
  },
})