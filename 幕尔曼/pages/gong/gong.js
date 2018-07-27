
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    wei: "",
    jing: "",
    tel: "",
    nodes: [{
      name: "div,strong"
    }],
    tabArr: {
      curHdIndex: 1,
      curBdIndex: 0
    },
    flag:0
  },
  onLoad: function (options) {
    if (options.scene) {
      var sence = decodeURIComponent(options.scene)
    } else {
      var sence = 0;
    }
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_mrm/index.php?s=/Little/Company/index',
      data: { type: 1 },
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        var article = res.data.intro
        WxParse.wxParse('article', 'html', article, that, 5)
        that.setData({
          banner: res.data.one,
          map_img: res.data.two,
          phone_img: res.data.three,
          tel: res.data.phone,
          address: res.data.address,
          wei: res.data.wei,
          jing: res.data.jing
        })
      }
    })
  },
  tabFun: function (e) {
    //获取触发事件组件的dataset属性 
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    var user = this.data.user;
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    var that = this;
    this.setData({
      tabArr: _obj
    });
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_mrm/index.php?s=/Little/Company/index',
      data: { type: e.target.dataset.id },
      method: "GET",
      success: function (res) {
        var article = res.data.intro
        WxParse.wxParse('article', 'html', article, that, 5)
        that.setData({
          banner: res.data.one,
          map_img: res.data.two,
          phone_img: res.data.three,
          tel: res.data.phone,
          address: res.data.address,
          wei: res.data.wei,
          jing: res.data.jing
        })
      }
    })
  },
  telName: function () {
    var tel = this.data.tel;
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
  mapName: function () {
    var wei = Number(this.data.wei);
    var jing = Number(this.data.jing);
    wx.openLocation({
      latitude: wei,

      longitude: jing,
      scale: 28
    })
  },
  yuanName:function(e){
    this.setData({
      src:e.currentTarget.dataset.id,
      flag:1
    })
  },
  huiName:function(){
    this.setData({
      flag: 0
    })
  }
})