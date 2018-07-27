// pages/miss/miss.js
Page({

  data: {

  },
  onLoad: function (options) {

  },
  formSubmit: function (e) {
    var openids = getApp().requestopenid;
    var baocuo = e.detail.value.textarea;
    var school_id = getApp().requestschool_id;
    console.log(school_id)
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
              url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Users/backs',
            data: { code: ress.code, content: e.detail.value.textarea, school_id: school_id},
            method: 'GET',
            success: function (res) {
              console.log(res)
              if (res.data == 2) {
                wx.showModal({
                  title: '提交成功',
                  content: '我们会尽快审核并修改您提交的反馈',
                  success: function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                })
              } else if(res.data==1){
                wx.showToast({
                  title: '请输入合理的反馈内容'
                })
              }else{
                wx.showModal({
                  title: '提交失败，请重新提交'
                })
              }   
            }
          })
        }
      }
    })
   
  }
})