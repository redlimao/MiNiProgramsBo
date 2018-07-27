// pages/createpackage/createpackage.js
const util = require('../../utils/util.js')
Page({
    data: {
        total_money:0
    },
    onLoad: function (options) {
        util.showload('加载中');
        let that = this;
            wx.login({
                success: function(res) {
                    if(res.code){
                        wx.request({
                            url: util.host + '/Little/Company/infos',
                            data: {code:res.code},
                            method: 'GET',
                            success: function(res) {
                                console.log(res);
                                that.setData({
                                    account : Number(res.data.user.account),
                                    user_id : res.data.user.id
                                })
                                wx.getStorage({
                                    key: 'list2',
                                    success: function(res) {
                                        console.log(res);
                                        that.setData({
                                            id:res.data.id,
                                            title: res.data.title,
                                            date : res.data.date,
                                            num :res.data.num,
                                            store_id :res.data.store_id,
                                            store_name: res.data.store_name,
                                            time_start : res.data.time_start,
                                            time_end : res.data.time_end,
                                            money : res.data.money,
                                            total_money: Number(res.data.num) * Number(res.data.money)
                                        })
                                    },
                                })
                                wx.hideLoading();
                            },
                        })
                    }
                }
            })
    },
    // 支付
    bindPay:function(){
        let total_money = this.data.total_money;
        let account = this.data.account;
        let user_id = this.data.user_id;
        let that = this;
        wx.showActionSheet({
            itemList: ['微信支付', '余额支付'],
            success: function (res) {
                let start_time = that.data.date + ' ' + that.data.time_start; //开始时间
                let end_time = that.data.date + ' ' + that.data.time_end;//结束时间
                let num = that.data.num;//人数
                let store_id = that.data.store_id;//店铺id
                let store_name = that.data.store_name;//店铺名称
                let price = that.data.money;//单价
                let id = that.data.id;//套餐id
                // 微信支付
                if(res.tapIndex == 0){
                    wx.login({
                        success: function(res) {
                            if(res.code){
                                wx.request({
                                    url: 'https://www.bozhiyingxiao.com/little_program/store_jiadie/pay/example/jsapi.php',
                                    data: { title: '', code: res.code, total_fee: total_money},
                                    method: 'GET',
                                    success: function (res){
                                        let no = res.data.no; //订单号
                                        let op = res.data.op; //openid
                                        wx.requestPayment({
                                            timeStamp: res.data.pay.timeStamp,
                                            nonceStr: res.data.pay.nonceStr,
                                            package: res.data.pay.package,
                                            signType: res.data.pay.signType,
                                            paySign: res.data.pay.paySign,
                                            success: function(res) {
                                                wx.request({
                                                    url: util.host + '/Little/Orders/yue',
                                                    data: { op: op, no: no, status: 1, type: 2, store_id: store_id, price: price, money: total_money, start: start_time, end: end_time, num: num, tao_id: id},
                                                    method: 'GET',
                                                    success: function(res) {
                                                        wx.showToast({
                                                            title: '支付成功',
                                                            icon: 'success',
                                                            mask: true,
                                                            success: function (res) {
                                                                setTimeout(() => {
                                                                    wx.redirectTo({
                                                                        url: '../../mycenter/myappointmen/myappointmen',
                                                                    })
                                                                }, 300)
                                                            }
                                                        })
                                                    },
                                                })
                                            }
                                        })
                                    },
                                    fail:function(){
                                        util.showToast('支付失败');
                                    }
                                })
                            }
                        }
                    })
                }else if(res.tapIndex == 1){
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
                            url: util.host + '/Little/Orders/yue',
                            data: { status: 1, type: 2, store_id: store_id, price: price, money: total_money, start: start_time, end: end_time, num: num, user_id: user_id, tao_id: id},
                            method: 'GET',
                            success: function (res) {
                                console.log(res);
                                if (res.data.status == 1) {
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '支付成功',
                                        icon: 'success',
                                        mask: true,
                                        success: function (res) {
                                            setTimeout(() => {
                                                wx.redirectTo({
                                                    url: '../../mycenter/myappointmen/myappointmen',
                                                })
                                            }, 300)
                                        }
                                    })
                                } else {
                                    wx.hideLoading();
                                    util.showToast('支付失败');
                                }
                            },
                        })
                    }
                }
                console.log(res.tapIndex)
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    }
})