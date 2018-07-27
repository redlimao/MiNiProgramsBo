// pages/guang_details/guang_details.js
var WxParse = require('../../wxParse/wxParse.js');
Page({
    data: {
      title:'',
      time:'',
    },
    onLoad:function(e){
      var xiao_id = getApp().requestid;
      var that = this;
      wx.request({
        url:'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Index/info',
        data:{id:xiao_id},
        method: 'GET',
        success: function(res) {
          console.log(res);
          var article = res.data.info.content
          WxParse.wxParse('article', 'html', article, that, 5)          
          that.setData({
            time:res.data.info.create_at,
            title:res.data.info.title
          })
          
        }
      })
      
    }
})