Page({
    data: {
        banner:[{
            img:'../../../images/banner.png'
        }],
        current:0
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
            mask: true,
            success: function(res) {
                wx.hideLoading()
            },
            fail: function(res) {
                wx.hideLoading();
                wx.showToast({
                    title: '加载失败',
                    icon:'none',
                    mask:true
                })
            }
        })
    },
    onShow: function () {
        
    },
    //轮播切换
    bindCurrent:function(e){
        this.setData({
            current:e.detail.current
        })
    },
    bindWord:function(){
        wx.navigateTo({
            url: '../../index/textVoting/textVoting',
        })
    },
    bindPic:function() {
        wx.navigateTo({
            url: '../../index/picVoting/picVoting',
        })
    },
    onShareAppMessage: function () {
        
    }
})