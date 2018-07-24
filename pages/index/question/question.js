// pages/index/question/question.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //测试数据
        // subject:{
        //   elements:
        //     {
        //       searchPic:'/picture/search.png'
        //     },
        //   list:[
        //     {
        //       avatar:'/picture/boy5.png',
        //       title: 'PHP Swoole 如何编译？',
        //       content: '看到了Swoole这个插件，但不知道如何编译安装...'
        //     }
        //   ]
        // }
        page: 0,
        inputValue: '', //搜索的内容
    },

    /**
     * 问题按钮
     * sub_id 帖子id
     */
    descriptionButton: function(event) {
        var sub_id = event.currentTarget.dataset.sub_id
        // console.log(id)
        wx.navigateTo({
            url: '../../index/answer/answer?sub_id=' + sub_id,
        })

    },

  

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var sub_id = options.sub_id
        this.setData({
            id: sub_id
        })
        // console.log(postId)

        var courseName = options.course
        this.setData({
            courseName: courseName
        })

        // console.log(courseName)
        wx.request({
            url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_hotissue/0/15',
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                //console.log(res.data.hotissue)
                var quesLists = res.data.hotissue;
                var quesLength = res.data.hotissue.length;
                //console.log(quesLength);
                var QuesLists = new Array();
                for (var i = 0; i <= quesLength - 1; i++) {
                    //console.log(i)
                    var quesCourse = quesLists[i].course;
                    //同类课程问题
                    if (courseName == quesCourse) {
                        QuesLists.push(quesLists[i])
                    }
                }
                that.setData({
                    ques: QuesLists
                })
            },
            fail: function(res) {},
            complete: function(res) {},
        })








    },

    //搜索框文本内容显示
    inputBind: function (event) {
        this.setData({
            inputValue: event.detail.value
        })
        console.log('bindInput' + this.data.inputValue)

    },

    //搜索执行按钮 向数据库请求数据
    query: function (event) {

        var that = this

        /**
         * 提问帖子搜索API 
         * keyword string 搜索关键词 ; 这里是 this.data.inputValue
         * start int 分页起始值 ; 这里是 0
         */
        wx.request({
            url: 'https://localhost/proj_online_class/server/public/index.php/forum/forum/get_issue_search/' + this.data.inputValue + /0/,
            data: {
                inputValue: this.data.inputValue
            },
            method: 'GET',
            success: function (res) {
                console.log(res.data)
                var searchData = res.data
                that.setData({
                    searchData
                })

                //设置提问帖子搜索缓存
                wx.setStorage({
                    key: 'searchLists',
                    data: {
                        searchLists: res.data
                    }
                })

                //模糊搜索
                if (!that.data.inputValue) {
                    //没有搜索词 友情提示
                    wx.showToast({
                        title: '请重新输入',
                        image: '../../../picture/tear.png',
                        duration: 2000,
                    })
                } else if (searchData.search.length == 0) {
                    //搜索词不存在 友情提示
                    wx.showToast({
                        title: '关键词不存在',
                        image: '../../../picture/tear.png',
                        duration: 2000,
                    })
                } else {
                    //提取题目关键字 与搜索词进行匹配
                    var searchIndex = searchData.search.length
                    var d = 0;
                    for (var i = 0; i <= searchIndex - 1; i++) {

                        var searchTitle = searchData.search[d].title
                        console.log(searchTitle)
                        d = d + 1;

                        for (var x = 0; x <= searchTitle.length; x++) {
                            for (var y = 0; y <= searchTitle.length; y++) {
                                var keyWord = searchTitle.substring(x, y);
                                console.log(keyWord)
                            }
                        }

                        wx.navigateTo({
                            url: '../../search/search',
                        })
                    }
                }



            }
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    //上拉刷新上一页
    onPullDownRefresh: function () {
        var that = this;
        // Do something when pull down.
        console.log('刷新');
        if (this.data.page >= 1) {

            /**
             * 获取热点提问列表API
             * page_start int 分页范围起始值 ; 这里是 this.data.page
             * page_length   分页范围长度 ; 这里是 10
             */
            wx.request({
                url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_hotissue/' + this.data.page +'/' + '10',
                data: '',
                header: {},
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: function (res) {
                    var page = that.data.page;
                    page = page - 1;
                    
                    //console.log(res.data.hotissue)
                    var quesLists = res.data.hotissue;
                    var quesLength = res.data.hotissue.length;
                    //console.log(quesLength);
                    var QuesLists = new Array();
                    for (var i = 0; i <= quesLength - 1; i++) {
                        //console.log(i)
                        var quesCourse = quesLists[i].course;
                        if (that.data.courseName == quesCourse) {
                            QuesLists.push(quesLists[i])
                        }
                    }
                    that.setData({
                        ques: QuesLists
                    })
                },
                fail: function (res) { },
                complete: function (res) { },
               
            })
        }
    },


    //下拉刷新下一页
    onReachBottom: function () {
        var that = this;
        // Do something when page reach bottom.

        /**
         * 获取热点提问列表API
         * page_start int 分页范围起始值 ; 这里是 this.data.page
         * page_length   分页范围长度 ; 这里是 10
         */
        wx.request({
            url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_hotissue/' + this.data.page + '/' + '10',
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                var page = that.data.page;
                page = page + 1;
                
                console.log(res.data.hotissue)
                var quesLists = res.data.hotissue;
                var quesLength = res.data.hotissue.length;
                console.log(quesLength);
                var QuesLists = new Array();
                for (var i = 0; i <= quesLength - 1; i++) {
                    console.log(i)
                    var quesCourse = quesLists[i].course;
                    if (that.data.courseName == quesCourse) {
                        QuesLists.push(quesLists[i])
                    }
                }
                that.setData({
                    ques: QuesLists
                })
            },
            fail: function (res) { },
            complete: function (res) { },
        })
        console.log('circle 下一页');
    },

})