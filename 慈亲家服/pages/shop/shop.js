// pages/shop/shop.js
Page({

  data: {
    selectAllStatus: true,
    totalPrice: 0,
    flag: 0,
    empty:0,
    points:0,
    point: 0,
    user:""
  },
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/cars',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
              if(res.data.info==1){
                that.setData({
                  empty:1
                })
              }else{
                that.setData({
                 carts:res.data.info,
                 points:res.data.covers,
                 point: res.data.covers,
                 user:res.data.user_id
                })
              }
              that.getTotalPrice();
            }
          })
        }
      }
    })  
  },
  // ========手指移动事件
  mytouchstart: function (e) {
    this.setData({ startPoint: [e.touches[0].pageX, e.touches[0].pageY] })
  },
  mytouchmove: function (e) {
    var curPoint = [e.touches[0].pageX, e.touches[0].pageY];
    var startPoint = this.data.startPoint;
    var carts = this.data.carts;
    var index = e.currentTarget.dataset.id;
    if (startPoint[0] >= curPoint[0]) {
      carts[index].pan = 0
      this.setData({
        carts: carts,
      })
    }
    if (startPoint[0] <= curPoint[0]) {
      carts[index].pan = 1
      this.setData({
        carts: carts,
      })
    }
  },
  //==================使用积分
  switchChange: function (e) {
    if (e.detail.value == true) {
      this.setData({
        flag: 1
      })
    } else {
      this.setData({
        flag: 0
      })
    }
    this.getTotalPrice();
  },
  //==================使用选择多少积分
  moName: function (e) {
    var points = e.detail.value
    var point =this.data.point
    if (points > point) {
      wx.showModal({
        title: '您的积分已达上限',
      })
    } else if (points < 0){
      wx.showModal({
        title: '请填写正确的积分',
      })
    } else if (points == ""){
      points=0
      this.setData({
        points: points
      })
    }else{
      this.setData({
        points: points
      })
    }
    this.getTotalPrice();
  },
  //========================== 总价
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    var flag=this.data.flag;
    var points = parseInt(this.data.points) * 0.01;
    let total = 0
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                   // 判断选中才会计算价格
        total +=carts[i].shop_money;     // 所有价格加起来
      }
    }
    if (flag == 1) {
      total = total - points
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  // =======================单选
  selectList: function (e) {
    var index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    var carts = this.data.carts;                    // 获取购物车列表
    var selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    var n = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        n++;
      }
    };
    if (n == carts.length) {
      var selectAllStatus = this.data.selectAllStatus;
      this.setData({
        selectAllStatus: true
      });
    } else {
      var selectAllStatus = this.data.selectAllStatus;
      this.setData({
        selectAllStatus: false
      });
    }
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // ==========================全选
  selectAll(e) {
    var selectAllStatus = this.data.selectAllStatus;// 是否全选状态
    selectAllStatus = !selectAllStatus;
    var carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();                               // 重新获取总价
  },
  // ==========================删除
  delName(e){
    var index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    var id = e.currentTarget.id;
    var user=this.data.user;
    var that=this;
    wx.showModal({
      title: '确认删除',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Del/index',
            data: { id:id ,user_id:user},
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  carts: res.data.info
                })
              }
              that.getTotalPrice();
            }
          })
        }
      }
    })
  },
  // ==============================付款
  payName: function () {
    let carts = this.data.carts;
    let totalPrice = this.data.totalPrice;
    var points=this.data.points
    var pay_list = [];
    var that = this;
    var flag = this.data.flag;
    if (flag != 1) {
      points = 0;
    } else {
      points = this.data.points;
    }
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                   // 判断选中另存数组
        pay_list.push(carts[i])
      }
    }
    console.log(pay_list, totalPrice)
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.chooseAddress({
            success: function (resss) {
              var address = resss.provinceName + resss.cityName + resss.countyName + resss.detailInfo
              wx.request({
                url: 'https://www.ciqinfuwu.com/pay/example/jsapi.php',
                data: { code: ress.code, total_fee: totalPrice, title: "" },
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
                        success:function(res){
                          wx.switchTab({
                            url: '../main/main',
                          })
                        }
                      })
                      wx.request({
                        url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Orders/index',
                        data: { no: res.data.no, op: res.data.op, type: 2, covers: points, status: 1, name: resss.userName, phone: resss.telNumber, address: address, cars: pay_list},
                        method: 'GET',
                        success: function (res) {
                        }
                      })
                    },
                    'fail': function (res) {
                      console.log(res)
                    },
                    'complete': function (ress) {
                      if (ress.errMsg == "requestPayment:cancel" || ress.errMsg == "requestPayment:fail cancel") {
                        wx.request({
                          url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Orders/index',
                          data: { no: res.data.no, op: res.data.op, type: 2, covers: points, status: 2, name: resss.userName, phone: resss.telNumber, address: address, cars: pay_list},
                          method: 'GET',
                          success: function (res) {

                          }
                        })
                      }
                    }
                  })
                }
              })
            }
          })
        }
      }
    });
  }
})