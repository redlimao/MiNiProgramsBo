// orders
Page({
  /**
   * 页面的初始数据
   */
    data: {
        currentIndex: 1,
        empty:1
    },
    onShow: function (options) {
        var that = this;    
        var current = getApp().request_id;
        if(current != undefined){
            this.setData({
                currentIndex: current
            })
        }        
        wx.showLoading({
            title: '加载中',
        })
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.getUserInfo({
                        success:function(res){
                            var userInfo = res.userInfo
                            var nickName = userInfo.nickName
                            var avatarUrl = userInfo.avatarUrl
                            var gender = userInfo.gender //性别 0：未知、1：男、2：女
                            var province = userInfo.province
                            var city = userInfo.city
                            var country = userInfo.country
                            wx.request({
                                url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/orders',
                                data: { code: ress.code, type: that.data.currentIndex, img: avatarUrl, sex: gender, name: nickName, city: city, pro: province, cou: country},
                                method: "GET",
                                success: function (res) {
                                    console.log(res);
                                    if (res.data.info != 1) {
                                        that.setData({
                                            empty: 1,
                                            list: res.data.info,
                                            shareText: res.data.store_name
                                        })
                                    } else {
                                        that.setData({
                                            empty: 0,
                                            shareText: res.data.store_name
                                        })
                                    }
                                },
                                complete: function () {
                                    wx.hideLoading();
                                }
                            })
                        }
                    })
                }
            }
        })
    },
    //跳转到详情页面
    bindDetails: function (e) {
        var id = e.currentTarget.dataset.id;
        // console.log(id);
        wx.navigateTo({
            url: '../details/details?id=' + id,
        })
    },
    // 删除订单 
    bindDelet:function(e){
        var that = this;
        var id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '提示',
            content: '是否删除订单',
            success: function (res) {
                if (res.confirm) {
                    wx.showLoading({
                        title: '删除中',
                    })
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/orders_del',
                        data: { type: that.data.currentIndex, id: id },
                        method: "GET",
                        success: function (res) {
                            if (res.data.info != 1) {
                                that.setData({
                                    empty: 1,
                                    list: res.data.info
                                })
                            } else {
                                that.setData({
                                    empty: 0
                                })
                            }
                        },
                        complete:function(){
                            wx.hideLoading();
                            wx.showToast({
                                title: '删除成功',
                            })
                        }

                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //跳转到预约页面
    bindAppointment:function(e){
        var id = e.currentTarget.dataset.id;
        var shop_id = e.currentTarget.dataset.shopid;
        wx.navigateTo({
            url: '../appointmentdetails/appointmentdetails?ordersid=' + id + '&id=' + shop_id,
        })
    },
    //查看订单详情
    bindLook:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../messages/messages?ordersid=' + id,
        })
    },
    //完成订单
    bindComplete:function(e){
        var that = this;
        var id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '提示',
            content: '温馨提示：请您确保您预约的服务已经完成的情况下点击【确定】，并真诚欢迎您稍后对本次服务做出评价。',
            success: function (res) {
                if (res.confirm) {
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/que',
                        data: {id: id },
                        method: "GET",
                        success:function(res){
                            if (res.data.info != 1) {
                                that.setData({
                                    empty: 1,
                                    list: res.data.info
                                })
                            } else {
                                that.setData({
                                    empty: 0
                                })
                            }
                        },
                        complete:function(){
                            // console.log(id);
                            wx.navigateTo({
                                url: '../publishcomments/publishcomments?id=' + id,
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //服务评价
    bindComment:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../publishcomments/publishcomments?id=' + id,
        })
    },
    // 滑动菜单切换
    tabs: function (e) {
        // console.log(e);
        var that = this;
        this.setData({
            currentIndex: e.currentTarget.dataset.id,
        });
        var that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.login({
            success:function(ress){
                if(ress.code){
                    console.log(ress.code, that.data.currentIndex )
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/orders',
                        data: { code:ress.code,type: that.data.currentIndex },
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                            if (res.data.info != 1) {
                                that.setData({
                                    empty: 1,
                                    list: res.data.info
                                })
                            } else {
                                that.setData({
                                    empty: 0
                                })
                            }
                        },
                        complete:function(){
                            wx.hideLoading();
                        }
                    })
                }
            }
        })

    },
    //===============转发
    onShareAppMessage: function (res) {
        console.log(this.data.shareText)
        return {
            title: this.data.shareText,
            path: '/pages/orders/orders',
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
    }
})