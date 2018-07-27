//获取应用实例
const app = getApp()

Page({
  data: {
    path: ''
  },
  onLoad:function(options){
    this.setData({
      path: options.path
    })
  }
})
