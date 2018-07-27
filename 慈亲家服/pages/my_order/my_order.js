// pages/my_order/my_order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex: 0,
    empty:0,
    id:"",
  },
  onLoad: function (options) {
    var that=this;
    var types = options.types;
    this.setData({
      types:types
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/orders',
            data: { code: ress.code, type: options.id},
            method:"GET",
            success:function(res){
              if(res.data.info==1){
                that.setData({
                  empty:1
                })
              }else{
                that.setData({
                  empty: 0,
                  list:res.data.info
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
    var id=parseInt(e.target.dataset.id)+1;
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/orders',
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
  //====评价
  pingName:function(e){
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
  queName:function(e){
    var that=this;
    wx.showModal({
      title: '是否确认收货？',
      success:function(ress){
        if(ress.confirm){
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/que',
            data: { id: e.currentTarget.id},
            method:"GET",
            success:function(res){
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else if(res.data.info==2){
                wx.showModal({
                  title: '确认收货失败',
                })
              }else{
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
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  }
})