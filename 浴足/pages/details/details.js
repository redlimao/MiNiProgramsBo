//details.js
var WxParse = require('../../wxParse/wxParse.js');
Page({
    data: {
        collect_flag : '',
        menu_flag : 1,
        phone:'13669265103',
        shop_id:'',
        user_id : ''
    },

    onLoad: function (options) {
        //获取商品id
        this.data.shop_id = options.id;
        var that = this;
        // console.log(this.data.shop_id)
        wx.login({
            success: function(ress) {
                if(ress.code){
                    wx.showLoading({
                        title: '加载中',
                    })
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Info/index',
                        data: { code: ress.code, id: that.data.shop_id},
                        method: "GET",
                        success:function(res){
                            console.log(res)
                            var article = res.data.info[0].intro
                            WxParse.wxParse('article', 'html', article, that, 5) 
                            that.setData({
                                you_counts : res.data.you_counts,
                                name : res.data.info[0].name,
                                img: res.data.info[0].img,
                                fu_list: res.data.info[0].fu_list,
                                moneys_one: res.data.info[0].moneys_one,
                                moneys_two: res.data.info[0].moneys_two,
                                zong: res.data.ping_counts.zong,
                                great_one: res.data.ping_counts.great_one,
                                great_two: res.data.ping_counts.great_two,
                                great_three: res.data.ping_counts.great_three,
                                ping_info:res.data.ping_info,
                                collect_flag:res.data.shou,
                                phone:res.data.info[0].phone,
                                user_id:res.data.user_id
                            })
                        },            
                        complete: function () {
                            wx.hideLoading();
                        }

                    })
                }
            }
        })
    },
    //跳传到优惠券页面
    bindCoupon:function(){
        var id = this.data.user_id;
        wx.navigateTo({
            url: '../couponlist/couponlist?id=' + id,
        })
    },
    //咨询电话
    bindPhone:function(){
        wx.makePhoneCall({
            phoneNumber: this.data.phone,
        })
    },
    // 项目详情订单详情切换
    bindMenu:function(e){
        var that = this;
        this.setData({
            menu_flag: e.currentTarget.dataset.id
        })
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Info/info_xu',
            data: { type: e.currentTarget.dataset.id, id: this.data.shop_id},
            method: "GET",
            success:function(res){
                // console.log(res);
                var article = res.data.info.intro
                WxParse.wxParse('article', 'html', article, that, 5) 
            }
        })
    },
    bindCollect:function(){
        // 未收藏collect为1，已收藏为2
        var collect_flag = this.data.collect_flag;
        var that = this;
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Collect/index',
                        data: { code: ress.code, id: that.data.shop_id },
                        method: "GET",
                        success:function(res){
                            console.log(res);
                            if (res.data == 2) {
                                that.setData({
                                    collect_flag: 1
                                })
                                wx.showToast({
                                    title: '收藏成功',
                                    duration: 1000
                                })
                            } else {
                                that.setData({
                                    collect_flag: 2
                                })
                                wx.showToast({
                                    title: '取消收藏',
                                    duration: 1000
                                })
                            }
                        }
                    })
                }
            }
        })
    },
    // 全部评价
    bindAllcomments:function(){
        if (this.data.ping_info != 1){
            var id = this.data.shop_id;
            // console.log(id);
            wx.navigateTo({
                url: '../allcomments/allcomments?id=' + id + '&current=1',
            })
        }
    },
    //跳转到对应的评价
    bindTag:function(e){
        var id = this.data.shop_id;
        var current = e.currentTarget.dataset.id;
        // console.log(id);
        wx.navigateTo({
            url: '../allcomments/allcomments?id=' + id + '&current=' + current,
        })
    },
    // 下单
    bindAppoint:function(e){
        var user_id = e.currentTarget.dataset.userid;
        var id = this.data.shop_id;
        console.log(user_id);
        wx.navigateTo({
            url: '../appointmentdetails/appointmentdetails?id=' + id + '&userid=' + user_id,
        })
    }
})
