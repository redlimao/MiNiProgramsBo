// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function (options) {
    var guo = options.guo;
    var id = options.id;
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/index/questions_guo',
            data: { code: ress.code, id: id, guo: guo},
            method:"GET",
            success:function(res){
              wx.hideLoading()
              that.setData({
                content:res.data.list.content,
                info:res.data.jiinfo
              })
            }
          })
        }
      }
    })
  },
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})