//myCoupon.js
Page({
    data: {
        empty:1
    },

    onLoad: function (options) {
        var form_id = options.formid;
        var content = options.content;
        var that = this;
        wx.login({
            success: function (ress) {
                wx.request({
                    url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Sou/sou',
                    data: { code: ress.code, form_id: form_id, content: content },
                    method: 'GET',
                    success: function (res) {
         
                        if(res.data.info == 1){
                            that.setData({
                                empty : 2
                            })
                        }else{
                            that.setData({
                                empty: 1,
                                list:res.data.info
                            })
                        }
                    },
                    complete: function (res) { },
                })
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
