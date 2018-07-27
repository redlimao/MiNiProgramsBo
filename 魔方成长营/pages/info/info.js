// pages/info/info.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var WxParse = require('../../wxParse/wxParse.js');
var qqmapsdk;
Page({

  data: {
    // tab切换  
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    info_list:[],
    list_food:[],
    two_foods: [],
    three_foods: [],
    four_foods: [],
    five_foods: [],
    nodes: [{
      name: "div,strong,span"
    }],
    shou:""
  },
  tabFun: function (e) {
    //获取触发事件组件的dataset属性 
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  },
  onLoad: function (options) {
    var school_id = getApp().requestschool_id;
    var that=this;
    wx.login({
      success: function (ress) {
        if (ress) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Info/index',
                data: {code:ress.code, school_id: school_id },
                method: "GET",
                success: function (res) {
                  if (res.data.info) {
                    var article = res.data.info[0].intro
                    WxParse.wxParse('article', 'html', article, that, 5)
                    that.setData({
                      info_list: res.data.info,
                      list_food: res.data.foods,
                      shou: res.data.info[0].shou
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  class_form:function(){
    wx.navigateTo({
      url: '../class/class',
    })
  },
  activeName: function () {
    wx.navigateTo({
      url: '../active/active',
    })
  },
  yimiaoName:function(){
    wx.navigateTo({
      url: '../zhang/zhang',
    })
  },
  zhaoName:function(){
    wx.navigateTo({
      url: '../zhao/zhao',
    })
  },
  addName:function(e){
    console.log(e.currentTarget.dataset.id)
    var that = this;
    qqmapsdk = new QQMapWX({
      key: '2UVBZ-L5X3W-W3CRB-OK3RA-6WXQH-4VFOJ'
    });
    qqmapsdk.geocoder({
      address: e.currentTarget.dataset.id,
      success: function (res) {
        wx.openLocation({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          scale: 28
        })
      },
      fail: function (res) {
        
      },
      complete: function (res) {
        
      }
    });
  },
  // ==============学校简介
  moreName:function(){
    var detail_id = getApp().requestschool_id;
    var app = getApp();
    app.requestdetail_id = detail_id;
    var type_id = 3;
    var app = getApp();
    app.requesttype_id = type_id;
    wx.navigateTo({
      url: '../details/details',
    })
  },
  // ==============招生情况
  zhaoName: function () {
    var detail_id = getApp().requestschool_id;
    var app = getApp();
    app.requestdetail_id = detail_id;
    var type_id = 5;
    var app = getApp();
    app.requesttype_id = type_id;
    wx.navigateTo({
      url: '../details/details',
    })
  },
  // ==============食物
  one:function(e){
    var school_id = getApp().requestschool_id;
    var that = this;
    wx.request({
      url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Info/foods',
      data: { school_id: school_id, weekday: e.currentTarget.dataset.id},
      method: "GET",
      success: function (res) {
        that.setData({
          list_food: res.data
        })
      }
    })
  },
  //================预约报名
  orderName:function(){
    var school_id = getApp().requestschool_id;
    wx.login({
      success: function (ress) {
        if (ress) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Yue/index',
                data: {
                  code: ress.code,school_id:school_id
                },
                method: "GET",
                success: function (res) {
                 if(res.data==2){
                   wx.navigateTo({
                     url: '../order/order',
                   })
                 } else if (res.data == 1){
                    wx.showModal({
                      title: '请您完善您的信息',
                      success:function(res){
                        if(res.confirm){
                          wx.navigateTo({
                            url: '../message/message',
                          })
                        }
                      }
                    })
                 }else if(res.data==3){
                    wx.showModal({
                      title: '已经预约过了',
                    })
                 }
                }
              })
            }
          })
        }
      }
    }) 
  },
  //================收藏
  collect:function(){
    var school_id = getApp().requestschool_id;
    var that=this;
    wx.login({
      success: function (ress) {
        if (ress) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Collects/index',
                data: {
                  code: ress.code, school_id: school_id
                },
                method: "GET",
                success:function(res){
                  if(res.data==1){
                    wx.showToast({
                      title: '收藏成功',
                    })
                    that.setData({
                      shou:2
                    })
                  }else if(res.data==2){
                    wx.showModal({
                      title: '收藏失败'
                    })
                  } else if (res.data == 3) {
                    wx.showModal({
                      title: '已经收藏过该学校'
                    })
                  }
                }
              })
            }
          })
        }
      }
    }) 
  },
  //===============打电话
  telName:function(e){
    var tel=e.currentTarget.id;
    console.log(tel)
    wx.makePhoneCall({
      phoneNumber: tel //仅为示例，并非真实的电话号码
    })
  },
  //=============报错
  missName: function (e) {
    wx.navigateTo({
      url: '../miss/miss'
    })
  },
})
  