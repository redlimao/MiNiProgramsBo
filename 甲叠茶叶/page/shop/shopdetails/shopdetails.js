const WxParse = require('../../../wxParse/wxParse.js');
const util = require('../../utils/util.js')
Page({

    data: {
        curHdIndex:1, //tab切换
        empty:1,
        flag_collect :0,  //判断收藏默认为1
        pop_flag:false, //显示隐藏弹出层
        pop_anim:false,
        cut_flag:true //可以购买和加入购物车
    },
    onLoad: function (options) {
        util.showload('加载中');
        let that = this;
        let id = options.id;
        this.setData({
            id:id
        })
        wx.login({
            success: function(res) {
                if(res.code){
                    wx.request({
                        url: util.host + '/Little/Info/goodss',
                        data: {id:id,code:res.code},
                        method: 'GET', 
                        success: function(res) {
                            console.log(res);
                            util.for_each(res.data.info[0].size);
                            let article = res.data.info[0].intro;
                            WxParse.wxParse('article', 'html', article, that, 5);
                            that.setData({
                                banner: res.data.info[0].shop_img,
                                shop_money: res.data.price,
                                shop_name: res.data.info[0].shop_name,
                                pop_name: res.data.info[0].shop_name,
                                pop_money: res.data.price,
                                shop_self: res.data.info[0].xiao,
                                flag_collect:res.data.shou,
                                pop_img:res.data.info[0].size[0].img,
                                tags:res.data.info[0].size,
                                login:res.data.login //判断用户是否登录
                            })
                            if (Number(res.data.info[0].shop_num)===0){
                                that.setData({
                                    numbers: 0,
                                    shop_num: Number(res.data.info[0].shop_num),
                                    cut_flag:false //购物车和购买失效
                                })
                            }else{
                                that.setData({
                                    numbers: 1,
                                    shop_num: Number(res.data.info[0].shop_num)
                                })
                            }
                            wx.hideLoading();
                        }
                    })
                }
            }
        })
    },
    // 预览图片
    bindPerview: function (e) {
        let url = e.currentTarget.dataset.url;
        let arr = this.data.banner;//当前图片数组
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: arr // 需要预览的图片http链接列表
        })
    },
    //暂无库存
    bindCut:function(){
        util.showToast('暂无库存');
    },
    // 跳转购物车
    bindmycart:function(){
        let login = this.data.login;
        if(login == 1){
            wx.navigateTo({
                url: '../../mycenter/mycart/mycart',
            })
        }else{
            wx.showModal({
                title: '温馨提示',
                content: '您还未登录，请点击确认前往个人中心登录',
                showCancel: false,
                success: function (res) {
                    wx.switchTab({
                        url: '../../taber/mycenter/mycenter'
                    })
                }
            })
        }
    },
    // ===========收藏
    bindCollect: function () {
        util.showload('加载中');
        let that = this;
        let login = this.data.login;
        if(login == 1){
            let flag_collect = this.data.flag_collect;
            let id = this.data.id;
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.request({
                            url: util.host + '/Little/Collect/indexs',
                            data: { id: id, code: res.code },
                            method: 'GET',
                            success: function (res) {
                                wx.hideLoading();
                                if (res.data == 1) {
                                    util.showToast('收藏成功', () => {
                                        that.setData({
                                            flag_collect: 1
                                        })
                                    });
                                }
                                if (res.data == 0) {
                                    util.showToast('收藏失败', () => {
                                        that.setData({
                                            flag_collect: 0
                                        })
                                    });
                                }
                                if (res.data == 2) {
                                    util.showToast('取消收藏', () => {
                                        that.setData({
                                            flag_collect: 0
                                        })
                                    });
                                }
                                if (res.data == -2) {
                                    util.showToast('取消失败', () => {
                                        that.setData({
                                            flag_collect: 1
                                        })
                                    });
                                }
                                wx.hideLoading()
                            }
                        })
                    }
                }
            })
        }else{
            wx.hideLoading()
            wx.showModal({
                title: '温馨提示',
                content: '您还未登录，请点击确认前往个人中心登录',
                showCancel: false,
                success: function (res) {
                    wx.switchTab({
                        url: '../../taber/mycenter/mycenter'
                    })
                }
            })
        }

    },
    // ======查看全部评论
    bindAllcomments:function(e){
        let id = this.data.id;
        wx.navigateTo({
            url: '../allcomments/allcomments?id=' + id + '&current=1',
        })
    },
    //跳转到对应的评价
    bindTag:function (e) {
        let current = e.currentTarget.dataset.id;
        let id = this.data.id;
        wx.navigateTo({
            url: '../allcomments/allcomments?id=' + id + '&current=' + current,
        })
    },
    //tab切换 评论 产品详情
    tabFun: function (e) {
        util.showload('加载中');
        let that = this;
        let id = this.data.id;
        this.setData({
            curHdIndex: e.target.dataset.id
        });
        wx.request({
            url: util.host + '/Little/Info/switch_type',
            data: { id:id, type: that.data.curHdIndex},
            method: 'GET',
            success: function(res) {
                console.log(res);
                if (that.data.curHdIndex == 1){
                    let article = res.data.info
                    WxParse.wxParse('article', 'html', article, that, 5)
                } else if (that.data.curHdIndex == 2){
                    if (res.data.info == 1) {
                        that.setData({
                            empty: 2
                        })
                    } else {
                        that.setData({
                            empty: 1,
                            ping: res.data.info,
                            ping_cont: res.data.num
                        })
                    }
                }
                wx.hideLoading();
            }
        })
    },
    //显示弹出层
    bindPop:function(e){
        let login = this.data.login;
        if(login == 1){
            //判断弹出层按钮 1=》购物城 2=》立即购买
            let flag = Number(e.currentTarget.dataset.type);
            if (flag === 1) {
                this.setData({
                    btn_flag: 1
                })
            } else {
                this.setData({
                    btn_flag: 2
                })
            }
            this.setData({
                pop_flag: true,
            })
            setTimeout(() => {
                this.setData({
                    pop_anim: true
                })
            }, 400);
        }else{
            wx.showModal({
                title: '温馨提示',
                content: '您还未登录，请点击确认前往个人中心登录',
                showCancel: false,
                success: function (res) {
                    wx.switchTab({
                        url: '../../taber/mycenter/mycenter'
                    })
                }
            })
        }
    },
    //隐弹出层
    hidePop:function(){
        this.setData({
            pop_anim: false
        })
        setTimeout(() => {
            this.setData({
                pop_flag: false
            })
        }, 400);
    },
    // 选择标签
    bindTags:function(e){
        let index = e.currentTarget.dataset.index;
        let tags = this.data.tags;
        let img = tags[index].img;
        let money = tags[index].size_money;
        util.tag(tags,index,'flag');
        this.setData({
            pop_money: money,
            pop_img : img,
            tags : tags
        })
    },
    // 加减数字
    bindMinus: function () {
        let numbers = this.data.numbers;
        numbers--;
        if (numbers <= 1) {
            numbers = 1;
        }
        this.setData({
            numbers: numbers
        })
    },
    bindAdd:function(){
        let shop_num = this.data.shop_num;
        let numbers = this.data.numbers;
        numbers++;
        if (numbers >= shop_num){
            util.showToast('已超出库存数量');
            numbers = shop_num;
        }
        if (numbers >= 99) {
            numbers = 99;
        }
        this.setData({
            numbers: numbers
        })
    },
    //加入购物车
    bindAddShop: function () {
        util.showload('加载中');
        // 获取要存储的数据
        let tags = this.data.tags;
        let arr_tag = tags.filter((item) => {
            return item.flag == 2;
        })
        if (arr_tag.length == 0) {
            util.showToast('您未选择类别');
        } else {
            // let shop_name = this.data.pop_name;
            let shop_money = this.data.pop_money;
            let tag_name = arr_tag[0].size_name;
            let numbers = this.data.numbers;
            // let shop_img = this.data.pop_img;
            let id = this.data.id;
            wx.login({
                success: function(res) {
                    if(res.code){
                        wx.request({
                            url: util.host + '/Little/Goods/carss',
                            data: { id: id, nums: numbers, no: tag_name, money: shop_money, type: 2 ,code:res.code},
                            method: 'GET',
                            success: function (res) {
                                wx.hideLoading();
                                if (res.data == 1) {
                                    wx.showToast({
                                        title: '加入购物城成功',
                                        icon: 'success',
                                        mask: true,
                                        success:function(){
                                            setTimeout(()=>{
                                                wx.navigateTo({
                                                    url: '../../mycenter/mycart/mycart',
                                                })
                                            },300);
                                        }
                                    })
                                } else {
                                    util.showToast('加入购物车失败');
                                }
                            }
                        })
                    }
                }
            })
        }

    },
    //立即购买
    bindBuyNow:function(){
        // 获取要存储的数据
        let tags = this.data.tags;
        let arr_tag = tags.filter((item) => {
            return item.flag == 2;
        })
        if(arr_tag.length == 0){
            util.showToast('您未选择类别');
        }else{
            let shop_name = this.data.pop_name;
            let shop_money = this.data.pop_money;
            let tag_name = arr_tag[0].size_name;
            let numbers = this.data.numbers;
            let shop_img = this.data.pop_img;
            let id = this.data.id;
            wx.navigateTo({
                url: '../createorder/createorder?shopname=' + shop_name + '&shopmoney=' + shop_money + '&tagname=' + tag_name + '&numbers=' + numbers + '&shopimg=' + shop_img + '&id=' + id
            })
        }

    }
})