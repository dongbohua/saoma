//finish.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')
var daChuang = new Array()
var statusCode
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (options) {
    this.setData({
      userName: app.username
    })
  },
  click: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  dialogBox: function () {
    wx.showModal({  //提示对话框
      title: '提示',
      content: '讲座已结束，确认上传信息',
      cancelText: "否",
      confirmText: '是',
      success: function (res) {
        if (res.confirm) {//确认上传
          wx.getStorage({//异步获取缓存
            key: 'information',
            success: function (e) {
              console.log(e.data)
              daChuang = e.data
              console.log(daChuang)
              daChuang.unshift(app.reportId)
              console.log(daChuang)
              wx.request({
                url: "http://ql.sylu.edu.cn/demo/public/user/login",
                method: 'post',
                header: {
                  "content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  'ArrayData': e.data,
                },
                success: function (res) {
                  var b = res.data
                  if (b.toString() == "true") {
                    statusCode = true
                  } else statusCode = false
                  console.log(b)
                  if (statusCode) {//判断服务器传回的信息
                    wx.showToast({
                      title: '成功',
                      icon: 'sucess',
                      duration: 2000
                    })
                    wx.removeStorage({
                      key: 'information',
                      success: function(res) {
                        wx.showToast({
                          title: '上传成功',
                          icon: 'sucess',
                          duration: 2000
                        })
                      },
                    })
                  } else {//上传失败
                    wx.showModal({
                      title: '提示',
                      content: '上传失败，请重新提交',
                      showCancel: false,
                      confirmText: '知道了',
                    })
                  }
                }
              })
            },
            fail: function () {
              wx.showModal({
                title: '提示',
                content: '无可上传内容',
                showCancel: false,
                confirmText: '取消',
              })             
            },
          })
        }
        if (res.cancel) {

        }
      }
    })
  }
})