
// pages/index/answer/answer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject: {
      elements:
      {
        topicText: '如果你无法简洁的表达你的想法，那只说明还不够了解它。——阿尔伯特.爱因斯坦',
        topicPic: '/picture/c4.png'
      },
      list:
      [
        {
          avatar: '/picture/boy5.png',
          txtTitle: 'PHP Swoole如何编译？',
          txtAnswer: '看到了Swoole这个插件，但不知道如何编译安装...'
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
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