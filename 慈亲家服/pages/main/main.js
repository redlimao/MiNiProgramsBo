// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards:1
  },
  onShow: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/index',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
              that.setData({
                cards: res.data.info.qie,
                photo:res.data.info.headimgurl,
                name:res.data.info.nickname,
                common:res.data.icon,
                nav:res.data.icons,
                points:res.data.info.covers,
                xu:res.data.info.xu,
                yue:res.data.info.yue
              })
            }
          })
        }
      }
    })  
  },
  // =====积分
  pointsName:function(){
    var cards=this.data.cards;
    if(cards==1){
      wx.showModal({
        title: '您还没有先择身份，去选择',
        success:function(res){
          if(res.confirm){
            wx.navigateTo({
              url: '../card_choose/card_choose',
            })
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../pay_money/pay_money',
      })
    }
  },
  // =====需求
  xuName:function(){
    var cards = this.data.cards;
    if (cards == 1) {
      wx.showModal({
        title: '您还没有先择身份，去选择',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../card_choose/card_choose',
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../my_xu/my_xu',
      })
    }
  },
  // ====预约
  ordersName:function(){
    var cards = this.data.cards;
    if (cards == 1) {
      wx.showModal({
        title: '您还没有先择身份，去选择',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../card_choose/card_choose',
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../my_orders/my_orders',
      })
    }
  },
  // ====地址
  chooseName:function(e){
    wx.chooseAddress({
      success: function (res) {
        wx.login({
          success:function(ress){
            if(ress.code){
              wx.request({
                url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/address',
                data: { code: ress.code, name: res.userName, phone: res.telNumber, pro: res.provinceName, city: res.cityName, area: res.countyName, add: res.detailInfo, codes: res.nationalCode},
                method: "GET",
                success: function (res) {
                }
              })
            }
          }
        })    
      }
    })
  },
  // ====二维码
  erName:function(){
    wx.navigateTo({
      url: '../er/er',
    })
  },
  // ====身份选择
  cardName:function(){
    wx.navigateTo({
      url: '../card_choose/card_choose',
    })
  },
  moreName:function(){
    var typess_id =1;
    var app = getApp();
    app.requesttypess_id = typess_id; 
    wx.navigateTo({
      url: '../my_order/my_order',
    })
  },
  // ====刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/index',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
              that.setData({
                cards: res.data.info.qie,
                photo: res.data.info.headimgurl,
                name: res.data.info.nickname,
                common: res.data.icon,
                nav: res.data.icons,
                points: res.data.info.covers,
                xu: res.data.info.xu,
                yue: res.data.info.yue
              })
              wx.stopPullDownRefresh()
            }
          })
        }
      }
    })  
  },
  aboutName:function(){
    wx.navigateTo({
      url: '../mains/mains',
    })
  }
})