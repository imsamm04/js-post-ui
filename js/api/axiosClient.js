import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://js-post-api.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(function (config) {
  console.log('request interceptor', config)
  const accessToken = localStorage.getItem('access_token')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

axiosClient.interceptors.response.use(function (response) {
  return response.data
})

export default axiosClient
