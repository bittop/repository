// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  typeButton:function(e){
    var typeValue = e.currentTarget.dataset.type;
    var subId = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    var question = e.currentTarget.dataset.question;
    var cover = e.currentTarget.dataset.cover;
    
    
    //console.log(typeValue);
    if(typeValue == "tesk"){
      wx.navigateTo({
          url: '../task/detail/detail?sub_id=' + subId +"&title="+title+"&question="+question+"&cover="+cover,
      })
    }else{
      wx.navigateTo({
          url: '../ques/ques?sub_id=' + subId+"&title="+title + "&question=" + question + "&cover=" + cover,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'searchLists',
      success: function (res) {
        console.log(res.data)
        that.setData({
          searchStorage: res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
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