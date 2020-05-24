<template>
  <view class="container">
    <image class="section1" src="../../static/home/home-01.png"></image>
    <view class="section2">
      <image class="section2-title" src="../../static/home/home-03.png"></image>
      <view class="section2-content">
        <image class="section2-content-background" src="../../static/home/home-02.png"></image>
        <view class="section2-content-address">{{ address }}</view>
        <block v-if="!gift">
          <view class="section2-content-button" @click="receiveGifts" v-if="mobile">
            一键报名
          </view>
          <van-button
            open-type="getPhoneNumber"
            custom-class="section2-content-button"
            @getphonenumber="getPhoneNumber($event, receiveGifts)"
            v-else
          >
            一键报名
          </van-button>
        </block>
        <block v-else>
          <view class="section2-content-button section2-content-button-on" @click="onNavigateTo('/pages/equity/index')">
            已报名，去兑换 <van-icon name="arrow"></van-icon>
          </view>
        </block>
        <view class="section2-content-rule" @click="onOperation('activity')">规则</view>
      </view>
    </view>
    <view class="section3">
      <image class="section3-title" src="../../static/home/home-04.png"></image>
      <view class="section3-content">
        <view class="section3-content-title">
          免费送好友红包，TA领你获抽奖机会
        </view>
        <view class="section3-content-subtitle">送得多，得的多！</view>
        <van-notice-bar
          left-icon="volume-o"
          :text="notice"
          color="#ffffff"
          backgroundColor="rgba(242,67,81,0.3)"
          class="section3-content-notice"
        >
        </van-notice-bar>
        <fruit-machine
          custom-class="section3-content-fruit-machine"
          :is-start="draw_count > 0 ? false : true"
          @endCallBack.native="luckDraw"
        ></fruit-machine>
        <view class="section3-content-chance">您有{{ draw_count }}次抽奖机会</view>
        <van-button custom-class="section3-content-button" @click="onInviteFriends" v-if="mobile">
          送TA红包
        </van-button>
        <van-button
          open-type="getPhoneNumber"
          custom-class="section3-content-button"
          @getphonenumber="getPhoneNumber($event, onInviteFriends)"
          v-else
        >
          送TA红包
        </van-button>
        <view class="section3-content-prompt"> 每送出1份无门槛红包，可获得1次抽奖机会</view>
        <view class="section3-content-rule" @click="onOperation('rule')">规则</view>
      </view>
    </view>
    <view class="section4">
      <view class="section4-title">距活动结束</view>
      <count-down :currentTime="end_time" class="section4-countdown" />
      <view class="section4-box">
        <view class="section4-list">
          <view class="section4-item">
            <view class="section4-item-add">新增+{{ today.count1 }}</view>
            <view class="section4-item-number">{{ history.count1 }}</view>
            <view class="section4-item-title">已参与人数</view>
          </view>
          <view class="section4-item">
            <view class="section4-item-add">新增+{{ today.count2 }}</view>
            <view class="section4-item-number">{{ history.count2 }}</view>
            <view class="section4-item-title">已分享次数</view>
          </view>
          <view class="section4-item">
            <view class="section4-item-add">新增+{{ today.count3 }}</view>
            <view class="section4-item-number">{{ history.count3 }}</view>
            <view class="section4-item-title">已浏览次数</view>
          </view>
        </view>
      </view>
    </view>
    <view class="section5">
      <image class="section5-title" src="../../static/home/home-05.png"></image>
      <image class="section5-content" src="../../static/home/home-06.png"></image>
    </view>
    <!-- 分享 / 海报 -->
    <share-sheet :show="shareShow" @cancel="cancelShare" @poster="handlePoster"></share-sheet>
    <share-poster :show="sharePosterShow" @close="closePosterShare"></share-poster>
    <!--  右侧悬浮：无门槛红包  -->
    <view class="hover-button animated swing infinite" @click.native="redEnvelopeFirstShow = true" v-if="!first">
      <image src="../../static/home/home-07.png" class="hover-button-image"></image>
      <view class="hover-button-text">无门槛红包</view>
    </view>
    <!--  右侧悬浮：抽奖  -->
    <view class="hover-button hover-button2 animated swing infinite" @click="onAnchorPoint">
      <image src="../../static/home/home-07.png" class="hover-button-image"></image>
      <view class="hover-button-text hover-button2-text">抽奖X{{draw_count}}</view>
    </view>
    <!--  右侧悬浮：分享得红包  -->
    <view class="hover-button hover-button3"  @click="onInviteFriends" v-if="mobile">
      <image src="../../static/home/home-09.png" class="hover-button-image hover-button3-image"></image>
    </view>
    <van-button
      open-type="getPhoneNumber"
      custom-class="hover-button hover-button3"
      @getphonenumber="getPhoneNumber($event, onInviteFriends)"
      v-else
    >
      <image src="../../static/home/home-09.png" class="hover-button-image hover-button3-image"></image>
    </van-button>


    <!-- 弹框：无门槛红包-首次 -->
    <van-overlay :z-index="999" :show="redEnvelopeFirstShow">
      <view class="overlay-red-envelopes-box">
        <view class="overlay-red-envelopes-bg">
          <view class="overlay-red-envelopes-close" @click.native="redEnvelopeFirstShow = false">
            <van-icon name="close" />
          </view>
          <view class="overlay-red-envelopes-info">
            <view class="overlay-red-envelopes-logo">
              <image src="../../static/home/dz-logo.png"></image>
            </view>
            <view class="overlay-red-envelopes-txt">
              <view>恭喜！你获得1次抽奖机会</view>
            </view>
            <view class="overlay-red-envelopes-btn">
              <view class="overlay-red-envelopes-btn-con" @click.native="receiveRedEnvelope" v-if="mobile">
                <view class="overlay-red-envelopes-btn-con-txt">
                  <view class="overlay-red-envelopes-btn-con-big">抽奖</view>
                </view>
              </view>
              <van-button
                open-type="getPhoneNumber"
                custom-class="overlay-red-envelopes-btn-con"
                @getphonenumber="getPhoneNumber($event, receiveRedEnvelope)"
                v-else
              >
                <view class="overlay-red-envelopes-btn-con-txt">
                  <view class="overlay-red-envelopes-btn-con-big">抽奖</view>
                </view>
              </van-button>
            </view>
          </view>
        </view>
      </view>
    </van-overlay>
    <!-- 弹框：无门槛红包-抽奖失败 -->
    <van-overlay :z-index="999" :show="redEnvelopeFailShow">
      <view class="overlay-red-envelopes-fail">
        <view class="overlay-red-envelopes-fail-box">
          <view class="overlay-red-envelopes-fail-close" @click.native="redEnvelopeFailShow = false">
            <van-icon name="close" />
          </view>
          <view class="overlay-red-envelopes-fail-info">
            <view class="overlay-red-envelopes-fail-info-tit">很遗憾，你不在淮安市内</view>
            <view class="overlay-red-envelopes-fail-info-subtit">无法领取无门槛红包</view>
            <view class="overlay-red-envelopes-fail-info-img">
              <image src="../../static/home/red-envelopes-car.png"></image>
            </view>
          </view>
          <view class="overlay-red-envelopes-fail-btn" @click.native="redEnvelopeFailShow = false">
            <view>看看其他活动</view>
          </view>
        </view>
      </view>
    </van-overlay>
    <!-- 弹框：无门槛红包-成功领取红包 -->
    <van-overlay :z-index="999" :show="redEnvelopeCompleteShow">
      <view class="first-red-envelope">
        <view class="first-red-envelope-bg">
          <view class="first-red-envelope-close" @click.native="redEnvelopeCompleteShow = false">
            <van-icon name="close" />
          </view>
          <view class="first-red-envelope-info">
            <view class="first-red-envelope-info-tit">恭喜！获得上汽大众的红包</view>
            <view class="first-red-envelope-info-momeny">
              <view class="first-red-envelope-info-momeny-big">{{ money }}</view
              ><view class="first-red-envelope-info-momeny-small">元</view>
            </view>
            <view class="first-red-envelope-info-tips">红包已存入微信钱包</view>
          </view>
          <view class="first-red-envelope-remark">
            <view class="first-red-envelope-remark-tit" @click.native="redEnvelopeCompleteShow = false">邀请好友，领取更多红包</view>
            <view class="first-red-envelope-remark-tips">给1位好友送红包，即可获得1次抽奖机会</view>
          </view>
        </view>
      </view>
    </van-overlay>
    <!--  弹框：活动说明 && 规则  -->
    <van-overlay :z-index="999" :show="overlayShow" @click="overlayShow = false">
      <view class="overlay-box" @click.stop>
        <view class="overlay-center">
          <view class="overlay-center-info" :class="!activityShow ? 'overlay-center-info2' : ''">
            <view class="overlay-center-info-tit">{{ activityShow ? '到店好礼活动规则' : '送TA红包活动规则' }}</view>
            <view class="overlay-center-info-con">
              <block v-if="activityShow">
                <view>
                  <view class="overlay-center-info-con-txt">
                    交50即可享受以下权益：<br />
                    一、免费领取泰国乳胶枕一个，领取时间5月23-24日，逾期视为放弃领取；<br />
                    二、享888购车现金消费券，有效期截止5月31日；<br />
                    三、5月31日后没下单，6月1日-30日到店可退还50元定金，礼品无需归还。
                  </view>
                  <view class="overlay-center-info-con-tips">详情请恰当地经销商。</view>
                </view>
              </block>
              <block v-else>
                <view>
                  <view class="overlay-center-info-con-txt">
                    1. 活动时间：2020年5月21日 18:00 - 2020年5月31日 23:59，本活动所有时间均以北京时间为准。<br />

                    2. 活动期间，每邀请1位有效好友即可开一次红包，红包金额满0.3元自动打款到微信零钱，可前往微信零钱查看。<br />

                    3.
                    您可将活动页面分享给好友（具体分享方式以平台内实际提供的分享方式为准），被您邀请的好友打开小程序并成功领取无门槛红包后即视为您邀请好友成功。您可以在【个人中心】中查看被您成功邀请的好友。<br />

                    4.
                    活动期间，每个用户只能被成功邀请一次，且仅可领取一次无门槛红包。同一个登录账号、同一个手机号、同一个设备等与用户身份相关的信息，其中任意一项或数项存在相同、相似、通过特定标记形成批量信息、或其他非真实有效等情形的，都视为同一个用户，按活动规则中的同一用户处理。<br />
                    什么叫有效好友？<br />
                    被邀请的好友打开小程序，并成功领取到无门槛红包（授权手机号、且地理位置在淮安即可领取无门槛红包）。
                  </view>
                </view>
              </block>
            </view>
          </view>
          <view class="img-btn">
            <view @click.stop="overlayShow = false">
              <image src="../../static/equity/icon-03.png" alt=""></image>
            </view>
          </view>
        </view>
      </view>
    </van-overlay>
    <!--  弹框：水果机抽奖-结果  -->
    <van-overlay :z-index="999" :show="fruitMachineShow">
      <view class="first-red-envelope">
        <view class="first-red-envelope-bg">
          <view class="first-red-envelope-close" @click.native="fruitMachineShow = false">
            <van-icon name="close" />
          </view>
          <view class="first-red-envelope-info">
            <view class="first-red-envelope-info-tit">恭喜！获得上汽大众的红包</view>
            <view class="first-red-envelope-info-momeny">
              <view class="first-red-envelope-info-momeny-big">{{ money }}</view
              ><view class="first-red-envelope-info-momeny-small">元</view>
            </view>
            <view class="first-red-envelope-info-tips" style="margin-top: 20rpx;font-size: 30upx"><text style="font-size: 40upx">满0.3元</text><br/>自动打款到微信零钱</view>
          </view>
        </view>
      </view>
    </van-overlay>
    <!--  授权地理位置  -->
    <van-dialog
      use-slot
      title="请授权地理位置信息"
      message="需要获取您的地理位置，请确认授权"
      :show="locationShow"
      confirm-button-open-type="openSetting"
      @opensetting = 'handleLocation'
    >
      <view class="dialog-message">
        淮安市用户可额外获得一份无门槛红包
      </view>
    </van-dialog>
    <!--  版权  -->
    <copyright></copyright>
  </view>
