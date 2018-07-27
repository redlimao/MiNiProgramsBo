// pages/shoplist/shoplist.js
const util = require('../../utils/util.js')
Page({
    data: {
        empty:1
    },

    onLoad: function (options) {
        util.showload('加载中');
        let that = this;
        let texts = options.name;
        let id = options.id;
        wx.request({
            url: util.host + '/Little/Goods/search',
            data: { id:id, name:texts},
            method: 'GET',
            success: function(res) {
                // console.log(res);
                if(res.data.pi_goods == 1){
                    that.setData({
                        empty : 2
                    })
                }else{
                    that.setData({
                        list: res.data.pi_goods,
                        empty : 1 
                    })
                }
                wx.hideLoading();
            }
        })
    },
    bindDetail:function(e){
        let id = e.currentTarget.id;
        wx.navigateTo({
            url: '../../shopdetails/shopdetails?id=' + id
        })
    }
})