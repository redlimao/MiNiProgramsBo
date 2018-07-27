Page({
    data: {

        user: {
            numbers: 100,
            img: '../../../images/icon_2.png',
            title: '幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票',
            titles: '幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票',
            date: '2018-02-11',
            time: '10:42',
            flag: 2 //判断单选多选
        },
        flag_pop:false, //判断弹窗隐藏和显示
        list_item: [{
            content: '幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票',
            num: 100,
            flag: false,
            percent: '88%',
            img: '../../../images/img2.png'
        }, {
            content: '幼儿园最萌宝宝投票大赛幼儿园最萌宝宝投票',
            num: 100,
            flag: false,
            percent: '90%',
            img: '../../../images/img1.png'
        }]
    },
    onLoad: function () {
        var that = this;
        wx.showLoading({
            title: '加载中',
            mask: true,
            success: function (res) {
                wx.hideLoading()
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
    // 预览图片
    bindPrevie:function(e){
        var that = this;
        wx.showLoading({
            title: '正在加载预览图片',
            mask: true,
            success: function(res) {
                var list_img = that.data.list_item;
                var arr_img = [];
                list_img.forEach(function(value,item,array){
                    arr_img.push(value.img);
                })
                // 只能显示在线图片
                wx.previewImage({
                    current: e.currentTarget.dataset.img, // 当前显示图片的http链接
                    urls: arr_img // 需要预览的图片http链接列表
                })
                wx.hideLoading();
            },
        })
    },
    //打开弹窗
    bindOpenPop:function(e){
        var index = e.currentTarget.dataset.index;
        this.setData({
            pop_index:index,
            flag_pop: true,
            ranking : 28,
            flag_good:false,
            list_money:[{
                name:'打赏10票',
                money:50
            }, {
                name: '打赏10票',
                money: 50
            }, {
                name: '打赏10票',
                money: 50
            }]
        })
    },
    //隐藏弹窗
    bindHidePop: function () {
        this.setData({
            flag_pop: false
        })
    },
    //点赞
    bindGood: function (e) {
        var that = this;
        var flag_good = this.data.flag_good;//获取对应选项的点赞值
        var index = e.currentTarget.dataset.index;//获取下标
        var flag = this.data.user.flag;//是否多选单选
        var list = this.data.list_item;
        console.log(flag_good,index,flag,list)
        // 单选
        if (flag == 1) {
            var flag_a = list.some(function (value, item, array) {
                return value.flag == true
            })
            if (!flag_a) {
                wx.showToast({
                    title: '投票成功',
                    icon: 'none',
                    mask: true,
                    success: function () {
                        list[index].flag = true,
                        that.setData({
                            flag_good: true,
                            list_item: list
                        })
                    }
                })
            } else {
                wx.showToast({
                    title: '此投票为单选投票，您已投票',
                    icon: 'none',
                    mask: true
                })
            }
        } else {
            // 多选
            wx.showToast({
                title: '投票成功，您可选择其他选项继续投票',
                icon: 'none',
                mask: true,
                success: function () {
                    list[index].flag = true,
                    that.setData({
                        flag_good: true,
                        list_item: list
                    })
                }
            })
        }
        console.log(this.data.list_item,this.data.flag_good)
    },
    //举报投票
    bindWarn:function(e){
        wx.navigateTo({
            url: '../../list/warnVoting/warnVoting',
        })
    },
    //跳转评论
    bindcomment:function(){
        wx.navigateTo({
            url: '../../list/comment/comment',
        })
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '小投票',
            path: 'page/index/picLook/picLook',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})