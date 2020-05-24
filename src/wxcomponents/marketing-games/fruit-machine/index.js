const _throttle = (fn, delay = 2000) => {
  let lastTime = 0;
  return function () {
    let nowTime = new Date();
    if (nowTime - lastTime > delay) {
      lastTime = nowTime;
      fn.apply(this, arguments);
    }
  };
};

Component({
  externalClasses: ['custom-class'],
  properties: {
    isStart: {
      // 属性名
      type: Boolean,
      value: false
    },
    myProperty2: String // 简化的定义方式
  },
  data: {
    len: 8, //宫格个数
    ret: 8, //抽奖结果对应值1～9
    speed: 30, //速度值
    // isStart: false,
    idx: 0,
    countLuckDraw: 0
  },
  methods: {
    start: _throttle(function() {
      let { idx, ret, len, speed, isStart } = this.data
      if (isStart) return

      this.setData({
        isStart: true
      })

      let range = Math.floor(Math.random() * 2 + 2)
      let count = 0
      // let spd2 = speed * 2

      !(function interval(self) {
        setTimeout(() => {
          count++
          // if (count > range * len) {
          //   speed = spd2
          // }
          if (count != (range + 1) * len + ret) {
            interval(self)
          } else {
            self.triggerEvent('endCallBack')
            self.setData({
              isStart: false
            })
          }
          self.setData({
            idx: count % 8 == 0 ? 8 : count % 8
          })
        }, speed)
      })(this)
    }),
    reset() {
      this.setData({
        idx: ''
      })
    }
  }
})
