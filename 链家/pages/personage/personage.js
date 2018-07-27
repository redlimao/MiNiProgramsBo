//personage.js
Page({
    data: {
        w_height:0,
        height:0
    },

    onShow: function () {
        var that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Center/index',
                        data: {code:ress.code},
                        method: 'GET',
                        success: function(res) {
                            console.log(res);
                            that.setData({
                                headimgurl: res.data.info.headimgurl,
                                nickname: res.data.info.nickname,
                                he: res.data.info.he,
                                ling:res.data.ling,
                                guo:res.data.guo,
                                cha:res.data.cha,
                                shi:res.data.shi,
                                phone: res.data.info.company_phone,
                                wan:res.data.info.wan,
                                lists: res.data.you,
                                hui:res.data.info.hui
                            })

                        },
                        complete: function(res) {
                            wx.hideLoading()
                        }
                    })
                }
            }
        })
    },
    //我的核销
    bindHe:function(){
        wx.navigateTo({
            url: '../myHe/myHe'
        })
    },
    //跳转内页
    bindDetail: function (e) {
        var coupon_id = e.currentTarget.dataset.couponid;
        wx.navigateTo({
            url: '../detail/detail?couponid=' + coupon_id,
        })
    },
    //tab切换
    bindTab:function(e){
        var type_id = e.currentTarget.dataset.typeid;
        wx.navigateTo({
            url: '../myCoupon/myCoupon?typeid=' + type_id,
        })        
    },
    //说我想要
    bindWant:function(e){
        var wan = e.currentTarget.dataset.wan;
        if(wan === 1){
            wx.navigateTo({
                url: '../want/want',
            }) 
        }else{
            wx.showModal({
                title: '提示',
                content: '您还未完善信息，请前往设置页面完善信息',
                showCancel:false,
                success:function(){
                    wx.navigateTo({
                        url: '../setting/setting',
                    })
                }
            })
        }
    },
    //资料设置
    bindSet:function(){
        wx.navigateTo({
            url: '../setting/setting',
        })
    },
    //优惠券页面
    bindCoupon:function(){
        wx.navigateTo({
            url: '../myCoupon/myCoupon?typeid=' + 1,
        })
    },
    //联系客服
    bindPhone:function(e){
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone,
        })
    },
    //关于我们
    bindAboutUs:function(){
        wx.navigateTo({
            url: '../newPage/newPage',
        })
    },
    //分享
    bindShare:function(){
        wx.navigateTo({
            url: '../newPage/newPage',
        })
    },
    onPullDownRefresh: function () {
        var that = this;
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Center/index',
                        data: {code:ress.code},
                        method: 'GET',
                        success: function(res) {
                            console.log(res);
                            that.setData({
                                headimgurl: res.data.info.headimgurl,
                                nickname: res.data.info.nickname,
                                he: res.data.info.he,
                                ling:res.data.ling,
                                guo:res.data.guo,
                                cha:res.data.cha,
                                shi:res.data.shi,
                                phone: res.data.info.company_phone
                            })
                        },
                        complete: function(res) {
                            wx.stopPullDownRefresh();
                        }
                    })
                }
            }
        })
    }
})
