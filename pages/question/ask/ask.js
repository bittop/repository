var app = getApp()
// pages/question/ask/ask.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: ['婚恋-职场-人格', '中医与诊断-学做自己的医生', '当代青年心理学', '心理学与生活'],
        productInfo: {},


    },

    formSubmit: function(event) {

        //回复生成sub_id   
        let num = this.data.num; //数量
        num = num + 1;
        var Number = parseInt(num)
        // console.log(Number)
        this.setData({
            num: Number
        });


        //测试数据的用户u_id
        var u_id = 3;
        var submit = event.detail
        // console.log(submit)
        var submitValue = submit.value;
        
        console.log(submitValue);
    
       
        this.setData({
            submitValues: submitValue,
            u_id:u_id
        })
        //console.log(this.data.submitValues.inputTitle);
        //text 内容
        var inputTitles = this.data.submitValues.inputTitle;
        var inputContents = this.data.submitValues.inputContent;
        // console.log(inputTitles);
        // console.log(inputContents);


        

        var sub_id = this.data.num;

        //u_id
        var u_id = this.data.num;

        //parent


        //c_id
        // var c_id = this.data.index
        // console.log(c_id)

        //cover
        var cover = this.data.cover;

        //获取当前时间戳
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);


        //上传回帖信息到服务器哦
        if (inputTitles && inputContents !== null) {
            wx.request({
                url: 'https://localhost/proj_online_class/server/public/index.php/forum/forum/get_issue_submit/',
                data: {
                    sub_id: sub_id,
                    c_id: 3,
                    textInputTitles: inputTitles,
                    textInputContents: inputContents,
                    stime: timestamp,
                    type:'tesk',
                    cover: [cover]

                },
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: 'POST',
                dataType: 'json',
                responseType: 'text',
                success: function(res) {
                    wx.setStorage({
                        key: 'reply',
                        data: '',
                        success: function(res) {},
                        fail: function(res) {},
                        complete: function(res) {},
                    })
                    console.log(res.data)
                    console.log("成功")
                },
                fail: function(res) {},
                complete: function(res) {},
            })


        }

    },

    bindPickerChange:function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },

    chooseImage: function() {
        var that = this;
        wx.chooseImage({ //手机上传照片 
            success: function(res) {
                var tempFilePaths = res.tempFilePaths; //小程序产生的临时路径
                that.setData({
                    cover: tempFilePaths
                })
                wx.uploadFile({ //上传文件的接口;
                    url: 'https:/loalhost/proj_online_class/server/public/index.php/forum/forum/get_image_upload', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        'user': 'test'
                    },
                   
                    success: function(res) {
                        var data = res.data
                        console.log(data)
                        //do something
                    }
                })
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        
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