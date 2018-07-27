// pages/zi/zi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:1
  },
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/problems',
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
  // =====在线预约
  orderName:function(){
    wx.navigateTo({
      url: '../order/order',
    })
  },
  // =====关闭弹窗
  closeName:function(){
    this.setData({
      flag:1
    })
  },
  // =====显示答案
  answerName:function(e){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/problems_info',
      data: {id:e.currentTarget.id},
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        that.setData({
          flag: 0,
          content:res.data.info.content
        })
      }
    })
  }
})