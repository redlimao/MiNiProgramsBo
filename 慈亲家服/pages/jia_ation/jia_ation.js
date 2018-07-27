// pages/ation/ation.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: "",
    flag: 0,
    userInfo: {},
    photo: "",
    school: "",
    choose: "",
    status:""
  },

  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/ren',
                data: { code: ress.code ,type:1},
                method: "GET",
                success: function (res) {
                  that.setData({
                    status:res.data.status
                  })
                  if (res.data.info != 1 && res.data.status == 2){
                    that.setData({
                      tempFilePaths: res.data.info,
                      flag: 0
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  // =========上传图片
  chooseName: function () {
    var that = this;
    var flag = this.data.flag;
    var status=this.data.status;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        if (tempFilePaths) {
          flag = 1
        }
        if (status==2){
          flag = 0
        }
        that.setData({
          tempFilePaths: tempFilePaths,
          flag: flag
        })
      }
    })
  },
  subName: function () {
    var tempFilePaths = this.data.tempFilePaths;
    wx.login({
      success: function (ress) {
        if (ress) {
          wx.uploadFile({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/zizhi', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            header: {
              'content-type': 'multipart/form-data'
            },
            name: 'image',
            formData: { 'code': ress.code },
            success: function (res) {
              if (res.data == 2) {
                wx.showModal({
                  title: '提交成功',
                  content: '我们会尽快审核，请耐心等待',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta:1
                      })
                    }
                  }
                })
              } else if (res.data == 1) {
                wx.showModal({
                  title: '提交失败，请重新提交'
                })
              }
            }
          })
        }
      }
    })
  }
})