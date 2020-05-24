<template>
  <view class="container">
    <view class="card-info">
      <view class="flex-box card-info-head">
        <view>兑换日期：{{ prize.start_time }}-{{ prize.end_time }}</view>
      </view>
      <view class="prize-img">
        <image :src="prize.image"></image>
      </view>
      <view class="flex-box card-info-foot">
        <view>核销编号：{{ prize.code }}</view>
      </view>
    </view>
    <view class="card-info">
      <view class="flex-box card-info-head">
        <view>兑换日期：{{ cashCoupon.start_time }}-{{ cashCoupon.end_time }}</view>
      </view>
      <view class="cash-coupon-image">
        <image :src="cashCoupon.image"></image>
      </view>
      <view class="flex-box card-info-foot">
        <view>核销编号：{{ cashCoupon.code }}</view>
      </view>
    </view>
    <view class="eq-rule">
      <view class="eq-rule-title">活动规则：</view>
      <view class="eq-rule-txt">
        <view>交50即可享受以下权益：</view>
        <view>一、免费领取泰国乳胶枕一个，领取时间5月23-24日，逾期视为放弃领取；</view>
        <view>二、享888购车现金消费券，有效期截止5月31日；</view>
        <view>三、5月31日后没下单，6月1日-30日到店可退还50元定金，礼品无需归还。 </view>
        <view class="eq-rule-tips">详情请恰当地经销商。</view>
      </view>
    </view>
    <view class="eq-add">
      <view>
        <view class="eq-add-title">兑奖地址：</view>
        <view class="flex-box eq-add-info">
          <view class="eq-add-info-txt">
            <view class="eq-add-info-txt-title">
              {{name}}
            </view>
            <view class="flex-box eq-add-info-img" @click.native="onLocation(lat, lon)">
              <view>
                <image src="../../static/equity/icon-02.png"></image>
              </view>
              <view class="eq-add-info-txt-add">{{address}}</view>
            </view>
          </view>
          <view class="flex-box eq-add-info-tel" @click.native="onCall(telphone)">
            <view>{{telphone}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getGiftList, getActivityInfo } from '@/api/equity'
import { getMarketingId } from '@/utils/cookies'

export default {
  data() {
    return {
      lat: '',
      lon: '',
      prize: {},
      cashCoupon: {},
      telphone: '',
      address: '',
      name:''
    }
  },
  methods: {
    async getGiftList() {
      try {
        const marketingId = getMarketingId()
        const data = await getGiftList(marketingId)
        this.prize = data[0]
        this.cashCoupon = data[1]
      } catch (error) {
        console.log('getGiftList error', error)
      }
    },

    async getActivityInfo() {
      try {
        const marketingId = getMarketingId()
        const { lat, lon, telphone, address, name } = await getActivityInfo(marketingId)

        this.lat = lat
        this.lon = lon
        this.telphone = telphone
        this.address = address
        this.name = name
      } catch (error) {
        console.log('getActivityInfo error', error)
      }
    },
    onCall(tel) {
      if (tel) {
        uni.makePhoneCall({
          phoneNumber: tel
        })
      }
    },
    onLocation(lat, lng) {
      if (!lat || !lng) {
        return
      }

      uni.openLocation({
        latitude: Number(lat),
        longitude: Number(lng),
        success: function () {
          console.log('map success')
        }
      })
    },
    onPageShow() {
      this.getActivityInfo()
      this.getGiftList()
    }
  }
}
</script>

<style lang="scss" scoped>
.prize-img {
  image {
    width: 670upx;
    height: 142upx;
  }
}
.cash-coupon-image {
  image {
    width: 670upx;
    height: 378upx;
  }
}
.container {
  background-color: #001f50;
}
.card-info {
  width: 710rpx;
  margin: 0 auto 60rpx;
  background-color: #dedede;
  border-radius: 20px;
  padding: 20rpx;
  &-head {
    border-bottom: 2rpx dashed #eee;
    font-size: 28rpx;
    font-weight: 500;
    height: 100rpx;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 60rpx;
  }
  &-foot {
    align-items: center;
    justify-content: flex-start;
    height: 80rpx;
    font-weight: 500;
    font-size: 28rpx;
    margin-top: 20rpx;
  }
  &-list {
    &-item {
      background-color: #fff;
      height: 140rpx;
      border-radius: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 26rpx 0 26rpx 26rpx;
      &-info {
        flex-direction: column;
        flex-grow: 1;
      }
      &-title {
        font-size: 36rpx;
        font-weight: 700;
        margin-bottom: 4rpx;
      }
      &-sbutitle {
        font-size: 24rpx;
      }
      &-img {
        width: 149rpx;
        height: 132rpx;
        flex-shrink: 0;
        image {
          width: 149rpx;
          height: 132rpx;
        }
      }
    }
  }
  &-box {
    &-info {
    }
    &-head {
      background-color: #fff;
      padding: 20rpx;
      align-items: center;
      border-radius: 12px;
      font-weight: 700;
      height: 140rpx;
      margin-bottom: 40rpx;
    }
    &-txt {
      background-color: #fff;
      padding: 38rpx 20rpx;
      border-radius: 12px;
      &-title {
        font-size: 36rpx;
        font-weight: 700;
        margin-bottom: 4rpx;
      }
      &-con {
        font-size: 24rpx;
      }
    }
  }
  &-red {
    color: #f24351;
    display: inline-block;
  }
}
.eq-rule {
  padding: 0 40rpx;
  color: #fff;
  &-title {
    font-size: 36rpx;
    font-weight: 700;
    margin-bottom: 20rpx;
  }
  &-txt {
    font-size: 28rpx;
    line-height: 40rpx;
  }
  &-tips {
    margin-top: 60rpx;
  }
}
.eq-add {
  margin-top: 60rpx;
  padding: 0 40rpx 40rpx;
  color: #fff;
  &-title {
    font-size: 36rpx;
    font-weight: 700;
    margin-bottom: 20rpx;
  }
  &-info {
    justify-content: space-between;
    &-txt {
      image {
        width: 20rpx;
        height: 27rpx;
      }
      &-title {
        color: #fff;
        font-size: 28rpx;
        margin-bottom: 8rpx;
      }
    }
    &-tel {
      align-items: center;
      color: #00b1ff;
      font-size: 24rpx;
    }
    &-img {
      color: #00b1ff;
      font-size: 24rpx;
      align-items: flex-start;
      image {
        vertical-align: -8rpx;
        margin-right: 10rpx;
      }
    }
  }
}
.flex-box {
  display: flex;
}
</style>