</template>

<script>
import CountDown from '@/components/CountDown/index.vue'
import ShareSheet from '@/components/ShareSheet/index.vue'
import SharePoster from '@/components/SharePoster/index.vue'
import Copyright from '@/components/Copyright/index'

import { showToast } from '@/utils/index'
import { setMarketingId, setPUsersId, getMarketingId, getPUsersId } from '@/utils/cookies'
import { getCode,getLocation } from '@/utils/miniApp'

import { getMobile } from '@/api/common'
import { getInformation, receiveRedEnvelope, getLuckDrawCount, getStatistics, receiveGifts, luckDraw, userBrowse } from '@/api/home'

export default {
  components: {
    CountDown,
    ShareSheet,
    SharePoster,
    Copyright
  },
  data() {
    return {
      draw_count: 0, //抽奖次数
      notice: '', //公告
      today: {}, //新增统计
      history: {}, //历史统计
      end_time: '', //倒计时
      gift: false, //是否领取礼包
      redEnvelopeFirstShow: false, //红包-首次领取
      redEnvelopeFailShow: false, //红包-失败领取
      redEnvelopeCompleteShow: false, //红包-领取成功
      activityShow: false,
      overlayShow: false,
      fruitMachineShow: false,
      money: 0,
      shareShow: false,
      sharePosterShow: false,
      first: false,
      address: '',
      p_users_id: '',
      marketing_id: 1,
      city: '', //授权地理位置
      mobile: '', //授权手机号
      nickname: '', //授权昵称
      locationShow: false
    }
  },
  methods: {
    onInviteFriends() {
      this.shareShow = true
    },

     handlePoster() {
      this.shareShow = false
      this.sharePosterShow = true
    },

    cancelShare() {
      this.shareShow = false
    },

    closePosterShare() {
      this.sharePosterShow = false
    },

    async userBrowse() {
      const marketingId = getMarketingId()
      try {
        await userBrowse(marketingId)
        console.log('userBrowse success')
      } catch (error) {
        console.log('userBrowse error', error)
      }
    },

    async getInformation() {
      //用户基础信
      const marketingId = getMarketingId()
      try {
        const {
          gift,
          first,
          notice,
          detail: { draw_count, city },
          address,
          id,
          mobile
        } = await getInformation(marketingId)

        this.redEnvelopeFirstShow = !first
        this.first = first
        this.notice = notice
        this.draw_count = draw_count
        this.gift = gift
        this.address = address
        this.p_users_id = id
        this.city = city
        this.mobile = mobile
        setPUsersId(id)
      } catch (error) {
        console.log('getInformation error', error)
      }
    },

    async getLuckDrawCount() {
      //抽奖次数
      const marketingId = getMarketingId()

      try {
        const { count } = await getLuckDrawCount(marketingId)
        this.draw_count = count
      } catch (error) {
        showToast(error.message)
        console.log('getLuckDrawCount error', error)
      }
    },

    async getStatistics() {
      //数据统计
      const marketingId = getMarketingId()

      try {
        const {
          end_time,
          data: { history, today }
        } = await getStatistics(marketingId)

        this.history = history
        this.today = today
        this.end_time = end_time
      } catch (error) {
        console.log('getStatistics error', error)
      }
    },

    async receiveRedEnvelope() {
      //领取无门槛红包
      try {
        const marketingId = getMarketingId()
        const { money } = await receiveRedEnvelope(marketingId)

        this.money = Number(money) / 100
        this.redEnvelopeCompleteShow = true
        this.redEnvelopeFailShow = false
        this.redEnvelopeFirstShow = false

        await this.getInformation()
      } catch (error) {
        if(Number(error.status_code) === 700) {
          this.locationShow = !this.locationShow
        }else if (Number(error.status_code) === 800) {
          this.redEnvelopeFailShow = true
          this.redEnvelopeFirstShow = false
          this.redEnvelopeCompleteShow = false
        }else {
          showToast(error.error)
        }
      }
    },

    async receiveGifts() {
      //领取礼包
      const marketingId = getMarketingId()

      try {
        const data = await receiveGifts(marketingId)

        this.onNavigateTo('/pages/equity/index')
        showToast('领取成功')

        this.gift = false
      } catch (error) {
        showToast('领取失败')
        console.log('receiveGifts error', error)
      }
    },

    async luckDraw() {
      //水果机抽奖
      const marketingId = getMarketingId()

      try {
        const { money } = await luckDraw(marketingId)
        this.fruitMachineShow = true
        this.money = Number(money) / 100
        await this.getLuckDrawCount() //更新抽奖机会
      } catch (error) {
        showToast(error.message)
      }
    },

    onOperation(type) {
      if (type !== 'activity') {
        this.activityShow = false
      } else {
        this.activityShow = true
      }
      this.overlayShow = true
    },

    getCurPage() {
      let pages = getCurrentPages()
      let curPage = pages[pages.length - 1]
      return curPage
    },

    onNavigateTo(url) {
      uni.navigateTo({
        url
      })
    },

    async getPhoneNumber(e, task) {
      const {
        detail: { encryptedData, iv }
      } = e
      const wxCode = await getCode()
      const marketing_id = getMarketingId()

      try {
        await getMobile(wxCode, encodeURIComponent(encryptedData), encodeURIComponent(iv), marketing_id)
        await this.getInformation()
        task()
      } catch (error) {
        showToast('授权失败，请重新授权')
      }
    },

    handleLocation() {
      getLocation()
    },

    onAnchorPoint() {
      uni.createSelectorQuery().select(".section1").boundingClientRect(data=>{
        uni.createSelectorQuery().select(".section3").boundingClientRect((res)=>{
          uni.pageScrollTo({
            duration:0,
            scrollTop:res.top - data.top
          })
        }).exec()
      }).exec();
    },

    init() {
      this.getInformation()
      this.getLuckDrawCount()
      this.getStatistics()
      this.userBrowse()
    }
  },
  async onShow() {
    const curPage = this.getCurPage()
    const options = curPage.options
    const scene = options.scene

    //默认（既不是扫码||分享）

    setMarketingId(1)
    setPUsersId('')

    if (options.scene && decodeURIComponent(options.scene)) {
      //扫码进入
      const sceneArr = decodeURIComponent(options.scene).split('@')
      const p_users_id = sceneArr[0]
      const marketing_id = sceneArr[1]

      setMarketingId(marketing_id)
      setPUsersId(p_users_id)
    }

    if (options.p_users_id) {
      //分享进入
      const { p_users_id, marketing_id } = options
      setMarketingId(marketing_id)
      setPUsersId(p_users_id)
    }

    this.init()
  },
  onShareAppMessage(e) {
    const p_users_id = getPUsersId()
    const marketing_id = getMarketingId()

    return {
      title: '【上汽大众线上车展】淮安的朋友，你有 一个无门槛红包待领取~',
      imageUrl: '../../static/home/shareimg.jpg',
      path: `/pages/home/index?p_users_id=${p_users_id}&marketing_id=${marketing_id}`
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/animate.css';
.container {
  background: rgba(23, 46, 88, 1);
  .section1 {
    display: block;
    width: 100%;
    height: 1026upx;
  }
  .section2 {
    &-title {
      display: block;
      width: 224upx;
      height: 111upx;
      margin: 60upx auto 38upx auto;
    }
    &-content {
      position: relative;
      width: 100%;
      height: 1200upx;
      padding: 0 20upx;
      &-address {
        position: absolute;
        bottom: 220upx;
        left: 64upx;
        font-size: 30upx;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        z-index: 20;
        margin-top: 10upx;
      }
      &-rule {
        position: absolute;
        top: 168upx;
        right: 20upx;
        z-index: 20;
        width: 120upx;
        height: 56upx;
        line-height: 56upx;
        text-align: center;
        border: 2upx solid rgba(0, 0, 0, 1);
        border-right: none;
        border-radius: 28upx 0px 0px 28upx;
        font-size: 32upx;
        color: rgba(0, 0, 0, 1);
      }
      &-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
      }
      &-button {
        position: absolute;
        bottom: 60upx;
        left: 50%;
        margin-left: -300upx;
        width: 600upx;
        height: 100upx;
        line-height: 100upx;
        text-align: center;
        background: rgba(254, 0, 0, 1);
        box-shadow: 0 6upx 12upx rgba(0, 0, 0, 0.2);
        opacity: 1;
        border-radius: 56upx;
        z-index: 20;
        font-size: 44upx;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        border: none;
        &-on {
          border-radius: 56upx;
          background: #52565b;
          color: #ffffff;
        }
      }
    }
  }
  .section3 {
    margin-top: 60upx;
    text-align: center;
    &-title {
      display: block;
      width: 224upx;
      height: 111upx;
      margin: 60upx auto 38upx auto;
    }
    &-content {
      background: linear-gradient(180deg, rgba(246, 141, 103, 1) 0%, rgba(242, 67, 81, 1) 100%);
      box-shadow: 0px 6px 12px rgba(255, 28, 0, 0.4);
      padding: 80upx 0;
      position: relative;
      &-rule {
        position: absolute;
        top: 168upx;
        right: 0;
        z-index: 20;
        width: 120upx;
        height: 56upx;
        line-height: 56upx;
        text-align: center;
        font-size: 32upx;
        color: rgba(211, 32, 84, 1);
        background: linear-gradient(180deg, rgba(247, 251, 250, 1) 0%, rgba(251, 217, 220, 1) 100%);
        border-radius: 28upx 0px 0px 28upx;
      }
      &-title {
        font-size: 36upx;
        color: rgba(255, 255, 255, 1);
        position: relative;
      }
      &-subtitle {
        font-size: 48upx;
        line-height: 66upx;
        color: rgba(255, 255, 255, 1);
        margin-top: 4upx;
      }
      &-notice {
        display: block;
        margin-top: 50upx;
      }
      &-chance {
        font-size: 40upx;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin: 60upx 0;
      }
      &-button {
        width: 600upx;
        height: 100upx;
        line-height: 100upx;
        text-align: center;
        background: linear-gradient(180deg, rgba(247, 251, 250, 1) 0%, rgba(251, 217, 220, 1) 100%);
        box-shadow: 0px 6upx 12upx rgba(95, 0, 0, 0.2);
        border-radius: 56upx;
        margin-top: 40upx;
        margin: 0 auto;
        font-size: 44upx;
        font-weight: 500;
        color: rgba(211, 32, 84, 1);
      }
      &-prompt {
        font-size: 28upx;
        color: rgba(255, 255, 255, 1);
        margin-top: 20upx;
      }
      &-fruit-machine {
        margin-top: 70upx;
      }
    }
  }
  .section4 {
    width: 686upx;
    padding: 0 32upx;
    border-radius: 40upx;
    margin: 0 auto;
    &-title {
      text-align: center;
      margin-top: 62upx;
      font-size: 36upx;
      font-weight: 600;
      color: rgba(190, 41, 41, 1);
    }
    &-countdown {
      margin: 20upx 40upx;
    }
    &-box {
      background: rgba(153, 13, 14, 1);
      padding: 12upx;
      border-radius: 40upx;
    }
    &-list {
      border: 4upx solid rgba(243, 230, 203, 1);
      border-radius: 40upx;
      display: flex;
    }
    &-item {
      width: 33.3%;
      padding: 30upx 0;
      text-align: center;
      &-add {
        font-size: 26upx;
        color: rgba(243, 230, 203, 1);
      }
      &-number {
        font-size: 40upx;
        font-weight: 500;
        padding: 20upx 0;
        color: rgba(243, 230, 203, 1);
      }
      &-title {
        font-size: 26upx;
        color: rgba(243, 230, 203, 1);
      }
    }
  }
  .section5 {
    margin-top: 60upx;
    &-title {
      display: block;
      width: 224upx;
      height: 111upx;
      margin: 0 auto;
    }
    &-content {
      margin-top: 18upx;
      width: 100%;
      height: 4014upx;
    }
  }
  .hover-button {
    position: fixed;
    right: 0;
    top: 600upx;
    z-index: 30;
    width: 167upx;
    height: 219upx;
    &-image {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    &-text {
      position: absolute;
      right: 16rpx;
      bottom: 62rpx;
      font-size:20upx;
      /*font-weight:600;*/
      color:rgba(255,255,255,1);
      transform: rotate(-20deg)
    }
  }
  .hover-button2 {
    top: 900upx;
    &-text {
      right: 41rpx;
    }
  }
  .hover-button3 {
    display: block;
    top: 1200upx;
    right: 20upx;
    width: 120upx;
    height: 120upx;
    background: transparent;
    padding: 0;
    border: none;
  }
  .hover-button3::after {
    border: none;
  }
  .overlay-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    &-center {
      &-content {
        position: relative;
        width: 500upx;
        height: 492upx;
        background: linear-gradient(180deg, rgba(247, 251, 250, 1) 0%, rgba(251, 217, 220, 1) 100%);
        box-shadow: 0px 40upx 40upx rgba(77, 0, 0, 0.82);
        text-align: center;
        border-radius: 20upx;
        &-image {
          width: 318upx;
          height: 276upx;
        }
        &-title {
          font-size: 36upx;
          color: rgba(211, 32, 84, 1);
        }
        &-subtitle {
          font-size: 28upx;
          color: rgba(203, 133, 11, 1);
        }
      }
    }
  }
  .overlay-center {
    position: relative;
    &-image {
      margin: 0 auto;
      width: 620upx;
      height: 612upx;
    }
    &-info {
      width: 670upx;
      min-height: 300upx;
      padding: 60upx;
      background-color: #fff;
      border-radius: 20upx;
      &-tit {
        font-size: 36upx;
        color: #070707;
        padding-top: 20upx;
        padding-bottom: 60upx;
        text-align: center;
        font-weight: 600;
      }
      &-con {
        font-size: 28upx;
        padding-bottom: 20upx;
        &-txt {
          color: #070707;
          line-height: 40upx;
          font-weight: 500;
        }
        &-tips {
          margin-top: 60upx;
          font-weight: 500;
        }
        &-title {
          font-size: 28upx;
          text-align: center;
          margin-bottom: 20upx;
          font-weight: 600;
        }
        &-subtxt {
          font-size: 24upx;
          line-height: 34upx;
          color: rgba(112, 112, 112, 1);
        }
        &-subtxt1 {
          margin-bottom: 60upx;
          view {
            margin-bottom: 10upx;
          }
        }
      }
    }
    &-info2 {
      padding: 20upx;
    }
  }
  .red-envelopes {
    position: fixed;
    top: 600upx;
    right: 0;
    image {
      width: 140upx;
      height: 158upx;
    }
  }
  .overlay-red-envelopes-box {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    .overlay-red-envelopes-bg {
      position: relative;
      background: url('data:image/png;base64,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')
        no-repeat center center;
      background-size: 100%;
      width: 100%;
      height: 822upx;
    }
    .overlay-red-envelopes-close {
      position: absolute;
      top: 20rpx;
      right: 30rpx;
      font-size: 54upx;
      color: #c4a00b;
    }
    .overlay-red-envelopes-info {
      padding: 100upx 100upx 0;
      width: 100%;
      height: 100%;
    }
    .overlay-red-envelopes-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 38upx;
      image {
        width: 88upx;
        height: 88upx;
      }
    }
    .overlay-red-envelopes-txt {
      font-size: 36upx;
      color: #fff;
      text-align: center;
      margin-top: 50upx;
    }
    .overlay-red-envelopes-img {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-top: 20upx;
      image {
        border: 2upx solid #fff;
        border-radius: 20upx;
        width: 186upx;
        height: 186upx;
        display: block;
      }
      .red-envelopes-mask {
        position: relative;
        &::before {
          content: '再接再厉';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #fff;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 20upx;
          line-height: 186upx;
          text-align: center;
        }
      }
    }
    .overlay-red-envelopes-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 224upx;
      margin-bottom: 26upx;
      margin-top: 166upx;
      &-con {
        width: 208upx;
        height: 224upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        &-txt {
          color: #dd2a0d;
          display: flex;
          flex-direction: row;
        }
        &-big {
          font-size: 52upx;
        }
        &-small {
          font-size: 30upx;
          display: flex;
          align-items: flex-end;
          padding-bottom: 6upx;
          padding-left: 10upx;
        }
      }
    }
  }
  .overlay-red-envelopes-fail {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    &-box {
      width: 600upx;
      border-radius: 40upx;
      background-color: #fff;
      padding: 60upx 60upx 20upx;
      position: relative;
    }
    &-close {
      position: absolute;
      top: -54upx;
      right: -54upx;
      font-size: 54upx;
      color: #c4a00b;
    }
    &-info {
      &-tit {
        font-size: 40upx;
        color: #333;
        text-align: center;
        margin-bottom: 18upx;
      }
      &-subtit {
        color: #666;
        font-size: 36upx;
        text-align: center;
      }
      &-img {
        margin-top: 60upx;
        image {
          width: 100%;
        }
      }
    }
    &-btn {
      background: url('../../static/home/red-envelopes-btn.png') no-repeat center;
      background-size: 100%;
      color: #fff;
      font-size: 38upx;
      display: flex;
      justify-content: center;
      height: 142upx;
      & > view {
        margin-top: 30upx;
      }
    }
  }
  .first-red-envelope {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    &-bg {
      position: relative;
      background: url('data:image/png;base64,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')
        no-repeat center center;
      background-size: 100%;
      width: 650upx;
      height: 830upx;
    }
    &-close {
      position: absolute;
      top: 0upx;
      right: 0upx;
      font-size: 54upx;
      color: #c4a00b;
    }
    &-info {
      padding-top: 322upx;
      text-align: center;
      &-tit {
        font-size: 34upx;
        color: #fff;
        margin-bottom: 60upx;
      }
      &-momeny {
        color: #fff;
        &-big {
          font-size: 118upx;
          display: inline-block;
        }
        &-small {
          display: inline-block;
          font-size: 30upx;
        }
      }
      &-tips {
        font-size: 22upx;
        color: #fff;
        margin-bottom: 54upx;
      }
    }
    &-remark {
      text-align: center;
      &-tit {
        background-color: #f9fb8e;
        width: 469upx;
        height: 52upx;
        line-height: 52upx;
        font-size: 34upx;
        color: #f01d18;
        display: inline-block;
        border-radius: 24px;
        margin-bottom: 20upx;
      }
      &-tips {
        font-size: 28upx;
        color: #ffcc00;
      }
    }
  }
  .overlay-box-image {
    width: 620upx;
    height: 612upx;
  }
  .img-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40upx;
    image {
      width: 80upx;
      height: 80upx;
    }
  }
  .tips-txt {
    position: absolute;
    top: 36upx;
    right: 0;
    font-size: 24upx;
    height: 46upx;
    display: flex;
    align-items: center;
    color: #fff;
    border-top-left-radius: 23upx;
    border-bottom-left-radius: 23upx;
    border: 2upx solid #fff;
    border-right-color: transparent !important;
    border-right-width: 0 !important;
    padding-left: 22upx;
    padding-right: 22upx;
  }
  .tips-txt-red {
    color: #d82415;
    border: 2upx solid #d82415;
    right: 20upx;
    top: 46upx;
  }
  .dialog-message {
    max-height: 60vh;
    padding: 24px;
    overflow-y: auto;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
    text-align: center;
    word-wrap: break-word;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
