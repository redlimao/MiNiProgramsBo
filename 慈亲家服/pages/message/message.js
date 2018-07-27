var list = require("../../utils/citys.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    arr_index:0,
    sex:["请选择性别","男","女"],
    arr_index: 0,
    company_index: 0,
    company:[],
    sex_index:0,
    date:"请选择日期",
    types:"",
    user:"",
    city: [],
    area: [],
    city_index: 0,
    area_index: 0,
    val:[]
  },
  onLoad: function (options) {
    var card_id = getApp().requestcard_id;
    this.setData({
      types: card_id
    })
    // ====列表初始化
    list.init(this);
    var cityData = this.data.cityData;
    // ===循环放入
    var city = [];
    var area = [];
    var area_index = 0;
    var city_index = 0;
    this.setData({
      types: card_id
    })
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/huans',
            data: { code: ress.code, type: card_id },
            method: "GET",
            success: function (res) {
              if(res.data==1){
                that.setData({
                  arr: res.data.type,
                  user: res.data.user_id,
                  company:res.data.c_t
                })
              }else{
                that.setData({
                  name: res.data.info.name,
                  phone: res.data.info.phone,
                  shopName: res.data.info.store_name,
                  sex_index:res.data.info.sex,
                  date:res.data.info.years,
                  arr:res.data.type,
                  arrs: res.data.er_s,
                  user: res.data.user_id,
                  gongname: res.data.info.company_name,
                  company: res.data.c_t,
                })
                var arr = that.data.arr
                var arr_index
                for (var i = 0; i < arr.length; i++) {
                  if (arr[i] == res.data.info.type_name) {
                    that.setData({
                      arr_index:i
                    })
                  }
                }
                var company = that.data.company
                var company_index
                for (var i = 0; i < company.length; i++) {
                  if (company[i] == res.data.info.company_n) {
                    that.setData({
                      company_index: i
                    })
                  }
                }
                for (var i = 0; i < res.data.er_s.length; i++) {
                  for (var j = 0; j < res.data.er_t.length; j++){
                    if (res.data.er_t[j] == res.data.er_s[i].name){
                      res.data.er_s[i].check=true;
                      that.setData({
                        arrs: res.data.er_s
                      })
                    }
                  }
                }
                for (let j = 0; j < cityData[26].sub.length; j++) {
                  city.push(cityData[26].sub[j].name);
                  if (cityData[26].sub[j].name == res.data.info.city){
                    city_index=j;
                  }else{
                    city_index = 0;
                  }
                  for (let x = 0; x < cityData[26].sub[city_index].sub.length; x++) {
                    area.push(cityData[26].sub[city_index].sub[x].name);
                    if (res.data.info.area == cityData[26].sub[city_index].sub[x].name) {
                      area_index = x;
                    }
                  }
                  that.setData({
                    city: city,
                    area: area,
                    city_index: city_index,
                    area_index: area_index
                  })
                }
              }
            }
          })
        }
      }
    }) 
  
  },
  // =====性别选择
  sexChange:function(e){
    this.setData({
      sex_index: e.detail.value
    })
  },
  // =====家政出生日期
  bindDateChange:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  // =====家政岗位
  arrChange:function(e){
    this.setData({
      arr_index: e.detail.value
    })
  },
  // =====所在公司
  companyChange: function (e) {
    this.setData({
      company_index: e.detail.value
    })
  },
  // =====家政第二岗位
  checkboxChange:function(e){
      this.setData({
        val: e.detail.value
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
    var city_index = this.data.city_index;
    var that = this;
    this.setData({
      area_index: e.detail.value,
    })
  },
  // =============提交信息
  formSubmit: function (e) {
    var card_id = getApp().requestcard_id;//身份
    var sex = this.data.sex_index;//性别
    var date=this.data.date//出城日期
    var user=this.data.user//用户id
    var type_id = this.data.arr_index//家政、保姆;
    var company = this.data.company;
    var company_index = this.data.company_index
    var val=this.data.val;
    var city=this.data.city;
    var city_index = this.data.city_index;
    var area = this.data.area;
    var area_index = this.data.area_index;
    var citys = city[city_index]
    var areas = area[area_index]
    if (type_id == 0 && card_id==4){
      wx.showModal({
        title: '请选择第一岗位'
      })
    }else{
      console.log(company[company_index]);
      type_id = type_id-1
      wx.request({
        url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/ti',
        data: { user_id: user, name: e.detail.value.username, phone: e.detail.value.phone, sex: sex, type: card_id, type_id: type_id, store_name: e.detail.value.shopname, years: date, city: citys, area: areas, er: val, company_name: e.detail.value.gongname, company: company[company_index]},
        method: "GET",
        success: function (res) {
          if (res.data == 1) {
            wx.showToast({
              title: '成功',
              success: function () {
                wx.switchTab({
                  url: '../main/main',
                })
              }
            })
          } else if (res.data == 2) {
            wx.showModal({
              title: '提交失败',
            })
          } else if (res.data == 4) {
            wx.showModal({
              title: '电话已被注册',
            })
          } else if (res.data == 5) {
            wx.showModal({
              title: '店铺名已被注册',
            })
          } else if (res.data == 7) {
            wx.showModal({
              title: '请输入正确的电话号码',
            })
          } else if (res.data == 8) {
            wx.showModal({
              title: '请输入规范的姓名',
            })
          }else {
            wx.showModal({
              title: '提交失败',
            })
          }
        }
      })
    }
  }
})