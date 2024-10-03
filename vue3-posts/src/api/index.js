import axios from 'axios'

function create(baseURL, options = {}) {
  const instance = axios.create(Object.assign({ baseURL }, options))
  return instance
}

// VITE_APP_API_URL을 사용하여 baseURL을 동적으로 설정
export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts`)
