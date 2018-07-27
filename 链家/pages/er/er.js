//er.js
Page({
    data: {

    },

    onLoad: function (options) {
        var that = this;
        var vip = options.vip;
        var form_id = options.formid;
        var coupon_id = options.couponid;
        this.setData({
            vip:vip
        })
        wx.login({
            success: function (ress) {
                if (ress.code) {  
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Index/erweima',
                        data: { code: ress.code, form_id: form_id, coupons_id: coupon_id},
                        method: "GET",
                        success: function (res) {
                            console.log(res);
                            that.setData({
                                img:res.data.do
                            })
                        }
                    })
                }
            }
        })
    },
    //返回首页
    bindIndex:function(){
        wx.navigateBack({
            delta:1
        })
    }
})
