// pages/dian/dian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex: 0,
    empty:0,
    types: 2,
    val:""
  },

  onLoad: function (options) {
    var dian_id = getApp().requestdian_id;
    var that = this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Goods/stores',
      data: { id: dian_id,},
      method: "GET",
      success: function (res) {
        console.log(res)
        that.setData({
          dian:res.data.info,
        })
        if(res.data.goods==1){
          that.setData({
            empty:1
          })
        }else{
          that.setData({
            list:res.data.goods
          })
        }
      }
    })
  },
  // =====搜索内容
  inputName:function(e){
    this.setData({
      val:e.detail.value
    })
  },
  // ===小分类
  tabFun: function (e) {
    this.setData({
      curHdIndex: e.currentTarget.dataset.id
    });
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
    var dian_id = getApp().requestdian_id;
    console.log(types, dian_id, e.currentTarget.dataset.id)
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Goods/store_pai',
      data: { type: e.currentTarget.dataset.id, id: dian_id, status: types },
      method: "GET",
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data.goods
        })
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
  souName:function(){
    var val=this.data.val;
    var dian_id = getApp().requestdian_id;
    var that=this;
    console.log(val, dian_id)
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Goods/sou',
      data: { store_id: dian_id, content: val},
      method: "GET",
      success: function (res) {
        if (res.data.goods == 1) {
          that.setData({
            empty: 1
          })
        } else {
          that.setData({
            list: res.data.goods
          })
        }
      }
    })
  }
})