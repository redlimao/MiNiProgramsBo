// pages/createList/createList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    currentIndex:0,
    type_id:""
  },
  onLoad: function (options) {
    var that=this;
    wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Cha/index',
      data: {},
      method: 'GET',
      success: function (res) {
          console.log(res);
        that.setData({
          list:res.data.list,
          phone:res.data.phone
        })
      }
    })
  },
  //联系客服
  bindPhone: function (e) {
      wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone,
      })
  },
    //选中
    bindSelect:function(e){
        var list = this.data.list;
        var index = e.currentTarget.dataset.id;
        
        for(var i = 0 ; i < list.length;i++){
            list[i].select = 1;
            if (list[index].select == 1){
                list[index].select = 2
            }
        }
        this.setData({
            list: list 
        })
    },
  // =======先购买，再填信息
    bindBuy:function(){
    var that=this;
    var list = this.data.list;

    for(var i=0;i<list.length;i++){

      if (list[i].select==2){
        var money = list[i].money
        var moneys = list[i].moneys
        var c_id=list[i].id
      }
    }
    console.log(money, moneys, c_id)
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/pay/example/jsapi.php',
            data: { code: ress.code, total_fee: money, title: "茶币" },
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
                      wx.request({
                          url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Cha/u_bi',
                        data: { no: res.data.no, op: res.data.op, id: c_id, money: money, moneys: moneys },
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                          if(res.data == 2){
                                wx.showToast({
                                    title: '支付失败',
                                })
                          }
                        }
                      })
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