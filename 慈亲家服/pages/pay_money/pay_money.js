Page({
    data: {
        pays: [{ name: "100乐斗", money: 100, flag: true }, { name: "100乐斗", money: 100, flag: false }, { name: "100乐斗", money: 100, flag: false }],
        flag:false
    },
    onLoad: function (options) {
        
    },
    // 乐豆明细
    bindIn:function(){
        wx.navigateTo({
            url: '../my_points/my_points',
        })
    },
    // 选择乐豆
    bindchoose:function(e){
        var index = e.currentTarget.dataset.index;
        var list = this.data.pays;

        list.forEach(function(value,item,array){
            value.flag = false;
            if(item == index){
                array[item].flag = true
            }
        })
        this.setData({
            pays:list
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
    // 支付乐豆
    bindPay:function(){
        var flag = this.data.flag;
        var list = this.data.pays;
        if(flag){
            wx.showLoading({
                title: '充值中',
                mask: true,
                success: function (res) {
                    var arr = list.filter(function (value, item, array) {
                        return value.flag
                    })
                    console.log(arr);
                },
                complete: function () {
                    wx.hideLoading()
                }
            })
        }else{
            wx.showToast({
                mask: true,
                icon: "none",
                title: '已无更多数据',
            })
        }
    }
})
