const app = getApp()
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
        //       content: '看到了Swoole这个插件，但不知道如何编译安装...'
        //     }
        //   ]
        // },
        inputValue: '',//搜索的内容
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    //问答按钮
    descriptionButton: function (event) {
        // var id = event.currentTarget.dataset.postid
        // console.log(id)
        /**
         * subUniqueId 帖子id
         * subTitle 帖子标题
         * subCover 帖子封面
         */
        var subUniqueId = event.currentTarget.dataset.subid;
        var subTitle = event.currentTarget.dataset.title;
        var subCover = event.currentTarget.dataset.cover;
    
        console.log(subCover)

        /**
         * 跳转到我的问答
         * subUniqueId 帖子id
         * subTitle 帖子标题
         * subCover 帖子封面
         */
        wx.navigateTo({
            url: '../myAnswer/myAnswer?subUniqueId='+subUniqueId + "&subTitle=" + subTitle + "&subCover=" + subCover,
        })

    },


    inputBind: function (event) {
        this.setData({
            inputValue: event.detail.value
        })
        console.log('bindInput' + this.data.inputValue)
    },

    //搜索
    // query: function (event) {
    //     var that = this
    //     wx.request({
    //         url: 'https://localhost/proj_online_class/server/public/index.php/forum/forum/get_issue_search/' + this.data.inputValue + /0/,
    //         data: { inputValue: this.data.inputValue },
    //         method: 'GET',
    //         success: function (res) {
    //             console.log(res.data)
    //             wx.setStorage({
    //                 key: 'searchLists',
    //                 data: {
    //                     searchLists: res.data
    //                 }
    //             })
    //             if (!that.data.inputValue) {
    //                 wx.showToast({
    //                     title: '请输入搜索词',
    //                     image: '../../picture/tear.png',
    //                     duration: 2000,
    //                 })
    //             } else {
    //                 wx.navigateTo({
    //                     url: '../../search/search',
    //                 })
    //             }

    //         }
    //     })
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // var postID = options.id
        // this.setData({
        //     id: postID
        // })

        /**
         * u_id:3 用户id为3
         */
        var u_id = options.u_id
        console.log(u_id);
        this.setData({
            u_id
        })

        //获取用户个人头像
        var that = this;
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

        var that = this

        
        /**
         * 获取发帖列表API
         * u_id:int 需要获取作业/发帖的对应用户u_id
         * type string [ques,tesk] 需要获取的内容，问题贴/作业
         */
        wx.request({
            url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_tesklist/'+this.data.u_id+'/ques',
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                //console.log(res.data)
                that.setData({
                    personalList: res.data
                })
            },
            fail: function(res) {},
            complete: function(res) {},
        })
        // wx.getStorage({
        //     key: 'quesList',
        //     success: function (res) {
        //         console.log(res.data)
        //         var quesList = res.data
        //         that.setData({
        //             personalLists: quesList
        //         })
        //     },
        //     fail: function (res) { },
        //     complete: function (res) { },
        // })








    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})