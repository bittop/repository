// pages/my/class/class.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //测试数据
        //     subject:{
        //       elements:
        //         {

        //         },
        //       list:
        //       [
        //         {
        //           classPic:'/picture/laravel.png',
        //           className:'婚恋-职场-人格',
        //           teacher:'雷五明',
        //           courseID:0
        //         },
        //         {
        //           classPic: '/picture/laravel.png',
        //           className: '婚恋-职场-人格',
        //           teacher: '雷五明',
        //           courseID: 1
        //         },
        //         {
        //           classPic: '/picture/laravel.png',
        //           className: '婚恋-职场-人格',
        //           teacher: '雷五明',
        //           courseID: 2
        //         },
        //         {
        //           classPic: '/picture/laravel.png',
        //           className: '婚恋-职场-人格',
        //           teacher: '雷五明',
        //           courseID: 3
        //         }
        //       ]
        //     },
        //     classID:0
        //   },

    },

    /**
     * 添加课程
     */
    classButton: function(event) {
        var classID = event.currentTarget.dataset.classid;
        classID = classID + 1
        this.setData({
            classID: classID
        })
        // console.log(questID);
        wx.navigateTo({
            url: '../class/addcourse/addcourse?id=' + classID,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /**
         * u_id 用户id
         */
        var u_id = options.u_id
        this.setData({
            u_id
        })

        var that = this;

        /**
         * u_id 用户id
         * 向后台 请求课程数据
         */
        wx.request({
            url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_course/' + this.data.u_id,
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                console.log(res.data)
                that.setData({
                    myCourseLists: res.data
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