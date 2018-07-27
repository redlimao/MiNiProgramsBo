 // pages/jia_gu/jia_gu.js
Page({

  data: {
    curHdIndex: 0,
    empty:0,
    list:[],
    user:""
  },

  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/me_gu',
            data: {code: ress.code },
            method: "GET",
            success: function (res) {
              if(res.data.info==1){
                that.setData({
                  empty:1,
                  user:res.data.user_id
                })
              }else{
                that.setData({
                  empty: 0,
                  list:res.data.info,
                  user: res.data.user_id
                })
              }
            }
          })
        }
      }
    })
  },
  wanName: function () {
    var user = this.data.user;
    var that = this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/me_qie',
      data: { user_id: user, type: 1 },
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
  },
  yuName: function () {
    var user = this.data.user;
    var that = this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/me_qie',
      data: { user_id: user, type: 2 },
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
  },
  // ===大导航
  tabFun: function (e) {
    this.setData({
      curHdIndex: e.target.dataset.id
    });
  },
  // ========手指移动事件
  mytouchstart: function (e) {
    this.setData({ startPoint: [e.touches[0].pageX, e.touches[0].pageY] })
  },
  mytouchmove: function (e) {
    var curPoint = [e.touches[0].pageX, e.touches[0].pageY];
    var startPoint = this.data.startPoint;
    var list = this.data.list;
    var index = e.currentTarget.dataset.id;
    if (startPoint[0] >= curPoint[0]) {
      list[index].pan=0
      this.setData({
        list:list
      })
    }
    if (startPoint[0] <= curPoint[0]) {
      list[index].pan = 1
      this.setData({
        list: list
      })
    }
  },
  // =============删除
  delName: function (e) {
    var user = this.data.user;
    var that = this;
    var types = this.data.curHdIndex;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/gu_del',
      data: { id: e.currentTarget.id, user_id: user ,type:types},
      method: "GET",
      success: function (res) {
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else if (res.data.info == 2) {
          wx.showModal({
            title: '删除失败'
          })
        } else {
          wx.showToast({
            title: '删除成功',
            success: function (ress) {
              that.setData({
                list: res.data.info,
                empty: 0
              })
            }
          })
        }
      }
    })
  },
  // =============详情
  guName: function (e) {
    var gu_id = e.currentTarget.id;
    var app = getApp();
    app.requestgu_id = gu_id;
    var gu_types = 1;
    var app = getApp();
    app.requestgu_types = gu_types;
    wx.navigateTo({
      url: '../gu_details/gu_details',
    })
  }
})