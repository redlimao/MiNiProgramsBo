var list = require("../../utils/citys.js");
Page({
  data: {
    pai: ["排序","默认"],
    pai_index: 0,
    date: '请选择时间',
    dates: '请选择时间',
    flag:0,
    flags: 0,
    empty:0,
    val:"",
    city: [],
    area: [],
    city_index: 0,
    area_index: 0,
  },
  onLoad: function () {
    var that=this;
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
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Homes/index',
      data: {},
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        that.setData({
          nav: res.data.type
        })
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else {
          that.setData({
            lists: res.data.info
          })
        }
      }
    })
  },
  // =========控制选择时间的显示
  shouNames:function(){
    var flag=this.data.flag;
    if(flag==0){
      this.setData({
        flag: 1
      })
    }else{
      this.setData({
        flag: 0
      })
    }
  },
  // =========控制选择时间的显示
  shouaNames: function () {
    var flags= this.data.flags;
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
      flag:0
    })
    var city_index = this.data.city_index;
    var area_index = this.data.area_index;
    var city = this.data.city;
    var area = this.data.area;
    var citys = city[city_index];
    var areas = area[area_index];
    var start_at = this.data.date;
    var end_at = e.detail.value;
    var pai = this.data.pai_index;
    console.log(citys, areas, start_at, end_at, pai)
    var that = this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/fu',
      data: { city: citys, area: areas, start_at: start_at, end_at: end_at, pai: pai },
      method: "GET",
      success: function (res) {
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else if(res.data==2) {
          wx.showModal({
            title: '请选择合理的时间',
          })
        }else{
          for (var i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].status != 1) {
              res.data.info[i].status = 1
            }
          }
          that.setData({
            lists: res.data.info,
            empty: 0
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
    var start_at=this.data.date;
    var end_at=this.data.dates
    var pai = this.data.pai_index;
    var that = this;
    console.log(citys, areas, start_at, end_at, pai)
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/fu',
      data: { city: citys, area: areas, start_at: start_at, end_at: end_at, pai: pai  },
      method: "GET",
      success: function (res) {
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else {
          for (var i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].status != 1) {
              res.data.info[i].status = 1
            }
          }
          that.setData({
            lists: res.data.info,
            empty: 0
          })
        }
      }
    })
  },
  //======排序
  paiNames: function (e) {
    this.setData({
      date:"请选择时间",
      dates:"请选择时间",
      city_index:0,
      area_index:0
    })
    var city_index = this.data.city_index;
    var area_index = this.data.area_index;
    var city = this.data.city;
    var area = this.data.area;
    var citys = city[city_index];
    var areas = area[area_index];
    var start_at = this.data.date;
    var end_at = this.data.dates
    var pai = e.detail.value;
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/fu',
      data: { city: citys, area: areas, start_at: start_at, end_at: end_at, pai: pai },
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else {
          for (var i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].status != 1) {
              res.data.info[i].status = 1
            }
          }
          that.setData({
            lists: res.data.info,
            empty: 0
          })
        }
      }
    })
  },
  guName: function (e) {
    var gu_id = e.currentTarget.id;
    var app = getApp();
    app.requestgu_id = gu_id; 
    var gu_types =1;
    var app = getApp();
    app.requestgu_types = gu_types; 
    wx.navigateTo({
      url: '../gu_details/gu_details',
    })
  },
  inputName: function (e) {
    var sou_id = e.detail.value;
    var app = getApp();
    app.requestsou_id = sou_id;
    var sout_id = 2;
    var app = getApp();
    app.requestsout_id = sout_id;
  },
  souName: function () {
    wx.navigateTo({
      url: '../sou/sou',
    })
    this.setData({
      val:""
    })
  },
  // ====刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Homes/index',
      data: {},
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        that.setData({
          nav: res.data.type
        })
        if (res.data.info == 1) {
          that.setData({
            empty: 1
          })
        } else {
          that.setData({
            lists: res.data.info
          })
        }
        wx.stopPullDownRefresh()
      }
    })
  }
})