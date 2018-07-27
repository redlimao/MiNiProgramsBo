const util = require('../../utils/util.js');
//index.js
Page({
    data: {
        store_index:0,
        numbers:1, //数量默认值
        current : 1,
        input_txt:''
    },
    onLoad:function(){
        util.showload('加载中');
        let that = this;
        wx.login({
            success: function(res) {
                // console.log(res);
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Company/index',
                        data: {code:res.code},
                        method: 'GET',
                        success: function(res) {
                            // console.log(res);
                            let date = util.now_time();
                            //初始化列表 flag = 1
                            util.for_each(res.data.list.time);
                            res.data.list.time[0].flag = 2;
                            that.setData({
                                date: date,
                                pop_flag : res.data.user,
                                logo:res.data.tan[0],
                                pop_text:res.data.tan[1],
                                img:res.data.list.lun,
                                company:res.data.list.company,
                                conpany_list: res.data.list.company,
                                tags: res.data.list.time
                            })
                            wx.hideLoading();
                        }
                    })
                }
            }
        })
    },
    //轮播跳转
    bindImgDetail:function(e){
        let id = e.currentTarget.id;
        let status = e.currentTarget.dataset.status;
        if(status == 1){
            wx.navigateTo({
                url: '../../shop/shopdetails/shopdetails?id=' + id,
            })
        }else{
            wx.navigateTo({
                url: '../../index/packagedetail/packagedetail?id=' + id,
            })
        }
    },
    bindInput: function (e) {
        this.setData({
            input_txt: e.detail.value
        })
    },
    // =====获取用户头像与昵称；
    getUserInfo: function (e) {
        let that = this;
        let types = e.currentTarget.dataset.types;
<<<<<<< HEAD
        if (types == 1) {
            if (e.detail.errMsg == 'getUserInfo:fail auth deny'){
=======
        if(types == 1){
            wx.login({
                success: function (ress) {
                    // console.log(ress.code)
                    wx.request({
                        url: util.host + '/Little/Company/cun',
                        data: { code: ress.code, name: nickName, img: avatarUrl},
                        method: "GET",
                        success: function (res) {
                            console.log(res);
                            that.setData({
                                pop_flag:1
                            })
                        }
                    })
                }
            })
        }else{
            if (input_txt == ''){
                util.showToast('您未输入邀请码。')
            }else{
>>>>>>> 4c684fdf688fdac92cd072e92aa387e4cf6d6c6b
                wx.login({
                    success: function (ress) {
                        // console.log(ress.code)
                        wx.request({
                            url: util.host + '/Little/Company/cun',
                            data: { code: ress.code },
                            method: "GET",
                            success: function (res) {
                                // console.log(res);
                                that.setData({
                                    pop_flag: 1
                                })
                                wx.showModal({
                                    title: '温馨提示',
                                    content: '您已拒绝微信授权，请点击确认跳转到个人中心后在授权管理打开授权,以便于进行小程序的相关操作',
                                    showCancel: false,
                                    success: function (res) {
                                        wx.switchTab({
                                            url: '../../taber/mycenter/mycenter'
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }else{
                let avatarUrl = e.detail.userInfo.avatarUrl;
                let nickName = e.detail.userInfo.nickName;
                wx.login({
                    success: function (res) {
                        // console.log(res.code)
                        wx.request({
                            url: util.host + '/Little/Company/cun',
                            data: { code: res.code, name: nickName, img: avatarUrl },
                            method: "GET",
                            success: function (res) {
                                console.log(res);
                                that.setData({
                                    pop_flag: 1
                                })
                            }
                        })
                    }
                })
            }
        } else {
            if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
                wx.login({
                    success: function (res) {
                        // console.log(ress.code)
                        wx.request({
                            url: util.host + '/Little/Company/cun',
                            data: { code: res.code },
                            method: "GET",
                            success: function (res) {
                                // console.log(res);
                                that.setData({
                                    pop_flag: 1
                                })
                                wx.showModal({
                                    title: '温馨提示',
                                    content: '您已拒绝微信授权，请点击确认跳转到个人中心后在授权管理打开授权,以便于进行小程序的相关操作',
                                    showCancel: false,
                                    success: function (res) {
                                        wx.switchTab({
                                            url: '../../taber/mycenter/mycenter'
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                let avatarUrl = e.detail.userInfo.avatarUrl;
                let nickName = e.detail.userInfo.nickName;
                let input_txt = this.data.input_txt;
                if (input_txt == '') {
                    util.showToast('您未输入邀请码。')
                } else {
                    wx.login({
                        success: function (ress) {
                            console.log(ress.code)
                            wx.request({
                                url: util.host + '/Little/Company/cun',
                                data: { code: ress.code, name: nickName, img: avatarUrl, sence: input_txt},
                                method: "GET",
                                success: function (res) {
                                    console.log(res);
                                    that.setData({
                                        pop_flag: 1
                                    })
                                }
                            })
                        }
                    })
                }
            }
        }
    },
    //进入详情
    bindStoreDetail:function(e){
        let id = e.currentTarget.id;
        wx.navigateTo({
            url: '../../index/storedetail/storedetail?id=' + id,
        })
    },
    // 固定套餐跳转详情
    bindDetail:function(e){
        let id = e.currentTarget.id;
        wx.navigateTo({
            url: '../../index/packagedetail/packagedetail?id=' + id
        })
    },
    //菜单切换
    bindTap:function(e){
        util.showload('加载中');
        let that = this;
        let index = e.currentTarget.dataset.index;
        this.setData({
            current : index
        })
        wx.request({
            url: util.host + '/Little/Company/qie_taocan',
            data: { type:index},
            method: 'GET',
            success: function(res) {
                // console.log(res);
                if(index == 2){
                    that.setData({
                        list:res.data.list
                    })
                }else{
                    util.for_each(res.data.list.time);
                    res.data.list.time[0].flag = 2;
                    that.setData({
                        conpany_list: res.data.list.company,
                        tags: res.data.list.time
                    })
                }
                wx.hideLoading();
            }
        })
    },
    // 选择店铺
    bindStore:function(e){
        var index = e.detail.value;
        this.setData({
            store_index : index
        })
    },
    // 选择时间
    bindDate: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    // 选择标签
    bindTags: function (e) {
        let index = e.currentTarget.dataset.index;
        let tags = this.data.tags;
        util.for_each(tags);
        tags[index].flag = 2;

        this.setData({
            tags: tags
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
    bindAdd: function () {
        let numbers = this.data.numbers;
        numbers++;
        if (numbers >= 6) {
            numbers = 6;
        }
        this.setData({
            numbers: numbers
        })
    },
    bindnext:function(e){
        let that = this;
        util.showload('加载中');
        wx.login({
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Company/login',
                        data: {code:res.code},
                        method: 'GET',
                        success: function (res) {
                            wx.hideLoading();
                            // console.log(res);
                            let login = res.data.login;
                            let finish = res.data.finish;
                            if (login == 1) {
                                if (finish == 1) {
                                    let tags = that.data.tags;
                                    let new_arr = tags.filter((item) => {
                                        return item = 2;
                                    })
                                    let time_start = new_arr[0].start;
                                    let time_end = new_arr[0].end;
                                    let store_id = that.data.company[that.data.store_index].id;
                                    let store_name = that.data.company[that.data.store_index].name;
                                    let date = that.data.date;
                                    let num = that.data.numbers;
                                    // console.log(time_start, time_end, store_id, date, num)
                                    wx.navigateTo({
                                        url: '../../index/tagdetail/tagdetail?storeid=' + store_id + '&date=' + date + '&timestart=' + time_start + '&timeend=' + time_end + '&num=' + num + '&storename=' + store_name
                                    })
                                } else {
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
                            } else {
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
                }
            }
        })
    },
    // ========分享
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: '甲叠茶叶',
            path: '/page/taber/index/index',
            success: function (res) {
                wx.showToast({
                    title: '转发成功',
                    icon: 'success',
                    mask: true,
                })
            },
            fail: function () {
                wx.showToast({
                    title: '转发失败',
                    mask: true,
                })
            }
        }
    }
})
