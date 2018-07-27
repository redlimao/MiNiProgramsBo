// pages/my_points/my_points.js
Page({
    data: {
        img: '../../../images/test/1.jpg',
        name: 'BBB',
        money: 100,
        list: [{ name: 'TT', time: '2018-07-47 80:00', money: 100 }],

        current : 0,
        empty:0,
    },
    onLoad: function (options) {
        var that=this;
    },
    tabFun: function (e) {
        //获取触发事件组件的dataset属性 
        var index = e.target.dataset.id;
        this.setData({
            current:index
        }); 
    },
    // =====积分协议
    bindPointstext:function(){
        wx.navigateTo({
            url: '../rule/rule',
        })
    }
})