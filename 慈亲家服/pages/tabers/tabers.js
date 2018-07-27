var util = require("../../utils/util.js")

Page({
    data: {
        
    },
    onLoad: function (options) {
        
    },
    bindTabOne : function(){
        util.switchTabs('../index/index');
    },
    bindTabTwo: function () {
        util.switchTabs('../gu/gu');
    },
    bindTabThree: function () {
        util.switchTabs('../lessons/lessons');
    },
    bindTabFour: function () {
        util.switchTabs('../producet/producet');
    }
})
