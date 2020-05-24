import fly from '@/utils/request'

export const doLogin = (code, marketing_id) => fly.post('/user/login', { code, marketing_id }) //用户-登录-已对接
export const setUserLocation = (latitude, longitude, marketing_id) => fly.post('/user/city', { latitude, longitude, marketing_id }) //用户-授权地理位置-已对接
export const getMobile = (code, encryptedData, iv, marketing_id) => fly.post('/user/mobile', { code, encryptedData, iv, marketing_id }) //用户-授权手机号-已对接
export const setUserInfo = (avatar,nickname) => fly.post('/user/update', { avatar,nickname }) //用户-授权头像和昵称-已对接
export const shareCount = (marketing_id) => fly.post('/user/draw/couting', { marketing_id }) //用户-分享埋点
export const getPoster = (marketing_id) => fly.post('/user/poster', {marketing_id}, { showLoading: true }) // 生成海报
