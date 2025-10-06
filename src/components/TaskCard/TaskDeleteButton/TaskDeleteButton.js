'use client'

import { FaTrashAlt } from 'react-icons/fa'
import { useEffect } from 'react'
import { deleteTask } from '@/actions/task'
import { useActionState } from 'react'

const initialState = { error: '' }

export default function TaskDeleteButton({ id }) {
  const deleteTaskWithId = deleteTask.bind(null, id)
  const [state, formAction, isPending] = useActionState(deleteTaskWithId, initialState)

  useEffect(() => {
    if (state?.error) alert(state.error)
  }, [state])

  return (
    <form action={formAction}>
      <button
        type="submit"
        aria-label="タスクを削除"
        disabled={isPending}
        className="hover:text-gray-700 text-lg cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400"
        title="削除"
      >
        <FaTrashAlt />
      </button>
    </form>
  )
}
