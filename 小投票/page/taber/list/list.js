// pages/list/list.js
Page({
    data: {
        current:1,
        empty:1,
        list:[{
            tip:'',
            img:'',
            name:'Aryanna Ryan',
            title:"幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票大赛，幼儿园最萌宝宝。幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票大赛，幼儿园最萌宝宝。",
            time:'2018/05/06',
            num:100,
            flag:1
        },{
            tip: '',
            img: '',
            name: 'Aryanna Ryan',
            title: "幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票大赛，幼儿园最萌宝宝。幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票大赛，幼儿园最萌宝宝。",
            time: '2018/05/06',
            num: 100,
            flag: 2
        }]
    },
    onShow: function () {
        wx.showLoading({
            title: '加载中',
            mask: true,
            success: function (res) {
                wx.hideLoading()
            },
            fail: function (res) {
                wx.hideLoading();
                wx.showToast({
                    title: '加载失败',
                    icon: 'none',
                    mask: true
                })
            }
        })   
    },
    //tab切换
    bindTap:function(e){
        this.setData({
            current:e.target.dataset.index
        })
    },
    //跳转详情页面
    bindDetail:function(e){
        var index = e.currentTarget.dataset.index;
        if(index == 1){
            wx.navigateTo({
                url: '../../list/wordLook/wordLook',
                success: function(res) {

                },
            })
        }else{
            wx.navigateTo({
                url: '../../list/picLook/picLook',
                success: function (res) {
                    
                 },
            })
        }
    },
    onPullDownRefresh: function () {
    
    },
    onReachBottom: function () {
    
    },
    onShareAppMessage: function () {
    
    }
})