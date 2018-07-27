// pages/er/er.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  data: {
    nodes: [{
      name: "div,strong"
    }],
  },
  onLoad: function (options) {
    var detail_id = getApp().requestdetail_id;
    var id = detail_id;
    var that=this;
    wx.request({
        url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Codes/index',
      data: { scene: id, page: 'pages/actives_de/actives_de' },
      method: "GET",
      success: function (res) {
        console.log(res)
        var article = res.data.do
        WxParse.wxParse('article', 'html', article, that, 5)
        // that.setData({
        //   img:res.data.do
        // })
      }
    })
  },
})