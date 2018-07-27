// pages/message/message.js
Page({
  data:{
    user_id:''
  },
  onLoad:function(){
    
  },
  bindInput:function(e){
      var that = this;
      wx.login({
          success:function(res){
              if(res.code){
                  wx.request({
                      url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/User/xiu',
                      data: {code:res.code,pass1:e.detail.value},
                      method: 'GET',
                      success: function (res) {
                        console.log(res);
                        if(res.data == 2){
                            wx.showModal({
                                title: '提示',
                                content: '您输入的原始密码有误，请重新输入',
                                showCancel:false
                            })
                        }else{
                            that.setData({
                                user_id :res.data.id
                            })
                            
                        }
                      }
                  })
              }
          }
      })

  },
  formSubmit:function(e){
      var that = this;
    if (e.detail.value.password1 == "") {
        wx.showModal({
            title: '提示',
            content: '请填写您的原始密码',
            showCancel: false
        })
    } else if (e.detail.value.password2 == "") {
        wx.showModal({
            title: '提示',
            content: '请填写您的新密码',
            showCancel: false
        })
    } else if (e.detail.value.password3 == "") {
        wx.showModal({
            title: '提示',
            content: '请填写您的确认密码',
            showCancel: false
        })
    } else if (e.detail.value.password2 != e.detail.value.password3){
        wx.showModal({
            title: '提示',
            content: '密码不一致，请重新输入',
            showCancel: false
        })
    }else{
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/User/gai',
            data: { id:that.data.user_id,pass1: e.detail.value.password1, pass: e.detail.value.password2},
            method: 'GET',
            success: function (res) {
                console.log(res)
                if(res.data == 3){
                    wx.showModal({
                        title: '提示',
                        content: '您输入的原始密码有误，请重新输入',
                        showCancel: false
                    })
                } else if (res.data == 2){
                    wx.showModal({
                        title: '提示',
                        content: '支付密码修改失败',
                        showCancel: false
                    })
                }else if(res.data == 1){
                    wx.showModal({
                        title: '提示',
                        content: '支付密码修改成功',
                        showCancel: false,
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