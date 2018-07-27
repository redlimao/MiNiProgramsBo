//personage.js
Page({
    data: {
        y_index:0
    },

    onLoad: function () {
        var that = this;
        wx.login({
            success: function (ress) {
                if (ress.code) {
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Center/info',
                        data: { code: ress.code},
                        method: 'GET',
                        success: function (res) {
                            console.log(res)
                            that.setData({
                                ye: res.data.ye,
                                y_index:res.data.info.ye,
                                dan_hao: res.data.info.dan_hao,
                                fang_hao: res.data.info.fang_hao,
                                home_name: res.data.info.home_name,
                                lou_hao: res.data.info.lou_hao,
                                name: res.data.info.name,
                                phone: res.data.info.phone
                            })  
                        },
                        complete: function (res) {

                        }
                    })
                }
            }
        })
    },
    bindPickerChange:function(e){
        var index = e.detail.value;
        this.setData({
            y_index: index
        })
    },
    formSubmit:function(e){
        var form_id = e.detail.formId;
        var name = e.detail.value.name;
        var phone = e.detail.value.phone;
        var home_name = e.detail.value.home_name;
        var lou_hao = e.detail.value.lou_hao;
        var dan_hao = e.detail.value.dan_hao;
        var fang_hao = e.detail.value.fang_hao;
        var index = e.detail.value.ye; 
        if (name === ''){
            wx.showToast({
                title: '姓名不能为空',
                icon:"none",
                mask:true
            })
        }else if(phone === ''){
            wx.showToast({
                title: '电话不能为空',
                icon: "none",
                mask: true
            })
        } else if (home_name === '') {
            wx.showToast({
                title: '项目名称不能为空',
                icon: "none",
                mask: true
            })
        } else if (lou_hao === '') {
            wx.showToast({
                title: '楼栋号不能为空',
                icon: "none",
                mask: true
            })
        } else if (dan_hao === '') {
            wx.showToast({
                title: '单元号不能为空',
                icon: "none",
                mask: true
            })
        } else if (fang_hao === '') {
            wx.showToast({
                title: '房号不能为空',
                icon: "none",
                mask: true
            })
        } else if (index === 0) {
            wx.showToast({
                title: '请选择业态',
                icon: "none",
                mask: true
            })
        }else{
            wx.login({
                success:function(ress){
                    if(ress.code){
                        wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Center/info_cun',
                            data: { code:ress.code, form_id: form_id, name: name, phone: phone, home_name: home_name, lou_hao: lou_hao, dan_hao: dan_hao, fang_hao: fang_hao, ye: index },
                            method: 'GET',
                            success: function (res) {
                                console.log(res);
                                if (res.data === 3) {
                                    wx.showToast({
                                        title: '电话有误',
                                        icon: "none",
                                        mask: true
                                    })
                                } else if (res.data === 1) {
                                    wx.showToast({
                                        title: '提交成功',
                                        mask: true,
                                        success:function(){
                                            wx.navigateBack({
                                                delta:1
                                            })
                                        }
                                    })
                                }else if (res.data ===2) {
                                    wx.showToast({
                                        title: '提交失败',
                                        mask: true
                                    })
                                }
                            },
                            complete: function (res) { },
                        })
                    }
                }
            })

        }
    },
    onUnload:function(){
        // wx.showModal({
        //     title: '提示',
        //     content: '您的信息未保存，是否退出此页',
        //     success: function (res) {
        //         if (res.confirm) {
        //             wx.navigateBack({
        //                 delta:1
        //             })
        //         } else if (res.cancel) {
        //             console.log('用户点击取消')
        //         }
        //     }
        // })
    }
})
