//pages/appointmentdetails/appointmentdetails
var WxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
    data: {
        date: '',
        time: '',
        flag:2,
        info:'',
        shop_id:'',
        orders_id:'',
        list_info:'',
        tags:'',
        coupons:'',
        pop_flag:1,
        pop_index:0,
        nums:1,
        coupon_flag:'',
        total:0,
        user_id:'',
        coupons_index:'',
        item_flag:'',
        phone:'',
        name:'',
        address:'',
        address_flag:1,
        a_false:false
    },
    onLoad: function (options) {
        //获取商品id
        var that = this;
        var id = options.id;
        var user_id = options.userid;
        var orders_id = options.ordersid;
        this.setData({
            shop_id : id,
            user_id: user_id,
            orders_id: orders_id
        })        
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Orders/indexss',
            data: { id: that.data.shop_id, user_id: that.data.user_id, orders_id: orders_id},
            method: "GET",
            success:function(res){
                console.log(res);
                var article = res.data.zhi.content
                WxParse.wxParse('article', 'html', article, that, 5)
                that.setData({
                    jia:res.data.info.jia,
                    info:res.data.info,
                    list_info:res.data.fu,
                    tags:res.data.tags,
                    coupons:res.data.coupons,
                    address_flag: res.data.address.pan
                })
                if(res.data.nums){
                    that.setData({
                        nums: res.data.nums
                    })
                    
                }
                if (res.data.shang_one) {
                    that.setData({
                        date: res.data.shang_one
                    })
                    
                }
                if (res.data.shang_two) {
                    that.setData({
                        time: res.data.shang_two
                    })
                    
                }
                if (res.data.bei_zhu) {
                    that.setData({
                        remark: res.data.bei_zhu
                    })
                    
                }
                if(res.data.address != 1){
                    that.setData({
                        name: res.data.address.name,
                        phone: res.data.address.phone,
                        address: res.data.address.address
                    })
                }
                that.totalPirce();
            }
        })
        var n = Date.parse(new Date());
        n = n + 5400000;
        var date = new Date(n);
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); 
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); 
        that.setData({
            date : Y + '-' + M + '-' + D,
            time : h + ':' + m
        })
    },
    //加减
    bindSubtract:function(){
        var list_info = this.data.list_info;
        var nums = this.data.nums;
        nums--;
        if(nums < 1){
            nums = 1;
        }

        for(var i = 0;i < list_info.length;i++){
            list_info[i].nums = nums;
        }

        this.setData({
            nums:nums,
            list_info: list_info
        })
        this.totalPirce();
    },
    bindAdd:function(){
        var list_info = this.data.list_info;
        var nums = this.data.nums;
        nums++;
        for (var i = 0; i < list_info.length; i++) {
            list_info[i].nums = nums;
        }
        this.setData({
            nums: nums,
            list_info: list_info
        })
        this.totalPirce();
    },
    //附带服务选择
    bindIcon:function(e){
        var list_info = this.data.list_info;
        var id = e.currentTarget.dataset.id;
        if (list_info[id].pan == 1){
            list_info[id].pan = 2;
        }else{
            list_info[id].pan = 1; 
        }
        this.setData({
            list_info : list_info
        })
        this.totalPirce();
    },
    //隐藏领取优惠券图片
    bindclosepop: function (e) {
        this.setData({
            pop_flag: 1
        })
    },
    // 打开弹窗
    bindopenpop: function (e) {
        console.log(e);
        var index = e.currentTarget.dataset.id;
        var flag = e.currentTarget.dataset.flag;
        console.log(flag);
        this.setData({
            pop_index : index,
            pop_flag: 2,
            item_flag: flag
        })
    }, 
    //备注标签选择
    bindTags: function (e) {
        var tags = this.data.tags;
        var id = e.currentTarget.dataset.id;
        if (tags[id].pan == 1) {
            tags[id].pan = 2
        } else {
            tags[id].pan = 1
        }
        this.setData({
            tags: tags
        })
    },
    /*选择日期*/
    bindDateChange: function (e) {
        var that = this;
        this.setData({
            date: e.detail.value
        })
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Orders/shang',
            data: {id: this.data.shop_id, one: e.detail.value,two:this.data.time},
            method: 'GET',
            success: function(res) {
                that.setData({
                    jia:res.data.jia
                })
                that.totalPirce();
            }
        })
    },
    /*选择时间*/
    bindTimeChange: function (e) {
        var that = this;
        this.setData({
            time: e.detail.value
        })
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Orders/shang',
            data: {id: this.data.shop_id, one: this.data.date, two: e.detail.value },
            method: 'GET',
            success: function (res) {
                that.setData({
                    jia: res.data.jia
                })
                that.totalPirce();
            }
        })
    },
    /*选择地址*/
    // bindAddress:function(){
    //     var user_id = this.data.user_id;
    //     var shop_id = this.data.shop_id;
    //     wx.navigateTo({
    //         url: '../address/address?userid=' + user_id + '&shopid=' + shop_id,
    //     })
    // },
    bindAddress:function(){
        var that = this;
        // wx.getSetting({
        //     success: function (res) {
        //         console.log(res);
        //         if (!res.authSetting['scope.address']){
        //             wx.authorize({
        //                 scope: 'scope.address',
        //                 success() {
        //                     wx.chooseAddress()
        //                 }
        //             })
        //         }
        //     }
        // })
        wx.chooseAddress({
            success: function (res) {
                that.setData({
                    address: res.cityName + res.countyName + res.detailInfo,
                    phone: res.telNumber,
                    name: res.userName,
                    address_flag: 2
                })
            },
            fail: function (res) {

                that.setData({
                    address_flag: 3
                })
            }
        })
    },
    //选择服务条款
    bindIn:function(){
        var flag = this.data.flag;
        if(flag == 1){
            //选中
            this.setData({
                flag:2
            })
        }else{
            //未选中
            this.setData({
                flag:1
            })
        }
    },
    //计算总价
    totalPirce : function(){
        var coupons = this.data.coupons;//优惠券
        var info = this.data.info;//晚班费用
        var jia = this.data.jia;
        var list_info = this.data.list_info;//附带服务
        var nums = this.data.nums;//获取商品数量
        var money = Number(this.data.info.moneys) ;//获取商品单价
        var coupons_i = [];//可用优惠券
        var flag = this.data.coupon_flag;//判断有可用的优惠券

        var max_i = [];
        var max_num = 0;
        var jian_num = 0;
        var coupons_id = 0;
        var coupons_index = this.data.coupons_index;
        var total = 0;
        for(var i = 0;i < list_info.length;i++){
            if (list_info[i].pan == 2){
                total += parseInt(list_info[i].moneys) * list_info[i].nums;
            }
        }
        total = total + money * nums
        //判断是否有晚班
        if(jia == 2){  
            total = total +  Number(info.jia_moneys)
        }
        //判断有优惠券
        if (coupons.coupons!=1){
            for (var i = 0; i < coupons.length; i++) {
                if (total >= coupons[i].man) {
                    coupons_i.push(coupons[i]);
                    max_i.push(coupons[i].man);
                }
            }
            max_num = max_i.max();
            if (coupons_i.length) {
                flag = 2
            } else {
                flag = 1
            }
            for (var i = 0; i < coupons_i.length; i++) {
                if (coupons_i[i].man == max_num){
                    jian_num = coupons_i[i].money;
                    total = total - Number(coupons_i[i].money);
                    coupons_index = coupons_i[i].id;
                }
            }
        }  
        this.setData({
            total: total,
            coupon_flag: flag,
            man: max_num,
            money: jian_num,
            coupons_index: coupons_index
        })
    },
    //表单提交
    formSubmit:function(e){
        if (e.detail.value.address){
            this.setData({
                address: e.detail.value.address
            })
        }
        if (e.detail.value.phone) {
            this.setData({
                phone: e.detail.value.phone
            })
        }
        if (e.detail.value.name) {
            this.setData({
                name: e.detail.value.name
            })
        }
        // console.log(this.data.address, this.data.name, this.data.phone)

        var that = this;
        var tags = this.data.tags;
        var list_info = this.data.list_info;
        var total = this.data.total;
        var arr = [];
        var fu = [];
        for(var i = 0;i < list_info.length;i++){
            if(list_info[i].pan == 2){
                fu.push(list_info[i].id)
            }
        }
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].pan == 2) {
                arr.push(tags[i].name)
            }
        }
        //=================支付
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    if (e.detail.value.name == ''){
                        wx.showToast({
                            title: '姓名不能为空',
                        })
                    } else if (e.detail.value.phone == ''){
                        wx.showToast({
                            title: '电话不能为空',
                        })
                    } else if (!(/^([0-9]{3,4}-)?[0-9]{7,8}$/.test(e.detail.value.phone)) && !(/^1[34578]{1}\d{9}$/.test(e.detail.value.phone))){
                        wx.showToast({
                            title: '电话有误',
                        })
                    } 
                    else if (e.detail.value.address == '') {
                        wx.showToast({
                            title: '地址不能为空',
                        })
                    } else if (that.data.flag == 1) {
                        wx.showToast({
                            title: '请选择支付说明',
                        })
                    }else{
                        wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/pay/example/jsapi.php',
                            data: { code: ress.code, total_fee: total, title:that.data.info.name},
                            method: 'GET',
                            success: function (res) {
                                console.log(that.data.address)
                                wx.requestPayment({
                                    'timeStamp': res.data.pay.timeStamp,
                                    'nonceStr': res.data.pay.nonceStr,
                                    'package': res.data.pay.package,
                                    'signType': 'MD5',
                                    'paySign': res.data.pay.paySign,
                                    'success': function (ress) {
                                        wx.showToast({
                                            title: '支付成功',
                                            success: function () {
                                                var app = getApp();
                                                app.request_id = 2; 
                                                wx.switchTab({
                                                    url: '../orders/orders',
                                                })
                                            }
                                        })
                                        
                                        wx.request({
                                            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Orders/add_orders',
                                            data: { id: that.data.shop_id, fu: fu, no: res.data.no, op: res.data.op, status: 1, phone: that.data.phone, one: e.detail.value.date, two: e.detail.value.time, address: that.data.address, ding_zhu: e.detail.value.remark, tags: arr, coupons: that.data.coupons_index, moneys: that.data.total, nums: that.data.nums, name: that.data.name, orders_id: that.data.orders_id },
                                            method: 'GET',
                                            success: function (res) {

                                            }
                                        })
                                    },
                                    'fail': function (res) {
                                        var app = getApp();
                                        app.request_id = 1;
                                        wx.switchTab({
                                            url: '../orders/orders',
                                        })
                                    },
                                    'complete': function (ress) {
                                        if (ress.errMsg == "requestPayment:fail cancel") {
                                            console.log(that.data.address)
                                            wx.request({
                                                url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Orders/add_orders',
                                                data: { id: that.data.shop_id, fu: fu, no: res.data.no, op: res.data.op, status: 2, phone: that.data.phone , one: e.detail.value.date, two: e.detail.value.time, address: that.data.address, ding_zhu: e.detail.value.remark, tags: arr, coupons: that.data.coupons_index, moneys: that.data.total, nums: that.data.nums, name: that.data.name, orders_id: that.data.orders_id },
                                                method: 'GET',
                                                success: function (res) {

                                                }
                                                
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            }
        });
    }
})
Array.prototype.max = function () {
    return Math.max.apply({}, this)

}