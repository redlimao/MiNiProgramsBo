
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad: function () {
        var that = this;
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.showLoading({
                        title: '加载中',
                    })
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/index',
                        data: { code: ress.code },
                        method: "GET",
                        success:function(res){
                            // console.log(res);
                            that.setData({
                                info:res.data.info,
                                shareText: res.data.store_name
                            })
                        },
                        complete:function(){
                            wx.hideLoading();
                        }
                    })
                }
            }
        })  
    },
    //收藏
    bindCollect: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../collectlist/collectlist?id=' + id,
        })
    },
    //优惠券
    bindCoupon:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../couponlist/couponlist?id=' + id,
        })
    },
    //个人资料
    bindMessage:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../personagedata/personagedata?id=' + id,
        })        
    },
    // 我的二维码
    bindEr:function(){
        wx.navigateTo({
            url: '../er/er',
        })
    },
    // 我的转介
    bindJie: function () {
        wx.navigateTo({
            url: '../jie/jie',
        })
    },
    //联系客服
    bindPhone:function(e){
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone,
        })
    },
    //意见反馈
    bindIdea:function(e){
        var id = e.currentTarget.dataset.id;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/fan',
            data: { id: id},
            method: 'GET',
            success: function(res) {
                if(res.data == 1){
                    wx.navigateTo({
                        url: '../ideadata/ideadata?id=' + id,
                    }) 
                }else{
                    wx.showModal({
                        title: '提示',
                        content: '请完善信息',
                        success:function(){
                            wx.navigateTo({
                                url: '../personagedata/personagedata?id=' + id,
                            }) 
                        }
                    })
                }
            },
        })
            
    },
    //服务地址
    bindAdress:function(){
        wx.chooseAddress({
            success: function (res) {
  
            },
            fail: function (res) {
                wx.openSetting({
                    success: (res) => {

                    }
                })
            }
        })
    },
    //关于我们
    bindAbout:function(){
        wx.navigateTo({
            url: '../aboutus/aboutus',
        })
    },
    jiName: function () {
        wx.navigateTo({
            url: '../newpage/newpage',
        })
    },
    //===============转发
    onShareAppMessage: function (res) {
        return {
            title: this.data.shareText,
            path: '/pages/personage/personage',
            success: function (res) {
                wx.showToast({
                    title: '转发成功',
                })
            },
            fail: function (res) {
                wx.showToast({
                    title: '转发失败',
                })
            }
        }
    },
    //下拉刷新
    onPullDownRefresh: function () {
        var that = this;
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Center/index',
                        data: {code:ress.code},
                        method: "GET",
                        success: function (res) {
                            console.log(res);
                            that.setData({
                                info: res.data.info
                            })
                        },
                        complete: function () {
                            wx.stopPullDownRefresh();
                        }
                    })
                }
            }
        })

    }
})
