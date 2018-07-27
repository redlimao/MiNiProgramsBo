//tagdetail.js
const util = require('../../utils/util.js')
Page({
    data: {
        tea_arr:[]
    },
    onLoad:function(options){
        util.showload('加载中');
        let that = this;
        let store_name = options.storename; //店铺名称
        let time_start = options.timestart; //开始时间
        let time_end = options.timeend; //结束时间
        let store_id = options.storeid; //店铺id
        let date = options.date; //所选日期
        let num = Number(options.num); //人数
        this.setData({
            time_start: time_start,
            time_end: time_end,
            store_id: store_id,
            date: date,
            num: num,
            store_name: store_name
        })
        wx.request({
            url: util.host + '/Little/Company/select',
            data: { store: store_id},
            method: 'GET',
            success: function(res) {
                // console.log(res);
                //初始化列表
                util.for_each(res.data.res.xiang);
                util.for_each(res.data.res.food);
                util.for_each(res.data.res.water);
                util.for_each(res.data.res.specialist);
                that.setData({
                    tag_one: res.data.res.xiang,
                    tag_two: res.data.res.specialist,
                    tag_three: res.data.res.water,
                    tag_four: res.data.res.food
                })
                if (res.data.goods == 1){
                    that.setData({
                        empty : 2
                    })
                }else{
                    util.for_each(res.data.goods);
                    that.setData({
                        tag_five: res.data.goods,
                        empty : 1
                    })
                }
                //三级联动初始化数据
                let one_obj = res.data.first; //获取一级数据
                let two_obj = res.data.first[0].second //获取二级数据;
                let three_obj = res.data.first[0].second[0].third; //获取三级数据
                let one_arr = []; //存放一级数据
                let two_arr = []; //存放二级数据
                let three_arr = []; //存放三级数据
                let arrs = []; //合并数组
                util.arrObj(one_obj,one_arr);
                util.arrObj(two_obj, two_arr);
                util.arrObj(three_obj, three_arr);
                arrs.push(one_arr, two_arr,three_arr);
                that.setData({
                    all_arr: one_obj, //所有数据
                    classify_arr: arrs,//当前三级展示的数据
                    classify_index:[0,0,0] //当前三级展示的下标
                })
                // console.log(arrs);
                wx.hideLoading();
            }
        })
    },
    //获取三级
    bindClassify:function(e){
        util.showload('加载中');
        let that = this;
        let all_arr = this.data.all_arr; //整个三级数据
        let index = e.detail.value; //当前下标 example [0,0,0]
        let tea_arr = this.data.tea_arr; //存储所选茶叶的数组
        // 获取最终id
<<<<<<< HEAD
        if (all_arr[index[0]].second == false || all_arr[index[0]].second[index[1]].third == false){
            that.setData({
                empty: 2
            })
            wx.hideLoading();
        }else{
            let tea_id = all_arr[index[0]].second[index[1]].third[index[2]].id;
            wx.request({
                url: util.host + '/Little/Goods/info_type',
                data: { id: tea_id },
                method: 'GET',
                success: function (res) {
                    console.log(res);
                    if (res.data.pi_goods == 1) {
                        that.setData({
                            empty: 2
                        })
                    } else {
                        //初始化列表默认值flag
                        util.for_each(res.data.pi_goods);
                        //使用id判断是否选中
                        if (tea_arr.length != 0) {
                            for (let i = 0; i < res.data.pi_goods.length; i++) {
                                for (let j = 0; j < tea_arr.length; j++) {
                                    console.log(res.data.pi_goods[i].id, tea_arr[j].id)
                                    if (res.data.pi_goods[i].id == tea_arr[j].id) {
                                        res.data.pi_goods[i].flag = 2;
                                    }
=======
        let tea_id = all_arr[index[0]].second[index[1]].third[index[2]].id;
        this.setData({
            classify_index: index
        })
        wx.request({
            url: util.host + '/Little/Goods/info_type',
            data: {id:tea_id},
            method: 'GET',
            success: function(res) {
                // console.log(res);
                if (res.data.pi_goods == 1) {
                    that.setData({
                        empty: 2
                    })
                } else {
                    //初始化列表默认值flag
                    util.for_each(res.data.pi_goods);
                    //使用id判断是否选中
                    if (tea_arr.length != 0){
                        for (let i = 0; i < res.data.pi_goods.length;i++){
                            for (let j = 0; j < tea_arr.length;j++){
                                console.log(res.data.pi_goods[i].id, tea_arr[j].id)
                                if (res.data.pi_goods[i].id == tea_arr[j].id){
                                    res.data.pi_goods[i].flag = 2;
>>>>>>> 4c684fdf688fdac92cd072e92aa387e4cf6d6c6b
                                }
                            }
                            console.log(res.data.pi_goods)
                        } else {
                            util.for_each(res.data.pi_goods);
                        }
<<<<<<< HEAD

                        that.setData({
                            tag_five: res.data.pi_goods,
                            empty: 1
                        })
=======
                        // console.log(res.data.pi_goods)
                    }else{
                        util.for_each(res.data.pi_goods);
>>>>>>> 4c684fdf688fdac92cd072e92aa387e4cf6d6c6b
                    }
                    wx.hideLoading();
                }
            })
        }

        this.setData({
            classify_index: index
        })
    },
    // 三级选择列行
    bindColumnChange: function (e) {
        // e.detail.column当前列
        // e.detail.value当前行
        let all_arr = this.data.all_arr; //获取所有三级数据
        let classify_arr = this.data.classify_arr; //获取当前展示的数据
        let classify_index = this.data.classify_index; //获取当前展示数据的下标
        classify_index[e.detail.column] = e.detail.value; //获取当前列 的 行值
        // 判断列数
        switch (e.detail.column) {
            // 第一列
            case 0:
                let new_arr_1 = [];
                let new_arr_2 = [];
                //获取第二列所要展示的信息
                util.arrObj(all_arr[e.detail.value].second,new_arr_1);
<<<<<<< HEAD
                if (all_arr[e.detail.value].second != false){
                    util.arrObj(all_arr[e.detail.value].second[0].third, new_arr_2);
                }               
=======
                //获取第三列所要展示的信息
                util.arrObj(all_arr[e.detail.value].second[0].third, new_arr_2);
>>>>>>> 4c684fdf688fdac92cd072e92aa387e4cf6d6c6b
                classify_arr[1] = new_arr_1
                classify_arr[2] = new_arr_2
                classify_index[1] = 0;
                classify_index[2] = 0;
                break;
            // 第二列
            case 1:
                let one_index = classify_index[0];
                let new_arr_3 = []; 
                //对象转数组 获取第三列所要展示的信息
                util.arrObj(all_arr[one_index].second[e.detail.value].third,new_arr_3);
                classify_arr[2] = new_arr_3
                classify_index[2] = 0;
                break;
        }
        this.setData({
            classify_arr: classify_arr,
            classify_index: classify_index
        })
    },
    // 标签选择
    bindTagOne:function(e){
        let index = e.currentTarget.dataset.index;
        let tag_one = this.data.tag_one;
        util.tag(tag_one, index,'flag');
        this.setData({
            tag_one: tag_one
        })
    },
    bindTagTwo: function (e) {
        let index = e.currentTarget.dataset.index;
        let tag_two = this.data.tag_two;
        util.tag(tag_two, index, 'flag');
        this.setData({
            tag_two: tag_two
        })
    },
    bindTagThree: function (e) {
        let index = e.currentTarget.dataset.index;
        let tag_three = this.data.tag_three;
        let num = this.data.num;
        util.tags(tag_three,index,'flag');
        let arr = tag_three.filter((item) => {
            return item.flag === 2;
        })
        if (arr.length > num) {
            tag_three[index].flag = 1;
            wx.showToast({
                title: '已超出人数限制',
                icon: 'none',
                mask: true
            })
        }
        this.setData({
            tag_three: tag_three
        })
    },
    bindTagFour: function (e) {
        //
        let index = e.currentTarget.dataset.index;
        let tag_four = this.data.tag_four;
        let num = this.data.num;
        util.tags(tag_four, index, 'flag');
        let arr = tag_four.filter((item) => {
            return item.flag === 2;
        })
        if (arr.length > num) {
            tag_four[index].flag = 1;
            wx.showToast({
                title: '已超出人数限制',
                icon: 'none',
                mask: true
            })
        }
        this.setData({
            tag_four: tag_four
        })
    },
    bindTagFive: function (e) {
        let index = e.currentTarget.dataset.index; //获取下标
        let tag_five = this.data.tag_five; //获取当前列表
        let num = this.data.num; //获取预约人数
        let tea_arr = this.data.tea_arr;//获取所选的茶叶
        if (tag_five[index].flag === 1) {
            tag_five[index].flag = 2;
            tea_arr.push({ id: tag_five[index].id, name: tag_five[index].name });
        } else {
            tag_five[index].flag = 1;
            let curr_id = tag_five[index].id; 
            for(let i = 0;i < tea_arr.length;i++){
                if (tea_arr[i].id == curr_id){
                    tea_arr.splice(i,1);
                    console.log(tea_arr);
                }
            }
        }
        if (tea_arr.length > num) {0
            let curr_id = tag_five[index].id;
            for (let i = 0; i < tea_arr.length; i++) {
                if (tea_arr[i].id == curr_id) {
                    tea_arr.splice(i, 1);
                }
            }
            tag_five[index].flag = 1;
            wx.showToast({
                title: '已超出人数限制',
                icon: 'none',
                mask: true
            })
        }
        console.log(tea_arr)
        this.setData({
            tag_five: tag_five,
            tea_arr: tea_arr
        })
    },   
    bindnext:function(e){
        let time_start = this.data.time_start; //开始时间
        let time_end = this.data.time_end; //结束时间
        let store_id = this.data.store_id; //店铺id
        let store_name = this.data.store_name;
        let date = this.data.date; //日期
        let num = this.data.num; //人数
        let tea_arr = this.data.tea_arr;//茶列表
        let tag_one = this.data.tag_one.filter((item)=>{
            return item.flag == 2;
        })
        let tag_two = this.data.tag_two.filter((item) => {
            return item.flag == 2;
        })
        let tag_three = this.data.tag_three.filter((item) => {
            return item.flag == 2;
        })
        let tag_four = this.data.tag_four.filter((item) => {
            return item.flag == 2;
        })
        // console.log(time_start, time_end, store_id, date, num, tea_arr, tag_one, tag_two, tag_three, tag_four);
        wx.navigateTo({
            url: '../createpackagezi/createpackagezi',
            success:function(){
                let orderlist = {
                    time_start: time_start,
                    time_end: time_end,
                    store_id: store_id,
                    store_name: store_name,
                    date: date,
                    num: num,
                    tea_arr: tea_arr,
                    tag_one: tag_one,
                    tag_two: tag_two,
                    tag_three: tag_three,
                    tag_four: tag_four
                }
                wx.setStorage({
                    key: 'list1',
                    data: orderlist,
                })
            }
        })
    }
})
