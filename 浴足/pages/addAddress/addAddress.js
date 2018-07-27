Page({
    data: {
        address:1,
        empty:1
    },
    onLoad: function (options) {
        this.setData({
            address: options.address,
            phone: options.phone,
            name: options.name
        })
        // console.log(address,name,phone)
    },
    formSubmit:function(e){
        var address = this.data.address;
        var phone = this.data.phone;
        var name = this.data.name;
        console.log(address, phone, name)
        wx.navigateBack({
            delta:1
        })
    }
})
