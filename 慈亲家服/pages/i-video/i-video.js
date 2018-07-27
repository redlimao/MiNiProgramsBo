// pages/i-video/i-video.js
Page({
    data: {
        currentIndex: 1,
        navIndex:0,
        play:false,
        listIndex:0  //==后台列表传入，测试
    },
    onLoad: function (options) {
    
    },
    // ===大导航
    tabFun: function (e) {
        this.setData({
            currentIndex: e.currentTarget.dataset.id
        })
    },
    // ===课程导航
    navFun: function (e) {
        this.setData({
            navIndex: e.currentTarget.dataset.id
        })
    },
    // ====查看列表视频
    lookVideo:function(){
        this.setData({
            listIndex:1
        })
    },
    // ====回到顶部
    topName:function(){
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
    },
    // ====播放视频
    playName:function(){
        this.setData({
            play:true
        })
    },
    // ====查看老师详情
    moreName:function(){
        wx.navigateTo({
            url: '../i-expertDetails/i-expertDetails',
        })
    }
})