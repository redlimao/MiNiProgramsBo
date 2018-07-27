var list = require("../../utils/citys.js");
Page({
  data: {
    status:["状态","空档期","工作中"],
    liang: ["成交量", "从低到高", "从高到低"],
    gong: [],
    status_index:0,
    liang_index:0,
    gong_index:0,
    empty:0,
    city: [],
    area: [],
    city_index: 0,
    area_index: 0,
    val:"",
    flag:0,
    n:1,
    qing: 0,
    types:'',
    moneys_one:'',
    moneys_two: '',
    age_one:'',
    age_two:'',
    year_one:'',
    year_two:''
  },
  onLoad: function (options){
    if (options.scene) {
      var sence = decodeURIComponent(options.scene)
    } else {
      var sence =0;
    } 
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
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.showLoading({
            title: '加载中',
          })
          wx.getUserInfo({
            success:function(res){
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              wx.request({
                url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Index/indexs',
                data: { code: ress.code, img: avatarUrl, sex: gender, name: nickName, city: city, pro: province, cou: country, sence: sence},
                method: "GET",
                success: function (res) {
                  wx.hideLoading()
                  that.setData({
                    nav:res.data.type
                  })
                  if(res.data.company_name==1){
                    that.setData({
                      gong:1
                    })
                  }else{
                    that.setData({
                      gong: res.data.company_name
                    })
                  }
                  if (res.data.info==1){
                    that.setData({
                      empty:1
                    })
                  }else{
                    for (var i=0; i<res.data.info.length; i++){
                      if (res.data.info[i].aa!=1){
                        res.data.info[i].aa=1
                      }
                    }
                    that.setData({
                      list: res.data.info
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
      area_index: e.detail.value
    })
  },
  //======状态
  staNames:function(e){
    this.setData({
     status_index: e.detail.value
    })
    // 公司名称
    var gong=this.data.gong;
    var gong_index = this.data.gong_index;
    var gong_name = gong[gong_index];
    //成交量
    var liang_index = Number(this.data.liang_index)+1;
    var status = Number(e.detail.value)+1;
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/shais',
      data: { status: status, nums: liang_index, company: gong_name },
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        if (res.data.info == 1) {
          that.setData({
            empty: 1,
            types:1
          })
        } else {
          that.setData({
            list: res.data.info,
            empty: 0,
            types: 1
          })
        }
      }
    })
  },
  //======成交量
  moNames: function (e) {
    this.setData({
      liang_index: e.detail.value
    })
    // 公司名称
    var gong = this.data.gong;
    var gong_index = this.data.gong_index;
    var gong_name = gong[gong_index];
    // 状态
    var status = Number(this.data.status_index)+1;
    var liang_index = Number(e.detail.value) + 1;
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/shais',
      data: { status: status, nums: liang_index, company: gong_name },
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        if (res.data.info == 1) {
          that.setData({
            empty: 1,
            types: 1
          })
        } else {
          that.setData({
            list: res.data.info,
            empty: 0,
            types: 1
          })
        }
      }
    })
  },
  //======公司
  gongNames: function (e) {
    this.setData({
      gong_index: e.detail.value
    })
    // 状态
    var status = Number(this.data.status_index) + 1;
    //成交量
    var liang_index = Number(this.data.liang_index) + 1;
    // 公司名称
    var gong = this.data.gong;
    var gong_index = e.detail.value;
    var gong_name = gong[gong_index]; 
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/shais',
      data: { status: status, nums: liang_index, company: gong_name },
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        if (res.data.info == 1) {
          that.setData({
            empty: 1,
            types: 1
          })
        } else {
          that.setData({
            list: res.data.info,
            empty: 0,
            types: 1
          })
        }
      }
    })
  },
  // =====筛选
  shaiName:function(e){
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
  // =====筛选请求
  formName:function(e){
    // 状态
    var status = Number(this.data.status_index) + 1;
    //成交量
    var liang_index = Number(this.data.liang_index) + 1;
    // 公司名称
    var gong = this.data.gong;
    var gong_index = this.data.gong_index;
    var gong_name = gong[gong_index];
    // =====地区、城市
    var city_index = this.data.city_index;
    var area_index = this.data.area_index;
    var city = this.data.city;
    var area = this.data.area;
    var citys = city[city_index];
    var areas = area[area_index];
    console.log(citys, areas, gong_name, status, liang_index, e.detail.value.moneys_one)
    this.setData({
      moneys_one: e.detail.value.moneys_one,
      moneys_two: e.detail.value.moneys_two,
      age_one: e.detail.value.age_one, 
      age_two: e.detail.value.age_two, 
      year_one: e.detail.value.year_one,
      year_two: e.detail.value.year_two
    })
    var that = this;

    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Sou/shais',
      data: { status: status, nums: liang_index, company: gong_name, area: areas, city: citys, moneys_one: e.detail.value.moneys_one, moneys_two: e.detail.value.moneys_two, age_one: e.detail.value.age_one, age_two: e.detail.value.age_two, year_one: e.detail.value.year_one, year_two: e.detail.value.year_two,type:1},
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        if (res.data.info == 1) {
          that.setData({
            empty: 1,
            flag:0,
            types: 2
          })
        } else {
          that.setData({
            list: res.data.info,
            empty: 0,
            flag: 0,
            types: 2
          })
        }
      }
    })

  },
  // ===详情
  detailsName:function(e){
    var jia_id = e.currentTarget.id;
    var app = getApp();
    app.requestjia_id = jia_id; 
    wx.navigateTo({
      url: '../jia_details/jia_details',
    })
  },
  // ===搜索
  inputName:function(e){
    var sou_id = e.detail.value;
    var app = getApp();
    app.requestsou_id = sou_id; 
    var sout_id =1;
    var app = getApp();
    app.requestsout_id = sout_id; 
  },
  // ===搜索
  souName:function(){
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
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Index/indexs',
      data: {  },
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
          for (var i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].status != 1) {
              res.data.info[i].status = 1
            }
          }
          that.setData({
            list: res.data.info
          })
        }
        wx.stopPullDownRefresh()
      }
    })
  },
  //=============下拉加载
  onReachBottom: function () {
    var n = this.data.n;
    var that = this;
    var qing = this.data.qing;
    var list=this.data.list;
    var types=this.data.types; //判断是里边筛选还是外边筛选
    // 状态
    var status = Number(this.data.status_index) + 1;
    //成交量
    var liang_index = Number(this.data.liang_index) + 1;
    // 公司名称
    var gong = this.data.gong;
    var gong_index = this.data.gong_index;
    var gong_name = gong[gong_index];
    // =====地区、城市
    var city_index = this.data.city_index;
    var area_index = this.data.area_index;
    var city = this.data.city;
    var area = this.data.area;
    var citys = city[city_index];
    var areas = area[area_index];
    // ====筛选内容
    var moneys_one = this.data.moneys_one;
    var moneys_two = this.data.moneys_two;
    var age_one = this.data.age_one;
    var age_two = this.data.age_two;
    var year_one = this.data.year_one;
    var year_two = this.data.year_two;
    n++;
    this.setData({
      n: n
    })
    // ==========获取列表信息
    if (qing == 0) {
      wx.showLoading({
        title: '加载中',
        success: function () {
          wx.login({
            success: function (rse) {
              wx.request({
                url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Index/la',
                data: { currpage: n, status: status, nums: liang_index, company: gong_name, area: areas, city: citys, moneys_one: moneys_one, moneys_two: moneys_two, age_one: age_one, age_two: age_two, year_one: year_one, year_two: year_two,type:types},
                method: "GET",
                success: function (res) {
                  wx.hideLoading()
                  if (res.data == 1) {
                    that.setData({
                      qing: 1
                    })
                  } else {
                    for (var i = 0; i < res.data.info.length; i++) {
                      list.push(res.data.info[i])
                    }
                    that.setData({
                      list: list
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