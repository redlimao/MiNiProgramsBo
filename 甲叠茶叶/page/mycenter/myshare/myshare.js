// pages/mycollect/mycollect.js
const util = require('../../utils/util.js')
Page({
    data: {
        current: 1,
        empty: 1,
        currpage:1
    },
    onLoad: function (options) {
        util.showload('加载中');
        let that = this;
        console.log(options.index);
        this.setData({
            current : options.index
        })
        let index = this.data.current;
        if (index == 1){
            // 我的名片
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.request({
                            url: util.host + '/Little/Codes/index',
                            data: { code: res.code, },
                            method: 'GET',
                            success: function (res) {
                                console.log(res);
                                that.setData({
                                    img:res.data.do,
                                    sharenum:res.data.yao
                                })
                                wx.hideLoading();
                            }
                        })
                    }
                },
            })
        }else{
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.request({
                            url: util.host + '/Little/Center/qies',
                            data: { code: res.code, },
                            method: 'GET',
                            success: function (res) {
                                // console.log(res);
                                if (res.data.info == 1) {
                                    that.setData({
                                        empty: 2
                                    })
                                } else {
                                    that.setData({
                                        empty: 1,
                                        list: res.data.info,
                                        user_id: res.data.user_id,
                                    })
                                }
                                wx.hideLoading();
                            }
                        })
                    }
                },
            })
        }

    },
    bindTap: function (e) {
        util.showload('加载中');
        let that = this;
        //获取触发事件组件的dataset属性 
        let index = e.currentTarget.dataset.index;
        this.setData({
            current: index,
        })
        if (index == 1) {
            // 我的名片
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.request({
                            url: util.host + '/Little/Codes/index',
                            data: { code: res.code, },
                            method: 'GET',
                            success: function (res) {
                                // console.log(res);
                                that.setData({
                                    img: res.data.do,
                                    sharenum: res.data.yao
                                })
                                wx.hideLoading();
                            }
                        })
                    }
                },
            })
        } else {
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.request({
                            url: util.host + '/Little/Center/qies',
                            data: { code: res.code, },
                            method: 'GET',
                            success: function (res) {
                                // console.log(res);
                                if(res.data.info == 1){
                                    that.setData({
                                        empty : 2
                                    })
                                }else{
                                    that.setData({
                                        empty : 1,
                                        list:res.data.info,
                                        user_id : res.data.user_id,
                                        currpage:1
                                    })
                                }
                                wx.hideLoading();
                            }
                        })
                    }
                },
            })
        }
    },
    // ======保存到相册
    bindImg: function () {
        let img = this.data.img;
        wx.downloadFile({
            url: img,
            success: function (res) {
                if (res.statusCode === 200) {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success(res) {
                            wx.showToast({
                                title: '保存成功',
                            })
                        }
                    })
                }

            }
        })
    },
    bindCopy: function (e) {
        // console.log(e)
        var self = this;
        wx.setClipboardData({
            data: self.data.sharenum,
            success: function (res) {
                // console.log(res)
            }
        });
    },
    // 下拉加载
    onReachBottom: function () {
        util.showload('加载中');
        let that = this;
        let id = this.data.id;
        let currpage = this.data.currpage;
        let user_id = this.data.user_id;
        currpage++;
        // console.log(currpage);
        wx.request({
            url: util.host + '/Little/Center/more_friend',
            data: { user_id: user_id, currpage: currpage },
            method: 'GET',
            success: function (res) {
                // console.log(res);
                wx.hideLoading();
                let list = that.data.list;
                if (res.data.info != 1) {
                    res.data.info.forEach((item) => {
                        list.push(item);
                    })
                    that.setData({
                        currpage: currpage,
                        list: list
                    })
                } else {
                    util.showToast('没有内容了');
                }
            }
        })
    },
    // ========分享
    onShareAppMessage: function (res) {
        var scene = this.data.user;
        if (res.from === 'button') {
            // 来自页面内转发按钮

        }
        return {
            title: '甲叠茶叶',
            path: '/page/taber/index/index',
            success: function (res) {
                // 转发成功
                wx.showToast({
                    title: '转发成功',
                    icon:'success',
                    mask:true
                })
            },
            fail: function (res) {
                // 转发失败
                wx.showToast({
                    title: '转发失败',
                    mask: true
                })
            }
        }
    }
})