// pages/dingdan/dingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pro:'',
    num:'',
    addressid:"",
    shop:""
  },
  bindaddress(){//地址跳转
    wx.navigateTo({
      url: '../dizhi/dizhi'
    })
  },
  onShow: function () {//地址
    var that = this
    var addressid = wx.getStorageSync("addressid");
    var shop = wx.getStorageSync('aid');
    that.setData({
      addressid: addressid,
      shop:shop
    })
    wx.request({
      url: 'https://star.qhynice.top/api/address/getaddress',
      data: {
        user_id	: 64,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        var addList = res.data.res;
        // console.log(addList);
        // console.log(that.data.shop);
        if (that.data.shop != "") {
          for (var i in addList) {
            if(addList[i].id == that.data.shop){
              that.setData({
                datare: addList[i]
              })
            }
            // console.log("i" + i);
          }
        }else{
          for (var i in addList) {
            if (addList[i].is_default == "1") {
              that.setData({
                datare: addList[i]
              })
            }
          }
        }
        
      }
      
    })

  },
  onLoad: function(options){
    var that = this;
    var sid = wx.getStorageSync('uid');
    var num = wx.getStorageSync('num');
    that.setData({
      num: num,
    })
    console.log(that.data.num)
    wx.request({
      url: 'https://exam.qhynice.top/index.php/Api/Product/index',
      data: {
        pro_id: sid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data.pro)
        that.setData({
          pro: res.data.pro,
        })
      }
    })
  },
 
})