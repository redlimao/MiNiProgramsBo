//app.js
const config = {
    host : 'http://192.168.0.2:8080'
}
const getUserID = function(){
    wx.getStorage({
        key: 'user',
        success: function (res) {
            var user_id = res.data;
        }
    })
    return user_id;
} 
module.exports = {
    config: config,
    getUserID: getUserID
}

