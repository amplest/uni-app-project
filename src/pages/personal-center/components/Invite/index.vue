<template>
  <view class="invite">
    <view class="invite-content-title">
      <view>
        <image src="../../../../static/personal-center/p-pf.png"></image>
      </view>
    </view>
    <view class="invite-content">
      <view class="invite-content-info">
        <view class="invite-content-end">活动截止日期：{{ endtime || '--' }}</view>
        <view class="invite-content-finish">
          <van-button custom-class="invite-content-finish-operation" @click.native="onInviteFriends">送TA红包</van-button>
        </view>
      </view>
      <block v-if="list.length">
        <view class="invite-content-display" @click.native="onNavigateTo">
          <view class="invite-content-display-list">
            <view class="invite-content-display-list-item" v-for="(item, index) in list" :key="index">
              <image class="invite-content-display-list-item-avatar" :src="item.avatar"></image>
              <view class="invite-content-display-list-item-username">{{ item.nickname }}</view>
            </view>
          </view>
          <van-icon name="arrow" custom-class="invite-content-display-arrow" v-if="list.length >= 5"/>
        </view>
      </block>
      <block v-else>
        <view class="no-data">暂无记录</view>
      </block>
    </view>
  </view>
</template>

<script>
import vanButton from '@/wxcomponents/vant/dist/button/index'
import vanIcon from '@/wxcomponents/vant/dist/icon/index'

import { getInvitation } from '@/api/personal'
import { getMarketingId } from '@/utils/cookies'

export default {
  components: {
    vanButton,
    vanIcon
  },
  data() {
    return {
      shareShow: false,
      sharePosterShow: false,
      page: 1,
      psize: 5,
      list: [],
      endtime: '',
      noData: false
    }
  },
  methods: {
    onNavigateTo() {
      uni.navigateTo({
        url: '/pages/invitation-record/index'
      })
    },
    onInviteFriends() {
      this.$emit('onInviteFriends')
    },
    async getInvitation() {
       const marketingId = getMarketingId();
       try {
         const { endtime, list } = await getInvitation(marketingId,1,5)
         this.endtime = endtime
          if (!list.data || list.data.length <= 0) {
            return
          }
         this.list = list.data
         console.log(this.list)
       } catch(error) {
         console.log('getInvitation error', error)
       }
    }
  },
  onPageShow() {
    this.getInvitation()
  }
}
</script>

<style lang="scss">
.invite {
  position: relative;
  width: 100%;
  padding: 0 20upx;
  position: relative;
  &-content-title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 750upx;
      padding: 60upx 0 26upx;
      image {
        width: 261upx;
        height: 91upx;
      }
    }
  &-content {
    z-index: 20;
    background:rgba(255,255,255,0.1);
    box-shadow:0px 6px 12px rgba(0,0,0,0.1);
    border-radius: 24upx;
    padding: 0 20upx;
    &-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 120upx;
      border-bottom: 2upx dashed rgba(225,225,225,0.6);
    }
    &-end {
      font-size: 28upx;
      color: #fff;
    }
    &-finish {
      &-operation {
        width: 160upx;
        height: 60upx;
        line-height: 60upx;
        background: #FF5155;
        border-radius: 40upx;
        font-size: 28upx;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        padding: 0;
        border: 0;
      }
    }
    &-display {
      display: flex;
      align-items: center;
      margin-top: 0upx;
      padding: 38upx;
      &-list {
        width: 100%;
        display: flex;
        align-items: center;
        &-item {
          width: 20%;
          text-align: center;
          margin-right: 22upx;
          &-avatar {
            border: 2px solid rgba(238, 238, 238, 1);
            border-radius: 50%;
            width: 100upx;
            height: 100upx;
          }
          &-username {
            width: 100upx;
            font-size: 24upx;
            color: rgba(255, 255, 255, 1);
            margin-top: 14upx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      &-arrow {
        font-size: 28upx;
        color: #ffffff;
        margin-left: 4upx;
      }
    }
  }
}
.no-data {
  height: 221upx;
  line-height: 221upx;
  text-align: center;
  color: #fff;
}
</style>
