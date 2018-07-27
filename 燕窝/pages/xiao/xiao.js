// pages/my_points/my_points.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    date: '2017',
    empty: 0,
    id: ""
  },
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.mozhifang.cn/csj/index.php?s=/Little/Center/fen',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
              if (res.data.info.status != 2) {
                wx.showModal({
                  title: '您的店铺还没有通过认证',
                  content: '',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                })
              } else {
                that.setData({
                  logo: res.data.info.logo,
                  name: res.data.info.store_name,
                  date: res.data.year,
                  all_money: res.data.money,
                  list: res.data.list,
                  id: res.data.info.id
                })
              }
            }
          })
        }
      }
    })
  },
  tabFun: function (e) {
    //获取触发事件组件的dataset属性 
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  },
  // =========日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    var id = this.data.id;
    var that = this;
    wx.request({
      url: 'https://www.mozhifang.cn/csj/index.php?s=/Little/Center/fen',
      data: { year: e.detail.value, store_id: id },
      method: "GET",
      success: function (res) {
        that.setData({
          all_money: res.data.money,
          list: res.data.list
        })
      }
    })
  },
  // =====积分协议
  fenName: function () {
    var points_id = 1;
    var app = getApp();
    app.requestpoints_id = points_id;
    wx.navigateTo({
      url: '../rule/rule',
    })
  }
})