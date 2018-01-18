
Page({
  statechange(e) {
    console.log('live-pusher code:', e.errCode)
  },
  start:function(){
    var ctx = wx.createLivePusherContext();
    ctx.start()
  },
  pause: function(){
    var ctx = wx.createLivePusherContext();
    ctx.pause()
  },
  resume: function(){
    var ctx = wx.createLivePusherContext();
    ctx.resume()
  },
  stop: function(){
    var ctx = wx.createLivePusherContext();
    ctx.stop()
  },
  switchCamera: function(){
    var ctx = wx.createLivePusherContext();
    ctx.switchCamera()
  }
})