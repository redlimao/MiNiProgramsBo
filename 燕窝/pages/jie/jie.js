// pages/zhu_jie/zhu_jie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex: 0,
    empty: 0,
    user: "",
    list: [],
    flag:0,
    date:'2017-8'
  },
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Center/zhuan',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
              console.log(res);
              if (res.data.info == 1) {
                that.setData({
                  empty: 1,
                  user: res.data.user_id,
                  headimg: res.data.user.headimgurl,
                  nickname: res.data.user.nickname,
                  all_money: res.data.moneys
                })
              } else {
                that.setData({
                  list: res.data.info,
                  headimg: res.data.user.headimgurl,
                  nickname: res.data.user.nickname,
                  all_money:res.data.moneys,
                  user: res.data.user_id
                })
              }
            }
          })
        }
      }
    })
  },
  dianName:function(){
    var user = this.data.user;
    var that = this;
    wx.request({
      url: 'https://www.mozhifang.cn/store_kangmei/index.php?s=/Little/Center/qie',
      data: { type: 1, user_id: user },
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
  // ===选择日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/Center/zhuan',
            data: { code: ress.code, day: e.detail.value},
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1,
                  user: res.data.user_id,
                  headimg: res.data.user.headimgurl,
                  nickname: res.data.user.nickname,
                  all_money: res.data.moneys
                })
              } else {
                that.setData({
                  empty: 0,
                  list: res.data.info,
                  headimg: res.data.user.headimgurl,
                  nickname: res.data.user.nickname,
                  all_money: res.data.moneys,
                  user: res.data.user_id
                })
              }
            }
          })
        }
      }
    })
  },
  Name: function (e) {
    var user = this.data.user;
    var that = this;
    wx.request({
      url: 'https://www.mozhifang.cn/store_kangmei/index.php?s=/Little/Center/qie',
      data: { type: 3, user_id: user },
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
  //===删除
  delName: function (e) {
    var user = this.data.user;
    var that = this;
    var types = this.data.curHdIndex;
    wx.request({
      url: 'https://www.mozhifang.cn/store_kangmei/index.php?s=/Little/Center/zhuan_del',
      data: { id: e.currentTarget.id, user_id: user, type: types },
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
  //===长按删除
  anName:function(e){
    wx.showModal({
      title: '确认删除',
      success:function(res){
        if(res.confirm){
          var user = this.data.user;
          var that = this;
          var types = this.data.curHdIndex;
          wx.request({
            url: 'https://www.mozhifang.cn/store_kangmei/index.php?s=/Little/Center/zhuan_del',
            data: { id: e.currentTarget.id, user_id: user, type: types },
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