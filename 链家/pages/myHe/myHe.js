//myCoupon.js
Page({
    data: {
        empty:1
    },

    onLoad: function () {
        var that = this;
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Center/he',
                        data: { code: ress.code},
                        method: 'GET',
                        success: function (res) {
                            console.log(res)
                            if(res.data.info == 1){
                                that.setData({
                                    empty:2
                                })
                            }else{
                                that.setData({
                                    empty: 1,
                                    list: res.data.info
                                })
                            }

                        },
                        complete: function (res) {

                        }
                    })
                }
            }
        })
    },
    bindDetail:function(e){
        var coupon_id = e.currentTarget.dataset.couponid;
        wx.navigateTo({
            url: '../heDetail/heDetail?couponid=' + coupon_id,
        })
    }
})
