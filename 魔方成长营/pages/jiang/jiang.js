// pages/jiang/jiang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0,
    },
    order:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var jiang_id=getApp().requestjiang_id;
    console.log(jiang_id)
    wx.request({
      url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Jiang/jiang',
      data: { lei: jiang_id,},
      method:"GET",
      success:function(res){
        that.setData({
          list:res.data.info,
          order:res.data.chou
        })
      }
    })
  },
  //===================抽奖
  chouName:function(){
    var that=this;
    var tabArr = this.data.tabArr;
    var chou = this.data.order;
    var jiang_id = getApp().requestjiang_id;
    var list=this.data.list;
    console.log(list)
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Jiang/yue',
            data: { code: ress.code, lei: jiang_id, chou: chou },
            method: "GET",
            success: function (res) {
              if(res.data==5){
                wx.showModal({
                  title: '没有预约，不可抽奖',
                })
              }else if(res.data==6){
                wx.showModal({
                  title: '已经抽过奖了',
                })
              }else{
                that.setData({
                  jiang:res.data.rand
                })
                var title = list[res.data.rand].title;
                var timer = setInterval(function () {
                  var n = Math.floor(Math.random() * 9);
                  var _datasetId = n;
                  var _obj = {};
                  _obj.curHdIndex = _datasetId;
                  _obj.curBdIndex = _datasetId;
                  that.setData({
                    tabArr: _obj
                  });
                }, 100)
                setTimeout(function () {
                  clearInterval(timer)
                  var _obj = {};
                  _obj.curHdIndex = res.data.rand;
                  _obj.curBdIndex = res.data.rand;
                  that.setData({
                    tabArr: _obj
                  });
                  wx.showModal({
                    title:title
                  })
                }, 2000)
              }
            }
          })
        }
      }
    })  
  },
  //===================报名
  orderName:function(){
    var jiang_id = getApp().requestjiang_id;
    var that=this;
    var chou=this.data.order;
    wx.showModal({
      title: '您将消费' + jiang_id +"元，来参与本次抽奖活动",
      success:function(res){
        if (res.confirm){
          wx.login({
            success: function (ress) {
              if (ress.code) {
                wx.request({
                  url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Jiang/yue',
                  data: { code: ress.code, lei: jiang_id, chou: chou },
                  method: "GET",
                  success: function (res) {
                    console.log(res)
                    if(res.data==2){
                      wx.showModal({
                        title: '您的会员余额不足，去充值',
                        success:function(res){
                          if(res.confirm){
                            var ti_id = 1;
                            var app = getApp()
                            app.requestti_id = ti_id;
                            wx.navigateTo({
                              url: '../chong/chong',
                            })
                          }
                        }
                      })
                    }else if(res.data==4){
                      wx.showModal({
                        title: '预约失败'
                      })
                    }
                    else if (res.data == 3) {
                      wx.showModal({
                        title: '预约成功',
                        success:function(res){
                          if(res.confirm){
                            wx.switchTab({
                              url: '../actives/actives',
                            })
                          }
                        }
                      })
                    }else if(res.data==1){
                      wx.showModal({
                        title: '已经预约过了'
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
  }
})