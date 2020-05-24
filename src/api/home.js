import fly from '@/utils/request'

export const getInformation = marketing_id => fly.post('/user/information', { marketing_id }) //用户基础信息
export const receiveRedEnvelope = marketing_id => fly.post('/user/first/red/envelope', { marketing_id }, { showLoading: true }) //领取无门槛红包
export const getLuckDrawCount = marketing_id => fly.post('/user/draw/count', { marketing_id }) //抽奖次数
export const getStatistics = marketing_id => fly.post('/statistics', { marketing_id }) //数据统计
export const receiveGifts = marketing_id => fly.post('/gift/send', { marketing_id }, { showLoading: true }) //领取礼包
export const luckDraw = marketing_id => fly.post('/user/draw', { marketing_id }, { showLoading: true }) //水果机抽奖
export const userBrowse = marketing_id => fly.post('/user/view/couting', { marketing_id }) // 查看
