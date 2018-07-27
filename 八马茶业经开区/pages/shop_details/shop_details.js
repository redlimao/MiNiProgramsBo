var WxParse = require('../../wxParse/wxParse.js');
Page({

  data: {
    curHdIndex: 0,
    styleIndex: 0,
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
    flag_cover1: "",
    you: "",
    you1: "",
    quan: 1,
    quan_index: -1,
    quan_id: "",
    pan_quan: '',
    quan_yong:0,
    flags:false,
    flag1s: false,
    pop_flag:2,
    flag_icon:false,
    flag2: 1,
    flag: 0,
    flag1: 1
  },
  onShow: function (options) {
    var shop_id = getApp().requestshop_id;
    var types_id = getApp().requesttypes_id;
    var that = this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Info/goodss',
            data: { id: shop_id,code:ress.code ,type:types_id},
            method: "GET",
            success: function (res) {
                console.log(res);
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
                you1: res.data.list,
                pan_quan: res.data.xia_biao,
                bot_type: types_id,
                pointss:res.data.bi,
                pointsss: res.data.bi,
                hui:res.data.hui,
                store:res.data.arr
              })
              that.getTotalPrice()
            },
            complete:function(){
                wx.hideLoading()
            }
          })
        }
      }
    })  
  },
  // ===========收藏
  collectName: function () {
    var shop_id = getApp().requestshop_id;
    var types_id = getApp().requesttypes_id;
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Collect/indexs',
            data: { id: shop_id, type: types_id, code: ress.code },
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
    var types_id = getApp().requesttypes_id;
    var that = this;
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Goods/pings',
      data: { id: shop_id, type: 1, types: types_id},
      method: "GET",
      success: function (res) {
        if (res.data.ping_info==1){
          that.setData({
            empty:1
          })
        }else{
          that.setData({
            empty: 0,
            ping: res.data.ping_info,
            ping_cont:res.data.ping_counts
          })
        }
        
      }
    })
  },
  // ======查看全部评论
  bindAllcomments:function(e){
    var id = getApp().requestshop_id;
    var types_id = getApp().requesttypes_id;
    wx.navigateTo({
      url: '../allcomments/allcomments?id=' + id + '&current=1&types=' + types_id,
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
    var types_id = getApp().requesttypes_id;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Goods/carss',
            data: { id: carts[0].id, nums: carts[0].shop_num, no: size_name, code: ress.code, type: types_id},
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
  //=================店铺
  shopName:function(){
    var dian_id=this.data.dian;
    var app = getApp();
    app.requestdian_id = dian_id;
    wx.navigateTo({
      url: '../dian/dian',
    })
  },
  //==================使用积分
  //flag_cover 判断积分上限
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
  //==================使用茶币
  switchChange1: function (e) {
      var you1 = this.data.you1;//存储优惠券列表
      var bi = Number(this.data.pointss);
      var totalPrice = Number(this.data.totalPrice);
      if (totalPrice > bi) {
          wx.showModal({
              title: '茶币不足，请充值或填写正确的茶币',
          })
          this.setData({
              flag1: 1,
              flags: false,
              flag1s: false,
              you: you1,
              flag:0
          })
      }else{
          if (this.data.flag1s == true) {
              this.setData({
                  flag1: 1,
                  flags: false,
                  flag1s: false,
                  you: you1,
                  flag: 0
              })
              console.log(this.data.flags)
          } else {
              this.setData({
                  flag1: 0,
                  flags: false,
                  flag1s: true,
                  you:1,
                  flag: 0
              })
              console.log(this.data.flags)
          }
      }
      this.getTotalPrice();
  },
    //到店取货
  changeGet:function(e){
    var flag = e.detail.value;
    if(flag){
        this.setData({
            flag2:2,
            flag_icon:true
        })
    }else{
        this.setData({ 
            flag2: 1 ,
            flag_icon: false
        })
    }
  },
    bindGet:function(e){
        var store = this.data.store;
        var currentValue = e.detail.value; 
        for(var i = 0;i < store.length;i++){
            if (currentValue.indexOf(store[i].name) !== -1){
                store[i].checked = 2
            }else{
                store[i].checked = 1
            }
        }
        this.setData({ store: store})
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
  //==================使用茶币
  biName: function (e) {
      var points = e.detail.value;
      var pointsss = this.data.pointsss;
      var totalPrice = this.data.totalPrice;
      if (points < 0) {
          wx.showModal({
              title: '请填写正确的茶币',
          })
      } else if (points > pointsss){
          this.setData({
              pointss: pointsss
          })
      } else if (points == "") {
          points = 0
          this.setData({
              pointss: points
          })
      } else {
          this.setData({
              pointss: points
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
    var points =this.data.points;
    var point = this.data.point;
    var quan = this.data.quan; // 控制优惠券的显示
    var you = this.data.you; // 优惠券列表
    var quan_index = this.data.quan_index;
    var quan_id = this.data.quan_id;
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
    if (flag == 1 && car == 0){
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
    // ====使用优惠券
    if (you == 1) {
        quan_yong = 1;
    } else {
        if (pan_quan > 0) {

            for (var i = 0; i < you.length; i++) {
                if (pan_quan == you[i].id) {
                    if (you[i].man <= total) {
                        quan = 1;
                        quan_index = i;
                        man = you[i].man;
                        jian = you[i].money;
                        total = total - you[i].money;
                        quan_id = you[i].id;
                    } else {
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
                            }
                        }
                    }
                }
            }
        } else {
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
                }
            }
        }
        if (man == 0) {
            quan = 0
        }
    }
    // ===设置数据
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2),
      points: points,
      man: man,
      jian: jian,
      quan: quan,
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
    var flag=this.data.flag;
    var you = this.data.you;
    var quan_index = this.data.quan_index;
    var you_id;
    var you_jian;
    if(quan_index <0 || you == 1){
      you_id = "";
      you_jian = ""
    }else{
      you_id = you[quan_index].id
      you_jian = you[quan_index].money
    }
    var orders_id = getApp().requestorders_id;
    var types_id = getApp().requesttypes_id;
    if (flag!=1){
      points=0;
    }else{
      points = this.data.points;
    }
    
    //判断是否到店取货 flag_icon->true 为取货 否->不取货
    var flag_icon = this.data.flag_icon;
    var dian_id;
    var flag_dao;
    if (flag_icon){
        flag_dao = 2;
        var store = this.data.store;
        for (var i = 0; i < store.length; i++) {
            if (store[i].checked == 2) {
                dian_id = store[i].dian_id;
            }
        }
    }else{
        flag_dao = 1;
        dian_id = null;
    }
    //console.log(totalPrice)
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.chooseAddress({
            success:function(resss){
              var address = resss.provinceName + resss.cityName + resss.countyName + resss.detailInfo
              wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_bama/pay/example/jsapi.php',
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
                        url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Orders/indexs',
                        data: { no: res.data.no, op: res.data.op, shop_num: carts[0].shop_num, address: address, moneys: totalPrice, xing: size, type: 1, covers: points, status: 1, id: carts[0].id, name: resss.userName, phone: resss.telNumber, orders_id: orders_id, types_s: types_id, you_id: you_id, you_jian: you_jian, dao: flag_dao,dian_id:dian_id},
                        method: 'GET',
                        success: function (res) {
                            wx.navigateTo({
                                url: '../my_order/my_order?types=' + 2,
                            })
                        }
                      })
                    },
                    'fail': function (res) {
                    },
                    'complete': function (ress) {
                      if (ress.errMsg == "requestPayment:fail cancel"){
                        wx.request({
                          url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Orders/indexs',
                          data: { no: res.data.no, op: res.data.op, shop_num: carts[0].shop_num, address: address, moneys: totalPrice, xing: size, type: 1, covers: points, status: 2, id: carts[0].id, name: resss.userName, phone: resss.telNumber, orders_id, orders_id, types_s: types_id, you_id: you_id, you_jian: you_jian, dao: flag_dao, dian_id: dian_id},
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
  //隐藏弹出层
  bindHide:function(){
      if(this.data.pop_flag == 1){
          this.setData({pop_flag : 2})
      }
      if (this.data.flag2 == 2) {
          this.setData({ 
              flag2: 1,
        })
      }
  },
  chooseAddress:function(){
      if (this.data.flag2 == 2) {
          this.setData({
              flag2: 1
          })
      }
  },
  //茶币支付1
  chaZhiName:function(){
      var that = this;
      console.log(this.data.hui)
      if (that.data.hui == 2) {
          wx.showModal({
              title: '提示',
              content: '请先完善个人信息',
              showCancel: false,
              success: function () {
                  wx.navigateTo({
                      url: '../message/message',
                  })
              }
          })
      } else {
          that.setData({
              pop_flag: 1
          })
      }
  },
    //茶币支付2
    formSubmit:function(e){
        var that = this;
        let carts = this.data.carts;
        let totalPrice = this.data.totalPrice;//总价
        var size = this.data.size_name; //型号
        var points = this.data.points; //积分
        var flag = this.data.flag;
        var you = this.data.you;
        var quan_index = this.data.quan_index;
        var you_id;
        var you_jian;
        if (quan_index < 0) {
            you_id = "";
            you_jian = ""
        } else {
            you_id = you[quan_index].id
            you_jian = you[quan_index].money
        }
        var orders_id = getApp().requestorders_id;
        var types_id = getApp().requesttypes_id;
        if (flag != 1) {
            points = 0;
        } else {
            points = this.data.points;
        }
        //判断是否到店取货 flag_icon->true 为取货 否->不取货
        var flag_icon = this.data.flag_icon;
        var dian_id;
        var flag_dao;
        if (flag_icon) {
            flag_dao = 2;
            var store = this.data.store;
            for (var i = 0; i < store.length; i++) {
                if (store[i].checked == 2) {
                    dian_id = store[i].dian_id;
                }
            }
        } else {
            flag_dao = 1;
            dian_id = null;
        }

        if (e.detail.value.password == ''){
            wx.showToast({
                title: '密码不能为空',
            })
        }else{
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.chooseAddress({
                            success: function (resss) {
                                console.log(resss);
                                var address = resss.provinceName + resss.cityName + resss.countyName + resss.detailInfo;
                                wx.request({
                                    url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/User/mi_zhi',
                                    data: { code: res.code, pass: e.detail.value.password },
                                    method: 'GET',
                                    success: function (ress) {
                                        console.log(ress);
                                        if (ress.data == 2) {
                                            wx.showModal({
                                                title: '提示',
                                                content: '密码错误',
                                                showCancel: false
                                            })
                                        } else {
                                            wx.request({
                                                url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Orders/indexs',
                                                data: { no: 0, shop_num: carts[0].shop_num, address: address, moneys: totalPrice, xing: size, type: 1, types_s: 2, status: 1, id: carts[0].id, name: resss.userName, phone: resss.telNumber, user_id: ress.data.user_id, dao: flag_dao, dian_id: dian_id },
                                                method: 'GET',
                                                success: function (res) {
                                                    wx.showToast({
                                                        title: '支付成功',
                                                        duration:1000,
                                                        success: function () {
                                                            that.setData({
                                                                pop_flag: 2
                                                            })
                                                        }
                                                    })
                                                },
                                            })
                                        }

                                    },
                                    complete: function (res) { },
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
            })          
        }


    }

})

Array.prototype.max = function () {
  return Math.max.apply({}, this)
}
Array.prototype.min = function () {
  return Math.min.apply({}, this)
}