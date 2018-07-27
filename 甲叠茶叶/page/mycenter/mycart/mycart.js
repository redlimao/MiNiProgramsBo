const util = require('../../utils/util.js');
//myorder.js
Page({
    data: {
        // 数据测试
        btn_flag : 1,
        empty : 1,
        total_money:0,
        all_flag : 1 //全选 1=》未全选 2=》全选
    },
    onLoad:function(){
        util.showload('加载中');
        let that = this;
        wx.login({
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Center/carss',
                        data: {code:res.code},
                        method: 'GET',
                        success: function(res) {
                            console.log(res);
                            
                            if(res.data.cars == 1){
                                that.setData({
                                    empty : 2
                                })
                            }else{
                                util.for_each(res.data.cars);
                                that.setData({
                                    list:res.data.cars,
                                    empty : 1
                                })
                                that.totalMoney();
                            }
                            wx.hideLoading();
                        }
                    })
                }
            },
        })
    },
    //计算总价
    totalMoney:function(){
        var list = this.data.list;
        var total_money = 0;
        list.forEach((item)=>{
            if(item.flag == 2){
                total_money += Number(item.nums) * Number(item.moneys);
            }
        })
        this.setData({
            total_money: total_money
        })
    },
    // 管理
    bindShowBtn:function(){
        this.setData({
            btn_flag : 2
        })
    },
    // 取消
    bindHideBtn: function () {
        this.setData({
            btn_flag: 1
        })
    },
    // 单选
    bindChoose:function(e){
        let list = this.data.list;
        let index = e.currentTarget.dataset.index;
        let flag = list[index].flag;
        if(flag == 1){
            flag = 2
        }else{
            flag = 1
        }
        list[index].flag = flag;
        //判断有没有全部选中的
        let flags = list.every((item)=>{
            return item.flag == 2;
        })
        if(flags){
            this.setData({all_flag : 2})
        }else{
            this.setData({all_flag: 1})
        }
        this.setData({
            list : list
        })
        this.totalMoney();
    },
    // 全选
    bindAllChoose:function(){
        let list = this.data.list;
        let all_flag = this.data.all_flag;
        if(all_flag == 1){
            list.forEach((item)=>{
                item.flag = 2
            })
            this.setData({
                all_flag: 2
            })
        }else{
            list.forEach((item) => {
                item.flag = 1
            })
            this.setData({
                all_flag: 1
            })
        }
        this.setData({
            list: list
        })
        this.totalMoney();
    },
    // 删除
    bindDelete: function () {
        let that = this; 
        let list = this.data.list;
        // 判断是否有选中的商品
        let flag = list.some((item)=>{
            return item.flag == 2
        })
        if(flag){
            util.showload('删除中',()=>{
                //获取未选中的列表
                let new_arr = list.filter((item)=>{
                    return item.flag == 1;
                })
                //获取选中的列表
                let del_arr = list.filter((item)=>{
                    return item.flag == 2;
                })
                wx.login({
                    success: function(res) {
                        if(res.code){
                            wx.request({
                                url: util.host + '/Little/Center/test',
                                data: { code:res.code,ids:del_arr},
                                method: 'GET',
                                success: function (res) {
                                    console.log(res);
                                    wx.hideLoading();
                                    if(res.data.status == 1){
                                        wx.showToast({
                                            title: '删除成功',
                                            icon: 'success',
                                            mask: true,
                                            success: function (res) {
                                                if (new_arr.length == 0) {
                                                    that.setData({
                                                        empty: 2
                                                    })
                                                } else {
                                                    that.setData({
                                                        list: new_arr,
                                                        empty: 1
                                                    })
                                                }
                                                that.totalMoney();
                                            },
                                        })                                       
                                    }else{
                                        util.showToast('删除失败');
                                    }

                                }
                            })
                        }
                    },
                })


            })
        }else{
            util.showToast('您未选择商品');
        }
    },
    //跳转订单页面
    bindOrder:function(){
        let list = this.data.list;
        let total_money = this.data.total_money;
        if(total_money === 0){
            util.showToast('请选择商品');
        }else{
            let new_arr = list.filter((item)=>{
                return item.flag == 2;
            })
            let carts = {
                total_money : total_money,
                list: new_arr
            }
            wx.setStorage({
                key: 'cart',
                data: carts,
                success: function(res) {
                    wx.navigateTo({
                        url: '../../mycenter/cartorder/cartorder',
                    })
                },
            })
            console.log(new_arr, total_money);
        }
    },
    // 加减数字
    // bindMinus: function (e) {
    //     let list = this.data.list;
    //     let index = e.currentTarget.dataset.index;
    //     let numbers = list[index].numbers;
    //     numbers--;
    //     if (numbers <= 1) {
    //         numbers = 1;
    //     }
    //     list[index].numbers = numbers;
    //     this.setData({
    //         list: list
    //     })
    //     this.totalMoney();
    // },
    // bindAdd: function (e) {
    //     let list = this.data.list;
    //     let index = e.currentTarget.dataset.index;
    //     let numbers = list[index].numbers;
    //     numbers++;
    //     if (numbers >= 99) {
    //         numbers = 99;
    //     }
    //     list[index].numbers = numbers;
    //     this.setData({
    //         list: list
    //     })
    //     this.totalMoney();
    // },
})
