import axios, { isAxiosError } from 'axios'
import { Task } from '../types'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useError } from './useError'

export function useQueryTasks() {
  const getTasks = async () => {
    const { data } = await axios.get<Task[]>('/api/tasks', {
      withCredentials: true,
    })
    return data
  }
  const query = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    staleTime: Infinity,
  })
  const { switchErrorHanding } = useError()
  useEffect(() => {
    if (!isAxiosError(query.error)) return
    const err = query.error
    if (typeof err.response !== 'undefined') {
      typeof err.response?.data !== 'string'
        ? switchErrorHanding(err.response.data.message)
        : switchErrorHanding(err.response.data)
    }
  })
  return query
}
