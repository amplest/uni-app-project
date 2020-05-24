export const setToken = (data, key = 'token') => uni.setStorageSync(key, data)
export const getToken = (key = 'token') => uni.getStorageSync(key)

export const setPUsersId = (data, key = 'p_users_id') => uni.setStorageSync(key, data)
export const getPUsersId = (key = 'p_users_id') => uni.getStorageSync(key)

export const setMarketingId = (data, key = 'marketing_id') => uni.setStorageSync(key, data)
export const getMarketingId = (key = 'marketing_id') => uni.getStorageSync(key)
