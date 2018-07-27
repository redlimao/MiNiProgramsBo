Page({
    data: {

    },
    onLoad:function(){
        // wx.showLoading({
        //     title: '加载中',
        //     mask: true,
        // })
        var that = this;
        var user_id = wx.getStorageSync('user');
        var times = wx.getStorageSync('words');
        console.log(times);
        this.setData({
            user_id: user_id,
            name:times.name,
            time:times.time_one + ' ' + times.time_start +'-'+times.time_end,
            time_start:times.time_one + times.time_start,
            time_end: times.time_one + times.time_end,
            index : times.index,
            money : (Number(times.money) * 0.2)
        })
        var user_id = that.data.user_id;

    }
})
