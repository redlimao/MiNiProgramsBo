//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: ress => {
        if(ress.code){
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/User/index',
                data: { code: ress.code, img: avatarUrl, name: nickName, city: city, pro: province, cou: country },
                method: "GET",
                success: function (res) {
                },
                complete: function () {
                  wx.hideLoading();
                }
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})