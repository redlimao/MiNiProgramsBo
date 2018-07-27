// pages/zhu_jie/zhu_jie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex:1,
    empty: 0,
    user: "",
    list: [],
    flag:0
  },
  // =====返回上一级
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/zhuan',
            data: { code: ress.code,type:1 },
            method: "GET",
            success: function (res) {
              wx.hideLoading();
              if (res.data.info == 1) {
                that.setData({
                  empty: 1,
                  headimg: res.data.user.headimgurl,
                  nickname: res.data.user.nickname,
                })
              } else {
                that.setData({
                  list: res.data.info,
                  headimg: res.data.user.headimgurl,
                  nickname: res.data.user.nickname
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
    var that = this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/zhuan',
            data: { code:ress.code,type: e.target.dataset.id },
            method: "GET",
            success: function (res) {
              wx.hideLoading();
              if (res.data.info == 1) {
                that.setData({
                  empty: 1,
                  user: res.data.user_id,
                  headimg: res.data.user.headimgurl,
                  nickname: res.data.user.nickname,
                })
              } else {
                that.setData({
                  list: res.data.info,
                  headimg: res.data.user.headimgurl,
                  nickname: res.data.user.nickname,
                  user: res.data.user_id
                })
              }
            }
          })
        }
      }
    })  
  },
  // ===下拉显示信息
  laName:function(e){
    var flag=this.data.flag
    var list=this.data.list;
    var index=e.currentTarget.dataset.id;
    var pan = list[index].pan
    if (pan ==0){
      list[index].pan=1
      this.setData({
        list:list
      })
    }else{
      list[index].pan = 0
      this.setData({
        list:list
      })
    }
  },
  // =====转介协议
  pointsName: function () {
    wx.navigateTo({
      url: '../rule/rule?types=' + 3,
    })
  }
})