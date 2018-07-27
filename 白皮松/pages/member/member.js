// pages/lookmessage/lookmessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      empty:1,
      currentIndex:1,
      user_id : '',
      list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        var that = this;
        var user_id = getApp().requsetId;
        console.log(user_id);
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/orders_member',
            data: {type:1,user_id:user_id},
            method: "GET",
            success:function(res){
                console.log(res);
                that.setData({
                    info: res.data.info,
                    list: res.data.list
                })
            }
        })   
    },    
    //支付
    bindPayment:function(){
        var that = this;
        wx.login({
            success:function(ress){
                if(ress.code){
                    wx.request({
                        url: 'https://www.bozhiyingxiao.com/little_program/store_trees/pay/example/jsapi.php',
                        data: { code: ress.code, total_fee: that.data.list.moneys, title:'充值会员'},
                        method: 'GET',
                        success: function(res) {
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
                                        success: function () {
                                            
                                        }
                                    })
                                    wx.request({
                                        url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Orders/index',
                                        data: { no: res.data.no, op: res.data.op, status: 1, types: 1 },
                                        method: 'GET',
                                        success: function (res) {
                                            console.log(res);
                                        }
                                    })

                                },
                                'fail': function (res) {

                                },
                                'complete': function (ress) {
                                    // if (ress.errMsg == "requestPayment:fail cancel") {
                                    //     wx.request({
                                    //         url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Orders/add_orders',
                                    //         data: {  no: res.data.no, op: res.data.op, status: 1,types:1},
                                    //         method: 'GET',
                                    //         success: function (res) {
                                    //             console.log(res);
                                    //         }
                                    //     })
                                    // }
                                }
                            })
                        },
                    })
                }
            }
        })

    },
    // 滑动菜单切换
    tabs: function (e) {
        this.setData({
            currentIndex: e.target.dataset.id
        });
        var that = this;
        var user_id = getApp().requsetId;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/orders_member',
            data: { type: e.target.dataset.id, user_id: user_id },
            method: "GET",
            success: function (res) {
                console.log(res);
                if(res.data.info !=1){
                    that.setData({
                        info: res.data.info,
                    })
                }
                if(res.data.list != 1){
                    that.setData({
                        list: res.data.list
                    })                    
                }
                if(res.data.you != 1){
                    that.setData({
                        empty : 1,
                        you: res.data.you
                    })                      
                }

            }
        })
    }
})