<template>
  <view class="top">
    <view class="top-user" v-if="!nickName || !avatarUrl">
      <img src="../../../../static/personal-center/user-logo.png" alt="" class="top-user-avatar" />
      <button open-type="getUserInfo" @getuserinfo="getUserInfo" class="top-user-nickname">点击授权头像昵称</button>
      <van-icon name="arrow" custom-class="top-user-arrow" />
    </view>
    <view class="top-user" :style="{ paddingTop: customHeight }" v-else>
      <img :src="avatarUrl" alt="" class="top-user-avatar" />
      <view class="top-user-nickname">{{ nickName }}</view>
    </view>
    <view class="top-grid">
      <view class="top-grid-item">
        <view class="top-grid-item-number">{{ redEnvelopeTotal }}元</view>
        <view class="top-grid-item-name">获得红包</view>
      </view>
      <view class="top-grid-item">
        <view class="top-grid-item-number">{{ toBeReceived }}元</view>
        <view class="top-grid-item-name">待到账</view>
      </view>
      <view class="top-grid-item">
        <view class="top-grid-item-number">{{ inviteCount }}人</view>
        <view class="top-grid-item-name">邀请好友</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getPersonalKanban } from '@/api/personal'
import { setUserInfo } from '@/api/common'
import { getInformation } from '@/api/home'

import { getMarketingId } from '@/utils/cookies'

import vanIcon from '@/wxcomponents/vant/dist/icon/index'
export default {
  components: {
    vanIcon
  },
  data() {
    return {
      nickName: '',
      avatarUrl: '',
      list: [],
      inviteCount: 0,
      redEnvelopeTotal: 0,
      toBeReceived: 0
    }
  },
  methods: {
    async getUserInfo() {
      wx.getUserInfo({
        success: async res => {
          const { nickName, avatarUrl } = res.userInfo
          this.nickName = nickName
          this.avatarUrl = avatarUrl

          try {
            await setUserInfo(avatarUrl, nickName)
            uni.navigateBack()
          } catch (error) {
            showToast(error.message)
          }
        }
      })
    },

    async getPersonalKanban() {
      try {
        const marketingId = getMarketingId()
        const { money, money1, share_count } = await getPersonalKanban(marketingId)
        this.redEnvelopeTotal = Number(money)/100
        this.toBeReceived = Number(money1)/100
        this.inviteCount = Number(share_count)
      } catch (error) {
        console.log('getPersonalKanban error', error)
      }
    },

    async getInformation() {
      try {
        const marketingId = getMarketingId()
        const { avatar, nickname } = await getInformation(marketingId)

        this.nickName = nickname
        this.avatarUrl = avatar
      }catch (error) {
        console.log('getInformation error',error)
      }
    }
  },
  onPageShow() {
    this.getInformation()
    this.getPersonalKanban()
  }
}
</script>

<style lang="scss">
.top {
  width: 100%;
  position: relative;
  &-user {
    display: flex;
    align-items: center;
    padding-left: 40upx;
    &-avatar {
      width: 160upx;
      height: 160upx;
      background: rgba(0, 0, 0, 0);
      border: 2px solid rgba(238, 238, 238, 1);
      background-color: #fff;
      border-radius: 50%;
      flex-shrink: 0;
    }
    &-nickname {
      font-size: 40upx;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      margin-left: 36upx;
      background: none;
      padding: 0;
      margin-right: 0;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    &-nickname::after {
      border: 0;
    }
    &-arrow {
      font-size: 32upx;
      color: #ffffff;
    }
  }
  &-grid {
    width: 710upx;
    height: 200upx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6upx 12upx rgba(0, 0, 0, 0.16);
    border-radius: 20upx;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 60upx;
    &-item {
      width: 50%;
      text-align: center;
      &-number {
        font-size: 48upx;
        font-weight: 500;
        color: #ff5155;
      }
      &-name {
        font-size: 28upx;
        color: rgba(102, 102, 102, 1);
        margin-top: 8upx;
      }
    }
    &-item:first-child {
      position: relative;
    }
    &-item:first-child:after {
      position: absolute;
      top: 50%;
      margin-top: -39upx;
      right: 0;
      content: '';
      height: 78upx;
      width: 2upx;
      background: #666666;
    }
    &-item:last-child {
      position: relative;
    }
    &-item:last-child:before {
      position: absolute;
      top: 50%;
      margin-top: -39upx;
      left: 0;
      content: '';
      height: 78upx;
      width: 2upx;
      background: #666666;
    }
  }
}
</style>
