// pages/zhu_jie/zhu_jie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex: 0,
    empty:0,
    user:"",
    list:[]
  },
  onLoad: function (options) {
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/zhuan',
            data: { code:ress.code },
            method: "GET",
            success: function (res) {
                if(res.data.info==1){
                  that.setData({
                    empty:1,
                    user: res.data.user_id,
                    headimg: res.data.user.headimgurl,
                    nickname: res.data.user.nickname,
                  })
                }else{
                  that.setData({
                    list:res.data.info,
                    headimg:res.data.user.headimgurl,
                    nickname:res.data.user.nickname,
                    user:res.data.user_id
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
  wanName:function(e){
    var user=this.data.user;
    var that=this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/qie',
      data: { type:1,user_id:user },
      method: "GET",
      success: function (res) {
        if (res.data.info == 1) {
          that.setData({
            empty: 1,
            user: res.data.user_id
          })
        } else {
          that.setData({
            empty: 0,
            list: res.data.info,
            user: res.data.user_id
          })
        }
      }
    }) 
  },
  weiName:function(e){
    var user = this.data.user;
    var that = this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/qie',
      data: { type: 2, user_id: user},
      method: "GET",
      success: function (res) {
        if (res.data.info == 1) {
          that.setData({
            empty: 1,
            user: res.data.user_id
          })
        } else {
          that.setData({
            empty:0,
            list: res.data.info,
            user: res.data.user_id
          })
        }
      }
    }) 
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
      list[index].pan = 0
      this.setData({
        list: list
      })
    }
    if (startPoint[0] <= curPoint[0]) {
      list[index].pan = 1
      this.setData({
        list: list
      })
    }
  },
  delName:function(e){
    var user = this.data.user;
    var that = this;
    var types = this.data.curHdIndex;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/zhuan_del',
      data: { id: e.currentTarget.id, user_id: user,type:types },
      method: "GET",
      success: function (res) {
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else if (res.data == 2) {
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
  // =====转介协议
  pointsName: function () {
    var points_id = 3;
    var app = getApp();
    app.requestpoints_id = points_id;
    wx.navigateTo({
      url: '../rule/rule',
    })
  }
})