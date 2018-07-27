// pages/message/message.js
Page({
  data:{
    array: ['请选择性别','男', '女',],
    indexs:0,
    phone:"",
    date:'请选择您的生日'
  },
  // ======返回上一级
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad:function(){
     var that=this
     wx.showLoading({
         title: '加载中',
         mask: true,
     })
     wx.login({
       success: function (ress) {
         if (ress.code) {
           wx.request({
               url: 'https://www.bozhiyingxiao.com/little_program/store_fuhuahezi/index.php?s=/Little/Center/zi_she',
             data: {code: ress.code },
             method: 'GET',
             success: function (res) {
                 console.log(res);
               if(res.data.info !=1){
                 that.setData({
                     name: res.data.info.username,
                     phone: res.data.info.userphone,
                   date: res.data.info.birthdate,
                   indexs: res.data.info.usersex
                 })
               }
             },
             complete:function(){
                 wx.hideLoading();
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
        console.log(e);
        var that=this;
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_fuhuahezi/index.php?s=/Little/Phone/index',
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
    },
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
            wx.showLoading({
                title: '信息保存中',
                mask: true,
            })
            wx.login({
                success:function(ress){
                    if(ress.code){
                        wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_fuhuahezi/index.php?s=/Little/Center/ji_cun',
                            data: { name: e.detail.value.username, phone: e.detail.value.phone, birthdate: date, sex: indexs,code:ress.code },
                            method: 'GET',
                            success: function (res) {
                                console.log(res);
                                if (res.data.info == 1) {
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
                                if (res.data.info == 2) {
                                    wx.showToast({
                                        icon:"none",
                                        title: '提交失败',
                                        icon: 'success',
                                    })
                                }
                            },
                            complete:function(){
                                wx.hideLoading()
                            }
                        })
                    }
                }
            })
        }
    }
})