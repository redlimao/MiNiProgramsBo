const util = require('../../utils/util.js');
//myorder.js
Page({
    data: {
        current:1,
        currpage:1,
        empty : 1
    },
    onLoad:function(options){
        let index = options.index;
        this.setData({
            current: index
        })
        // console.log(index);
    },
    onShow:function(){
        util.showload('加载中');
        let that = this;
        let current = this.data.current;
        // console.log(current);
        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        url: util.host + '/Little/Center/orderss',
                        data: { code: res.code, type: current},
                        method: 'GET',
                        success: function (res) { 
                            console.log(res);
                            if(res.data.info == 1){
                                that.setData({
                                    empty : 2
                                })
                            }else{
                                that.setData({
                                    list:res.data.info,
                                    empty : 1
                                })
                            }
                            that.setData({
                                user_id : res.data.user_id
                            })
                            wx.hideLoading();
                        }
                    })
                }
            }
        })
    },
    //菜单切换
    bindTap:function(e){
        util.showload('加载中');
        let that = this;
        let index = e.currentTarget.dataset.index;
        this.setData({
            current : index,
            currpage:1
        })
        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        url: util.host + '/Little/Center/orderss',
                        data: { code: res.code, type: index},
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                            if (res.data.info == 1) {
                                that.setData({
                                    empty: 2
                                })
                            } else {
                                that.setData({
                                    list: res.data.info,
                                    empty: 1
                                })
                            }
                            wx.hideLoading();
                        }
                    })
                }
            }
        })
    },
    // 跳转详情
    bindDetail:function(e){
        let types = e.currentTarget.dataset.types;
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../orderdetails/orderdetails?types=' + types + '&id=' + id
        })
    },
    //删除订单
    bindDelete:function(e){
        let that = this;
        let current = this.data.current;
        let id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '提示',
            content: '是否删除订单',
            success: function (res) {
                if (res.confirm) {
                    wx.request({
                        url: util.host + '/Little/Center/orders_dels',
                        data: { id: id, type: current },
                        method: 'GET',
                        success: function (res) {
                            if (res.data == 1) {
                                util.showload('删除中', () => {
                                    //获取订单下标
                                    var index = e.currentTarget.dataset.index;
                                    var list = that.data.list;
                                    list.splice(index, 1);
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '删除成功',
                                        icon: 'success',
                                        mask: true,
                                        success: function (res) {
                                            that.setData({
                                                list: list
                                            })
                                            if (that.data.list.length == 0) {
                                                that.setData({
                                                    empty: 2
                                                })
                                            } else {
                                                that.setData({
                                                    empty: 1
                                                })
                                            }
                                        }
                                    })
                                })
                            } else {
                                util.showToast('删除失败');
                            }
                        }
                    })
                } else if (res.cancel) {
                    util.showToast('取消删除');
                }
            }
        })
    },
    // 提醒发货
    bindSend:function(){
        util.showToast('提醒发货成功');
    },
    // 确认收货
    bindTake:function(e){
        let that = this;
        let id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '提示',
            content: '是否确认收货',
            success: function (res) {
                if (res.confirm) {
                    util.showload('加载中');
                    wx.request({
                        url: util.host + '/Little/Center/que',
                        data: { id: id },
                        method: 'GET',
                        success: function (res) {
                            // console.log(res);
                            that.setData({
                                current: 4,
                                list: res.data.info
                            })
                            wx.hideLoading();
                        }
                    })
                }
            }
        })
    },
    // 立即评价
    bindEvaluate:function(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../myevaluate/myevaluate?id=' + id
        })
    },
    // 下拉加载
    onReachBottom: function () {
        util.showload('加载中');
        let that = this;
        let id = this.data.id;
        let currpage = this.data.currpage;
        let current = Number(this.data.current);
        let user_id = this.data.user_id;
        currpage++;
        wx.request({
            url: util.host + '/Little/Center/orders_more',
            data: {user_id:user_id,currpage: currpage, type: current },
            method: 'GET',
            success: function (res) {
                // console.log(res);
                wx.hideLoading();
                let list = that.data.list;
                if (res.data.info != 1) {
                    res.data.info.forEach((item) => {
                        list.push(item);
                    })
                    that.setData({
                        currpage: currpage,
                        list: list
                    })
                } else {
                    util.showToast('没有内容了');
                }
            }
        })
    }
})
