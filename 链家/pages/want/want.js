// want
Page({
    data: {
        num:0,
        flag_disabled:false,
        flag_loading:false,
        upload_img:'',
        data_img:'',
        flag_img:1
    },
    onLoad: function () {

    },
    bindInput:function(e){
        var num = e.detail.cursor;
        if (num >= 50) {
            num = 50;
        }
        this.setData({
            num: num
        })
    },
    //上传图片
    uploadImg:function(){
        var that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                that.setData({
                    upload_img: tempFilePaths
                })
                wx.uploadFile({
                    url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Center/tu',
                    filePath: tempFilePaths[0],
                    formData: {
                        'img': that.data.data_img
                    },
                    name: 'one',
                    success: function (res) {
                        console.log(res);
                        that.setData({
                            flag_img:2,
                            data_img: res.data.replace(/\s+/g, "")
                        })
                    }
                })
            }
        })
    },
    closeImg:function(){
        var that = this;
        wx.showModal({
            title: '提示',
            content: '是否删除',
            success: function (res) {
                if (res.confirm) {
                    wx.showToast({
                        title: '删除成功',
                        success:function(){
                            that.setData({
                                upload_img:'',
                                flag_img:1
                            })
                        }
                    })
                } else if (res.cancel) {
                   
                }
            }
        })
    },
    //提交
    bindMessage:function(e){
        var form_id = e.detail.formId;
        var texts = e.detail.value.texts;
        var data_img = this.data.data_img;
        var upload_img = this.data.upload_img;
        if(texts == ''){
            wx.showToast({
                title: '反馈内容不能为空',
                icon:"none",
                mask:true
            })
        } else if (upload_img == ''){
            wx.showToast({
                title: '您还未上传图片',
                icon: "none",
                mask: true
            })
        }else{
            wx.login({
                success:function(ress){
                    if(ress.code){
                        wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Center/backs',
                            data: { form_id: form_id, content: texts, img: data_img,code:ress.code},
                            method: 'GET',
                            success: function(res) {
                               if(res.data === 1){
                                    wx.showToast({
                                        title: '请输入合法的内容',
                                        icon:'none',
                                        mask:true
                                    })
                               }else if(res.data === 2){
                                   wx.showToast({
                                       title: '保存成功',
                                       mask: true,
                                       success:function(){
                                           wx.navigateBack({
                                               delta:1
                                           })
                                       }
                                   })
                               }else if(res.data ===3){
                                   wx.showToast({
                                       title: '保存失败',
                                       icon: 'none',
                                       mask: true
                                   })
                               }
                            },
                            complete: function(res) {

                            },
                        })
                    }
                }
            })
        }
    }
})