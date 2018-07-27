// pages/sou/sou.js
Page({
  data: {
    empty:0
  },
  onLoad: function (options) {
    var sou_id = getApp().requestsou_id;
    var sout_id = getApp().requestsout_id;
    var that=this;
    console.log(sou_id, sout_id)
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/index',
      data: { type: sout_id, content: sou_id},
      method:"GET",
      success:function(res){
        console.log(res)
        if(res.data.list==1){
          that.setData({
            empty:1,
            types: sout_id
          })
        }else{
          that.setData({
            empty: 0,
            types: sout_id,
            lists:res.data.list
          })
        }
      }
    })
  },
  detailsName: function (e) {
    var jia_id = e.currentTarget.id;
    var app = getApp();
    app.requestjia_id = jia_id;
    wx.navigateTo({
      url: '../jia_details/jia_details',
    })
  },
  guName: function (e) {
    var gu_id = e.currentTarget.id;
    var app = getApp();
    app.requestgu_id = gu_id;
    var gu_types = 1;
    var app = getApp();
    app.requestgu_types = gu_types;
    wx.navigateTo({
      url: '../gu_details/gu_details',
    })
  }
})