var app = getApp()
var util = require('../../utils/util.js')
var daChuang = new Array()
Page({
  onLoad: function (options) {
    this.setData({
      studentNumber : app.studentNumber
    })
    wx.getStorage({
      key: 'information',
      success: function (res) {
        daChuang = res.data
      },
    })
  },

  click: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        wx.redirectTo({
          url: '../success/success'
        })
        daChuang.push(res.result + " " + util.formatTime(new Date) +" 0")
        app.studentNumber = res.result
        console.log(daChuang)
        console.log(app.studentNumber)
        wx.setStorage({
          key: "information",
          data: daChuang
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
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        wx.redirectTo({
          url: '../success/success'
        })
        daChuang.push(res.result + " " + util.formatTime(new Date) + " 1")
        app.studentNumber = res.result
        console.log(daChuang)
        console.log(app.studentNumber)
        wx.setStorage({
          key: "information",
          data: daChuang
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
  click1: function () {
    wx.navigateTo({
      url: '../finish/finish'
    })
  }
})