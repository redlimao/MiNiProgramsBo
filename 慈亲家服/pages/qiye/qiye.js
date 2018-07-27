// pages/qiye/qiye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,
    flags:0,
    flagss:0
  },
  onLoad:function(ress){
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/ren',
            data:{code:ress.code},
            method:"GET",
            success:function(res){
              if(res.data.zong[0]==1){
                that.setData({
                  flag:1,
                  flags:1,
                  flagss:1,
                  zheng: res.data.zheng,
                  fan: res.data.fan,
                  license: res.data.zi,
                  status:res.data.status
                })
              }else{
                that.setData({
                  flag: 0,
                  flags: 0,
                  flagss: 0
                })
              }
            }
          })
        }
      }
    })
  },
  //======正面
  zhengzhaoqian: function () {
    var that=this;
    wx.login({
      success: function (result) {
        if (result.code) {
          wx.chooseImage({
            count: 1,
            success: function (res) {
              var tempFilePaths = res.tempFilePaths
              that.setData({
                zheng: res.tempFilePaths,
                flag:1
              })
              wx.uploadFile({
                url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/zi_zhi', //仅为示例，非真实的接口地址
                filePath: tempFilePaths[0],
                formData: {
                  'code': result.code
                },
                name: 'one',
                success: function (ress) {
                  var data = ress.data
                  if (data == 1) {
                    wx.showModal({
                      title: "上传成功",
                      showCancel: false,
                      confirmText: "确定"
                    })
                  } else {
                    wx.showModal({
                      title: "上传失败",
                      showCancel: false,
                      confirmText: "确定"
                    })
                  }
                }
              })
            },
          })
        }
      }
    })
  },
  //======后面
  zhengzhaohou: function () {
    var that=this;
    wx.login({
      success: function (result) {
        if (result.code) {
          wx.chooseImage({
            count: 1,
            success: function (res) {
              var tempFilePaths = res.tempFilePaths
              that.setData({
                fan: res.tempFilePaths,
                flags:1
              })
              wx.uploadFile({
                url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/zi_zhi', //仅为示例，非真实的接口地址
                filePath: tempFilePaths[0],
                formData: {
                  'code': result.code
                },
                name: 'two',
                success: function (ress) {
                  var data = ress.data
                  if (data == 1) {
                    wx.showModal({
                      title: "上传成功",
                      showCancel: false,
                      confirmText: "确定"
                    })
                  } else {
                    wx.showModal({
                      title: "上传失败",
                      showCancel: false,
                      confirmText: "确定"
                    })
                  }
                }
              })
            },
          })
        }
      }
    })
  },
   //======营业执照
  license: function () {
    var that=this;
    wx.login({
      success: function (result) {
        if (result.code) {
          wx.chooseImage({
            count: 1,
            success: function (res) {
              var tempFilePaths = res.tempFilePaths
              that.setData({
                license: res.tempFilePaths,
                flagss:1
              })
              wx.uploadFile({
                url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/zi_zhi', //仅为示例，非真实的接口地址
                filePath: tempFilePaths[0],
                formData: {
                  'code': result.code
                },
                name: 'three',
                success: function (ress) {
                  var data = ress.data
                  if (data == 1) {
                    wx.showModal({
                      title: "上传成功",
                      showCancel: false,
                      confirmText: "确定"
                    })
                  } else {
                    wx.showModal({
                      title: "上传失败",
                      showCancel: false,
                      confirmText: "确定"
                    })
                  }
                }
              })
            },
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    var that = this
    wx.login({
      success: function (result) {
        if (result.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/zizhi',
            data: { code: result.code },
            method: "GET",
            success: function (re) {
              console.log(re);
              if(re==1){
                wx.showModal({
                  title: '请上传完整的图片',
                  content: '',
                })
              }else{
                wx.showModal({
                  title: '提交成功',
                  content: '',
                })
              }
            }
          })
        }
      }
    })
  }
})