// pages/message/message.js
Page({
  data:{
    array: ['请选择性别','男', '女',],
    indexs:0,
    phone:"",
    date:'请选择您的生日'
  },
  onLoad:function(){
     var that=this
     wx.login({
       success: function (ress) {
         if (ress.code) {
           wx.request({
             url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/User/huan',
             data: {code: ress.code },
             method: 'GET',
             success: function (res) {
               if(res.data.info !=1){
                 that.setData({
                   name: res.data.info.name,
                   phone: res.data.info.phone,
                   date: res.data.info.birthday,
                   indexs: res.data.info.sex
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
            url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/User/phone',
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
    var date=this.data.date;

    if (e.detail.value.username==""){
      wx.showModal({
        title: '请填写您的真实姓名'
      })
    } else if (e.detail.value.phone ==""){
      wx.showModal({
        title: '请填写您的联系电话'
      })
    } else if (date == "请选择您的生日") {
      wx.showModal({
        title: '请选择您的生日'
      })
    } else if (indexs ==0) {
      wx.showModal({
        title: '请选择性别'
      })
    } else{
      wx.login({
        success:function(ress){
          if(ress.code){
            wx.request({
              url: 'https://www.bozhiyingxiao.com/store_yanwo/link.php?s=/User/ti',
              data: { name: e.detail.value.username, phone: e.detail.value.phone, birthday: date, sex: indexs,code:ress.code },
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
                if(res.data==3){
                  wx.showToast({
                    title: '没有修改信息',
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