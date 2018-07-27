// pages/message/message.js
Page({
  data:{
    array: ['请选择性别','男', '女',],
    indexs:0,
    name:'',
    phone:'',
    address:'请选择详细地址'
  },
  onLoad:function(){
    var user_id = getApp().requsetId;
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/huan',
            data: { user_id: user_id },
            method: 'GET',
            success: function (ress) {
              console.log(ress);
              that.setData({
               name : ress.data.info.name,
               phone : ress.data.info.phone,
               indexs : ress.data.info.sex
              })

            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

  },
//   选择地址
  bindAddress:function(e){
    var that = this;
    wx.chooseAddress({
        success: function (res) {
            that.setData({
                address : res.cityName + res.countyName + res.detailInfo
            })
        }
    })        
  },
  areaNames: function (e) {
    this.setData({
      indexs: e.detail.value
    })
  },
  formSubmit:function(e){
    var user_id = getApp().requsetId;
    var indexs = this.data.indexs;
    var address = this.data.address;
    if (e.detail.value.username==""){
      wx.showModal({
        title: '请填写您的真实姓名'
      })
    } else if (e.detail.value.phone ==""){
      wx.showModal({
        title: '请填写您的联系电话'
      })
    } else if (e.detail.value.sex == "") {
      wx.showModal({
        title: '请选择您的性别'
      })
    } else if (e.detail.value.address == "") {
        wx.showModal({
            title: '请选择详细地址'
        })
    }else{
      wx.login({
        success:function(ress){
          if(ress.code){
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/ti',
              data: { name: e.detail.value.username, phone: e.detail.value.phone, sex: indexs, user_id: user_id, address: address},
              method: 'GET',
              success: function (res) {
                console.log(res)
                if (res.data == 3) {
                  wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    success:function(){
                      wx.navigateBack({
                        delta:1
                      })
                    }
                  })
                }
                if (res.data == 1) {
                  wx.showToast({
                    title: '请填写规范的姓名',
                    icon: 'fail',
                    duration: 1000
                  })
                }
                if (res.data == 2) {
                  wx.showToast({
                    title: '请填写正确的电话号码',
                    icon: 'fail',
                    duration: 1000
                  })
                }
                if (res.data == 4) {
                  wx.showToast({
                    title: '提交失败',
                    icon: 'fail'
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