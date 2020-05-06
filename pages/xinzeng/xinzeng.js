// pages/xinzeng/xinzeng.js
const app = getApp();
Page({
  data: {
    checked: false,//默认按钮
        name:'',//姓名
        photo:'',//手机号
        address:'',//地址
        isDefault:0,//默认按钮
    region: ['请选择', '请选择', '请选择'],
    imgList: [],

  },
  baocun(){
    var that = this
    wx.request({
      url: 'https://star.qhynice.top/api/address/index',
      data: {
        user_id:64,
        name:that.data.name,
        phone: that.data.photo,
        address: that.data.address,
        is_default:that.data.isDefault
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
      }
    })
    wx.navigateTo({
      url: '/pages/dizhi/dizhi'
    })
  },
  delete1_name(e){//姓名value
    var that = this 
    that.setData({
      name: e.detail.value
      })
    console.log(e.detail.value)
  },
  delete1_photo(e){//手机号value
    var that = this 
    that.setData({
      photo: e.detail.value
      })
    console.log(e.detail.value)
  },
  delete1_address(e){//地址value
    var that = this 
    that.setData({
      address: e.detail.value
      })
    console.log(e.detail.value)
  },
  onChange({ detail }) {//默认按钮
    // 需要手动对 checked 状态进行更新
  console.log(detail)
  if (detail == true) {
    var i = 1
  } else {
    var i = 0
  }
  this.setData({
    isDefault:i,
    checked: detail
  })
},
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },

  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
})