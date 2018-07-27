//index.js
//获取应用实例
const app = getApp();

Page({
  currentIndex:0,
  data: {
    icon_flag: true,
    icon_flag1:false,
    grade:['级别','一级','二级',"三级"],
    high:['销量','由高到低','由低到高'],
    tree: ['树高','树苗','1米以下','1米到2米','2米到3米','3米以上'],
    grade_index:0,
    high_index: 0,
    tree_index:0,
    empty: 0,
    currentIndex : 1,
    search_txt:''
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中'
    })
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
                        var userInfo = res.userInfo
                        var nickName = userInfo.nickName
                        var avatarUrl = userInfo.avatarUrl
                        var gender = userInfo.gender //性别 0：未知、1：男、2：女
                        var province = userInfo.province
                        var city = userInfo.city
                        var country = userInfo.country
                        wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/index',
                            data: { type: 1, code: ress.code, img: avatarUrl, sex: gender, name: nickName, city: city, pro: province, cou: country, sence: sence },
                            method: "GET",
                            success: function (res) {
                                console.log(res);
                                //轮播
                                if (res.data.lun != 1) {
                                    that.setData({
                                        lun: res.data.lun,
                                    })
                                }
                                //资讯
                                if (res.data.xiao != 1) {
                                    that.setData({
                                        xiao: res.data.xiao,
                                    })
                                }
                                //商品
                                if (res.data.goods != 1) {
                                    that.setData({
                                        goods: res.data.goods,
                                    })
                                } else {
                                    that.setData({
                                        empty: 1,
                                        goods: res.data.goods,
                                    })
                                }
                            },
                            complete:function(){
                                wx.hideLoading();
                            }
                        })
                    }
                })
            }
        }
    })
  },
  //事件处理函数
  //判断搜索按钮的隐藏和显示
  bindInput:function(e){
    // console.log(e);
    this.setData({
      search_txt : e.detail.value,
      icon_flag:false,
      icon_flag1: true
    })
  },
  //获取搜索输入的内容
  search:function(e){
    var search_txt = this.data.search_txt;
    var that = this;
    console.log(search_txt);
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Sou/index',
      data: { type: 1, content: search_txt},
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
      }
    })
  },
    //头条跳转
    bindtop:function(e){
      var xiao_id = e.currentTarget.id;
      var app = getApp();
      app.requestid = xiao_id;
      wx.navigateTo({
        url: '../guang_details/guang_details',
      })
    },
    //导航样式切换
    tagChange: function (e) {
      var that = this;
      this.setData({
        currentIndex: e.target.dataset.id
      })

      wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/pai',
        data: { type: e.target.dataset.id},
        method: "GET",
        success: function (res) {

          that.setData({
            goods: res.data.goods,
          })
        }
      })
    },
    //级别
    bindshopChange: function (e) {
      this.setData({
        currentIndex: e.target.dataset.id
      });
      var that = this;
      var high_index = this.data.high_index;
      var tree_index = this.data.tree_index;
      // console.log(high_index, e.detail.value);
      wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/pai',
        data: { type: 2, ji: e.detail.value, xiao: high_index, tree: tree_index},
        method: "GET",
        success: function (res) {
          console.log(res)
          that.setData({
            goods: res.data.goods
          })
        }
      })

      console.log(e.detail.value);
    },
    //销量
    bindsalesChange: function (e) {
      this.setData({
        currentIndex: e.target.dataset.id
      });
      var that = this;
      var grade_index = this.data.grade_index;
      var tree_index = this.data.tree_index;
      // console.log(high_index, e.detail.value);
      wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/pai',
        data: { type: 3, ji: grade_index, xiao: e.detail.value, tree: tree_index},
        method: "GET",
        success: function (res) {
        //   console.log(res)
          that.setData({
            goods: res.data.goods
          })
        }
      })
    },
    //选择树木级别
    bindtreeChange:function(e){
        var that = this;
        var grade_index = this.data.grade_index;
        var high_index = this.data.high_index;
        // console.log(tree_index, e.detail.value);
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/pai',
            data: { type: 4, ji: grade_index, xiao: high_index, tree: e.detail.value},
            method: "GET",
            success: function (res) {
                //   console.log(res)
                that.setData({
                    goods: res.data.goods
                })
            }
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
    // 下拉刷新
    onPullDownRefresh: function () {
        var that = this;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/index',
            data: { type: 1},
            method: "GET",
            success: function (res) {
                // console.log(res);
                //轮播
                if (res.data.lun != 1) {
                    that.setData({
                        lun: res.data.lun,
                    })
                }
                //资讯
                if (res.data.xiao != 1) {
                    that.setData({
                        xiao: res.data.xiao,
                    })
                }
                //商品
                if (res.data.goods != 1) {
                    that.setData({
                        goods: res.data.goods,
                    })
                } else {
                    that.setData({
                        empty: 1,
                        goods: res.data.goods,
                    })
                }
            },
            complete:function(){
                wx.stopPullDownRefresh();
            }
        })
    }     
})
