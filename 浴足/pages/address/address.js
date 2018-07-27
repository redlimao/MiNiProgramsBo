Page({
    data: {
        address:[{
            name:'提皮肤',
            address:'陕西省西安市莲湖区双府新天地',
            phone:123456
        }],
        empty:1,
        user_id :'',
        shop_id:''
    },
    onLoad:function(options){
        // var id = options.id;
        // var user_id = options.userid;
        // var orders_id = options.ordersid;
        this.setData({
            user_id: options.userid,
            shop_id: options.shopid
        })

        if(this.data.address == 1){
            this.setData({
                empty : 1
            })
        }
    },
    // onShow: function (options) {
    //     var user_id = this.data.user_id;
    //     if(this.data.address == 1){
    //         this.setData({
    //             empty : 2
    //         })
    //     }
    // },
    bindChoose:function(e){
        var address = e.currentTarget.dataset.address;
        var name = e.currentTarget.dataset.name;
        var phone = e.currentTarget.dataset.phone;
        var user_id = this.data.user_id;
        var shop_id = this.data.shop_id;
        console.log(e.currentTarget.dataset.address)
        wx.navigateTo({
            url: '../appointmentdetails/appointmentdetails?address=' + address + '&phone=' + phone + '&name=' + name + '&userid=' + user_id + '&id=' + shop_id
        })       
    },
    bindAdd:function(){
        var that = this;
        wx.showModal({
            title: '提示',
            content: '是否获取微信地址',
            success: function (ress) {
                if (ress.confirm) {
                    wx.chooseAddress({
                        success: function (res) {
                            that.setData({
                                address: res.cityName + res.countyName + res.detailInfo,
                                phone: res.telNumber,
                                name: res.userName,
                            })
                            wx.navigateTo({
                                url: '../addAddress/addAddress?address='+ that.data.address + '&phone='+ that.data.phone + '&name=' + that.data.name,
                            })
                        },
                        fail: function (res) {
                            wx.openSetting({
                                success: (res) => {

                                }
                            })
                        }
                    })
                } else if (ress.cancel) {
                    wx.navigateTo({
                        url: '../addAddress/addAddress',
                    })
                }
            }
        })
    }
})
