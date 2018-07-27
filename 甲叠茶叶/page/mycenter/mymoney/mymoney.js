// pages/mymoney/mymoney.js
const util = require('../../utils/util.js')
Page({
    data: {
        current:1,
        empty:1,
        currpage: 1
    },
    onLoad: function (options) {
        util.showload('加载中');
        let that = this;
        wx.login({
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Center/chongzhi',
                        data: {code:res.code,currpage:1},
                        method: 'GET',
                        success: function(res) {
                            // console.log(res);
                            that.setData({
                                img: res.data.info.headimgurl,
                                name: res.data.info.nickname,
                                account: res.data.info.account
                            })
                            if(res.data.list == 1){
                                that.setData({
                                    empty : 2
                                })
                            }else{
                                that.setData({
                                    empty: 1,
                                    list_in:res.data.list
                                })
                            }
                            wx.hideLoading();
                        }
                    })
                }
            },
        })
    },
    tabFun: function (e) {
        util.showload('加载中');
        let that = this;
        //获取触发事件组件的dataset属性 
        let index = e.target.dataset.id;
        this.setData({
            current: index,
            currpage : 1
        })

        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        url: util.host + '/Little/Center/change_chongzhi',
                        data: { code: res.code, currpage: 1 ,type:index},
                        method: 'GET',
                        success: function (res) {
                            // console.log(res);
                            if(index == 1){
                                if (res.data.list == 1) {
                                    that.setData({
                                        empty: 2
                                    })
                                } else {
                                    that.setData({
                                        empty: 1,
                                        list_in: res.data.list
                                    })
                                }
                            }else{
                                if (res.data.list == 1) {
                                    that.setData({
                                        empty: 2
                                    })
                                } else {
                                    that.setData({
                                        empty: 1,
                                        list_out: res.data.list
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
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Center/chongzhi',
                        data: { code: res.code, currpage: currpage,type:current},
                        method: 'GET',
                        success: function (res) {
                            // console.log(res);
                            wx.hideLoading();
                            switch (current){
                                case 1:
                                    let list_in = that.data.list_in;
                                    if (res.data.list != 1) {
                                        res.data.list.forEach((item) => {
                                            list_in.push(item);
                                        })
                                        that.setData({
                                            currpage: currpage,
                                            list_in: list_in
                                        })
                                    } else {
                                        util.showToast('没有内容了');
                                    }
                                break;
                                case 2:
                                    let list_out = that.data.list_out;
                                    if (res.data.list != 1) {
                                        res.data.list.forEach((item) => {
                                            list_out.push(item);
                                        })
                                        that.setData({
                                            currpage: currpage,
                                            list_out: list_out
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