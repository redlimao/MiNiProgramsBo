// pages/my_xu/my_xu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    empty:0,
    user:"",
    curHdIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/xu',
            data: { code: ress.code,type:2},
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  list: res.data.info,
                  empty: 0,
                  user:res.data.info[0].user_id
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
  delName:function(e){
    var user=this.data.user;
    var that=this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/xu_del',
      data: { id: e.currentTarget.id ,user_id:user},
      method: "GET",
      success: function (res) {
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else if (res.data.info == 2){
          wx.showModal({
            title: '删除失败'
          })
        }else{
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
  // =========审核中
  shenName:function(){
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/xu',
            data: { code: ress.code, type: 1 },
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  list: res.data.info,
                  empty: 0,
                  user: res.data.info[0].user_id
                })
              }
            }
          })
        }
      }
    }) 
  },
  // =========已发布
  faName: function () {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/xu',
            data: { code: ress.code, type: 2 },
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  list: res.data.info,
                  empty: 0,
                  user: res.data.info[0].user_id
                })
              }
            }
          })
        }
      }
    })
  },
  // =========详情
  xuName:function(e){
    var gu_id = e.currentTarget.id;
    var app = getApp();
    app.requestgu_id = gu_id; 
    if (e.currentTarget.dataset.he==2){
      var gu_types = 1;
    }else{
      var gu_types = 2;
    }
    var app = getApp();
    app.requestgu_types = gu_types;
    wx.navigateTo({
      url: '../gu_details/gu_details',
    })
  }
})