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
    empty:0,
    user:""
  },
  onLoad: function (options) {
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Center/covers',
            data: { code:ress.code },
            method: "GET",
            success: function (res) {
              that.setData({
                name:res.data.info.nickname,
                img:res.data.info.headimgurl,
                user:res.data.info.id,
                point:res.data.info.covers
              })
              if(res.data.list==1){
                that.setData({
                  empty:1
                })
              }else{
                that.setData({
                  empty: 0,
                  list:res.data.list
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
    var user=this.data.user;
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    var that=this;
    this.setData({
      tabArr: _obj
    });
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Center/zhi_shou',
      data: { id: user, type: e.target.id },
      method: "GET",
      success: function (res) {
        if (res.data.list == 1) {
          that.setData({
            empty: 1
          })
        } else {
          that.setData({
            empty: 0,
            list: res.data.list
          })
        }
      }
    }) 
  },
  // =====积分协议
  pointsName:function(){
    var points_id = 2;
    var app = getApp();
    app.requestpoints_id = points_id; 
    wx.navigateTo({
      url: '../rule/rule',
    })
  }
})