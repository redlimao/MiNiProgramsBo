// pages/producet/producet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex: 0,
    curHdIndexs:0,
    curFenIndex:0,
    empty: 0,
    types: 2,
    goods_id:"",
    er:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Goods/index',
      data: {},
      method: "GET",
      success: function (res) {
        if (res.data.type.length > 3) {
          that.setData({
            width: 30 * res.data.type.length
          })
        } else {
          that.setData({
            width: 100
          })
        }
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
      goods_id: e.target.dataset.ids,
      views: e.target.dataset.id*60
    });
    if (e.target.dataset.id!=0){
      this.setData({
        er: 0
      })
    }else{
      this.setData({
        er: 1,
        curHdIndexs: 0
      })
    }
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Goods/index',
      data: { id: e.target.dataset.ids},
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
  // ====二级导航
  tabFuns:function(e){
    this.setData({
      curHdIndexs: e.target.dataset.id
    });
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Goods/index',
      data: { card: e.target.dataset.id},
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
  // ===商品详情跳转
  shopName: function (e) {
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  },
  bannerName: function (e) {
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  }
})