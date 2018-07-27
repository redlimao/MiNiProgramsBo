// pages/message/message.js
const util = require('../../utils/util.js')
Page({
    data: {
        sex:['请选择性别','男','女'],
        sex_index : 0,
        date:'请选择您的生日'
    },
    onLoad: function () {
        util.showload('加载中');
        let that = this;
        wx.login({
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Center/info',
                        data: {code:res.code},
                        method: 'GET',
                        success: function(res) {
                            console.log(res);
                            if(res.data.info !== 1){
                                that.setData({
                                    name : res.data.info.name,
                                    date: res.data.info.birthday,
                                    phone: res.data.info.phone,
                                    sex_index: res.data.info.sex,
                                })
                            }
                            wx.hideLoading();
                        }
                    })
                }
            }
        })
    },
    //选择性别
    bindSex:function(e){
        this.setData({
            sex_index:e.detail.value
        })
    },
    //选择日期
    bindDate: function (e) {
        this.setData({
            date: e.detail.value
        })
    },

    formSubmit: function (e) {
        util.showload('加载中');
        let phone = e.detail.value.phone;
        let name = e.detail.value.name;
        let sex = this.data.sex_index;
        let birthday = this.data.date;
        let certify = e.detail.value.certify;
        if (name == " " || name == undefined) {
            util.showToast('姓名不能为空')
        } else if (phone == "" || phone == undefined) {
            util.showToast('电话不能为空')
        } else if (sex == 0) {
            util.showToast('请选择性别')
        } else if (birthday == "请选择您的生日") {
            til.showToast('请选择您的生日')
        } else {
            wx.login({
                success: function (ress) {
                    if (ress.code) {
                        wx.request({
                            url: util.host + '/Little/Center/ti',
                            data: { name: name, phone:phone, sex: sex, code: ress.code, birthday: birthday},
                            method: 'GET',
                            success: function (res) {
                                wx.hideLoading();
                                if (res.data == 1) {
                                    wx.showToast({
                                        title: '提交成功',
                                        icon: 'success',
                                        success: function () {
                                            wx.navigateBack({
                                                delta: 1
                                            })
                                        }
                                    })
                                } else if (res.data == -1) {
                                    util.showToast('姓名有误！');
                                } else if (res.data == -2){
                                    util.showToast('电话有误！');
                                }else{
                                    util.showToast('提交失败！');
                                }
                            }
                        })
                    }
                }
            })
        }
    }
})