import fly from '@/utils/request'

export const getPersonalKanban = (marketing_id) => fly.post('/user/info', {marketing_id})
export const getRedEnvelopeList = (marketing_id,psize = 8 ) => fly.post('/draw/ranking', {marketing_id,psize })
export const getInvitation = (marketing_id,page, psize) => fly.post('draw/list', {marketing_id,page,psize })
export const getRedEnvelopeRecord = (marketing_id, psize = 100000) => fly.post('/red/envelope/log', {marketing_id, psize})
