import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { useError } from './useError'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import type { Credential } from '../types'

export function useMutationAuth() {
  const navigate = useNavigate()
  const resetEditedTask = useStore((state) => state.resetEditedTask)
  const { switchErrorHanding } = useError()
  const loginMutation = useMutation({
    mutationFn: async (user: Credential) =>
      await axios.post('/api/login', user),
    onSuccess: () => {
      navigate('/todo')
    },
    onError: (err: AxiosError<{ message: string } | string>) => {
      if (typeof err.response !== 'undefined') {
        typeof err.response?.data !== 'string'
          ? switchErrorHanding(err.response.data.message)
          : switchErrorHanding(err.response.data)
      }
    },
  })
  const registerMutation = useMutation({
    mutationFn: async (user: Credential) => {
      await axios.post('/api/signup', user)
    },
    onError: (err: AxiosError<{ message: string } | string>) => {
      if (typeof err.response !== 'undefined') {
        typeof err.response?.data !== 'string'
          ? switchErrorHanding(err.response.data.message)
          : switchErrorHanding(err.response.data)
      }
    },
  })
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.post('/api/logout')
    },
    onSuccess: () => {
      resetEditedTask()
      navigate('/')
    },
    onError: (err: AxiosError<{ message: string } | string>) => {
      if (typeof err.response !== 'undefined') {
        typeof err.response?.data !== 'string'
          ? switchErrorHanding(err.response.data.message)
          : switchErrorHanding(err.response.data)
      }
    },
  })
  return { loginMutation, registerMutation, logoutMutation }
}
