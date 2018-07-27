// pages/shop/shop.js
const util = require('../../utils/util.js');
Page({
    data: {
        current:1
    },
    onLoad: function (options) {
        util.showload('加载中');
        var that = this;
        wx.login({
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Goods/info',
                        data: {code:res.code},
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                            that.setData({
                                menu_one: res.data.res,
                                menu_two: res.data.list
                            })
                            wx.hideLoading();
                        }
                    })
                }
            }
        })
    },
    //切换
    bindMenu:function(e){
        util.showload('加载中');
        var that = this;
        var index = e.currentTarget.dataset.index;
        var id = e.currentTarget.id;
        this.setData({
            current:index
        })
        wx.request({
            url: util.host + '/Little/Goods/info',
            data: {type:id},
            method: 'GET',
            success: function (res) {
                console.log(res);
                that.setData({
                    menu_two: res.data.list
                })
                wx.hideLoading();
            },
        })
    },
    // 跳转详情
    bindDetail:function(e){
        var id = e.currentTarget.id;
        wx.navigateTo({
            url: '../../shop/shoplist/shoplist?id=' + id
        })
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
            fail: function () {
                wx.showToast({
                    title: '转发失败',
                    mask: true,
                })
            }
        }
    }
})