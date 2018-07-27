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
        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        url: util.host + '/Little/Center/collectss',
                        data: { code: res.code, currpage: 1, type: index},
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
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
                        url: util.host + '/Little/Center/collectss',
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
    //跳转详情
    bindDetail:function(e){
        let id = e.currentTarget.id;
        let current = this.data.current;
        console.log(id);
        if(current == 1){
            wx.navigateTo({
                url: '../../index/packagedetail/packagedetail?id=' + id,
            })
        }else{
            wx.navigateTo({
                url: '../../shop/shopdetails/shopdetails?id=' + id,
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
                        url: util.host + '/Little/Center/collectss',
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