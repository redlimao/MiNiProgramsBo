//pages/messages/messages
Page({
    /**
     * 页面的初始数据
     */
    data: {

    },

    onLoad: function (options) {
        var that = this;
        var orders_id = options.ordersid;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Orders/info',
            data: {id: orders_id},
            method: "GET",
            success:function(res){
                console.log(res);
                that.setData({
                    list:res.data.list,
                    list_fu:res.data.fu,
                    tags:res.data.tags
                })
            }
        })
    },
    bindPhone: function (e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone,
        })
    },
    
})