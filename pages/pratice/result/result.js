// pages/pratice/result/result.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //静态数据
        elements:
        {
            resultTitle: '练习结果',
            continueText: ['题目解析', '全部解析', '返回首页'],
            trueTag:0,
            falseTag:0,
            waterCirlProgress:'',
            timeTag:'未知',
            trueText: '正确',
            falseText: '错误',
            scrolText: '积分+',
            icon:
            {
                time: '/picture/c1.png',
                scrol: '/picture/c2.png'
            }
        },
        //从onload获取storage数据
        subject:''
    },
    /**
     * 判断题目对错
     * 发送请求存储到服务器（发送作业号到用户作业表，作业表已经包括题目号；发送用户答案、用户积分、用户时间、到用户作业表；）
     */
    bindTrueFalseAnaly: function () {
        //用户选项
        var subUserOpt = this.data.subject.userValue
        //正确选项
        var subTrueOpt = this.data.subject.subTrueOpt
        for (var subid = 0; subid < subUserOpt.length; subid++) {
            //用户选项字符串
            var subUserOptStr = subUserOpt[subid].toString()
            //正确选项字符串
            var subTrueOptStr = subTrueOpt[subid].toString()
            if (subUserOptStr == subTrueOptStr){
                console.log('第'+subid+'题对')
                this.setData({
                    ['subject.subResult['+ subid +']']:true,
                    ['elements.trueTag']: this.data.elements.trueTag+1 
                })
            }else{
                console.log('第' + subid + '题错')
                this.setData({
                    ['subject.subResult[' + subid + ']']: false,
                    ['elements.falseTag']: this.data.elements.falseTag + 1 
                })
            }
        }
        //waterCirlProgress
        var trueTag = this.data.elements.trueTag
        var falseTag = this.data.elements.falseTag
        var truePercentage = (trueTag/(trueTag + falseTag))*100
        console.log(truePercentage + '%')
        this.setData({
            ['elements.waterCirlProgress']: truePercentage + '%'
        })
    },
    /**
     * 错题分析
     */
    bindFalseOptAnaly:function(){
        wx.navigateTo({
            url: '../detail/detail',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     * 获取detail页面的storage
     * 判断数据是否获取成功
     */
    onLoad: function (options) {
        var that = this
        wx.getStorage({
            key: 'subject',
            //成功直接更新data
            success: function(res) {
                that.setData({
                    subject:res.data
                })
                wx.clearStorage()                
            },
            //无数据直接返回上一页
            fail:function(){
                wx.showToast({
                    title: '获取答题数据失败，即将返回首页',
                    icon: 'none',
                    mask:true,
                    complete:function(){
                        //按照操作路径应该返回答题页面，但答题页面使用了redrict所以返回首页
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                })
            }
        })
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     * 给detail作业号，detail找到对应作业
     * 给detail参数，让其选择做题模式或解析模式
     * 离线版暂时用本地存储代替，直接发送整个subject
     */
    onReady: function () {
        this.bindTrueFalseAnaly()
        this.setData({
            ['subject.mode']: true
        })
        wx.setStorage({
            key: 'subject',
            data: this.data.subject,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setStorage({
            key: 'subject',
            data: this.data.subject,
        })
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