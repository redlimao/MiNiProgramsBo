// pages/ziliao/ziliao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cun:1,
    video_cun:1,
    avater:'',
    img_one:'',
    img_two:'',
    img_three:'',
    img_four:'',
    huo:0, //判断有没有获取电话号码
    headimgurl: 0, //头像
    album1: 0, //相册1
    album2: 0, //相册2
    album3: 0, //相册3
    album4: 0, //相册4
    video:'',
    mask: 0, //遮罩
    checked:[],  //选中标签存储
    jia_checked: [],  //选中休假存储
    sex_index:0,
    date:'选择',
    region: ['选择省', '选择市', '选择区'],
    regions: ['选择省', '选择市', '选择区'],
    height_index: 0,
    heights_index: 0,
    weight_index: 0,
    weights_index: 0,
    education_index: 0,
    educations_index: 0,
    home_index: 0,
    car_index: 0,
    marriage_index: 0,
    child_index: 0,
    moneys_index: 0,
    homes_index: 0,
    cars_index: 0,
    marriages_index: 0,
    childs_index: 0,
    moneyss_index: 0,
    smoking_index: 0,
    drink_index: 0,
    smokings_index: 0,
    drinks_index: 0,
    marryDate_index: 0,
    video_flag: false
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/zi_she',
            data: { code:ress.code },
            method: "GET",
            success: function (res) {
              wx.hideLoading();
              if (res.data.ji != 1) {
                that.setData({
                  ji: res.data.ji,
                  region: [res.data.ji.province, res.data.ji.city, res.data.ji.area],
                  date: res.data.ji.age,
                  sex_index: res.data.ji.sex,
                  height_index: res.data.ji.heights,
                  weight_index: res.data.ji.weights,
                  education_index: res.data.ji.education,
                  home_index: res.data.ji.home,
                  car_index: res.data.ji.car,
                  marriage_index: res.data.ji.marriage,
                  child_index: res.data.ji.child,
                  moneys_index: res.data.ji.moneys,
                  smoking_index: res.data.ji.smoking,
                  drink_index: res.data.ji.drinking,
                  phone:res.data.ji.phone,
                  marryDate_index: res.data.ji.marry_date
                })
              }else{
                that.setData({
                  ji: res.data.ji
                })
              }
              if (res.data.ze != 1) {
                that.setData({
                  ze: res.data.ze,
                  regions: [res.data.ze.province, res.data.ze.city, res.data.ze.area],
                  heights_index: res.data.ze.heights,
                  weights_index: res.data.ze.weights,
                  educations_index: res.data.ze.education,
                  homes_index: res.data.ze.home,
                  cars_index: res.data.ze.car,
                  marriages_index: res.data.ze.marriage,
                  childs_index: res.data.ze.child,
                  moneyss_index: res.data.ze.moneys,
                  smokings_index: res.data.ze.smoking,
                  drinks_index: res.data.ze.drinking
                })
              } else {
                that.setData({
                  ze: res.data.ze
                })
              }
              if (res.data.qq_wechat != 1) {
                that.setData({
                  qq_wechat: res.data.qq_wechat
                })
              }
              if (res.data.info.avatar != 1) {
                that.setData({
                  headimgurl_tempFilePaths: res.data.info.avatar,
                  headimgurl: 1,
                  cun:1
                })
              }
              if (res.data.info.img_one != 1) {
                that.setData({
                  album1_tempFilePaths: res.data.info.img_one,
                  album1: 1,
                  cun: 1
                })
              }
              if (res.data.info.img_two != 1) {
                that.setData({
                  album2_tempFilePaths: res.data.info.img_two,
                  album2: 1,
                  cun: 1
                })
              }
              if (res.data.info.img_three != 1) {
                that.setData({
                  album3_tempFilePaths: res.data.info.img_three,
                  album3: 1,
                  cun: 1
                })
              }
              if (res.data.info.img_four != 1) {
                that.setData({
                  album4_tempFilePaths: res.data.info.img_four,
                  album4: 1,
                  cun: 1
                })
              }
              if (res.data.info.vedio!=1){
                that.setData({
                  video_cun: 1
                })
              }
              that.setData({
                sex: res.data.arr.sex,
                height: res.data.arr.heights,
                weight: res.data.arr.weights,
                education: res.data.arr.education,
                home: res.data.arr.home,
                car: res.data.arr.car,
                marriage: res.data.arr.marriage,
                child: res.data.arr.child,
                moneys: res.data.arr.moneys,
                smoking: res.data.arr.smoking,
                drink: res.data.arr.drinking,
                smokings: res.data.arr.smokings,
                drinks: res.data.arr.drinkings,
                marryDate: res.data.arr.marry_date,
                tag: res.data.arr.tags,
                jia_tag: res.data.arr.week,
                xing: res.data.tags,
                qq_wechat: res.data.qq_wechat,
                xiuJia: res.data.vacation,
                bg:res.data.info.back_img,
                video_url:res.data.info.vedio
              })
            }
          })
        }
      }
    })  
   
  },
  // =====返回键
  backName: function () {
    var that = this;
    var cun=this.data.cun;
    var avater = this.data.avater;
    var img_one = this.data.img_one;
    var img_two = this.data.img_two;
    var img_three = this.data.img_three;
    var img_four = this.data.img_four;
    var video = this.data.video;
    var video_cun = this.data.video_cun;
    if (cun==0)    {
      wx.showModal({
        title: '上传图片还未保存，是否退出',
        success:function(res){
          if(res.confirm){
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/del_tu',
              data: { avatar: avater, img_one: img_one, img_two: img_two, img_three: img_three, img_four: img_four, vedio: video},
              method: "GET",
              success: function (res) {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }else{}
        }
      })
    } else if (video_cun==0){
      wx.showModal({
        title: '上传视频还未保存，是否退出',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/del_tu',
              data: { avatar: avater, img_one: img_one, img_two: img_two, img_three: img_three, img_four: img_four, vedio: video },
              method: "GET",
              success: function (res) {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          } else { }
        }
      })
    }else{
     wx.switchTab({
       url: '../main/main',
     })
    }
  },
  // =====获取手机号
  getPhoneNumber: function (e) {
    var that = this;
    console.log(e)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny' || e.detail.errMsg == 'getPhoneNumber:fail:cancel to confirm login'){
      console.log(123)
        that.setData({
          huo:1
        })
    } else{
      wx.login({
        success: function (ress) {
          if (ress.code) {
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Phone/index',
              data: { code: ress.code, iv: e.detail.iv, data: e.detail.encryptedData },
              method: "GET",
              success: function (res) {
                that.setData({
                  phone: res.data,
                  huo:0
                })
              }
            })
          }
        }
      })
    }
  },
  // =====更换背景
  bgName:function(){
    wx.navigateTo({
      url: '../bj/bj',
    })
  },
  // ======上传头像
  photoName:function(){
    var headimgurl = this.data.headimgurl;
    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/tu',
          filePath: tempFilePaths[0],
          formData: { avatar: that.data.avater },
          name: 'one',
          success: function (ress) {
            wx.showToast({
              title: '上传成功',
              success: function () {
                that.setData({
                  avater: ress.data.replace(/\s+/g, "")
                })
              }
            })
          }
        })
        if (tempFilePaths) {
          headimgurl = 1
        }
        that.setData({
          headimgurl_tempFilePaths: tempFilePaths,
          headimgurl: headimgurl,
          cun: 0
        })
      }
    })
  },
  // =======相册1
  albumName1:function(){
    var album1 = this.data.album1;
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/tu',
          filePath: tempFilePaths[0],
          formData: { img_one: that.data.img_one },
          name: 'two',
          success: function (ress) {
            wx.showToast({
              title: '上传成功',
              success: function () {
                that.setData({
                  img_one: ress.data.replace(/\s+/g, "")
                })
              }
            })
          }
        })
        if (tempFilePaths) {
          album1 = 1
        }
        that.setData({
          album1_tempFilePaths: tempFilePaths,
          album1: album1,
          cun: 0
        })
      }
    })
  },
  // =======相册2
  albumName2: function () {
    var album2 = this.data.album2;
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/tu',
          filePath: tempFilePaths[0],
          formData: { img_two: that.data.img_two },
          name: 'three',
          success: function (ress) {
            wx.showToast({
              title: '上传成功',
              success: function () {
                that.setData({
                  img_two: ress.data.replace(/\s+/g, "")
                })
              }
            })
          }
        })
        if (tempFilePaths) {
          album2 = 1
        }
        that.setData({
          album2_tempFilePaths: tempFilePaths,
          album2: album2,
          cun: 0
        })
      }
    })
  },
   // =======相册3
  albumName3: function () {
    var album3 = this.data.album3;
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/tu',
          filePath: tempFilePaths[0],
          formData: { img_three: that.data.img_three },
          name: 'four',
          success: function (ress) {
            wx.showToast({
              title: '上传成功',
              success: function () {
                that.setData({
                  img_three: ress.data.replace(/\s+/g, "")
                })
              }
            })
          }
        })
        if (tempFilePaths) {
          album3 = 1
        }
        that.setData({
          album3_tempFilePaths: tempFilePaths,
          album3: album3,
          cun: 0
        })
      }
    })
  }, // =======相册4
  albumName4: function () {
    var album4 = this.data.album4;
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/tu',
          filePath: tempFilePaths[0],
          formData: { img_four: that.data.img_four },
          name: 'five',
          success: function (ress) {
            wx.showToast({
              title: '上传成功',
              success: function () {
                that.setData({
                  img_four: ress.data.replace(/\s+/g, "")
                })
              }
            })
          }
        })
        if (tempFilePaths) {
          album4 = 1
        }
        that.setData({
          album4_tempFilePaths: tempFilePaths,
          album4: album4,
          cun: 0
        })
      }
    })
  },
