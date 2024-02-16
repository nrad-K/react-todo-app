import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task } from '../types'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useError } from './useError'
import { useStore } from '../store'

export function useMutateTask() {
  const queryClient = useQueryClient()
  const { switchErrorHanding } = useError()
  const resetEditedTask = useStore((state) => state.resetEditedTask)

  const createTaskMutation = useMutation({
    mutationFn: async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) =>
      await axios.post<Task>('/api/tasks', task),
    onSuccess: (res: AxiosResponse) => {
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
      if (previousTasks) {
        queryClient.setQueryData(['tasks'], [...previousTasks, res.data])
      }
      resetEditedTask()
    },
    onError: (err: AxiosError<{ message: string } | string>) => {
      if (typeof err.response !== 'undefined') {
        typeof err.response?.data !== 'string'
          ? switchErrorHanding(err.response.data.message)
          : switchErrorHanding(err.response.data)
      }
    },
  })
  const updateTaskMutation = useMutation({
    mutationFn: async (task: Omit<Task, 'created_at' | 'updated_at'>) =>
      await axios.put<Task>(`/api/tasks/${task.id}`, {
        title: task.title,
      }),
    onSuccess: (
      res: AxiosResponse,
      variables: Omit<Task, 'created_at' | 'updated_at'>
    ) => {
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
      if (previousTasks) {
        queryClient.setQueryData(
          ['tasks'],
          previousTasks.map((task) =>
            task.id === variables.id ? res.data : task
          )
        )
      }
      resetEditedTask()
    },
    onError: (err: AxiosError<{ message: string } | string>) => {
      if (typeof err.response !== 'undefined') {
        typeof err.response?.data !== 'string'
          ? switchErrorHanding(err.response.data.message)
          : switchErrorHanding(err.response.data)
      }
    },
  })
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: number) =>
      await axios.delete<Task>(`/api/tasks/${id}`),
    onSuccess: (_, variables: number) => {
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
      if (previousTasks) {
        queryClient.setQueryData(
          ['tasks'],
          previousTasks.map((task) => task.id !== variables)
        )
      }
      resetEditedTask()
    },
    onError: (err: AxiosError<{ message: string } | string>) => {
      if (typeof err.response !== 'undefined') {
        typeof err.response?.data !== 'string'
          ? switchErrorHanding(err.response.data.message)
          : switchErrorHanding(err.response.data)
      }
    },
  })
  return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}
