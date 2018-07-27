//detail.js
Page({
    data: {
        coupon_id:''
    },
    onLoad: function (options){
        var coupon_id = options.couponid;
        this.setData({
            coupon_id: coupon_id
        })
    },
    onShow: function () {
        var that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Center/he_info',
                        data: {code: ress.code, id: that.data.coupon_id },
                        method: 'GET',
                        success: function (res) {
                            console.log(res)
                            that.setData({
                                info: res.data.coupons,
                                list:res.data.info
                            })
                        },
                        complete: function (res) {
                            wx.hideLoading();
                        }
                    })  
                }
            }
        })
    },
    bindGet:function(e){
        console.log(e);
        var that = this;
        var form_id = e.detail.formId;
        var coupon_id = e.currentTarget.dataset.couponid;
        wx.showLoading({
            title: '领取中',
        })
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Info/add',
                        data: { code: ress.code, form_id: form_id, id: coupon_id},
                        method: 'GET',
                        success: function(res) {
                            console.log(res);
                            if(res.data === 2){
                                console.log(res);
                                that.setData({
                                    flag_get: res.data
                                })
                                console.log(that.data.flag_get)
                                wx.hideLoading();
                                wx.showToast({
                                    title: '领取成功'
                                })
                            }else if(res.data === 1){
                                console.log(res);
                                that.setData({
                                    flag_get: res.data
                                })
                                wx.hideLoading();
                                wx.showToast({
                                    title: '领取失败'
                                })                                
                            } else if (res.data === 5) {
                                that.setData({
                                    flag_get: 1
                                })
                                wx.hideLoading();
                                wx.showModal({
                                    title: '提示',
                                    content: '您不是vip用户，领取失败',
                                    showCancel:false
                                })
                            }
                        },
                        complete: function(res) {

                        }
                    })
                }
            }
        })
    }
})
