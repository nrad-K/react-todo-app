import axios from 'axios'
import { CsrfToken } from '../types'

export async function getCsrfToken() {
  axios.defaults.withCredentials = true
  const { data } = await axios.get<CsrfToken>('/api/csrf')
  axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
  return data
}
