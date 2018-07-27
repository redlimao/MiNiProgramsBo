// pages/ceshi/ceshi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    guo:0
  },

  onLoad: function (options) {
    var id = options.id;
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/questions_info',
            data: { id: id ,code:ress.code},
            method: "GET",
            success: function (res) {
              wx.hideLoading()
              if (res.data.info.length==1){
                that.setData({
                  guo:1
                })
              }
              that.setData({
                list: res.data.info,
                all: res.data.info.length,
                message:1   //判断用户是否完善信息 1完善 2未完善
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
  // ======选择答案
  choose:function(e){
    var list=this.data.list;
    var index=e.currentTarget.dataset.index;
    var indexs = e.currentTarget.dataset.indexs;
    for( var i=0;i<list[indexs].xuan.length;i++){
      list[indexs].xuan[i].selected=false;
    }
    list[indexs].xuan[index].selected = true;
    this.setData({
      list:list
    })
  },
  // =====下一题
  nextName:function(){
    var list=this.data.list;
    var len=list.length;
    var guo=this.data.guo;
    var currentTab = this.data.currentTab+1;
    if (currentTab==len-1){   //判断答题的数量
      guo=1
    }else{
      guo = 0
    }
    this.setData({
      currentTab: currentTab,
      guo:guo
    })
  },
  // =====上一题
  prevName: function () {
    if (this.data.currentTab<=0){
      var currentTab=0
    }else{
      var currentTab = this.data.currentTab - 1;
    }
    var list = this.data.list;
    var len = list.length;
    var guo = this.data.guo;
    if (currentTab == len-1) {
      guo = 1
    } else {
      guo = 0
    }
    this.setData({
      currentTab: currentTab,
      guo: guo
    })
  },
  // ====滑块变化
  switchTab:function(e){
    var list = this.data.list;
    var len = list.length;
    var guo = this.data.guo;
    if (e.detail.current == len - 1) {   //判断答题的数量
      guo = 1
    } else {
      guo = 0
    }
    this.setData({
      currentTab:e.detail.current,
      guo:guo
    })
  },
  // =====测试结果
  guoName:function(){
    var list=this.data.list;
    var all_fen=0;
    var n=0;  //判断是否有未答的题
    var message=this.data.message;
    var id;
    if (message==2){
      wx.showModal({
        title: '请完善信息',
        success:function(res){
          if(res.confirm){
            wx.navigateTo({
              url: '../message/message',
            })
          }
        }
      })
    }else{
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].xuan.length; j++) {
          if (list[i].xuan[j].selected) {
            n++
            all_fen += Number(list[i].xuan[j].xuan_fen);
            id = list[i].questions_id
          }
        }
      }
      if (n == list.length) {
        wx.navigateTo({
          url: '../result/result?id=' + id + '&guo=' + all_fen,
        })
      } else {
        wx.showModal({
          title: '请完善答案'
        })
      }
    }
  }
})