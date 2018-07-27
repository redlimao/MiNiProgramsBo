// pages/textVoting/textVoting.js
const common = require("../../common/common.js");
Page({
    data: {
        current:1,
        list_item:[{content:''},{content: ''}],//选项列表
        tab_tit: '单选投票', //单选多选
        title:'',  //标题
        titles:'', //补充说明
        flag_public:true,//是否公开
        flag_comment:true//开启评论
    },
    onLoad: function (options){
        // 获取当前时间
        var date = common.getNowDate();
        var time = common.getNowTime();
        this.setData({
            date: date,
            time:time
        })
    },
    onShow: function () {
    
    },
    //tab切换
    bindTap:function(e){
        this.setData({
            current:e.target.dataset.index,
            tab_tit : e.target.dataset.tit
        })
    },
    // 标题input事件
    bindTitle:function(e){
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
    //选项列表input事件
    bindInput:function(e){
        var index = e.currentTarget.dataset.index;
        var content = e.detail.value.trim();
        var list_item = this.data.list_item;
        list_item[index].content = content;
        this.setData({
            list_item: list_item
        })
    },
    // 添加选项
    bindAdd:function(){
        var that = this;
        var list_item = this.data.list_item;
        wx.showToast({
            title: '添加成功',
            icon: 'none',
            mask: true,
            success: function () {
                list_item.push({ content: '' });
                that.setData({
                    list_item: list_item
                })
            }
        })
    },
    // 删除选项
    bindDelete:function(e){
        var that = this;
        var index = e.currentTarget.dataset.index;
        var list_item = this.data.list_item;
        if(list_item.length <= 2){
            wx.showToast({
                title: '删除失败，不能少于2项选项',
                icon: 'none',
                mask: true,
            })
        }else{
            wx.showToast({
                title: '删除成功',
                icon: 'none',
                mask: true,
                success:function(){
                    console.log(index);
                    list_item.splice(index, 1);
                    that.setData({
                        list_item: list_item
                    })
                }
            })
        }        
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
    switchPublicChange:function(e){
        this.setData({
            flag_public : e.detail.value
        })
    },
    //是否开启评论
    switchCommentChange:function(e){
        this.setData({
            flag_comment: e.detail.value
        })
    },
    //获取页面内容信息
    bindsubmit:function(e){
        var tab_tit = this.data.tab_tit; //单选多选
        var title = this.data.title.trim();//标题
        var titles = this.data.titles;//补充说明
        var list_item = this.data.list_item;//选项列表
        var date = this.data.date;//日期
        var time = this.data.time;//时间
        var flag_public = this.data.flag_public;//是否公开
        var flag_comment = this.data.flag_comment;//是否开启评论

        //判断选项内容是否为空
        var list_flag = list_item.every(function (value, item, array) {
            return value.content == "";
        })
        if (title == "") {
            wx.showToast({
                title: '标题不能为空',
                icon: 'none',
                mask: true,
            })
        } else if (list_flag == true) {
            wx.showToast({
                title: '选项内容不能为空',
                icon: 'none',
                mask: true,
            })
        } else if(e.currentTarget.dataset.index == 1){
            wx.showLoading({
                title: '正在生成预览',
                mask: true,
                success: function(res) {
                    wx.navigateTo({
                        url: '../wordLook/wordLook',
                        success: function () {
                            var datas = {
                                tab_tit: tab_tit,
                                title: title,
                                titles: titles,
                                list_item: list_item,
                                date: date,
                                time: time,
                                flag_public: flag_public,
                                flag_comment: flag_comment
                            }
                            wx.setStorage({
                                key: "words",
                                data: datas
                            })
                            wx.hideLoading();
                            wx.showToast({
                                title: '跳转预览页面',
                                icon: 'none',
                                mask: true,
                                success: function(res) {},

                            })
                        }
                    })
                },
            })

        } else if (e.currentTarget.dataset.index == 2){
            wx.showLoading({
                title: '发布中',
                mask: true,
                success: function(res) {
                    console.log(tab_tit, title, titles, list_item, date, time, flag_public, flag_comment);
                    wx.hideLoading();
                    wx.showToast({
                        title: '发布成功',
                        icon: 'none',
                        mask: true,
                        success: function () {
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