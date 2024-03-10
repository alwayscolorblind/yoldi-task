import { initialize} from '@/api/swagger'
import axios from 'axios'
import { API_URL, NON_CREDENTIALS_PATH } from '@/api/constants'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// only for client requests
axiosInstance.interceptors.request.use(config => {
  if (NON_CREDENTIALS_PATH.includes(config.url as string)) {
    return config
  }

  config.withCredentials = true
  config.withXSRFToken = true
  config.xsrfCookieName = "token"
  config.xsrfHeaderName = "X-Api-Key"

  return config;
})
export const { requests, queries } = initialize(axiosInstance);


