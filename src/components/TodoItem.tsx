import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid'
import { useMutateTask } from '../hooks/useMutationTask'
import { useStore } from '../store'
import { Task } from '../types'
import { FC, memo } from 'react'

export const TodoItem: FC<Omit<Task, 'created_at' | 'updated_at'>> = memo(
  ({ id, title }) => {
    const updateTask = useStore((state) => state.updateEditedTask)
    const { deleteTaskMutation } = useMutateTask()
    return (
      <li className="my-3">
        <span className="font-bold text-white">{title}</span>
        <div className="flex float-right ml-20">
          <PencilIcon
            className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
            onClick={() => updateTask({ id: id, title: title })}
          />
          <TrashIcon
            className="h-5 w-5 text-blue-500 cursor-pointer"
            onClick={() => deleteTaskMutation.mutate(id)}
          />
        </div>
      </li>
    )
  }
)
