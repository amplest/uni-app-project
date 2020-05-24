import { showLoading, hideLoading } from '@/utils/index'
import { getMarketingId } from '@/utils/cookies'

import { setUserLocation } from '@/api/common'

export const getLocation = () => {
  wx.getLocation({
    success: async res => {
      try {
        const { latitude, longitude } = res
        const marketing_id = getMarketingId()
        setUserLocation(latitude, longitude, marketing_id)
      } catch (error) {
        console.log('setUserLocation error', error)
      }
    },
    fail: error => {
      uni.showModal({
        title: '定位服务已关闭',
        content: '请在“设置”中打开定位服务,以便领取无门槛红包！'
      })
    }
  })
}

export const isAuthorizeLocation = () => {
  return new Promise(resolve => {
    uni.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation'] !== undefined && !res.authSetting['scope.userLocation']) {
          resolve(false)
        }
        resolve(true)
      }
    })
  })
}

export const checkSession = () => {
  return new Promise((resolve, reject) => {
    uni.checkSession({
      success() {
        resolve()
      },
      fail() {}
    })
  })
}

export const getCode = () => {
  showLoading()
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      uni.login({
        success(res) {
          const code = res.code
          if (code) {
            resolve(code)
          } else {
            reject(res)
          }
          hideLoading()
        }
      })
    }, 500)
  })
}

