//warnVoting
Page({
    data: {
        num:0,
        upload_img:'',
        flag_img:1,
        data_img : ''
    },
    onLoad: function () {

    },
    // 返回
    bindBack: function () {
        wx.navigateBack({
            delta: 1,
        })
    },
    // 当输入内容时数字变化
    bindInput:function(e){
        // 获取文本字符个数，且不能超过50个
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
                    upload_img: tempFilePaths,
                    flag_img: 2,
                })
                // wx.uploadFile({
                //     url: '',
                //     filePath: tempFilePaths[0],
                //     formData: {
                //         'img': that.data.data_img
                //     },
                //     name: 'one',
                //     success: function (res) {
                //         that.setData({
                //             
                //             data_img: res.data.replace(/\s+/g, "")
                //         })
                //     }
                // })
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
        if(texts == ''){
            wx.showToast({
                title: '举报内容不能为空',
                icon:"none",
                mask:true
            })
        } else if (data_img == ''){
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
                            url: '',
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