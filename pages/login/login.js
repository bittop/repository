var app = getApp()
Page({
  data: {
    motto: '欢迎登录',
    userName: '',
    userPassword: '',
    code:'',
    id_token: '', //方便存在本地的locakStorage
    response: '' //存取返回数据
  },
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput: function(e) {
    this.setData({
      userPassword: e.detail.value
    })
    // console.log(e.detail.value)
  },
 
  logIn: function(e) {
    var that = this
    wx.login({
      success: function (res) {
        //console.log(res.code)
        if(res.code){
          wx.request({
            url: '',
            data: {
              username: that.data.userName,
              password: that.data.userPassword,
              code: that.data.code,
            },
            method: 'GET',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              that.setData({
                id_token: res.data.id_token,
                response: res
              })
              try {
                wx.setStorageSync('id_token', res.data.id_token)
              } catch (e) { }
              wx.navigateTo({
                url: '../pages/index/index'
              })
              console.log(res.data);
            },
            fail: function (res) {
              console.log(res.data);
              //console.log('is failed')
              wx.showToast({
                title: '请登录',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
        },
      fail: function (res) {
        
       }
    })
    
  },
  register:function(e){

  }
})