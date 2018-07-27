// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: 1
  },
  onShow: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Center/indexs',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
              console.log(res);
              that.setData({
                photo: res.data.info.headimgurl,
                name: res.data.info.nickname,
                common: res.data.icon,
                message:res.data.num,
                xiao:res.data.res,
                birthday:res.data.birthday
              })
            }
          })
        }
      }
    })
  },
  //我的预定
  bindyu:function(e){
    wx.navigateTo({
        url: '../yue/yue',
    })
  },
  // =====积分
  pointsName: function () {
    var cards = this.data.cards;
    wx.navigateTo({
      url: '../createList/createList',
    })
  },
  // ====二维码
  erName: function () {
    wx.navigateTo({
      url: '../er/er',
    })
  },
  // ====收藏
  collectName: function () {
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  //====分销
  jieName:function(){
    wx.navigateTo({
      url: '../jie/jie',
    })
  },
  cardName:function(){
    wx.navigateTo({
      url: '../message/message',
    })
  },
  moreName: function () {
    var typess_id = 1;
    var app = getApp();
    app.requesttypess_id = typess_id;
    wx.navigateTo({
      url: '../my_order/my_order',
    })
  },
  // =====收货地址
  addName:function(){
    wx.chooseAddress({
      success: function (resss) {
        var address = resss.provinceName + resss.cityName + resss.countyName + resss.detailInfo
        // wx.request({
        //   url: 'https://www.mozhifang.cn/store_kangmei/pay/example/jsapi.php',
        //   data: { code: ress.code, total_fee: totalPrice, title: carts[0].shop_name },
        //   method: 'GET',
        //   success: function (res) {
        //     console.log(res)
        //   }
        // })
      },
      fail: function (res) {
        wx.openSetting({
          success: (res) => {
          }
        })
      }
    })
  },
  // ======打电话
  telName:function(){
    wx.makePhoneCall({
      phoneNumber: '15829792593' //仅为示例，并非真实的电话号码
    })
  },
  // ====刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Center/indexs',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
              that.setData({
                photo: res.data.info.headimgurl,
                name: res.data.info.nickname,
                common: res.data.icon,
                message: res.data.num,
                xiao: res.data.res,
                birthday: res.data.birthday
              })
              wx.stopPullDownRefresh();
            }
          })
        }
      }
    })
  },
  //=====分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '八马茶业经开区',
      path: '/pages/gong/gong',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  jiName:function(e){
    wx.navigateTo({
      url: '../newpage/newpage',
    })
  }
})