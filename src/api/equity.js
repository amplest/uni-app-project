import fly from '@/utils/request'

export const getGiftList = (marketing_id) => fly.post('/gift/log',{marketing_id}, { showLoading: true })
export const getActivityInfo = (marketing_id) => fly.post('/marketing',{marketing_id}, { showLoading: true })
