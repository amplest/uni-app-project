<template>
  <view>
    <van-action-sheet :show="show" title="分享海报" @close.native="onClose" :round="false">

      <view class="poster-box">
        <view class="poster-txt">让更多朋友一起拿上汽大众红包吧！</view>
        <view class="poster-img">
          <image src="../../static/common/poster.png" v-if="!posterUrl"></image>
          <image :src="posterUrl" v-else></image>
        </view>
        <view class="poster-btn">
          <van-button
            round
            type="info"
            @click.native="onSave"
            custom-style="background-color: #032C63; width: 240px; height: 50px; border: 0;"
            v-if="nickname"
            >保存海报</van-button
          >
          <van-button
            round
            type="info"
            open-type="getUserInfo" @getuserinfo.native="getUserInfo"
            custom-style="background-color: #032C63; width: 240px; height: 50px; border: 0;"
            v-else
          >保存海报</van-button
          >
        </view>
      </view>
    </van-action-sheet>
  </view>
</template>

<script>
import { setUserInfo, getPoster } from '@/api/common'
import { getInformation } from '@/api/home'

import vanActionSheet from '@/wxcomponents/vant/dist/action-sheet/index'
import vanButton from '@/wxcomponents/vant/dist/button/index'

import { showLoading, hideLoading, showToast } from '@/utils/index'
import { getMarketingId } from '@/utils/cookies'

export default {
  components: {
    vanActionSheet,
    vanButton
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      posterUrl: '',
      nickname: ''
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
    },

    async onSave() {
      try {
        showLoading('保存中')
        const url = await this.getPosterUrl()
        uni.downloadFile({
          url,
          success: res => {
            if (res.statusCode === 200) {
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: () => {
                  showToast('保存成功')
                  hideLoading()
                  // this.onClose()
                },
                fail: res => {
                  showToast('保存失败')
                  hideLoading()
                }
              })
            }
          },
          fail: res => {
            hideLoading()
          }
        })
      } catch (error) {
        console.log('onSave error', error)
      }
    },

   async getPosterUrl() {
      const marketingId = getMarketingId()
      try {
        const { url } = await getPoster(marketingId)
        this.posterUrl = url

        return url
      } catch (error) {
        console.log('getPoster error', error)
      }
    },

    getUserInfo() {
      wx.getUserInfo({
        success: async res => {
          const { avatarUrl, nickName } = res.userInfo

          try {
            await setUserInfo(avatarUrl, nickName)
            await this.onSave()
          } catch (error) {
            console.log('getUserInfo error', error)
          }
        }
      })
    },

    async getInformation() {
      const marketingId = getMarketingId()
      try {
        const { nickname } = await getInformation(marketingId)

        this.nickname = nickname
      } catch (error) {
        console.log('getInformation error', error)
      }
    }
  },
  onPageShow() {
    this.getInformation()
  }
}
</script>

<style lang="scss" scoped>
.poster-box {
  padding: 40upx;
  .poster-txt {
    text-align: center;
    color: #333;
    font-size: 32upx;
    font-weight: 500;
  }
  .poster-img {
    padding-top: 60upx;
    image {
      width: 441upx;
      height: 784upx;
      display: block;
      margin: 0 auto;
    }
  }
  .poster-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60upx 0;
  }
}
</style>
