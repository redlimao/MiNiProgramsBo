// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    empty:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pinid=getApp().requestpinid;
    console.log(pinid)
    var that=this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
              url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Users/actives',
            data: { code: ress.code, pin: pinid },
            method: "GET",
            success: function (res) {
              console.log(res)
              if(res.data==2){
                that.setData({
                  empty:1
                })
              } else if(res.data==1){
                that.setData({
                  empty: 1
                })
              } else if (res.data == 3) {
                that.setData({
                  empty: 1
                })
              }else{
                that.setData({
                 list:res.data
                })
              }
            }
          })
        }
      }
    })
   
  },
  detailName:function(e){
    var choose = e.currentTarget.dataset.id;
    console.log(choose)
    if (choose==1){
      var jiang_id = e.currentTarget.id;
      var app = getApp();
      app.requestjiang_id = jiang_id;
      console.log(jiang_id)
      wx.navigateTo({
        url: '../jiang/jiang',
      })
    }else{
      var detail_id = e.currentTarget.id;
      var app = getApp();
      app.requestdetail_id = detail_id;
      wx.navigateTo({
        url: '../actives_de/actives_de',
      })
    }
  }
})