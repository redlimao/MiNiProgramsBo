// pages/details/details.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes: [{
      name: "div,strong"
    }],
    title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var detail_id = getApp().requestdetail_id;
    var type_id = getApp().requesttype_id;
    var that = this;
    console.log(detail_id, type_id)
    wx.request({
        url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Growping/infos',
      data: { id: detail_id, type: type_id},
      method: "GET",
      success: function (res) {
        console.log(res)
        if(res.data){
          var article = res.data.content
          WxParse.wxParse('article', 'html', article, that, 5)
          that.setData({
            title: res.data.title
          })
        }
      }
    })
  }
})