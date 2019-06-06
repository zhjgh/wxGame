function addStartBtn(cb){
  const config = {
    type: 'Image',
    image: 'images/btn_start.png',
    style: {
      left: 248 / SCALE, // (750-254)/2 = 248
      top: 870 / SCALE,
      width: 254 / SCALE,
      height: 91 / SCALE,
    },
  }
  const startBtn = wx.createUserInfoButton(config)
  startBtn.onTap(res => {
    if(res.userInfo){
      cb(res.userInfo)
    }else{
      console.log('拒绝')
    }
  })
  return startBtn
}

class Start extends Phaser.State{
  preload(){
    // 配置画面缩放
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    // 预加载资源
    this.load.image('bg_menu', 'images/bg_menu.png')
    this.load.image('bg_playing', 'images/bg_playing.png')
    this.load.image('bg_rank', 'images/bg_rank.png')
    this.load.image('bg_waiting', 'images/bg_waiting.png')
    this.load.image('avatar', 'images/avatar.png')
    this.load.image('avatar_unknow', 'images/avatar_unknow.png')
    this.load.image('btn', 'images/btn_menu.png')
    this.load.image('o', 'images/o.png')
    this.load.image('x', 'images/x.png')
    this.load.image('row', 'images/rank_row.png')
    this.load.image('avatars', 'images/result_avatars.png')
    this.load.image('win', 'images/result_win.png')
    this.load.image('lose', 'images/result_lose.png')
    this.load.image('draw', 'images/result_draw.png')
    this.load.image('bunting', 'images/bunting.png')
  }
  create() {
    // 添加一个图片作为背景
    this.game.add.image(0, 0, 'bg_menu');
    // 添加“开始游戏”按钮
    const startBtn = addStartBtn((userInfo) => {
      // 销毁开始按钮
      startBtn.destroy()
      // 将玩家信息存入 global object
      go.userInfo = userInfo
      // 预加载玩家头像，微信头像为空则不加载
      if (go.userInfo.avatarUrl !== '') {
        this.load.image(go.userInfo.avatarUrl, go.userInfo.avatarUrl)
        // 在 preload 生命周期函数以外进行的资源加载必须手动开始加载
        this.load.start()
      }
      // 跳转主菜单场景
      this.game.state.start('menu')
    })
  }
}

module.exports = Start