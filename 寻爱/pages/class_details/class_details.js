var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    nodes: [{
      name: "div,strong"
    }],
    phone:'',
    pan:''
  },
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/schoolroom_info',
            data: {code:ress.code,id:id},
            method: "GET",
            success: function (res) {
              console.log(res)
              var article = res.data.info.content
              WxParse.wxParse('article', 'html', article, that, 5)
              wx.hideLoading()
              that.setData({
                phone:res.data.phone,
                pan:res.data.pan,
                money:res.data.info.moneys,
                id:res.data.info.id
              })
            }
          })
        }
      }
    })
   
  },
  // ========返回上一级
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // =======电话
  telName:function(){
    var phone=this.data.phone;
    wx.makePhoneCall({
      phoneNumber:phone,
    })
  },
  // =========支付
  buyName: function (e) {
    var that = this;
    var list = this.data.list;
    var pan = this.data.pan;
    var money = this.data.money ;
    var id = this.data.id;
    if (pan == 1) {
      wx.login({
        success: function (ress) {
          if (ress.code) {
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_love/pay/example/jsapi.php',
              data: { code: ress.code, total_fee: money, title: '报名预约' },
              method: 'GET',
              success: function (res) {
                wx.requestPayment({
                  'timeStamp': res.data.pay.timeStamp,
                  'nonceStr': res.data.pay.nonceStr,
                  'package': res.data.pay.package,
                  'signType': 'MD5',
                  'paySign': res.data.pay.paySign,
                  'success': function (ress) {
                    wx.showToast({
                      title: '支付成功',
                      success: function () {
                      }
                    })
                    wx.request({
                      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/schoolroom',
                      data: { no: res.data.no, op: res.data.op, moneys: money, id: id, status: 1 },
                      method: 'GET',
                      success: function (res) {
                      }
                    })
                  },
                  'fail': function (res) {
                  },
                  'complete': function (ress) {
                    if (ress.errMsg == "requestPayment:fail cancel") {
                      wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/schoolroom',
                        data: { no: res.data.no, op: res.data.op, moneys: money, id: id, status: 2 },
                        method: 'GET',
                        success: function (res) {
                          if(res.data.info==1){
                            wx.showModal({
                              title: '支付失败',
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }
      });
    } else {
      wx.showModal({
        title: '请完善信息',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../message/message',
            })
          }
        }
      })
    }

  }
})