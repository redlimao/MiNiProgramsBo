// pages/object/object.js
Page({
  data: {
    zy: [],
    pai:"",
    name:"",
    zhi:"",
    flag:0
  },
  onLoad: function (options) {
    var that = this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Users/xian',
            data: { code:ress.code },
            method: 'GET',
            success: function (res) {
              var lists = res.data;
              that.setData({
                zy: res.data.info,
                pai:res.data.user.pai,
                name:res.data.user.nickname,
                zhi: res.data.user.integral,
              })
              if (res.data.user.qians==1){
                that.setData({
                  flag: 0,
                })
              }else{
                that.setData({
                  flag: 1
                })
              }
            }
          })
        }
      }
    }) 
  },
  qianName:function(){
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Users/qian',
            data: { code: ress.code },
            method: 'GET',
            success: function (res) {
              if(res.data==3){
                wx.showModal({
                  title: '签到失败',
                  content: '',
                })
              }else{
                wx.showModal({
                  title: '签到成功',
                })
                that.setData({
                  zy: res.data.info,
                  pai: res.data.user.pai,
                  name: res.data.user.nickname,
                  zhi: res.data.user.integral,
                  flag:1
                })
              }
            }
          })
        }
      }
    }) 
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})