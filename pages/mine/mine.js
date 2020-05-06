// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
    /**
   * 页面的初始数据
   */
  data: {
    ImageBase64Str:''
  },
  onLoad:function(){
    var that = this
    if (!wx.getStorageSync('id')) {
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    }else{
      wx.request({
        url: 'https://exam.qhynice.top/index.php/Api/User/getWxcode',
        data: {
          invite_code: 186
        },
        header: { 'content-type': 'application/json' },        
        method: 'GET',
        success: res=> {//二级用户返回参数
        // console.log(res.data)
        that.setData({
          ImageBase64Str:res.data
         })
        },
      })//二级用户请求结尾
    }
  }
})