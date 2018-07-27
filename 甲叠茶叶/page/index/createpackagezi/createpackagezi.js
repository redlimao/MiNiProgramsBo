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
                            // console.log(res);
                            that.setData({
                                money : Number(res.data.price),
                                account : Number(res.data.user.account),
                                user_id : res.data.user.id
                            })
                            wx.getStorage({
                                key: 'list1',
                                success: function(res) {
                                    // console.log(res);
                                    that.setData({
                                        date : res.data.date,
                                        num :res.data.num,
                                        store_id :res.data.store_id,
                                        store_name: res.data.store_name,
                                        time_start : res.data.time_start,
                                        time_end : res.data.time_end,
                                        tag_four : res.data.tag_four,
                                        tag_one:res.data.tag_one,
                                        tag_two: res.data.tag_two,
                                        tag_three: res.data.tag_three,
                                        tea_arr: res.data.tea_arr,
                                        total_money:Number(res.data.num) * that.data.money 
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
        let user_id = this.data.user_id;
        let account = this.data.account;
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
                let xiang_id = ''; //香名称
                let xiang_name = ''; //香 id
                let specialist_id = ''; //茶艺师名称
                let specialist_name = ''; //茶艺师id
                let water_id = ''; //水名称
                let water_name = ''; //水id
                let food_id = ''; //茶点名称
                let food_name = ''; //茶点id
                let goods_id = ''; //茶名称
                let goods_name = ''; //茶id

                if (that.data.tag_one.length != 0) {
                    xiang_id = that.data.tag_one[0].id;
                    xiang_name = that.data.tag_one[0].name
                }
                if (that.data.tag_two.length != 0) {
                    specialist_id = that.data.tag_two[0].id;
                    specialist_name = that.data.tag_two[0].name
                }
                if (that.data.tag_three.length != 0) {
                    that.data.tag_three.forEach((item, index, arr) => {
                        if (arr.length - 1 !== index) {
                            water_id += item.id + ',';
                            water_name += item.name + ',';
                        } else {
                            water_id += item.id;
                            water_name += item.name;
                        }
                    })
                }
                if (that.data.tag_four.length != 0) {
                    that.data.tag_four.forEach((item, index, arr) => {
                        if (arr.length - 1 !== index) {
                            food_id += item.id + ',';
                            food_name += item.name + ',';
                        } else {
                            food_id += item.id;
                            food_name += item.name;
                        }
                    })
                }
                if (that.data.tea_arr.length != 0) {
                    that.data.tea_arr.forEach((item, index, arr) => {
                        if (arr.length - 1 !== index) {
                            goods_id += item.id + ',';
                            goods_name += item.name + ',';
                        } else {
                            goods_id += item.id;
                            goods_name += item.name;
                        }
                    })
                }
                                        // console.log(no, op, start_time, end_time, price, num, xiang_id, xiang_name, specialist_id, specialist_name, water_id, water_name, food_id, food_name, goods_id, goods_name)
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
                                                    data: { op: op, no: no, status: 1, type: 1, store_id: store_id, price: price, money: total_money, start: start_time, end: end_time, num: num,  goods_id: goods_id, goods_name: goods_name, water: water_id, water_name: water_name, xiang: xiang_id, xiang_name: xiang_name, food: food_id, food_name: food_name, specialist: specialist_id, specialist_name: specialist_name},
                                                    method: 'GET',
                                                    success: function(res) {
                                                        // console.log(res);
                                                        wx.showToast({
                                                            title: '支付成功',
                                                            icon: 'success',
                                                            mask: true,
                                                            success: function(res) {
                                                                setTimeout(()=>{
                                                                    wx.redirectTo({
                                                                        url: '../../mycenter/myappointmen/myappointmen',                                                                                                  })
                                                                },300)
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
                    if (account < total_money){
                        wx.showModal({
                            title: '温馨提示',
                            content: '您的余额不足，请点击确认前往充值',
                            showCancel: false,
                            success: function(res) {
                                if (res.confirm) {
                                    wx.navigateTo({
                                        url: '../../mycenter/paymoney/paymoney',
                                    })
                                } 
                            },
                        })
                    }else{
                        util.showload('支付中');
                        wx.request({
                            url: util.host + '/Little/Orders/yue',
                            data: { status: 1, type: 1, store_id: store_id, price: price, money: total_money, start: start_time, end: end_time, num: num, goods_id: goods_id, goods_name: goods_name, water: water_id, water_name: water_name, xiang: xiang_id, xiang_name: xiang_name, food: food_id, food_name: food_name, specialist: specialist_id, specialist_name: specialist_name, user_id: user_id, },
                            method: 'GET',
                            success: function (res) {
                                console.log(res);
                                if (res.data.status == 1){
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
                                }else{
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '支付失败，请重新下单',
                                        mask: true,
                                        success:function(){
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
                console.log(res.tapIndex)
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    }
})