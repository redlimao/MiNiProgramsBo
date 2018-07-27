Page({
    data: {
        
    },
    onLoad: function (options) {
        var that = this;
        wx.showLoading({
            title: '加载中',
            mask: true,
            success: function(res) {
                wx.getStorage({
                    key: 'pics',
                    success: function (res) {
                        console.log(res.data)
                        that.setData({
                            user: res.data
                        })
                        console.log(that.data.user);
                    },
                    fail: function () {
                        console.log('11')
                    },
                    complete: function () {
                        console.log('22')
                    }
                })
                wx.hideLoading()
            }
        })

    },
    //返回上一步
    bindBack:function(){
        wx.navigateBack({
            delta: 1,
        })
    },
    //发布
    bindsubmit: function (e) {
        var that = this;
        wx.showLoading({
            title: '发布中',
            mask: true,
            success: function(res) {
                console.log(that.data.user)
                wx.hideLoading();
                wx.showToast({
                    title: '发布成功',
                    icon: 'none',
                    mask: true,
                })
            }
        })
    }
})