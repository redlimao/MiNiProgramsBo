// pages/main/main.js
Page({
  data: {
    cards: 1,
    user_id:'',
    fa:'',
    path:''
  },
  onShow: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        console.log(ress);
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/index',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
              console.log(res);
              that.setData({
                cards: res.data.info.qie,
                photo: res.data.info.headimgurl,
                name: res.data.info.nickname,
                common: res.data.icon,
                nav: res.data.icons,
                points: res.data.info.covers,
                zhuan: res.data.info.zhuan,
                collect: res.data.info.collect,
                user_id:res.data.info.id,
                fa:res.data.fa,
                  path:res.data.zhi_url
              })
            }
          })
        }
      }
    })
  },
  //查看订单
  bindLookInfo:function(){
    wx.navigateTo({
      url: '../lookinfo/lookinfo',
    })
  },
  //查看信息页面
  bindLookMessage:function(){
    wx.navigateTo({
        url: '../lookmessage/lookmessage',
    })
  },
  //会员管理
  bindMember:function(){
      var user_id = getApp();
      user_id.requsetId = this.data.user_id;
      wx.navigateTo({
          url: '../member/member',
      })        
  },
  //发布页面
  bindMessage:function(){
      var that = this;
      var fa = that.data.fa;
      var app = getApp();
      app.requsetId = this.data.user_id;
      if (!!app.requestshop_id){
          app.requestshop_id = undefined;
      }
      if(fa == 1){
          wx.navigateTo({
              url: '../fabumessage/fabumessage',
          })
      }else{
          wx.showModal({
              title: '提示',
              content: '请先完善信息',
              success: function (res) {
                  if (res.confirm) {
                      var user_id = getApp();
                      user_id.requsetId = that.data.user_id;
                      wx.navigateTo({
                          url: '../message/message',
                      })
                  } else if (res.cancel) {
                      console.log('用户点击取消')
                  }
              }
          })
      }

  },
  // 修改个人信息
  myMessage: function () {
    var user_id = getApp();
    user_id.requsetId = this.data.user_id;
    wx.navigateTo({
      url: '../message/message',
    })
  },
  // 电话
  telName: function () {
    wx.makePhoneCall({
      phoneNumber: "15129213773"
    })
  },
  //收货地址
  bindAdress: function () {
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  // =====我的预约
  pointsName: function () {
    var cards = this.data.cards;
    wx.navigateTo({
      url: '../myAppointment/myAppointment',
    })
  },
  bindContact: function(){
    wx.navigateTo({
      url: '../mains/mains'
    })
  },
  // ====二维码
  erName: function () {
    wx.navigateTo({
      url: '../er/er',
    })
  },
  // ====收藏
  collectName: function () {
    wx.navigateTo({
      url: '../myCollect/myCollect',
    })
  },
  //====分销
  jieName:function(){
    wx.navigateTo({
      url: '../jie/jie',
    })
  },
  cardName:function(){
    wx.navigateTo({
      url: '../message/message',
    })
  },
  moreName: function () {
    var typess_id = 1;
    var app = getApp();
    app.requesttypess_id = typess_id;
    wx.navigateTo({
      url: '../my_order/my_order',
    })
  },
  jiName: function () {
      var path = this.data.path;
      console.log(path)
    wx.navigateTo({
        url: '../newPage/newPage?path=' + path,
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.login({
        success: function (ress) {
            console.log(ress);
            if (ress.code) {
                wx.request({
                    url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/index',
                    data: { code: ress.code },
                    method: "GET",
                    success: function (res) {
                        console.log(res);
                        that.setData({
                            cards: res.data.info.qie,
                            photo: res.data.info.headimgurl,
                            name: res.data.info.nickname,
                            common: res.data.icon,
                            nav: res.data.icons,
                            points: res.data.info.covers,
                            zhuan: res.data.info.zhuan,
                            collect: res.data.info.collect,
                            user_id: res.data.info.id
                        })
                    }
                })
            }
            
        },
        complete:function(){
            wx.stopPullDownRefresh();
        }
    })
  }     
})