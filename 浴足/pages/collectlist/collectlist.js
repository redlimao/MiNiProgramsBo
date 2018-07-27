// orders
Page({
  /**
   * 页面的初始数据
   */
  data: {
        empty:1,
        user_id :''
    },
    onLoad: function (options) {
        this.setData({
            user_id: options.id
        })      
        var that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/collect',
            data: { id: that.data.user_id},
            method: "GET",
            success:function(res){
                console.log(res);
                //商品
                if (res.data.goods != 1) {
                    that.setData({
                        empty: 1,
                        goods: res.data.goods,
                    })
                } else {
                    that.setData({
                        empty: 0,
                    })
                }
            },
            complete:function(){
                wx.hideLoading();
            }
        })
    },
    //跳转到详情页面
    bindDetails: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../details/details?id=' + id,
        })
    }
})