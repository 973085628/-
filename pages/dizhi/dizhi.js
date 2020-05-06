Page({
  data: {
    address:[],
    delBtnWidth: 180,
    // name:'',//用户名
    // photo:'',//手机号
    // address:'',//地址
  },
  onLoad() {
    var that = this
    wx.request({
      url: 'https://star.qhynice.top/api/address/getaddress',
      data: {
        user_id:64
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res=> {
      //  console.log(res)
      that.setData({
        address:res.data.res
      })
      }
    })
  },
 
  // onLoad: function (options) {
  //   //获取收货地址 省略
  // },
 xinzeng:function (){
  wx.navigateTo({
    url: '/pages/xinzeng/xinzeng',
  })
 },
 dian(e){
  console.log(e)
  wx.setStorageSync("addressid", e.currentTarget.dataset.message.id)
  wx.navigateTo({
    url: "../Order/Order"
  })
},
  edit: function (event) {
    var that =  this;
    wx.setStorageSync('aid', event.currentTarget.dataset.id)
    wx.setStorageSync('name', event.currentTarget.dataset.name)
    wx.setStorageSync('phone', event.currentTarget.dataset.phone)
    wx.setStorageSync('address', event.currentTarget.dataset.address)
    console.log(event.currentTarget)
    wx.navigateTo({
      url: "/pages/bianji/bianji"
    })
  },
 
  // add: function () {
  //   //增加收货地址 省略
  // },
 
  delItem: function (e) {//删除按钮
    var id = e.currentTarget.dataset.id;//获取到当前id
    console.log(id)
    var index = e.currentTarget.dataset.index;
    this.data.address.splice(index, 1);
    this.setData({
      address: this.data.address
    })
    wx.request({
      url: 'https://star.qhynice.top/api/address/del_adds',
      data: {
        user_id	: 64,
        id: id,//地址id作为参数请求后台
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res);
      }
    })
  },
 
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
 
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0rpx";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.address;
      list[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      this.setData({
        address: list
      });
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.address;
      var del_index = '';
      disX > delBtnWidth / 2 ? del_index = index : del_index = '';
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        address: list,
        del_index: del_index
      });
    }
  },
})