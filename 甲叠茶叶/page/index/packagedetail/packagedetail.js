const WxParse = require('../../../wxParse/wxParse.js');
const util = require('../../utils/util.js');
Page({

    data: {
        star:[1,1,1,1,1],
        curHdIndex:1, //tab切换
        flag_collect:0,//收藏判断 0 1
        pop_flag:false, //显示隐藏弹出层
        pop_anim:false //弹层过渡动画
    },
    onLoad: function (options) {
        util.showload('加载中');
        let that = this;
        let id = options.id;
        let date = util.now_time();
        wx.login({
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Taocan/detail',
                        data: {tao_id:id,code:res.code},
                        method: 'GET',
                        success: function(res) {
                            console.log(res);
                            util.for_each(res.data.time);
                            res.data.time[0].flag = 2;
                            let article = res.data.info.content;
                            WxParse.wxParse('article', 'html', article, that, 5);
                            that.setData({
                                id : res.data.info.id,//套餐id
                                store_id: res.data.info.store_id,//店铺id
                                store_name: res.data.info.store_name,//店铺名称
                                title:res.data.info.name,//套餐标题
                                banner:res.data.info.detail_img,//banner轮播
                                phone:res.data.phone,//电话
                                pop_img: res.data.info.img,//弹窗展示图
                                pop_name: res.data.info.name,//弹窗套餐名称
                                pop_money: res.data.info.money,//套餐价格
                                tags: res.data.time,//时间段
                                numbers: 1,//人数
                                date: date,//日期
                                time_tag: res.data.time[0].start + '--' + res.data.time[0].end,//默认时间段
                                flag_collect:res.data.collect, //收藏
                                finish : res.data.finish, //判断是否完善信息
                                login : res.data.login //判断是否登录
                            })
                            wx.hideLoading();
                        }
                    })
                }
            }
        })
    },
    // 预览图片
    bindPerview: function (e) {
        let url = e.currentTarget.dataset.url;
        let arr = this.data.banner;//当前图片数组
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: arr // 需要预览的图片http链接列表
        })
    },
    bindPhone:function(){
        let phone = this.data.phone;
        wx.makePhoneCall({
            phoneNumber: phone,
        })
    },
    // ===========收藏
    bindCollect: function () {
        let login = this.data.login;
        let finish = this.data.finish;
        if(login == 1){
            util.showload('加载中');
            let that = this;
            let id = this.data.id;
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.request({
                            url: util.host + '/Little/Taocan/collect',
                            data: { code: res.code, id: id },
                            method: 'GET',
                            success: function (res) {
                                // console.log(res);
                                wx.hideLoading();
                                if (res.data.status == 1) {
                                    util.showToast('收藏成功', () => {
                                        that.setData({
                                            flag_collect: 1
                                        })
                                    });
                                }
                                if (res.data.status == 0) {
                                    util.showToast('收藏失败', () => {
                                        that.setData({
                                            flag_collect: 0
                                        })
                                    });
                                }
                                if (res.data.status == 2) {
                                    util.showToast('取消收藏', () => {
                                        that.setData({
                                            flag_collect: 0
                                        })
                                    });
                                }
                                if (res.data.status == -2) {
                                    util.showToast('取消失败', () => {
                                        that.setData({
                                            flag_collect: 1
                                        })
                                    });
                                }
                            },
                        })
                    }
                },
            })
        }else{
            wx.showModal({
                title: '温馨提示',
                content: '您还未登录，请点击确认前往个人中心登录',
                showCancel: false,
                success: function (res) {
                    wx.switchTab({
                        url: '../../taber/mycenter/mycenter'
                    })
                }
            })
        }
    },
    //tab切换 评论 产品详情
    tabFun: function (e) {
        let that = this;
        let id = this.data.id;
        let current = e.currentTarget.dataset.id;
        this.setData({
            curHdIndex:current
        })
        util.showload('加载中');
        wx.request({
            url: util.host + '/Little/Taocan/qie',
            data: { tao_id: id, type: current},
            method: 'GET',
            success: function(res) {
                console.log(res);
                if (current == 1){
                    let article = res.data.info.content;
                    WxParse.wxParse('article', 'html', article, that, 5)
                } else if (current == 2){
                    that.setData({
                        star_all : res.data.z_p,
                        star_one : res.data.one_p,
                        star_two: res.data.two_p,
                        star_three: res.data.three_p,
                        star_four: res.data.four_p,
                        star_five: res.data.five_p,
                    })
                }
                wx.hideLoading();
            }
        })
    },
    //显示弹出层
    bindPop:function(e){
        let login = this.data.login;
        let finish = this.data.finish;
        if(login == 1){
            if(finish == 1){
                this.setData({
                    pop_flag: true
                })
                setTimeout(() => {
                    this.setData({
                        pop_anim: true
                    })
                }, 400);
            }else{
                wx.showModal({
                    title: '温馨提示',
                    content: '您还未完善信息，请点击确认前往完善信息，以便于您正常预约',
                    showCancel: false,
                    success: function (res) {
                        wx.navigateTo({
                            url: '../../mycenter/message/message'
                        })
                    }
                })
            }
        }else{
            wx.showModal({
                title: '温馨提示',
                content: '您还未登录，请点击确认前往个人中心登录',
                showCancel: false,
                success: function (res) {
                    wx.switchTab({
                        url: '../../taber/mycenter/mycenter'
                    })
                }
            })
        }
    },
    //隐弹出层
    hidePop:function(){
        this.setData({
            pop_anim: false
        })
        setTimeout(() => {
            this.setData({
                pop_flag: false
            })
        }, 400);
    },
    // 选择时间
    bindDate:function(e){
        this.setData({
            date: e.detail.value
        })
    },
    // 选择标签
    bindTags:function(e){
        let index = e.currentTarget.dataset.index;
        let tags = this.data.tags;
        util.for_each(tags);
        tags[index].flag = 2;
        this.setData({
            tags : tags,
            time_tag : tags[index].start + '--' + tags[index].end
        })
    },
    // 加减数字
    bindMinus: function () {
        let numbers = this.data.numbers;
        numbers--;
        if (numbers <= 1) {
            numbers = 1;
        }
        this.setData({
            numbers: numbers
        })
    },
    bindAdd:function(){
        let numbers = this.data.numbers;
        numbers++;
        if (numbers >= 6) {
            numbers = 6;
        }
        this.setData({
            numbers: numbers
        })
    },
    //确认
    bindTrue:function(){
        let login = this.data.login;
        let finish = this.data.finish;
        if(login == 1){
            if(finish == 1){
                let tags = this.data.tags;
                let new_arr = tags.filter((item) => {
                    return item.flag == 2;
                })
                let id = this.data.id;
                let time_start = new_arr[0].start;
                let time_end = new_arr[0].end;
                let date = this.data.date;
                let num = this.data.numbers;
                let money = this.data.pop_money;
                let store_id = this.data.store_id;
                let store_name = this.data.store_name;
                let title = this.data.title;
                wx.navigateTo({
                    url: '../createpackage/createpackage',
                    success: function () {
                        let orderlist = {
                            time_start: time_start,
                            time_end: time_end,
                            store_id: store_id,
                            store_name: store_name,
                            date: date,
                            num: num,
                            money: money,
                            title: title,
                            id: id
                        }
                        wx.setStorage({
                            key: 'list2',
                            data: orderlist,
                        })
                    }
                })
            }else{
                wx.showModal({
                    title: '温馨提示',
                    content: '您还未完善信息，请点击确认前往完善信息，以便于您正常预约',
                    showCancel: false,
                    success: function (res) {
                        wx.navigateTo({
                            url: '../../mycenter/message/message'
                        })
                    }
                })               
            }
        }else{
            wx.showModal({
                title: '温馨提示',
                content: '您还未登录，请点击确认前往个人中心登录',
                showCancel: false,
                success: function (res) {
                    wx.switchTab({
                        url: '../../taber/mycenter/mycenter'
                    })
                }
            })
        }
    }
})