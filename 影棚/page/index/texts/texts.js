var WxParse = require('../../../wxParse/wxParse.js');
var config = require('../../../app.js').config;
Page({
    data: {
        collect_flag:0
    },
    onLoad:function(options){
        this.setData({
            index : options.index,
            id: options.id
        })
        console.log(this.data.id,this.data.index);
        var that = this;
        var value = wx.getStorageSync('user');
        that.setData({
            user_id: value,
        })
        var user_id = that.data.user_id;
        var id = that.data.id;
        var index = Number(that.data.index);
        // console.log(that.data.user_id,that.data.id,that.data.index);
        switch (index) {
            case 0:    
                // 策划案例
                wx.request({
                    url: config.host + '/bz_video_wx/Plan/plan_work_detail.do',
                    data: { plan_id: id, user_id: user_id,id:id},
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        var article = res.data.plan_work_detail.content
                        WxParse.wxParse('article', 'html', article, that, 5);
                        console.log(res);
                        that.setData({
                            collect_flag: res.data.message,
                            total_price: res.data.plan_work_detail.price,
                            price: res.data.plan_work_detail.proprice
                        })
                        if (res.data.plan_collect.length !== 0) {
                            that.setData({
                                c_id: res.data.plan_collect[0].id
                            })
                        }
                        }
                })
                break;
            case 1:
                // 摄影师
                wx.request({
                    url: config.host + '/bz_video_wx/Camera/camera_work_detail.do',
                    data: { c_id: id, user_id: user_id, id: id},
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        var article = res.data.camera_work_detail.content
                        WxParse.wxParse('article', 'html', article, that, 5);
                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 2:
                // 模特
                wx.request({
                    url: config.host + '/bz_video_wx/Model/model_work_detail.do',
                    data: { m_id: id, user_id: user_id, id: id},
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        var article = res.data.dress_work_detail.content
                        WxParse.wxParse('article', 'html', article, that, 5);

                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 3:
                // 化妆师简历
                wx.request({
                    url: config.host + '/bz_video_wx/Dresser/dress_work_detail.do',
                    data: { d_id: id, user_id: user_id, id: id },
                    method: 'GET',
                    success: function (res) {
                        var article = res.data.dress_work_detail.content
                        WxParse.wxParse('article', 'html', article, that, 5);

                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 4:
                //道具
                wx.request({
                    url: config.host + '/bz_video_wx/Props/props_detail.do',
                    data: { props_id: id, user_id: user_id, id: id},
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        var article = res.data.props_detail.content;
                        WxParse.wxParse('article', 'html', article, that, 5);
                        that.setData({
                            collect_flag: res.data.message,
                            name: res.data.props_detail.name,
                            money: res.data.props_detail.num,
                            id: res.data.props_detail.id
                        })
                        if (res.data.props_collect.length !== 0) {
                            that.setData({
                                c_id: res.data.props_collect[0].id
                            })
                        }
                    }
                })
                break;
            case 5:
                // 场景
                wx.request({
                    url: config.host + '/bz_video_wx/Place/place_detail.do',
                    data: { place_id: id, user_id: user_id, id: id },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        var article = res.data.place_detail.content
                        WxParse.wxParse('article', 'html', article, that, 5);
                        that.setData({
                            collect_flag: res.data.message
                        })
                        if (res.data.place_collect.length !== 0) {
                            that.setData({
                                c_id: res.data.place_collect[0].id
                            })
                        }
                    }
                })
                break;
            case 6:
                // 咨询
                break;
        }
        var types = options.types;
        this.setData({
            types : types
        })
    },
    // 预约
    bindAppoint: function (e) {
        var name = e.currentTarget.dataset.name;
        var money = e.currentTarget.dataset.money;
        var id = e.currentTarget.dataset.id;
        var index = this.data.index;
        wx.navigateTo({
            url: '../appoint/appoint?name=' + name + '&money=' + money + '&id=' + id + '&index=' + index,
        })
    },
    //收藏
    bindCollect:function(){
        var that = this;
        var flag = this.data.collect_flag;
        var index = Number(this.data.index);
        var user_id = this.data.user_id;
        var c_id = this.data.c_id;
        var id = this.data.id;
        if (flag === 0) {
            switch (index) {
                case 0:
                    // 策划案例
                    wx.request({
                        url: config.host + '/bz_video_wx/Collect/ins_plan_collect.do',
                        data: { user_id: user_id, plan_id: id },
                        method: 'POST',
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        success: function (res) {
                            console.log(res);
                            wx.showToast({
                                title: '收藏成功',
                                icon: 'none',
                                mask: true,
                            })
                            that.setData({
                                collect_flag: 1,
                                c_id: res.data.collect.id
                            })
                        }
                    })
                    break;
                case 4:
                    // 道具
                    wx.request({
                        url: config.host + '/bz_video_wx/Collect/ins_props_collect.do',
                        data: { user_id: user_id, props_id: id },
                        method: 'POST',
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        success: function (res) {
                            console.log(res);
                            wx.showToast({
                                title: '收藏成功',
                                icon: 'none',
                                mask: true,
                            })
                            that.setData({
                                collect_flag: 1,
                                c_id: res.data.collect.id
                            })
                        }
                    })
                    break;
                case 5:
                    // 场景
                    wx.request({
                        url: config.host + '/bz_video_wx/Collect/ins_place_collect.do',
                        data: { user_id: user_id, place_id: id },
                        method: 'POST',
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        success: function (res) {
                            console.log(res);
                            wx.showToast({
                                title: '收藏成功',
                                icon: 'none',
                                mask: true,
                            })
                            that.setData({
                                collect_flag: 1,
                                c_id: res.data.collect.id
                            })
                        }
                    })
                    break;
            }
        } else {
            switch (index) {
                case 0:
                    // 策划案例
                    wx.request({
                        url: config.host + '/bz_video_wx/Collect/del_plan_collect.do',
                        data: { id: c_id },
                        method: 'POST',
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        success: function (res) {
                            wx.showToast({
                                title: '取消收藏',
                                icon: 'none',
                                mask: true,
                            })
                            that.setData({
                                collect_flag: 0
                            })
                        },
                    })
                    break;
                case 4:
                    // 道具
                    wx.request({
                        url: config.host + '/bz_video_wx/Collect/del_props_collect.do',
                        data: { id: c_id },
                        method: 'POST',
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        success: function (res) {
                            wx.showToast({
                                title: '取消收藏',
                                icon: 'none',
                                mask: true,
                            })
                            that.setData({
                                collect_flag: 0
                            })
                        },
                    })
                    break;
                case 5:
                    // 场景
                    wx.request({
                        url: config.host + '/bz_video_wx/Collect/del_place_collect.do',
                        data: { id: c_id },
                        method: 'POST',
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        success: function (res) {
                            wx.showToast({
                                title: '取消收藏',
                                icon: 'none',
                                mask: true,
                            })
                            that.setData({
                                collect_flag: 0
                            })
                        },
                    })
                    break;
            }
        }
    },
    bindBuy:function(){
        var id = this.data.id;
        var user_id = this.data.user_id;
        var total_price = this.data.total_price;
        var price = this.data.price;
        console.log(id,user_id,total_price, price)
        wx.request({
            url: config.host + '/bz_video_wx/Plan_appointment/ins_plan_app.do',
            data: { plan_id: id, user_id: user_id, pay_money: total_price, prepay_money: price},
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            success: function (res) {
                console.log(res);
                wx.navigateBack({
                    delta: 1,
                })
            }
        })
    }
})