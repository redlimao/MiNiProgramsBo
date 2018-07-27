const WxParse = require('../../../wxParse/wxParse.js');
const util = require('../../utils/util.js')
Page({
    data: {
        
    },
    //   index = 2 积分规则 index = 1充值须知 3转介规则
    onLoad: function (options) {
        util.showload('加载中');
        let that = this;
        let index = Number(options.index);
        if(index===1){
            wx.setNavigationBarTitle({
                title: '充值须知'
            })         
        }else if(index === 2){
            wx.setNavigationBarTitle({
                title: '积分规则'
            })
        }else{
            wx.setNavigationBarTitle({
                title: '转介规则'
            })
        }
        wx.request({
            url: util.host + '/Little/Center/xie_rules',
            data: { type: index },
            method: 'GET',
            success: function (res) {
                let article = res.data.info;
                WxParse.wxParse('article', 'html', article, that, 5);
                wx.hideLoading();
            },
        })  
    }
})