<template>
  <view class="leaderboard">
    <view class="leaderboard-title">
        <view>
          <image src="../../../../static/personal-center/p-ph.png"></image>
        </view>
    </view>
    <view class="leaderboard-box">
      <view class="leaderboard-table">
        <view class="leaderboard-table-thead">
          <view class="leaderboard-table-thead-tr">
            <view class="leaderboard-table-thead-tr-td">排名</view>
            <view class="leaderboard-table-thead-tr-td">微信昵称</view>
            <view class="leaderboard-table-thead-tr-td">获得红包</view>
          </view>
        </view>
        <view class="leaderboard-table-tbody">
          <block v-if="list.length>0">
            <view class="leaderboard-table-tbody-tr" v-for="(item, index) in list" :key="index">
              <view class="leaderboard-table-tbody-tr-td">
                <block v-if="index + 1 < 4">
                  <image
                    class="leaderboard-table-tbody-tr-icon"
                    :src="
                      '../../../../static/personal-center/personal-center-' +
                      (index + 1 === 1 ? '01.png' : index + 1 === 2 ? '02.png' : '03.png')"></image>
                </block>
                <block v-else>
                  {{ index + 1 }}
                </block>
              </view>
              <view class="leaderboard-table-tbody-tr-td">{{ item.nickname }}</view>
              <view class="leaderboard-table-tbody-tr-td">{{ item.money }}元</view>
            </view>
          </block>
          <block v-else>
            <view class="no-data">暂无记录</view>
          </block>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getRedEnvelopeList } from '@/api/personal'

import { getMarketingId } from '@/utils/cookies'
export default {
  data() {
    return {
      list: [],
      noData: false
    }
  },
  methods: {
    async getRedEnvelopeList() {
      const marketingId =  getMarketingId()
      try {
        const { data } = await getRedEnvelopeList(marketingId)
        this.list = data
      } catch (error) {
        console.log('getRedEnvelopeList error', error)
      }
    }
  },
  onPageShow() {
    this.getRedEnvelopeList()
  }
}
</script>

<style lang="scss" scoped>
.leaderboard {
  padding: 0 20upx;
  width: 100%;
  min-height: 968upx;
  position: relative;
  &-box {
    text-align: center;
    position: relative;
    z-index: 20;
  }
  &-title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 60upx;
    padding-bottom: 38upx;
    width: 750upx;
    color: rgba(255, 255, 255, 1);
    image {
      width: 129upx;
      height: 91upx;
    }
  }
  &-table {
    background:rgba(255,255,255,0.1);
    box-shadow:0px 6px 12px rgba(0,0,0,0.1);
    height: 836upx;
    padding: 60upx 56upx;
    border-radius: 24upx;
    &-thead {
      &-tr {
        display: flex;
        align-items: center;
        &-td {
          font-size: 32upx;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          text-align: left;
        }
        &-td:nth-child(1) {
          width: 64upx;
        }
        &-td:nth-child(2) {
          width: 224upx;
          margin-left: 100upx;
        }
        &-td:nth-child(3) {
          flex: 1;
          text-align: right;
        }
      }
    }
    &-tbody {
      &-tr {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 38upx;
        &-td {
          font-size: 28upx;
          color: rgba(255, 255, 255, 1);
          text-align: left;
        }
        &-td:nth-child(1) {
          width: 64upx;
          text-align: center;
        }
        &-td:nth-child(2) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 224upx;
          margin-left: 100upx;
        }
        &-td:nth-child(3) {
          text-align: right;
          flex: 1;
        }
        &-icon {
          width: 36upx;
          height: 40upx;
        }
      }
    }
  }
}
.no-data {
  font-size: 40upx;
  height: 660upx;
  line-height: 660upx;
  color: #fff;
}
</style>
