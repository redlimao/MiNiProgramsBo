// pages/message/message.js
Page({
    data:{
        array: ['请选择性别','男', '女',],
        indexs:0,
        phone:"",
        user_id : ''
    },
    onLoad:function(options){
        var that = this;
        this.setData({
            user_id : options.id
        })
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/user',
                        data: {id:that.data.user_id},
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                            if(res.data.info !=1){
                                that.setData({
                                name: res.data.info.name,
                                phone: res.data.info.phone,
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
    getPhoneNumber: function (e) {
        var that=this;
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Phone/index',
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
    //提交信息
    formSubmit:function(e){
        var that = this;
        var tels = e.detail.value.phone
        var indexs=this.data.indexs;
        if (e.detail.value.username==""){
            wx.showModal({
                title: '请填写您的真实姓名'
            })
        } else if (e.detail.value.phone ==""){
            wx.showModal({
                title: '请填写您的联系电话'
            })
        }else if (indexs ==0) {
            wx.showModal({
                title: '请选择性别'
            })
        } else{
            wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/ti',
                data: { name: e.detail.value.username, phone: e.detail.value.phone, sex: indexs, id: that.data.user_id},
                method: 'GET',
                success: function (res) {
                    console.log(res, that.data.user_id)
                    if (res.data == 1) {
                        wx.showToast({
                        title: '姓名有误',
                        icon: 'success',
                        duration: 1000
                        })
                    } else if (res.data == 2) {
                        wx.showToast({
                            title: '电话有误',
                            icon: 'success',
                            duration: 1000
                        })
                    } else if (res.data == 3) {
                        wx.showToast({
                            title: '提交成功',
                            icon: 'success',
                            duration: 1000,
                            success: function () {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        })    
                    } else if (res.data == 4) {
                        wx.showToast({
                            title: '提交失败',
                            icon: 'success',
                            duration: 1000
                        })
                    }
                }
            })
        }
    }
})