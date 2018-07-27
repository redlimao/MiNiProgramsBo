// pages/shop/shop.js
Page({
  data: {
    empty: 0,
    curHdIndex:0,
    juan: 0,
    n: 1,
    more: 0,
    ids:"0"
  },

  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Goods/index',
      data: { type:"0"},
      method:"GET",
      success:function(res){
        console.log(res)
        wx.hideLoading();
        if (res.data.coupons == 1) {
          that.setData({
            juan: 1
          })
        } else {
          that.setData({
            juan: 0,
            counts: res.data.counts,
            zong: res.data.zong,
            juan_list: res.data.coupons,
            banner:res.data.lun
          })
        }
        if (res.data.goods == 1) {
          that.setData({
            empty:1,
            nav: res.data.type,
            banner: res.data.lun
          })
        }else{
          that.setData({
            empty: 0,
            list: res.data.goods,
            nav: res.data.type,
            banner: res.data.lun
          })
        }
      }
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
  // ===大导航
  tabFun: function (e) {
    this.setData({
      curHdIndex: e.target.dataset.id,
      ids: e.target.id
    });
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Goods/index',
      data: { type: e.target.id},
      method: "GET",
      success: function (res) {
        if (res.data.goods == 1) {
          that.setData({
            empty: 1,
            nav: res.data.type
          })
        } else {
          that.setData({
            empty: 0,
            list: res.data.goods,
            nav: res.data.type,
            more: 0,
            n: 1
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
  // ======领取优惠卷
  lingName: function () {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love//index.php?s=/Little/Goods/coupons',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
              console.log(res)
              if (res.data == 1) {
                wx.showToast({
                  title: '已经领取过了',
                })
              }
              else if (res.data == 2) {
                that.setData({
                  tan: 0
                })
              } else if (res.data == 2) {
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
  closeLing: function () {
    this.setData({
      tan: 1
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
  // ======刷新
  onPullDownRefresh:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    var type = this.data.ids;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Goods/index',
      data: { type: type },
      method: "GET",
      success: function (res) {
        wx.hideLoading();
       
        if (res.data.goods == 1) {
          that.setData({
            empty: 1,
            nav: res.data.type
          })
        } else {
          that.setData({
            empty: 0,
            list: res.data.goods,
            nav: res.data.type
          })
        }
      },
      complete:function(){
        wx.stopPullDownRefresh()
      }
    })
  },
  //=============下拉加载
  onReachBottom: function () {
    var n = this.data.n;
    var that = this;
    var type = this.data.ids;
    var list = this.data.list;
    var more = this.data.more;
    n++;
    this.setData({
      n: n
    })
    // ==========获取列表信息
    if (more != 1) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Goods/la',
        data: { currpage: n, type: type },
        method: "GET",
        success: function (res) {
          wx.hideLoading()
          if (res.data.goods == 1) {
            that.setData({
              more: 1
            })
          } else {
            for (var i = 0; i < res.data.goods.length; i++) {
              list.push(res.data.goods[i])
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