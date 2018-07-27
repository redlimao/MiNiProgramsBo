// pages/jia_tai/jia_tai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择日期',
    dates: '请选择日期',
    user:"",
    arr:["请选择状态","空档期","工作中"],
    arr_index:0
  },
  onLoad: function (options) {
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/heads_z',
            data: { code:ress.code},
            method: "GET",
            success: function (res) {
              if(res.data==3){
                wx.showModal({
                  title: '您的身份还没通过审核',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                })
              }else{
                that.setData({
                  date: res.data.info.start_at,
                  dates: res.data.info.end_at,
                  user: res.data.user_id,
                  arr_index: res.data.info.status
                })
              }
            }
          })
        }
      }
    })  
  },
  // =========起始日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // =========截止日期
  bindDateChanges: function (e) {
    this.setData({
      dates: e.detail.value,
      flag: 0
    })
  },
  // ============选择状态
  arrChange:function(e){
    this.setData({
      arr_index: e.detail.value
    })
  },
  // =============提交信息
  formSubmit: function (e) {
    var user = this.data.user//用户id
    var date=this.data.date;
    var dates=this.data.dates;
    var status=this.data.arr_index
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/heads_cun',
      data: { user_id: user, status: status,kai:date,jie:dates },
      method: "GET",
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '成功',
            success: function () {
              wx.switchTab({
                url: '../main/main',
              })
            }
          })
        } else if (res.data == 2) {
          wx.showModal({
            title: '提交失败',
          })
        } else if (res.data == 3) {
          wx.showModal({
            title: '请选择状态',
          })
        } else if(res.data==4){
          wx.showModal({
            title: '请选择合理的时间',
          })
        }
      }
    })
  }
})