
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    arr_index: 0,
    date: "请选择日期",
    ji_val: [],
    peng_val:[],
    fu_val:[],
    city: "",
    area: "",
    pro: "",
  },
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Info/fa_xu',
            data: {},
            method: "GET",
            success: function (res) {
              that.setData({
                arr:res.data.type,
                ji:res.data.ji,
                peng:res.data.peng,
                fu:res.data.fu
              })
            }
          })
        }
      }
    })

  },
  // ====选择地址
  chooseName: function (e) {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        that.setData({
          address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          pro: res.provinceName,
          city: res.cityName,
          area: res.countyName,
          adds: 1
        })
      },
      fail: function (res) {
        wx.openSetting({
          success: (res) => {
          }
        })
      }
    })
  },
  // =====上户日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // =====家政岗位
  arrChange: function (e) {
    this.setData({
      arr_index: e.detail.value
    })
  },
  // =====基本技能
  checkboxChange: function (e) {
    this.setData({
      ji_val: e.detail.value
    })
  },
  // =====烹饪能力
  checkboxChanges: function (e) {
    this.setData({
      peng_val: e.detail.value
    })
  },
  // =====服务状态
  checkboxChangess: function (e) {
    this.setData({
      fu_val: e.detail.value
    })
  },
  // =============提交信息
  formSubmit: function (e) {
    var type_id =this.data.arr_index//家政、保姆;
    var pro=this.data.pro;
    var city=this.data.city;
    var area=this.data.area;
    var date = this.data.date//出城日期
    var ji_val = this.data.ji_val;
    var peng_val=this.data.peng_val;
    var fu_val=this.data.fu_val;
    if (type_id == 0) {
      wx.showModal({
        title: '请选择岗位'
      })
    } else {
      wx.login({
        success: function (ress) {
          if (ress.code) {
            wx.request({
              url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Info/bao_xu',
              data: { code: ress.code, address: e.detail.value.add, type: type_id, pro: pro, city: city, area: area, start_at: date, m_o: e.detail.value.m_o, m_t: e.detail.value.m_t, a_o: e.detail.value.a_o, a_t: e.detail.value.a_t,ji:ji_val,peng:peng_val,fu:fu_val},
              method: "GET",
              success: function (res) {
                if (res.data == 1) {
                  wx.showToast({
                    title: '提交成功',
                    success:function(res){
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  })
                } else {
                  wx.showModal({
                    title: "失败",
                  })
                }
              }
            })
          }
        }
      })
    }
  }
})