<template>
  <view class="copyright">
    <image class="copyright-logo" src="../../static/common/copyright.png"></image>
    <view class="copyright-title">提供技术支持</view>
  </view>
</template>

<script>
  import VanDivider from '@/wxcomponents/vant/dist/divider/index'
  export default {
    components: {
      VanDivider
    }
  }
</script>

<style lang="scss" scoped>
.copyright {
  &-logo {
    height: 50px;
    margin: 0 auto;
    width: 140px;
    display: block;
  }
  &-title {
    color: #999;
    font-size: 24rpx;
    text-align: center;
    padding-bottom: 10px;

  }
}

</style>
