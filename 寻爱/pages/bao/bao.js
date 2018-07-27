// pages/bao/bao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pan:'',
    phone:''
  },
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/line_top',
            data: {code:ress.code},
            method: "GET",
            success: function (res) {
              wx.hideLoading()
              that.setData({
                list: res.data.info,
                money: res.data.info[0].moneys,
                pan:res.data.pan,
                phone: res.data.info[0].phone
              })
            }
          })
        }
      }
    })   
  },
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // ======详情的出现
  createName: function (e) {
    var list = this.data.list;
    var index = e.currentTarget.dataset.index;
    if (list[index].flag == 0) {
      for (var i = 0; i < list.length; i++) {
        list[i].flag = 0
      }
      list[index].flag = 1
    } else {
      list[index].flag = 0
    }
    this.setData({
      list: list,
      money: e.currentTarget.dataset.money,
      phone: e.currentTarget.dataset.phone
    })
  },
  // =====打电话
  telName:function(e){
    var phone=this.data.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  // =========支付
  buyName:function(e){
    var that=this;
    var list=this.data.list;
    var pan=this.data.pan;
    var money;
    var id;
    for(var i=0;i<list.length;i++){
      if (list[i].flag==1){
        money = list[i].moneys;
        id = list[i].id
      }
    }
    if(pan==1){
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
                      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/line',
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
                        url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/line',
                        data: { no: res.data.no, op: res.data.op, moneys: money, id: id, status: 2 },
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
      });
    }else{
      wx.showModal({
        title: '请完善信息',
        success:function(res){
          if(res.confirm){
            wx.navigateTo({
              url: '../message/message',
            })
          }
        }
      })
    }
   
  }
})