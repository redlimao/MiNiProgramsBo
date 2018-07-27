
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    hidden: true,
    hiddens: false
  },
  onLoad: function (options) {
    this.videoContext = wx.createVideoContext('myVideo');
    if (options.scene) {
      var sence = decodeURIComponent(options.scene)
    } else {
      var sence = 0;
    }
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              wx.request({
                url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Index/shou',
                data: { code: ress.code, img: avatarUrl, sex: gender, name: nickName, city: city, pro: province, cou: country, sence: sence },
                method: "GET",
                success: function (res) {
                  that.setData({
                    banner:res.data.banner,
                    nav:res.data.type,
                    video_img:res.data.video.img_url,
                    video_url: res.data.video.url,
                    details_list:res.data.tuwen,
                  })
                }
              })
            }
          })
        }
      }
    })

  },
  //==开始视频
  videoName: function (e) {
    this.setData({
      hidden: false,
      hiddens: true
    })
  },
  //==暂停视频
  pauseName: function () {
    this.videoContext.pause()
    this.setData({
      hidden: true,
      hiddens: false
    })
  }
})