// pages/qian/qian.js
var wxCharts = require('../../utils/wxcharts.js');
Page({
  data: {
    empty: 0,
    currentIndex:1,
    qian: 1, 
    winWidth: 0,
    winHeight: 0,
  },
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/qian',
            data:{code:ress.code},
            method:"GET",
            success:function(res){
              wx.hideLoading()
              if (res.data.info==1){
                that.setData({
                  empty:1,
                  covers: res.data.covers,
                  tian: res.data.tian,
                  qian: res.data.qian_qian,
                  all:res.data.zong
                })
              }else{
                that.setData({
                  covers: res.data.covers,
                  list: res.data.info,
                  empty:0,
                  tian: res.data.tian,
                  qian: res.data.qian_qian,
                  all: res.data.zong
                })
              }
              var yue = res.data.yu;
              var fen = res.data.fen;
              var max = Number(res.data.zui)
              var winWidth = that.data.winWidth;
              new wxCharts({
                canvasId: 'lineCanvas',
                type: 'line',
                legend:false,
                categories: yue,
                extra: {
                  lineStyle: 'straight',
                },
                series: [{
                  data: fen,
                  color:'#fff',
                  format: function (val, name) {
                    return val;
                  }
                }],
                xAxis:{
                  fontColor: '#fff',
                  gridColor: '#fff',
                  type:'calibration'
                },
                yAxis: {
                  disabled:true,
                  min:0,
                  max:max,
                  format: function (val) {
                    return val;
                  }
                },
                width: winWidth,
                height: 200
              });
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  // =======返回上一级
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // =====tab切换
  tabFun: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.id
    })
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/ji_qie',
            data: { code: ress.code, type: e.currentTarget.dataset.id},
            method: "GET",
            success: function (res) {
              wx.hideLoading()
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  list: res.data.info,
                  empty: 0
                })
              }
            }
          })
        }
      }
    })
  },
  // =====签到
  qian:function(){
    var that=this;
    var covers = this.data.covers;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Index/qian_add',
            data: { code: ress.code, covers: covers},
            method:"GET",
            success:function(res){
              if(res.data.pan==2){
                that.setData({
                  list: res.data.info,
                  tian: res.data.tian,
                  qian:1,
                  empty: 0,
                  all: res.data.zong
                })
                wx.showToast({
                  title: '签到成功',
                })
                var yue = res.data.yu;
                var fen = res.data.fen;
                var max = Number(res.data.zui)
                var winWidth = that.data.winWidth;
                new wxCharts({
                  canvasId: 'lineCanvas',
                  type: 'line',
                  legend: false,
                  categories: yue,
                  extra: {
                    lineStyle: 'straight',
                  },
                  series: [{
                    data: fen,
                    color: '#fff',
                    format: function (val, name) {
                      return val;
                    }
                  }],
                  xAxis: {
                    fontColor: '#fff',
                    gridColor: '#fff',
                    type: 'calibration'
                  },
                  yAxis: {
                    disabled: true,
                    min: 0,
                    max: max,
                    format: function (val) {
                      return val;
                    }
                  },
                  width: winWidth,
                  height: 200
                });
              } else if (res.data.pan == 1){
                wx.showModal({
                  title: '今天已签到',
                })
              }
            }
          })
        }
      }
    })
  },
  // =====进入商城
  shopname:function(){
    wx.switchTab({
      url: '../shop/shop',
    })
  },
  // =====转介协议
  pointsName: function () {
    wx.navigateTo({
      url: '../rule/rule?types='+2,
    })
  }

})