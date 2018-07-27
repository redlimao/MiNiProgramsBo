// pages/producet/producet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex:0,
    curFenIndex: 0,
    empty1: 0,
    empty2: 0,
    empty3: 0,
    types:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Goods/index',
      data: {},
      method: "GET",
      success: function (res) {
        that.setData({
          banner1:res.data.lun_o,
          banner2: res.data.lun_t,
          banner3: res.data.lun_h,
        })
        if (res.data.goods_o == 1) {
          that.setData({
            empty1: 1
          })
        } else {
          that.setData({
            list1: res.data.goods_o
          })
        }
        if (res.data.goods_t == 1) {
          that.setData({
            empty2: 1
          })
        } else {
          that.setData({
            list2: res.data.goods_t
          })
        }
        if (res.data.goods_h == 1) {
          that.setData({
            empty3: 1
          })
        } else {
          that.setData({
            list3: res.data.goods_h
          })
        }
      }
    })
  },
  // ===大导航
  tabFun: function (e) {
    this.setData({
      curHdIndex : e.target.dataset.id,
      curFenIndex:0
    });
  },
  // ===小分类
  tabFuns: function (e) {
    this.setData({
      curFenIndex: e.currentTarget.dataset.id
    });
    var curHdIndex = this.data.curHdIndex;
    if (e.currentTarget.dataset.type==1){
      this.setData({
        types:2
      })
    } else if (e.currentTarget.dataset.type == undefined){
      this.setData({
        types: 3
      })
    }else{
      this.setData({
        types: 1
      })
    }
    // ====排行
    var types = this.data.types;
    var that = this;
    console.log(types)
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Goods/pai',
      data: { type: e.currentTarget.dataset.id, id: curHdIndex, status: types},
      method: "GET",
      success: function (res) {
        if (curHdIndex==0){
          that.setData({
            list1: res.data.goods
          })
        } else if (curHdIndex==1){
          that.setData({
            list2: res.data.goods
          })
        }else{
          that.setData({
            list3: res.data.goods
          })
        }
      }
    })
  },
  // ===整体内容
  innerName:function(e){
    this.setData({
      curHdIndex:e.detail.current,
      curFenIndex: 0
    })
  },
   // ===商品详情跳转
  shopName:function(e){
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  },
  bannerName:function(e){
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  },
  // ====刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Goods/index',
      data: {},
      method: "GET",
      success: function (res) {
        that.setData({
          banner1: res.data.lun_o,
          banner2: res.data.lun_t,
          banner3: res.data.lun_h,
        })
        if (res.data.goods_o == 1) {
          that.setData({
            empty1: 1
          })
        } else {
          that.setData({
            list1: res.data.goods_o
          })
        }
        if (res.data.goods_t == 1) {
          that.setData({
            empty2: 1
          })
        } else {
          that.setData({
            list2: res.data.goods_t
          })
        }
        if (res.data.goods_h == 1) {
          that.setData({
            empty3: 1
          })
        } else {
          that.setData({
            list3: res.data.goods_h
          })
        }
        wx.stopPullDownRefresh()
      }
    })
  }
})