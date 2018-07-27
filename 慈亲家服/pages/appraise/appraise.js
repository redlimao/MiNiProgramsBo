var util = require('../../utils/util.js')

Page({
    data: {
        star1: [{ flag: true }, { flag: false }, { flag: false }, { flag: false }, { flag: false }],
        star2: [{ flag: true }, { flag: false }, { flag: false }, { flag: false }, { flag: false }],
        star3: [{ flag: true }, { flag: false }, { flag: false }, { flag: false }, { flag: false }],
        star4: [{ flag: true }, { flag: false }, { flag: false }, { flag: false }, { flag: false }],
        num1: 1,
        num2: 1,
        num3: 1,
        num4: 1,
        tags: [{ name: '100.0', flag: false }, { name: '100.0', flag: false }, { name: '100.0', flag: false }],
        flag_pop:false,
        moneys:0
    },
    onLoad: function (options) {
        
    },
    // 礼仪礼节
    bindStarOne:function(e){
        var index = e.currentTarget.dataset.id;
        var star = this.data.star1;
        util.forEachStar(star, index);
        this.setData({
            star1:star,
            num1:index + 1
        })
    },
    // 服务技能
    bindStarTwo: function (e) {
        var index = e.currentTarget.dataset.id;
        var star = this.data.star2;
        util.forEachStar(star, index);
        this.setData({
            star2: star,
            num2: index + 1
        })
    },
    // 语言沟通
    bindStarThree: function (e) {
        var index = e.currentTarget.dataset.id;
        var star = this.data.star3;
        util.forEachStar(star, index);
        this.setData({
            star3: star,
            num3: index + 1
        })
    },
    // 流程操作
    bindStarFour: function (e) {
        var index = e.currentTarget.dataset.id;
        var star = this.data.star4;
        util.forEachStar(star, index);
        this.setData({
            star4: star,
            num4: index + 1
        })
    },
    // 选择打赏金额
    bindChooseMoney:function(e){
        var index = e.currentTarget.dataset.index;
        var tags = this.data.tags;
        if (tags[index].flag == true) {
            tags[index].flag = false;
        } else {
            tags.forEach(function (value, item, array) {
                value.flag = false;
            })
            tags[index].flag = true;
        }
        //判断是否有选中的标签
        var flag = tags.some(function(value,item,array){
            return value.flag;
        })
        if(flag){
            this.setData({
                moneys:0
            })
        }
        console.log(flag);
        this.setData({
            tags: tags
        })
    },
    // 打开弹窗
    bindOpenPop:function(){
        this.setData({
            flag_pop:true,
            money:0
        })
    },
    // 隐藏弹窗
    HideOpenPop: function () {
        this.setData({
            flag_pop: false
        })
    },
    // 增加打赏金额
    bindAdd:function(){
        var money = this.data.money;
        if(money > 999){
            money = 999;
        }else{
            money++;
        }
        this.setData({
            money: money
        })
    },
    // 减少打赏金额
    bindSubtract: function () {
        var money = this.data.money;
        if (money <= 0) {
            money = 0;
        } else {
            money--;
        }
        this.setData({
            money: money
        })
    },
    bindInput:function(e){
        console.log(e);
        var money = Number(e.detail.value);
        if(money > 999){
            money = 999
        }
        if (money < 0) {
            money = 0
        }
        this.setData({
            money:money
        })
    },
    // 确认赏金
    bindfind:function(e){
        var money = e.currentTarget.dataset.money;
        var tags = this.data.tags;
        if(money > 0){
            tags.forEach(function(value,item,array){
                value.flag = false
            })
        }
        this.setData({
            flag_pop:false,
            moneys:money,
            tags: tags
        })
    },
    //评价
    bindApp:function(){
        var tags = this.data.tags;
        var moneys = this.data.moneys;
        var end_money = 0;
        if(moneys > 0){
            end_money = moneys;
        }else{
            var arr = tags.filter(function(value,item,array){
                return value.flag;
            })
            if(arr.length == 0){
                end_money = 0
            }else{
                end_money = arr[0].name;
            }
        }
        console.log(end_money);
    }
})
