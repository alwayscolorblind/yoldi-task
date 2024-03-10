import axios from 'axios'
import { API_URL, NON_CREDENTIALS_PATH } from '@/api/constants'
import { initialize } from '@/api/swagger'
import { cookies } from 'next/headers'

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

  const token = cookies().get('token');

  config.headers.set('X-Api-Key', token?.value || '');

  return config;
})

export const { requests } = initialize(axiosInstance)
