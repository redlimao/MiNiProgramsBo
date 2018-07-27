// pages/xun/xun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "请选择日期",
    arr: ['请选择类型'],
    arr_index: 0,
    time: '请选择时间',
    array:[]
  },
  onLoad: function (options) {
    var that = this;
    var shop_id = getApp().requestshop_id;
    var array=this.data.array;
    var arr_index=this.data.arr_index;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_mrm/index.php?s=/Little/Yuyue/index',
      data: {},
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        for (var i = 0; i < res.data.info.length;i++){
          array.push(res.data.info[i].name)
          if (shop_id == res.data.info[i].id) {
            arr_index=i
          }
        }
        that.setData({
          img: res.data.banner,
          arr: res.data.info,
          y_time: res.data.time,
          array: array,
          arr_index: arr_index
        })
      }
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
  // =====选择类型
  arrChange: function (e) {
    this.setData({
      arr_index: e.detail.value
    })
  },
  formSubmit: function (e) {
    var arr_index = this.data.arr_index;
    var arr = this.data.arr;
    var date = this.data.date;
    var time = this.data.time;
    var yue_type = arr[arr_index].id;
    var that = this;
    if (e.detail.value.username==""){
      wx.showModal({
        title: '请填写您的姓名',
      })
    } else if (e.detail.value.tel == "") {
      wx.showModal({
        title: '请填写您的电话',
      })
    } else if (date =="请选择日期") {
      wx.showModal({
        title: '请选择日期',
      })
    } else if (time == "请选择时间") {
      wx.showModal({
        title: '请选择时间',
      })
    }else{
      wx.login({
        success: function (ress) {
          if (ress.code) {
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_mrm/index.php?s=/Little/Yuyue/yue',
              data: { code: ress.code, name: e.detail.value.username, phone: e.detail.value.tel, date: date, time: time, id: yue_type },
              method: "GET",
              success: function (res) {
                if (res.data == 2) {
                  wx.showToast({
                    title: '提交成功',
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateBack({
                          delta: 1
                        })
                      }
                    }
                  })
                } else if (res.data == 3) {
                  wx.showModal({
                    title: '提交失败',
                  })
                } else if (res.data == 1) {
                  wx.showModal({
                    title: '请填写正确的姓名',
                  })
                } else if (res.data == 4) {
                  wx.showModal({
                    title: '请填写正确的电话',
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