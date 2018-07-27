// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
    data: {
        currentIndex:1,
        tan: 1,
        juan: 0, 
        coupons: 2 ,
        empty :2,
        sendId:'',
        tabType:'',
        flag:0,
        searchtxt:'',
        ggSlide:''
    },

    onLoad:function(options){
        var that = this;
        if (options.scene) {
          var sence = decodeURIComponent(options.scene)
        } else {
          var sence = 0;
        }
        wx.showLoading({
          title: '加载中',
        })
        wx.login({
          success: function (ress) {
            if (ress.code) {
              wx.getUserInfo({
                success: function(res){
                  var userInfo = res.userInfo
                  var nickName = userInfo.nickName
                  var avatarUrl = userInfo.avatarUrl
                  var gender = userInfo.gender //性别 0：未知、1：男、2：女
                  var province = userInfo.province
                  var city = userInfo.city
                  var country = userInfo.country
                  wx.request({
                    url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Goods/info',
                    data: {type: that.data.currentIndex, code: ress.code, img: avatarUrl, name: nickName, city: city, pro: province, cou: country,sence: sence},
                    method: 'GET',
                    success: function (res) {
                      console.log(res)
                      that.setData({
                        items: res.data.res,
                        ggSlide: res.data.id
                      })
                      // 优惠券显示的控制
                      if (res.data.coupons == 1) {
                        that.setData({
                          juan: 1
                        })
                      } else {
                        that.setData({
                          juan: 0,
                          counts: res.data.counts,
                          zong: res.data.zong,
                          juan_list: res.data.coupons
                        })
                      }
                      if (res.data.list != 1) {
                        that.setData({
                          list: res.data.list,
                          ggSlide: res.data.id,
                          empty: 2
                        })
                      } else {
                        that.setData({
                          empty: 1
                        })
                      }
                    },
                    complete: function () {
                      wx.hideLoading()
                    }
                 })  
                }

          
              })
              
            }
          }
        }) 
    },
    //侧边栏切换
    bindTap:function(e){
        var that = this;
        console.log(e.target.dataset.id);
        this.setData({
            currentIndex:e.target.dataset.index,
            tabType: e.target.dataset.id,
            flag:1
        })
        
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Goods/info',
            data: { type: e.target.dataset.id},
            method: 'GET',
            success: function (res) {
                console.log(res)
                if (res.data.list != 1) {
                    that.setData({
                        list: res.data.list,
                        empty: 2,                        
                    })
                } else {
                    that.setData({
                        empty: 1
                    })
                }

            },
            fail: function (res) { },
            complete: function (res) { },
        })
    },
    //获取搜索输入的内容
    search: function (event) {
      var search_txt = event.detail.value;
        console.log(event)
        var that = this;
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
    //跳转到详情页面
    bindDetail:function(e){
        var items_id = e.currentTarget.dataset.itemsid;
        wx.navigateTo({
            url: '../shop/shop?itemsid=' + items_id ,
        })
    },
    // ======领取优惠卷
    lingName: function () {
        var that = this;
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Goods/coupons',
                        data: { code: ress.code },
                        method: "GET",
                        success: function (res) {
                            console.log(res);
                            if (res.data == 1) {
                                wx.showToast({
                                    title: '已经领取过了',
                                    success:function(){
                                        var money_id = 0;
                                        var app = getApp();
                                        app.requestmoney_id = money_id;
                                        wx.navigateTo({
                                            url: '../quan/quan',
                                        })
                                    }
                                })
                            }
                            else if (res.data == 2) {
                                that.setData({
                                    tan: 0
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
    // =====关闭优惠卷领取
    closeJuan: function () {
        this.setData({
            juan: 1
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
    // bannerName: function(e){
    //   var id = e.currentTarget.dataset.id;
    //   console.log(e.currentTarget.dataset.id);
    //   wx.navigateTo({
    //     url: '../shop/shop?type=1&id=' + id
    //   })
    // },

    bannerName: function (e) {
      var shop_id = e.currentTarget.dataset.id;
      var app = getApp();
      app.requestshop_id = shop_id;
      var shop_id = e.currentTarget.dataset.id;
      var app = getApp();
      app.requestshop_id = shop_id;
      var types_id = e.currentTarget.dataset.index;
      var app = getApp();
      app.requesttypes_id = types_id;
      wx.navigateTo({
        url: '../shop_details/shop_details?type=' + 1,
      })
    },
    onPullDownRefresh: function () {
      var that = this;
      console.log(that.data.tabType);
      if(that.data.flag){
        console.log(that.data.tabType);
      }else{
        that.setData({
          tabType: that.data.currentIndex 
        })
      }    
      console.log(that.data.tabType);  
        wx.request({
          url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Goods/info',
          data: { type: that.data.tabType },
            method: 'GET',
            success: function (res) {
                console.log(res);
                that.setData({
                    items: res.data.res,
                })
                if (res.data.coupons == 1) {
                    that.setData({
                        juan: 1
                    })
                } else {
                    that.setData({
                        juan: 0,
                        counts: res.data.counts,
                        zong: res.data.zong,
                        juan_list: res.data.coupons
                    })
                }
                if (res.data.list != 1) {
                    that.setData({
                        list: res.data.list,
                        empty: 2
                    })
                } else {
                    that.setData({
                        empty: 1
                    })
                }

            },
            complete: function (res) {
                wx.stopPullDownRefresh();
             }
        })
    },
    // ========分享
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮

        }
        return {
            title: '陕西美天包装',
            path: '/pages/gong/gong',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})