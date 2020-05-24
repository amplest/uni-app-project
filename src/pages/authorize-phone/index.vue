<template>
  <view class="container">
    <image class="login-img" src="../../static/common/authorize-01.png"></image>
    <button class="login-button" open-type="getPhoneNumber" @getphonenumber="getPhone">获取微信绑定的手机号</button>
  </view>
</template>

<script>
import { getMobile } from '@/api/common'

import {  showToast } from '@/utils/index'
import {  getMarketingId } from '@/utils/cookies'

export default {
  methods: {
    getCode() {
      return new Promise(resolve => {
        uni.login({
          success: res => {
            if (res.code) {
              resolve(res.code)
            }
          }
        })
      })
    },
    async getPhone(e) {
      const { encryptedData = '', iv = '' } = e.detail
      const code = await this.getCode()
      const marketing_id = getMarketingId()

      try {
        await getMobile(code,encodeURIComponent(encryptedData), encodeURIComponent(iv),marketing_id)
        showToast('获取手机号成功')
        uni.navigateBack()
      }catch (error) {
        showToast('授权失败，请重新授权')
      }
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
