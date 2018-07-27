var config = require('../../../app.js');
// pages/main/main.js
Page({
    data: {
        user_flag:1,
        nickName:'点击登录'
    },
    onShow: function () {

    },
    //用户登录
    bindGetUserInfo: function (e) {
        var that = this;
        wx.showLoading({
            title: '登陆中',
            mask: true,
            success: function () {
                var rawData = JSON.parse(e.detail.rawData);
                wx.login({
                    success: function (ress) {
                        if (ress.code) {
                            wx.request({
                                url: config.host + '/bz_video_wx/Login/login_insUser.do',
                                method: 'POST',
                                data: {code:ress.code},
                                success: function (res) {
                                    console.log(res);
                                    // that.setData({
                                    //     user_flag: 2,
                                    //     avatarUrl: rawData.avatarUrl,
                                    //     nickName: rawData.nickName
                                    // })
                                },
                                complete: function (res) { },
                            })
                        }
                    }
                })
            },
            complete: function () {
                wx.hideLoading();
                wx.showToast({
                    title: '登陆成功',
                    icon: 'none',
                    mask: true,
                })
            }
        })
    },
    //收藏
    bindCollect:function(){
        wx.navigateTo({
            url: '../../mycenter/collect/collect',
        })
    },
    // 订单
    bindOrder:function(){
        wx.navigateTo({
            url: '../../mycenter/orderlist/orderlist',
        })
    },
    // ===客服电话
    keName:function(){
        wx.makePhoneCall({
            phoneNumber: '029-81779596',
        })
    },
    // ========关于我们
    bindOur: function () {
        wx.navigateTo({
        url: '../../mycenter/aboutus/aboutus',
        })
    },
    // =====商品收藏
    collectName:function(){
        wx.navigateTo({
        url: '../collect/collect',
        })
    },
    // ====资料设置
    messageName:function(){
        wx.navigateTo({
            url: '../../mycenter/message/message',
        })
    },
    // =====技术支持
    jiName: function (e) {
        var path = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: '../../mycenter/newpage/newpage?path=' + path,
        })
    },
    // ========分享
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: '影棚',
            path: '/pages/index/index',
            success: function (res) {

            }
        }
    }
})