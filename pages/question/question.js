// pages/index/question/question.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //测试数据
        // subject: {
        //   elements:
        //   {
        //     searchPic: '/picture/search.png'
        //   },
        //   list: [
        //     {
        //       avatar: '/picture/boy5.png',
        //       title: 'PHP Swoole 如何编译？',
        //       course: '供应链管理',
        //       content: '看到了Swoole这个插件，但不知道如何编译安装...',
        //       id: 0
        //     },
        //     {
        //       avatar: '/picture/boy5.png',
        //       title: '什么是用户？',
        //       course: '消费者行为学',
        //       content: '描述一下用户的具体行为有哪些',
        //       id: 1
        //     }
        //   ]
        // },
        questID: 0,
        inputValue: '', //搜索的内容
        page: 0
        
    },

    /**
     * 问题按钮
     * id 问题id
     * title 问题标题
     * question 问题内容
     * cover 问题封面
     */
    descriptionButton: function(event) {
        var id = event.currentTarget.dataset.questid
        var title = event.currentTarget.dataset.title;
        var question = event.currentTarget.dataset.question;
        var cover = event.currentTarget.dataset.cover;
        console.log(id)
        wx.navigateTo({
            url: '../index/answer/answer?id=' + id + "&title=" + title + "&question=" + question + "&cover=" + cover
        })

    },

    /**
     * 添加按钮
     * id:问题按钮
     */
    questButton: function(event) {
        var questID = event.currentTarget.dataset.questid;
        questID = questID + 1

        this.setData({
            questID: questID
        })
        // console.log(questID);
        wx.navigateTo({
            url: '../question/ask/ask?id=' + questID,
        })





        // wx.navigateTo({
        //   url: '',
        // })
    },

    /**
     * 搜索框
     */
    inputBind: function(event) {
        this.setData({
            inputValue: event.detail.value
        })
        console.log('bindInput' + this.data.inputValue)

    },

    /**
     * 搜索按钮
     */
    query: function(event) {
        //var url = ""
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
            success: function(res) {
                console.log(res.data)
                //设置缓存
                wx.setStorage({
                    key: 'searchLists',
                    data: {
                        searchLists: res.data
                    }
                })
                if (!that.data.inputValue) {
                    //友情提示
                    wx.showToast({
                        title: '请输入搜索词',
                        image: '../../picture/tear.png',
                        duration: 2000,
                    })
                } else {
                    wx.navigateTo({
                        url: '../search/search',
                    })
                }

            }
        })
    },


   


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this
  
        /**
         * 获取热点提问列表API
         * page_start int 分页范围起始值 ; 这里是 0
         * page_length   分页范围长度 ; 这里是 5
         */
        wx.request({

            url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_hotissue/0/5',
            method: 'GET',
            data: {

            },
            success: function (res) {
                console.log(res.data);
                console.log(res);
                that.setData({
                    quesLists: res.data
                })
                //设置缓存
                wx.setStorage({
                    key: 'storage',
                    data: {
                        Lists: res.data
                    },
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                })
            },
            fail: function (res) {
                // doing something here with you like...
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
             * page_length   分页范围长度 ; 这里是 5
             */
            wx.request({
                url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_hotissue/' + this.data.page + '/' + '5',
                data: '',
                header: {},
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: function (res) {
                    var page = that.data.page;
                    page = page - 1;
                    that.setData({
                        page,
                        Lists: res.data
                    })
                    //设置缓存
                    wx.setStorage({
                        key: 'storage',
                        data: {
                            Lists: res.data
                        },
                        success: function (res) {
                            wx.getStorageSync('storage')
                        },
                        fail: function (res) { },
                        complete: function (res) { },
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
         * page_length   分页范围长度 ; 这里是 5
         */
        wx.request({
            url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_hotissue/' + this.data.page + '/' + '5',
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                var page = that.data.page;
                page = page + 1;
                that.setData({
                    page,
                    Lists: res.data
                })
                //设置缓存
                wx.setStorage({
                    key: 'storage',
                    data: {
                        Lists: res.data
                    },
                    success: function (res) {
                        wx.getStorageSync('storage')
                    },
                    fail: function (res) { },
                    complete: function (res) { },
                })
                // console.log(res.data)
            },
            fail: function (res) { },
            complete: function (res) { },
        })
        console.log('circle 下一页');
    }


})