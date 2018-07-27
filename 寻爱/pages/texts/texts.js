var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    nodes: [{
      name: "div,strong"
    }],
  },
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Info/news',
            data: { id: id ,code:ress.code},
            method: "GET",
            success: function (res) {
              wx.hideLoading();
              that.setData({
                id: id,
                lei: res.data.info.lei,
                money: res.data.info.moneys,
                vip_moneys: res.data.info.vip_moneys,
                vip:res.data.vip
              })
              var article = res.data.info.content
              WxParse.wxParse('article', 'html', article, that, 5)
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
  // =====会员报名
  huiName:function(e){
    var id = this.data.id;
    var that = this;
    var vip=this.data.vip;
    if(vip==1){
      if (e.currentTarget.dataset.id>0){
        wx.login({
          success: function (ress) {
            if (ress.code) {
              wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_love/pay/example/jsapi.php',
                data: { code: ress.code, total_fee: e.currentTarget.dataset.id, title: '非会员支付' },
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
                        url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/news',
                        data: { no: res.data.no, op: res.data.op, id: id, moneys: e.currentTarget.dataset.id, status: 1 },
                        method: 'GET',
                        success: function (res) {
                          if (res.data.info == 2) {
                            wx.showToast({
                              title: '报名成功',
                            })
                            that.setData({
                              vip:3
                            })
                          }
                        }
                      })
                    },
                    'fail': function (res) {
                    },
                    'complete': function (ress) {
                      if (ress.errMsg == "requestPayment:fail cancel") {
                        wx.request({
                          url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/news',
                          data: { no: res.data.no, op: res.data.op, id: id, moneys: e.currentTarget.dataset.id, status: 2 },
                          method: 'GET',
                          success: function (res) {
                          }
                        })
                      }
                    }
                  })
                }
              })
            }
          }
        })
      }else{
        wx.login({
          success:function(ress){
            if(ress.code){
              wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/news',
                data: { id: id,status:1,code:ress.code},
                method:"GET",
                success:function(res){
                  if(res.data.info==2){
                    wx.showToast({
                      title: '报名成功',
                    })
                    that.setData({
                      vip: 3
                    })
                  }
                }
              })
            }
          }
        })    
      }
    }else if(vip==2){
      wx.showModal({
        title: '您还不是会员'
      })
    } else if(vip==3){
      wx.showModal({
        title: '您已经报过名了'
      })
    }
  },
  // ======非会员报名
  feiName:function(e){
    var id=this.data.id;
    var vip=this.data.vip;
    var that=this;
    if(vip==3){
      wx.showModal({
        title: '您已经报过名了'
      })
    }else{
      wx.login({
        success: function (ress) {
          if (ress.code) {
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_love/pay/example/jsapi.php',
              data: { code: ress.code, total_fee: e.currentTarget.dataset.id, title: '非会员支付' },
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
                      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/news',
                      data: { no: res.data.no, op: res.data.op, id: id, moneys: e.currentTarget.dataset.id, status: 1 },
                      method: 'GET',
                      success: function (res) {
                        if (res.data.info == 2) {
                          wx.showToast({
                            title: '报名成功',
                          })
                          that.setData({
                            vip: 3
                          })
                        }
                      }
                    })
                  },
                  'fail': function (res) {
                  },
                  'complete': function (ress) {
                    if (ress.errMsg == "requestPayment:fail cancel") {
                      wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/news',
                        data: { no: res.data.no, op: res.data.op, id: id, moneys: e.currentTarget.dataset.id, status: 2 },
                        method: 'GET',
                        success: function (res) {
                          console.log(res)
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }
      })
    }
  }
})