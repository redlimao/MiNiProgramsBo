//enter.js


Page({
    data: {
       num:3,
       flag : 1,
       hide:1
    },
    onLoad: function (e) {
        var that = this;
        wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_zuyu/index.php?s=/Little/Index/index',
            method:'GET',
            data:{},
            success:function(res){
                console.log(res);
                if(res.data.qi == 0){
                    that.setData({
                        hide:1
                    })
                    wx.switchTab({
                        url: '../index/index'
                    })                
                }else{
                    that.setData({
                        img: res.data.info.img,
                        num: res.data.qi,
                        hide: 2
                    })
                    that.show();
                }
 
                wx.setNavigationBarTitle({
                    title: res.data.store_name
                })
            }
        })
    },
    bind_index:function(e){
        this.setData({
            flag : 2
        })
        wx.switchTab({
            url: '../index/index'
        })
    },
    show:function(){
        var flag = this.data.flag;
        if (flag == 1){
            var num = this.data.num;
            var that = this;
            if (num == 0) {
                this.setData({
                    flag: 2
                })
                wx.switchTab({
                    url: '../index/index'
                })
            }
            var time = setTimeout(function () {
                that.setData({
                    num: num - 1
                })
                that.show();
            }, 1500)
        }
    }
})
