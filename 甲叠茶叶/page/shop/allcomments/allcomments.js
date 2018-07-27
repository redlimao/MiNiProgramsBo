//details.js
const util = require('../../utils/util.js')
Page({
    data: {
        shop_id:'',
        empty:1,
        current:1,
        types:''
    },

    onLoad: function (options) {
        this.setData({
            id: options.id,
            current:options.current
        })
        var that = this;
        util.showload('加载中');
        wx.request({
            url: util.host + '/Little/Goods/pingss',
            data: { id: that.data.id, type: that.data.current,types:1},
            method:'GET',
            success:function(res){
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
                wx.hideLoading();
            }
        })
    },
    // ======返回上一级
    backName: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    //评价切换
    bindTag:function(e){
        util.showload('加载中');
        let that = this;
        let current = e.currentTarget.dataset.id;
        this.setData({
            current: current
        })
        wx.request({
            url: util.host + '/Little/Goods/pingss',
            data: { id: that.data.id, type: current, types: 1},
            method: 'GET',
            success:function(res){
                console.log(res);
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
                wx.hideLoading();
            }
        })
    }
})
