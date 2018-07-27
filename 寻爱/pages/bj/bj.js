// pages/bj/bj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onLoad: function (options) {
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/back_img',
            data: {code:ress.code},
            method: "GET",
            success: function (res) {
              that.setData({
                list: res.data.info
              })
            }
          })
        }
      }
    })
  },
  // =====返回上一级
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // ======选中背景
  bgName:function(e){
    var index=e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var list=this.data.list;
    for(var i=0;i<list.length;i++){
      list[i].choose = false;
    }
    list[index].choose=true;
    this.setData({
      list:list
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/huan_img',
            data:{code:ress.code,id:id},
            method:"GET",
            success:function(res){
              if(res.data==1){
                wx.navigateTo({
                  url: '../message/message',
                })
              }
            }
          })
        }
      }
    })
  }
})