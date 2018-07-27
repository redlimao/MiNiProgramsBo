// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:"",
    list:[],
    arrays:["男","女"],
    indexs:0
  },
  onLoad: function (options) {
    var renid = getApp().requestrenid;
    var that=this;
    wx.login({
      success: function (ress) {
        if (ress) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Users/index',
                data: { code: ress.code, type:renid},
                method: "GET",
                success: function (res) {
                  console.log(res)
                  that.setData({
                    list:res.data,
                    flag: res.data[0].status
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  //===============性别选择
  bindPickerChanges: function (e) {
    this.setData({
      indexs: e.detail.value
    })
  },
  // =============提交信息
  formSubmit:function(e){
    var type_id=this.data.flag
    var sex=this.data.indexs;
    wx.login({
      success: function (ress) {
        if (ress) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Users/save_info',
                data: { code: ress.code, name: e.detail.value.username, phone: e.detail.value.phone, age: e.detail.value.age, location: e.detail.value.add,
                  types: type_id, sex: sex, c_name: e.detail.value.qiname, z_phone: e.detail.value.qiphone, address: e.detail.value.area},
                method: "GET",
                success: function (res) {
                  if(res.data==2){
                    if (type_id==1){
                      wx.showModal({
                        title: '保存成功，返回首页',
                        content: '',
                        success: function (res) {
                          if (res.confirm) {
                            wx.switchTab({
                              url: '../index/index',
                            })
                          }
                        }
                      })
                    }else{
                      wx.showModal({
                        title: '保存成功，去认证',
                        content: '',
                        success: function (res) {
                          if (res.confirm) {
                            wx.navigateTo({
                              url: '../ation/ation',
                            })
                          }
                        }
                      })
                    }
                  }else if(res.data==1){
                    wx.showModal({
                      title: '信息填写有误，请重新填写',
                      content: '',
                      success: function (res) {
                      }
                    })
                  }else if(res.data==3){
                    wx.showModal({
                      title: '提交失败',
                      content: '',
                      success: function (res) {
                        if (type_id == 1){
                          wx.navigateTo({
                            url: '../ation/ation',
                          })
                       }
                      }
                    })
                  }else if(res.data==4){
                    wx.showToast({
                      title: '认证已经成功',
                    })
                  }else if (res.data == 5) {
                    wx.showToast({
                      title: '认证中',
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  orderName:function(){
    wx.navigateTo({
      url: '../ation/ation',
    })
  }
})