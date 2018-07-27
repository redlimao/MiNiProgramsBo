var config = require('../../../app.js').config;
//index.js
Page({
    data: {
        // 数据测试
        img: ['../../../images/test/1.jpg', '../../../images/test/2.jpg', '../../../images/test/3.jpg'],
        list_a: [{ img: '../../../images/test/4.jpg', texts: '小公举' }, { img: '../../../images/test/5.jpg', texts: '小公举' }, { img: '../../../images/test/6.jpg', texts: '小公举' }, { img: '../../../images/test/7.jpg', texts: '小公举' }, { img: '../../../images/test/8.jpg', texts: '小公举' }],
        list_b: [{ img: '../../../images/test/4.jpg', texts: '小公举' }, { img: '../../../images/test/5.jpg', texts: '小公举' }, { img: '../../../images/test/6.jpg', texts: '小公举' }, { img: '../../../images/test/7.jpg', texts: '小公举' }, { img: '../../../images/test/8.jpg', texts: '小公举' }],
        list_c: [{ img: '../../../images/test/4.jpg', texts: '小公举' }, { img: '../../../images/test/5.jpg', texts: '小公举' }, { img: '../../../images/test/6.jpg', texts: '小公举' }, { img: '../../../images/test/7.jpg', texts: '小公举' }, { img: '../../../images/test/8.jpg', texts: '小公举' }],
        list_d: [{ img: '../../../images/test/4.jpg', texts: '小公举' }, { img: '../../../images/test/5.jpg', texts: '小公举' }, { img: '../../../images/test/6.jpg', texts: '小公举' }, { img: '../../../images/test/7.jpg', texts: '小公举' }, { img: '../../../images/test/8.jpg', texts: '小公举' }],
        list_e: [{ img: '../../../images/test/4.jpg', texts: '小公举' }, { img: '../../../images/test/5.jpg', texts: '小公举' }, { img: '../../../images/test/6.jpg', texts: '小公举' }, { img: '../../../images/test/7.jpg', texts: '小公举' }, { img: '../../../images/test/8.jpg', texts: '小公举' }],
        list_f: [{ img: '../../../images/test/4.jpg', texts: '小公举' }, { img: '../../../images/test/5.jpg', texts: '小公举' }, { img: '../../../images/test/6.jpg', texts: '小公举' }, { img: '../../../images/test/7.jpg', texts: '小公举' }, { img: '../../../images/test/8.jpg', texts: '小公举' }],
        list_g: [{ img: '../../../images/test/4.jpg', texts: '小公举' }, { img: '../../../images/test/5.jpg', texts: '小公举' }, { img: '../../../images/test/6.jpg', texts: '小公举' }, { img: '../../../images/test/7.jpg', texts: '小公举' }, { img: '../../../images/test/8.jpg', texts: '小公举' }],
    },
    onLoad:function(){
        var that = this;
        wx.showLoading({
            title: '加载中',
            mask: true,
        })
        wx.login({
            success: function(res) {
                console.log(res.code);
                if(res.code){
                    wx.request({
                        url: config.host + '/bz_video_wx/Index/list.do',
                        data: { code: res.code },
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                            that.setData({
                                img:res.data.banner_list,
                                list_a: res.data.pList,
                                list_b: res.data.cList,
                                list_c: res.data.mList,
                                list_d: res.data.derssList,
                                list_e: res.data.propsList,
                                list_f: res.data.placeList
                            })
                            var user_id = res.data.wx_user.id; 
                            wx.setStorageSync('user', user_id)

                        },
                        complete:function(){
                            wx.hideLoading();
                        }
                    })
                }
            }
        })
    },
    // 跳转详情
    bindMore:function(e){
        var index = Number(e.currentTarget.dataset.index);
        switch (index) {
            case 0:
                // 策划案例
                wx.navigateTo({
                    url: '../../index/details/details?index=0&types=1',
                })
                break;
            case 1:
                // 摄影师简介
                wx.navigateTo({
                    url: '../../index/details/details?index=1&types=2',
                })
                break;
            case 2:
                // 模特简介
                wx.navigateTo({
                    url: '../../index/details/details?index=2&types=2',
                })
                break;
            case 3:
                // 化妆师简历
                wx.navigateTo({
                    url: '../../index/details/details?index=3&types=2',
                })
                break;
            case 4:
                // 道具
                wx.navigateTo({
                    url: '../../index/details/details?index=4&types=3',
                })
                break;
            case 5:
                // 场景
                wx.navigateTo({
                    url: '../../index/details/details?index=5&types=1',
                })
                break;
            case 6:
                // 咨询
                wx.navigateTo({
                    url: '../../index/details/details?index=6&types=1',
                })
                break;
        }
    },
    // 跳转详情
    bindDetail:function(e){
        var types = e.currentTarget.dataset.type;
        var index = e.currentTarget.dataset.index;
        var id = e.currentTarget.dataset.id;
        if (types == 1 || types == 3){
            wx.navigateTo({
                url: '../../index/texts/texts?types=' + types + '&index=' + index + '&id=' + id,
            })
        }else if(types == 2){
            wx.navigateTo({
                url: '../../index/intro/intro?index=' + index + '&id=' + id,
            })
        }else{
            wx.navigateTo({
                url: '../../index/webview/webview?id=' + id,
            })
        }
    }
})
