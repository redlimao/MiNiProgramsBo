//index.js
Page({
    data: {
        // 测试数据
        list: [
            { img: '../../../images/test/4.jpg', texts: '小公举', tip: '模特' }, 
            { img: '../../../images/test/5.jpg', texts: '小公举', tip: '策划案例' }, 
            { img: '../../../images/test/6.jpg', texts: '小公举', tip: '摄影师' }, 
            { img: '../../../images/test/7.jpg', texts: '小公举', tip: '化妆师' }, 
            { img: '../../../images/test/8.jpg', texts: '小公举', tip: '策划案例' }
        ],
        menu_one: ['未计时', '开始计时', '暂停计时','已完成'],
        current:1
    },
    onLoad:function(options){

    },
    //菜单切换
    bindTap: function (e) {
        this.setData({
            current: e.currentTarget.dataset.index
        })
    },
    // 跳转到详情
    bindDetail:function(){
        var that = this;
        wx.navigateTo({
            url: '../orderdetail/orderdetail?current=' + that.data.current
        })
    }
})
