// pages/ti/ti.js
Page({

  data: {
  
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that=this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/questions',
      data:{},
      method:"GET",
      success:function(res){
        wx.hideLoading();
        that.setData({
          list:res.data.info,
          lun: res.data.lun,
          gong: res.data.gong
        })
      }
    })
  },
  // =====返回上一级
  backName:function(){
    wx.navigateBack({
      delta:1
    })
  },
  // ======banner跳转
  bannerName: function (e) {
    // 1 商品 2资讯  3会员卡  4攻略课堂 5线上报名 6题库
    var status = e.currentTarget.dataset.status;
    if (status == 1) {
      var shop_id = e.currentTarget.id;
      var app = getApp();
      app.requestshop_id = shop_id;
      wx.navigateTo({
        url: '../shop_details/shop_details',
      })
    } else if (status == 2) {
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
  // ======公告详情
  guangName: function (e) {
    wx.navigateTo({
      url: '../texts/texts?id=' + e.currentTarget.id,
    })
  },
  // =====开始答题
  beginName:function(e){
    wx.navigateTo({
      url: '../ceshi/ceshi?id='+e.currentTarget.id,
    })
  }
})