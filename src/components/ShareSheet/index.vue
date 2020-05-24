<template>
  <view>
    <van-action-sheet :show="show" cancel-text="取消" @cancel.native="onCancel">
      <view class="share" @click="addShare">
        <view @click="onPoster" class="share-item">
          <image src="../../static/home/section9-01.png" class="share-item-image"></image>
          <view class="share-item-content">
            <view class="share-item-content-text">分享海报</view>
          </view>
        </view>
        <button class="share-item" open-type="share">
          <image src="../../static/home/section9-02.png" class="share-item-image"></image>
          <view class="share-item-content">
            <view class="share-item-content-text">转发好友</view>
            <image class="share-item-content-icon" src="../../static/home/home-10.png"></image>
          </view>
        </button>
      </view>
    </van-action-sheet>
  </view>
</template>

<script>
import vanActionSheet from '@/wxcomponents/vant/dist/action-sheet/index'

import { shareCount } from '@/api/common'

import { getMarketingId } from '@/utils/cookies'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },

    onPoster() {
      this.$emit('poster')
    },

    async addShare() {
      try {
        const marketingId = getMarketingId()

        await shareCount(marketingId)
        console.log('addShare success')
      }catch (error) {
        console.log('addShare error', error)
      }
    },


  },
  components: {
    vanActionSheet
  },

}
</script>

<style lang="scss" scoped>
.share {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  padding: 40upx;
  .share-item {
    text-align: center;
    background-color: transparent;
    padding: 0;
    margin: 0;
    background: none;
    line-height: inherit;
    &-image {
      width: 100upx;
      height: 100upx;
    }
    &-content {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 14upx;
      &-text {
        font-size:24upx;
        color:rgba(51,51,51,1);
      }
      &-icon {
        display: block;
        width: 23upx;
        height: 26upx;
      }
    }
  }
  .share-item::after {
    border: none;
  }
}
</style>
