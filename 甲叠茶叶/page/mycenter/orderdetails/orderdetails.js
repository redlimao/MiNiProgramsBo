// pages/orderdetails/orderdetails.js
const util = require('../../utils/util.js')
Page({
    data: {
        flag_check:false //积分控制器 默认为关闭
    },

    onLoad: function (options) {
        util.showload('加载中');
        let that = this;
        let types = Number(options.types);
        let id = options.id;
        this.setData({
            id:id,
            types:types
        })
        wx.request({
            url: util.host + '/Little/Center/order_detail',
            data: {order_id:id},
            method: 'GET',
            success: function(res) {
                that.setData({
                    goods_id:res.data.info.goods_id,
                    name: res.data.info.name,
                    address: res.data.info.address,
                    phone: res.data.info.phone,
                    shop_img:res.data.info.banner,
                    shop_name:res.data.info.goods_name,
                    tag_name:res.data.info.xing,
                    shop_money: res.data.info.xian_moneys,
                    numbers:res.data.info.nums,
                    coupons_id: Number(res.data.info.coupons_id),//判断有没有使用优惠券
                    covers: Number(res.data.info.covers),//判断有没有使用积分
                    total_money:res.data.info.moneys,
                    trade_no: res.data.info.trade_no
                })
                if (Number(res.data.info.coupons_id) !== 0){
                    that.setData({
                        coupon_man:res.data.info.man,
                        coupon_money:res.data.info.money
                    })
                }
                wx.hideLoading();
                console.log(res);
            }
        })
        // this.setData({
        //     name:'天天天',
        //     phone:1111111,
        //     address:'粉红色的见风使舵回家开发商的空间的所发生的发斯蒂芬斯蒂芬',
        //     address_info:1,
        //     store_name:'茶叶店',
        //     shop_name : '商品',
        //     shop_money : 100,
        //     tag_name :'标签',
        //     numbers : 2,
        //     shop_img :'../../../images/test/1.jpg',
        //     my_integra : 10,
        //     integra_data : 0.1,
        //     use_integra : 8
        // })
        //计算总价
        this.totalMoney();

    },
    bindDetail:function(){
        let id = this.data.goods_id;
        wx.navigateTo({
            url: '../../shop/shopdetails/shopdetails?id=' + id,
        })
    },
    // 计算总价
    totalMoney : function(){
        let shop_money = this.data.shop_money; //商品单价
        let numbers = this.data.numbers; //商品数量
        let integra_data = this.data.integra_data; //积分比例
        let use_integra = this.data.use_integra; //商品可使用积分
        let flag_check = this.data.flag_check;//判断是否使用积分 
        let integra_money = 0; //积分转化 默认0  
        let total_money = 0;//总价
        // 如果使用积分     
        if (flag_check){
            integra_money = integra_data * use_integra;
        }
        total_money = shop_money * numbers - integra_money;
        this.setData({
            total_money: total_money
        })
    },
    // 选择收货地址
    bindAddress:function(e){
        let that = this;
        wx.chooseAddress({
            success: function (res) {
                that.setData({
                    address: res.detailInfo,
                    phone: res.telNumber,
                    name: res.userName,
                    address_info:2
                })
            }
        })
    },
    //控制积分
    bindIntegral:function(e){
        let that = this;
        let my_integra = this.data.my_integra;
        let use_integra = this.data.use_integra;
        if (my_integra < use_integra){
            wx.showToast({
                title: '积分不足',
                icon: 'none',
                mask: true,
                success:function(){
                    that.setData({
                        flag_check: false
                    })
                }
            })
        }else{
            that.setData({
                flag_check: e.detail.value
            })
        }
        this.totalMoney();
        console.log(this.data.flag_check)
    },
    //删除订单
    bindDelete: function (e) {
        let that = this;
        let current = this.data.types;
        let id = this.data.id;
        wx.showModal({
            title: '提示',
            content: '是否删除订单',
            success: function (res) {
                if (res.confirm) {
                    util.showload('删除中');
                    wx.request({
                        url: util.host + '/Little/Center/orders_dels',
                        data: { id: id, type: current },
                        method: 'GET',
                        success: function (res) {
                            if (res.data == 1) {
                                wx.hideLoading();
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    mask: true,
                                    success: function (res) {
                                        setTimeout(()=>{
                                            wx.redirectTo({
                                                url: '../myorder/myorder?index=' + current,
                                            })
                                        },300)
                                    }
                                })
                            } else {
                                util.showToast('删除失败');
                            }
                        }
                    })
                } else if (res.cancel) {
                    util.showToast('取消删除');
                }
            }
        })
    },
    // 提醒发货
    bindSend: function () {
        util.showToast('提醒发货成功');
    },
    // 确认收货
    bindTake: function (e) {
        let that = this;
        let id = this.data.id;
        let current = this.data.types;
        wx.showModal({
            title: '提示',
            content: '是否确认收货',
            success: function (res) {
                if (res.confirm) {
                    util.showload('加载中');
                    wx.request({
                        url: util.host + '/Little/Center/que',
                        data: { id: id },
                        method: 'GET',
                        success: function (res) {
                            wx.hideLoading();
                            wx.redirectTo({
                                url: '../myorder/myorder?index=4',
                            }) 
                        }
                    })
                }
            }
        })
    },
    // 立即评价
    bindEvaluate: function (e) {
        let id = this.data.id;
        wx.navigateTo({
            url: '../myevaluate/myevaluate?id=' + id
        })
    },
})