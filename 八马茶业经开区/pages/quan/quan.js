// pages/quan/quan.js
Page({

  data: {
    empty:0,
    mask:0,
    money_id:"",
    quan_id:"",
    list:[]
  },
  onLoad: function (options) {
    var money_id= getApp().requestmoney_id;
    var quan_id = getApp().requestquan_id;
    var goods_id = getApp().requestgoods_id;
    var that=this;
    this.setData({
      money_id: money_id,
      quan_id: quan_id
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Center/coupons',
            data:{code:ress.code},
            method:"GET",
            success:function(res){
                console.log(res);
              if(res.data==1){
                that.setData({
                  empty:1
                })
              }else{
                that.setData({
                  empty:0,
                  list:res.data
                })
              }
              that.pan()
            }
          })
        }
      }
    }) 
  },
  // ========判断样式
  pan(){
    var money_id=this.data.money_id;
    var quan_id=this.data.quan_id;
    var list=this.data.list;
    var quan_ids;
    if (money_id == 0) {
      for (let i = 0; i < list.length; i++) {
        list[i].mask=0
        list[i].masks = 0
      };
      this.setData({
        ok: 1
      })
    } else {
      for (let i = 0; i < list.length; i++) {
        list[i].mask = 1
        list[i].masks = 1
      };
      this.setData({
        ok: 0
      })
    }
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == quan_id) {
        quan_ids = i
        if (money_id!=0){
          if (quan_ids >= 0) {
            list[quan_ids].select = true;
            list[quan_ids].masks = 1
            list[quan_ids].mask = 0
          }
        }
      }
    }
    this.setData({
      list:list
    })
  },
  // ======优惠券选择
  selectList:function(e){
    var index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    var list = this.data.list;                    // 获取购物车列表
    var money_id=this.data.money_id;        //获取购物车商品的总价
    var select = list[index].select;         // 获取当前商品的选中状态
    list[index].select = !select;              // 改变状态
    for(var i=0;i<list.length;i++){
      if (Number(money_id)>=list[i].man){    //满足条件的可以选择
      console.log(123)
        list[i].mask=0;
        list[i].masks = 1;
      }
      if (list[index].select==true){
        if(index!=i){
          list[i].mask = 1;
        }
      }
    }
    this.setData({
      list:list
    })
  },
  okName:function(){
    var quan_ids=this.data.quan_ids;
    var list=this.data.list;
    var goods_id = getApp().requestgoods_id;
    for(var i=0;i<list.length;i++){
      if(list[i].select==true){
        quan_ids=list[i].id
      }
    }
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Center/gou_you',
            data: {code:ress.code, id: quan_ids,goods_id:goods_id},
            method:"GET",
            success:function(res){
              if(res.data.info==1){
                wx.navigateBack({
                  delta:1
                })
              }
            }
          })
        }
      }
    })
  }
})

