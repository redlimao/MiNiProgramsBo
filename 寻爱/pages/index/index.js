
Page({
  data: {
    list:[],
    n:1,
    more:0
  },
  onLoad: function (options){
    var that=this;
    if (options.scene) {
      var sence = decodeURIComponent(options.scene)
    } else {
      var sence = 0;
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.getUserInfo({
            success:function(res){
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/index',
                data: { code: ress.code, img: avatarUrl, name: nickName, city: city, pro: province, cou: country ,sence: sence},
                method: "GET",
                success: function (res) {
                  console.log(res)
                  that.setData({
                    lun:res.data.lun,
                    list:res.data.news,
                    gong:res.data.gong
                  })
                },
                complete: function () {
                  wx.hideLoading();
                }
              })
            }
          })
        }
      }
    })    
  },
  // ======banner跳转
  bannerName:function(e){
    // 1 商品 2资讯  3会员卡  4攻略课堂 5线上报名 6题库
    var status=e.currentTarget.dataset.status;
    if (status==1){
      var shop_id = e.currentTarget.id;
      var app = getApp();
      app.requestshop_id = shop_id;
      wx.navigateTo({
        url: '../shop_details/shop_details',
      })
    } else if (status == 2){
      wx.navigateTo({
        url: '../texts/texts?id=' + e.currentTarget.id,
      })
    } else if (status == 3) {
      wx.switchTab({
        url: '../vip/vip',
      })
    } else if (status == 4) {
      wx.navigateTo({
        url: '../class/class',
      })
    } else if (status == 5) {
      wx.navigateTo({
        url: '../order/order',
      })
    } else if (status == 6) {
      wx.navigateTo({
        url: '../ti/ti',
      })
    }
  },
  // ====测试题
  tiName:function(){
    wx.navigateTo({
      url: '../ti/ti',
    })
  },
  // =====攻略课堂
  className:function(){
    wx.navigateTo({
      url: '../class/class',
    })
  },
  // ======线上报名
  baoName:function(){
    wx.navigateTo({
      url: '../bao/bao',
    })
  },
  // =====咨询预约
  ziName:function(){
    wx.navigateTo({
      url: '../zi/zi',
    })
  },
  // ======新闻详情
  detailName:function(e){
    wx.navigateTo({
      url: '../texts/texts?id='+e.currentTarget.id,
    })
  },
  // ======公告详情
  guangName:function(e){
    wx.navigateTo({
      url: '../texts/texts?id=' + e.currentTarget.id,
    })
  },
  // =====签到
  qianName:function(){
    wx.navigateTo({
      url: '../qian/qian',
    })
  },
  //=============下拉加载
  onReachBottom: function () {
    var n = this.data.n;
    var that = this;
    var list = this.data.list;
    var more=this.data.more;
    n++;
    this.setData({
      n: n
    })
    // ==========获取列表信息
    if (more!=1){
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/la',
        data: { currpage: n },
        method: "GET",
        success: function (res) {
          wx.hideLoading()
          if (res.data.news == 1) {
            that.setData({
              more: 1
            })
          } else {
            for (var i = 0; i < res.data.news.length; i++) {
              list.push(res.data.news[i])
            }
            that.setData({
              list: list
            })
          }
        }
      })
    }
  }
})