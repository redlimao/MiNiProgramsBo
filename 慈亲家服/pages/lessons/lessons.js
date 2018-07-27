Page({
    data: {
        banner: [{ img: '../image/banner1.png' }, { img: '../image/banner1.png' }, { img: '../image/banner1.png' }],
        menu_one: ['洗完', '洗完', '洗完', '洗完', '洗完', '洗完', '洗完'],
        current:1,
        list: [{ title: '课程1', num1: 1, num2:2}]
    },
    onLoad: function (options) {
        
    },
    bindChange:function(e){
        var index = e.detail.current;
        this.setData({
            currentIndex : index
        })
    },
    bindTab:function(e){
        this.setData({
            current : e.target.dataset.index
        })
    },
    bindDetail:function(e){
        wx.navigateTo({
            url: '../i-video/i-video',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    }
})
