// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2017-08-13',
  },
  onLoad: function (options) {
  
  },
  areaNames: function (e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // =====报名
  formSubmit:function(e){
    var school_id = getApp().requestschool_id;
    var date=this.data.date;
    console.log(date)
    if (e.detail.value.username==""){
      wx.showModal({
        title: '请填写姓名',
      })
    } else if (e.detail.value.phone == ""){
      wx.showModal({
        title: '请填写电话',
      })
    } else if (e.detail.value.age == "") {
      wx.showModal({
        title: '请填写宝宝年龄',
      })
    } else if (e.detail.value.area == "") {
      wx.showModal({
        title: '请填写所在社区',
      })
    }else{
      wx.login({
        success: function (ress) {
          if (ress) {
            wx.getUserInfo({
              success: function (res) {
                wx.request({
                    url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Yue/yue',
                  data: {
                    code: ress.code, name: e.detail.value.username, phone: e.detail.value.phone, d_at: date,
                    speak: e.detail.value.textarea, school_id: school_id, age: e.detail.value.age, location: e.detail.value.area
                  },
                  method: "GET",
                  success: function (res) {
                    if(res.data==1){
                      wx.showModal({
                        title: '请核对您填写的信息',
                      })
                    }else if(res.data==2){
                      wx.showModal({
                        title: '预约成功',
                        success:function(res){
                          wx.navigateTo({
                            url: '../info/info',
                          })
                        }
                      })
                    }else if(res.data==3){
                      wx.showModal({
                        title: '请重新提交',
                      })
                    }
                  }
                })
              }
            })
          }
        }
      })
    }
  }
})