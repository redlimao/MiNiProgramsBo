// pages/createorder/createorder.js
const util = require('../../utils/util.js')
Page({
    data: {
        flag_check:false, //积分控制器 默认为关闭
        flag_coupons:1 //优惠券状态值 
    },

    onLoad: function (options) {
        util.showload('加载中');
        let that = this;
        let id = options.id;
        let shop_name = options.shopname;
        let shop_money = options.shopmoney;
        let tag_name = options.tagname;
        let numbers = options.numbers;
        let shop_img = options.shopimg;
        console.log(shop_money,numbers);
        // 测试数据
        this.setData({
            id:id,
            shop_name : shop_name,
            shop_money : shop_money,
            tag_name :tag_name,
            numbers : numbers,
            shop_img : shop_img,
            total_money: Number(shop_money) * Number(numbers)
        })
        wx.login({
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Goods/my_address',
                        data: {code:res.code,id:id},
                        method: 'GET',
                        success: function(res) {
                            console.log(res);
                            that.setData({
                                my_integra: Number(res.data.user.covers),//我的积分
                                integra_data: Number(res.data.bili), //积分比率
                                use_integra: Number(res.data.goods.covers), //商品积分
                                integra_money: (Number(res.data.goods.covers) * Number(res.data.bili)).toFixed(2), //积分转化金额
                                covers:0,
                                account: Number(res.data.user.account),
                                user_id: res.data.user.id
                            })
                            if(res.data.info == 1){
                                that.setData({
                                    address_info: 1
                                })
                            }else{
                                that.setData({
                                    address_info: 2, //判断是否有收货地址
                                    name:res.data.info.name, //收货人姓名
                                    address: res.data.info.address, //收货人地址
                                    phone: res.data.info.phone //收货人电话
                                })
                            }
                            //判断优惠券
                            if (res.data.coupons!=1){
                                that.setData({
                                    coupons: res.data.coupons,
                                    flag_coupons:2
                                })
                                that.chooseCoupons();
                            }else{
                                that.setData({
                                    flag_coupons:1,
                                    cut_money: 0,
                                    coupons_id: 0
                                })
                            }
                            //计算总价
                            that.totalMoney();
                            wx.hideLoading();
                        }
                    })
                }
            }
        })
    },
    // 默认优惠券
    chooseCoupons: function (){
        let coupons = this.data.coupons;
        let total_money = this.data.total_money;
        // console.log(coupons, total_money) 
        //存储符合条件的优惠券
        let new_arr = coupons.filter((item)=>{
            return total_money >= Number(item.man);
        })
        if(new_arr.length == 0){
            this.setData({
                flag_coupons: 1,
                coupons_num:0,
                cut_money: 0,
                coupons_id: 0
            })
        }else{
            new_arr.sort((a, b) => {
                let value_1 = Number(a.man);
                let value_2 = Number(b.man);
                return value_2 - value_1;
            })
            this.setData({
                man_money: Number(new_arr[0].man),
                cut_money:Number(new_arr[0].money),
                coupons_id: new_arr[0].id,
                coupons_num:1
            })
        }
    },
    // 计算总价
    totalMoney : function(){
        let total_money = Number(this.data.shop_money) * Number(this.data.numbers);//总价
        let integra_data = this.data.integra_data; //积分比例
        let use_integra = this.data.use_integra; //商品可使用积分
        let flag_check = this.data.flag_check;//判断是否使用积分 
        let integra_money = 0; //积分转化 默认0  
        let cut_money = this.data.cut_money; //优惠价格
        console.log(flag_check,use_integra,integra_data);
        // 如果使用积分     
        if (flag_check){
            integra_money = integra_data * use_integra;
        }
        total_money = (total_money - integra_money - cut_money).toFixed(2);
        this.setData({
            total_money: total_money
        })
    },
    // 选择收货地址
    bindAddress:function(e){
        util.showload('加载中');
        let that = this;
        wx.chooseAddress({
            success: function (ress) {
                that.setData({
                    address: ress.detailInfo,
                    phone: ress.telNumber,
                    name: ress.userName,
                    address_info:2
                })
                wx.login({
                    success: function(res) {
                        if(res.code){
                            wx.request({
                                url: util.host + '/Little/Goods/add_address',
                                data: { code: res.code, name: ress.userName, phone: ress.telNumber, address: ress.detailInfo},
                                method: 'GET',
                                success: function(res) {
                                    wx.hideLoading();
                                }
                            })
                        }
                    }
                })
            },
            fail:function(e){
                wx.hideLoading();
                wx.showModal({
                    title: '温馨提示',
                    content: '您已拒绝访问微信通讯地址，请点击确认跳转到个人中心后在授权管理打开授权,以便于进行商品购买',
                    showCancel: false,
                    success: function(res) {
                        wx.switchTab({
                            url: '../../taber/mycenter/mycenter'
                        })
                    }
                })
            }
        })
    },
    //选择优惠券
    bindChooseCoupons:function(){
        let that = this;
        let coupons = this.data.coupons;
        let new_arr = [];
        console.log(coupons);
        coupons.forEach((item)=>{
            new_arr.push('满' + item.man + '减' + item.money);
        })
        wx.showActionSheet({
            itemList: new_arr,
            success: function (res) {
                // console.log(res.tapIndex)
                // 获取优惠券信息
                that.setData({
                    man_money: Number(coupons[res.tapIndex].man),
                    cut_money: Number(coupons[res.tapIndex].money),
                    coupons_id: coupons[res.tapIndex].id,
                    coupons_num:1
                })
                that.totalMoney();
            },
            fail: function (res) {
                that.setData({
                    cut_money: 0,
                    coupons_num:0
                })
                that.totalMoney();
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
            if(e.detail.value){
                that.setData({
                    covers: use_integra
                })
            }else{
                that.setData({
                    covers: 0
                })
            }
            that.setData({
                flag_check: e.detail.value
            })
        }
        this.totalMoney();
        console.log(this.data.flag_check)
    },
    // 支付
    bindPay:function(){
        let that = this;
        let address_info = this.data.address_info;
        if(address_info == 1){
            util.showToast('请选择收货地址');
        }else{
            wx.showActionSheet({
                itemList: ['微信支付', '余额支付'],
                success: function (res) {
                    let name = that.data.name;//收货人姓名
                    let address = that.data.address;//收货人地址
                    let phone = that.data.phone;//收货人电话
                    let total_money = that.data.total_money;//总价
                    let covers = that.data.covers;//使用的积分
                    let numbers = that.data.numbers;//数量
                    let id = that.data.id;//商品id
                    let tag_name = that.data.tag_name; //标签
                    let cut_money = that.data.cut_money; //优惠价格
                    let coupons_id = that.data.coupons_id; //优惠券id
                    let user_id = that.data.user_id; //用户id
                    let account = that.data.account;//我的余额
                    // 微信支付
                    if (res.tapIndex == 0) {
                        wx.login({
                            success: function (res) {
                                if (res.code) {
                                    wx.request({
                                        url: 'https://www.bozhiyingxiao.com/little_program/store_jiadie/pay/example/jsapi.php',
                                        data: { title: '', code: res.code, total_fee: total_money },
                                        method: 'GET',
                                        success: function (res) {
                                            let no = res.data.no; //订单号
                                            let op = res.data.op; //openid
                                            wx.requestPayment({
                                                timeStamp: res.data.pay.timeStamp,
                                                nonceStr: res.data.pay.nonceStr,
                                                package: res.data.pay.package,
                                                signType: res.data.pay.signType,
                                                paySign: res.data.pay.paySign,
                                                success: function (res) {
                                                    util.showload('加载中');
                                                    wx.request({
                                                        url: util.host + '/Little/Orders/indexs',
                                                        data: { types_s: 2, type: 1, status: 1, op: op, no: no, zhi: 1, you_id: coupons_id, you_jian: cut_money, address: address, name: name, phone: phone, covers: covers, xing: tag_name, id:id, shop_num:numbers, moneys:total_money },
                                                        method: 'GET',
                                                        success: function (res) {
                                                            wx.hideLoading();
                                                            wx.showToast({
                                                                title: '支付成功',
                                                                icon: 'success',
                                                                mask: true,
                                                                success: function (res) {
                                                                    setTimeout(() => {
                                                                        wx.switchTab({
                                                                            url: '../../taber/mycenter/mycenter',
                                                                        })
                                                                    }, 300)
                                                                }
                                                            })
                                                        },
                                                    })
                                                },
                                                fail:function(){
                                                    util.showload('加载中');
                                                    util.showToast('支付失败', () => {
                                                        wx.navigateBack({
                                                            delta: 1,
                                                        })
                                                    });
                                                }
                                            })
                                        },
                                    })
                                }
                            }
                        })
                    } else if (res.tapIndex == 1) {
                        if (account < total_money) {
                            wx.showModal({
                                title: '温馨提示',
                                content: '您的余额不足，请点击确认前往充值',
                                showCancel: false,
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.navigateTo({
                                            url: '../../mycenter/paymoney/paymoney',
                                        })
                                    }
                                },
                            })
                        } else {
                            util.showload('支付中');
                            wx.request({
                                url: util.host + '/Little/Orders/indexs',
                                data: { types_s: 2, type: 1, status: 1, zhi: 2, you_id: coupons_id, you_jian: cut_money, address: address, name: name, phone: phone, covers: covers, xing: tag_name, id: id, shop_num: numbers, moneys: total_money, user_id: user_id},
                                method: 'GET',
                                success: function (res) {
                                    console.log(res);
                                    if (res.data == 1) {
                                        wx.hideLoading();
                                        wx.showToast({
                                            title: '支付成功',
                                            icon: 'success',
                                            mask: true,
                                            success: function (res) {
                                                setTimeout(() => {
                                                    wx.switchTab({
                                                        url: '../../taber/mycenter/mycenter',
                                                    })
                                                }, 300)
                                            }
                                        })
                                    } else {
                                        wx.hideLoading();
                                        wx.showToast({
                                            title: '支付失败，请重新下单',
                                            icon: 'success',
                                            duration: 4000,
                                            mask: true,
                                            success: function () {
                                                wx.navigateBack({
                                                    delta: 2,
                                                })
                                            }
                                        })
                                    }
                                },
                            })
                        }

                    }
                }
            })
        }
    }
})