// pages/er/er.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"",
    user:""
  },
  // =====返回上一级
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url:'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Codes/index',
            data:{code:ress.code},
            method:"GET",
            success:function(res){
              wx.hideLoading();
                that.setData({
                  img: res.data.do,
                  user: res.data.user_id
                })  
            }
          })
        }
      }
    })
  },
  // ======保存到相册
  keepName:function(){
    var img=this.data.img;
    wx.downloadFile({
      url: img,
      success: function (res) {
       
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showToast({
                title: '保存成功',
              })
            }
          })
        }
       
      }
    })
  },
  // ========分享
  onShareAppMessage: function (res) {
    var scene=this.data.user;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      
    }
    return {
      title: '寻爱',
      path: '/pages/index/index?scene='+scene,
      success: function (res) {
        // 转发成功
        wx.login({
          success:function(ress){
            if(ress.code){
              wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/fen',
                data:{code:ress.code},
                method:"GET",
                success:function(res){
                }
              })
            }
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})