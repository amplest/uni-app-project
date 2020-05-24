<template>
  <view class="progress">
    <view class="progress-remainder"> 仅剩{{ remainder }}份 </view>
    <view class="progress-content">
      <van-progress
        :show-pivot="showPivot"
        :percentage="percentage"
        :color="color"
        :track-color="trackColor"
        :stroke-width="strokeWidth"
        class="progress-content-component"
      />
      <view class="progress-content-total">{{ total }}份</view>
    </view>
  </view>
</template>
<script>
import vanProgress from '@/wxcomponents/vant/dist/progress/index'
export default {
  props: {
    percentage: {
      type: [String, Number],
      default: ''
    },
    showPivot: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'rgba(255,255,255,1)'
    },
    trackColor: {
      type: String,
      default: 'rgba(255,255,255,0.25)'
    },
    strokeWidth: {
      type: [String, Number],
      default: '6px'
    },
    remainder: {
      type: [String, Number],
      default: ''
    },
    total: {
      type: [String, Number],
      default: ''
    }
  },
  components: {
    vanProgress
  }
}
</script>

<style lang="scss" scoped>
.progress {
  width: 100%;
  &-remainder {
    font-size: 22upx;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  &-content {
    margin-top: 16upx;
    display: flex;
    align-items: center;
    &-component {
      flex: 1;
    }
    &-total {
      font-size: 22upx;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      margin-left: 20upx;
    }
  }
}
</style>
