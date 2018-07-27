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
            url:'https://www.mozhifang.cn/csj/index.php?s=/Little/Codes/index',
            data:{code:ress.code},
            method:"GET",
            success:function(res){
              console.log(res)
              that.setData({
                img:res.data.do,
                user:res.data.user_id
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
        console.log(res)
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
      console.log(res.target)
    }
    return {
      title: '慈亲家服',
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