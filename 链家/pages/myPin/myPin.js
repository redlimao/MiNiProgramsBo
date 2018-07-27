//myCoupon.js
Page({
    data: {
        empty:1
    },

    onLoad: function (options) {
        var dian = options.dian;
        var that = this;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Info/info',
            data: { id: dian},
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
                wx.setNavigationBarTitle({
                    title: res.data.store_name
                })


            },
            complete: function (res) {

            }
        })

    },
    bindDetail:function(e){
        var coupon_id = e.currentTarget.dataset.couponid;
        wx.navigateTo({
            url: '../detail/detail?couponid=' + coupon_id,
        })
    }
})
