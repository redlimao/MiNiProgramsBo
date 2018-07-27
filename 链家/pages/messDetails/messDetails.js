// messDetails
var WxParse = require('../../wxParse/wxParse.js');
Page({
    data: {

    },
    onLoad: function (options) {
        var that = this;
        var id = options.zixunid;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Info/news',
            data: {id:id },
            method: "GET",
            success:function(res){
                console.log(res);
                var article = res.data.info.content
                WxParse.wxParse('article', 'html', article, that, 5)
                that.setData({
                    list: res.data.info
                })
            }
        })
    },

})