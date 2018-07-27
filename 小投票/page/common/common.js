//获取当前日期
function getNowDate(){
    var arr = new Date();
    var year = arr.getFullYear();
    var month = arr.getMonth() + 1;
    var day = arr.getDate();
    var date = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    return date;
}
//获取当前时间
function getNowTime(){
    var arr = new Date();
    var time = (arr.getHours() < 10 ? '0' + arr.getHours() : arr.getHours()) + ':' + (arr.getMinutes() < 10 ? '0' + arr.getMinutes() : arr.getMinutes());
    return time;
}

module.exports = {
    getNowDate: getNowDate,
    getNowTime: getNowTime
}
