// pages/er/er.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"",
    user:""
  },
  onLoad: function (options) {
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url:'https://www.mozhifang.cn/store_kangmei/index.php?s=/Little/Codes/index',
            data:{code:ress.code},
            method:"GET",
            success:function(res){
              // if (res.data == 1) {
              //   wx.showModal({
              //     title: '暂无消费记录，不可转介！',
              //     success: function (res) {
              //       if (res.confirm) {
              //         wx.navigateBack({
                       
              //         })
              //       }else if(res.cancel){
              //         wx.navigateBack({
                       
              //         })
              //       }
              //     }
              //   })
              // } else {
                that.setData({
                  img: res.data.do,
                  user: res.data.user_id
                })
              // }
              
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
      title: '康美工坊',
      path: '/pages/index/index?scene='+scene,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})