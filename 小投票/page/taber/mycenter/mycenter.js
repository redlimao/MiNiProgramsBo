// pages/list/list.js
Page({
    data: {
        current: 1,
        empty: 1,
        user_flag:1,
        nickName:'昵称',
        list: [{
            tip: '',
            img: '',
            name: 'Aryanna Ryan',
            title: "幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票大赛，幼儿园最萌宝宝。幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票大赛，幼儿园最萌宝宝。",
            time: '2018/05/06',
            num: 100,
            flag:1
        }, {
            tip: '',
            img: '',
            name: 'Aryanna Ryan',
            title: "幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票大赛，幼儿园最萌宝宝。幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票大赛，幼儿园最萌宝宝。",
            time: '2018/05/06',
            num: 100,
            flag: 2
        }]
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
                that.setData({
                    user_flag: 2,
                    avatarUrl: rawData.avatarUrl,
                    nickName: rawData.nickName
                })
                // wx.login({
                //     success: function (ress) {
                //         if (ress.code) {
                //             wx.request({
                //                 url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Center/update',
                //                 data: { code: ress.code, nickname: rawData.nickName, head: rawData.avatarUrl },
                //                 success: function (res) {
                //                     that.setData({
                //                         user_flag: 2,
                //                         avatarUrl: rawData.avatarUrl,
                //                         nickName: rawData.nickName
                //                     })
                //                 },
                //                 complete: function (res) { },
                //             })
                //         }
                //     }
                // })
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
    //tap切换
    bindTap:function(e){
        console.log(e);
        this.setData({
            current : e.currentTarget.dataset.index
        })
    },
    bindEarnings:function(){
        wx.navigateTo({
            url: '../../mycenter/earnings/earnings',
        })
    },
    //跳转详情页面
    bindDetail: function (e) {
        var index = e.currentTarget.dataset.index;
        if (index == 1) {
            wx.navigateTo({
                url: '../../list/wordLook/wordLook',
                success: function (res) {

                },
            })
        } else {
            wx.navigateTo({
                url: '../../list/picLook/picLook',
                success: function (res) {

                },
            })
        }
    },
    onPullDownRefresh: function () {
    
    },
    onReachBottom: function () {
    
    },
    onShareAppMessage: function () {
    
    }
})