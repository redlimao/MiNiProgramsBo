// orders
Page({
    data: {
        empty:1,
        currentIndex:1,
        user_id :''
    },
    onLoad: function (options) {
        var that = this;
        var id = options.id;
        // console.log(id);
        this.setData({
            user_id: id
        });
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/coupons',
            data: { id: that.data.user_id, type: that.data.currentIndex},
            method: "GET",
            success:function(res){
                console.log(res);
                if(res.data.info != 1){
                    that.setData({
                        empty : 1,
                        list: res.data.info
                    })
                }else{
                    that.setData({
                        empty: 0
                    })                    
                }

            },
            complete:function(){
                wx.hideLoading();
            }
        })
    },
    // 滑动菜单切换
    tabs: function (e) {
        this.setData({
            currentIndex: e.currentTarget.dataset.id
        });
        var that = this;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/coupons',
            data: { id: that.data.user_id, type: that.data.currentIndex },
            method: 'GET',
            success: function (res) {
                console.log(res);
                if (res.data.info != 1) {
                    that.setData({
                        empty: 1,
                        list: res.data.info
                    })
                } else {
                    that.setData({
                        empty: 0
                    })
                }
            }
        })
    }
})