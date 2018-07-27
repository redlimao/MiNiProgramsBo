//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    price: ["价格","从高到低","从低到高"],
    numbers: ["销量","从高到低","从低到高"],
    price_index: 0,
    numbers_index: 0,
   
    icon_flag: true,
    currentIndex: 2,
    icon_flag: true,
    icon_flag1: false,
    search_txt: '',
    empty: 0
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/index',
      data: { type: 2 },
      method: "GET",
      success: function (res) {
        console.log(res)
        if (res.data.goods !== 1) {
          that.setData({
            lun: res.data.lun,
            list: res.data.goods
          })
        } else {
          that.setData({
            empty: 1
          })
        }
      }
    })
  },
  //判断搜索按钮的隐藏和显示
  bindInput: function (e) {
    // console.log(e);
    this.setData({
      search_txt: e.detail.value,
      icon_flag: false,
      icon_flag1: true
    })
  },
  //获取搜索输入的内容
  search: function (e) {
    var search_txt = this.data.search_txt;
    var that = this;
    console.log(search_txt);
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Sou/index',
      data: { type: 2, content: search_txt },
      method: "GET",
      success: function (res) {
        console.log(res);
        //商品
        if (res.data.list != 1) {
          that.setData({
            list: res.data.list,
          })
        } else {
          that.setData({
            empty: 1
          })
        }
      }
    })
  },
  bindDetails: function (e) {
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    wx.navigateTo({
      url: '../shop_details/shop_details'
    })
  },

  //   导航样式切换
  tagChange: function (e) {
    this.setData({
      currentIndex: e.target.dataset.id
    })
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/page_pai',
      data: { type: e.target.dataset.id },
      method: "GET",
      success: function (res) {

        that.setData({
          list: res.data.goods,
        })
      }
    })
  },
  //价格
  bindpriceChange: function (e) {
    this.setData({
      currentIndex: e.target.dataset.id
    });
    var that = this;
    // console.log(high_index, e.detail.value);
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/page_pai',
      data: { type: 3, pai: e.detail.value},
      method: "GET",
      success: function (res) {
        console.log(res)
        that.setData({
         list: res.data.goods
        })
      }
    })
  },
  //销量
  bindnumberChange: function (e) {
    this.setData({
      currentIndex: e.target.dataset.id
    });
    var that = this;
    // console.log(high_index, e.detail.value);
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/page_pai',
      data: { type: 4, pai: e.detail.value },
      method: "GET",
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data.goods
        })
      }
    })
  },
  // tabs: function (e) { 
  //   this.setData({
  //     currentIndex: e.target.dataset.id,
  //     goods_id: e.target.id
  //   });
  //   var that = this;
  //   wx.request({
  //     url:'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/index' ,
  //     data:{id:e.target.id},
  //     method:'GET',
  //     success:function(res){
  //       if(res.data.goods == 1){
  //         that.setData({
  //           banner:res.data.lun,
  //           nav:res.data.type
  //         })
  //       }else{
  //         that.setData({
  //           banner: res.data.lun,
  //           nav: res.data.type
  //         })
  //       }
  //     }
  //   })
  // },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
      var that = this;
      wx.request({
          url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/index',
          data: { type: 2 },
          method: "GET",
          success: function (res) {
              console.log(res)
              if (res.data.goods !== 1) {
                  that.setData({
                      lun: res.data.lun,
                      list: res.data.goods
                  })
              } else {
                  that.setData({
                      empty: 1
                  })
              }
              wx.stopPullDownRefresh();
          }
      })
  }     
})
