import { BASE_URL as baseURL } from '@/config'

import { showLoading, hideLoading, toPromise } from '@/utils/index'

import { getMarketingId, getPUsersId, setToken, getToken } from '@/utils/cookies'

const Fly = require('flyio/dist/npm/wx')

const fly = new Fly()
const newFly = new Fly()

fly.config = {
  baseURL
}

newFly.config = {
  baseURL
}

fly.interceptors.request.use(async request => {
  // if (request.showLoading) {
  //   showLoading()
  // }

  request.headers['Authorization'] = 'Bearer ' + getToken()
  return request
})

fly.interceptors.response.use(
  function (response) {
    // hideLoading()

    return response.data
  },
  function (error) {
    if (error.response) {
      const { status_code: statusCode } = error.response.data

      switch (statusCode) {
        case 401:
          fly.lock()
          return toPromise(uni.login).then( async ({ code }) => {
            const marketing_id = getMarketingId()
            const p_users_id = getPUsersId()
            return newFly
              .post('/user/login', { code, marketing_id, p_users_id })
              .then(res => {
                const { token } = res.data.data

                setToken(token)
                error.request.headers['Authorization'] = 'Bearer ' + token
                return error.request
              })
              .finally(() => fly.unlock())
              .then(() => {
                return fly.request(error.request)
              })
          })
        // case 600:
        //   uni.reLaunch({
        //     url: '/pages/authorize-phone/index'
        //   })
        // case 700:
        //   uni.reLaunch({
        //     url: '/pages/authorize-location/index'
        //   })
        // case 900:
        //   uni.reLaunch({
        //     url: '/pages/authorize-info/index'
        //   })
      }
    }
    // hideLoading()

    return Promise.reject(error.response.data)
  }
)

export default fly
