//index.js
var config = require('../../../app.js').config;
var getUserID = require('../../../app.js').getUserID;
Page({
    data: {
        // 测试数据
        menu_one: ['策划案例', '摄影师', '模特', '化妆师','道具','场景'],
        current:1,
        empty : 1
    },
    onLoad:function(){
        var that = this;
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        var value = wx.getStorageSync('user');
        this.setData({
            user_id: value,
        })
        wx.request({
            url: config.host + '/bz_video_wx/Collect/plan_collect.do',
            data: { user_id: this.data.user_id},
            method: 'GET',
            success: function(res) {
                if(res.data.plan_collect.length!==0){
                    res.data.plan_collect.forEach(function (item, index, array) {
                        item.types = 1;
                        item.index = 0;
                    })
                    that.setData({
                        list: res.data.plan_collect,
                        empty : 1
                    })

                    console.log(that.data.list);
                }else{
                    that.setData({
                        empty: 2
                    })
                }
            },
            complete: function(res) {
                wx.hideLoading();
            },
        })
    },
    //菜单切换
    bindTap: function (e) {
        wx.showLoading({
            title: '加载中',
            mask: true,
        })
        var that = this;
        this.setData({
            current: e.currentTarget.dataset.index
        })
        var index = Number(e.currentTarget.dataset.index);
        console.log(index);
        switch (index){
            // 策划案例
            case 1:
                wx.request({
                    url: config.host + '/bz_video_wx/Collect/plan_collect.do',
                    data: { user_id: this.data.user_id },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        if (res.data.plan_collect.length !== 0) {
                            res.data.plan_collect.forEach(function (item, index, array) {
                                item.types = 1;
                                item.index = 1;
                            })
                            that.setData({
                                list: res.data.plan_collect,
                                empty: 1
                            })
                        } else {
                            that.setData({
                                empty: 2
                            })
                        }
                    },
                    complete: function (res) {
                        wx.hideLoading();
                    },
                })
            break;
            // 摄影师
            case 2:
                wx.request({
                    url: config.host + '/bz_video_wx/Collect/camera_collect.do',
                    data: { user_id: this.data.user_id },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        if (res.data.camera_collect.length !== 0) {
                            res.data.camera_collect.forEach(function (item, index, array) {
                                item.types = 2;
                                item.index = 2;
                            })
                            that.setData({
                                list: res.data.camera_collect,
                                empty: 1
                            })
                        } else {
                            that.setData({
                                empty: 2
                            })
                        }
                    },
                    complete: function (res) {
                        wx.hideLoading();
                    },
                })
            break;
            // 模特
            case 3:
                wx.request({
                    url: config.host + '/bz_video_wx/Collect/model_collect.do',
                    data: { user_id: this.data.user_id },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        if (res.data.model_collect.length !== 0) {
                            res.data.model_collect.forEach(function (item, index, array) {
                                item.types = 2;
                                item.index = 3;
                            })
                            that.setData({
                                list: res.data.model_collect,
                                empty: 1
                            })
                        } else {
                            that.setData({
                                empty: 2
                            })
                        }
                    },
                    complete: function (res) {
                        wx.hideLoading();
                    },
                })
            break;
            case 4:
                wx.request({
                    url: config.host + '/bz_video_wx/Collect/dresser_collect.do',
                    data: { user_id: this.data.user_id },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        res.data.dresser_collect.forEach(function (item, index, array) {
                            item.types = 2;
                            item.index = 4;
                        })
                        if (res.data.dresser_collect.length !== 0) {
                            that.setData({
                                list: res.data.dresser_collect,
                                empty: 1
                            })
                        } else {
                            that.setData({
                                empty: 2
                            })
                        }
                    },
                    complete: function (res) {
                        wx.hideLoading();
                    },
                })
            break;
            case 5:
                wx.request({
                    url: config.host + '/bz_video_wx/Collect/props_collect.do',
                    data: { user_id: this.data.user_id },
                    method: 'GET',
                    success: function (res) {
                        res.data.props_collect.forEach(function (item, index, array) {
                            item.types = 3;
                            item.index = 5;
                        })
                        if (res.data.props_collect.length !== 0) {
                            that.setData({
                                list: res.data.props_collect,
                                empty: 1
                            })
                        } else {
                            that.setData({
                                empty: 2
                            })
                        }
                    },
                    complete: function (res) {
                        wx.hideLoading();
                    },
                })
            break;
            case 6:
                wx.request({
                    url: config.host + '/bz_video_wx/Collect/place_collect.do',
                    data: { user_id: this.data.user_id },
                    method: 'GET',
                    success: function (res) {
                        res.data.place_collect.forEach(function (item, index, array) {
                            item.types = 3;
                            item.index = 6;
                        })
                        if (res.data.place_collect.length !== 0) {
                            that.setData({
                                list: res.data.place_collect,
                                empty: 1
                            })
                        } else {
                            that.setData({
                                empty: 2
                            })
                        }
                    },
                    complete: function (res) {
                        wx.hideLoading();
                    },
                })
            break;
        }
    },
    // 跳转详情
    bindDetail: function (e) {
        var types = e.currentTarget.dataset.types;
        var index = e.currentTarget.dataset.index;
        var id = e.currentTarget.dataset.planid || e.currentTarget.dataset.cid || e.currentTarget.dataset.mid || e.currentTarget.dataset.did || e.currentTarget.dataset.propsid || e.currentTarget.dataset.placeid ;
        console.log(types, index, id)
        if (types == 1 || types == 3) {
            wx.navigateTo({
                url: '../../../page/index/texts/texts?types=' + types + '&index=' + index + '&id=' + id,
            })
        } else if (types == 2) {
            wx.navigateTo({
                url: '../../../page/index/intro/intro?index=' + index + '&id=' + id,
            })
        }
    }
})
