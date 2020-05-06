// pages/xiangqing/xiangqing.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sid: "",
    swiperList:"",
    pro:'',
    num:'1'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.towerSwiper('swiperList');
    var shop = wx.getStorageSync('sid');
    this.setData({
      sid: shop,
    });
    // console.log(shop); 
    var that = this;
    if (!wx.getStorageSync('id')) {
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    }else{
      wx.request({
        url: 'https://exam.qhynice.top/index.php/Api/Product/index',
        data: {
          pro_id: shop
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res);
          that.setData({
            pro: res.data.pro,
            swiperList: res.data.pro.img_arr
          })
        }
      })
    }
  },
  goumai:function(){//购买跳转
    wx.setStorageSync('uid',this.data.sid)
    wx.setStorageSync('num',this.data.num)
    // console.log(this.data.num)
    wx.navigateTo({
    url: '/pages/dingdan/dingdan',
  })
  },
  onChange(event) {//步进器
    // console.log(event.detail);
    var that = this
   that.setData({
     num:event.detail
   })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox: items
    })
  },
  
  onSelect(event) {
    console.log(event.detail);
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
    showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
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