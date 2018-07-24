// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //测试数据
        subject: {
            // elements:
            //   {
            //     medal:'/picture/medal5.png',
            //     honor:'超凡大师',
            //     answerPoints:'2100',
            //     aqIntergral:'249',
            //     usingIntergral:'15'
            //   },
            list: [{
                    logo: '/picture/boy1.png',
                    text: '我的问答'
                },
                {
                    logo: '/picture/boy2.png',
                    text: '我的课程'
                },
                {
                    logo: '/picture/boy3.png',
                    text: '我的勋章'
                }
            ]
        }
    },

    //我的问答按钮
    questButton: function(e) {

        // var id = e.currentTarget.dataset.id;
        // console.log(id);


        /**
         * 跳转到 我的问答
         * u_id 用户的id
         */
        var u_id = this.data.u_id;
        wx.navigateTo({
            url: '../../../myQues/myQues?u_id=' + u_id,
        })

    },

    //我的课程按钮
    courseButton: function() {
        /**
         * 跳转到 我的课程
         * u_id 用户id
         */
        var u_id = this.data.u_id;
        wx.navigateTo({
            url: '../my/class/class?u_id=' + u_id,
        })
    },

    // medalButton: function() {
    //     wx.navigateTo({
    //         url: '../my/medal/medal',
    //     })
    // },

    itemButton: function() {

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /**
         * u_id:3 用户id
         */
        var u_id = 3;
        this.setData({
            u_id
        })

        var that = this;
        /**
         * 获取页面初始化数据API
         * length 页面分页长度
         * u_id 用户id
         */
        wx.request({
            url: 'http://localhost/proj_online_class/server/public/index.php/query/query/get_init',

            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                console.log(res.data);
                that.setData({
                    Lists: res.data
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