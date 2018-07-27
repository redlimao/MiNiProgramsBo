// orders
Page({
    /**
     * 页面的初始数据
     */
    data: {
        empty:1,
        id : ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取navigator链接后的参数
        var that = this;
        var id = options.id;
        this.setData({
            id : id
        })
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Goods/dian_type',
            data: { type: id },
            method: "GET",
            success: function (res) {
                console.log(res)
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
            },
            complete:function(){
                wx.hideLoading();
            }
        })
    },
    bindDetail:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../healthydetails/healthydetails?id='+ id,
        })
    },
    //下拉刷新
    onPullDownRefresh: function () {
        var that = this;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Goods/dian_type',
            data: { type: that.data.id },
            method: "GET",
            success: function (res) {
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

            },
            complete: function () {
                wx.stopPullDownRefresh();
            }
        })
    }
})