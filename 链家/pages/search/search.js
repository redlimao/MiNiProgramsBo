//search.js
Page({
    data: {
        a_empty:1,
        b_empty:2,
        keys:[]
    },
    onLoad:function(options){
        var types = options.types;
        this.setData({
            types: types
        })
        console.log(types)
    },
    onShow: function () {
        var that = this;
        wx.getStorage({
            key: 'key',
            success: function (res) {
                if (res.data.length == 0) {
                    that.setData({
                        b_empty: 2
                    })
                } else {
                    that.setData({
                        b_empty: 1,
                        keys: res.data
                    })
                }
            }
        })
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_lianjia/index.php?s=/Little/Sou/index',
            data: {},
            method: 'GET',
            success: function(res) {
                if(res.data.list == 1){
                    that.setData({
                        a_empty:2,
                    })
                    
                }else{
                    that.setData({
                        a_empty: 1,
                        tags: res.data.list
                    })                   
                }
            },
            complete: function(res) {},
        })
    },
    //获取历史记录数组
    historyArray:function(content){
      var that = this;
        var keys = this.data.keys;
        if(keys.indexOf(content) == -1){
          keys.push(content);
        }
        if(keys.length > 10){
            keys.shift();
        }
        wx.setStorage({
          key: "key",
          data: keys,
        })
        wx.getStorage({
          key: 'key',
          success: function (res) {
            that.setData({
              keys: res.data
            })
          }
        })

    },
    //标签切换
    bindTags:function(e){
        var that = this;
        var content = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: '../list/list?content=' + content,
            success:function(){
                that.historyArray(content);
            }
        })
    },
    //输入框内容改变时
    bindInput:function(e){
        var text = e.detail.value;
        this.setData({
            search_txt: text
        })
    },
    //点击搜索按钮搜索
    bindSearch_in:function(e){
        var that=this;
        var form_id = e.detail.formId;
        var content = this.data.search_txt;
        wx.navigateTo({
            url: '../list/list?formid=' + form_id + '&content=' + content,
            success:function(){
              that.historyArray(content);
            }
        })
    },
    //删除历史记录
    bindDelete:function(){
        var keys = this.data.keys;
        var that = this;
        wx.showModal({
            title: '提示',
            content: '是否删除历史记录',
            success:function(res){
                if (res.confirm) {
                    wx.showToast({
                        title: '删除成功',
                        success:function(){
                            keys.splice(0, keys.length);
                            that.setData({
                                lists:keys,
                                b_empty:2
                            })
                        }
                    })
                    try {
                        wx.removeStorageSync('key')
                    } catch (e) {
                        // Do something when catch error
                    }

                } else if (res.cancel) {
                }
            }

        })
    }

})
