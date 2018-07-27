//index.js
Page({
    data: {
        flag:2,
        tip_a:'circle',
        tip_b:'circle',
    },

    onLoad: function () {
        var that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    wx.getUserInfo({
                        success: function (res) {
                            var userInfo = res.userInfo
                            var nickName = userInfo.nickName
                            var avatarUrl = userInfo.avatarUrl
                            var gender = userInfo.gender //性别 0：未知、1：男、2：女
                            var province = userInfo.province
                            var city = userInfo.city
                            var country = userInfo.country
                            wx.request({
                                url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Index/home',
                                data: { code: ress.code, img: avatarUrl, sex: gender, name: nickName, city: city, pro: province, cou: country},
                                method: "GET",
                                success: function (res) {
                                    that.setData({
                                        flag : res.data
                                    })
                                    if(res.data == 1){
                                        wx.hideLoading();
                                        wx.switchTab({
                                            url: '../coupon/coupon',
                                        })
                                    }
                                },
                                complete:function(){
                                    wx.hideLoading();
                                }
                            })
                        }
                    })
                }
            }
        })

    },
    bindNew:function(e){
        var that = this;
        var form_id = e.detail.formId;
        this.setData({
            tip_a: 'success'
        })
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Muban/index',
                        data: {code:ress.code,form_id:form_id},
                        method: 'GET',
                        success: function (res) {
                            wx.navigateTo({
                                url: '../newLogin/newLogin',
                            })
                        }
                    })
                }
            }
        })  
    },
    bindOld: function (e) {
        this.setData({
            tip_b: 'success'
        })
        var form_id = e.detail.formId;
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Muban/index',
                        data: { code: ress.code, form_id: form_id },
                        method: 'GET',
                        success: function (res) {
                            wx.navigateTo({
                                url: '../oldLogin/oldLogin',
                            })
                        }
                    })
                }
            }
        })  
    }
})
