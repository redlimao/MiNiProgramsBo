//comment
Page({
    data: {
        empty : 1,
        list:[{
            img:'',
            name:'TTT',
            time:'2018-05-00',
            texts:'这里是显示用户的评价，这里是显示用户的评'
        }, {
            img: '',
            name: 'TTT',
            time: '2018-05-00',
            texts: '这里是显示用户的评价，这里是显示用户的评'
        }]
    },
    onLoad: function () {

    },
    //获取输入框的内容
    bindContent:function(e){
        console.log(e);
        this.setData({
            content:e.detail.value.trim()
        })
    },
    //提交
    bindsubmit:function(){
        var content = this.data.content;
        console.log(content);
    },
    //上拉加载
    onReachBottom:function(){

    }
})