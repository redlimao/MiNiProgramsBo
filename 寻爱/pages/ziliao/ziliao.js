// pages/ziliao/ziliao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:1 ,  // 1男 2女,
    flower_num:1,
    flower_flag: false,
    big:false,
    video_flag: false,
    current:0 //大图的下标
  },

  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id:id
    })
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index_info',
            data:{code:ress.code,id:id},
            method:"GET",
            success:function(res){
              console.log(res)
              wx.hideLoading();
              that.setData({
                message:res.data.ji[0],
                bg:res.data.back_img,
                cha:res.data.cha,
                guan:res.data.guan_zhu,
                tags:res.data.tags,
                ze:res.data.ze,
                nums:res.data.cha_nums,
                flower_moneys: res.data.flower_moneys,
                duo:res.data.flowers,
                video_url:res.data.ji[0].vedio
              })
            }
          })
        }
      }
    })
  },
  // =======返回上一级
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // ========开通会员
  openVip:function(){
    var vip=this.data.vip;
    var id=this.data.id;
    var nums=this.data.nums;
    var cha=this.data.cha;
    var that=this;
    wx.showModal({
      title: '您将消耗一次查看好友资料的机会',
      success:function(res){
        if(res.confirm){
          if (nums == 10 && cha == 2) {
            wx.showModal({
              title: '还剩10次查询机会',
              success: function (res) {
                if (res.confirm) {
                  wx.login({
                    success: function (ress) {
                      if (ress.code) {
                        wx.request({
                          url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index_vip',
                          data: { code: ress.code, cha_id: id },
                          method: "GET",
                          success: function (res) {
                            that.setData({
                              cha: res.data.cha
                            })
                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          } else if (nums == 5 && cha == 2) {
            wx.showModal({
              title: '还剩5次查询机会',
              success: function (res) {
                if (res.confirm) {
                  wx.login({
                    success: function (ress) {
                      if (ress.code) {
                        wx.request({
                          url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index_vip',
                          data: { code: ress.code, cha_id: id },
                          method: "GET",
                          success: function (res) {
                            that.setData({
                              cha: res.data.cha
                            })
                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          } else if (nums < 5 && nums > 0 && cha == 2) {
            wx.showModal({
              title: '还剩' + nums + '次查询机会',
              success: function (res) {
                if (res.confirm) {
                  wx.login({
                    success: function (ress) {
                      if (ress.code) {
                        wx.request({
                          url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index_vip',
                          data: { code: ress.code, cha_id: id },
                          method: "GET",
                          success: function (res) {
                            if (res.data.cha == 1) {
                              that.setData({
                                cha: res.data.cha
                              })

                            } else if (res.data.cha == 2) {
                              wx.showModal({
                                title: '您还不是vip用户',
                                success: function (res) {
                                  if (res.confirm) {
                                    wx.switchTab({
                                      url: '../vip/vip',
                                    })
                                  }
                                }
                              })
                            } else if (res.data.cha == 3) {
                              wx.showModal({
                                title: '您的vip账户可查看次数为0',
                                success: function (res) {
                                  if (res.confirm) {
                                    wx.switchTab({
                                      url: '../vip/vip',
                                    })
                                  }
                                }
                              })
                            } else if (res.data.cha == 4) {
                              wx.showModal({
                                title: '您的资料未完善，去完善信息',
                                success: function (res) {
                                  if (res.confirm) {
                                    wx.navigateTo({
                                      url: '../message/message',
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
                }
              }
            })
          } else if (nums == 0 && cha == 2) {
            wx.login({
              success: function (ress) {
                if (ress.code) {
                  wx.request({
                    url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index_vip',
                    data: { code: ress.code, cha_id: id },
                    method: "GET",
                    success: function (res) {
                      if (res.data.cha == 1) {
                        that.setData({
                          cha: res.data.cha
                        })

                      } else if (res.data.cha == 2) {
                        wx.showModal({
                          title: '您还不是vip用户',
                          success: function (res) {
                            if (res.confirm) {
                              wx.switchTab({
                                url: '../vip/vip',
                              })
                            }
                          }
                        })
                      } else if (res.data.cha == 3) {
                        wx.showModal({
                          title: '您的vip账户可查看次数为0',
                          success: function (res) {
                            if (res.confirm) {
                              wx.switchTab({
                                url: '../vip/vip',
                              })
                            }
                          }
                        })
                      } else if (res.data.cha == 4) {
                        wx.showModal({
                          title: '您的资料未完善，去完善信息',
                          success: function (res) {
                            if (res.confirm) {
                              wx.navigateTo({
                                url: '../message/message',
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
          } else {
            wx.login({
              success: function (ress) {
                if (ress.code) {
                  wx.request({
                    url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index_vip',
                    data: { code: ress.code, cha_id: id },
                    method: "GET",
                    success: function (res) {
                      if (res.data.cha == 1) {
                        that.setData({
                          cha: res.data.cha
                        })
                      } else if (res.data.cha == 2) {
                        wx.showModal({
                          title: '您还不是vip用户',
                          success: function (res) {
                            if (res.confirm) {
                              wx.switchTab({
                                url: '../vip/vip',
                              })
                            }
                          }
                        })
                      } else if (res.data.cha == 3) {
                        wx.showModal({
                          title: '您的vip账户可查看次数为0',
                          success: function (res) {
                            if (res.confirm) {
                              wx.switchTab({
                                url: '../vip/vip',
                              })
                            }
                          }
                        })
                      } else if (res.data.cha == 4) {
                        wx.showModal({
                          title: '您的资料未完善，去完善信息',
                          success: function (res) {
                            if (res.confirm) {
                              wx.navigateTo({
                                url: '../message/message',
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
          }
        }
      }
    })
  },
  // ========关注
  guanName:function(){
    var id = this.data.id;
    var that = this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Collect/index',
            data: { code:ress.code,id:id },
            method: "GET",
            success: function (res) {
              if(res.data==2){
                wx.showToast({
                  title: '关注成功',
                })
                that.setData({
                  guan:1
                })
              }
              if (res.data == 1) {
                wx.showToast({
                  title: '取消关注',
                })
                that.setData({
                  guan:2
                })
              }
            }
          })
        }
      }
    })
  },
  // =======视频查看
  videoName:function(){
    var id = this.data.id;
    var nums = this.data.nums;
    var cha = this.data.cha;
    var that = this;
    if(cha!=1){
      wx.showModal({
        title: '您将消耗一次查看好友资料的机会',
        success: function (res) {
          if (res.confirm) {
            if (nums == 10 && cha == 2) {
              wx.showModal({
                title: '还剩10次查询机会',
                success: function (res) {
                  if (res.confirm) {
                    wx.login({
                      success: function (ress) {
                        if (ress.code) {
                          wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index_vip',
                            data: { code: ress.code, cha_id: id },
                            method: "GET",
                            success: function (res) {
                              that.setData({
                                video_flag: true,
                                cha:res.data.cha
                              })
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            } else if (nums == 5 && cha == 2) {
              wx.showModal({
                title: '还剩5次查询机会',
                success: function (res) {
                  if (res.confirm) {
                    wx.login({
                      success: function (ress) {
                        if (ress.code) {
                          wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index_vip',
                            data: { code: ress.code, cha_id: id },
                            method: "GET",
                            success: function (res) {
                              that.setData({
                                video_flag: true,
                                cha: res.data.cha
                              })
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            } else if (nums < 5 && nums > 0 && cha == 2) {
              wx.showModal({
                title: '还剩' + nums + '次查询机会',
                success: function (res) {
                  if (res.confirm) {
                    wx.login({
                      success: function (ress) {
                        if (ress.code) {
                          wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index_vip',
                            data: { code: ress.code, cha_id: id },
                            method: "GET",
                            success: function (res) {
                              if (res.data.cha == 1) {
                                that.setData({
                                  video_flag: true,
                                  cha:res.data.cha
                                })

                              } else if (res.data.cha == 2) {
                                wx.showModal({
                                  title: '您还不是vip用户',
                                  success: function (res) {
                                    if (res.confirm) {
                                      wx.switchTab({
                                        url: '../vip/vip',
                                      })
                                    }
                                  }
                                })
                              } else if (res.data.cha == 3) {
                                wx.showModal({
                                  title: '您的vip账户可查看次数为0',
                                  success: function (res) {
                                    if (res.confirm) {
                                      wx.switchTab({
                                        url: '../vip/vip',
                                      })
                                    }
                                  }
                                })
                              } else if (res.data.cha == 4) {
                                wx.showModal({
                                  title: '您的资料未完善，去完善信息',
                                  success: function (res) {
                                    if (res.confirm) {
                                      wx.navigateTo({
                                        url: '../message/message',
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
                  }
                }
              })
            } else if (nums == 0 && cha == 2) {
              wx.login({
                success: function (ress) {
                  if (ress.code) {
                    wx.request({
                      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index_vip',
                      data: { code: ress.code, cha_id: id },
                      method: "GET",
                      success: function (res) {
                        if (res.data.cha == 1) {
                          that.setData({
                            video_flag: true,
                            cha:res.data.cha
                          })

                        } else if (res.data.cha == 2) {
                          wx.showModal({
                            title: '您还不是vip用户',
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  url: '../vip/vip',
                                })
                              }
                            }
                          })
                        } else if (res.data.cha == 3) {
                          wx.showModal({
                            title: '您的vip账户可查看次数为0',
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  url: '../vip/vip',
                                })
                              }
                            }
                          })
                        } else if (res.data.cha == 4) {
                          wx.showModal({
                            title: '您的资料未完善，去完善信息',
                            success: function (res) {
                              if (res.confirm) {
                                wx.navigateTo({
                                  url: '../message/message',
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
            } else {
              wx.login({
                success: function (ress) {
                  if (ress.code) {
                    wx.request({
                      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/index_vip',
                      data: { code: ress.code, cha_id: id },
                      method: "GET",
                      success: function (res) {
                        if (res.data.cha == 1) {
                          that.setData({
                            video_flag: true,
                            cha:res.data.cha
                          })

                        } else if (res.data.cha == 2) {
                          wx.showModal({
                            title: '您还不是vip用户',
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  url: '../vip/vip',
                                })
                              }
                            }
                          })
                        } else if (res.data.cha == 3) {
                          wx.showModal({
                            title: '您的vip账户可查看次数为0',
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  url: '../vip/vip',
                                })
                              }
                            }
                          })
                        } else if (res.data.cha == 4) {
                          wx.showModal({
                            title: '您的资料未完善，去完善信息',
                            success: function (res) {
                              if (res.confirm) {
                                wx.navigateTo({
                                  url: '../message/message',
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
            }
          }
        }
      })
    }
  },
  videoNames:function(){
    this.setData({
      video_flag: true
    })
  },
  // ========视频关闭
  videoClose: function () {
    this.setData({
      video_flag: false
    })
  },
  // ==========================送花
  songName:function(){
    this.setData({
      flower_flag: true
    })
  },
  // =花朵变化
  inpName:function(e){
    this.setData({
      flower_num:e.detail.value
    })
  },
  // 减
  jianName:function(){
    var flower_num=this.data.flower_num;
    flower_num--
    if (flower_num<=1){
      flower_num=1
    }
    this.setData({
      flower_num: flower_num
    })
  },
  // 加
  jiaName: function () {
    var flower_num = this.data.flower_num;
    flower_num++
    this.setData({
      flower_num: flower_num
    })
  },
  // =关闭弹窗
  closeFlower:function(){
    this.setData({
      flower_flag:false
    })
  },
  // =支付
  formSubmits:function(e){
    var flower_num = this.data.flower_num;
    var flower_moneys = this.data.flower_moneys;
    var moneys = Number(flower_num) * Number(flower_moneys);
    var id = this.data.id;
    var that=this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/pay/example/jsapi.php',
            data: { code: ress.code, total_fee: moneys, title: '送花' },
            method: 'GET',
            success: function (res) {
              wx.requestPayment({
                'timeStamp': res.data.pay.timeStamp,
                'nonceStr': res.data.pay.nonceStr,
                'package': res.data.pay.package,
                'signType': 'MD5',
                'paySign': res.data.pay.paySign,
                'success': function (ress) {
                  wx.showToast({
                    title: '支付成功',
                    success: function () {
                      that.setData({
                        flower_flag: false
                      })
                    }
                  })
                  wx.request({
                    url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/flowers',
                    data: { no: res.data.no, op: res.data.op, status: 1, moneys: moneys, nums: flower_num, bei_id: id},
                    method: 'GET',
                    success: function (res) {
                      that.setData({
                        duo:res.data.info
                      })
                    }
                  })
                },
                'fail': function (res) {
                },
                'complete': function (ress) {
                  if (ress.errMsg == "requestPayment:fail cancel") {
                    wx.request({
                      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Orders/flowers',
                      data: { no: res.data.no, op: res.data.op, status: 2, moneys: moneys, nums: flower_num, bei_id: id},
                      method: 'GET',
                      success: function (res) {
                        if(res.data==1){
                          that.setData({
                            flower_flag: false
                          })
                        }
                      }
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
  // ======================交换qq或微信号
  formSubmit:function(e){
    var id = this.data.id;
    var nums = this.data.nums;
    var cha=this.data.cha;
    var that = this;
    if(cha!=1){
      wx.showModal({
        title: '您将消耗一次查看好友资料的机会',
        success: function (res) {
          if (res.confirm) {
            if (nums == 10 && cha == 2) {
              wx.showModal({
                title: '还剩10次查询机会',
                success: function (res) {
                  if (res.confirm) {
                    wx.login({
                      success: function (ress) {
                        if (ress.code) {
                          wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/info_huan',
                            data: { code: ress.code, id: id, form_id: e.detail.formId },
                            method: "GET",
                            success: function (res) {
                              if (res.data.cha == 1) {
                                wx.showToast({
                                  title: '已发送请求',
                                })
                                that.setData({
                                  cha: res.data.cha
                                })

                              } else if (res.data.cha == 2) {
                                wx.showModal({
                                  title: '您还不是vip用户',
                                  success: function (res) {
                                    if (res.confirm) {
                                      wx.switchTab({
                                        url: '../vip/vip',
                                      })
                                    }
                                  }
                                })
                              } else if (res.data.cha == 3) {
                                wx.showModal({
                                  title: '您的vip账户可查看次数为0',
                                  success: function (res) {
                                    if (res.confirm) {
                                      wx.switchTab({
                                        url: '../vip/vip',
                                      })
                                    }
                                  }
                                })
                              } else if (res.data.cha == 4) {
                                wx.showModal({
                                  title: '您的资料未完善，去完善信息',
                                  success: function (res) {
                                    if (res.confirm) {
                                      wx.navigateTo({
                                        url: '../message/message',
                                      })
                                    }
                                  }
                                })
                              } else if (res.data.cha == 5) {
                                wx.showToast({
                                  title: '发送请求失败',
                                })
                              } else if (res.data.cha == 6) {
                                wx.showToast({
                                  title: '不能与自己交换微信、qq',
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
            } else if (nums == 5 && cha == 2) {
              wx.showModal({
                title: '还剩5次查询机会',
                success: function (res) {
                  if (res.confirm) {
                    wx.login({
                      success: function (ress) {
                        if (ress.code) {
                          wx.request({
                            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/info_huan',
                            data: { code: ress.code, id: id, form_id: e.detail.formId },
                            method: "GET",
                            success: function (res) {
                              if (res.data.cha == 1) {
                                wx.showToast({
                                  title: '已发送请求',
                                })
                                that.setData({
                                  cha: res.data.cha
                                })

                              } else if (res.data.cha == 2) {
                                wx.showModal({
                                  title: '您还不是vip用户',
                                  success: function (res) {
                                    if (res.confirm) {
                                      wx.switchTab({
                                        url: '../vip/vip',
                                      })
                                    }
                                  }
                                })
                              } else if (res.data.cha == 3) {
                                wx.showModal({
                                  title: '您的vip账户可查看次数为0',
                                  success: function (res) {
                                    if (res.confirm) {
                                      wx.switchTab({
                                        url: '../vip/vip',
                                      })
                                    }
                                  }
                                })
                              } else if (res.data.cha == 4) {
                                wx.showModal({
                                  title: '您的资料未完善，去完善信息',
                                  success: function (res) {
                                    if (res.confirm) {
                                      wx.navigateTo({
                                        url: '../message/message',
                                      })
                                    }
                                  }
                                })
                              } else if (res.data.cha == 5) {
                                wx.showToast({
                                  title: '发送请求失败',
                                })
                              } else if (res.data.cha == 6) {
                                wx.showToast({
                                  title: '不能与自己交换微信、qq',
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
            } else if (nums < 5 && nums > 0 && cha == 2) {
              wx.showModal({
                title: '还剩' + nums + '次查询机会',
                success: function (res) {
                  wx.login({
                    success: function (ress) {
                      if (ress.code) {
                        wx.request({
                          url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/info_huan',
                          data: { code: ress.code, id: id, form_id: e.detail.formId },
                          method: "GET",
                          success: function (res) {
                            if (res.data.cha == 1) {
                              wx.showToast({
                                title: '已发送请求',
                              })
                              that.setData({
                                cha: res.data.cha
                              })

                            } else if (res.data.cha == 2) {
                              wx.showModal({
                                title: '您还不是vip用户',
                                success: function (res) {
                                  if (res.confirm) {
                                    wx.switchTab({
                                      url: '../vip/vip',
                                    })
                                  }
                                }
                              })
                            } else if (res.data.cha == 3) {
                              wx.showModal({
                                title: '您的vip账户可查看次数为0',
                                success: function (res) {
                                  if (res.confirm) {
                                    wx.switchTab({
                                      url: '../vip/vip',
                                    })
                                  }
                                }
                              })
                            } else if (res.data.cha == 4) {
                              wx.showModal({
                                title: '您的资料未完善，去完善信息',
                                success: function (res) {
                                  if (res.confirm) {
                                    wx.navigateTo({
                                      url: '../message/message',
                                    })
                                  }
                                }
                              })
                            } else if (res.data.cha == 5) {
                              wx.showToast({
                                title: '发送请求失败',
                              })
                            } else if (res.data.cha == 6) {
                              wx.showToast({
                                title: '不能与自己交换微信、qq',
                              })
                            }
                          }
                        })
                      }
                    }
                  })
                }
              })
            } else if (nums == 0 && cha == 2) {
              wx.login({
                success: function (ress) {
                  if (ress.code) {
                    wx.request({
                      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/info_huan',
                      data: { code: ress.code, id: id, form_id: e.detail.formId },
                      method: "GET",
                      success: function (res) {
                        if (res.data.cha == 1) {
                          wx.showToast({
                            title: '已发送请求',
                          })
                          that.setData({
                            cha: res.data.cha
                          })

                        } else if (res.data.cha == 2) {
                          wx.showModal({
                            title: '您还不是vip用户',
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  url: '../vip/vip',
                                })
                              }
                            }
                          })
                        } else if (res.data.cha == 3) {
                          wx.showModal({
                            title: '您的vip账户可查看次数为0',
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  url: '../vip/vip',
                                })
                              }
                            }
                          })
                        } else if (res.data.cha == 4) {
                          wx.showModal({
                            title: '您的资料未完善，去完善信息',
                            success: function (res) {
                              if (res.confirm) {
                                wx.navigateTo({
                                  url: '../message/message',
                                })
                              }
                            }
                          })
                        } else if (res.data.cha == 5) {
                          wx.showToast({
                            title: '发送请求失败',
                          })
                        } else if (res.data.cha == 6) {
                          wx.showToast({
                            title: '不能与自己交换微信、qq',
                          })
                        }
                      }
                    })
                  }
                }
              })
            }  else if (cha == 2) {
              wx.login({
                success: function (ress) {
                  if (ress.code) {
                    wx.request({
                      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/info_huan',
                      data: { code: ress.code, id: id, form_id: e.detail.formId },
                      method: "GET",
                      success: function (res) {
                        if (res.data.cha == 1) {
                          wx.showToast({
                            title: '已发送请求',
                          })
                          that.setData({
                            cha: res.data.cha
                          })

                        } else if (res.data.cha == 2) {
                          wx.showModal({
                            title: '您还不是vip用户',
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  url: '../vip/vip',
                                })
                              }
                            }
                          })
                        } else if (res.data.cha == 3) {
                          wx.showModal({
                            title: '您的vip账户可查看次数为0',
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  url: '../vip/vip',
                                })
                              }
                            }
                          })
                        } else if (res.data.cha == 4) {
                          wx.showModal({
                            title: '您的资料未完善，去完善信息',
                            success: function (res) {
                              if (res.confirm) {
                                wx.navigateTo({
                                  url: '../message/message',
                                })
                              }
                            }
                          })
                        } else if (res.data.cha == 5) {
                          wx.showToast({
                            title: '发送请求失败',
                          })
                        } else if (res.data.cha == 6) {
                          wx.showToast({
                            title: '不能与自己交换微信、qq',
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        }
      })
    }else{
      wx.login({
        success: function (ress) {
          if (ress.code) {
            wx.request({
              url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Love/info_huan',
              data: { code: ress.code, id: id, form_id: e.detail.formId },
              method: "GET",
              success: function (res) {
                if (res.data.cha == 1) {
                  wx.showToast({
                    title: '已发送请求',
                  })
                  that.setData({
                    cha: res.data.cha
                  })

                } else if (res.data.cha == 2) {
                  wx.showModal({
                    title: '您还不是vip用户',
                    success: function (res) {
                      if (res.confirm) {
                        wx.switchTab({
                          url: '../vip/vip',
                        })
                      }
                    }
                  })
                } else if (res.data.cha == 3) {
                  wx.showModal({
                    title: '您的vip账户可查看次数为0',
                    success: function (res) {
                      if (res.confirm) {
                        wx.switchTab({
                          url: '../vip/vip',
                        })
                      }
                    }
                  })
                } else if (res.data.cha == 4) {
                  wx.showModal({
                    title: '您的资料未完善，去完善信息',
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '../message/message',
                        })
                      }
                    }
                  })
                } else if (res.data.cha == 5) {
                  wx.showToast({
                    title: '发送请求失败',
                  })
                } else if (res.data.cha == 6) {
                  wx.showToast({
                    title: '不能与自己交换微信、qq',
                  })
                }
              }
            })
          }
        }
      })
    }
  },
  // ====返回小图
  xiaoName:function(){
    this.setData({
      big:false
    })
  },
  // =====查看大图
  bigName:function(e){
    this.setData({
      big: true,
      current:e.currentTarget.dataset.index
    })
  }
})