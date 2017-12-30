// start.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 0.4,
    disabled: true,
    threshold: 0,
    rule: 'up',
    upChecked: false,
    sleepChecked: false,
    lightChecked: false,
    downChecked: false,
    items: [
      { name: 'up', value: '可以拜访' },
      { name: 'sleep', value: '在休息' },
      { name: 'light', value: '未断电' },
      { name: 'down', value: '不可拜访' }
    ]
  },

  radioChange: function (e) {
    //保存报警规则到当前页面的数据
    if (e.detail.value != "") {
      this.setData({
        rule: e.detail.value
      })
    }
    console.log(this.data.rule)
  },



  getDataFromOneNet: function () {
    var that = this;

    //从oneNET请求我们的Wi-Fi气象站的数据
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/23248275/datapoints?datastream_id=Light,HumanSensor&limit=1 

',
      header: {
        'content-type': 'application/json',
        'api-key': 'x6=np0UwzAjUPTCgdF2flCO4XGY='
      },
      success: function (res) {
        //console.log(res.data)
        //拿到数据后保存到全局数据
        that.setData({
          upChecked: false,
          sleepChecked: false,
          lightChecked: false,
          downChecked: false
        })
        var app = getApp()
        // console.log(res)

        app.globalData.light = res.data.data.datastreams[0]
        app.globalData.humensensor = res.data.data.datastreams[1]

        console.log(app.globalData.light.datapoints[0].value)
        var light = app.globalData.light.datapoints[0].value
        console.log(app.globalData.humensensor.datapoints[0].value)
        var human = app.globalData.humensensor.datapoints[0].value

        //通过逻辑改变数字的显示状态
        var lightFlag = (light > 100)
        var humanFlag = Number(human)

        console.log("lightFlag : " + lightFlag)
        console.log("humanFlag : " + humanFlag)
        if (humanFlag && lightFlag) {
          console.log("!!!")
          that.setData({
            upChecked: true
          })
        } else if (humanFlag && !lightFlag) {
          that.setData({
            sleepChecked: true
          })
        } else if (!humanFlag && lightFlag) {
          that.setData({
            lightChecked: true
          })
        } else if (!humanFlag && !lightFlag) {
          that.setData({
            downChecked: true
          })
        }

      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })



  },

  clearColor: function () {
    // console.log("!!!")
    this.setData({
      upChecked: false,
      sleepChecked: false,
      lightChecked: false,
      downChecked: false
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
