// pages/shop/shop.js
Page({
    data: {
        empty : 1,
        lists:[{
            name:'踢踢踢腿',
            time:"2017/02/31",
            money:500.00
        },{
            name: '踢踢踢腿',
            time: "2017/02/31",
            money: 500.00
        }]
    },
    onLoad: function (options) {

    },
    // 返回
    bindBack: function () {
        wx.navigateBack({
            delta: 1,
        })
    }
})