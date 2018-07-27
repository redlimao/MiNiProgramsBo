var WxParse = require('../../wxParse/wxParse.js');
Page({
    data:{
        
    },
    onLoad:function(options){
        var that = this;
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.getUserInfo({
                        success:function(res){
                            var userInfo = res.userInfo
                            var nickName = userInfo.nickName
                            var avatarUrl = userInfo.avatarUrl
                            var gender = userInfo.gender //性别 0：未知、1：男、2：女
                            var province = userInfo.province
                            var city = userInfo.city
                            var country = userInfo.country
                            wx.request({
                                url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/about_us',
                                data: { code: ress.code, img: avatarUrl, sex: gender, name: nickName, city: city, pro: province, cou: country},
                                method: "GET",
                                success: function (res) {
                                    console.log(res);
                                    var article = res.data.info.intro
                                    WxParse.wxParse('article', 'html', article, that, 5)
                                    that.setData({
                                        name: res.data.info.name,
                                        logo: res.data.info.one
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })  
    },

})