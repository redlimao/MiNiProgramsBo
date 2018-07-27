// pages/mycollect/mycollect.js
const util = require('../../utils/util.js')
Page({
    data: {
        current: 1,
        empty: 1,
        currpage: 1
    },
    onShow: function () {
        util.showload('加载中');
        let that = this;
        let index = this.data.current;
        console.log(index);
        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        url: util.host + '/Little/Center/yu',
                        data: { code: res.code, currpage: 1, type: index},
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                            if (index == 1) {
                                if (res.data.list == 1) {
                                    that.setData({
                                        empty: 2
                                    })
                                } else {
                                    that.setData({
                                        empty: 1,
                                        list_one: res.data.list
                                    })
                                }
                            } else {
                                if (res.data.list == 1) {
                                    that.setData({
                                        empty: 2
                                    })
                                } else {
                                    that.setData({
                                        empty: 1,
                                        list_two: res.data.list
                                    })
                                }
                            }
                            wx.hideLoading();
                        }
                    })
                }
            },
        })
    },
    bindTap: function (e) {
        util.showload('加载中');
        let that = this;
        //获取触发事件组件的dataset属性 
        let index = e.currentTarget.dataset.index;
        this.setData({
            current: index,
            currpage: 1
        })

        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        url: util.host + '/Little/Center/yu',
                        data: { code: res.code, currpage: 1, type: index },
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                            if (index == 1) {
                                if (res.data.list == 1) {
                                    that.setData({
                                        empty: 2
                                    })
                                } else {
                                    that.setData({
                                        empty: 1,
                                        list_one: res.data.list
                                    })
                                }
                            } else {
                                if (res.data.list == 1) {
                                    that.setData({
                                        empty: 2
                                    })
                                } else {
                                    that.setData({
                                        empty: 1,
                                        list_two: res.data.list
                                    })
                                }
                            }
                            wx.hideLoading();
                        }
                    })
                }
            },
        })
    },
    //确认到店
    bindTrue:function(e){
        let that = this;
        let id = e.currentTarget.id;
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
                                    success:function(){
                                        that.setData({
                                            current : 2,
                                            list_two:res.data.list
                                        })
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
        let that = this;
        let id = e.currentTarget.id;
        //获取订单下标
        wx.showModal({
            title: '温馨提示',
            content: '是否删除订单',
            showCancel: true,
            success: function(res) {
                if (res.confirm) {
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
                                        }
                                    })
                                })
                            } else {
                                util.showToast('删除失败');
                            }
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //跳转评价
    bindEvaluate:function(e){
        let id = e.currentTarget.id;
        wx.navigateTo({
            url: '../myevaluateapp/myevaluateapp?id=' + id
        })
    },
    //跳转详情
    bindDetail:function(e){
        let types = Number(e.currentTarget.dataset.types);
        let status = e.currentTarget.dataset.status;
        let current = this.data.current;
        let id = e.currentTarget.id;
        console.log(id);
        // 1=》自定义套餐 2=》固定套餐
        if (types === 1){
            wx.navigateTo({
                url: '../packagezidetail/packagezidetail?id=' + id + '&current=' + current,
            })
        }else{
            wx.navigateTo({
                url: '../packagedetail/packagedetail?id=' + id + '&current=' + current + '&status=' + status + '&types=' + types,
            })
        }
    },
    // 下拉加载
    onReachBottom: function () {
        util.showload('加载中');
        let that = this;
        let id = this.data.id;
        let currpage = this.data.currpage;
        let current = Number(this.data.current);
        currpage++;
        // console.log(currpage);
        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        url: util.host + '/Little/Center/yu',
                        data: { code: res.code, currpage: currpage, type: current },
                        method: 'GET',
                        success: function (res) {
                            // console.log(res);
                            wx.hideLoading();
                            switch (current) {
                                case 1:
                                    let list_one = that.data.list_one;
                                    if (res.data.list != 1) {
                                        res.data.list.forEach((item) => {
                                            list_one.push(item);
                                        })
                                        that.setData({
                                            currpage: currpage,
                                            list_one: list_one
                                        })
                                    } else {
                                        util.showToast('没有内容了');
                                    }
                                    break;
                                case 2:
                                    let list_two = that.data.list_two;
                                    if (res.data.list != 1) {
                                        res.data.list.forEach((item) => {
                                            list_two.push(item);
                                        })
                                        that.setData({
                                            currpage: currpage,
                                            list_two: list_two
                                        })
                                    } else {
                                        util.showToast('没有内容了');
                                    }
                                    break;
                            }

                        }
                    })
                }
            }
        })
    }
})