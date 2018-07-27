var WxParse = require('../../wxParse/wxParse.js');
Page({

  data: {
    curHdIndex: 0,
    styleIndex: 0,
    flag:0,
    car:0,
    dan:0,
    carts:[],
    empty:0,
    collect:2,
    points:"",
    point: "",
    totalPrice:"",
    dian:"",
    size_name:"",
    flag_cover:"",
    you: "",
    quan: 1,
    quan_index: -1,
    quan_id: "",
    pan_quan: '',
    quan_yong:0,
    phone:''
  },
  onShow: function (options) {
    var that = this;
    var shop_id = getApp().requestshop_id;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Info/index',
            data: { id: shop_id,code:ress.code},
            method: "GET",
            success: function (res) {
              console.log(res)
              wx.hideLoading()
              var article = res.data.info[0].intro
              WxParse.wxParse('article', 'html', article, that, 5)
              that.setData({
                carts:res.data.info,
                shop_name:res.data.info[0].shop_name,
                shop_img:res.data.info[0].shop_img,
                totalPrice:res.data.totalPrice,
                totalPrices: res.data.totalPrice,
                shop_money:res.data.info[0].shop_money,
                collect: res.data.shou,
                points:res.data.covers,
                point: res.data.covers,
                you: res.data.list,
                pan_quan: res.data.xia_biao,  // 0 说明没有选择优惠券
                size_name:res.data.info[0].size[0].size_name
              })
              that.getTotalPrice()
            }
          })
        }
      }
    })  
  },
  // ======返回上一层
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // ===========收藏
  collectName: function () {
    var shop_id = getApp().requestshop_id;
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Collect/goods',
            data: { id: shop_id,code: ress.code},
            method: "GET",
            success: function (res) {
              if (res.data == 2) {
                wx.showToast({
                  title: '收藏成功',
                })
                that.setData({
                  collect: 1
                })
              } else if (res.data == 1) {
                wx.showToast({
                  title: '取消收藏',
                })
                that.setData({
                  collect: 2
                })
              } else {
                wx.showModal({
                  title: '收藏失败'
                })
              }
            }
          })
        }
      }
    })
  },
   // ===========评论
  pingName:function(e){
    var shop_id = getApp().requestshop_id;
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Goods/pings',
      data: { id: shop_id, type: 1},
      method: "GET",
      success: function (res) {
        if (res.data.ping_info==1){
          that.setData({
            empty:1
          })
        }else{
          that.setData({
            empty: 0,
            ping: res.data.ping_info[0],
            ping_cont:res.data.ping_counts
          })
        }
        
      }
    })
  },
  // ======查看全部评论
  bindAllcomments:function(e){
    var id = getApp().requestshop_id;
    wx.navigateTo({
      url: '../allcomments/allcomments?id=' + id + '&current=1',
    })
  },
  //跳转到对应的评价
  bindTag:function (e) {
    var id = getApp().requestshop_id;
    var current = e.currentTarget.dataset.id;
    var types_id = getApp().requesttypes_id;
    wx.navigateTo({
      url: '../allcomments/allcomments?id=' + id + '&current=' + current + '&types=' + types_id,
    })
  },
  tabFun: function (e) {
    this.setData({
      curHdIndex: e.target.dataset.id
    });
  },
  //============选择型号
  tabFuns: function (e) {
    var carts=this.data.carts
    var money = e.target.dataset.money
    var totalPrice = this.data.totalPrice
    this.data.carts[0].shop_money = money
    this.setData({
      styleIndex: e.target.dataset.id,
      carts: carts,
      size_name: e.target.dataset.name,
      shop_money: e.target.dataset.money
    });
    if (this.data.carts[0].shop_num==1){
      this.setData({
        totalPrice: e.target.dataset.money
      })
    }else{
      this.setData({
        totalPrice: totalPrice
      })
    }
    this.getTotalPrice();
  },
  //=================加入购物车
  jiaName:function(){
    this.setData({
      car:1,
      dan: 1
    })
    var carts=this.data.carts;
    var size_name = this.data.size_name;
    let totalPrice = this.data.totalPrice;//总价 
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Goods/cars',
            data: { id: carts[0].id, nums: carts[0].shop_num, no: size_name, code: ress.code, moneys: totalPrice},
            method: "GET",
            success: function (res) {
              if(res.data==1){
                wx.showToast({
                  title: '成功',
                  success:function(){
                    wx.navigateBack({
                      delta:1
                    })
                  }
                })
              }else{
                wx.showModal({
                  title: '失败，请重新加入',
                })
              }
            }
          })
        }
      }
    })  
  },
  //=================下单
  orderName:function(){
    this.setData({
      car:0,
      dan: 1
    })
    this.getTotalPrice()
  },
  //=================购物车
  orderNames: function () {
    this.setData({
      car: 1,
      dan: 1
    })
    this.getTotalPrice(); 
  },
  // ==============预约
  yueNames:function(){
    wx.navigateTo({
      url: '../yue/yue',
    })
  },
  //=================关闭弹框
  closeName:function(){
    this.setData({
      dan: 0
    })
  },
  //=================店铺电话
  // shopName:function(){
  //   var phone=this.data.phone;
  //  wx.makePhoneCall({
  //    phoneNumber: phone,
  //  })
  // },
  //==================使用积分
  switchChange: function (e) {
    if (e.detail.value == true) {
      this.setData({
        flag: 1,
        flag_cover: 1
      })
    } else {
      this.setData({
        flag: 0,
        flag_cover: 1
      })
    }
    this.getTotalPrice(); 
  },
   //==================使用选择多少积分
  moName:function(e){
    var points = Number(e.detail.value);  //输入的积分
    var point =Number(this.data.point);   //  我的总积分
    this.setData({
      flag_cover: 2 //判断积分有无在积分输入框输入积分
    })
    if (points > point){
      wx.showModal({
        title: '您的积分已达上限',
      })
    } else if (points < 0) {
      wx.showModal({
        title: '请填写正确的积分',
      })
    } else if (points == "") {
      points = 0
      this.setData({
        points: points
      })
    } else {
      this.setData({
        points: points
      })
    }
    this.getTotalPrice(); 

  },
  //========================== 总价
  getTotalPrice() {
    let carts = this.data.carts;  //购物车列表
    var flag = this.data.flag;              //判断是否使用积分
    var flag_cover = this.data.flag_cover;  //判断积分有无在积分输入框输入积分
    let total = 0; //总价
    var car=this.data.car;  // 判断下单还是购物车
    var points = this.data.points;  //输入的积分
    var point = this.data.point; // 总积分
    var quan = this.data.quan; // 控制优惠券的显示
    var you = this.data.you; // 优惠券列表
    var quan_index = this.data.quan_index; //优惠券的下标
    var quan_id = this.data.quan_id; //优惠券的id
    var man = 0; //满减金额
    var jian = 0; //减去金额
    var max = []; // 算最大值
    var pan_quan = this.data.pan_quan;  //判断是否选择优惠券
    var man_arr = [];// 算最大值
    var quan_yong=this.data.quan_yong; //判断有无可使用的优惠券
    total += carts[0].shop_num * carts[0].shop_money;     // 所有价格加起来
    //====判断可使用积分
    var totals = Number(total) * 100;
    if (flag_cover==1){
      if (totals < point) {
        points=totals
      } else {
        points=point
      }
    }
    //=====减去积分的价格
    var covers = parseInt(points) * 0.01;  //积分价格
    if (flag==1&&car==0){
      total = total - covers
    }
    //=====判断积分上限
    if (total<0) {
      wx.showModal({
        title: '您的积分已达上限',
      })
      total=0.01; //为了调起支付
      points = totals
    } else if (total==0){
      total = 0.01;
    }
    // ====使用优惠券
    if (car == 0){
      if(you==1){
       quan_yong = 1  // 添加暂无优惠券的字段
      }else{
        if (pan_quan > 0) {
          for (var i = 0; i < you.length; i++) {
            if (pan_quan == you[i].id) {
              if (total > you[i].man) {
                quan = 1;
                quan_index = i;
                man = you[i].man;
                jian = you[i].money;
                total = total - you[i].money;
                quan_id = you[i].id;
              }else{
                var n = 0; //判断有没有可用的优惠券
                for (let i = 0; i < you.length; i++) {    //  循环优惠卷数组，大于总价的放到一个数组，比较数组里的最大值，最大  
                  if (total >= you[i].man) {              //    最后所用的优惠券，man_arr是用来判断比较大小的length；
                    man_arr.push(you[i]);
                    max.push(Number(you[i].man))
                  } else {
                    n++;
                    if (n == you.length) {
                      quan_yong = 1;
                    } else {
                      quan_yong = 0;
                    }
                  }
                }
                for (let i = 0; i < man_arr.length; i++) {
                  if (man_arr[i].man >= max.max()) {
                    quan = 1;
                    quan_index = i;
                    man = man_arr[i].man;
                    jian = man_arr[i].money;
                    total = total - man_arr[i].money;
                    quan_id = man_arr[i].id;
                    quan_yong = 0;
                  }
                }
              }
            }
          }
        } else {
          // ======================默认优惠券=========================
          var n = 0; //判断有没有优惠券里边可用的优惠券
          for (let i = 0; i < you.length; i++) {    //  循环优惠卷数组，大于总价的放到一个数组，比较数组里的最大值，最大  
            if (total >= you[i].man) {              //    最后所用的优惠券，man_arr是用来判断比较大小的length；
              man_arr.push(you[i]);
              max.push(Number(you[i].man))
            } else {
              n++;
              if (n == you.length) {
                quan_yong = 1;
              } else {
                quan_yong = 0;
              }
            }
          }
          for (let i = 0; i < man_arr.length; i++) {
            if (man_arr[i].man >= max.max()) {
              quan = 1;
              quan_index = i;
              man = man_arr[i].man;
              jian = man_arr[i].money;
              total = total - man_arr[i].money;
              quan_id = man_arr[i].id;
              quan_yong = 0;
            }
          }
        }
        if (man == 0) {
          quan = 0
        }
      }
    }
    // ===设置数据
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      quan: quan,
      totalPrice: total.toFixed(2),
      points: points,
      man: man,
      jian: jian,
      quan_id: quan_id,
      quan_index: quan_index,
      quan_yong:quan_yong
    });
  },
  //============================== 增加数量
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].shop_num;
    num = parseInt(num) + 1;
    carts[index].shop_num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // ===============================减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].shop_num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].shop_num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  //=================支付
  zhiName: function () {
    var that=this;
    let carts = this.data.carts;
    let totalPrice = this.data.totalPrice;//总价
    var size = this.data.size_name; //型号
    var points = this.data.points; //积分
    var flag=this.data.flag; //判断有无使用积分
    var you = this.data.you;
    var quan_index = this.data.quan_index;
    var you_id; //优惠券的id
    var you_jian; //优惠券的减去金额
    if (quan_index<0|| you==1){
      you_id = "";
      you_jian = ""
    }else{
      you_id = you[quan_index].id
      you_jian = you[quan_index].money
    }
    var orders_id = getApp().requestorders_id;
    if (flag!=1){
      points=0;
    }else{
      points = this.data.points;
    }
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.chooseAddress({
            success:function(resss){
              var address = resss.provinceName + resss.cityName + resss.countyName + resss.detailInfo
              wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_love/pay/example/jsapi.php',
                data: { code: ress.code, total_fee: totalPrice, title: carts[0].shop_name },
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
                        success:function(){
                          that.setData({
                            dan: 0
                          })
                        }
                      })
                      wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/indexs',
                        data: { no: res.data.no, op: res.data.op, shop_num: carts[0].shop_num, address: address, moneys: totalPrice, xing: size, type: 1, covers: points, status: 1, id: carts[0].id, name: resss.userName, phone: resss.telNumber, orders_id: orders_id,  you_id: you_id, you_jian: you_jian},
                        method: 'GET',
                        success: function (res) {
                        }
                      })
                    },
                    'fail': function (res) {
                    },
                    'complete': function (ress) {
                      if (ress.errMsg == "requestPayment:fail cancel"){
                        wx.request({
                          url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/indexs',
                          data: { no: res.data.no, op: res.data.op, shop_num: carts[0].shop_num, address: address, moneys: totalPrice, xing: size, type: 1, covers: points, status: 2, id: carts[0].id, name: resss.userName, phone: resss.telNumber, orders_id, orders_id, you_id: you_id, you_jian: you_jian},
                          method: 'GET',
                          success: function (res) {
                            that.setData({
                              dan: 0
                            })
                          }
                        })
                      }
                    }
                  })
                }
              })
            },
            fail: function (res) {
              wx.openSetting({
                success: (res) => {
                }
              })
            }
          })
        }
      }
    });
  },
  // ========优惠券
  quanName: function (e) {
    var money_id = e.target.id;
    var app = getApp();
    app.requestmoney_id = money_id;
    var quan_id = e.target.dataset.id;
    var app = getApp();
    app.requestquan_id = quan_id;
    var goods_id = e.target.dataset.ids;
    var app = getApp();
    app.requestgoods_id = goods_id;
    wx.navigateTo({
      url: '../quan/quan',
    })
  },
  // ========分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮

    }
    return {
      title: '寻爱',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        wx.login({
          success: function (ress) {
            if (ress.code) {
              wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/fen',
                data: { code: ress.code },
                method: "GET",
                success: function (res) {
                }
              })
            }
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})

Array.prototype.max = function () {
  return Math.max.apply({}, this)
}
Array.prototype.min = function () {
  return Math.min.apply({}, this)
}