const util = require('../../utils/util.js')
// pages/main/main.js
Page({
    data: {
        user_flag:1,
        nickName:'点击登录',
        num:[0,0,0,0,0]
    },
    onShow: function () {
        util.showload('加载中');
        let that = this;
        wx.login({
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Center/indexs',
                        data: {code:res.code},
                        method: 'GET',
                        success: function(res) {
                            console.log(res);
                            if(res.data.login == 0){
                                that.setData({
                                    user_flag : 1
                                })
                            }else{
                                that.setData({
                                    user_flag: 2,
                                    avatarUrl: res.data.info.headimgurl,
                                    nickName: res.data.info.nickname,
                                    num:res.data.num,
                                })
                            }
                            that.setData({
                                url:res.data.url,
                                share_num: res.data.info.zhuan,
                                account: res.data.info.account,
                                covers: res.data.info.covers
                            })
                            wx.hideLoading();
                        },
                    })
                }
            }
        })
    },
    //用户登录
    bindGetUserInfo: function (e) {
        let that = this;
        util.showload('登录中');
        // console.log(e);
        if (e.detail.errMsg == "getUserInfo:ok") {
            let rawData = JSON.parse(e.detail.rawData);
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.request({
                            url: util.host + '/Little/Company/cun',
                            data: { code: res.code, name: rawData.nickName, img: rawData.avatarUrl},
                            method: "GET",
                            success: function (res) {
                                that.setData({
                                    user_flag: 2,
                                    avatarUrl: rawData.avatarUrl,
                                    nickName: rawData.nickName
                                })
                                wx.hideLoading();
                                wx.showToast({
                                    title: '登陆成功',
                                    icon: 'none',
                                    mask: true,
                                })
                            }
                        })
                    }
                }
            })
        }else{
            wx.hideLoading();
            wx.showToast({
                title: '登陆失败',
                icon: 'none',
                mask: true,
            })
        }

    },
    //购物车
    bindCart:function(){
        let user_flag = this.data.user_flag;
        if (user_flag == 1){
            util.showToast('请先在个人中心登录');
        }else{
            wx.navigateTo({
                url: '../../mycenter/mycart/mycart'
            })
        }

    },
    // 订单
    bindOrder:function(e){
        let index = e.currentTarget.dataset.index;
        let user_flag = this.data.user_flag;
        if (user_flag == 1) {
            util.showToast('请先在个人中心登录');
        } else {
            wx.navigateTo({
                url: '../../mycenter/myorder/myorder?index=' + index
            });
        }
    },
    //分享
    bindShare:function(e){
        let user_flag = this.data.user_flag;
        if (user_flag == 1) {
            util.showToast('请先在个人中心登录');
        } else {
            let index = e.currentTarget.dataset.index;
            wx.navigateTo({
                url: '../../mycenter/myshare/myshare?index=' + index,
            })
        }
    },
    // 账户余额
    bindMoney:function(){
        let user_flag = this.data.user_flag;
        if (user_flag == 1) {
            util.showToast('请先在个人中心登录');
        } else {
            wx.navigateTo({
                url: '../../mycenter/mymoney/mymoney'
            })
        }
    },
    // 我的积分
    bindPoints:function(){
        let user_flag = this.data.user_flag;
        if (user_flag == 1) {
            util.showToast('请先在个人中心登录');
        } else {
            wx.navigateTo({
                url: '../../mycenter/mycovers/mycovers',
            })
        }
    },
    // 我的优惠券
    bindCoupon:function(){
        let user_flag = this.data.user_flag;
        if (user_flag == 1) {
            util.showToast('请先在个人中心登录');
        } else {
            wx.navigateTo({
                url: '../../mycenter/mycoupons/mycoupons',
            })
        }
    },
    //余额充值
    bindPaymoney:function(){
        let user_flag = this.data.user_flag;
        if (user_flag == 1) {
            util.showToast('请先在个人中心登录');
        } else {
            wx.navigateTo({
                url: '../../mycenter/paymoney/paymoney'
            })
        }
    },
    // 我的预约
    bindMyappointment:function(){
        let user_flag = this.data.user_flag;
        if (user_flag == 1) {
            util.showToast('请先在个人中心登录');
        } else {
            wx.navigateTo({
                url: '../../mycenter/myappointmen/myappointmen'
            })
        }
    },
    //我的收藏
    bindCollect:function(){
        let user_flag = this.data.user_flag;
        if (user_flag == 1) {
            util.showToast('请先在个人中心登录');
        } else {
            wx.navigateTo({
                url: '../../mycenter/mycollect/mycollect',
            })
        }
    },
    //资料设置
    bindMessage: function () {
        let user_flag = this.data.user_flag;
        if (user_flag == 1) {
            util.showToast('请先在个人中心登录');
        } else {
            wx.navigateTo({
                url: '../../mycenter/message/message',
            })
        }
    },
    // 收货地址
    bindAddress:function(){
        let user_flag = this.data.user_flag;
        if (user_flag == 1) {
            util.showToast('请先在个人中心登录');
        } else {
            wx.chooseAddress({
                success: function () {

                }
            })
        }
    },
    // =====技术支持
    jiName: function (e) {
        let path = e.currentTarget.dataset.url;
        let user_flag = this.data.user_flag;
        if (user_flag == 1) {
            util.showToast('请先在个人中心登录');
        } else {
            wx.navigateTo({
                url: '../../mycenter/newpage/newpage?path=' + path,
            })
        }
    },
    //授权管理
    bindOpenSetting:function(e){
        console.log(e);
    },
    // ========分享
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: '甲叠茶叶',
            path: '/page/taber/index/index',
            success: function (res) {
                wx.showToast({
                    title: '转发成功',
                    icon: 'success',
                    mask: true,
                })
            },
            fail:function(){
                wx.showToast({
                    title: '转发失败',
                    mask: true,
                })
            }
        }
    }
})