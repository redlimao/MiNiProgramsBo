//detail.js
Page({
    data: {
        coupon_id:'',
        box_index:0,
        pop_index: 0,
        img_index: 0,
        flag_txt: 2
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
                    wx.getLocation({
                        type: 'wgs84',
                        success: function (res) {
                            var latitude = res.latitude
                            var longitude = res.longitude
                            that.setData({
                                latitude: latitude,
                                longitude: longitude
                            })
                            wx.request({
                                url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Info/index',
                                data: { jing: longitude, wei: latitude, code: ress.code, id: that.data.coupon_id },
                                method: 'GET',
                                success: function (res) {
                                    console.log(res)
                                    that.setData({
                                        info:res.data.info,
                                        flag_get:res.data.info.ling,
                                        flag_mian:Number(res.data.info.mian)
                                    })
                                },
                                complete: function (res) {
                                    wx.hideLoading();
                                }
                            })
                        },
                    })
                }
            }
        })
    },
    bindPinPai:function(e){
        var dian = e.currentTarget.dataset.dian;
        wx.navigateTo({
            url: '../myPin/myPin?dian=' + dian,
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
    },
    // 立即使用
    bindUse:function(e){
        var form_id = e.detail.formId;
        var coupon_id = e.currentTarget.dataset.couponid;
        var vip = e.currentTarget.dataset.vip;
        wx.navigateTo({
            url: '../er/er?formid=' + form_id + '&couponid=' + coupon_id + '&vip=' + vip, 
        })
    },
    bindAddress:function(e){
        var address = e.currentTarget.dataset.address;
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                wx.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 28,
                    address: address,
                })
            },
        })
    },
    bindPhone:function(e){
        var phone = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phone,
        })
    },
    //==查看原图
    yuanName: function (e) {
      this.setData({
        flag: 1,
        pop_index: e.currentTarget.dataset.index,
        img_index: e.currentTarget.dataset.id
      })
      console.log(e.currentTarget.dataset.index, e.currentTarget.dataset.id)
    },
    //==回复原图
    huiName: function () {
      this.setData({
        flag: 0
      })
    }
})
