<template>
  <view class="container">
    <image class="login-img" src="../../static/common/authorize-01.png"></image>
    <button class="login-button" open-type="openSetting" @opensetting="handler">获取地理位置信息</button>
  </view>
</template>

<script>
import { getLocation } from '@/utils/miniApp'

export default {
  methods: {
    handler(e) {
      getLocation()
    }
  }
}
</script>

<style lang="scss">
page {
  background: #fff;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  .login-img {
    width: 622upx;
    height: 494upx;
  }
  .login-button {
    width: 622upx;
    height: 96upx;
    line-height: 96upx;
    text-align: center;
    background: rgba(0, 31, 80, 1);
    box-shadow: 0px 4upx 8upx rgba(93, 158, 248, 0.38);
    border-radius: 8upx;
    font-size: 36upx;
    color: rgba(255, 255, 255, 1);
    margin-top: 140upx;
  }
}
</style>
