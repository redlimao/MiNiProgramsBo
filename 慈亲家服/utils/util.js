// switchtab切换
var switchTabs = function (url, success_back, fail_back, complete_back,){
    wx.switchTab({
        url: url,
        success: success_back,
        fail: fail_back,
        complete: complete_back
    })
} 
//获取年份
var getYear = function(){
    var data = new Date();
    return data.getFullYear()
}

//评级星级判断
var forEachStar = function(star,index){
    var num = 1;
    star.forEach(function (value, item, array) {
        if (index >= item) {
            array[item].flag = true
        } else {
            array[item].flag = false
        }
    })
}

module.exports = {
    switchTabs : switchTabs,
    getYear : getYear,
    forEachStar : forEachStar
}