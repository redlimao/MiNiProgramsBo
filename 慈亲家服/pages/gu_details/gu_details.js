var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    nodes: [{
      name: "div,strong"
    }],
    collect: 2,
    tel:"",
    gu_types:""
  },

  onLoad: function (options) {
    var gu_id = getApp().requestgu_id;
    var gu_types = getApp().requestgu_types;
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Info/index',
            data: { id: gu_id, type: 2, code: ress.code },
            method: "GET",
            success: function (res) {
              console.log(res)
              that.setData({
                gu_types: gu_types,
                list:res.data.info,
                collect:res.data.shou,
                tel:res.data.phone,
                title:res.data.title,
                time:res.data.time
              })
            }
          })
        }
      }
    })
  },
  // ===========电话
  telName:function(){
    var tel=this.data.tel;
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
  // ===========收藏
  collectName: function () {
    var gu_id = getApp().requestgu_id;
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Collect/index',
            data: { id: gu_id, type: 3, code: ress.code },
            method: "GET",
            success: function (res) {
              if (res.data == 2) {
                wx.showToast({
                  title: '收藏成功',
                })
                that.setData({
                  collect: 1
                })
              } else if (res.data == 1) {
                wx.showToast({
                  title: '取消收藏',
                })
                that.setData({
                  collect: 2
                })
              } else {
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
  gaiName:function(e){

    wx.navigateTo({
      url: '../zhu_fabu/zhu_fabu',
    })
  }
})