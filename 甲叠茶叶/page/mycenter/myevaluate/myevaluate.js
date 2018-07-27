//publishcomments.js
const util = require('../../utils/util.js')
Page({
    data: {
        flag_icon: 1,
        star1: [{ flag: 2 }, { flag: 2 }, { flag: 2 }, { flag: 2 }, { flag: 2 }],
        star2: [{ flag: 2 }, { flag: 2 }, { flag: 2 }, { flag: 2 }, { flag: 2 }],
        star_num1: 5,
        star_num2: 5,
        orders_id: '',
        types:''
    },

    onLoad: function (options) {
        this.setData({
            id: options.id,
        })
    },
    //描述相符
    bindstar1: function (e) {
        var index = e.currentTarget.dataset.id;
        var star1 = this.data.star1;
        for (var i = 0; i < star1.length; i++) {
            if (index >= i) {
                star1[i].flag = 2;
            } else {
                star1[i].flag = 1;
            }
        }
        this.setData({
            star1: star1,
            star_num1: index
        })
    },
    //服务质量
    bindstar2: function (e) {
        var index = e.currentTarget.dataset.id;
        var star2 = this.data.star2;
        for (var i = 0; i < star2.length; i++) {
            if (index >= i) {
                star2[i].flag = 2;
            } else {
                star2[i].flag = 1;
            }
        }
        this.setData({
            star2: star2,
            star_num2: index
        })
    },
    //匿名选择
    bindIcon: function () {
        var flag_icon = this.data.flag_icon;
        if (flag_icon == 1) {
            this.setData({
                flag_icon: 2
            })
        } else {
            this.setData({
                flag_icon: 1
            })
        }
    },
    //提交表单
    formSubmit: function (e) {
        util.showload('加载中');
        let that = this;
        if (e.detail.value.area == '') {
            util.showToast('评价内容不能为空！');
        } else {
            wx.request({
                url: util.host + '/Little/Center/ping',
                data: { orders_id: that.data.id, content: e.detail.value.area, one: that.data.star_num1, two: that.data.star_num2, status: that.data.flag_icon, types:1},
                method: "GET",
                success: function (res) {
                    console.log(res);
                    wx.hideLoading();
                    if (res.data == 3) {
                        util.showToast('请填写完整的信息！');
                    } else if (res.data == 1) {
                        wx.showToast({
                            title: '提交成功',
                            icon:'success',
                            success: function () {
                                wx.switchTab({
                                    url: '../../taber/mycenter/mycenter',
                                })
                            }
                        })
                    } else if (res.data == 2) {
                        util.showToast('提交失败！');
                    } else if (res.data == 0) {
                        util.showToast('包含敏感词汇评论失败！');
                    }
                }
            })
        }
    }
})
