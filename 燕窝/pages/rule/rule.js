var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    nodes: [{
      name: "div,strong"
    }],
  },
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Center/guize',
      data: {  },
      method: "GET",
      success: function (res) {
        var article = res.data.guize
        WxParse.wxParse('article', 'html', article, that, 5)
      }
    }) 
  },
})