var WxParse = require('../../../wxParse/wxParse.js');
Page({
    data: {
        wei:"",
        jing:"",
        tel :""
    },
    onLoad:function(){

    },
    telName: function () {
        var tel=this.data.tel;
        wx.makePhoneCall({
            phoneNumber: tel
        })
    },
    mapName: function () {
        var wei =Number(this.data.wei);
        var jing = Number(this.data.jing);
        wx.openLocation({
            latitude: wei,
            longitude: jing,
            scale: 28
        })
    }
})