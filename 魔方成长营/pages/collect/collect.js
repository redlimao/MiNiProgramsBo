// pages/collect/collect.js
Page({

  data: {
    startPoint:[0,0],
    flag:false,
    list:[],
    active:[],
    empty:0,
    emptys:0,
    tabArr: {
      curHdIndex: 1,
      curBdIndex: 1
    }, 
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
    var that=this;
    wx.login({
      success: function (ress) {
        if (ress) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                  url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Business/xian',
                data: {
                  code: ress.code
                },
                method: "GET",
                success:function(res){
                  console.log(res)
                  if (res.data.info == 1) {
                      that.setData({
                          emptys: 1
                      })
                  } else {
                      that.setData({
                          active: res.data.info
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
  mytouchstart:function(e){
    this.setData({ startPoint: [e.touches[0].pageX, e.touches[0].pageY]})
  },
  mytouchmove:function(e){
    var curPoint = [e.touches[0].pageX, e.touches[0].pageY];
    var startPoint = this.data.startPoint;
    var list=this.data.list;
    var index = e.currentTarget.dataset.index;
    if (startPoint[0] >= curPoint[0]){
      list[index].pan = true
      this.setData({
        list:list
      })
    }
    if (startPoint[0] <= curPoint[0]) {
      list[index].pan = false
      this.setData({
        list: list
      })
    }
  },
  delName:function(e){
    var that=this;
      wx.showModal({
        title: '确认删除吗？',
        success:function(res){
          if(res.confirm){
            wx.request({
              url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Collects/del',
              data:{id:e.currentTarget.id},
              method:"GET",
              success:function(res){
                if(res.data==1){
                  wx.showToast({
                    title: '删除成功',
                  })
                  wx.login({
                    success: function (ress) {
                      if (ress) {
                        wx.getUserInfo({
                          success: function (res) {
                            wx.request({
                              url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Collects/shou',
                              data: {
                                code: ress.code
                              },
                              method: "GET",
                              success: function (res) {
                                console.log(res)
                                if (res.data == 1) {
                                  that.setData({
                                    empty: 1
                                  })
                                } else {
                                  that.setData({
                                    list: res.data
                                  })
                                }
                              }
                            })
                          }
                        })
                      }
                    }
                  })
                }else if(res.data==2){
                  wx.showModal({
                    title: '删除失败'
                  })
                }
              }
            })
          }
        }
      })
  },
  infoName:function(e){
    wx.navigateTo({
      url: '../info/info',
    })
  },
  // ===============活动
  activeName:function(){
    var that=this;
    wx.login({
      success: function (ress) {
        if (ress) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Business/xian',
                data: {
                  code: ress.code
                },
                method: "GET",
                success: function (res) {
                  console.log(res)
                  if (res.data.info == 1) {
                    that.setData({
                      emptys: 1
                    })
                  } else {
                    that.setData({
                      active: res.data.info
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
  detailName:function(e){
    var detail_id = e.currentTarget.id;
    var app = getApp();
    app.requestdetail_id = detail_id;
    wx.navigateTo({
      url: '../actives_de/actives_de',
    })
  }
})