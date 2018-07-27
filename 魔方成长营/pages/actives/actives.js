// pages/actives/actives.js
Page({
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    }, 
    empty:0,
    banner:[],
    list:[],
    xue:[],
    choose:2
  },
  onLoad: function (options) {
    var that = this;
    wx.login({
        success:function(ress){
            if(ress.code){
                wx.getUserInfo({
                    success: function (res) {
                        var userInfo = res.userInfo
                        var nickName = userInfo.nickName
                        var avatarUrl = userInfo.avatarUrl
                        var gender = userInfo.gender //性别 0：未知、1：男、2：女
                        var province = userInfo.province
                        var city = userInfo.city
                        var country = userInfo.country
                        wx.request({
                            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Business/index',
                            data: { code: ress.code, img: avatarUrl, sex: gender, name: nickName, city: city, pro: province, cou: country},
                            method: "GET",
                            success: function (res) {
                                console.log(res)
                                if (res.data.info == 1) {
                                    that.setData({
                                        empty: 1
                                    })
                                } else {
                                    that.setData({
                                        banner: res.data.lun,
                                        list: res.data.info,
                                        choose: res.data.info[0].can,
                                        empty: 0
                                    })
                                }
                            }
                        })
                    }
                })

            }
        }
    })
  },
  tabFun: function (e) {
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  },
  detailName:function(e){
    var choose=this.data.choose;
    if(choose==2){
      var detail_id = e.currentTarget.id;
      var app = getApp();
      app.requestdetail_id = detail_id;
      wx.navigateTo({
        url: '../actives_de/actives_de',
      })
    }else{
      var jiang_id = e.currentTarget.dataset.id;
      var app = getApp();
      app.requestjiang_id = jiang_id;
      wx.navigateTo({
        url: '../jiang/jiang',
      })
    }
  },
  guangName:function(e){
    var detail_id = e.currentTarget.id;
    var app = getApp();
    app.requestdetail_id = detail_id;
    wx.navigateTo({
      url: '../actives_de/actives_de',
    })
  },
  studyName:function(e){
    var that = this;
    wx.request({
      url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Business/index',
      data: {type:1},
      method: "GET",
      success: function (res) {
        if(res.data.info==1){
          that.setData({
            empty:1
          })
        }else{
          that.setData({
            list: res.data.info,
            choose: res.data.info[0].can,
            empty: 0
          })
        }
       
      }
    })
  },
  youName:function(){
    var that = this;
    wx.request({
      url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Business/index',
      data: {},
      method: "GET",
      success: function (res) {
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else {
          that.setData({
            list: res.data.info,
            choose: res.data.info[0].can,
            empty: 0
          })
        }

      }
    })
  },
  onPullDownRefresh:function(){
    var that = this;
    wx.request({
      url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Business/index',
      data: {},
      method: "GET",
      success: function (res) {
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else {
          that.setData({
            banner: res.data.lun,
            list: res.data.info,
            empty: 0
          })
        }
      }
    })
  },
  jiangName:function(){
    var that = this;
    wx.request({
      url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Jiang/index',
      data:{},
      method:"GET",
      success:function(res){
        console.log(res)
        if(res.data.info==1){
          that.setData({
            empty: 1
          })
        }else{
          that.setData({
            list: res.data.info,
            choose: res.data.info[0].can,
            empty: 0
          })
        }
      }
    })
  }
})