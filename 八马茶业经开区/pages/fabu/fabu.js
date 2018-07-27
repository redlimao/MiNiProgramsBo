//publishcomments.js
Page({
  data: {
    flag_icon: 1,
    star1: [{ flag: 2 }, { flag: 2 }, { flag: 2 }, { flag: 2 }, { flag: 2 }],
    star2: [{ flag: 2 }, { flag: 2 }, { flag: 2 }, { flag: 2 }, { flag: 2 }],
    star_num1: 5,
    star_num2: 5,
    orders_id: '',
    types:''
  },

  onLoad: function (options) {
    this.setData({
      orders_id: options.id,
      types: options.types
    })
  },
  //描述相符
  bindstar1: function (e) {
    var index = e.currentTarget.dataset.id;
    var star1 = this.data.star1;
    for (var i = 0; i < star1.length; i++) {
      if (index >= i) {
        star1[i].flag = 2;
      } else {
        star1[i].flag = 1;
      }
    }
    this.setData({
      star1: star1,
      star_num1: index
    })
  },
  //服务质量
  bindstar2: function (e) {
    var index = e.currentTarget.dataset.id;
    var star2 = this.data.star2;
    for (var i = 0; i < star2.length; i++) {
      if (index >= i) {
        star2[i].flag = 2;
      } else {
        star2[i].flag = 1;
      }
    }
    this.setData({
      star2: star2,
      star_num2: index
    })
    // console.log(index);
  },
  //匿名选择
  bindIcon: function () {
    var flag_icon = this.data.flag_icon;
    if (flag_icon == 1) {
      this.setData({
        flag_icon: 2
      })
    } else {
      this.setData({
        flag_icon: 1
      })
    }
  },
  //提交表单
  formSubmit: function (e) {
    // console.log(this.data.orders_id);
    var that = this;
    if (e.detail.value.area == '') {
      wx.showToast({
        title: '评价不能为空',
      })
    } else {
      wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Center/pings',
        data: { orders_id: that.data.orders_id, content: e.detail.value.area, one: that.data.star_num1, two: that.data.star_num2, status: that.data.flag_icon, types: that.data.types},
        method: "GET",
        success: function (res) {
          if (res.data == 3) {
            wx.showModal({
              title: '提示',
              content: '请填写完整的信息',
            })
          } else if (res.data == 1) {
            wx.showToast({
              title: '提交成功',
              success: function () {
                var app = getApp();
                app.request_id = 3;
               wx.navigateBack({
                 delta:1
               })
              }
            })
          } else if (res.data == 2) {
            console.log(res);
            wx.showToast({
              title: '提交失败',
            })
          }
        }
      })
    }

  }
})
