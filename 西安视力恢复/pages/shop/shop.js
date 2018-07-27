// pages/producet/producet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex: 0,
    curFenIndex:0,
    empty: 0,
    types: 2,
    goods_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_yanjing/index.php?s=/Little/Goods/indexs',
      data: {type:1},
      method: "GET",
      success: function (res) {
        if (res.data.goods==1){
          that.setData({
            empty:1,
            banner: res.data.lun,
            nav: res.data.type,
            goods_id: res.data.type[0].id
          })
        }else{
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
      curFenIndex:0,
      goods_id: e.target.id
    });
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_yanjing/index.php?s=/Little/Goods/indexs',
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
  // ===小分类
  tabFuns: function (e) {
    this.setData({
      curFenIndex: e.currentTarget.dataset.id
    });
    var goods_id = this.data.goods_id;
    if (e.currentTarget.dataset.type == 1) {
      this.setData({
        types: 2
      })
    } else if (e.currentTarget.dataset.type == undefined) {
      this.setData({
        types: 3
      })
    } else {
      this.setData({
        types: 1
      })
    }
    // ====排行
    var types = this.data.types;
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_yanjing/index.php?s=/Little/Goods/pai',
      data: { type: e.currentTarget.dataset.id, id: goods_id, status: types },
      method: "GET",
      success: function (res) {
        that.setData({
          list: res.data.goods
        })
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
      url: '../list/list?type=' + 1,
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
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    var types_id = e.currentTarget.dataset.id;
    var app = getApp();
    app.requesttypes_id = types_id;
    wx.navigateTo({
      url: '../shop_details/shop_details?type='+1,
    })
  },
  bannerName: function (e) {
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  },
  onPullDownRefresh: function () {
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_yanjing/index.php?s=/Little/Goods/indexs',
      data: { type: 1 },
      method: "GET",
      success: function (res) {
        wx.stopPullDownRefresh()
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
})