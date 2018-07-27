// pages/details/details.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes: [{
      name: "div,strong"
    }],
    title: "",
    money:0,
    moneys:"",
    value:0,
    flag:0,
    dou:0,
    shou:2,
    share:0
  },
  onLoad: function (options) {
   
    if (options.scene){
      var detail_id = decodeURIComponent(options.scene)
    }else{
      var detail_id = getApp().requestdetail_id;
    }
    console.log(detail_id)
    var that = this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Business/info',
            data: { code:ress.code,id: detail_id },
            method: "GET",
            success: function (res) {
              console.log(res)
              if (res.data.money == 0) {
                that.setData({
                  money: 1
                })
              }
              if (res.data) {
                var article = res.data.info.content
                WxParse.wxParse('article', 'html', article, that, 5)
                that.setData({
                  title: res.data.info.title,
                  moneys: res.data.info.money,
                  img:res.data.info.img,
                  id:res.data.info.id,
                  shou:res.data.shou,
                  value:res.data.dou,
                  dou:res.data.dou
                })
              }
            }
          })
        }
      }
    })  
  },
  //==================使用魔豆
  switchChange: function (e) {
    if (e.detail.value==true){
     this.setData({
        flag:1
      })
    }else{
      this.setData({
        flag: 0
      })
    }
  },
   //==================魔豆数量
  moName:function(e){
    var value=this.data.value
    this.setData({
      value: e.detail.value
    })
  },
  //==================订购
  orderName: function () {
    var money = this.data.moneys;
    var detail_id = getApp().requestdetail_id;
    var flag=this.data.flag;//1 选中 //0 没选
    var dou=parseInt(this.data.value);//穿的豆
    var dous = parseInt(this.data.dou);//自己的豆
    var title=this.data.title
    if (flag==0){
      dou=0;
    }
    if(dou<=dous){
      wx.login({
        success: function (ress) {
          if (ress.code) {
            wx.request({
              url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/pay/example/jsapi.php',
              data: { zhifu_openid: ress.code, total_fee: money, dou: dou ,title:title},
              method: 'GET',
              success: function (res) {
                console.log(res)
                var no=res.data.no;

                wx.requestPayment({
                  'timeStamp': res.data.pay.timeStamp,
                  'nonceStr': res.data.pay.nonceStr,
                  'package': res.data.pay.package,
                  'signType': 'MD5',
                  'paySign': res.data.pay.paySign,
                  'success': function (res) {
                    wx.login({
                      success: function (ress) {
                        console.log(no)
                        if (ress.code) {
                          wx.request({
                            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Pay/index',
                            data: { zhi_openid: ress.code, id: detail_id, money: money, dou: dou ,no:no},
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
    }else{
      wx.showModal({
        title: '您只有' + dous + "魔豆"
      })
    }
  },
  //==================收藏
  shouName:function(e){
    console.log(e)
    var that=this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Business/cang',
            data: { code: ress.code, id: e.currentTarget.id },
            method: "GET",
            success: function (res) {
             if(res.data==1){
                wx.showModal({
                  title: '已取消收藏'
                })
                that.setData({
                  shou: 2
                })
             }else if(res.data==2){
               wx.showModal({
                 title: '取消收藏失败'
               })
             } else if (res.data == 3) {
               wx.showModal({
                 title: '已收藏'
               })
               that.setData({
                 shou: 1
               })
             } else if (res.data == 4) {
               wx.showModal({
                 title: '收藏失败'
               })
             }
            }
          })
        }
      }
    }) 
  },
  // =======分享
  shareName:function(){
    this.setData({
      share:1
    })
    
  },
  erName:function(){
   wx.navigateTo({
     url: '../er/er',
   })
  },
  quxiao:function(){
    this.setData({
      share: 0
    })
  }
})