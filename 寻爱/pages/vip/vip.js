// pages/vip/vip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that=this;
    var height = this.data.height;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Vips/index',
      data:{},
      method:"GET",
      success:function(res){
        wx.hideLoading()
        var len = Number(res.data.info[0].info.length);
        height = 180 * len + 90;
        that.setData({
          lun: res.data.lun,
          gong: res.data.gong,
          list:res.data.info,
          height:height,
          vip_info:res.data.vip_info.content_one,
          hun_info: res.data.vip_info.content_two
        })
      }
    })
  },
  // ======banner跳转
  bannerName: function (e) {
    // 1 商品 2资讯  3会员卡  4攻略课堂 5线上报名 6题库
    var status = e.currentTarget.dataset.status;
    if (status == 1) {
      var shop_id = e.currentTarget.id;
      var app = getApp();
      app.requestshop_id = shop_id;
      wx.navigateTo({
        url: '../shop_details/shop_details',
      })
    } else if (status == 2) {
      wx.navigateTo({
        url: '../texts/texts?id=' + e.currentTarget.id,
      })
    } else if (status == 3) {
      wx.switchTab({
        url: '../vip/vip',
      })
    } else if (status == 4) {
      wx.navigateTo({
        url: '../class/class',
      })
    } else if (status == 5) {
      wx.navigateTo({
        url: '../order/order',
      })
    } else if (status == 6) {
      wx.navigateTo({
        url: '../ti/ti',
      })
    }
  },
  // ======公告详情
  guangName: function (e) {
    wx.navigateTo({
      url: '../texts/texts?id=' + e.currentTarget.id,
    })
  },
  // ======选择vip等级
  choose:function(e){
    var list=this.data.list;
    var index=e.currentTarget.dataset.id;
    var indexs = e.currentTarget.dataset.ids;//大数据的下标
      if (list[indexs].info[index].selected) {
        list[indexs].info[index].selected = false;
      } else {
        for (var i = 0; i < list.length; i++) {
          for(var j=0;j<list[i].info.length;j++){
            list[i].info[j].selected = false;
          }
        }
        list[indexs].info[index].selected = true;
      }
    this.setData({
      list:list
    })
  },
  // =====滑块变化  (改为固定高度了)
  // change:function(e){
  //   var index=Number(e.detail.current);
  //   var list=this.data.list;
  //   var len=Number(list[index].info.length);
  //   var height=this.data.height;
  //   height = 180 * len+40;
  //   this.setData({
  //     height: height
  //   })
  // },
  // =====购买
  buy:function(res){
    var list = this.data.list;
    var moneys; var id; var people;
    var that=this;
    var n=0;
    for (var i = 0; i < list.length; i++) {
      for (var j = 0; j < list[i].info.length; j++) {
        if(list[i].info[j].selected){
          n++
          moneys = list[i].info[j].moneys;
          id = list[i].info[j].id;
          people = list[i].info[j].look_people;
        }
      }
    }
    if(n==0){
      wx.showModal({
        title: '请选择要购买的会员卡',
        content: '',
      })
    }else{
      wx.login({
        success: function (ress) {
          if (ress.code) {
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_love/pay/example/jsapi.php',
              data: { code: ress.code, total_fee: moneys, title: 'vip' },
              method: 'GET',
              success: function (res) {
                wx.requestPayment({
                  'timeStamp': res.data.pay.timeStamp,
                  'nonceStr': res.data.pay.nonceStr,
                  'package': res.data.pay.package,
                  'signType': 'MD5',
                  'paySign': res.data.pay.paySign,
                  'success': function (ress) {
                    wx.showToast({
                      title: '支付成功',
                      success: function () {
                        that.setData({
                          dan: 0
                        })
                      }
                    })
                    wx.request({
                      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/vips',
                      data: { no: res.data.no, op: res.data.op, status: 1, moneys: moneys, id: id, nums: people },
                      method: 'GET',
                      success: function (res) {
                        if(res.data.info==2){
                         wx.switchTab({
                           url: '../xun/xun',
                         })
                        }
                      }
                    })
                  },
                  'fail': function (res) {
                  },
                  'complete': function (ress) {
                    if (ress.errMsg == "requestPayment:fail cancel") {
                      wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/vips',
                        data: { no: res.data.no, op: res.data.op, status: 2, moneys: moneys, id: id, nums: people },
                        method: 'GET',
                        success: function (res) {
                          if(res.data.info==1){
                            wx.showModal({
                              title: '支付失败'
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }
      });
    }
  }
})