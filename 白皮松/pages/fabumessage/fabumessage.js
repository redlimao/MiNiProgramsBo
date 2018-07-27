// pages/miss/miss.js
Page({

  data: {
      grade: ['请选择树木级别','1级','2级','3级'],
      high: ['请选择树高', '树苗', '1米以下', '1米到2米', '2米到3米', '3米以上'],
      index:0,
      h_index:0,
      check_flag : 1,
      img1:'../../images/onload_bg1.png',
      img2:'../../images/onload_bg2.png',
      img3: '../../images/onload_bg2.png',
      tags:'',
      data_img:0,
      data_imgs: 0,
      data_banner:0,
      user_id:''
  },
  onLoad: function (options) {
      var that = this;
      var app = getApp();
      var id = app.requestshop_id;
      var user_id = app.requsetId;
      this.setData({
          user_id : user_id
      })
    
    wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/ren',
        method:'GET',
        data:{id:id,user_id:that.data.user_id},
        success:function(res){
            console.log(res);   
            that.setData({
                tags: res.data.tags,
                img1: res.data.goods.banner,
                img2: res.data.goods.img,
                img3: res.data.goods.imgs,
                index:res.data.goods.ji_bie,
                title: res.data.goods.name,
                phone: res.data.goods.phone,
                money: res.data.goods.moneys,
                nums: res.data.goods.nums,
                intro: res.data.goods.intro,
                title: res.data.goods.name,
                hui:res.data.hui
            })

            if(res.data.hui == 1){
                wx.showModal({
                    title: '提示',
                    content: '您目前不是会员，请前往会员页面充值。',
                    success: function (res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: '../member/member',
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            } else if (res.data.hui == 2){
                
            }else{
                wx.showModal({
                    title: '提示',
                    content: '您的会员已到期，请前往会员页面续费。',
                    success: function (res) {
                        if (res.confirm) {
                            var id = that.data.user_id;
                            wx.navigateTo({
                                url: '../member/member?id=' + id,
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })               
            }
        }

    })
  },
  bindChossimg1:function(e){
      var that = this;
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              that.setData({
                  img1: tempFilePaths
              })
              wx.uploadFile({
                  url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/zi_zhi',
                  filePath: tempFilePaths[0],
                  formData: {
                      'banner': that.data.data_banner
                  },
                  name: 'one',
                  success: function (res) {
                    //   console.log(res);
                      that.setData({
                          data_banner: res.data.replace(/\s+/g, "")
                      })
                  }
              })
          }
      })
  },
  bindChossimg2: function (e) {
      var that = this;
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              that.setData({
                  img2: tempFilePaths
              })
              wx.uploadFile({
                  url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/zi_zhi', //仅为示例，非真实的接口地址
                  filePath: tempFilePaths[0],
                  formData: {
                      'img': that.data.data_img
                  },
                  name: 'two',
                  success: function (res) {
                      that.setData({
                          data_img: res.data.replace(/\s+/g, "")
                      })
                  }
              })
          }
      })
  },
  bindChossimg3: function (e) {
      var that = this;
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              that.setData({
                  img3: tempFilePaths
              })
              wx.uploadFile({
                  url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/zi_zhi', //仅为示例，非真实的接口地址
                  filePath: tempFilePaths[0],
                  formData: {
                      'imgs': that.data.data_imgs
                  },
                  name: 'three',
                  success: function (res) {
                      that.setData({
                          data_imgs: res.data.replace(/\s+/g, "")
                      })
                  }
              })
          }
      })
  },
  //选择树木的级别
  bindPickerChange:function(e){
      this.setData({
          index: e.detail.value
      })
  },
  bindHighChange:function(e){
      this.setData({
          h_index: e.detail.value
      })
  },
//   选择标签
    bindTag:function(e){
        // console.log(e)
        var tags = this.data.tags;
        // var label = this.data.label;
        // var name = e.currentTarget.dataset.name;
        var index = e.currentTarget.dataset.id;
        var pan = this.data.tags[index].pan;

        if(pan == 1){
            this.data.tags[index].pan = 2;
        }else{
            this.data.tags[index].pan = 1;
            
        }
        this.setData({
            tags:tags
        })

    },
  formSubmit: function (e) {
      var app = getApp();
      var id = app.requestshop_id;
    var that = this;
    var tags = this.data.tags;
    
    var label = [];
    for(var i = 0;i < tags.length;i++){
        if(tags[i].pan == 2){
            label.push(tags[i].name);
        }
    }
    console.log(that.data.data_banner, that.data.data_img, that.data.data_imgs)
    wx.login({
        success:function(ress){
            if(ress.code){
                wx.request({
                    url: 'https://www.bozhiyingxiao.com/little_program/store_trees/index.php?s=/Little/Center/zizhi',
                    data: { code: ress.code, name: e.detail.value.title, moneys: e.detail.value.money, nums: e.detail.value.nums, tags: label, ji_bie: that.data.index,heights:that.data.h_index,banner: that.data.data_banner, img: that.data.data_img, imgs: that.data.data_imgs,phone: e.detail.value.phone, intro: e.detail.value.area, id:id},
                    method: 'GET',
                    success: function (res) {
                        console.log(res)
                        if (res.data == 1) {
                            wx.showModal({
                                title: '电话有误'
                            })
                        } else if (res.data == 2) {
                            wx.showToast({
                                title: '信息不完整'
                            })
                        }else if (res.data == 3) {
                            wx.showToast({
                                title: '提交成功',
                                success:function(){
                                    wx.navigateBack({
                                        delta: 2
                                    })
                                }
                            })
                        } else if (res.data == 4) {
                            wx.showToast({
                                title: '提交失败'
                            })
                        } else if (res.data == 5) {
                            wx.showToast({
                                title: '修改成功',
                                success: function () {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }
                            })
                        } else if (res.data == 6) {
                            wx.showToast({
                                title: '修改失败'
                            })
                        }
                    }
                })
            }
        }
    })

  }
})