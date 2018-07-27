//请求路径
const host = 'https://www.bozhiyingxiao.com/little_program/store_jiadie/index.php?s=';
// 获取当前时间 example:2018-8-20
const now_time = ()=>{
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let date = year + '-' + month + '-' + day;
    return date;
}
// 对象转数组
const arrObj = (obj,arr)=>{
    console.log(obj);
    if(!obj){
        arr.push('--')
    }else{
        for (let i in obj) {
            arr.push(obj[i].name);
        }
    }
    return arr;
}
// 遍历默认值 
const for_each = (arr)=>{
    arr.forEach((item)=>{
        item.flag = 1;
    })
    return arr;
}
//单选 tag数组 index选中下标 flag选中标识 1未选中 2选中
const tag = (tag,index,flag)=>{
    if (tag[index][flag] === 1){
        tag.forEach((item) => {
            item[flag] = 1;
        })
        tag[index][flag] = 2;
    }else{
        tag.forEach((item) => {
            item[flag] = 1;
        })       
    }
}
//多选 tag数组 index选中下标 flag选中标识 1未选中 2选中
const tags = (tag, index, flag) => {
    if (tag[index][flag] === 1) {
        tag[index][flag] = 2;
    } else {
        tag[index][flag] = 1;
    }
}

// 加载状态
const showload = (title, succback)=>{
    wx.showLoading({
        title: title,
        mask: true,
        success: succback
    })
}
//提示语
const showToast = (title, callback)=>{
    wx.showToast({
        title: title,
        icon: 'none',
        mask: true,
        success : callback
    })
}

module.exports = {
    tags: tags,
    tag : tag,
    showload: showload,
    showToast: showToast,
    host: host,
    for_each: for_each,
    arrObj: arrObj,
    now_time: now_time
}