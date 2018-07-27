// pages/pictVoting/pictVoting.js
const common = require("../../common/common.js");
Page({
    data: {
        title: '',  //标题
        titles: '', //补充说明
        flag_public: true,//是否公开
        flag_comment: true,//开启评论
        flag_pay: true,//开启打赏
        pic_list:[{
            content:'',
            img:'',
            flag : true
        }]
    },
    onLoad: function (options) {
        // 获取当前时间
        var date = common.getNowDate();
        var time = common.getNowTime();
        this.setData({
            date: date,
            time: time
        })
    },
    // 标题input事件
    bindTitle: function (e) {
        this.setData({
            title: e.detail.value.trim()
        })
    },
    // 补充说明input事件
    bindTitles: function (e) {
        this.setData({
            titles: e.detail.value.trim()
        })
    },
    // 日期选择
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    //时间选择
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },
    //是否公开
    switchPublicChange: function (e) {
        this.setData({
            flag_public: e.detail.value
        })
    },
    //是否开启评论
    switchCommentChange: function (e) {
        this.setData({
            flag_comment: e.detail.value
        })
    },
    //是否开启打赏
    switchPayChange: function (e) {
        this.setData({
            flag_payt: e.detail.value
        })
    },
    //图片列表input事件
    bindInput: function (e) {
        var index = e.currentTarget.dataset.index;
        var content = e.detail.value.trim();
        var pic_list = this.data.pic_list;
        pic_list[index].content = content;
        this.setData({
            pic_list: pic_list
        })
    },
    //添加区域块
    bindAdd:function(){
        var that = this;
        var pic_list = this.data.pic_list;
        wx.showToast({
            title: '添加成功',
            icon: 'none',
            mask: true,
            success: function(res) {
                pic_list.forEach(function(value,item,array){
                    value.flag = false
                })
                pic_list.push({content: '',img: '',flag: true});
                that.setData({
                    pic_list: pic_list
                })
            }
        })
    },
    //删除区域块
    bindDelete:function(e){
        var that = this;
        var index = e.currentTarget.dataset.index;
        var pic_list = this.data.pic_list;
        wx.showToast({
            title: '删除成功',
            icon: 'none',
            mask: true,
            success: function () {
                pic_list.splice(index, 1);
                that.setData({
                    pic_list: pic_list
                })
            }
        })
    },
    //选择图片
    bindChooseImg:function(e){
        var that = this;
        var pic_list = this.data.pic_list;
        var index = e.currentTarget.dataset.index;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (ress) {
                wx.showToast({
                    title: '添加图片成功',
                    icon:"none",
                    mask: true,
                    success: function (res) {
                        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                        pic_list[index].img = ress.tempFilePaths[0];
                        that.setData({
                            pic_list: pic_list
                        })
                     }
                })

            },
            fail:function(){
                wx.showToast({
                    title: '添加图片失败',
                    icon: "none",
                    mask: true
                })
            }
        })
    },
    bindsubmit: function (e) {
        var title = this.data.title.trim();//标题
        var titles = this.data.titles;//补充说明
        var pic_list = this.data.pic_list;//选项列表
        var date = this.data.date;//日期
        var time = this.data.time;//时间
        var flag_public = this.data.flag_public;//是否公开
        var flag_comment = this.data.flag_comment;//是否开启评论
        var flag_pay = this.data.flag_pay;//是否开启打赏

        //判断选项内容是否为空
        var list_flag = pic_list.every(function (value, item, array) {
            console.log(value.content, value.img)
            return value.content != "" && value.img != "";
        })
        console.log(list_flag);
        if (title == "") {
            wx.showToast({
                title: '标题不能为空',
                icon: 'none',
                mask: true,
            })
        } else if (list_flag == false) {
            wx.showToast({
                title: '选项内容不能为空',
                icon: 'none',
                mask: true,
            })
        } else if (e.currentTarget.dataset.index == 1) {
            wx.showLoading({
                title: '正在生成预览',
                mask: true,
                success: function (res) {
                    wx.navigateTo({
                        url: '../picLook/picLook',
                        success: function () {
                            var datas = {
                                title: title,
                                titles: titles,
                                pic_list: pic_list,
                                date: date,
                                time: time,
                                flag_public: flag_public,
                                flag_comment: flag_comment,
                                flag_pay: flag_pay
                            }
                            wx.setStorage({
                                key: "pics",
                                data: datas
                            })
                            wx.hideLoading();
                            wx.showToast({
                                title: '跳转预览页面',
                                icon: 'none',
                                mask: true,
                                success: function (res){ },
                            })
                        }
                    })
                },
            })

        } else if (e.currentTarget.dataset.index == 2) {
            wx.showLoading({
                title: '发布中',
                mask: true,
                success: function (res) {
                    console.log(title, titles, pic_list, date, time, flag_public, flag_comment, flag_pay);
                    wx.hideLoading();
                    wx.showToast({
                        title: '发布成功',
                        icon: 'none',
                        mask: true,
                        success:function(){
                            wx.navigateBack({
                                delta: 1,
                            })
                        }
                    })
                },
            })
        }
    }
})