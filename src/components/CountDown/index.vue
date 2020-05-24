<template>
  <view class="countdown">
    <text class="countdown-mention"> 距活动结束 ：</text>
    <van-count-down class="countdown-component" use-slot :time="currentTime" @change.native="onChange($event)">
      <text class="countdown-block">{{ timeData.days }}</text>
      <text class="countdown-colon">天</text>
      <text class="countdown-block">{{ timeData.hours }}</text>
      <text class="countdown-colon">时</text>
      <text class="countdown-block">{{ timeData.minutes }}</text>
      <text class="countdown-colon">分</text>
    </van-count-down>
  </view>
</template>

<script>
import VanCountDown from '@/wxcomponents/vant/dist/count-down/index'
export default {
  props: {
    currentTime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timeData: {}
    }
  },
  components: {
    VanCountDown
  },
  methods: {
    onChange(e) {
      this.timeData = e.detail
    }
  }
}
</script>

<style lang="scss" scoped>
.countdown {
  display: flex;
  align-items: center;
  font-size: 28upx;
  color: #032c63;
  &-colon {
    display: inline-block;
    margin: 0 4upx;
    color:rgba(190,41,41,1);
  }
  &-block {
    display: inline-block;
    width: 56upx;
    color: #fff;
    font-size: 28upx;
    text-align: center;
    background:rgba(153,13,14,1);
  }
}
</style>
