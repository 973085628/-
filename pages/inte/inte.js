// pages/integral/integral.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userNames: '',
    userNamese: '',
    userNamesr: '',
    userNamesn: '',
    jifen:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    var that = this
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/userinfo',
      data: {
        uid: wx.getStorageSync('id')
      },
      method: 'POST',
      header: {'content-type': 'application/x-www-form-urlencoded'}, 
      success: res=> {
        console.log(res.data.userinfo.jifen)
        that.setData({
          jifen:res.data.userinfo.jifen
        })
      }
    })
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/User/pending',
      data: {
        uid: wx.getStorageSync('id')
      },
      method: 'POST',
      header: {'content-type': 'application/x-www-form-urlencoded'}, 
      success: res=> {
        console.log(res.data.data)
        that.setData({
        shenhe:res.data.data
        })
      }
    })
  },
  userNameInput: function (e) {
    var that = this
    that.setData({
      userName: e.detail.value
    })
  },
  userNameInputs: function (e) {
    var that = this
    that.setData({
      userNames: e.detail.value
    })
  },
  userNameInputse: function (e) {
    var that = this
    that.setData({
      userNamese: e.detail.value
    })
  },
  userNameInputsr: function (e) {
   var that = this
    console.log(e.detail.value)
    that.setData({
      userNamesr: e.detail.value
    })
  },
  userNameInputsn: function (e) {
    var that = this
    that.setData({
      userNamesn: e.detail.value
    })
  },

 
  loginBtnClick: function (e) {
        var that = this;
        //发起网络请求
      if (!wx.getStorageSync('id')) {
        wx.navigateTo({
          url: '../../pages/login/login',
        })
      } else {
        wx.request({
          url: 'https://exam.qhynice.top/index.php/Api/User/withdraw',
          data: {
            uid: wx.getStorageSync('id'),
            name: that.data.userName,
            tel: that.data.userNames,
            account: that.data.userNamese,
            num: that.data.userNamesr,
            jifen: that.data.userNamesn * 0.9
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            if(that.data.userName==""){
              wx.showModal({
                title: '提示',
                content: '姓名不能为空',
              })
            }else if(that.data.userNames==""){
              wx.showModal({
                title: '提示',
                content: '收款人电话不能为空',
              })
            }
            else if(that.data.userNamese==""){
              wx.showModal({
                title: '提示',
                content: '提现账号不能为空',
              })
            }else if(that.data.userNamesr==""){
              wx.showModal({
                title: '提示',
                content: '提现金额不能为空',
              })
            }
            else{
              wx.showModal({
                title: '提示',
                content: '申请成功',
              })
            }
            console.log(res)
          }
        })
      }
  },

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})