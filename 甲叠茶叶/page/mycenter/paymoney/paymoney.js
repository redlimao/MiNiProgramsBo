var util = require('../../utils/util.js')
Page({
    data: {
        flag:false
    },
    onLoad: function () {
        let that = this;
        util.showload('加载中');
        wx.login({
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Center/tochong',
                        data: {code:res.code},
                        method: 'GET',
                        success: function(res) {
                            console.log(res);
                            that.setData({
                                account : res.data.user.account
                            })
                            wx.hideLoading();
                        }
                    })
                }
            },
        })
    },
    bindInput:function(e){
        let context = Number(e.detail.value);
        if(context > 20000){
            this.setData({
                numbers: 20000
            })
            util.showToast('最大金额不能超过2万');
        }else{
            this.setData({
                numbers: context
            })
        }
    },
    // 我的金额
    bindIn:function(){
        wx.navigateTo({
            url: '../mymoney/mymoney',
        })
    },
    // =====充值须知
    bindPaytext: function () {
        wx.navigateTo({
            url: '../rule/rule?index=1',
        })
    },
    // 选择协议
    bindSelect:function(){
        var flag = this.data.flag;
        if (flag){
            this.setData({
                flag : !flag
            })
        }else{
            this.setData({
                flag: !flag
            })
        }
    },
    // 充值
    bindPay:function(){
        var flag = this.data.flag;
        let numbers = this.data.numbers;
        if (numbers == '' || numbers == 0||numbers==undefined){
            util.showToast('请输入正确的充值金额');
        } else if (!flag){
            util.showToast('请同意充值须知');
        }else{
            wx.login({
                success: function (ress) {
                    if (ress.code) {
                        wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_jiadie/pay/example/jsapi.php',
                            data: { code: ress.code, total_fee: numbers, title: numbers },
                            method: 'GET',
                            success: function (res) {
                                wx.requestPayment({
                                    'timeStamp': res.data.pay.timeStamp,
                                    'nonceStr': res.data.pay.nonceStr,
                                    'package': res.data.pay.package,
                                    'signType': 'MD5',
                                    'paySign': res.data.pay.paySign,
                                    'success': function (ress) {
                                        wx.request({
                                            url: util.host + '/Little/Cha/chong_zhi',
                                            data: { no: res.data.no, op: res.data.op, money: numbers},
                                            method: 'GET',
                                            success: function (res) {
                                                wx.navigateTo({
                                                    url: '../mymoney/mymoney',
                                                })
                                            }
                                        })
                                    },
                                    'fail': function (res) {
                                        if (ress.errMsg == "requestPayment:fail cancel") {
                                            util.showToast('支付失败');
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    }
})
