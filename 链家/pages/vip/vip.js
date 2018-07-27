//vip.js
Page({
    data: {
        current: 1,
        empty: 1,
        flag_menu: 1,
        height: 0,
        t_height: 0,
        c_height: 0,
        n: 1,
        qing: 0
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
                                url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Goods/index',
                                data: { jing: longitude, wei: latitude, code: ress.code },
                                method: 'GET',
                                success: function (res) {
                                    console.log(res);
                                    that.setData({
                                        imgs: res.data.lun,
                                        list_z: res.data.zui,
                                        menu: res.data.lei,
                                        current:res.data.lei[0].id,
                                        he: res.data.he,
                                        news: res.data.news
                                    })
                                    if (res.data.coupons == 1) {
                                        that.setData({
                                            empty: 2
                                        })
                                    } else {
                                        that.setData({
                                            lists: res.data.coupons,
                                            empty: 1
                                        })
                                    }
                                },
                                complete: function (res) {
                                    wx.hideLoading();
                                    //获取.b-menu节点的高度
                                    wx.createSelectorQuery().select('.b-menu').boundingClientRect(function (rect) {
                                        that.setData({ height: rect.height })
                                    }).exec();
                                }
                            })
                        },
                    })
                }
            }
        })
    },
    //跳转到vip列表页面
    bindPinPai: function (e) {
        var dian = e.currentTarget.dataset.dian;
        wx.navigateTo({
            url: '../myPin/myPin?dian=' + dian,
        })
    },
    //轮播跳转
    bindSDetail: function (e) {
        var lun_id = e.currentTarget.dataset.lunid;
        var status = e.currentTarget.dataset.status;
        if (status == 1) {
            wx.navigateTo({
                url: '../detail/detail?couponid=' + lun_id,
            })
        } else {
            wx.navigateTo({
                url: '../messDetails/messDetails?zixunid=' + lun_id,
            })
        }
    },
    //获取当前地点
    bindLocation: function () {
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                wx.chooseLocation({
                    success: function (res) {
                        that.setData({
                            address: res.address
                        })
                    }
                })
            }
        })
    },
    //选项卡切换
    bindTab: function (e) {
        this.setData({
            current: e.currentTarget.dataset.id
        })
        var that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Goods/type_qie',
                        data: { type: e.currentTarget.dataset.id, code: ress.code },
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                            if (res.data.coupons == 1) {
                                that.setData({
                                    empty: 2
                                })
                            } else {
                                that.setData({
                                    lists: res.data.coupons,
                                    empty: 1
                                })
                            }
                        },
                        complete: function (res) {
                            wx.hideLoading();
                        },
                    })
                }
            }
        })
    },
    //轮播current 改变时会触发 change 事件
    bindHint: function (e) {
        var index = e.detail.current;
        this.setData({
            current: index
        })
    },
    //跳转内页
    bindDetail: function (e) {
        var coupon_id = e.currentTarget.dataset.couponid;
        wx.navigateTo({
            url: '../detail/detail?couponid=' + coupon_id,
        })
    },
    // 扫码
    bindCode: function () {
        wx.scanCode({
            onlyFromCamera: true,
            success: (res) => {
                console.log(res.result);
                wx.login({
                    success: function (ress) {
                        if (ress.code) {
                            wx.request({
                                url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/He/index',
                                data: { code: ress.code, can: res.result },
                                method: 'GET',
                                success: function (res) {
                                    if (res.data == 1) {
                                        wx.showModal({
                                            title: '提示',
                                            content: '用户无权进行操作',
                                            showCancel: false
                                        })
                                    } else if (res.data == 2) {
                                        wx.showModal({
                                            title: '提示',
                                            content: '暂无该优惠券或已过期',
                                            showCancel: false
                                        })
                                    } else if (res.data == 3) {
                                        wx.showModal({
                                            title: '提示',
                                            content: '无权核销该优惠券',
                                            showCancel: false
                                        })
                                    } else if (res.data == 4) {
                                        wx.showModal({
                                            title: '提示',
                                            content: '核销成功',
                                            showCancel: false
                                        })
                                    } else if (res.data == 5) {
                                        wx.showModal({
                                            title: '提示',
                                            content: '核销失败',
                                            showCancel: false
                                        })
                                    } else if (res.data == 6) {
                                        wx.showModal({
                                            title: '提示',
                                            content: '该优惠券已使用',
                                            showCancel: false
                                        })
                                    } else if (res.data == 7) {
                                        wx.showModal({
                                            title: '提示',
                                            content: '该优惠券时间未开始',
                                            showCancel: false
                                        })
                                    }
                                },
                                complete: function (res) { },
                            })

                        }
                    }
                })
            }
        })
    },
    // 跳转搜索
    bindSearch: function (e) {
        wx.navigateTo({
            url: '../search/search?types=' + 2,
        })
    },
    //菜单切换
    bindMenu: function () {
        var height = this.data.height;
        if (this.data.flag_menu == 1) {
            this.setData({
                flag_menu: 2,
                t_height: height,
                c_height: 50,
                c_opacity: 1
            })
        } else {
            this.setData({
                flag_menu: 1,
                t_height: 0,
                c_height: 0,
                c_opacity: 0
            })
        }
    },
    onPullDownRefresh: function () {
        var that = this;
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    wx.getLocation({
                        type: 'wgs84',
                        success: function (res) {
                            var latitude = res.latitude
                            var longitude = res.longitude
                            wx.request({
                                url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Goods/index',
                                data: { jing: longitude, wei: latitude, code: ress.code },
                                method: 'GET',
                                success: function (res) {
                                    that.setData({
                                        imgs: res.data.lun,
                                        list_z: res.data.zui,
                                        menu: res.data.lei,
                                        he: res.data.he,
                                        news: res.data.news
                                    })
                                    if (res.data.coupons == 1) {
                                        that.setData({
                                            empty: 2
                                        })
                                    } else {
                                        that.setData({
                                            lists: res.data.coupons,
                                            empty: 1
                                        })
                                    }
                                },
                                complete: function (res) {
                                    wx.stopPullDownRefresh();
                                    //获取.b-menu节点的高度
                                    wx.createSelectorQuery().select('.b-menu').boundingClientRect(function (rect) {
                                        that.setData({ height: rect.height })
                                    }).exec();
                                }
                            })
                        },
                    })
                }
            }
        })
    },

    //=============上拉加载
    onReachBottom: function () {
        var that = this;
        var n = this.data.n;
        var qing = this.data.qing;
        var lists = this.data.lists;
        n++;
        this.setData({
            n: n
        })
        // ==========获取列表信息
        if (qing == 0) {
            wx.showLoading({
                title: '加载中',
            })
            wx.login({
                success:function(ress){
                    if(ress.code){
                        wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Goods/la',
                            data: { code: ress.code, currpage: n, wei: that.data.latitude, jing: that.data.longitude, type: that.data.current },
                            method: "GET",
                            success: function (res) {
                                if (res.data.coupons == 1) {
                                    that.setData({
                                        qing: 1
                                    })
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '已无更多数据',
                                    })
                                } else {
                                    for (var i = 0; i < res.data.coupons.length; i++) {
                                        lists.push(res.data.coupons[i])
                                    }
                                    that.setData({
                                        lists: lists
                                    })
                                    console.log(lists);
                                    wx.hideLoading();
                                }
                            },
                            complete: function (res) {
                            }
                        })
                    }
                }
            })
        } else {
            wx.hideLoading();
            wx.showToast({
                title: '已无更多数据',
            })
        }
    }
})
