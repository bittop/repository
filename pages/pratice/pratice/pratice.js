// pages/pratice/pratice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //测试数据
    // subject:
    // {
    //     elements:
    //     {
    //         title: 'PHP基础实战'
    //     },
    //     list:
    //     [
    //         {
    //             subUniqueId:'0',
    //             subTitle:'PHP作业1zuoye作业作业还好撒好得很sad那是你对方那是你的繁琐的烦恼了',
    //             subCover: '/picture/laravel.png',
    //             timeStamp: '今天',
    //             subProgress:'50%',
    //         },
    //         {
    //             subUniqueId: '1',
    //             subTitle: 'PHP作业2',
    //             subCover: '/picture/laravel.png',
    //             timeStamp: '今天',
    //             subProgress: '10%',
    //         },
    //         {
    //             subUniqueId: '2',
    //             subTitle: 'PHP作业3',
    //             subCover: '/picture/laravel.png',
    //             timeStamp: '昨天',
    //             subProgress: '30%',
    //         }, 
    //         {
    //             subUniqueId: '3',
    //             subTitle: 'PHP作业4',
    //             subCover: '/picture/laravel.png',
    //             timeStamp: '4月19日',
    //             subProgress: '100%',
    //         },
    //         {
    //             subUniqueId: '4',
    //             subTitle: 'PHP作业5',
    //             subCover: '/picture/laravel.png',
    //             timeStamp: '4月18日',
    //             subProgress: '100%',
    //         },
    //         {
    //             subUniqueId: '5',
    //             subTitle: 'PHP作业6',
    //             subCover: '/picture/laravel.png',
    //             timeStamp: '4月18日',
    //             subProgress: '100%',
    //         },
    //         {
    //             subUniqueId: '0',
    //             subTitle: 'PHP作业7',
    //             subCover: '/picture/laravel.png',
    //             timeStamp: '4月16日',
    //             subProgress: '100%',
    //         },
    //         {
    //             subUniqueId: '6',
    //             subTitle: 'PHP作业8',
    //             subCover: '/picture/laravel.png',
    //             timeStamp: '4月15日',
    //             subProgress: '100%',
    //         }
    //     ]
        
    // }
  },
  /**
   * 发送作业UniqueID到detail页
   */
  bindGetDetail:function(e){
    var userClickIndex = e.currentTarget.dataset.subjectitem
    var subUniqueId = this.data.teskLists.tesklist.subUniqueId
    var subUniqueId = this.data.teskLists.tesklist[userClickIndex].subUniqueId
    wx.navigateTo({
        url: '../detail/detail?subUniqueId='+ subUniqueId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this


    //请求作业
    wx.request({
      url: 'https://localhost/proj_online_class/server/public/index.php/query/query/get_tesklist/3/tesk',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data)
        that.setData({
          teskLists:res.data
        })
      },
    })
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
      wx.clearStorage()
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