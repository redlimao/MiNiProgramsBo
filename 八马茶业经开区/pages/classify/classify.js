// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
    data: {
        currentIndex:1,
        tan: 1,
        juan: 0, 
        coupons: 2 ,
        empty :2
    },
    onLoad:function(){
        var that = this;
        wx.request({
            url:'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Goods/info',
            data: { type: that.data.currentIndex},
            method: 'GET',
            success: function(res) {
                console.log(res);
                that.setData({
                    items:res.data.res,
                })
                if (res.data.coupons == 1) {
                    that.setData({
                        juan: 1
                    })
                } else {
                    that.setData({
                        juan: 0,
                        counts: res.data.counts,
                        zong: res.data.zong,
                        juan_list: res.data.coupons
                    })
                }
                if(res.data.list != 1){
                    that.setData({
                        list: res.data.list,
                        empty:2
                    })
                }else{
                    that.setData({
                        empty: 1
                    })
                }

            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    //侧边栏切换
    bindTap:function(e){
        var that = this;
        this.setData({
            currentIndex:e.target.dataset.id
        })
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Goods/info',
            data: { type: e.target.dataset.index},
            method: 'GET',
            success: function (res) {
                console.log(res)
                if (res.data.list != 1) {
                    that.setData({
                        list: res.data.list,
                        empty: 2
                    })
                } else {
                    that.setData({
                        empty: 1
                    })
                }

            },
            fail: function (res) { },
            complete: function (res) { },
        })
    },
    //获取搜索输入的内容
    search: function (e) {
        var search_txt = e.detail.value;
        var that = this;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Sou/index',
            data: { content: search_txt },
            method: "GET",
            success: function (res) {
                console.log(res);
                //商品
                if (res.data.list != 1) {
                    that.setData({
                        goods: res.data.list,
                    })
                } else {
                    that.setData({
                        empty: 1
                    })
                }
                wx.navigateTo({
                    url: '../list/list?searchtxt=' + search_txt,
                })
            }
        })
    },
    //跳转到详情页面
    bindDetail:function(e){
        var items_id = e.currentTarget.dataset.itemsid;
        wx.navigateTo({
            url: '../shop/shop?itemsid=' + items_id ,
        })
    },
    // ======领取优惠卷
    lingName: function () {
        var that = this;
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Goods/coupons',
                        data: { code: ress.code },
                        method: "GET",
                        success: function (res) {
                            if (res.data == 1) {
                                wx.showToast({
                                    title: '已经领取过了',
                                })
                            }
                            else if (res.data == 2) {
                                that.setData({
                                    tan: 0
                                })
                            } else if (res.data == 2) {
                                wx.showModal({
                                    title: '领取不成功',
                                })
                            }
                        }
                    })
                }
            }
        })
    },
    // =====关闭弹窗
    closeLing: function () {
        this.setData({
            tan: 1
        })
    },
    // =====关闭优惠卷领取
    closeJuan: function () {
        this.setData({
            juan: 1
        })
    },
    // 优惠券详情跳转
    quanName: function (e) {
        var money_id = 0;
        var app = getApp();
        app.requestmoney_id = money_id;
        wx.navigateTo({
            url: '../quan/quan',
        })
    },
    onPullDownRefresh: function () {
        var that = this;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Goods/info',
            data: { type: that.data.currentIndex },
            method: 'GET',
            success: function (res) {
                console.log(res);
                that.setData({
                    items: res.data.res,
                })
                if (res.data.coupons == 1) {
                    that.setData({
                        juan: 1
                    })
                } else {
                    that.setData({
                        juan: 0,
                        counts: res.data.counts,
                        zong: res.data.zong,
                        juan_list: res.data.coupons
                    })
                }
                if (res.data.list != 1) {
                    that.setData({
                        list: res.data.list,
                        empty: 2
                    })
                } else {
                    that.setData({
                        empty: 1
                    })
                }

            },
            complete: function (res) {
                wx.stopPullDownRefresh();
             }
        })
    }
})