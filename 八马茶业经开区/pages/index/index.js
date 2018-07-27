// pages/producet/producet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex: 0,
    curFenIndex: 0,
    empty: 0,
    types: 2,
    goods_id: "",
    tan:1,
    juan:0, //
    coupons:2 //判断优惠卷条的出现
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.scene) {
      var sence = decodeURIComponent(options.scene)
    } else {
      var sence = 0;
    }
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Goods/indexs',
      data: { type: 2, sence: sence},
      method: "GET",
      success: function (res) {
        if (res.data.coupons==1){
          that.setData({
            juan:1
          })
        }else{
          that.setData({
            juan: 0,
            counts:res.data.counts,
            zong:res.data.zong,
            juan_list:res.data.coupons
          })
        }
        if (res.data.goods == 1) {
          that.setData({
            empty: 1,
            banner: res.data.lun,
            nav: res.data.type,
            goods_id: res.data.type[0].id
          })
        } else {
          that.setData({
            empty: 0,
            list: res.data.goods,
            banner: res.data.lun,
            nav: res.data.type,
            goods_id: res.data.type[0].id
          })
        }
      }
    })
  },
  // ===大导航
  tabFun: function (e) {
    this.setData({
      curHdIndex: e.target.dataset.id,
      curFenIndex: 0,
      goods_id: e.target.id
    });
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_bama//index.php?s=/Little/Goods/indexs',
      data: { id: e.target.id, type: e.target.dataset.ids},
      method: "GET",
      success: function (res) {
        if (res.data.goods == 1) {
          that.setData({
            empty: 1,
            banner: res.data.lun,
            nav: res.data.type
          })
        } else {
          that.setData({
            empty: 0,
            list: res.data.goods,
            banner: res.data.lun,
            nav: res.data.type
          })
        }
      }
    })
  },
  // =====搜索内容
  inpName: function (e) {
    var sou_id = e.detail.value;
    var app = getApp();
    app.requestsou_id = sou_id;
  },
  // ====搜索跳页面
  souName: function () {
    wx.navigateTo({
      url: '../list/list?type='+2,
    })
    this.setData({
      val: ""
    })
  },
  // ===商品详情跳转
  shopName: function (e) {
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    var types_id = e.currentTarget.dataset.id;
    var app = getApp();
    app.requesttypes_id = types_id;
    wx.navigateTo({
      url: '../shop_details/shop_details?types=' +2,
    })
  },
  // bannerName: function (e) {
  //   var shop_id = e.currentTarget.id;
  //   var app = getApp();
  //   app.requestshop_id = shop_id;
  //   wx.navigateTo({
  //     url: '../shop_details/shop_details',
  //   })
  // },
  onPullDownRefresh: function () {
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_bama//index.php?s=/Little/Goods/index',
      data: {},
      method: "GET",
      success: function (res) {
        if (res.data.goods == 1) {
          that.setData({
            empty: 1,
            banner: res.data.lun,
            nav: res.data.type,
            goods_id: res.data.type[0].id
          })
        } else {
          that.setData({
            empty: 0,
            list: res.data.goods,
            banner: res.data.lun,
            nav: res.data.type,
            goods_id: res.data.type[0].id
          })
        }
        wx.stopPullDownRefresh()
      }
    })
  },
  // ======领取优惠卷
  lingName:function(){
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama//index.php?s=/Little/Goods/coupons',
            data:{code:ress.code},
            method:"GET",
            success:function(res){
              if(res.data==1){
                wx.showToast({
                  title: '已经领取过了',
                })
              }
              else if(res.data==2){
                that.setData({
                  tan: 0
                })
              } else if (res.data == 2){
                wx.showModal({
                  title: '领取不成功',
                })
              }
            }
          })
        }
      }
    })
  },
  // =====关闭弹窗
  closeLing:function(){
    this.setData({
      tan:1
    })
  },
  // =====关闭优惠卷领取
  closeJuan:function(){
    this.setData({
      juan:1
    })
  },
  // 优惠券详情跳转
  quanName: function (e) {
    var money_id = 0;
    var app = getApp();
    app.requestmoney_id = money_id;
    wx.navigateTo({
      url: '../quan/quan',
    })
  },
})