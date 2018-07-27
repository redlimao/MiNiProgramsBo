// pages/xun/xun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "请选择日期",
    time:'请选择时间',
    arr:['请选择性别','男','女'],
    arr_index:0
  },
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/yue',
      data: {},
      method: "GET",
      success: function (res) {
        wx.hideLoading();
        that.setData({
          img:res.data.img,
          y_time:res.data.ti.y_time
        })
      }
    })
  },
  // =====返回上一季
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },  
  // =====到访时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  // ====性别
  arrChange:function(e){
    this.setData({
      arr_index: e.detail.value
    })
  },
  // =====提交表单
  formSubmit: function (e) {
    wx.showLoading({
      title: '提交中',
    })
    var date=this.data.date;
    var time=this.data.time; 
    var arr_index=this.data.arr_index;
    var that = this;
    if (e.detail.value.username==''){
      wx.showModal({
        title: '请输入姓名',
      })
    } else if (e.detail.value.tel == '') {
      wx.showModal({
        title: '请输入电话',
      })
    } else if (arr_index == 0) {
      wx.showModal({
        title: '请选择性别',
      })
    } else if (date == '请选择日期') {
      wx.showModal({
        title: '请选择日期',
      })
    } else if (time == '请选择时间') {
      wx.showModal({
        title: '请选择时间',
      })
    } else{
      wx.showModal({
        title: '请确认信息，提交后将无法修改',
        success:function(res){
          if(res.confirm){
            wx.login({
              success: function (ress) {
                if (ress.code) {
                  wx.request({
                    url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/yue_add',
                    data: { code: ress.code, name: e.detail.value.username, phone: e.detail.value.tel, date_one: date, date_two: time, sex: arr_index },
                    method: "GET",
                    success: function (res) {
                      wx.hideLoading()
                      if (res.data.info == 3) {
                        wx.showModal({
                          title: '提交成功',
                          success: function (res) {
                            if (res.confirm) {
                              wx.navigateBack({
                                delta: 1
                              })
                            }
                          }
                        })
                      } else if (res.data.info == 4) {
                        wx.showModal({
                          title: '提交失败',
                        })
                      } else if (res.data.info == 1) {
                        wx.showModal({
                          title: '请填写正确的电话',
                        })
                      } else if (res.data.info == 2) {
                        wx.showModal({
                          title: '请填写正确的姓名',
                        })
                      } else if (res.data.info == 5) {
                        wx.showModal({
                          title: res.data.yue,
                          success: function (res) {
                            if (res.confirm) {
                              wx.navigateBack({
                                delta: 1
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
          }
        }
      })
    }
  }
})