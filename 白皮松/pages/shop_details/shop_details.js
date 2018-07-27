var WxParse = require('../../wxParse/wxParse.js');
Page({
  //产品详情 买家评论切换 curHdIndex
  //型号 styleIndex
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
    goods_type_id:'',
    icon_a:'',
    shop_id:'',
    flag: false,
    reads:'',
    phone:''
  },
  //显示弹窗层
  //隐藏弹窗层
  hideDetail: function (e) {
    var flag = this.data.flag;
    flag = false;
    this.setData({
      flag: flag
    })
  },
  onLoad: function (options) {
    var shop_id = getApp().requestshop_id;
    var orders_id = getApp().requestorders_id;
    var that = this;
    wx.login({
      success:function(ress){
        console.log(ress);
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Info/goods',
            data: { id: shop_id,code:ress.code },
            method: "GET",
            success: function (res) {
              console.log(res);

              var article = res.data.info[0].intro
              WxParse.wxParse('article', 'html', article, that, 5)
              // console.log(res.data.info[0].goods_type_id)
              that.setData({
                goods_type_id: res.data.info[0].goods_type_id,
                carts:res.data.info,
                shop_name:res.data.info[0].shop_name,
                shop_img:res.data.info[0].shop_img,
                totalPrice:res.data.totalPrice,
                shop_money:res.data.info[0].shop_money,
                shop_ymoney: res.data.info[0].yuan_moneys,
                collect: res.data.shou,
                points:res.data.covers,
                point: res.data.covers,
                dian: res.data.info[0].stores_id,
                tags: res.data.info[0].tags,
                ji_bie: res.data.info[0].ji_bie,
                fa: res.data.info[0].fa,
                qi: res.data.info[0].qi,
                pei: res.data.info[0].pei,
                icon_a:res.data.info[0].biao,
                shop_id:res.data.info[0].id,
                reads:res.data.xie,
                phone: res.data.info[0].phone
              })
            }
          })
        }
      }
    })  
  },
  telName: function () {
      wx.makePhoneCall({
          phoneNumber: this.data.phone
      })
  },
  //  =========预定
  orderAppointment:function(e){
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    app.requesttype = this.data.goods_type_id;
    app.requestPrice = this.data.totalPrice;
    app.requestcarts = this.data.carts;
    app.requestreads = this.data.reads;
    wx.navigateTo({
      url: '../Appointment/Appointment',
    })

  },
  //===========跳转找挖树人
  findtreepeople:function(){
    wx.navigateTo({
      url: '../findTreePeople/findTreePeople',
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
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Collect/index',
            data: { id: shop_id, type: 2, code: ress.code },
            method: "GET",
            success: function (res) {
              console.log(res);
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
      url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/ping',
      data: { id: shop_id },
      method: "GET",
      success: function (res) {
        console.log(res);
        if(res.data==1){
          that.setData({
            empty:1
          })
        }else{
          that.setData({
            empty: 0,
            ping: res.data
          })
        }
        
      }
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
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Goods/cars',
            data: { id: carts[0].id, nums: carts[0].shop_num, no: size_name ,code:ress.code},
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
    var flag = this.data.flag;
    flag = true;
    this.setData({
      flag: flag
    })
    this.setData({
      car:0,
      dan: 1
    })
  },
  //=================购物车
  orderNames: function () {
    this.setData({
      car: 1,
      dan: 1
    })
    this.getTotalPrice(); 
  },
  //=================关闭弹框
  closeName:function(){
    this.setData({
      dan: 0
    })
  },
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
    var points = Number(e.detail.value);
    var point =Number(this.data.point);
    this.setData({
      flag_cover: 2
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
    let carts = this.data.carts; 
    var flag=this.data.flag;              // 获取购物车列表
    var flag_cover = this.data.flag_cover; 
    let total = 0;
    var car=this.data.car;
    var points =this.data.points
    var point = this.data.point
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
      total=0.01;
      points = totals
    } else if (total==0){
      total = 0.01;
    }
    // ===设置数据
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2),
      points:points
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
    let carts = this.data.carts;
    let totalPrice = this.data.totalPrice;//总价
    var size = this.data.size_name; //型号
    var points = this.data.points; //积分
    var flag=this.data.flag;
    var goods_type_id = this.data.goods_type_id;
    var orders_id = getApp().requestorders_id;
    console.log(orders_id)
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
                url: 'https://www.bozhiyingxiao.com/little_program/store_trees/pay/example/jsapi.php',
                data: { code: ress.code, total_fee: totalPrice, title: carts[0].shop_name },
                method: 'GET',
                success: function (res) {
                  console.log(res);
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
                         
                        }
                      })
                      wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Orders/index',
                        data: { no: res.data.no, op: res.data.op, shop_num: carts[0].shop_num, address: address, moneys: totalPrice, xing: size, type: 1, covers: points, status: 1, id: carts[0].id, name: resss.userName, phone: resss.telNumber, orders_id: orders_id, goods_type_id: goods_type_id},
                        method: 'GET',
                        success: function (res) {
                        }
                      })
                    },
                    'fail': function (res) {
                      console.log(res)
                    },
                    'complete': function (ress) {
                      // console.log(66666666666666);
                      if (ress.errMsg == "requestPayment:fail cancel"){
                        // console.log(77777777);
                        wx.request({
                          url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Orders/index',
                          data: { no: res.data.no, op: res.data.op, shop_num: carts[0].shop_num, address: address, moneys: totalPrice, xing: size, type: 1, covers: points, status: 2, id: carts[0].id, name: resss.userName, phone: resss.telNumberorders_id, orders_id, goods_type_id: goods_type_id},
                          method: 'GET',
                          success: function (res) {
                            console.log(res);
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
})