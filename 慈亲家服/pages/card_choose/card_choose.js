// pages/card_choose/card_choose.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  messageName:function(e){
    var card_id=e.currentTarget.id;
    var app = getApp();
    app.requestcard_id = card_id;
    wx.navigateTo({
      url: '../message/message',
    })
  }
})