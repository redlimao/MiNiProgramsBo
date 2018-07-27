// pages/message/message.js
Page({
  data:{
    array: ['请选择性别','男', '女',],
    indexs:0,
    phone:"",
    date: '请选择您的生日'
  },
  onLoad:function(){
     var that=this
     wx.login({
       success: function (ress) {
         if (ress.code) {
           wx.request({
             url: 'https://www.bozhiyingxiao.com/little_program/store_yanjing/index.php?s=/Little/Center/huan',
             data: {code: ress.code },
             method: 'GET',
             success: function (res) {
               if(res.data.info !=1){
                 that.setData({
                   name: res.data.info.name,
                   phone: res.data.info.phone,
                   indexs: res.data.info.sex,
                   address: res.data.info.address,
                   date: res.data.info.birthday
                 })
               }
             }
           })
         }
       }
     })
  },
  areaNames: function (e) {
    this.setData({
      indexs: e.detail.value
    })
  },
  bindDateChange: function (e) { 
    this.setData({
      date: e.detail.value
    })
  },
  getPhoneNumber: function (e) {
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_yanjing/index.php?s=/Little/Phone/index',
            data: { code: ress.code, iv: e.detail.iv, data: e.detail.encryptedData},
            method: "GET",
            success: function (res) {
              that.setData({
                phone: res.data
              }) 
            }
          })
        }
      }
    })  
  } ,
  formSubmit:function(e){
    var tels = e.detail.value.phone
    var indexs=this.data.indexs;
    var birthday=this.data.date;
    if (e.detail.value.username==""){
      wx.showModal({
        title: '请填写您的真实姓名'
      })
    } else if (e.detail.value.phone ==""){
      wx.showModal({
        title: '请填写您的联系电话'
      })
    } else if (e.detail.value.add == "") {
      wx.showModal({
        title: '请填写您的地址'
      })
    } else if (indexs ==0) {
      wx.showModal({
        title: '请选择性别'
      })
    } else if (birthday == "请选择您的生日") {
      wx.showModal({
        title: '请选择您的生日'
      })
    } else{
      wx.login({
        success:function(ress){
          if(ress.code){
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_yanjing/index.php?s=/Little/Center/ti',
              data: { name: e.detail.value.username, phone: e.detail.value.phone, sex: indexs, code: ress.code, address: e.detail.value.add, birthday: birthday},
              method: 'GET',
              success: function (res) {
                if (res.data == 2) {
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
                    title: '请填写正确信息',
                    icon: 'success',
                    duration: 1000
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