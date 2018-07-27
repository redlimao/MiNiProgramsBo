// var util = require('../../utils/util.js');
var config = require('../../../app.js').config;
Page({
    data: {
        allyear:[], //存储年份
        data:[], //存储月份
        y_index:0, //年份下标
        d_index: 0, //月份下标
        current:0, //当前日期选中的下标
        timeone: [
            { start_time: '06：00', end_time: '07：00', flag: 1, index: 1 },
            { start_time: '07：00', end_time: '08：00', flag: 1, index: 2 }, 
            { start_time: '08：00', end_time: '09：00', flag: 1, index: 3 }, 
            { start_time: '09：00', end_time: '10：00', flag: 1, index: 4 }, 
            { start_time: '10：00', end_time: '11：00', flag: 1, index: 5 }, 
            { start_time: '11：00', end_time: '12：00', flag: 1, index: 6 },
            { start_time: '12：00', end_time: '13：00', flag: 1, index: 7 },  
            { start_time: '13：00', end_time: '14：00', flag: 1, index: 8 }, 
            { start_time: '14：00', end_time: '15：00', flag: 1, index: 9 }, 
            { start_time: '15：00', end_time: '16：00', flag: 1, index: 10 },
            { start_time: '16：00', end_time: '17：00', flag: 1, index: 11 }, 
            { start_time: '17：00', end_time: '18：00', flag: 1, index: 12 }, 
            { start_time: '18：00', end_time: '19：00', flag: 1, index: 13 }, 
            { start_time: '19：00', end_time: '20：00', flag: 1, index: 14 }, 
            { start_time: '20：00', end_time: '21：00', flag: 1, index: 15 }, 
            { start_time: '21：00', end_time: '22：00', flag: 1, index: 16 }, 
            { start_time: '22：00', end_time: '23：00', flag: 1, index: 17 }, 
            { start_time: '23：00', end_time: '24：00', flag: 1, index: 18 }
        ]
    },
    onLoad: function (options) {
        // wx.showLoading({
        //     title: '加载中',
        //     mask: true
        // })
        var str = "：".replace(/：/g,":");
        var that = this;
        var year = new Date().getFullYear();
        var month = new Date().getMonth();
        var day = new Date().getDate() - 1;
        // 获取有效的月份
        var data = this.data.data;
        for(var i = 0;i < 12;i++){
            if(i >= month){
                data.push(i + 1);
            }
        }
        this.getDatas(year,month+1);
        // 初始化数据
        // data日期对象数组
        // allyear当前年份
        // scrollview对应的id
        var allyear = [];
        allyear.push(String(year))
        this.setData({
            data: data,
            allyear: allyear,
            view_id: 'a' + day
        })
        console.log(options.index);
        this.setData({
            money : options.money,
            name :options.name,
            index:options.index,
            id:options.id
        })
        console.log(year, month, day)
        var index = Number(this.data.index);
        var id = this.data.id;
        var time = year + '-' + (month+1) + '-' + (day+1);
        switch (index){
            // 摄影师
            case 1: 
                wx.request({
                    url: config.host + '/bz_video_wx/Camera_Appointment/check_camera_app_time.do',
                    data: { id: id, begin_time:time},
                    method: 'GET',
                    success: function(res) {
                        console.log(res);
                    },
                    complete: function(res) {},
                })
            break;
            // 模特
            case 2:
                wx.request({
                    url: config.host + '/bz_video_wx/Model_Appointment/check_model_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
            // 化妆师
            case 3:
                wx.request({
                    url: config.host + '/bz_video_wx/Dresser_appointment/check_dress_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
            // 道具
            case 4:
                wx.request({
                    url: config.host + '/bz_video_wx/Plan_appointment/check_plan_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
            // 场景
            case 5:
                wx.request({
                    url: config.host + '/bz_video_wx/Place_appointment/check_place_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
        }
    },
    // 获取指定年份月份时间的日期和星期
    getDatas:function(year,month){
        var new_arr1 = [];
        var arr = new Date(year, month, 0).getDate();
        // 判断是否为当前月份，如果是则循环部分日期，如果不是则循环全部日期
        if(new Date().getMonth() + 1 == month){
            for (var i = 0; i < arr; i++) {
                if (i >= new Date().getDate() - 1) {
                    new_arr1.push({
                        data: i + 1, week: year + '/' + month + '/' + (i + 1)
                    });
                }
            }
        }else{
            for (var i = 0; i < arr; i++) {
                new_arr1.push({
                    data: i + 1, week: year + '/' + month + '/' + (i + 1)
                });
            }            
        }
        new_arr1.forEach(function (value, item, array) {
            var week = new Date(array[item].week).getDay();
            console.log(week)
            switch (week) {
                case 0:
                    array[item].week = '日';
                    break;
                case 1:
                    array[item].week = '一';
                    break;
                case 2:
                    array[item].week = '二';
                    break;
                case 3:
                    array[item].week = '三';
                    break;
                case 4:
                    array[item].week = '四';
                    break;
                case 5:
                    array[item].week = '五';
                    break;
                case 6:
                    array[item].week = '六';
                    break;
            }
        })
        console.log(new_arr1)
        this.setData({
            timeList: new_arr1,
            curr_day:new_arr1[0].data
        })
    },
    // 选择年份
    bindYearChange: function (e) {
        var d_index = this.data.d_index;
        var allyear = this.data.allyear;
        var data = this.data.data;
        var timeone = this.data.timeone;
        this.setData({
            y_index: Number(e.detail.value),
            current:0,
            view_id:'a0'
        })
        this.getDatas(allyear[Number(e.detail.value)], data[d_index]);
    },
    // 选择月份
    bindDataChange: function (e) {
        var allyear = this.data.allyear;
        var y_index = this.data.y_index;
        var data = this.data.data;
        console.log(data, e.detail.value);
        this.setData({
            d_index: Number(e.detail.value),
            current:0,
            view_id: 'a0'
        })
        this.getDatas(allyear[y_index], data[Number(e.detail.value)]);
        // console.log(allyear[y_index], data[Number(e.detail.value)],1)
        var time = allyear[y_index] + '-' + data[Number(e.detail.value)] + '-1';
        var id = this.data.id;
        var index = Number(this.data.index);
        switch (index) {
            // 摄影师
            case 1:
                wx.request({
                    url: config.host + '/bz_video_wx/Camera_Appointment/check_camera_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
            // 模特
            case 2:
                wx.request({
                    url: config.host + '/bz_video_wx/Model_Appointment/check_model_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
            // 化妆师
            case 3:
                wx.request({
                    url: config.host + '/bz_video_wx/Dresser_appointment/check_dress_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
            // 道具
            case 4:
                wx.request({
                    url: config.host + '/bz_video_wx/Plan_appointment/check_plan_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
            // 场景
            case 5:
                wx.request({
                    url: config.host + '/bz_video_wx/Place_appointment/check_place_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
        }
    },
    // 选择日期
    bindChooseData:function(e){
        // wx.showLoading({
        //     title: '加载中',
        //     mask: true,
        // })
        var that = this;
        this.setData({
            current : e.currentTarget.dataset.index,
            view_id: e.currentTarget.id,
            curr_day: e.currentTarget.dataset.day
        })
        var year = this.data.allyear[this.data.y_index];
        var month = this.data.data[this.data.d_index];
        var day = e.currentTarget.dataset.day;
        // console.log(year,month,day);
        var id = this.data.id;
        var time = year +'-'+month+'-'+day;
        var index = Number(this.data.index);
        switch (index) {
            // 摄影师
            case 1:
                wx.request({
                    url: config.host + '/bz_video_wx/Camera_Appointment/check_camera_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
            // 模特
            case 2:
                wx.request({
                    url: config.host + '/bz_video_wx/Model_Appointment/check_model_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
            // 化妆师
            case 3:
                wx.request({
                    url: config.host + '/bz_video_wx/Dresser_appointment/check_dress_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
            // 道具
            case 4:
                wx.request({
                    url: config.host + '/bz_video_wx/Plan_appointment/check_plan_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
            // 场景
            case 5:
                wx.request({
                    url: config.host + '/bz_video_wx/Place_appointment/check_place_app_time.do',
                    data: { id: id, begin_time: time },
                    method: 'GET',
                    success: function (res) {
                        console.log(res);
                    },
                    complete: function (res) { },
                })
                break;
        }
    },
    //获取scrollview的left值
    bindScroll:function(e){
        console.log(e);
    },
    bindOneTime:function(e){
        var flag = e.currentTarget.dataset.flag;
        var index = e.currentTarget.dataset.index;
        var timeone = this.data.timeone;
        if(flag == 1){
            timeone[index].flag = 2;
            var arr = timeone.filter(function(item){
                return item.flag == 2
            })
            if(arr.length >= 2){
                timeone.forEach(function (item, index, array) {
                    if (item.index >= arr[0].index && item.index <= arr[arr.length-1].index && item.flag != 3) {
                        item.flag = 2
                    }
                })
            }
        }else if(flag == 2){
            timeone[index].flag = 1
            var arr = timeone.filter(function (item) {
                return item.flag == 2
            })
            console.log(arr.length);
            if(arr.length >= 2){
                if (timeone[index].index > arr[0].index || timeone[index].index < arr[arr.length - 1].index) {
                    timeone.forEach(function (item, index, array) {
                        if (item.flag != 3) {
                            item.flag = 1
                        }
                    })
                }
            }

        }else if(flag == 3){
            wx.showToast({
                title: '此时间段没有档期',
                icon: 'none',
                mask: true,
            })
        }
        this.setData({
            timeone: timeone
        })
    },
    // 下一步
    bindNext:function(){
        var that = this;
        var timeone = this.data.timeone;
        var flag = timeone.some(function(item,index,array){
            return item.flag == 2;
        })
        if(flag){
            var year = this.data.allyear[this.data.y_index];
            var month = this.data.data[this.data.d_index];
            var day = this.data.curr_day;
            var new_arr = timeone.filter(function(item,index,array){
                return item.flag == 2;
            })
            var time_one = year + '-' + month + '-' + day;
            var time_start = new_arr[0].start_time ;
            var time_end = new_arr[new_arr.length - 1].end_time;
            var hours = new_arr.length;
            wx.navigateTo({
                url: '../appointT/appointT',
                success:function(){
                    var datas = {
                        time_one: time_one,
                        time_start: time_start,
                        time_end: time_end,
                        hours: hours,
                        money:that.data.money,
                        name:that.data.name,
                        index:that.data.index
                    }
                    wx.setStorageSync("words", datas)
                }
            })
        }else{
            wx.showToast({
                title: '您未选择时间段',
                icon: 'none',
                mask: true,
            })
        }

    }
})
