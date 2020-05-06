Page({
  data: {
    TabCur: 0,
    scrollLeft:0,
    yiji:[],
    erji:[]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  onLoad() {
    // 初始化towerSwiper 传已有的数组名即可
    var that = this
    if (!wx.getStorageSync('id')) {
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    }else{
      wx.request({
        url: 'https://exam.qhynice.top/index.php/Api/User/tree',
        data: {
          uid:44,
          level:0
        },
        header: {'content-type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        success: res=> {//一级用户返回参数
          that.setData({
           yiji:res.data.data
          })
          //在一级用户返回参数里 循环id 请求接口 把循环出来的id作为请求参数 
          for (var i = 0; i < res.data.data.length;i++) {
            // console.log(erji)
            var erji = res.data.data[i].id
            //二级用户请求
            wx.request({
              url: 'https://exam.qhynice.top/index.php/Api/User/tree',
              data: {
                uid: erji,
                leve:1
              },
              header: {'content-type': 'application/x-www-form-urlencoded'},
              method: 'POST',
              success: res=> {//二级用户返回参数
              // console.log(res)
              that.setData({
                erji:res.data.data
               })
              },
            })//二级用户请求结尾
          }
        },
      })
    }
  
  },
  
})