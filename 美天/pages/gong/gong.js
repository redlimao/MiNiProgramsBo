Page({
    data: {
        pop_index:0,
        img_index:0,
        flag_txt:2,
        empty:0,
        n: 1,
        qing: 0
    },
  onLoad: function (options) {
    if (options.scene) {
        var sence = decodeURIComponent(options.scene);
    } else {
        var sence = 0;
    }
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
        success:function(ress){
            if(ress.code){
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
                            url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Company/index',
                            data: { sence: sence, code: ress.code, img: avatarUrl, sex: gender, name: nickName, city: city, pro: province, cou: country},
                            method: "GET",
                            success: function (res){
                                console.log(res);
                                that.setData({
                                    banner: res.data.info.lun,
                                    address: res.data.info.company,
                                    
                                })
                                if (res.data.news == 1){
                                    that.setData({
                                        empty : 1
                                    })
                                }else{
                                    that.setData({
                                        info: res.data.news,
                                        empty: 0
                                    })
                                }
                            },
                            complete: function (){
                                wx.hideLoading()
                            }
                        })
                    }
                })
            }
        }
    })
  },
  //==查看原图
  yuanName: function (e) {
      this.setData({
          flag: 1,
          pop_index: e.currentTarget.dataset.index,
          img_index:e.currentTarget.dataset.id
      })
      console.log(e.currentTarget.dataset.index, e.currentTarget.dataset.id)
  },
  //==回复原图
  huiName: function () {
      this.setData({
          flag: 0
      })
  },
  telName: function (e) {
    var tel = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
  mapName: function (e) {
    var wei = Number(e.currentTarget.dataset.wei);
    var jing = Number(e.currentTarget.dataset.jing);
    wx.openLocation({
      latitude: wei,
      longitude: jing,
      scale: 28
    })
  },
    bindMore:function(){
        if (this.data.flag_txt == 1){
            this.setData({ 
                flag_txt : 2
            })
        }else{
            this.setData({ 
                flag_txt: 1 
            })
        }
    },
    guangName:function(e){
        var info_id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../texts/texts?id=' + info_id,
        })
    },
   
    onPullDownRefresh:function(){
        var that = this;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Company/index',
            data: {},
            method: "GET",
            success: function (res) {
                console.log(res);
                that.setData({
                    banner: res.data.lun,
                    address: res.data.company
                })
            },
            complete: function () {
                wx.stopPullDownRefresh();
            }
        })       
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Company/information',
            data: {},
            method: "GET",
            success: function (res) {
                console.log(res);
                that.setData({
                    info: res.data.data
                })
            },
            complete: function () {
                wx.hideLoading()
            }
        }) 
    },
    //=============上拉加载
    onReachBottom: function () {
        wx.showLoading({
            title: '加载中',
        })
        var that = this;
        var n = this.data.n;
        var qing = this.data.qing;
        var list = this.data.info
        n++;
        this.setData({
            n: n
        })
        // ==========获取列表信息
        if (qing == 0) {
            wx.showLoading({
                title: '加载中',
            })
            wx.request({
                url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Company/la',
                data: { currpage: n,},
                method: "GET",
                success: function (res) {
                    console.log(res, n)
                    if (res.data.info == 1) {
                        that.setData({
                            qing: 1
                        })
                        wx.hideLoading();
                        wx.showToast({
                            title: '已无更多数据',
                        })
                    } else {
                        for (var i = 0; i < res.data.info.length; i++) {
                            list.push(res.data.info[i])

                        }
                        that.setData({
                            info: list
                        })
                        wx.hideLoading();
                    }
                },
                complete: function (res) {

                }
            })
        } else {
            wx.hideLoading();
            wx.showToast({
                title: '已无更多数据',
            })
        }
    },
    // ========分享
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮

        }
        return {
            title: '陕西美天包装',
            path: '/pages/gong/gong',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})