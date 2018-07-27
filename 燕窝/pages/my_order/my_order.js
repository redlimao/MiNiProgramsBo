// pages/my_order/my_order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex: 0,
    empty: 0,
    id: ""
  },
  onLoad: function (options) {
    var that = this;
    var types = options.types;
    this.setData({
      types: types
    })
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Center/orders',
            data: { code: ress.code, type: options.id },
            method: "GET",
            success: function (res) {
              console.log(res);
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  empty: 0,
                  list: res.data.info
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
    var id = parseInt(e.target.dataset.id) + 1;
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Center/orders',
            data: { code: ress.code, type: id },
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  empty: 0,
                  list: res.data.info
                })
              }
            }
          })
        }
      }
    })
  },
  // ====提醒发货
  tiName: function (e) {
    wx.showModal({
      title: '我们会尽快安排给您发货',
    })
  },
  //====评价
  pingName: function (e) {
    var pings_id = e.currentTarget.id;
    var app = getApp();
    app.requestpings_id = pings_id;
    var pings_type = 2;
    var app = getApp();
    app.requestpings_type = pings_type;
    wx.navigateTo({
      url: '../fabu/fabu',
    })
  },
  //====确认收获
  queName: function (e) {
    var that = this;
    wx.showModal({
      title: '是否确认收货？',
      success: function (ress) {
        if (ress.confirm) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Center/que',
            data: { id: e.currentTarget.id },
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else if (res.data.info == 2) {
                wx.showModal({
                  title: '确认收货失败',
                })
              } else {
                that.setData({
                  empty: 0,
                  list: res.data.info
                })
              }
            }
          })
        }
      }
    })
  },
  // ===商品删除
  delName: function (e) {
    var id = e.currentTarget.id;
    var types = e.currentTarget.dataset.id;
    var that = this;
    wx.showModal({
      title: '确认删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Center/orders_del',
            data: { id: id, type: types },
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  empty: 0,
                  list: res.data.info
                })
              }
            }
          })
        }
      }
    })
  },
  // ===商品详情跳转
  shopName: function (e) {
    var moneys = e.currentTarget.dataset.ids
    var store = e.currentTarget.dataset.store
    var orders_id = e.currentTarget.dataset.id
    var goods_id = e.currentTarget.id
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.chooseAddress({
            success: function (resss) {
              var address = resss.provinceName + resss.cityName + resss.countyName + resss.detailInfo
              wx.request({
                url: 'https://www.bozhiyingxiao.com/store_yanwo/pay/example/jsapi.php',
                data: { code: ress.code, total_fee: moneys, title: store },
                method: 'GET',
                success: function (res) {
                  wx.requestPayment({
                    'timeStamp': res.data.pay.timeStamp,
                    'nonceStr': res.data.pay.nonceStr,
                    'package': res.data.pay.package,
                    'signType': 'MD5',
                    'paySign': res.data.pay.paySign,
                    'success': function (ress) {
                      wx.showToast({
                        title: '支付成功',
                        success: function () {

                        }
                      }),
                      wx.request({
                        url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Orders/index',
                        data: { no: res.data.no, orders_id: orders_id, id: goods_id, status: 1},
                        method: 'GET',
                        success: function (res) {
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      }
    });
  }
  
})