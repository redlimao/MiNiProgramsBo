// pages/my_orders/my_orders.js
Page({
  data: {
    curHdIndex: 0,
    empty:0
  },
  onLoad: function (options) {
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/yu',
            data: {code:ress.code,type:1},
            method: "GET",
            success: function (res) {
              console.log(res)
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                for (var i = 0; i < res.data.info.length; i++) {
                  res.data.info[i].status = 5
                }
                that.setData({
                  list: res.data.info,
                  empty: 0
                })
              }
            }
          })
        }
      }
    })  
  },
  //===========预约中
  yuName:function(){
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/yu',
            data: { code: ress.code, type: 1 },
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                for (var i = 0; i < res.data.info.length;i++){
                  res.data.info[i].status=5
                }
                that.setData({
                  list: res.data.info,
                  empty: 0
                })
              }
            }
          })
        }
      }
    })  
  },
   //===========工作中
  gongName:function(){
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/yu',
            data: { code: ress.code, type: 2 },
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  list: res.data.info,
                  empty: 0
                })
              }
            }
          })
        }
      }
    })
  },
  //===========已完成
  wanName: function () {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/yu',
            data: { code: ress.code, type: 3},
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                for (var i = 0; i < res.data.info.length; i++) {
                  res.data.info[i].status = 6
                }
                that.setData({
                  list: res.data.info,
                  empty: 0
                })
              }
            }
          })
        }
      }
    })
  },
  // ===大导航
  tabFun: function (e) {
    this.setData({
      curHdIndex: e.target.dataset.id
    });
  },
  // ======提醒
  tiName:function(){
    wx.showModal({
      title: '我们会尽快帮您预约家服人员',
    })
  },
  // ===详情
  detailsName: function (e) {
    var jia_id = e.currentTarget.id;
    var app = getApp();
    app.requestjia_id = jia_id;
    wx.navigateTo({
      url: '../jia_details/jia_details',
    })
  },
  // ====评价
  pingjiaName:function(e){
    var pings_id = e.currentTarget.id;
    var app = getApp();
    app.requestpings_id = pings_id;
    var pings_type =1
    var app = getApp();
    app.requestpings_type = pings_type;
    wx.navigateTo({
      url: '../fabu/fabu',
    })
  }
})