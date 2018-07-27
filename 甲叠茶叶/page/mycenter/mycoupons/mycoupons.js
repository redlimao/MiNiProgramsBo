// pages/mycoupons/mycoupons.js
const util = require('../../utils/util.js')
Page({
    data: {
        empty:1,
    },
    onLoad: function () {
        let that = this;
        util.showload('加载中');
        wx.login({
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Center/coupons',
                        data: {code:res.code},
                        method: 'GET',
                        success: function(res) {
                            console.log(res);
                            if(res.data == 1){
                                that.setData({
                                    empty : 2
                                })
                            }else{
                                that.setData({
                                    empty : 1,
                                    list : res.data
                                })
                            }
                            wx.hideLoading();
                        },
                    })
                }
            }
        })
    }
})