//index.js
var config = require('../../../app.js').config;
Page({
    data: {
        flag_pop:false, //控制弹出层是否隐藏 true为不隐藏 false为隐藏
        tag:[],
        empty:1
    },
    onLoad:function(options){
        wx.showLoading({
            title: '加载中',
            mask: true,
        })
        var that = this;
        var index = Number(options.index);
        var types = options.types
        console.log(types);
        this.setData({
            index : index,
            types: types
        })
        switch (index) {
            case 0:
                // 策划案例
                wx.setNavigationBarTitle({
                    title: '策划案例'
                })
                wx.request({
                    url: config.host + '/bz_video_wx/Plan/plan_work_list.do',
                    data: {},
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        if (res.data.plan_work_list.length === 0){
                            that.setData({
                                empty : 2
                            })
                        }else{
                            res.data.plan_work_list.forEach(function (item, index, array) {
                                item.index = 0;
                            })
                            that.setData({
                                list: res.data.plan_work_list,
                                tags: res.data.selectList,
                                empty: 1
                            })
                            that.data.tags.forEach(function (item, index, array) {
                                item.flag = false;
                            })
                        }
                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 1:
                // 摄影师
                wx.setNavigationBarTitle({
                    title: '摄影师'
                })
                wx.request({
                    url: config.host + '/bz_video_wx/Camera/camera_list.do',
                    data: {},
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        if (res.data.camlist.length === 0) {
                            that.setData({
                                empty: 2
                            })
                        } else {
                            that.setData({
                                list: res.data.camlist,
                                tags: res.data.camera_flg,
                                empty: 1
                            })
                            that.data.tags.forEach(function (item, index, array) {
                                item.flag = false;
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
                wx.setNavigationBarTitle({
                    title: '模特'
                })
                wx.request({
                    url: config.host + '/bz_video_wx/Model/model_list.do',
                    data: {},
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                        if (res.data.modelist.length === 0) {
                            that.setData({
                                empty: 2
                            })
                        } else {
                            that.setData({
                                list: res.data.modelist,
                                tags: res.data.selectList,
                                empty: 1
                            })
                            that.data.tags.forEach(function (item, index, array) {
                                item.flag = false;
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
                wx.setNavigationBarTitle({
                    title: '化妆师'
                })
                wx.request({
                    url: config.host + '/bz_video_wx/Dresser/dresser_list.do',
                    data: {},
                    method: 'GET',
                    success: function (res) {
                        if (res.data.dresser_list.length === 0) {
                            that.setData({
                                empty: 2
                            })
                        }else{
                            that.setData({
                                list: res.data.dresser_list,
                                tags: res.data.selectList,
                                empty: 1
                            })
                            that.data.tags.forEach(function (item, index, array) {
                                item.flag = false;
                            })
                            console.log(that.data.tags);
                        }
                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 4:
                // 道具
                wx.setNavigationBarTitle({
                    title: '道具'
                })
                wx.request({
                    url: config.host + '/bz_video_wx/Props/props_list.do',
                    data: {},
                    method: 'GET',
                    success: function (res) {
                        res.data.propslist.forEach(function (item, index, array) {
                            item.index = 4;
                        })
                        if (res.data.propslist.length === 0) {
                            that.setData({
                                empty: 2
                            })
                        } else {
                            that.setData({
                                list: res.data.propslist,
                                tags: res.data.selectList,
                                empty: 1
                            })
                            that.data.tags.forEach(function (item, index, array) {
                                item.flag = false;
                            })
                        }
                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 5:
                // 场景
                wx.setNavigationBarTitle({
                    title: '场景'
                })
                wx.request({
                    url: config.host + '/bz_video_wx/Place/place_list.do',
                    data: {},
                    method: 'GET',
                    success: function (res) {
                        res.data.placelist.forEach(function (item, index, array) {
                            item.index = 5;
                        })
                        if (res.data.placelist.length === 0) {
                            that.setData({
                                empty: 2
                            })
                        } else {
                            that.setData({
                                list: res.data.placelist,
                                tags: res.data.selectList,
                                empty: 1
                            })
                            that.data.tags.forEach(function (item, index, array) {
                                item.flag = false;
                            })
                            console.log(that.data.tags);
                        }
                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 6:
                // 咨询
                wx.setNavigationBarTitle({
                    title: '咨询'
                })
                break;
        }
    },
    // 显示弹出层
    bindShowPop:function(){
        this.setData({
            flag_pop : true
        })
    },
    // 隐藏弹出层
    bindHidePop: function () {
        this.setData({
            flag_pop: false
        })
    },
    // 选择标签
    bindTag: function (e) {
        var index = e.currentTarget.dataset.index;
        var tags = this.data.tags;
        var types = this.data.types;
        if(types == 3){
            tags.forEach(function(item,index,array){
                item.flag = false;
            })
            tags[index].flag = true;
        }else{
            if (tags[index].flag) {
                tags[index].flag = false;
            } else {
                tags[index].flag = true;
            }
        }
        this.setData({
            tags : tags
        })
    },
    //提交
    bindTrue:function(){
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        var that = this;
        var tags = this.data.tags;//全部标签
        var index = this.data.index;//区分6大类
        var arr_tags = [];//存放标签
        var arr_code = '';//存放标签码
        var arr = tags.filter(function(item,index,array){
           return item.flag;
        })
        if(arr.length == 0){
            wx.showToast({
                title: '未选择标签',
                icon: 'none',
                mask: true,
            })
        }else{
            tags.forEach(function(item,index,array){
                if(item.flag){
                    arr_tags.push(item.code2_name);
                    // arr_code.push(item.code_2 + ',');
                    arr_code += (item.code_2 +',');
                }
            })
            this.setData({
                flag_pop: false,
                tag: arr_tags
            })
        }
        console.log(arr_tags, arr_code);
        switch (index) {
            case 0:
                // 策划案例
                wx.setNavigationBarTitle({
                    title: '策划案例'
                })
                wx.request({
                    url: config.host + '/bz_video_wx/Plan/plan_work_list_tag.do',
                    data: { tag: arr_code},
                    method: 'GET',
                    success: function (res) {
                        if (res.data.plan_work_list.length === 0) {
                            that.setData({
                                empty: 2
                            })
                        } else {
                            that.setData({
                                list: res.data.plan_work_list,
                                empty : 1
                            })
                        }

                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 1:
                // 摄影师
                wx.setNavigationBarTitle({
                    title: '摄影师'
                })
                wx.request({
                    url: config.host + '/bz_video_wx/Camera/camera_list_tag.do',
                    data: { tag:arr_code},
                    method: 'GET',
                    success: function (res) {
                        if (res.data.camlist_tag.length === 0) {
                            that.setData({
                                empty: 2
                            })
                        } else {
                            that.setData({
                                list: res.data.camlist_tag,
                                empty: 1
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
                wx.setNavigationBarTitle({
                    title: '模特'
                })
                wx.request({
                    url: config.host + '/bz_video_wx/Model/model_list_tag.do',
                    data: { tag: arr_code},
                    method: 'GET',
                    success: function (res) {
                        if (res.data.modelist.length === 0) {
                            that.setData({
                                empty: 2
                            })
                        } else {
                            that.setData({
                                list: res.data.modelist,
                                empty: 1
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
                wx.setNavigationBarTitle({
                    title: '化妆师'
                })
                wx.request({
                    url: config.host + '/bz_video_wx/Dresser/dress_list_tag.do',
                    data: { tag: arr_code },
                    method: 'GET',
                    success: function (res) {
                        if (res.data.dress_list_tag.length === 0) {
                            that.setData({
                                empty: 2
                            })
                        } else {
                            that.setData({
                                list: res.data.dress_list_tag,
                                empty: 1
                            })
                        }

                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 4:
                //道具
                wx.setNavigationBarTitle({
                    title: '道具'
                })
                wx.request({
                    url: config.host + '/bz_video_wx/Props/props_list_tag.do',
                    data: { tag: arr_code },
                    method: 'GET',
                    success: function (res) {
                        if (res.data.props_list_tag.length === 0) {
                            that.setData({
                                empty: 2
                            })
                        } else {
                            that.setData({
                                list: res.data.props_list_tag,
                                empty: 1
                            })
                        }
                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 5:
                // 场景
                wx.setNavigationBarTitle({
                    title: '场景'
                })
                wx.request({
                    url: config.host + '/bz_video_wx/Place/place_list_tag.do',
                    data: { tag: arr_code },
                    method: 'GET',
                    success: function (res) {
                        if (res.data.place_list_tag.length === 0) {
                            that.setData({
                                empty: 2
                            })
                        } else {
                            that.setData({
                                list: res.data.place_list_tag,
                                emety:1
                            })
                        }
                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
                break;
            case 6:
                // 咨询
                wx.setNavigationBarTitle({
                    title: '咨询'
                })
                break;
        }
    },
    // 跳转到详情
    bindDetail:function(e){
        var types = this.data.types;
        var index = e.currentTarget.dataset.index;
        var id = e.currentTarget.dataset.id;
        if (types == 1 || types == 3 || types == 4) {
            wx.navigateTo({
                url: '../../index/texts/texts?types=' + types + '&index=' + index + '&id=' + id,
            })
        } else {
            wx.navigateTo({
                url: '../../index/intro/intro',
            })
        }
    }
})
