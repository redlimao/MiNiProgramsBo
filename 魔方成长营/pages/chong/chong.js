// pages/myheart/myheart.js
Page({
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0,
    },
    money:"",
    moneys:"",
    chong_id:1,
    ti:"",
    tui:"",
    no:""
  },
  tabFun: function (e) {
    //获取触发事件组件的dataset属性 

    var _datasetId = e.target.dataset.id;
    var chong_id = parseInt(e.target.dataset.id) + 1;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj,
      chong_id: chong_id
    });
  },
  onLoad: function (options) {
    var that = this;
    var ti=getApp().requestti_id;
    var money_id = getApp().requestmoney_id;
    this.setData({
      ti:ti
    })
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName//昵称
        var avatarUrl = userInfo.avatarUrl//头像
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province//
        var city = userInfo.city
        var country = userInfo.country
        that.setData({
          photo: avatarUrl,
          name: nickName
        })
      }
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Pay/yu',
            data: { code: ress.code },
            method: 'GET',
            success: function (res) {
              console.log(res)
              that.setData({
                moneys: res.data.yu,
                one_m: res.data.one,
                two_m: res.data.two,
                three_m: res.data.three
              })
            }
          })
        }
      }
    })
    if(ti==2){
      wx.request({
        url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Pay/tui',
        data: { id: money_id},
        method: 'GET',
        success: function (res) {
          that.setData({
            tui:res.data.money,
            no:res.data.trade_no
          })
        }
      })
    }
  },
  //=========充值
  chongName:function(){
    var that = this;
    
    var chong_id=this.data.chong_id;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/pay/example/jsapi.php',
            data: { zhifu_openid: ress.code, total_fee: chong_id ,type:1},
            method: 'GET',
            success: function (res) {
              console.log(res)
              wx.requestPayment({
                'timeStamp': res.data.pay.timeStamp,
                'nonceStr': res.data.pay.nonceStr,
                'package': res.data.pay.package,
                'signType': 'MD5',
                'paySign': res.data.pay.paySign,
                'success': function () {
                  wx.login({
                    success: function (ress) {
                      if (ress.code) {
                        wx.request({
                          url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Pay/index',
                          data: { zhi_openid: ress.code, type: 1, money: chong_id ,no:res.data.no},
                          method: 'GET',
                          success: function (res) {

                          }
                        })
                      }
                    }
                  })
                },
                'fail': function (res) {
                },
                'complete': function (res) {
                }
              })
            }
          })
        }
      }
    })
  },
  //=========充值协议
  chong: function () {
    wx.navigateTo({
      url: '../xieyi/xieyi',
    })
  },
  //=========提现
  chongNames: function () {
    var money = this.data.tui;
    var no=this.data.no;
    var money_id = getApp().requestmoney_id;
    wx.request({
      url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Pay/cha',
      data: { id: money_id},
      method:"GET",
      success:function(res){
        if(res.data==1){
          wx.login({
            success: function (ress) {
              if (ress.code) {
                wx.request({
                  url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/pay/example/refund.php',
                  data: { refund: money, total: money, no: no },
                  method: 'GET',
                  success: function (res) {
                    if(res.data.result.result_code=="FAIL"){
                      wx.showModal({
                        title: '退款失败'
                      })
                    }else{
                      wx.request({
                        url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Pay/moneyouts',
                        data: { id: money_id, no: res.data.no },
                        method: "GET",
                        success: function (res) {
                          if (res.data == 1) {
                            wx.showModal({
                              title: '提现成功',
                              success: function (res) {
                                if (res.confirm) {
                                  wx.switchTab({
                                    url: '../main/main',
                                  })
                                }
                              }
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }else if(res.data==2){
          wx.showModal({
            title: '请于1个月之后在申请提现',
          })
        }
      }
    })
   
  },
})