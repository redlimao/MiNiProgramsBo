//myevaluateapp.js
const util = require('../../utils/util.js')
Page({
    data: {
        star:[1,1,1,1,1],
        star1: [1,1,1,1,1],
        star2: [1,1,1,1,1],
        star3: [1, 1, 1, 1, 1],
        star4: [1, 1, 1, 1, 1],
        star5: [1, 1, 1, 1, 1]
    },

    onLoad: function (options) {
        let id = options.id;
        this.setData({
            id:id
        })
    },
    //茶艺专业
    bindstar1: function (e) {
        var index = e.currentTarget.dataset.id;
        var star_arr = [];
        for (var i = 0; i < index; i++) {
            star_arr.push(1);
        }
        this.setData({
            star1: star_arr
        })
    },
    //饮茶环境
    bindstar2: function (e) {
        var index = e.currentTarget.dataset.id;
        var star_arr = [];
        for (var i = 0; i < index; i++) {
            star_arr.push(1);
        }
        this.setData({
            star2: star_arr
        })
    },
    //茶点点评
    bindstar3: function (e) {
        var index = e.currentTarget.dataset.id;
        var star_arr = [];
        for (var i = 0; i < index; i++) {
            star_arr.push(1);
        }
        this.setData({
            star3: star_arr
        })
    },
    //服务态度
    bindstar4: function (e) {
        var index = e.currentTarget.dataset.id;
        var star_arr = [];
        for (var i = 0; i < index; i++) {
            star_arr.push(1);
        }
        this.setData({
            star4: star_arr
        })
    },
    //茶品品质
    bindstar5: function (e) {
        var index = e.currentTarget.dataset.id;
        var star_arr = [];
        for (var i = 0; i < index; i++) {
            star_arr.push(1);
        }
        this.setData({
            star5: star_arr
        })
    },
    //提交评论
    bindTrue:function(){
        util.showload('加载中');
        let star1_num = this.data.star1.length;
        let star2_num = this.data.star2.length;
        let star3_num = this.data.star3.length;
        let star4_num = this.data.star4.length;
        let star5_num = this.data.star5.length;
        let id = this.data.id;
        wx.request({
            url: util.host + '/Little/Center/yue_ping',
            data: { yue_id: id, one: star1_num, two: star2_num,three: star3_num, four: star4_num, five: star5_num},
            method: 'GET',
            responseType: 'text',
            success: function(res) {
                wx.hideLoading();
                if(res.data.status == 1){
                    wx.showToast({
                        title: '评价成功',
                        icon: 'success',
                        mask: true,
                        success: function (res) {
                            setTimeout(()=>{
                                wx.navigateBack({
                                    delta: 1,
                                })
                            },500)
                        }
                    })
                }else{
                    util.showToast('评价失败');
                }
            }
        })
    }
})
