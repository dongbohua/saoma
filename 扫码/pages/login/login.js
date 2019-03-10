//login.js
//获取应用实例
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
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
    
  },
  /** 监听帐号输入 */
  listenerUsernameInput: function (e) {
    this.data.username = e.detail.value
  },
  /** 监听密码输入 */
  listenerPasswordInput: function (e) {
    this.data.password = e.detail.value
  },
  loginAction:function(){
    var userName =this.data.username
    var passwords =this.data.password
    var username = this.data.username
    var str=userName+"&"+passwords
      wx.request({
        url: "http://ql.sylu.edu.cn/demo/public/user/login",//+'?'+str,
        method:'post',
        header: {
          "content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          'username': userName.toString(),
          'passwd': passwords.toString(),
        },
        success:function(res){
          console.log(res.data)
          var a = res.data[0]
          app.reportId = res.data[1]
          console.log(app.reportId)
          if(a.toString()=='noUser'){
            wx.showModal({
              title: '提示',
              content: '用户不存在',
              showCancel:false,
              confirmText:'取消'
            })
          }else if(a.toString()=='errP'){
            wx.showModal({
              title: '提示',
              content: '密码错误',
              showCancel: false,
              confirmText: '取消'
            })
          }else if(a.toString()=='time_out'){
            wx.showModal({
              title: '提示',
              content: '超过有效时间',
              showCancel: false,
              confirmText: '取消'
            })
          }else{
            app.time = a
            app.username = username
            wx.navigateTo({
              url: '../scanning/scanning'
            })
          }
          console.log(a)
        }
      })
  },
})