//index.js
var WxParse = require('../../../wxParse/wxParse.js');
var config = require('../../../app.js').config;
Page({
    data: {
        current:1,
        collect_flag:0 //判断是否收藏 0为未收藏 1为收藏
    },
    onLoad:function(options){
        var that = this;
        this.setData({
            index: options.index,
            id:options.id
        })
        var value = wx.getStorageSync('user');
        that.setData({
            user_id: value,
        })
        var user_id = that.data.user_id;
        var id = that.data.id;
        var index = Number(that.data.index);
        switch (index) {
            case 1:
                // 摄影师
                wx.request({
                    url: config.host + '/bz_video_wx/Camera/camera_detail.do',
                    data: { user_id:user_id,id:id,c_id:id},
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        var article = res.data.camera_detail.content
                        WxParse.wxParse('article', 'html', article, that, 5);
                        that.setData({
                            id: res.data.camera_detail.id,
                            name:res.data.camera_detail.name,
                            photo: res.data.camera_detail.photo,
                            collect_flag: res.data.message,
                            age : res.data.camera_detail.age,
                            sex: res.data.camera_detail.sex,
                            money: res.data.camera_detail.value
                        })
                        if (res.data.camera_collect.length !== 0) {
                            that.setData({
                                c_id: res.data.camera_collect[0].id
                            })
                        }
                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 2:
                // 模特
                wx.request({
                    url: config.host + '/bz_video_wx/Model/model_detail.do',
                    data: { user_id: user_id, id: id, m_id: id },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        var article = res.data.model_detail.content
                        WxParse.wxParse('article', 'html', article, that, 5);
                        that.setData({
                            name: res.data.model_detail.name,
                            photo: res.data.model_detail.photo,
                            collect_flag: res.data.message,
                            age: res.data.model_detail.age,
                            sex: res.data.model_detail.sex
                        })
                        if (res.data.model_collect.length !== 0) {
                            that.setData({
                                c_id: res.data.model_collect[0].id
                            })
                        }
                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 3:
                // 化妆师简历
                wx.request({
                    url: config.host + '/bz_video_wx/Dresser/dresser_detail.do',
                    data: { user_id: user_id, id: id, d_id: id },
                    method: 'GET',
                    success: function (res) {
                        var article = res.data.dresser_detail.content
                        WxParse.wxParse('article', 'html', article, that, 5);
                        that.setData({
                            name: res.data.dresser_detail.name,
                            photo: res.data.dresser_detail.photo,
                            collect_flag: res.data.message,
                            age: res.data.dresser_detail.age,
                            sex: res.data.dresser_detail.sex
                        })
                        if (res.data.dresser_collect.length!==0){
                            that.setData({
                                c_id: res.data.dresser_collect[0].id
                            })
                        }
                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
        }
  
    },
    //菜单切换
    bindTap:function(e){
        var that = this;
        var c_index = e.currentTarget.dataset.index;
        var index = Number(this.data.index);
        this.setData({
            current: c_index
        })
        console.log(index)
        if(c_index == 2){
            wx.showLoading({
                title: '加载中',
                mask: true,
            })
            var id = e.currentTarget.dataset.id;
            switch (index) {
                case 1:
                    // 摄影师
                    wx.request({
                        url: config.host + '/bz_video_wx/Camera/camera_work_list.do',
                        data: { c_id: id },
                        method: 'GET',
                        success: function (res) {
                            res.data.camera_work_list.forEach(function(item,index,array){
                                item.index = 1
                            })
                            that.setData({
                                list: res.data.camera_work_list
                            })
                        },
                        complete: function (res) {
                            wx.hideLoading();
                        },
                    })
                    break;
                case 2:
                    // 模特
                    wx.request({
                        url: config.host + '/bz_video_wx/Model/model_work_list.do',
                        data: { m_id: id },
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                            res.data.model_work_list.forEach(function (item, index, array) {
                                item.index = 2
                            })
                            that.setData({
                                list: res.data.model_work_list
                            })
                        },
                        complete: function (res) {
                            wx.hideLoading();
                        },
                    })
                    break;
                case 3:
                    // 化妆师简历
                    wx.request({
                        url: config.host + '/bz_video_wx/Dresser/dresser_work_list.do',
                        data: { d_id: id },
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                            res.data.dresser_work_list.forEach(function (item, index, array) {
                                item.index = 3
                            })
                            that.setData({
                                list: res.data.dresser_work_list
                            })
                        },
                        complete: function (res) {
                            wx.hideLoading();
                        },
                    })
                    break;
            }
        }else{
        }
    },
    // 收藏
    bindCollect:function(){
        var that = this;
        var flag = this.data.collect_flag;
        var index = Number(this.data.index);
        var user_id = this.data.user_id;
        var c_id = this.data.c_id;
        var id = this.data.id;
        if(flag === 0){            
            switch (index) {
                case 1:
                    // 摄影师
                    wx.request({
                        url: config.host + '/bz_video_wx/Collect/ins_camera_collect.do',
                        data: { user_id: user_id, c_id: id},
                        method: 'POST',
                        header: { 'content-type': 'application/x-www-form-urlencoded'},
                        success: function (res) {
                            console.log(res);
                            wx.showToast({
                                title: '收藏成功',
                                icon: 'none',
                                mask: true,
                            })
                            that.setData({
                                collect_flag: 1,
                                c_id :res.data.collect.id
                            })
                        }
                    })
                    break;
                case 2:
                    // 模特
                    wx.request({
                        url: config.host + '/bz_video_wx/Collect/ins_model_collect.do',
                        data: { user_id: user_id, m_id: id },
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
                case 3:
                    // 化妆师简历
                    wx.request({
                        url: config.host + '/bz_video_wx/Collect/ins_dresser_collect.do',
                        data: { user_id: user_id, d_id: id },
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
        }else{
            switch (index) {
                case 1:
                    // 摄影师
                    wx.request({
                        url: config.host + '/bz_video_wx/Collect/del_camera_collect.do',
                        data: { id: c_id},
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
                case 2:
                    // 模特
                    wx.request({
                        url: config.host + '/bz_video_wx/Collect/del_model_collect.do',
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
                case 3:
                    // 化妆师简历
                    wx.request({
                        url: config.host + '/bz_video_wx/Collect/del_dresser_collect.do',
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
    // 跳转详情
    bindDetail:function(e){
        var index = this.data.index;
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../texts/texts?types=2&index=' + index + '&id=' + id,
        })
    },
    // 预约
    bindAppoint: function (e) {
        var index = this.data.index;
        var name = this.data.name;
        var money = this.data.money;
        var id = this.data.id;
        wx.navigateTo({
            url: '../appoint/appoint?index=' + index + '&name=' + name + '&money=' + money +'&id=' + id
        })
    }
})
