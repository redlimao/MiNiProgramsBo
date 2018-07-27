Page({
  data: {
      pop_index:0,
      img_index:0
  },
  onLoad: function (options) {
    if (options.scene) {
      var sence = decodeURIComponent(options.scene)
    } else {
      var sence = 0;
    }
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
        success:function(ress){
            if(ress.code){
                wx.getUserInfo({
                    success:function(res){
                        var userInfo = res.userInfo
                        var nickName = userInfo.nickName
                        var avatarUrl = userInfo.avatarUrl
                        var gender = userInfo.gender //性别 0：未知、1：男、2：女
                        var province = userInfo.province
                        var city = userInfo.city
                        var country = userInfo.country
                        wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_yanjing/index.php?s=/Little/Company/index',
                            data: {sence: sence, code: ress.code, img: avatarUrl, sex: gender, name: nickName, city: city, pro: province, cou: country},
                            method: "GET",
                            success: function (res) {
                                console.log(res);
                                that.setData({
                                    banner: res.data.lun,
                                    address: res.data.company
                                })
                            },
                            complete: function () {
                                wx.hideLoading()
                            }
                        })
                    }
                })

            }
        }
    }) 
  },
  //==查看原图
  yuanName: function (e) {
      this.setData({
          flag: 1,
          pop_index: e.currentTarget.dataset.index,
          img_index:e.currentTarget.dataset.id
      })
      console.log(e.currentTarget.dataset.index, e.currentTarget.dataset.id)
  },
  //==回复原图
  huiName: function () {
      this.setData({
          flag: 0
      })
  },
  telName: function (e) {
    var tel = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
  mapName: function (e) {
    var wei = Number(e.currentTarget.dataset.wei);
    var jing = Number(e.currentTarget.dataset.jing);
    wx.openLocation({
      latitude: wei,

      longitude: jing,
      scale: 28
    })
  }
})