// =========上传视频
  videoName: function () {
    var that = this;
    var video_url = this.data.video_url;
    if (video_url == 1) {
      that.videos()
    } else {
      wx.showActionSheet({
        itemList: ['查看视频', '上传视频'],
        success: function (res) {
          if (res.tapIndex == 0) {
            that.setData({
              video_url: video_url,
              video_flag: true
            })
          } else {
            that.videos()
          }
        },
      })
    }

  },
  videos: function () {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: 'true',
      success: function (res) {
        var tempFilePaths = res.tempFilePath;
        if (res.duration>15){
          wx.showModal({
            title: '您选择的视频超过15秒，请重新选择',
          })
        }else{
          wx.uploadFile({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/tu',
            filePath: tempFilePaths,
            formData: { vedio: that.data.video },
            name: 'six',
            success: function (ress) {
              wx.showToast({
                title: '上传成功',
                success: function () {
                  that.setData({
                    video: ress.data.replace(/\s+/g, ""),
                    video_url: res.tempFilePath,
                    video_cun: 0
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  // ========视频关闭
  videoClose: function () {
    this.setData({
      video_flag: false
    })
  },
  // ======开启弹窗信息
  maskName:function(e){
    this.setData({
      mask:1,
      types:e.currentTarget.dataset.id
    })
  },
  // ======关闭信息弹窗
  closeName:function(){
    this.setData({
      mask:0
    })
  },
// =================================基本资料设置
  // =====选择性别
  sexNames:function(e){
    this.setData({
      sex_index:e.detail.value
    })
  },
  // ======身高
  heightNames: function (e) {
    this.setData({
       height_index: e.detail.value
    })
  },
  // ======体重
  weightNames: function (e) {
    this.setData({
      weight_index: e.detail.value
    })
  },
  // ======学历
 educationNames: function (e) {
    this.setData({
     education_index: e.detail.value
    })
  },
  // ======购房
  homeNames: function (e) {
    this.setData({
      home_index: e.detail.value
    })
  },
  // ======购车
  carNames: function (e) {
    this.setData({
      car_index: e.detail.value
    })
  },
  // ======婚姻
  marriageNames: function (e) {
    this.setData({
      marriage_index: e.detail.value
    })
  },
  // ======有无小孩
  childNames: function (e) {
    this.setData({
      child_index: e.detail.value
    })
  },
  // ======收入
  moneysNames: function (e) {
    this.setData({
      moneys_index: e.detail.value
    })
  },
  // ======抽烟
  smokingNames: function (e) {
    this.setData({
      smoking_index: e.detail.value
    })
  },
  // ======喝酒
  drinkNames: function (e) {
    this.setData({
      drink_index: e.detail.value
    })
  },
  // ======结婚
  marryDateNames: function (e) {
    this.setData({
      marryDate_index: e.detail.value
    })
  },
  // ====选择出生年月
  DateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // ====选择省市区
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
// =================================择偶条件设置
  // ======身高
  heightsNames: function (e) {
    this.setData({
      heights_index: e.detail.value
    })
  },
  // ======体重
  weightsNames: function (e) {
    this.setData({
      weights_index: e.detail.value
    })
  },
  // ======学历
  educationsNames: function (e) {
    this.setData({
      educations_index: e.detail.value
    })
  },
  // ====选择省市区
  bindRegionChanges: function (e) {
    this.setData({
      regions: e.detail.value
    })
  },
  // ======购房
  homesNames: function (e) {
    this.setData({
      homes_index: e.detail.value
    })
  },
  // ======购车
  carsNames: function (e) {
    this.setData({
      cars_index: e.detail.value
    })
  },
  // ======婚姻
  marriagesNames: function (e) {
    this.setData({
      marriages_index: e.detail.value
    })
  },
  // ======有无小孩
  childsNames: function (e) {
    this.setData({
      childs_index: e.detail.value
    })
  },
  // ======收入
  moneyssNames: function (e) {
    this.setData({
      moneyss_index: e.detail.value
    })
  },
  // ======抽烟
  smokingsNames: function (e) {
    this.setData({
      smokings_index: e.detail.value
    })
  },
  // ======喝酒
  drinksNames: function (e) {
    this.setData({
      drinks_index: e.detail.value
    })
  },
// =======================================标签选择
  tagName: function (e) {
    var index = e.currentTarget.dataset.index;
    var tag = this.data.tag;
    var checked = this.data.checked;
    tag[index].choose = !tag[index].choose;
    var n=0;
    if (tag[index].choose) {
      if (checked.length<5){
        checked.push(tag[index].name)
      }else{
        tag[index].choose=false;
        wx.showModal({
          title: '最多选择5个标签'
        })
      }
    } else {
      for (var i = 0; i < checked.length; i++) {
        if (checked[i] == tag[index].name) {
          checked.splice(i, 1)
        }
      }
    }
    this.setData({
      tag: tag,
      checked: checked
    })
  },
// =======================================休假情况
  xiuName:function(e){
    var index = e.currentTarget.dataset.index;
    var jia_tag = this.data.jia_tag;
    var jia_checked = this.data.jia_checked;
    jia_tag[index].choose = !jia_tag[index].choose;
    if (jia_tag[index].choose) {
        jia_checked.push(jia_tag[index].week)
    } else {
      for (var i = 0; i < jia_checked.length; i++) {
        if (jia_checked[i] == jia_tag[index].week) {
          jia_checked.splice(i, 1)
        }
      }
    }
    this.setData({
      jia_tag: jia_tag,
      jia_checked: jia_checked
    })
  },
// ========================================保存信息
  formSubmit:function(e){
    var types = this.data.types;
    var region = this.data.region; // 地区选择
    var regions = this.data.regions; // 地区选择
    var checked = this.data.checked; //性格选择标签
    var jia_checked = this.data.jia_checked; //休假选择标签
    var date=this.data.date; //出生年月
    var sex_index = this.data.sex_index;//性别
    var height_index = this.data.height_index;
    var heights_index = this.data.heights_index;
    var weight_index = this.data.weight_index;
    var weights_index = this.data.weights_index;
    var education_index = this.data.education_index;
    var educations_index = this.data.educations_index;
    var home_index = this.data.home_index;
    var car_index = this.data.car_index;
    var marriage_index = this.data.marriage_index;
    var child_index = this.data.child_index;
    var moneys_index = this.data.moneys_index;
    var homes_index = this.data.homes_index;
    var cars_index = this.data.cars_index;
    var marriages_index = this.data.marriages_index;
    var childs_index = this.data.childs_index;
    var moneyss_index = this.data.moneyss_index;
    var smoking_index = this.data.smoking_index;
    var drink_index = this.data.drink_index;
    var smokings_index = this.data.smokings_index;
    var drinks_index = this.data.drinks_index;
    var marryDate_index = this.data.marryDate_index;
    var that=this;
    if(types==1){
      if (e.detail.value.name == "") {
        wx.showModal({
          title: '请填写您的真实姓名'
        })
      } else if (e.detail.value.phone == "") {
        wx.showModal({
          title: '请填写您的电话'
        })
      }else if (e.detail.value.nickname == "") {
        wx.showModal({
          title: '请填写您的昵称'
        })
      } else if (date == '选择') {
        wx.showModal({
          title: '请选择出生年月'
        })
      } else if (sex_index == 0) {
        wx.showModal({
          title: '请选择性别'
        })
      } else if (height_index == 0) {
        wx.showModal({
          title: '请选择身高'
        })
      } else if (weight_index == 0) {
        wx.showModal({
          title: '请选择体重'
        })
      } else if (education_index == 0) {
        wx.showModal({
          title: '请选择学历'
        })
      } else if (home_index == 0) {
        wx.showModal({
          title: '请选择买房情况'
        })
      } else if (car_index == 0) {
        wx.showModal({
          title: '请选择买车情况'
        })
      } else if (marriage_index == 0) {
        wx.showModal({
          title: '请选择婚姻状况'
        })
      } else if (child_index == 0) {
        wx.showModal({
          title: '请选择有无小孩'
        })
      } else if (moneys_index == 0) {
        wx.showModal({
          title: '请选择月收入'
        })
      } else if (smoking_index == 0) {
        wx.showModal({
          title: '请选择是否抽烟'
        })
      } else if (drink_index == 0) {
        wx.showModal({
          title: '请选择是否喝酒'
        })
      } else if (marryDate_index == 0) {
        wx.showModal({
          title: '请选择何时结婚'
        })
      } else if (region == ['选择省', '选择市', '选择区']) {
        wx.showModal({
          title: '请选择工作地区'
        })
      } else if (e.detail.value.jobs == "") {
        wx.showModal({
          title: '请填写您的职业'
        })
      } else if (e.detail.value.place == "") {
        wx.showModal({
          title: '请填写您的籍贯'
        })
      } else if (e.detail.value.addresss == "") {
        wx.showModal({
          title: '请填写您的详细地址'
        })
      }else{
        wx.login({
          success: function (ress) {
            if (ress.code) {
              wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/ji_cun',
                data: { code: ress.code, name: e.detail.value.name, phone: e.detail.value.phone,id_card: e.detail.value.idCard, nick_name: e.detail.value.nickname, age: date, sex: sex_index, heights: height_index, weights: weight_index, education: education_index, jobs: e.detail.value.jobs, place: e.detail.value.place, province: region[0], city: region[1], area: region[2], address: e.detail.value.addresss, home: home_index, car: car_index, marriage: marriage_index, child: child_index, moneys: moneys_index, smoking: smoking_index, drinking: drink_index, marry_date: marryDate_index, form_id: e.detail.formId},
                method: "GET",
                success: function (res) {
                  if(res.data.info==1){
                    wx.showToast({
                      title: '保存成功',
                    })
                    that.setData({
                      mask:0,
                      ji:res.data.ji
                    })
                  } 
                  if (res.data.info == 3) {
                    wx.showModal({
                      title: '请填写正确的电话',
                    })
                  }
                }
              })
            }
          }
        })
      }
    } else if (types == 2){
     if (heights_index == 0) {
        wx.showModal({
          title: '请选择身高'
        })
      } else if (weights_index == 0) {
        wx.showModal({
          title: '请选择体重'
        })
      } else if (educations_index == 0) {
        wx.showModal({
          title: '请选择学历'
        })
     } else if (regions == ['选择省', '选择市', '选择区']) {
       wx.showModal({
         title: '请选择工作地区'
       })
     }else if (homes_index == 0) {
        wx.showModal({
          title: '请选择买房情况'
        })
      } else if (cars_index == 0) {
        wx.showModal({
          title: '请选择买车情况'
        })
      } else if (marriages_index == 0) {
        wx.showModal({
          title: '请选择婚姻状况'
        })
      } else if (childs_index == 0) {
        wx.showModal({
          title: '请选择有无小孩'
        })
      } else if (moneyss_index == 0) {
        wx.showModal({
          title: '请选择月收入'
        })
      } else if (smokings_index == 0) {
        wx.showModal({
          title: '请选择是否抽烟'
        })
      } else if (drinks_index == 0) {
        wx.showModal({
          title: '请选择是否喝酒'
        })
      } else if (e.detail.value.address == "") {
        wx.showModal({
          title: '请填写您的详细地址'
        })
      }else{
       wx.login({
         success: function (ress) {
           if (ress.code) {
             wx.request({
               url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/ze_cun',
               data: { code: ress.code, heights: heights_index, weights: weights_index, education: educations_index, province: region[0], city: region[1], area: region[2], address: e.detail.value.address, home: homes_index, car: cars_index, marriage: marriages_index, child: childs_index, moneys: moneyss_index, smoking: smokings_index, drinking: drinks_index, form_id: e.detail.formId },
               method: "GET",
               success: function (res) {
                 if (res.data.info == 1) {
                   wx.showToast({
                     title: '保存成功',
                   })
                   that.setData({
                     mask: 0,
                     ze:res.data.ze
                   })
                 }
               }
             })
           }
         }
       })
      }
    } else if(types==3){
      if (e.detail.value.qq==''){
        wx.showModal({
          title: '请填写您的qq号'
        })
      } else if (e.detail.value.wechat == '') {
        wx.showModal({
          title: '请填写您的微信号'
        })
      }else{
        wx.login({
          success:function(ress){
            if(ress.code){
              wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/qq_wechat',
                data: { code: ress.code, form_id: e.detail.formId, qq: e.detail.value.qq, wechat: e.detail.value.wechat},
                method:"GET",
                success:function(res){
                 if(res.data.info==1){
                   wx.showToast({
                     title: '保存成功',
                   })
                   that.setData({
                     mask: 0,
                     qq_wechat:res.data.qq_wechat
                   })
                 }
                }
              })
            }
          }
        })
      }
    } else if(types==4){
      wx.login({
        success:function(ress){
          if(ress.code){
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/tags',
              data: { code: ress.code, form_id: e.detail.formId, tags: checked},
              method:"GET",
              success:function(res){
                if(res.data==1){
                  wx.showToast({
                    title: '保存成功',
                  })
                  that.setData({
                    mask: 0,
                    xing: 0 //判断外边是否完善信息
                  })
                }
              }
            })
          }
        }
      })
    } else if (types == 5) {
      wx.login({
        success: function (ress) {
          if (ress.code) {
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/vacation',
              data: { code: ress.code, form_id: e.detail.formId, vacation: jia_checked },
              method: "GET",
              success: function (res) {
                if (res.data == 1) {
                  wx.showToast({
                    title: '保存成功',
                  })
                  that.setData({
                    mask: 0,
                    xiuJia:0  //判断外边是否完善信息
                  })
                }
              }
            })
          }
        }
      })
    }
  },
// ==========外边保存信息
  baoName:function(){
    var that=this;
    var avater=that.data.avater;
    var img_one = that.data.img_one;
    var img_two = that.data.img_two;
    var img_three = that.data.img_three;
    var img_four = that.data.img_four;
    var video=that.data.video;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/avatar_img',
            data: { code: ress.code, avatar: avater, img_one: img_one, img_two: img_two, img_three: img_three, img_four: img_four,vedio:video},
            method:"GET",
            success:function(res){
              if(res.data==1){
               wx.showToast({
                 title: '保存成功',
               })
               that.setData({
                 cun:1,
                 video_cun:1
               })
              }else if(res.data==2){
                wx.showModal({
                  title: '保存失败'
                })
              }
            }
          })
        }
      }
    })
  },
  onPullDownRefresh:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/zi_she',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
              wx.hideLoading();
              if (res.data.ji != 1) {
                that.setData({
                  ji: res.data.ji,
                  region: [res.data.ji.province, res.data.ji.city, res.data.ji.area],
                  date: res.data.ji.age,
                  sex_index: res.data.ji.sex,
                  height_index: res.data.ji.heights,
                  weight_index: res.data.ji.weights,
                  education_index: res.data.ji.education,
                  home_index: res.data.ji.home,
                  car_index: res.data.ji.car,
                  marriage_index: res.data.ji.marriage,
                  child_index: res.data.ji.child,
                  moneys_index: res.data.ji.moneys,
                  smoking_index: res.data.ji.smoking,
                  drink_index: res.data.ji.drinking,
                  marryDate_index: res.data.ji.marry_date
                })
              } else {
                that.setData({
                  ji: res.data.ji
                })
              }
              if (res.data.ze != 1) {
                that.setData({
                  ze: res.data.ze,
                  regions: [res.data.ze.province, res.data.ze.city, res.data.ze.area],
                  heights_index: res.data.ze.heights,
                  weights_index: res.data.ze.weights,
                  educations_index: res.data.ze.education,
                  homes_index: res.data.ze.home,
                  cars_index: res.data.ze.car,
                  marriages_index: res.data.ze.marriage,
                  childs_index: res.data.ze.child,
                  moneyss_index: res.data.ze.moneys,
                  smokings_index: res.data.ze.smoking,
                  drinks_index: res.data.ze.drinking
                })
              } else {
                that.setData({
                  ze: res.data.ze
                })
              }
              if (res.data.qq_wechat != 1) {
                that.setData({
                  qq_wechat: res.data.qq_wechat
                })
              }
              if (res.data.info.avatar != 1) {
                that.setData({
                  headimgurl_tempFilePaths: res.data.info.avatar,
                  headimgurl: 1,
                  cun: 1
                })
              }
              if (res.data.info.img_one != 1) {
                that.setData({
                  album1_tempFilePaths: res.data.info.img_one,
                  album1: 1,
                  cun: 1
                })
              }
              if (res.data.info.img_two != 1) {
                that.setData({
                  album2_tempFilePaths: res.data.info.img_two,
                  album2: 1,
                  cun: 1
                })
              }
              if (res.data.info.img_three != 1) {
                that.setData({
                  album3_tempFilePaths: res.data.info.img_three,
                  album3: 1,
                  cun: 1
                })
              }
              if (res.data.info.img_four != 1) {
                that.setData({
                  album4_tempFilePaths: res.data.info.img_four,
                  album4: 1,
                  cun: 1
                })
              }
              if (res.data.info.vedio != 1) {
                that.setData({
                  video_cun: 1
                })
              }
              that.setData({
                sex: res.data.arr.sex,
                height: res.data.arr.heights,
                weight: res.data.arr.weights,
                education: res.data.arr.education,
                home: res.data.arr.home,
                car: res.data.arr.car,
                marriage: res.data.arr.marriage,
                child: res.data.arr.child,
                moneys: res.data.arr.moneys,
                smoking: res.data.arr.smoking,
                drink: res.data.arr.drinking,
                smokings: res.data.arr.smokings,
                drinks: res.data.arr.drinkings,
                marryDate: res.data.arr.marry_date,
                tag: res.data.arr.tags,
                jia_tag: res.data.arr.week,
                xing: res.data.tags,
                qq_wechat: res.data.qq_wechat,
                xiuJia: res.data.vacation,
                bg: res.data.info.back_img,
                video_url: res.data.info.vedio
              })
            },
            complete:function(){
              wx.stopPullDownRefresh()
            }
          })
        }
      }
    })  
  }
})