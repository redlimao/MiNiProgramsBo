// pages/shoplist/shoplist.js
const util = require('../../utils/util.js')
Page({
    data: {
        pop_flag : 1,
        currpage:1,
        coupons:1
    },

    onLoad: function (options) {
        util.showload('加载中');
        let id = options.id;
        this.setData({
            id:id
        })
        let that = this;
        wx.request({
            url: util.host + '/Little/Goods/indexs',
            data: { id: id },
            method: 'GET',
            success: function (res) {
                // console.log(res);
                // 获取商品
                if (res.data.goods == 1) {
                    that.setData({
                        empty: 2,
                    })
                } else {
                    that.setData({
                        list: res.data.goods,
                        empty: 1
                    })
                }
                // 获取优惠券
                that.setData({
                    coupons: res.data.coupons
                })
                wx.hideLoading();
            },
        })

    },
    //领取优惠券
    bindShow:function(){
        util.showload('加载中');
        let that = this;
        wx.login({
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Goods/coupons',
                        data: {code:res.code},
                        method: 'GET',
                        success: function(res) {
                            wx.hideLoading();
                            // status 1=》领取过 2=》领取成功 3=》领取失败
                            if(res.data.status == 1){
                                util.showToast('您已经领取过优惠券');
                            }
                            if (res.data.status == 2) {
                                util.showToast('领取成功');
                                that.setData({
                                    pop_flag : 2
                                })
                            }
                            if (res.data.status == 3) {
                                util.showToast('领取失败');
                            }
                        },
                    })
                }
            }
        })

    },
    //查看详情
    bindCoupons:function(){
        wx.navigateTo({
            url: '../../mycenter/mycoupons/mycoupons',
        })
    },
    //隐藏弹窗
    bindHide:function(){
        this.setData({
            pop_flag : 1
        })
    },
    //跳转搜索页面
    bindSearch:function(){
        // 分类id
        let id = this.data.id;
        wx.navigateTo({
            url: '../search/search?id=' + id
        })
    },
    // 跳转详情
    bindDetail:function(e){
        //商品ID
        let id = e.currentTarget.id;
        wx.navigateTo({
            url: '../shopdetails/shopdetails?id=' + id
        })
    },
    // 下拉加载
    onReachBottom: function () {
        util.showload('加载中');
        let that = this;
        let id = this.data.id;
        let currpage = this.data.currpage;
        let list = this.data.list;
        currpage ++;
        wx.request({
            url: util.host + '/Little/Goods/goods_more',
            data: { id: id, currpage: currpage},
            method: 'GET',
            success: function(res) {
                console.log(res);
                wx.hideLoading();
                if(res.data.list != 1){
                    res.data.list.forEach((item)=>{
                        list.push(item);
                    })
                    console.log(list);
                    that.setData({
                        currpage: currpage,
                        list: list
                    })
                }else{
                    util.showToast('没有内容了');
                }
            }
        })
    }
})