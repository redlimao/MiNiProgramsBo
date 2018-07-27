var list = require("../../utils/citys.js");
Page({
  data: {
    status: ["状态", "空档期", "工作中"],
    money: ["价格", "从低到高", "从高到低"],
    pai: ["排序", "默认"],
    status_index: 0,
    money_index: 0,
    pai_index: 0,
    city: [],
    area: [],
    city_index: 0,
    area_index: 0,
    date: '请选择时间',
    dates: '请选择时间',
    flag: 0,
    flags: 0,
    types:"",
    id:"",
    empty:0
  },
  onLoad: function (options) {
    var that = this;
    // =========动态设置title
    wx.setNavigationBarTitle({
      title: options.data
    })
    console.log(options.data)
    if (options.type==2){
      wx.setNavigationBarColor({
        frontColor:"#ffffff",
        backgroundColor: '#3DC451'
      })
    }
    list.init(this);
    var cityData = this.data.cityData;
    // ===循环放入
    var city = [];
    var area = [];
    var area_index = 0;
    var city_index = 0;
    for (let j = 0; j < cityData[26].sub.length; j++) {
      city.push(cityData[26].sub[j].name);
      for (let x = 0; x < cityData[26].sub[0].sub.length; x++) {
        area.push(cityData[26].sub[0].sub[x].name);
      }
    }
    this.setData({
      city: city,
      area: area,
      city_index: city_index,
      area_index: area_index,
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Index/info',
            data: { id: options.id, type: options.type ,code:ress.code},
            method: "GET",
            success: function (res) {
              if (res.data.info == 1) {
                that.setData({
                  empty: 1,
                  types: options.type
                })
              } else {
                that.setData({
                  list: res.data.info,
                  types: options.type,
                  id: options.id
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
    var area = [];
    var that = this;
    for (let i = 0; i < cityData[26].sub[city_index].sub.length; i++) {
      area.push(cityData[26].sub[city_index].sub[i].name);
    }
    this.setData({
      city_index: city_index,
      area: area
    })
  },
  //===============地区
  areaChange: function (e) {
    this.setData({
      area_index: e.detail.value,
      flags: 0
    })
    var city_index = this.data.city_index;
    var area_index = this.data.area_index;
    var city = this.data.city;
    var area = this.data.area;
    var citys = city[city_index];
    var areas = area[area_index];
    var types=this.data.types;
    var id=this.data.id;
    var status = this.data.status_index;
    var money = this.data.money_index;
    var pai = this.data.pai_index;
    var start_at = this.data.date;
    var end_at = this.data.dates
    var that = this;
    if(types==1){
      wx.request({
        url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/shai',
        data: { city: citys, area: areas, status: status, money: money, pai: pai,id:id },
        method: "GET",
        success: function (res) {
          if (res.data.info == 1) {
            that.setData({
              empty: 1
            })
          } else {
            that.setData({
              list: res.data.info,
              empty: 0
            })
          }
        }
      })
    }else{
      wx.request({
        url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/fu',
        data: { city: citys, area: areas, start_at: start_at, end_at: end_at, pai: pai, id: id},
        method: "GET",
        success: function (res) {
          if (res.data.info == 1) {
            that.setData({
              empty: 1
            })
          } else {
            that.setData({
              list: res.data.info,
              empty: 0
            })
          }
        }
      })
    }
  },
  //======状态
  staNames: function (e) {
    this.setData({
      status_index: e.detail.value
    })
    var city_index = this.data.city_index;
    var area_index = this.data.area_index;
    var city = this.data.city;
    var area = this.data.area;
    var citys = city[city_index];
    var areas = area[area_index];
    var id = this.data.id;
    var status = e.detail.value;
    var money = this.data.money_index;
    var pai = this.data.pai_index;
    var that = this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/shai',
      data: { city: citys, area: areas, status: status, money: money, pai: pai, id: id},
      method: "GET",
      success: function (res) {
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else {
          that.setData({
            list: res.data.info,
            empty: 0
          })
        }
      }
    })
  },
  //======价格
  moNames: function (e) {
    this.setData({
      money_index: e.detail.value
    })
    var city_index = this.data.city_index;
    var area_index = this.data.area_index;
    var city = this.data.city;
    var area = this.data.area;
    var citys = city[city_index];
    var areas = area[area_index];
    var id = this.data.id;
    var status = this.data.status_index;
    var money = e.detail.value;
    var pai = this.data.pai_index;
    var that = this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/shai',
      data: { city: citys, area: areas, status: status, money: money, pai: pai, id: id },
      method: "GET",
      success: function (res) {
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else {
          that.setData({
            list: res.data.info,
            empty: 0
          })
        }
      }
    })
  },
  //======排序
  paiNames: function (e) {
    this.setData({
      status_index: 0,
      money_index: 0,
      city_index: 0,
      area_index: 0,
      date: "请选择时间",
      dates: "请选择时间"
    })
    var city_index = this.data.city_index;
    var area_index = this.data.area_index;
    var city = this.data.city;
    var area = this.data.area;
    var citys = city[city_index];
    var areas = area[area_index];
    var id = this.data.id;
    var status = this.data.status_index;
    var money = this.data.money_index;
    var start_at = this.data.date;
    var end_at = this.data.dates
    var pai = e.detail.value;
    var types = this.data.types
    var that = this;
    if(types==1){
      wx.request({
        url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/shai',
        data: { city: citys, area: areas, status: status, money: money, pai: pai, id: id},
        method: "GET",
        success: function (res) {
          console.log(res);
          if (res.data.info == 1) {
            that.setData({
              empty: 1
            })
          } else {
            that.setData({
              list: res.data.info,
              empty: 0
            })
          }
        }
      })
    }else{
      wx.request({
        url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/fu',
        data: { city: citys, area: areas, start_at: start_at, end_at: end_at, pai: pai },
        method: "GET",
        success: function (res) {
          if (res.data.info == 1) {
            that.setData({
              empty: 1
            })
          } else {
            that.setData({
              list: res.data.info,
              empty: 0
            })
          }
        }
      })
    }
   
  },
  // =========控制选择地区的显示
  shouaNames: function () {
    var flags = this.data.flags;
    if (flags == 0) {
      this.setData({
        flags: 1
      })
    } else {
      this.setData({
        flags: 0
      })
    }
  },
  // =========控制选择时间的显示
  shouNames: function () {
    var flag = this.data.flag;
    if (flag == 0) {
      this.setData({
        flag: 1
      })
    } else {
      this.setData({
        flag: 0
      })
    }
  },
  // =========起始日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // =========截止日期
  bindDateChanges: function (e) {
    this.setData({
      dates: e.detail.value,
      flag: 0
    })
    var city_index = this.data.city_index;
    var area_index = this.data.area_index;
    var city = this.data.city;
    var area = this.data.area;
    var citys = city[city_index];
    var areas = area[area_index];
    var start_at = this.data.date;
    var end_at = e.detail.value;
    var id = this.data.id;
    var pai = this.data.pai_index;
    var that = this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/fu',
      data: { city: citys, area: areas, start_at: start_at, end_at: end_at, pai: pai, id: id},
      method: "GET",
      success: function (res) {
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else if (res.data == 2) {
          wx.showModal({
            title: '请选择合理的时间',
          })
        } else {
          that.setData({
            list: res.data.info,
            empty: 0
          })
        }
      }
    })
  },
  // =====家政详情
  detailsName: function (e) {
    var jia_id = e.currentTarget.id;
    var app = getApp();
    app.requestjia_id = jia_id;
    wx.navigateTo({
      url: '../jia_details/jia_details',
    })
  },
  //==========雇主详情
  guName: function (e) {
    var gu_id = e.currentTarget.id;
    var app = getApp();
    app.requestgu_id = gu_id;
    wx.navigateTo({
      url: '../gu_details/gu_details',
    })
  }
})