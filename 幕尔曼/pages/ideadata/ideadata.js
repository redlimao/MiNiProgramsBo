// pages/message/message.js
Page({
    data:{
    },
    onLoad:function(options){
        
    },
    formSubmit:function(e){
        var that = this;
        if (e.detail.value.area==""){
            wx.showModal({
                title: '不能为空'
            })
        }else{
          wx.login({
            success:function(ress){
              if(ress.code){
                wx.request({
                  url: 'https://www.bozhiyingxiao.com/little_program/store_mrm/index.php?s=/Little/Center/backs',
                  data: { content: e.detail.value.area, code: ress.code },
                  success: function (res) {
                    console.log(res)
                    if (res.data == 1) {
                      wx.showModal({
                        title: '提示',
                        content: '请输入合理的信息',
                      })
                    } else if (res.data == 3) {
                      wx.showToast({
                        title: '提交失败',
                        icon: 'success',
                        duration: 1000
                      })
                    } else if (res.data == 2) {
                      wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 1000,
                        success: function () {
                          wx.navigateBack({
                            delta: 1
                          })
                        }
                      })
                    }
                  }
                })
              }
            }
          })   
        }
    }
})