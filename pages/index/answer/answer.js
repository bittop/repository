var app = getApp()
// pages/index/answer/answer.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //测试数据  
        subject: {
            //   elements:
            //     {
            //     topicText: '如果你无法简洁的表达你的想法，那只说明还不够了解它。——阿尔伯特.爱因斯坦',
            //     topicPic:'/picture/c4.png'
            //     },
            // list: [{
            //         avatar: '/picture/boy5.png',
            //         txtTitle: 'PHP Swoole如何编译？',
            //         txtAnswer: '看到了Swoole这个插件，但不知道如何编译安装...'
            //     },
            //     {
            //         avatar: '/picture/boy5.png',
            //         txtTitle: 'PHP Swoole如何编译？',
            //         txtAnswer: '看到了Swoole这个插件，但不知道如何编译安装...'
            //     },
            //     {
            //         avatar: '/picture/boy5.png',
            //         txtTitle: 'PHP Swoole如何编译？',
            //         txtAnswer: '看到了Swoole这个插件，但不知道如何编译安装...'
            //     },
            //     {
            //         avatar: '/picture/boy5.png',
            //         txtTitle: 'PHP Swoole如何编译？',
            //         txtAnswer: '看到了Swoole这个插件，但不知道如何编译安装...'
            //     }
            // ]
        },
        comment: '',
        num: 0,
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isShow: false
    },


    //表单提交按钮    
    submit: function(event) {
        var submit = event.detail
        console.log(submit)
    },

    //查看品论按钮
    showFrom: function(e) {
        var params = e.currentTarget.dataset.param;
        console.log(params);
        this.setData({
            isShow: params == 1 ? (this.data.isShow ? false : true) : false
        })
    },

    //评论内容
    commentInput: function(e) {
        console.log(e.detail.value)
        this.setData({
            comment: e.detail.value
        })
    },


    //提交按钮
    formbtn: function(res) {
        var that = this;

        //获取用户头像
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


        //回复数
        // let num = this.data.num; //数量
        // num = num + 1;
        // var Number = parseInt(num)
        // console.log(Number)
        // this.setData({
        //     num: Number
        // });

        //回复评论

        var comment = this.data.comment;
        console.log(comment)

        //回复问题
        var quesTitle = this.data.quesContent;


        //回复生成sub_id   
        let num = this.data.num; //数量
        num = num + 1;
        var Number = parseInt(num)
        // console.log(Number)
        this.setData({
            num: Number
        });

        var sub_id = this.data.num;
        console.log(sub_id)

        //获取当前时间戳
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);


        if (comment !== "") {
           
           /**
            * 提交评论（包括作业解析评论/帖子等）API
            * sub_id int 评论所属作业/帖子的sub_id
            * u_id int 发布评论的用户u_id
            * parent int 父级评论的com_id（获取评论时每条评论会有该值）
            * text string 评论内容
            * date string 评论发布日期时间戳（10位时间戳，非时间格式）
            */
            wx.request({
                url: 'https://localhost/proj_online_class/server/public/index.php/forum/forum/get_comment_submit',
                data: {
                    sub_id: sub_id,
                    u_id: 3,
                    parent: 1, // 0即主评论，直接回复楼主的评论
                    date: timestamp,
                    text: comment
                },
                header: {
                    'content-type': 'application/json'
                },
                method: 'post',
                dataType: 'json',
                responseType: 'text',
                success: function(res) {

                },
                fail: function(res) {},
                complete: function(res) {},
            })
        } else {
            //友好提示
            wx.showToast({
                title: '请输入',
                image: '../../../picture/tear.png',
                duration: 2000,
            })
        }


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {


        //从首页获取到的问题id
        var sub_id = options.sub_id
        console.log(sub_id)
        this.setData({
            sub_id: sub_id
        })

        //从首页获取到的问题
        var question = options.question
        console.log(question)
        this.setData({
            quesContent: question
        })

        //从首页获取打的提问图片
        var cover = options.cover
        console.log(cover)
        this.setData({
            coverImg: cover
        })

        //提问图片是否显示
        if (cover == null) {
            this.setData({
                display: false
            })
        }

        var that = this;
        // console.log(sub_id);

        //题目请求
        //    wx.request({
        //      url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_hoticontent/'+this.data.sub_id,
        //      data: '',
        //      header: {},
        //      method: 'GET',
        //      dataType: 'json',
        //      responseType: 'text',
        //      success: function(res) {
        //       console.log(res.data)
        //       that.setData({
        //         topicLists:res.data
        //       })
        //       wx.setStorage({
        //         key: 'topicListsStorage',
        //         data: {
        //           topicLists: res.data
        //         },
        //         success: function (res) {
        //           wx.getStorageSync('topicListsStorage')
        //         },
        //         fail: function (res) { },
        //         complete: function (res) { },
        //       })
        //      },
        //      fail: function(res) {},
        //      complete: function(res) {},
        //    })

        /**
         * 获取帖子评论 API
         * sub_id 需要获取评论的题目/帖子的sub_id
         */
        wx.request({
            url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_issuecomment/' + this.data.sub_id,
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                console.log(res.data)
                that.setData({
                    commentLists: res.data
                })

                //设置获取帖子评论API
                wx.setStorage({
                    key: 'commentListsStorage',
                    data: {
                        commentListsStorage: res.data
                    },
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {},
                })
            },
            fail: function(res) {},
            complete: function(res) {},
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

    }
})