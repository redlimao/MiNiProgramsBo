var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    nodes: [{
      name: "div,strong"
    }],
  },
  onLoad: function (options) {
      
    var id = options.id;
    var goods_id = options.goodsid;
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Company/tai',
            data: { id: id,goods_id:goods_id},
            method: "GET",
            success: function (res) {
                console.log(res);
                that.setData({
                    title:res.data.info.title
                })
                var article = res.data.info.intro
                WxParse.wxParse('article', 'html', article, that, 5);
            },
            complete:function(){
                wx.hideLoading();
            }
          })
        }
      }
    })    
  }
})