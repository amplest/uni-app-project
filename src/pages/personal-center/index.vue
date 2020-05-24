<template>
  <view class="container">
    <top></top>
    <leaderboard></leaderboard>
    <invite @onInviteFriends="shareBtn"></invite>
    <red-envelope></red-envelope>
    <share-sheet :show="shareShow" @cancel="cancelShare" @poster="handlePoster"></share-sheet>
    <share-poster :show="sharePosterShow" @close="closePosterShare"></share-poster>
    <copyright></copyright>
  </view>
</template>
<script>
import Top from './components/Top/index.vue'
import Leaderboard from './components/Leaderboard/index.vue'
import Invite from './components/Invite/index.vue'
import RedEnvelope from './components/RedEnvelope/index.vue'

import ShareSheet from '@/components/ShareSheet/index.vue'
import SharePoster from '@/components/SharePoster/index.vue'
import Copyright from '@/components/Copyright/index'

import { getMarketingId, getPUsersId } from '@/utils/cookies'

export default {
  data() {
    return {
      shareShow: false,
      sharePosterShow: false,
      postUrl: ''
    }
  },
  components: {
    Top,
    Leaderboard,
    Invite,
    RedEnvelope,
    ShareSheet,
    SharePoster,
    Copyright
  },
  methods: {
    shareBtn() {
      this.shareShow = true
    },

    cancelShare() {
      this.shareShow = false
    },

    handlePoster() {
      this.shareShow = false
      this.sharePosterShow = true
    },

    closePosterShare() {
      this.sharePosterShow = false
    }
  },
  async onShow() {
    this.p_users_id = getPUsersId()
    this.marketing_id = getMarketingId()
  },
  onShareAppMessage(e) {
    const getpusersid = this.p_users_id
    const marketingId = this.marketing_id
    return {
      title: '【上汽大众线上车展】淮安的朋友，你有 一个无门槛红包待领取~',
      imageUrl: '../../static/home/shareimg.jpg',
      path: `/pages/home/index?p_users_id=${getpusersid}&marketing_id=${marketingId}`
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #172E58;
}
</style>
