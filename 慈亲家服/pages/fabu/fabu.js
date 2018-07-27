// pages/miss/miss.js
Page({

  data: {

  },
  onLoad: function (options) {

  },
  formSubmit: function (e) {
    var pings_id = getApp().requestpings_id;
    var pings_type = getApp().requestpings_type;
    console.log(pings_id, pings_type)
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/ping',
      data: { content: e.detail.value.textarea, orders_id: pings_id, type: pings_type},
      method: 'GET',
      success: function (res) {
        if (res.data == 1) {
          wx.showModal({
            title: '提交成功',
            success: function () {
              wx.switchTab({
                url: '../main/main',
              })
            }
          })
        } else if (res.data == 3) {
          wx.showToast({
            title: '请输入合理的评价内容'
          })
        } else {
          wx.showModal({
            title: '提交失败，请重新提交'
          })
        }
      }
    })
  }
})