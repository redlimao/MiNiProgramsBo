//storedetail.js
const WxParse = require('../../../wxParse/wxParse.js');
const util = require('../../utils/util.js');
Page({
    data: {
    },
    onLoad:function(options){
        util.showload('加载中');
        let id = options.id;
        let that = this;
        wx.request({
            url: util.host + '/Little/Company/detail',
            data: { id : id},
            method: 'GET',
            success: function(res) {
                let article = res.data.info.intro;
                WxParse.wxParse('article', 'html', article, that, 5);
                that.setData({
                    store_img:res.data.info.two,
                    store_name:res.data.info.name,
                    phone: res.data.info.phone,
                    address: res.data.info.address,
                    latitude: Number(res.data.info.wei),
                    longitude: Number(res.data.info.jing),
                    img:res.data.info.one
                })
                wx.hideLoading();
            }
        })
        
    },
    //导航
    bindLocation: function (e){
        let that = this;
        console.log(that.data.latitude, that.data.longitude)
        wx.openLocation({
            latitude: that.data.latitude, //纬度
            longitude: that.data.longitude, //经度
            scale: 28,
            address: that.data.address,
            success: function (res) {
                console.log(res);
            },
        })
    },
    //拨打电话
    bindPhone: function (e){
        let phone = this.data.phone;
        wx.makePhoneCall({
            phoneNumber: phone
        })
    },
    // 预览图片
    bindPerview: function (e){
        let url = e.currentTarget.dataset.url;
        let arr = this.data.img;//当前图片数组
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: arr // 需要预览的图片http链接列表
        })
    }
})
