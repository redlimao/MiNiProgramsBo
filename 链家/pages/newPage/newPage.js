
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    wei:"",
    jing:"",
    tel :"",
    nodes: [{
      name: "div,strong"
    }],
  },
  onLoad:function(){
    var that=this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Center/about_us',
      data:{},
      method:"GET",
      success:function(res){
          console.log(res);
        var article = res.data.info.intro
        WxParse.wxParse('article', 'html', article, that, 5)
        that.setData({
          banner: res.data.info.one,
          map_img: res.data.info.two,
          phone_img: res.data.info.three,
          tel: res.data.info.phone,
          address: res.data.info.address,
          wei: res.data.info.wei,
          jing: res.data.info.jing
        })
      }
    })
  },
  telName: function () {
    var tel=this.data.tel;
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
  mapName: function () {
    var wei =Number(this.data.wei);
    var jing = Number(this.data.jing);
    wx.openLocation({
      latitude: wei,

      longitude: jing,
      scale: 28
    })
  },
})