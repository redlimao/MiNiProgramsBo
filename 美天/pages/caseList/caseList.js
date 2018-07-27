//caseList.js
Page({
    data: {
        empty:1,
        currentIndex :1,
        view_id: 'a0'
    },
    onShow: function () {
        var that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.login({
            success: function(ress) {
                if(ress.code){
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Company/anli',
                        data: {code:ress.code},
                        method: 'GET',
                        success: function(res) {
                            console.log(res);
                            if (res.data.bao_info == 1){
                                that.setData({
                                    currentIndex: 1,
                                    empty : 2
                                })
                            }else{
                                that.setData({
                                    currentIndex: 1,
                                    empty: 1,
                                    menu: res.data.one_type,
                                    weekend_list: res.data.bao_info
                                })
                            }
                        },
                        complete: function(res) {},
                    })
                }
            },
            fail: function(res) {},
            complete: function(res) {
                wx.hideLoading()
            },
        })
    },
    // ======案例详情
    guangName: function (e) {
        wx.navigateTo({
            url: '../texts/texts?goodsid=' + e.currentTarget.dataset.id,
        })
    },
    tapName : function(e){
        wx.navigateTo({
            url:"../volumeDetails/volumeDetails"
        })
    },
    //事件处理函数
    bindMenu: function (e) {
        var that = this;
        var index = e.target.dataset.id;
        var id = e.target.id;
        var left = e.target.offsetLeft;
        var cute_left = this.data.width * 2;
        var types = e.target.dataset.types;
        this.setData({
            currentIndex: index,
        })
        if (left < 160) {
            this.setData({ left: 5 })
        } else {
            this.setData({
                left: left - 160
            })
        }
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Company/qie_type',
            data: { id: types},
            method: 'GET',
            success: function (res) {
                console.log(res);

                if (res.data == 1) {
                    that.setData({
                        empty: 2
                    })
                } else {
                    that.setData({
                        empty: 1,
                        weekend_list: res.data.bao_info
                    })
                }
            },
            complete: function (res) { },
        })

    },
    bindScroll: function (e) {
        console.log(e);
    },
    onPullDownRefresh: function () {
        var that = this;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Company/anli',
            data: { },
            method: 'GET',
            success: function (res) {
                console.log(res);
                if (res.data.bao_info == 1) {
                    that.setData({
                        empty: 2,
                        currentIndex:1
                    })
                } else {
                    that.setData({
                        currentIndex:1,
                        empty: 1,
                        menu: res.data.one_type,
                        weekend_list: res.data.bao_info
                    })
                }
            },
            complete: function (res) { },
        })
    },
    // ========分享
    onShareAppMessage: function (res) {
        var scene = this.data.user;
        if (res.from === 'button') {
            // 来自页面内转发按钮

        }
        return {
            title: '陕西美天包装',
            path: '/pages/goog/goog',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})
