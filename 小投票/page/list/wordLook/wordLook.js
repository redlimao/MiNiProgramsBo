
con




Page({
    data: {
        user:{
            numbers: 100,
            img: '../../../images/icon_2.png',
            title:'幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票',
            titles:'幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票',
            date:'2018-02-11',
            time:'10:42',
            flag:1 //判断单选多选
        }
    },
    onLoad:function(){
        var that = this;
        wx.showLoading({
            title: '加载中',
            mask: true,
            success: function (res) {
                wx.hideLoading()
                that.setData({
                    list_item: [{
                        content: '幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票',
                        num: 100,
                        flag: false,
                        percent: '10%'
                    }, {
                        content: '幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票',
                        num: 100,
                        flag: false,
                        percent: '10%'
                    }]
                })
            },
            fail: function (res) {
                wx.hideLoading();
                wx.showToast({
                    title: '加载失败',
                    icon: 'none',
                    mask: true
                })
            }
        })
    },
    //点赞
    bindGood:function(e){
        var that = this;
        var index = e.currentTarget.dataset.index;//获取下标
        var flag = this.data.user.flag;//是否多选单选
        var list = this.data.list_item;
        // 单选
        if(flag == 1){
            var flag_a = list.some(function (value, item, array) {
                return value.flag == true
            })
            if(!flag_a){
                wx.showToast({
                    title: '投票成功',
                    icon: 'none',
                    mask: true,
                    success:function(){
                        list[index].flag = true;
                        that.setData({
                            list_item: list
                        })
                    }
                })

            }else{
                wx.showToast({
                    title: '您已投票',
                    icon: 'none',
                    mask: true
                })
            }
        }else{
            // 多选
            wx.showToast({
                title: '投票成功',
                icon: 'none',
                mask: true,
                success: function () {
                    list[index].flag = true;
                    that.setData({
                        list_item: list
                    })
                }
            })
        }
        

    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '小投票',
            path: 'page/index/wordLook/wordLook',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})