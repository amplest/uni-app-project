<template>
  <view class="red-envelope">
    <view class="red-envelope-content-title">
      <view>
        <image src="../../../../static/personal-center/p-hb.png"></image>
      </view>
    </view>
    <view class="red-envelope-content">
      <view class="red-envelope-content-list">
        <block v-if="list.length">
          <view class="red-envelope-content-list-item" v-for="(item, index) in list" :key="index">
            <view class="red-envelope-content-list-item-left">
              <image
                class="red-envelope-content-list-item-left-avatar"
                :src="item.type !== 1 ? item.image : '../../../../static/personal-center/autologo.png'"
              ></image>
              <view class="red-envelope-content-list-item-left-info">
                <view class="red-envelope-content-list-item-left-info-title">{{
                  item.type !== 1 ? '邀请好友红包' : '上汽大众无门槛红包'
                }}</view>
                <view class="red-envelope-content-list-item-left-info-subtitle">{{
                  item.type !== 1 ? item.msg : '世间万物，唯上汽大众和红包不可辜负'
                }}</view>
              </view>
            </view>
            <view class="red-envelope-content-list-item-right"> +{{ item.money }}元</view>
          </view>
        </block>
        <block v-else>
          <view class="no-data">暂无记录</view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
import { getRedEnvelopeRecord } from '@/api/personal'
import { getMarketingId } from '@/utils/cookies'

export default {
  data() {
    return {
      info: {
        pageIndex: 1,
        pageSize: 100000
      },
      noRedData: false,
      list: []
    }
  },
  methods: {
    async getRedEnvelopeRecord() {
      const marketingId = getMarketingId()

      try {
        const data = await getRedEnvelopeRecord(marketingId)

        if(!data || data.length <= 0) {
          return
        }

        data && data.forEach(item => {
          item.money = Number(item.money) / 100
        })
        this.list = data

      }catch (error) {
        console.log('getRedEnvelopeRecord error', error)
      }
    }
  },
  onPageShow() {
    this.getRedEnvelopeRecord()
  }
}
</script>

<style lang="scss" scoped>
.red-envelope {
  position: relative;
  width: 100%;
  padding: 0 20upx;
  margin-top: 20upx;
  &-content-title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 750upx;
      padding: 40upx 0 26upx;
      image {
        width: 173upx;
        height: 91upx;
      }
    }
  &-content {
    position: relative;
    z-index: 20;
    padding: 60upx 40upx 40upx 40upx;
    min-height: 380upx;
    background:rgba(255,255,255,0.1);
    box-shadow:0px 6px 12px rgba(0,0,0,0.1);
    border-radius: 24upx;
    border-radius: 20upx;
    &-list {
      &-item {
        margin-top: 60upx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-left {
          display: flex;
          align-items: center;
          &-avatar {
            display: block;
            width: 100upx;
            height: 100upx;
            border-radius: 50%;
          }
          &-info {
            margin-left: 32upx;
            &-title {
              font-size: 28upx;
              font-weight: 600;
              color: rgba(255, 255, 255, 1);
              line-height: 40upx;
            }
            &-subtitle {
              width: 350upx;
              font-size: 20upx;
              color: rgba(255, 255, 255, 1);
              margin-top: 8upx;
              // white-space: nowrap;
              // overflow: hidden;
              // text-overflow: ellipsis;
            }
          }
        }
        &-right {
          font-size: 32upx;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
.no-data {
  height: 422upx;
  line-height: 422upx;
  color: #fff;
  text-align: center;
}
</style>
