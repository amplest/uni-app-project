<template>
  <view class="container">
    <image class="login-img" src="../../static/common/authorize-01.png"></image>
    <button class="login-button" open-type="getUserInfo" @getuserinfo="getUserInfo">获取微信头像昵称</button>
  </view>
</template>

<script>
import { setUserInfo } from '@/api/common'

import {  showToast } from '@/utils/index'
export default {
  methods: {
    getUserInfo() {
      wx.getUserInfo({
        success: async res => {
          const {  avatarUrl,nickName } = res.userInfo

          try {
            await setUserInfo(avatarUrl, nickName)
            showToast('获取头像昵称成功')
            uni.reLaunch({
              url: '/pages/authorize-phone/index'
            })
          }catch (error) {
            showToast(error.message)
          }
        }
      })
    },
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
    width:622upx;
    height:96upx;
    line-height: 96upx;
    text-align: center;
    background:rgba(0,31,80,1);
    box-shadow:0px 4upx 8upx rgba(93,158,248,0.38);
    border-radius:8upx;
    font-size:36upx;
    color:rgba(255,255,255,1);
    margin-top: 140upx;
  }
}
</style>
