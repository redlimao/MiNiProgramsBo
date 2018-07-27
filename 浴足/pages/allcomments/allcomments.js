//details.js
Page({
    data: {
        shop_id:'',
        empty:1,
        current:1
    },

    onLoad: function (options) {
        // console.log(options.current);
        this.setData({
            shop_id: options.id,
            current:options.current
        })
        var that = this;
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Goods/pings',
            data: { id: that.data.shop_id, type: that.data.current},
            method:'GET',
            success:function(res){
                console.log(res);
                that.setData({
                    z_p: res.data.z_p,
                    z_ps: res.data.z_ps,
                    miao_p: res.data.miao_p,
                    miao_ps: res.data.miao_ps,
                    fu_p:res.data.fu_p,
                    fu_ps: res.data.fu_ps,
                    ping_counts: res.data.ping_counts
                })
                //判断是否有评论
                if(res.data.ping_info == 1){
                    that.setData({
                        empty : 0
                    })
                }else{
                    that.setData({
                        empty : 1,
                        ping_info: res.data.ping_info
                    })
                }
            },
            complete:function(){
                wx.hideLoading();
            }
        })
    },
    //评价切换
    bindTag:function(e){
        var that = this;
        var current = e.currentTarget.dataset.id;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Goods/pings',
            data: { id: that.data.shop_id, type: current},
            method: 'GET',
            success:function(res){
                // console.log(res);
                //判断是否有评论
                if (res.data.ping_info == 1) {
                    that.setData({
                        empty: 0
                    })
                } else {
                    that.setData({
                        empty: 1,
                        ping_info: res.data.ping_info
                    })
                }
            }
        })
        this.setData({
            current: current
        })
    }
})
