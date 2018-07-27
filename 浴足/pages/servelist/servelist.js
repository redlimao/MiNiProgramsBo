//index.js
Page({
    data: {
        empty:1
    },
    onLoad: function (options){
        //获取navigator链接后的参数
        var that = this;
        var id = options.id;
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Goods/dian_type',
            data: {type:id},
            method: "GET",
            success:function(res){
                console.log(res)
                if(res.data.type != 1){
                    that.setData({
                        banner:res.data.type.info_img,
                        content:res.data.type.content
                    })
                    wx.setNavigationBarTitle({
                        title: res.data.type.name
                    })
                }
                if(res.data.info != 1){
                    that.setData({
                        empty : 1,
                        list: res.data.info
                    })                    
                }else{
                    that.setData({
                        empty : 0
                    })
                }
            },
            complete:function(){
                wx.hideLoading();
            }
        })

    },
    onHide:function(){
        var text = this.data.top_tit;
        // wx.setTopBarText({
        //     text: text
        // })
        console.log(text);
    },
    //跳转到详情页面
    bindDetails:function(e){
        var id = e.currentTarget.dataset.id; 
        wx.navigateTo({
            url: '../details/details?id='+id,
        })
    }
})
