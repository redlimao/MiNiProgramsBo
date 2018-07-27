// pages/xiao/xiao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    del:1,
    currentIndex:1,
    select:false,
    choose:[]
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/information',
            data:{code:ress.code,type:1},
            method:"GET",
            success:function(res){
              wx.hideLoading()
              that.setData({
                list:res.data.info
              })
            }
          })
        }
      }
    })
  },
  // ====返回上一级
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // ======删除消息
  delName:function(){
    var list=this.data.list;
    var type = this.data.currentIndex
    var choose=[];
    var that=this;
    var del = this.data.del;
    this.setData({
      del: 2
    })
    for (var i = 0; i < list.length; i++) {
      if (list[i].select) {
        choose.push(list[i].id)
      }
    }
    if(del==2){
      if (choose.length == 0) {
        wx.showModal({
          title: '请选择要删除的对象',
          success:function(res){
            if(res.cancel){
              that.setData({
                del: 1
              })
            }
          }
        })
      } else {
        wx.showModal({
          title: '确认删除？',
          success: function (res) {
            if (res.confirm) {
              wx.login({
                success: function (ress) {
                  if (ress.code) {
                    wx.request({
                      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/del_information',
                      data: { type: type, code: ress.code, id: choose },
                      method: "GET",
                      success: function (res) {
                        if (res.data.info == 2) {
                          wx.showModal({
                            title: '删除失败'
                          })
                        } else {
                          wx.showToast({
                            title: '已删除',
                            success: function () {
                              that.setData({
                                del: 1,
                                list: res.data.info
                              })
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            } else {
              for (var i = 0; i < list.length; i++) {
                list[i].select = false;
              }
              that.setData({
                del: 1,
                list: list,
                select: false
              })
            }
          }
        })
        
      }
    }
  
  },
  // ====删除选中
  choose:function(e){
    var list = this.data.list;
    var that = this;
    var select = this.data.select;
    var index=e.currentTarget.dataset.id;
    list[index].select = !list[index].select;
    var n = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].select) {
        n++;
      }
    };
    if (n == list.length) {
      select = true;
    } else {
      select = false;
    }
    this.setData({
      list:list,
      select: select
    })

  },
  //====全选
  all:function(){
    var select = this.data.select;
    var list=this.data.list;
    select = !select
    for(var i = 0; i < list.length; i++){
      if (select) {
        list[i].select=true;
      }else{
        list[i].select = false;
      }
    }
    this.setData({
      list:list,
      select:select
    })
  },
  // =====tab切换
  tabFun: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.id
    })
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/information',
            data: { code: ress.code, type: e.currentTarget.dataset.id },
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
  //=====同意
  tongName:function(e){
    var that=this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/que_information',
      data: { id: e.currentTarget.id,type:3},
      method:"GET",
      success:function(res){
        if(res.data==1){
          wx.showModal({
            title: '操作失败'
          })
        }else{
          that.setData({
            list: res.data.info
          })
        }
      }
    })
  },
  // ======拒绝
  juName: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/que_information',
      data: { id: e.currentTarget.id, type: 2 },
      method: "GET",
      success: function (res) {
        if (res.data == 1) {
          wx.showModal({
            title: '操作失败'
          })
        } else {
          that.setData({
            list: res.data.info
          })
        }
      }
    })
  },
})