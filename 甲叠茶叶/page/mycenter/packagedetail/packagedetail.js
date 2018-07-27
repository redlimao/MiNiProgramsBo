// pages/createpackage/createpackage.js
const util = require('../../utils/util.js')
Page({
    data: {
    },
    onLoad: function (options) {
        util.showload('加载中');
        let id = options.id;
        let current = options.current;
        let types = options.types;
        if (options.status != undefined) {
            let status = options.status;
            this.setData({
                status:status
            })
        }
        this.setData({
            id: id,
            current: current,
            types: types
        })
        let that = this;
        wx.request({
            url: util.host + '/Little/Center/yue_detail',
            data: { id: id },
            method: 'GET',
            success: function (res) {
                console.log(res);
                that.setData({
                    title: res.data.info.name,
                    store_name: res.data.info.store,
                    time_start: res.data.info.start_time,
                    time_end: res.data.info.end_time,
                    money: res.data.info.single_money,
                    phone: res.data.info.phone,
                    latitude: Number(res.data.info.wei),
                    longitude: Number(res.data.info.jing),
                    num: res.data.info.num,
                    total_money: Number(res.data.info.num) * Number(res.data.info.single_money)
                })
                wx.hideLoading();
            },
        })
    },
    //导航
    bindLocation: function (e) {
        let that = this;
        console.log(that.data.latitude, that.data.longitude)
        wx.openLocation({
            latitude: that.data.latitude, //纬度
            longitude: that.data.longitude, //经度
            scale: 28,
            address: that.data.address,
            success: function (res) {
                console.log(res);
            },
        })
    },
    //拨打电话
    bindPhone: function (e) {
        let phone = this.data.phone;
        wx.makePhoneCall({
            phoneNumber: phone
        })
    },
    //确认到店
    bindTrue: function (e) {
        let that = this;
        let id = this.data.id;
        wx.showModal({
            title: '提示',
            content: '是否确认到店',
            success: function (res) {
                if (res.confirm) {
                    util.showload('加载中');
                    wx.request({
                        url: util.host + '/Little/Center/confirm_finish',
                        data: { id: id },
                        method: 'GET',
                        success: function (res) {
                            if (res.data.status == 1) {
                                wx.hideLoading();
                                wx.showToast({
                                    title: '确认到店成功',
                                    icon: 'success',
                                    mask: true,
                                    success: function () {
                                        setTimeout(() => {
                                            wx.navigateBack({
                                                delta: 1,
                                            })
                                        }, 500)
                                    }
                                })
                            } else {
                                wx.hideLoading();
                                util.showToast('确认到店失败')
                            }
                            // console.log(res);
                        }
                    })
                } else if (res.cancel) {
                    // console.log('用户点击取消')
                }
            }
        })
    },
    //删除订单
    bindDelete: function (e) {
        //获取订单下标
        let that = this;
        let id = this.data.id;
        wx.request({
            url: util.host + '/Little/Center/del_yue',
            data: { yue_id: id },
            method: 'GET',
            success: function (res) {
                if (res.data === 1) {
                    util.showload('删除中', () => {
                        let index = e.currentTarget.dataset.index;//获取当前列表下标
                        let list = that.data.list_two;//获取当前列表
                        list.splice(index, 1);
                        wx.hideLoading();
                        wx.showToast({
                            title: '删除成功',
                            icon: 'success',
                            mask: true,
                            success: function (res) {
                                if (list.length === 0) {
                                    that.setData({
                                        empty: 2
                                    })
                                } else {
                                    that.setData({
                                        list_two: list,
                                        empty: 1
                                    })
                                }
                                setTimeout(()=>{
                                    wx.navigateBack({
                                        delta: 1,
                                    })
                                },500)
                            }
                        })
                    })
                } else {
                    util.showToast('删除失败');
                }
            }
        })

    },
    //跳转评价
    bindEvaluate: function () {
        wx.navigateTo({
            url: '../myevaluateapp/myevaluateapp'
        })
    },
})