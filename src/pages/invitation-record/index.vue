<template>
  <view class="container">
    <view class="invitation-record">
    <view class="invitation-record-number">共{{ listCount }}位好友</view>
    <view class="invitation-record-list">
      <view class="invitation-record-list-item" v-for="(item, index) in list" :key="index">
        <image class="invitation-record-list-item-avatar" :src="item.avatar"></image>
        <view class="invitation-record-list-item-name">{{ item.nickname }}</view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
import { getInvitation } from '@/api/personal'
import { getMarketingId } from '@/utils/cookies'

export default {
  data() {
    return {
      page: 1,
      psize: 100,
      list: [],
      listCount: 0,
    }
  },
  onReachBottom() {
    const psize = 10
    this.page++
    uni.showNavigationBarLoading()
    this.getInvitation(this.page, psize)
  },
  methods: {
    async getInvitation(page,psize) {
       const marketingId = getMarketingId();
       try {
         const { list } = await getInvitation(marketingId, page, psize)
         this.list = [...this.list, ...list.data]
         this.listCount = list.total
         uni.hideNavigationBarLoading();
       } catch (error) {
         console.log('getInvitation error', error)
       }
    },

  },
  mounted() {
    this.getInvitation()
  }
}
</script>

<style lang="scss" scoped>
.invitation-record {
  background-color: #172e58;
  padding: 0 60upx;
  padding-top: 40upx;
  min-height: 100vh;
  padding-bottom: 40rpx;
  &-number {
    font-size: 28upx;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
  &-list {
    margin-top: 40upx;
    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 40upx;
      &-avatar {
        width: 80upx;
        height: 80upx;
        line-height: 80upx;
        text-align: center;
        background: rgba(0, 0, 0, 0);
        border: 2px solid rgba(238, 238, 238, 1);
        border-radius: 50%;
      }
      &-name {
        font-size: 24upx;
        color: rgba(255, 255, 255, 1);
        margin-left: 32upx;
      }
    }
  }
}
</style>
