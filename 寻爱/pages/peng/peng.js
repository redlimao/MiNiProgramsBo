// pages/peng/peng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 1,
    n: 1,
    more: 0,
  },
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/collect',
            data:{code:ress.code,type:1},
            method:"GET",
            success:function(res){
              wx.hideLoading()
                that.setData({
                  list:res.data.info
                })
            }
          })
        }
      }
    })
  },
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // =====tab切换
  tabFun: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.id
    })
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/collect',
            data: { code: ress.code, type: e.currentTarget.dataset.id },
            method: "GET",
            success: function (res) {
              that.setData({
                list: res.data.info,
                more: 0,
                n: 1
              })
            }
          })
        }
      }
    })
  },
  // =====详情查看
  detailsName: function (e) {
    wx.navigateTo({
      url: '../ziliao/ziliao?id=' + e.currentTarget.id,
    })
  },
  //=============下拉加载
  onReachBottom: function () {
    var n = this.data.n;
    var that = this;
    var type = this.data.currentIndex;
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
      wx.login({
        success:function(ress){
          if(ress.code){
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/la',
              data: { code:ress.code,currpage: n, type: type },
              method: "GET",
              success: function (res) {
                wx.hideLoading()
                if (res.data.info == 1) {
                  that.setData({
                    more: 1
                  })
                } else {
                  for (var i = 0; i < res.data.info.length; i++) {
                    list.push(res.data.info[i])
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
    }
  }
})