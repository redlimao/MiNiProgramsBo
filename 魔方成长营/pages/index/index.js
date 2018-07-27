//index.js
//获取应用实例
var app = getApp();
var list = require("../../utils/citys.js");
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    userInfo: {},
    flag:1,
    kind: [],
    list:[],
    val:0,
    sou:1,
    empty:0,
    ad:[],
    pro: [],
    city: [],
    area: [],
    pro_code: [],
    city_code: [],
    area_code: [],
    pro_index: 0,
    city_index: 0,
    area_index: 0,
    kind_index: 0,
    n:1,
    lat:"",
    lng:"",
    qu:"",
    qing:0
  },
  onShow:function(){
   
  },
  onLoad: function () {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: '2UVBZ-L5X3W-W3CRB-OK3RA-6WXQH-4VFOJ'
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (ress) {
        
        // 调用接口
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: ress.latitude,
            longitude: ress.longitude
          },
          success: function (res) {
            // ==========获取列表信息
            wx.login({
              success:function(rse){
                wx.request({
                  url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Shou/school',
                  data: { code:rse.code,area: res.result.ad_info.adcode, wei: ress.latitude, jing: ress.longitude },
                  method: "GET",
                  success: function (resss) {
                    console.log(resss);
                    if (resss.data.school == 1) {
                      that.setData({
                        empty: 1
                      })
                    } else {
                      that.setData({
                        list: resss.data.school,
                        ad: resss.data.ad,
                        kind: resss.data.type,
                        empty: 0,
                        lat: ress.latitude,
                        lng: ress.longitude,
                        qu: res.result.ad_info.adcode
                      })
                    }
                  }
                })
              }
            })
            
            // ====列表初始化
            list.init(that);
            var cityData = that.data.cityData;
            // ===循环放入
            var pro = [];
            var city = [];
            var area = [];
            var pro_code = []; var city_code = []; var area_code = [];
            var area_index = 0;
            var city_index = 0;
            var pro_index = 0;
            for (let i = 0; i < cityData.length; i++) {
              pro.push(cityData[i].name);
              pro_code.push(cityData[i].code);
              if (res.result.ad_info.province == cityData[i].name) {
                pro_index = i;
                for (let j = 0; j < cityData[i].sub.length; j++) {
                  city.push(cityData[i].sub[j].name);
                  city_code.push(cityData[i].sub[j].code);
                  if (res.result.ad_info.city == cityData[i].sub[j].name) {
                    city_index = j;
                    for (let x = 0; x < cityData[i].sub[j].sub.length; x++) {
                      area.push(cityData[i].sub[j].sub[x].name);
                      area_code.push(cityData[i].sub[j].sub[x].code);
                      if (res.result.ad_info.district == cityData[i].sub[j].sub[x].name) {
                        area_index = x;
                      }
                    }
                  }
                }
                that.setData({
                  pro: pro,
                  city: city,
                  area: area,
                  pro_code: pro_code,
                  city_code: city_code,
                  area_code: area_code,
                  area_index: area_index,
                  pro_index: pro_index,
                  city_index: city_index
                })
              }
            }
          },
          fail: function (res) {

          },
          complete: function (res) {

          }
        });
      }
    }); 
    wx.login({
      success: function (ress) {
        if (ress) {
          wx.getUserInfo({
            success: function (res){
              wx.request({
                url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Shou/index',
                data: { code: ress.code, headimgurl: res.userInfo.avatarUrl, nickname: res.userInfo.nickName },
                method: "GET",
                success: function (res) {
                  
                }
              })
            }
          })
        }
      }
    })
  },
  //===============省份
  proChange: function (e) {
    var cityData = this.data.cityData;
    var pro_index = e.detail.value
    var city = [];
    var area = [];
    var city_code = [];
    var area_code = [];
    var pro_code = this.data.pro_code;
    var types = this.data.kind_index;
    var lat = this.data.lat;
    var lng = this.data.lng;
    var that = this;
    for (let i = 0; i < cityData[pro_index].sub.length; i++) {
      city.push(cityData[pro_index].sub[i].name);
      city_code.push(cityData[pro_index].sub[i].code);
    }
    for (let i = 0; i < cityData[pro_index].sub[0].sub.length; i++) {
      area.push(cityData[pro_index].sub[0].sub[i].name);
      area_code.push(cityData[pro_index].sub[0].sub[i].code);
    }
    this.setData({
      pro_index: pro_index,
      city: city,
      area: area,
      city_code: city_code,
      area_code: area_code
    })
    // ====初始化内容列表
    wx.login({
      success:function(rse){
        if(rse.code){
          wx.request({
            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Shou/infos',
            data: { code:rse.code,province: pro_code[pro_index], city: city_code[0], area: area_code[0], type: types, wei: lat, jing: lng, },
            method: "GET",
            success: function (res) {
              if (res.data == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  list: res.data,
                  empty: 0,
                  qu: area_code[0],
                  n: 1,
                  qing: 0
                })
              }
            }
          })
        }
      }
    })
    
  },
  //===============城市
  cityChange: function (e) {
    var cityData = this.data.cityData;
    var city_index = e.detail.value;
    var pro_index = this.data.pro_index;
    var area = [];
    var area_code = [];
    var pro_code = this.data.pro_code;
    var city_code = this.data.city_code;
    var types = this.data.kind_index;
    var lat = this.data.lat;
    var lng = this.data.lng;
    var that = this;
    for (let i = 0; i < cityData[pro_index].sub[city_index].sub.length; i++) {
      area.push(cityData[pro_index].sub[city_index].sub[i].name);
      area_code.push(cityData[pro_index].sub[city_index].sub[i].code);
    }
    this.setData({
      city_index: city_index,
      area: area,
      city_code: city_code,
      area_code: area_code
    })
    // =============初始化内容列表
    wx.login({
      success:function(rse){
        if(rse.code){
          wx.request({
            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Shou/infos',
            data: { code:rse.code,province: pro_code[pro_index], city: city_code[city_index], area: area_code[0], type: types, wei: lat, jing: lng, },
            method: "GET",
            success: function (res) {
              if (res.data == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  list: res.data,
                  qu: area_code[0],
                  empty: 0,
                  n: 1,
                  qing: 0
                })
              }
            }
          })
        }
      }
    })
    
  },
  //===============地区
  areaChange: function (e) {
    var pro_code = this.data.pro_code;
    var city_code = this.data.city_code;
    var area_code = this.data.area_code;
    var city_index = this.data.city_index;
    var pro_index = this.data.pro_index;
    var types = this.data.kind_index;
    var lat = this.data.lat;
    var lng = this.data.lng;
    var that = this;
    this.setData({
      area_index: e.detail.value,
    })
    // =============初始化内容列表
    wx.login({
      success:function(rse){
        wx.request({
          url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Shou/infos',
          data: { code:rse.code,province: pro_code[pro_index], city: city_code[city_index], area: area_code[e.detail.value], type: types, wei: lat, jing: lng, },
          method: "GET",
          success: function (res) {
            if (res.data == 1) {
              that.setData({
                empty: 1
              })
            } else {
              that.setData({
                list: res.data,
                qu: area_code[e.detail.value],
                empty: 0,
                n: 1,
                qing: 0
              })
            }
          }
        }) 
      }
    })
  },
  //===============性质
  kindChange: function (e) {
    this.setData({
      kind_index: e.detail.value
    })
    var pro_code = this.data.pro_code;
    var city_code = this.data.city_code;
    var area_code = this.data.area_code;
    var pro_index = this.data.pro_index;
    var city_index = this.data.city_index;
    var area_index = this.data.area_index;
    var lat = this.data.lat;
    var lng = this.data.lng;
    var that = this;
    // =============初始化内容列表
    wx.login({
      success:function(rse){
        if(rse.code){
          wx.request({
            url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Shou/infos',
            data: {code:rse.code, province: pro_code[pro_index], city: city_code[city_index], area: area_code[area_index], type: e.detail.value, wei: lat, jing: lng, },
            method: "GET",
            success: function (res) {
              if (res.data == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  list: res.data,
                  empty: 0,
                  n: 1,
                  qing: 0
                })
              }
            }
          })
        }
      }
    })
  },
  infoName:function(e){
    var school_id = e.currentTarget.dataset.id;
    var app = getApp();
    app.requestschool_id = school_id;
    wx.navigateTo({
      url: '../info/info'
    })
  },
  innerName:function(e){
    var value=e.detail.value;
    this.setData({
      val:value
    })
  },
  //==============搜索
  searchName:function(){
    var val=this.data.val;
    var that=this;
    wx.request({
      url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Shou/sou',
      data: { content: val},
      method:"GET",
      success:function(res){
        if(res.data==1){
          that.setData({
            sou:2
          })
        } else if (res.data == 2){
          that.setData({
            sou: 2
          })
        }else{
          that.setData({
            sou: 1,
            list:res.data
          })
        }
      }
    })
  },
  guangName:function(e){
    var detail_id = e.currentTarget.id;
    var app = getApp();
    app.requestdetail_id = detail_id;
    var type_id=4;
    var app = getApp();
    app.requesttype_id = type_id;
    wx.navigateTo({
      url: '../details/details'
    })
  },
  chaName:function(e){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //=============下拉加载
  onReachBottom:function(){
   var n=this.data.n;
   var lat=this.data.lat;
   var lng=this.data.lng;
   var qu=this.data.qu;
   var that=this;
   var list=this.data.list;
   var types = this.data.kind_index;
   var qing=this.data.qing;
   n++;
   this.setData({
     n:n
   })
   // ==========获取列表信息
  if(qing==0){
    wx.showLoading({
      title: '加载中',
      success: function () {
        wx.login({
          success:function(rse){
            wx.request({
              url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Shou/la',
              data: {code:rse.code,area: qu, wei: lat, jing: lng, currpage: n, type: types },
              method: "GET",
              success: function (res) {
                wx.hideLoading()
                if (res.data == 1) {
                  that.setData({
                    qing: 1
                  })
                } else {
                  for (var i = 0; i < res.data.length; i++) {
                    list.push(res.data[i])
                  }
                  that.setData({
                    list: list,
                    qing: 0
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
})
 