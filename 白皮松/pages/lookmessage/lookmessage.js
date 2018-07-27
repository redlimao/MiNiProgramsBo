// pages/lookmessage/lookmessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      empty:0,
      currentIndex:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      // console.log(options.scene);
      //转介认证
      if (options.scene) {
          var sence = decodeURIComponent(options.scene);
      } else {
          var sence = 0;
      }
      wx.login({
          success: function (ress) {
              if (ress.code) {
                  wx.getUserInfo({
                      success: function (res) {
                          wx.request({
                              url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/user_goods',
                              data: { code: ress.code, type: 1 },
                              method: "GET",
                              success: function (res) {
                                  console.log(res);
                                  //商品
                                  if (res.data.goods != 1) {
                                      that.setData({
                                          goods: res.data.goods
                                      })
                                  } else {
                                      that.setData({
                                          empty: 1,
                                          goods: res.data.goods,
                                      })
                                  }
                              }
                          })
                      }
                  })
              }
          }
      })
  },
  bindtags:function(e){
    var phone = e.currentTarget.dataset.phone;
    if(!!phone){
        wx.makePhoneCall({
            phoneNumber: phone,
        })
    }
  },
  bindcomplete:function(e){
      var id = e.currentTarget.id;
      var user_id = e.currentTarget.dataset.user;
      var app = getApp();
      app.requestshop_id = id;
      app.requsetId=user_id;
    //   console.log(e.currentTarget.dataset.user)
      wx.navigateTo({
          url: '../fabumessage/fabumessage',
      })
  },
  //商品详情
  shopName: function (e) {
      var shop_id = e.currentTarget.id;
      var app = getApp();
      app.requestshop_id = shop_id;
      wx.navigateTo({
          url: '../shop_details/shop_details',
      })
  },
  // 滑动菜单切换
  tabs: function (e) {
      this.setData({
          currentIndex: e.target.dataset.id
      });
      var that = this;
      wx.login({
        success:function(ress){
            if(ress.code){
                wx.request({
                    url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/user_goods',
                    data: { code: ress.code,type: e.target.dataset.id },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        if (res.data.goods != 1) {
                            that.setData({
                                empty:0,
                                goods: res.data.goods,
                            })
                        } else {
                            that.setData({
                                empty: 1,
                                goods: res.data.goods,
                            })
                        }
                    }
                })
            }
        } 
      })        

  }

})