var util = require('../../utils/util.js');
var arr_year = [];
Page({
    data: {
        time: '12:01',
        year:[2018,2017,2016],
        data: ['1月', '2月', '3月'],
        y_index:0,
        d_index: 0,
        timeList: [{ week: "日", data: 5 }, { week: "一", data: 5 }, { week: "二", data: 5 }, { week: "三", data: 5 }, { week: "四", data: 5 }, { week: "五", data: 5 }, { week: "六", data: 5 }, { week: "日", data: 5 }, { week: "一", data: 5 }, { week: "四", data: 5 }, { week: "五", data: 5 }, { week: "六", data: 5 }, { week: "日", data: 5 }, { week: "一", data: 5 }],
        current:0
    },
    onLoad: function (options) {
        
    },
    // 选择年份
    bindYearChange:function(e){
        this.setData({
            y_index:e.detail.value
        })
    },
    // 选择月份
    bindDataChange: function (e) {
        this.setData({
            d_index: e.detail.value
        })
    },
    // 选择日期
    bindChooseData:function(e){
        this.setData({
            current : e.currentTarget.dataset.index
        })
    },
    //提交表单
    bindSubmit:function(e){
        console.log(e);
        var temp = e.detail.value.temp;
        var water = e.detail.value.water;
        var food = e.detail.value.food;
        var shit = e.detail.value.shit;
        var pee = e.detail.value.pee;
        var sleep = e.detail.value.sleep;
        var sleep = e.detail.value.sleep;
    }
})
