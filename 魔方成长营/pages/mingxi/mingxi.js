var app = getApp()
Page({
  data: {
    userInfo: {},
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    shou:[],
    chu:[],
    empty:0,
    emptys:0,
    yu:0
  },
  tabFun: function (e) {
    //获取触发事件组件的dataset属性 
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  },
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Pay/xi',
            data:{code:ress.code},
            method:"GET",
            success:function(res){
              if(res.data.list==1){
                that.setData({
                  empty:1
                })
              }else{
                that.setData({
                  shou: res.data.list,
                  yu:res.data.yu,
                  empty: 0
                })
              }
             
            }
          })
        }
      }
    })
  },
  chuName:function(){
    var that=this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Pay/xi',
            data: { code: ress.code,type:1 },
            method: "GET",
            success: function (res) {
              if (res.data.list == 1) {
                that.setData({
                  emptys: 1
                })
              } else {
                that.setData({
                  chu: res.data.list,
                  emptys: 0
                })
              }

            }
          })
        }
      }
    })
  }
})