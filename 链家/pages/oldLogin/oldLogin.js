//login.js
Page({
    data: {
        flag1: 1,
        flag2: 1
    },

    onLoad: function () {

    },
    bindFocus1: function (e) {
        this.setData({ flag1: 2 })
    },
    bindBlur1: function () {
        this.setData({ flag1: 1 })
    },
    bindFocus2: function (e) {
        this.setData({ flag2: 2 })
    },
    bindBlur2: function () {
        this.setData({ flag2: 1 })
    },
    //下次再说
    bindSkip: function () {
        wx.switchTab({
            url: '../coupon/coupon',
        })
    },
    
    bindLastStep: function () {
        wx.navigateTo({
            url: '../index/index',
        })
    },
    formSubmit: function (e) {
        var name = e.detail.value.name;
        var phone = e.detail.value.phone;
        var form_id = e.detail.formId;
        if (name === "") {
            wx.showToast({
                title: '姓名不能为空',
            })
        } else if (phone === "") {
            wx.showToast({
                title: '手机号不能不为空',
            })
        } else {
            wx.login({
                success: function (ress) {
                    if (ress.code) {
                        wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Index/xuan',
                            data: { type: 2, code: ress.code, name: name, phone: phone, form_id: form_id },
                            method: 'GET',
                            success: function (res) {
                                console.log(res);
                                switch (res.data.status) {
                                    case 1:
                                        wx.showToast({
                                            title: '电话有误',
                                        })
                                        break;
                                    default:
                                        wx.showToast({
                                            title: '登录成功',
                                            success: function () {
                                                wx.switchTab({
                                                    url: '../coupon/coupon',
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
