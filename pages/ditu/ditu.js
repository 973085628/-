Page({
  onShow: function () {
    //初始获取定位权限
    wx.authorize({
     scope: 'scope.userLocation',
     success: (res) => {
     
     },
    })
    },
    openMap:function(e){
      var that = this
      wx.getSetting({
       success(res){
       //这里判断是否有地位权限
        if (!res.authSetting['scope.userLocation']) {
        wx.showModal({
         title: '提示',
         content: '请求获取位置权限',
         success:function(res){
         if(res.confirm==false){
          return false;
         }
         wx.openSetting({
          success(res) {
          //如果再次拒绝则返回页面并提示
          if (!res.authSetting['scope.userLocation']) {
           wx.showToast({
           title: '此功能需获取位置信息，请重新设置',
           duration: 3000,
           icon: 'none'
           })
          } else {
           //允许授权，调用地图
           that.chooseMap()
          }
          }
         })
         }
        }) 
        } else {
        //如果有定位权限，调用地图
        that.chooseMap()
        }
       
       }
       
      })
      },
       
      chooseMap(){
      var that = this
      wx.chooseLocation({
       success: function (res) {
       that.setData({
        address: res.address,
        latitude: res.latitude,
        longitude: res.longitude
       })
       },
       fail: function (res) {
       console.log(res)
       }
      })
      },
})