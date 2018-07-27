// pages/message/message.js
Page({
  data:{
    array: ['请选择性别','男', '女',],
    indexs:0,
    phone:"",
    date: '请选择您的生日',
    flag_pass:2
  },
  onLoad:function(){
     var that=this
     wx.login({
       success: function (ress) {
         if (ress.code) {
           wx.request({
             url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Center/huan',
             data: {code: ress.code },
             method: 'GET',
             success: function (res) {
                 console.log(res);
               if(res.data.info !=1){
                 that.setData({
                   name: res.data.info.name,
                   phone: res.data.info.phone,
                   indexs: res.data.info.sex,
                   date: res.data.info.birthday,
                   password1: res.data.info.pass,
                   flag_pass:res.data.info.pass_num,
                   ke_phone:res.data.info.ke_phone
                 })
               }
             }
           })
         }
       }
     })
  },
  bindAmendPass:function(){
    wx.navigateTo({
        url: '../messagePass/messagePass',
    })
  },
  //联系客服
  bindPhone: function (e) {
      wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone,
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
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Phone/index',
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
    var password2 = e.detail.value.password2
    if(password2 == undefined){
        password2 = e.detail.value.password1
    }

    if (e.detail.value.username==""){
      wx.showModal({
        title: '请填写您的真实姓名'
      })
    } else if (e.detail.value.phone ==""){
      wx.showModal({
        title: '请填写您的联系电话'
      })
    } else if (indexs ==0) {
      wx.showModal({
        title: '请选择性别'
      })
    } else if (birthday == "请选择您的生日") {
      wx.showModal({
        title: '请选择您的生日'
      })
    } else if (e.detail.value.password1 == "") {
        wx.showModal({
            title: '请填写您的支付密码'
        })
    } else if (password2 == "") {
        wx.showModal({
            title: '请填写您的支付密码'
        })
    } else if (e.detail.value.password1 != password2){
        wx.showModal({
            title: '密码不一致，请重新输入'
        })
    }else{
      wx.login({
        success:function(ress){
          if(ress.code){
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Center/tis',
              data: { name: e.detail.value.username, phone: e.detail.value.phone, sex: indexs, code: ress.code, birthday: birthday, pass: e.detail.value.password1},
              method: 'GET',
              success: function (res) {
                if (res.data == 1) {
                  wx.showToast({
                    title: '电话有误',
                    icon: 'success',
                    duration: 1000
                  })
                } else if (res.data == 5) {
                    wx.showToast({
                        title: '姓名有误',
                        icon: 'success',
                        duration: 1000
                    })
                }else {
                    wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        success: function () {
                            wx.navigateBack({
                                delta: 1
                            })
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