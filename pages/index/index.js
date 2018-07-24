const app = getApp()
// pages/index/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchPic: '/picture/search.png',
        //测试数据
        // subject: {
        //   elements:
        //   {
        //     avatar: '/picture/boy5.png',
        //     searchPic: '/picture/search.png'
        //   },

        //   list:
        //   [
        //     {
        //       title: 'PHP Swoole 如何编译？',
        //       question: '看到了Swoole这个插件，但不知道如何编译安装...',
        //       course: '供应链管理',
        //       id: '0'
        //     },
        //     {
        //       title: 'PHP Swoole 如何编译？',
        //       question: '看到了Swoole这个插件，但不知道如何编译安装...',
        //       course: '消费者行为学',
        //       id: '1'
        //     },
        //     {
        //       title: 'PHP Swoole 如何编译？',
        //       question: '看到了Swoole这个插件，但不知道如何编译安装...',
        //       course: 'PHP',
        //       id: '2'
        //     },
        //     {
        //       title: 'PHP Swoole 如何编译？',
        //       question: '看到了Swoole这个插件，但不知道如何编译安装...',
        //       course: 'PHP',
        //       id: '3'
        //     }
        //   ],


        // },
        page: 0,
        inputValue: '', //搜索的内容
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    /**
     * 热点问题按钮
     * sub_id 帖子id
     * question 问题
     * cover 封面
     */
    problemButton: function(event) {
        var sub_id = event.currentTarget.dataset.sub_d;
        var question = event.currentTarget.dataset.question;
        var cover = event.currentTarget.dataset.cover;
        console.log(cover)
        console.log(sub_id)

        /**
         * 跳转到回答页面
         * sub_id 帖子id
         * question 帖子题目
         * cover 帖子封面
         */
        wx.navigateTo({
            url: '../index/answer/answer?sub_id=' + sub_id + "&question=" + question + "&cover=" + cover,
        })
    },

    /**
     * 课程归类按钮
     * sub_id 帖子id
     * courseName 课程名字 
     */
    courseButton: function(event) {
        var sub_id = event.currentTarget.dataset.sub_id;
        var courseName = event.currentTarget.dataset.coursename;
        // console.log(courseName);

        /**
         * 跳转到问题页面
         * sub_id 帖子id
         * course 课程
         */
        wx.navigateTo({
            url: '../index/question/question?sub_id=' + sub_id + '&course=' + courseName
        })

    },

    //搜索框文本内容显示
    inputBind: function(event) {
        this.setData({
            inputValue: event.detail.value
        })
        console.log('bindInput' + this.data.inputValue)

    },

    /**
     * 搜索执行按钮
     */
    query: function(event) {

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
                var searchData = res.data
                that.setData({
                    searchData
                })

                /**
                 * 把 从get_issue_searchAPI 
                 * 获取 提问帖子搜索 的数据 设置缓存
                 */
                wx.setStorage({
                    key: 'searchLists',
                    data: {
                        searchLists: res.data
                    }
                })

                /**
                 * 设置 模糊搜索
                 */
                if (!that.data.inputValue) {
                    //没有搜索词 友情提示
                    wx.showToast({
                        title: '请重新输入',
                        image: '../../picture/tear.png',
                        duration: 2000,
                    })
                } else if (searchData.search.length == 0) {
                    //搜索词不存在 友情提示
                    wx.showToast({
                        title: '关键词不存在',
                        image: '../../picture/tear.png',
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

                        /**
                         * 根据关键词 跳转到 search搜索页面
                         */
                        wx.navigateTo({
                            url: '../search/search',
                        })
                    }
                }



            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;

        /**
         * 获取个人用户的头像
         */
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        /**
         * 获取热点提问列表
         * page_start int 分页范围起始值 ; 这里是 0
         * page_length   分页范围长度 ; 这里是4
         */
        wx.request({
            url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_hotissue/0/4',
            method: 'GET',
            data: {

            },
            success: function(res) {
                console.log(res.data);
                console.log(res);
                that.setData({
                    Lists: res.data
                })

                /**
                 *设置热点提问列表缓存 
                 */
                wx.setStorage({
                    key: 'storage',
                    data: {
                        Lists: res.data
                    },
                    success: function(res) {
                        wx.getStorageSync('storage')
                    },
                    fail: function(res) {},
                    complete: function(res) {},
                })
            },
            fail: function(res) {
                // doing something here with you like...
            }
        })
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },


    //上拉刷新上一页
    onPullDownRefresh: function() {
        var that = this;
        // Do something when pull down.
        console.log('刷新');
        if (this.data.page >= 1) {

            /**
             * 获取热点提问列表
             * page_start int 分页范围起始值 ; 这里是this.data.page
             * page_length   分页范围长度 ; 这里是 4
             */
            wx.request({
                url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_hotissue/' + this.data.page + '/' + '4',
                data: '',
                header: {},
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: function(res) {
                    var page = that.data.page;
                    page = page - 1;
                    that.setData({
                        page,
                        Lists: res.data
                    })

                    //设置上拉刷新的缓存
                    wx.setStorage({
                        key: 'storage',
                        data: {
                            Lists: res.data
                        },
                        success: function(res) {
                            wx.getStorageSync('storage')
                        },
                        fail: function(res) {},
                        complete: function(res) {},
                    })
                },
                fail: function(res) {},
                complete: function(res) {},
            })
        }
    },


    //下拉刷新下一页
    onReachBottom: function() {
        var that = this;
        // Do something when page reach bottom.

        /**
         * 获取热点提问列表
         * page_start int 分页范围起始值 ; 这里是this.data.page
         * page_length   分页范围长度 ; 这里是 4
         */
        wx.request({
            url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_hotissue/' + this.data.page + '/' + '4',
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                console.log(res.data)
                var page = that.data.page;
                page = page + 1;
                that.setData({
                    page,
                    Lists: res.data
                })

                //设置下拉刷新缓存
                wx.setStorage({
                    key: 'storage',
                    data: {
                        Lists: res.data
                    },
                    success: function(res) {
                        wx.getStorageSync('storage')
                    },
                    fail: function(res) {},
                    complete: function(res) {},
                })
                // console.log(res.data)
            },
            fail: function(res) {},
            complete: function(res) {},
        })
        console.log('circle 下一页');
    },


})