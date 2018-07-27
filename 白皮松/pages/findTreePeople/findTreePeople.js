//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Trees/index',
            data: {},
            method: "GET",
            success: function (res) {
              console.log(res)
              that.setData({
                trees: res.data.info,
                tu: res.data.tu.img,
              })
            }
          })
        }
      }
    })
  },
  //==打电话
  telName: function (e) {
    var tel = e.currentTarget.id;
    console.log(tel)
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
})
