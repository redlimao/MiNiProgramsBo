
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
      url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Company/index',
      data:{},
      method:"GET",
      success:function(res){
        console.log(res);
        var article = res.data.intro
        WxParse.wxParse('article', 'html', article, that, 5)
        that.setData({
          banner:res.data.one,
          map_img:res.data.two,
          phone_img:res.data.three,
          tel:res.data.phone,
          address:res.data.address,
          wei:res.data.wei,
          jing:res.data.jing
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