//index.js
Page({
    data: {
        currentIndex : 0,
        pop_flag:1,
        empty:1,
        img_flag:2,
        user_id : ''
    },
    onLoad: function (options) {
        // console.log(options)
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
                                url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Goods/index',
                                data: { code: ress.code, img: avatarUrl, sex: gender, name: nickName, city: city, pro: province, cou: country},
                                method: "GET",
                                success: function (res) {
                                    console.log(res);
                                    that.setData({
                                        user_id: res.data.user_id,
                                        coupons: res.data.coupons,
                                        lun: res.data.lun,
                                        counts_img: res.data.counts_img,
                                        type: res.data.type,
                                        all_type: res.data.all_type,
                                        shareText: res.data.store_name
                                    })
                                    //商品
                                    if (res.data.goods != 1) {
                                        that.setData({
                                            empty: 1,
                                            goods: res.data.goods,
                                        })
                                    } else {
                                        that.setData({
                                            empty: 0,
                                        })
                                    }
                                },
                                complete: function () {
                                    wx.hideLoading();
                                }
                            })
                        },
                        fail:function(){
                            wx.hideLoading();
                            wx.showModal({
                                showCancel:false,
                                title: '提示',
                                content: '您点击了拒绝授权，将无法正常使用上门推拿SPA一点即到的功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
                            })
                        }
                    })
                }
            }
        })
    },
    //轮播跳转
    bindDetail:function(e){
        var goods_id = e.currentTarget.dataset.goodsid;
        var id = e.currentTarget.dataset.id;
        var types = e.currentTarget.dataset.type;
        //2 咨询页面 
        //3 服务详情页面
        if( types == 2){
            wx.navigateTo({
                url: '../healthydetails/healthydetails?id=' + id,
            })
        } else if (types == 3){
            wx.navigateTo({
                url: '../details/details?id=' + goods_id,
            })            
        }
    },
    //跳转到详情页面
    bindDetails:function(e){
        var id = e.currentTarget.dataset.id; 
        wx.navigateTo({
            url: "../details/details?id="+id,
        })
    },
    // 滑动菜单切换
    tabs: function (e) {
        this.setData({
            currentIndex: e.target.dataset.id,
        });
        var that = this;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Goods/dian_types',
            data: { type: e.target.id },
            method: 'GET',
            success: function (res) {
                // console.log(res, e.target.id);
                //商品
                if (res.data.info != 1) {
                    that.setData({
                        empty: 1,
                        goods: res.data.info,
                    })
                } else {
                    that.setData({
                        empty: 0,
                    })
                }
            }
        })
    },
    //隐藏领取优惠券图片
    bindcloseimg:function(e){
        this.setData({
            img_flag : 1
        })
    },
    // 打开弹窗
    bindopenpop: function () {
        var that = this;
        var pop_flag = this.data.pop_flag;
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Goods/coupons',
                        data: {code:ress.code},
                        method: 'GET',
                        success:function(res){
                            // console.log(res);
                            if (res.data == 2) {
                                that.setData({
                                    pop_flag: 1
                                })
                                wx.showToast({
                                    title: '您已经领取过了',
                                })
                            }else if(res.data == 3){
                                wx.showToast({
                                    title: '领取失败',
                                })
                            }else{
                                that.setData({
                                    coupon_info: res.data.info,
                                    pop_flag: 2
                                })
                            }
                        }
                    })
                }
            }
        })
    },   
    //关闭弹窗
    bindclosepop:function(){
        var pop_flag = this.data.pop_flag;
        if (pop_flag == 2) {
            this.setData({
                pop_flag: 1
            })
        }
    },
    // 优惠券跳转
    bind_coupon:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../couponlist/couponlist?id=' + id,
        })
    },
    //===============转发
    onShareAppMessage: function (res) {
        return {
            title:this.data.shareText,
            path: '/pages/index/index',
            success: function (res) {
                wx.showToast({
                    title: '转发成功',
                })
            },
            fail: function (res) {
                wx.showToast({
                    title: '转发失败',
                })
            }
        }
    },
    //下拉刷新
    onPullDownRefresh: function () {
        var that = this;
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Goods/index',
                        data: {code:ress.code},
                        method: "GET",
                        success: function (res) {
                            console.log(res);
                            //轮播
                            if (res.data.lun != 1) {
                                that.setData({
                                    empty: 1,
                                    lun: res.data.lun,
                                })
                            }
                            //优惠券
                            if (res.data.counts_img != 1) {
                                that.setData({
                                    empty: 1,
                                    counts_img: res.data.counts_img,
                                })
                            }
                            //导航
                            if (res.data.type != 1) {
                                that.setData({
                                    empty: 1,
                                    type: res.data.type,
                                })
                            }
                            //菜单栏
                            if (res.data.all_type != 1) {
                                that.setData({
                                    empty: 1,
                                    all_type: res.data.all_type,
                                })
                            }
                            //商品
                            if (res.data.goods != 1) {
                                that.setData({
                                    empty: 1,
                                    currentIndex:0,
                                    goods: res.data.goods,
                                })
                            } else {
                                that.setData({
                                    empty: 0,
                                })
                            }
                        },
                        complete: function () {
                            wx.stopPullDownRefresh();
                        }
                    })
                }
            }
        })
    }
})
