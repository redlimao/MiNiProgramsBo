// pages/order/order.js
Page({
  data: {
    address: "",
    arr:[],
    arr_index:0,
    types_id :""
  },
  onLoad: function () {
    var that=this;
    var types_id = getApp().requesttypes_id;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Collect/gang',
      data: {  },
      method: "GET",
      success: function (res) {
        that.setData({
          arr:res.data,
          types_id: types_id 
        })
      }
    })

  },
  // ====选择地址
  chooseName: function (e) {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        that.setData({
          address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          pro: res.provinceName,
          city: res.cityName,
          area: res.countyName,
        })
      }
    })
  },
  // =====家政岗位
  arrChange: function (e) {
    this.setData({
      arr_index: e.detail.value
    })
  },
  formSubmit: function (e) {
    var index = this.data.index;
    var jia_id = getApp().requestjia_id;
    var types_id = getApp().requesttypes_id;
    var order_type = getApp().requestorder_type;
    var arr=this.data.arr;
    var arr_index=this.data.arr_index;
    var that=this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Collect/yue',
            data: { code: ress.code, name: e.detail.value.username, phone: e.detail.value.tel, address: e.detail.value.add, content: e.detail.value.bei, type: types_id, id: jia_id, status: order_type, aa: arr[arr_index]},
            method: "GET",
            success: function (res) {
              if (res.data == 2) {
                wx.showModal({
                  title: '提交成功',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta:1
                      })
                    }
                  }   
                })
              } else if (res.data == 3) {
                wx.showModal({
                  title: '提交失败',
                })
              } else if (res.data == 4) {
                wx.showModal({
                  title: '请填写正确的信息',
                })
              }else{
                wx.showModal({
                  title: '您今天已经预约过了',
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
})