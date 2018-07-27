//myCoupon.js
Page({
    data: {
        empty:1,
        flag_checked:1
    },

    onLoad: function (options) {
        var that = this;
        var type_id = options.typeid;
        this.setData({
            currentIndex : options.typeid
        })
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Center/coupons',
                        data: { code: ress.code, type: options.typeid},
                        method: 'GET',
                        success: function (res) {
                            console.log(res)
                            if(res.data.info == 1){
                                that.setData({
                                    empty:2
                                })
                            }else{
                                that.setData({
                                    empty: 1,
                                    list: res.data.info
                                })
                            }

                        },
                        complete: function (res) {

                        }
                    })
                }
            }
        })
    },
    //跳转内页
    bindDetail: function (e) {
        var coupon_id = e.currentTarget.dataset.couponid;
        wx.navigateTo({
            url: '../detail/detail?couponid=' + coupon_id,
        })
    },
    // tab切换
    tabs:function(e){
        var that = this;
        var index = e.currentTarget.dataset.id;
        this.setData({ currentIndex:index})
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Center/coupons',
                        data: { code: ress.code, type: index },
                        method: 'GET',
                        success: function (res) {
                            console.log(res)
                            if (res.data.info == 1) {
                                that.setData({
                                    empty: 2
                                })
                            } else {
                                that.setData({
                                    empty: 1,
                                    list: res.data.info
                                })
                            }

                        },
                        complete: function (res) {

                        }
                    })
                }
            }
        })
    },
    // 管理
    bindManage:function(){
        var list = this.data.list;
        list.map(function (value, item, array) {
            return list[item].del_checked = 1;
        })
        this.setData({
            flag_checked:2,
            list: list
        })
    },
    //取消
    bindCancel:function(){
        this.setData({
            flag_checked: 1
        })        
    },
    //选中删除
    bindChecked:function(e){
        var current = e.currentTarget.dataset.id;
        var list = this.data.list;
        if (list[current].del_checked == 1){
            list[current].del_checked = 2;
        }else{
            list[current].del_checked = 1;
        }
        this.setData({ list: list})
        console.log(this.data.list);
    },
    //删除
    bindDelete:function(){
        var that = this;
        var currentIndex = this.data.currentIndex;
        var list = this.data.list;
        console.log(list);
        var checked = list.every(function(value,index,array){
            return value.del_checked == 1;
        })
        if(checked){
            wx.showToast({
                title: '未选择优惠券',
            })
        }else{
            wx.showLoading({
                title: '删除中',
            })
            var arrays = [];
            var lists = list.filter(function (value, index, array){
                if (list[index].del_checked == 2){
                    arrays.push(list[index].id);
                }
            })
            wx.login({
                success:function(ress){
                    if(ress.code){
                        wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Center/coupons_del',
                            data: { code: ress.code, type: currentIndex, id: arrays},
                            method: 'GET',
                            success: function (res) {
                                if(res.data == 2){
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '删除失败',
                                    })
                                } else if (res.data.info == 1){
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '删除成功',
                                    })
                                    that.setData({
                                        empty:2
                                    })
                                }else{
                                    var list = res.data.info;
                                    list.map(function (value, item, array) {
                                        return list[item].del_checked = 1;
                                    })
                                    that.setData({
                                        list: list
                                    })
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '删除成功',
                                    })
                                }

                             },
                            fail: function (res) { },
                            complete: function (res) { 
                               
                            }
                        })
                    }
                }
            })
        }
    }
})
