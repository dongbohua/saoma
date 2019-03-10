var util = require('../../utils/util.js')
var app = getApp()
var daChuang = new Array()
Page({

  onLoad: function () {
    console.log('onLoad'),
    this.setData({
      motto: app.time
    })
  },
  click1: function () {
    wx.navigateTo({
      url: '../finish/finish'
    })
  },
  click: function () {
    wx.getStorage({
      key: 'information',
      success: function (res) {
        daChuang = res.data
      },
    })
    wx.scanCode({
      onlyFromCamera:true,
      success: (res) => {
        daChuang.push(res.result + " " + util.formatTime(new Date)+" 0")
        wx.setStorage({
          key: "information",
          data: daChuang
        })
        app.studentNumber = res.result
        console.log(daChuang)
        wx.navigateTo({
          url: '../success/success'
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '扫描失败',
          icon: 'none',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })

  },
  click0: function () {
    wx.getStorage({
      key: 'information',
      success: function (res) {
        daChuang = res.data
      },
    })
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        daChuang.push(res.result + " " + util.formatTime(new Date) + " 1")
        wx.setStorage({
          key: "information",
          data: daChuang
        })
        app.studentNumber = res.result
        console.log(daChuang)
        wx.navigateTo({
          url: '../success/success'
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '扫描失败',
          icon: 'none',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })

  }
  
})