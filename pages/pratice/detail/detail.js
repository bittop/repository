// pages/pratice/detail/detail.js
// pages/pratice/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //界面静态数据
        elements:
        {
            resultTitle: '练习进度',
            subIndex: 1,
            current: 0,
            suresub: '单项选择',
            unsuresub: '不定项选择',
            analyTagTextLeft:'此题答错，正确选项:',
            analyTagTextRight:'，你的选项:',
            selecTip: 'Tips:紫色是没有做的哦~，点击题号返回检查^^',
            nullSelecTip: '这里空空如也~，小哥哥小姐姐快去做题吧^^',
            mscX: ''
        },
        //题目动态数据
        subject:
        {
            elements:
            {
                title: 'PHP基础实战'
            },
            list:
            [
                {
                    subType: 'unsure',
                    subContext: 'okenizer函数提供了一个内嵌在Zend引擎的"PHP tokenizer"的调用接口。使用这些函数，你可以写出你自己的PHP源码分析或者修改工具，而无需处理词法分析级别上的语言规范。okenizer函数提供了一个内嵌在Zend引擎的"PHP tokenizer"的调用接口。使用这些函数，你可以写出你自己的PHP源码分析或者修改工具，而无需处理词法分析级别上的语言规范。okenizer函数提供了一个内嵌在Zend引擎的"PHP tokenizer"的调用接口。使用这些函数，你可以写出你自己的PHP源码分析或者修改工具，而无需处理词法分析级别上的语言规范。',
                    subOptions: [
                        {
                            subOptIndex: 'A',
                            subOptContext: '5454412121sdsdd'
                        },
                        {
                            subOptIndex: 'B',
                            subOptContext: 'dfsfsfdsfsfsdf'
                        },
                        {
                            subOptIndex: 'C',
                            subOptContext: 'tydsfgafssfaadfs'
                        },
                        {
                            subOptIndex: 'D',
                            subOptContext: 'dfsdfsdfsdfsdfsdfsd'
                        },
                        {
                            subOptIndex: 'E',
                            subOptContext: 'sdffewfasfasfgdsgvfdfs'
                        },
                        {
                            subOptIndex: 'F',
                            subOptContext: '54erer34fdgdfgfdsdd'
                        }
                    ]
                },
                {
                    subType: 'sure',
                    subContext: '数提供了一个内嵌在Zend引擎的"PHP tokenizer"的调用接口。使用这些函数，你可以写出你自己的PHP源码分析或者修改工具，而无需处理词法分析级别上的语言规范。okenizer函数提供了',
                    subOptions: [
                        {
                            subOptIndex: 'A',
                            subOptContext: '5454412121sdsdd'
                        },
                        {
                            subOptIndex: 'B',
                            subOptContext: 'dfsfsfdsfsfsdf'
                        },
                        {
                            subOptIndex: 'C',
                            subOptContext: 'tydsfgafssfaadfs'
                        },
                        {
                            subOptIndex: 'D',
                            subOptContext: 'dfsdfsdfsdfsdfsdfsd'
                        }
                    ]
                }
            ],
            subTrueOpt: [['A','B','F'],'C'],
            //用户选择项数组
            select: '',
            //界面验证数组
            selectArr: '',
            mode:false
        }
    },
    /**
     * 更新当前做题页面进度
     * 设置导航标题
     * @param e event
     * @return int subIndex
     */
    bindSwiperChange: function (e) {
        var current = parseInt(e.detail.current + 1)
        //排除结果概览页面
        if (current <= this.data.subject.list.length) {
            wx.setNavigationBarTitle({
                title: this.data.subject.elements.title + ' ' + current + '/' + this.data.subject.list.length,
            })
        }
        //结果概览页面
        if (current > this.data.subject.list.length) {
            wx.setNavigationBarTitle({
                title: this.data.elements.resultTitle + ' ' + parseInt(current - 1) + '/' + this.data.subject.list.length
            })
        }
        console.log('currentSub:' + current)
    },
    /**
     * 获取题目的用户选择项
     * @param e event
     * @return Array/Bool subject.select 某题的某选项
     */
    bindOptChange: function (e) {
        var subid = e.currentTarget.dataset.subid
        var checked = e.detail.value
        var userSelect = {}
        for (var i = 0; i < this.data.subject.list[subid].subOptions.length; i++) {
            if (checked.indexOf(this.data.subject.list[subid].subOptions[i].subOptIndex) !== -1) {
                userSelect['subject.select[' + subid + '][' + i + '].checked'] = true
            } else {
                userSelect['subject.select[' + subid + '][' + i + '].checked'] = false
            }
        }
        this.setData(userSelect)
        this.setData({
            ['subject.userValue[' + subid + ']']:checked
        })
        for (var j = 0; j < this.data.subject.select[subid].length; j++) {
            if (this.data.subject.select[subid][j].checked == true) {
                this.setData({
                    ['subject.selectArr[' + subid + ']']: true
                })
                break
            } else {
                this.setData({
                    ['subject.selectArr[' + subid + ']']: false
                })
            }
        }
    },
    /**
     * 捕获滑动操作起点
     * @param e event
     * @return String mscX 起点clientX位置
     */
    touchMoveRight: function (e) {
        var mscX = e.changedTouches[0].clientX
        this.setData({
            ["elements.mscX"]: mscX
        })
    },
    /**
     * 捕获滑动操作终点，并计算是否右划，
     * 弹出modal是否跳转结果页
     * @param e event
     */
    touchMoveEnd: function (e) {
        //获取点击位置起始点和结束点
        var mecX = e.changedTouches[0].clientX
        var mscX = this.data.elements.mscX
        var subject = this.data.subject
        console.log(subject)
        //判断是否有右划操作
        if ((mscX - mecX) > 0) {
            wx.showModal({
                //弹出窗口确认是否提交
                title: '是否确认提交？',
                content: '提交后将直接进行阅卷，不可进行修改',
                cancelText: '返回检查',
                confirmText: '确认提交',
                confirmColor: '#00a2F6',
                success: function (res) {
                    if (res.confirm === true) {
                        console.log('click.true')
                        //点击确认后直接关闭当前页面
                        wx.setStorage({
                            key: 'subject',
                            data: subject,
                        })
                        wx.redirectTo({
                            url: '../result/result',
                        })


                        //时间戳
                        var timestamp = Date.parse(new Date());
                        timestamp = timestamp / 1000;
                        console.log("当前时间戳为：" + timestamp);

                        //提交作业
                        wx.request({
                            url: 'https://loalhost/proj_online_class/server/public/index.php/forum/forum/get_comment_submit',
                            data: {
                                sub_id: 3,
                                u_id: 3,
                                date: timestamp
                            },
                            header: {},
                            method: 'GET',
                            dataType: 'json',
                            responseType: 'text',
                            success: function(res) {},
                            fail: function(res) {},
                            complete: function(res) {},
                        })
                    } else {
                        //返回当前页面
                        console.log('false')
                    }
                }
            })
        }
    },
    /**
     * 点击题号返回对应swiper-item
     */
    bindBackToSwiper: function (e) {
        this.setData({
            ["elements.current"]: e.currentTarget.dataset.current
        })
        console.log('返回了第' + this.data.elements.current + '个swiper-item')
    },
    /**
     * 生命周期函数--监听页面加载
     * 接收pratice页面传参（subuniqueId）
     * 渲染题目序号，设置导航栏
     */
    onLoad: function (options) {
        wx.request({
            url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_teskcontent/3',
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                that.setData({
                    taskList:res.data
                })
            },
            fail: function(res) {},
            complete: function(res) {},
        })


        var that = this
        wx.getStorage({
            key: 'subject',
            success: function(res) {
                that.setData({
                    subject:res.data
                })
                console.log(res.data)
                wx.clearStorage()
            },
        })
        console.log('用户点击的uniqueid:' + options.subUniqueId)
        //页面初次加载渲染题目序号
        wx.setNavigationBarTitle({
            title: this.data.subject.elements.title + ' ' + this.data.elements.subIndex + '/' + this.data.subject.list.length,
        })
    },

})