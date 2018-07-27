Page({
  data: {
      flag_mess:''
  },
  onShow: function () {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Center/indexs',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
                console.log(res);
              that.setData({
                info: res.data.info,
                common:res.data.icon,
                flag_mess:res.data.hui
              })
            },
            complete: function () {
              wx.hideLoading();
            }
          })
        }
      }
    })
  },
  //充值
  chongName: function () {
      var cards = this.data.cards;
      var flag_mess = this.data.flag_mess;
      if (flag_mess == 1){
          wx.navigateTo({
              url: '../createList/createList',
          })
      }else{
          wx.showModal({
              title: '提示',
              content: '请完善信息',
              showCancel:false,
              success: function () {
                  wx.navigateTo({
                      url: '../message/message',
                  })
              }
          })
      }

  },
  //收藏
  collectName: function () {
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  // 优惠券详情跳转
  quanName: function (e) {
    var money_id = 0;
    var app = getApp();
    app.requestmoney_id = money_id;
    wx.navigateTo({
      url: '../quan/quan',
    })
  },
  // =====全部订单
  orderName:function(){
    var typess_id = 1;
    var app = getApp();
    app.requesttypess_id = typess_id;
    wx.navigateTo({
      url: '../my_order/my_order',
    })
  },
  //个人资料
  bindMessage: function (e) {
    wx.navigateTo({
      url: '../message/message',
    })
  },
  //联系客服
  bindPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  //意见反馈
  bindIdea: function (e) {
      var flag_mess = this.data.flag_mess;
      if (flag_mess == 1) {
          wx.navigateTo({
              url: '../ideadata/ideadata',
          })
      } else {
          wx.showModal({
              title: '提示',
              content: '请完善信息',
              showCancel: false,
              success: function () {
                  wx.navigateTo({
                      url: '../message/message',
                  })
              }
          })
      }  
  },
  // =====我的二维码
  erName:function(){
    wx.navigateTo({
      url: '../er/er',
    })
  },
  // =====技术支持
  jiName: function () {
    wx.navigateTo({
      url: '../newpage/newpage',
    })
  },
  // =====积分
  pointsName: function () {
    var cards = this.data.cards;
    wx.navigateTo({
      url: '../my_points/my_points',
    })
  },
  //====分销
  jieName: function () {
    wx.navigateTo({
      url: '../jie/jie',
    })
  },
  //===============转发
  onShareAppMessage: function (res) {
    return {
      title: '八马茶业经开区',
      path: '/pages/main/main',
      success: function (res) {
        wx.showToast({
          title: '转发成功',
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
        })
      }
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Center/indexs',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
              that.setData({
                info: res.data.info,
                common: res.data.icon
              })
            },
            complete: function () {
              wx.stopPullDownRefresh();
            }
          })
        }
      }
    })

  }
})
