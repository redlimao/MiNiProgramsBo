// pages/shop/shop.js
Page({

  data: {
    selectAllStatus: true,
    totalPrice: 0,
    flag: 0,
    empty: 0,
    points: 0,
    point: 0,
    user: "",
    carts:"",
    you:"",
    quan:1,
    quan_index:-1,
    quan_id:"",
    pan_quan:'',
    quan_yong: 0,
    flags: false,
    flag1s: false,
    pop_flag: 2,
    flag_icon: false,
    flag2: 1,
    flag: 0,
    flag1: 1
  },
  onShow: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Center/carss',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
                console.log(res);
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  carts: res.data.info,
                  points: res.data.covers,
                  point: res.data.covers,
                  user: res.data.user_id,
                  you:res.data.you,
                  you1: res.data.you,
                  pan_quan:res.data.xia_biao,
                  pointss: res.data.bi,
                  pointsss: res.data.bi,
                  hui: res.data.hui,
                  store: res.data.arr
                })
              }
              that.getTotalPrice();
            },
            complete:function(){
                wx.hideLoading()
            }
          })
        }
      }
    })
  },
  //到店取货
  changeGet: function (e) {
      var flag = e.detail.value;
      if (flag) {
          this.setData({
              flag2: 2,
              flag_icon: true
          })
      } else {
          this.setData({
              flag2: 1,
              flag_icon: false
          })
      }
  },
  bindGet: function (e) {
      var store = this.data.store;
      var currentValue = e.detail.value;
      for (var i = 0; i < store.length; i++) {
          if (currentValue.indexOf(store[i].name) !== -1) {
              store[i].checked = 2
          } else {
              store[i].checked = 1
          }
      }
      this.setData({ store: store })
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
              flag: 0
          })
      } else {
          if (this.data.flag1s == true) {
              this.setData({
                  flag1: 1,
                  flags: false,
                  flag1s: false,
                  you: you1,
                  flag: 0
              })
          } else {
              this.setData({
                  flag1: 0,
                  flags: false,
                  flag1s: true,
                  you: 1,
                  flag: 0
              })
          }
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
      } else if (points > pointsss) {
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
  //==================使用选择多少积分
  moName: function (e) {
    var points = e.detail.value
    var point = this.data.point
    if (points > point) {
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
    let carts = this.data.carts;                  // 获取购物车列表
    var flag = this.data.flag;
    var points = parseInt(this.data.points) * 0.01; //积分换价格
    var quan=this.data.quan; // 控制优惠券的显示
    var you =this.data.you; // 优惠券列表
    var quan_index=this.data.quan_index; 
    var quan_id=this.data.quan_id;
    var man=0; //满减金额
    var jian=0; //减去金额
    var  max=[]; // 算最大值
    var pan_quan=this.data.pan_quan;  //判断是否选择优惠券
    var quan_yong=this.data.quan_yong; //  判断是否有可用的优惠券
    var man_arr = [];// 算最大值
    var that = this;
    let total = 0
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                   // 判断选中才会计算价格
        total += carts[i].shop_money;     // 所有价格加起来
      }
    }
    if (flag == 1) {
      total = total - points
    }
        // ====使用优惠券
    if(you==1){
      quan_yong = 1;
    }else{
      if (pan_quan > 0) {
          
        for (var i = 0; i < you.length; i++) {
          if (pan_quan == you[i].id) {
              if (you[i].man <= total){
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
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2),
      man:man,
      jian:jian,
      quan:quan,
      quan_id:quan_id,
      quan_index:quan_index,
      quan_yong: quan_yong
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
  delName(e) {
    var id = e.currentTarget.id;
    var user = this.data.user;
    var that = this;
    wx.showModal({
      title: '确认删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Del/index',
            data: { id: id, user_id: user },
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  carts: res.data.info,
                  empty:0
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
    var points = this.data.points
    var pay_list = [];
    var that = this;
    var flag = this.data.flag;
    var you=this.data.you;
    var quan_index=this.data.quan_index;
    var you_id;
    var you_jian;
    if (quan_index < 0) {
      you_id = "";
      you_jian = ""
    } else {
      you_id = you[quan_index].id
      you_jian = you[quan_index].money
    }
    console.log(quan_index, you, you_id, you_jian)
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
  
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.chooseAddress({
            success: function (resss) {
              var address = resss.provinceName + resss.cityName + resss.countyName + resss.detailInfo
              wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/pay/example/jsapi.php',
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
                        success: function (res) {
                          wx.switchTab({
                            url: '../main/main',
                          })
                        }
                      })
                      wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Orders/indexs',
                        data: { no: res.data.no, op: res.data.op, type: 2, covers: points, status: 1, name: resss.userName, phone: resss.telNumber, address: address, cars: pay_list, you_id: you_id, you_jian: you_jian,  dao: flag_dao,dian_id:dian_id },
                        method: 'GET',
                        success: function (res) {
                          console.log(res);
                        }
                      })
                    },
                    'fail': function (res) {
                      console.log(res)
                    },
                    'complete': function (ress) {
                      console.log(ress)
                      if (ress.errMsg == "requestPayment:fail cancel") {
                        wx.request({
                          url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Orders/indexs',
                          data: { no: res.data.no, op: res.data.op, type: 2, covers: points, status: 2, name: resss.userName, phone: resss.telNumber, address: address, cars: pay_list, you_id: you_id, you_jian: you_jian,  dao: flag_dao,dian_id:dian_id},
                          method: 'GET',
                          success: function (res) {

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
  quanName:function(e){
    var money_id = e.target.id;
    var app = getApp();
    app.requestmoney_id = money_id;
    var quan_id = e.target.dataset.id;
    var app = getApp();
    app.requestquan_id = quan_id ;
    wx.navigateTo({
      url: '../quan/quan',
    })
  },
  //隐藏弹出层
  bindHide: function () {
      if (this.data.pop_flag == 1) {
          this.setData({ pop_flag: 2 })
      }
      if (this.data.flag2 == 2) {
          this.setData({
              flag2: 1
          })
      }
  },
  chooseAddress: function () {
      if (this.data.flag2 == 2) {
          this.setData({
              flag2: 1
          })
      }
  },
  //茶币支付1
  chaZhiName: function () {
      var that = this;
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
  formSubmit: function (e) {
      let carts = this.data.carts;
      let totalPrice = this.data.totalPrice;
      var pay_list = [];
      var that = this;
      var flag = this.data.flag;
      var you = this.data.you;
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

      for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
          if (carts[i].selected) {                   // 判断选中另存数组
              pay_list.push(carts[i])
          }
      }
      if (e.detail.value.password == '') {
          wx.showToast({
              title: '密码不能为空',
          })
      } else {
          wx.login({
              success: function (res) {
                  if (res.code) {
                      wx.chooseAddress({
                          success: function (resss) {
                              console.log(resss);
                              var address = resss.provinceName + resss.cityName + resss.countyName + resss.detailInfo;
                              wx.request({
                                  url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/User/mi_zhi',
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
                                              url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Orders/indexs',
                                              data: { no: 0, shop_num: carts[0].shop_num, address: address, moneys: totalPrice, xing: size, type: 1, types_s: 2, status: 1, id: carts[0].id, name: resss.userName, phone: resss.telNumber, orders_id, user_id: ress.data.user_id, dao: flag_dao, dian_id: dian_id },
                                              method: 'GET',
                                              success: function (res) {
                                                  wx.showToast({
                                                      title: '支付成功',
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