// pages/class/class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/schoolroom',
      data:{},
      method:"GET",
      success:function(res){
        wx.hideLoading()
        that.setData({
          list:res.data.info
        })
      }
    })
  },
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // =====详情
  className:function(e){
    wx.navigateTo({
      url: '../class_details/class_details?id='+e.currentTarget.id,
    })
  }
})