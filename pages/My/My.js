// pages/My/My.js
Page({
data:{
id:''
},
lianxi(){
  wx.makePhoneCall({
    phoneNumber: '10086' //仅为示例
  });
},
  onLoad: function (options) {
    var that = this;
    //发起网络请求
    if (!wx.getStorageSync('id')) {
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    } else {
      wx.request({
        url: 'https://exam.qhynice.top/index.php/Api/Login/authlogin',
        data: {
          openid: wx.getStorageSync('openids'),
          NickName: wx.getStorageSync('nickNames'),
          HeadUrl: wx.getStorageSync('avatarUrls'),
          gender: wx.getStorageSync('genders'),
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        //请求ID
        success: function (res) {
          var id = res.data.arr.ID
          console.log(res)
          that.setData({
            id: id
          })
        }
      })
    }
  },
})