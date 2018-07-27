//Appointment.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()

Page({
  data: {
    selected:true,
    currentIndex : 0,
    money:'',
    carts: [],
    flag: false
  },
  bindSelected:function(){
    var selected = this.data.selected;
    selected = !selected;
    this.setData({
      selected : selected
    });
  },
  
  //事件处理函数
  //显示弹窗层
  showDetail: function (e) {
    var flag = this.data.flag;
    flag = true;
    this.setData({
      flag: flag
    })
  },
  //隐藏弹窗层
  hideDetail: function (e) {
    var flag = this.data.flag;
    flag = false;
    this.setData({
      flag: flag
    })
  },
  onLoad: function (options) {
    var that = this;
    console.log(getApp().requestreads);
    var article = getApp().requestreads.content;
    WxParse.wxParse('article', 'html', article, that, 5);
    var totalPrice = getApp().requestPrice;
    that.setData({
      money: totalPrice
    })
  },
  formSubmit: function (e) {
    var shop_id = getApp().requestshop_id;
    var goods_type_id = getApp().requesttype;
    var carts = getApp().requestcarts ;
    var money = this.data.money;
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var infos = e.detail.value.infos;
    if(name == ''){
      wx.showModal({
        title: '请输入您的姓名'
      })
    }else if (phone == '') {
      wx.showModal({
        title: '请输入您的电话'
      })
    } else if (!(/^1[34578]\d{9}$/.test(phone))){
      wx.showModal({
        title: '请输入正确的电话号码'
      })
    } else if (!this.data.selected){
      wx.showModal({
        title: '请勾选定金缴纳服务条款'
      })
    }else{
      wx.login({
        success: function (ress) {
          if (ress.code) {
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_trees/pay/example/jsapi.php',
              data: { code: ress.code, total_fee: money },
              method: 'GET',
              success: function (res) {
                console.log(res);
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
                      url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Orders/index',
                      data: { no: res.data.no, op: res.data.op, shop_num: carts[0].shop_num, moneys: money, type: 1, status: 1, id: carts[0].id, name: name, phone: phone, goods_type_id: goods_type_id, trees: infos },
                      method: 'GET',
                      success: function (res) {
                      }
                    })
                  },
                  'fail': function (res) {
                    console.log(res)
                  },
                  'complete': function (ress) {
                    console.log(ress);
                    if (ress.errMsg == "requestPayment:fail cancel") {

                      wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Orders/index',
                        data: { no: res.data.no, op: res.data.op, shop_num: carts[0].shop_num, moneys: money, type: 1, status: 2, id: carts[0].id, name: name, phone: phone, goods_type_id: goods_type_id, trees: infos },
                        method: 'GET',
                        success: function (res) {
                          console.log(res);
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


  },


})
