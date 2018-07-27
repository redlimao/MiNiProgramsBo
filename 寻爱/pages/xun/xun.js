// pages/xun/xun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:1,
    n: 1,
    more: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that=this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index',
      data:{sex:2},
      method:"GET",
      success:function(res){
        that.setData({
          list:res.data.info,
          currentIndex: 1
        })
      }
    })
  },
  // =====tab切换
  tabFun:function(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.id
    })
    var sex = e.currentTarget.dataset.id;
    if(sex==1){
      sex = 2
    }else{
      sex = 1
    }
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index',
      data: { sex: sex },
      method: "GET",
      success: function (res) {
        that.setData({
          list: res.data.info,
          more:0,
          n: 1
        })
      }
    })
  },
  // =====详情查看
  detailsName:function(e){
    wx.navigateTo({
      url: '../ziliao/ziliao?id='+e.currentTarget.id,
    })
  },
  // ======刷新
  onPullDownRefresh:function(){
    var that = this;
    var currentIndex = this.data.currentIndex;
    var sex = this.data.currentIndex;
    if (sex == 1) {
      sex = 2
    } else {
      sex = 1
    }
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index',
      data: { sex: sex  },
      method: "GET",
      success: function (res) {
        wx.stopPullDownRefresh()
        that.setData({
          list: res.data.info,
          currentIndex: currentIndex
        })
      }
    })
  },
  //=============下拉加载
  onReachBottom: function () {
    var n = this.data.n;
    var that = this;
    var sex = this.data.currentIndex;
    if (sex == 1) {
      sex = 2
    } else {
      sex = 1
    }
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
        url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/la',
        data: { currpage: n, sex: sex },
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