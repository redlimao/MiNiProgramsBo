//search.js
const util = require('../../utils/util.js')
Page({
    data: {
        tags:[] //存储历史记录标签
    },
    onLoad:function(options){
        util.showload('加载中');
        this.setData({
            id : options.id
        })
        var that = this;
        wx.getStorage({
            key: 'tags',
            success: function (res) {
                that.setData({
                    tags : res.data
                })
                wx.hideLoading();
            },
            fail:function(){
                wx.hideLoading();
            }
        })
    },
    //提交搜索的内容
    bindConfirm:function(e){
        let id = this.data.id;
        let text = e.detail.value;
        let tags = this.data.tags;
        if(text == ''){
            util.showToast('搜索内容不能为空');
        }else{
            if (tags.indexOf(text) == -1) {
                tags.push(text);
            }
            this.setData({
                tags: tags
            })
            console.log(this.data.tags);
            wx.setStorage({
                key: "tags",
                data: tags
            })
            wx.navigateTo({
                url: '../searchlist/searchlist?name=' + text + '&id=' + id
            })
        }
    },
    // 历史记录
    bindTag:function(e){
        let id = this.data.id;
        let text = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: '../searchlist/searchlist?name=' + text + '&id=' + id
        })
    },
    //取消
    bindBack:function(){
        wx.navigateBack({
            delta: 1,
        })
    },
    // 删除历史记录
    bindDelete:function(){
        var that = this;
        var tags = this.data.tags;
        if(tags.length !== 0){
            wx.showLoading({
                title: '删除中',
                mask: true,
                success: function (res) {
                    wx.removeStorageSync('tags');
                    wx.hideLoading();
                    wx.showToast({
                        title: '删除成功',
                        icon: 'none',
                        mask: true,
                        success:function(){
                            tags.splice(0,tags.length);
                            that.setData({
                                tags: tags
                            })
                        }
                    })
                }
            })
        }else{
            wx.showToast({
                title: '历史记录为空',
                icon: 'none',
                mask: true,
            })
        }
    }
})
