// pages/producet/producet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curFenIndex:1,
    empty: 0,
    types: 2,
    goods_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
      var that = this;
      var items_id = options.itemsid;
      this.setData({
          items_id: items_id
      })
    var that = this;
    wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Goods/info_type',
        data: { id: items_id, type: that.data.curFenIndex, status:1},
      method: "GET",
      success: function (res) {
        console.log(res);
          if (res.data.pi_goods==1){
          that.setData({
            empty:1,
            list: res.data.pi_goods
          })
        }else{
          that.setData({
            empty: 0,
            list: res.data.pi_goods
          })
        }
      }
    })
  },
  // ===小分类
  tabFuns: function (e) {
    console.log(e.currentTarget);
    this.setData({
      curFenIndex: e.currentTarget.dataset.id
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
    wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Goods/info_type',
        data: { type: e.currentTarget.dataset.id, status: types, id: that.data.items_id},
        method: "GET",
        success: function (res) {
            if (res.data.pi_goods == 1) {
                that.setData({
                    empty: 1,
                    list: res.data.pi_goods
                })
            } else {
                that.setData({
                    empty: 0,
                    list: res.data.pi_goods
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
  onPullDownRefresh: function (e) {
    var that = this;
    wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Goods/info_type',
        data: { id: this.data.items_id, type: that.data.curFenIndex, status: 1 },
        method: "GET",
        success: function (res) {
            if (res.data.pi_goods == 1) {
                that.setData({
                    empty: 1,
                    list: res.data.pi_goods
                })
            } else {
                that.setData({
                    empty: 0,
                    list: res.data.pi_goods
                })
            }
        },
        complete:function(){
            wx.stopPullDownRefresh()
        }
    })
  },
  // sou suo
  //获取搜索输入的内容
  search: function (e) {
    var that = this;
    var search_txt = e.detail.value;
    if (search_txt == undefined || search_txt == null || search_txt == '') {
    } else {
      wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Sou/index',
        data: { content: search_txt },
        method: "GET",
        success: function (res) {
          console.log(res);
          //商品
          if (res.data.list != 1) {
            that.setData({
              goods: res.data.list,
            })
          } else {
            that.setData({
              empty: 1
            })
          }

          wx.navigateTo({
            url: '../list/list?searchtxt=' + search_txt,
          })
        }
      })
    }

  },
})