var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    nodes: [{
      name: "div,strong"
    }],
    collect: 2,
    tel:"",
    current:1,
    stars_one:[1,1,1,2,2]
  },

  onLoad: function (options) {
    var jia_id = getApp().requestjia_id;
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Info/index',
            data: { id: jia_id, type: 1,code:ress.code },
            method: "GET",
            success: function (res) {
              console.log(res)
              if (res.data.info[0].status == 1) {
                res.data.info[0].status = 3
              }
              that.setData({
                ages: res.data.info[0].years,
                agess: res.data.info[0].job_years,
                list: res.data.info,
                num: res.data.nums,
                date: res.data.date,
                collect:res.data.shou,
                tel:res.data.phone,
                er:res.data.er
              })
              var article = res.data.content
              WxParse.wxParse('article', 'html', article, that, 5)
              if (res.data.ping == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  empty: 0,
                  ping: res.data.ping
                })
              }
            }
          })
        }
      }
    })  
  },
  // ========预约
  orderName:function(){
    var types_id = 1;
    var app = getApp();
    app.requesttypes_id = types_id;
    var tel=this.data.tel
    wx.showActionSheet({
      itemList: ['电话预约', '提交信息'],
      success: function (res) {
        if (res.tapIndex==0){
          wx.makePhoneCall({
            phoneNumber: tel,
          })
        } else if (res.tapIndex == 1){
          wx.login({
            success:function(ress){
              if(ress.code){
                wx.request({
                  url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Info/pan',
                  data: {  code: ress.code },
                  method: "GET",
                  success: function (res) {
                    if(res.data==1){
                      wx.navigateTo({
                        url: '../order/order',
                      })
                    }else{
                      wx.showModal({
                        title: '去选择身份',
                        success:function(res){
                          if(res.confirm){
                            wx.navigateTo({
                              url: '../card_choose/card_choose',
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
      },
    })
  },
  // ===========收藏
  collectName:function(){
    var jia_id = getApp().requestjia_id;
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Collect/index',
            data: { id: jia_id, type: 1,code:ress.code},
            method: "GET",
            success: function (res) {
              if(res.data==2){
                wx.showToast({
                  title: '收藏成功',
                })
                that.setData({
                  collect:1
                })
              }else if(res.data==1){
                wx.showToast({
                  title: '取消收藏',
                })
                that.setData({
                  collect: 2
                })
              }else{
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
  //tab切换
  bindtabs:function(e){
    var index = e.target.dataset.index;
    this.setData({
        current: index
    })
  }
})