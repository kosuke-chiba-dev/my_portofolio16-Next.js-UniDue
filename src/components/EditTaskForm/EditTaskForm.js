'use client'

import { updateTask } from '@/actions/task'
import { useActionState, useState } from 'react'

function toDateInputValue(d) {
  const dt = new Date(d)
  return isNaN(dt) ? '' : dt.toISOString().slice(0, 10) // YYYY-MM-DD
}

const initialState = { error: '' }

export default function EditTaskForm({ task }) {
  const [title, setTitle] = useState(task.title ?? '')
  const [description, setDescription] = useState(task.description ?? '')
  const [dueDate, setDueDate] = useState(toDateInputValue(task.dueDate))
  const [isCompleted, setIsCompleted] = useState(!!task.isCompleted)

  const updateTaskWithId = updateTask.bind(null, task._id)
  const [state, formAction, isPending] = useActionState(updateTaskWithId, initialState)

  return (
    <div className="mt-10 mx-auto w-full max-w-sm px-6">
      <form action={formAction}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            タイトル <span className="text-xs text-slate-500">(20文字以内)</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            maxLength={20}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
            placeholder="例:生物学Bの課題"
          />
          <div className="mt-1 text-right text-xs text-slate-500">{title.length}/20</div>
        </div>

        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium">
            説明 <span className="text-xs text-slate-500">(30文字以内)</span>
          </label>
          <input
            type="text"
            id="description"
            name="description"
            required
            maxLength={30}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
            placeholder="例:第二回講義のレジュメを見ながら書く。"
          />
          <div className="mt-1 text-right text-xs text-slate-500">{description.length}/30</div>
        </div>

        <div className="mt-6">
          <label htmlFor="dueDate" className="block text-sm font-medium">期限</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            min="2020-01-01"
            max="2999-12-31"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>

        <div className="mt-6 flex items-center">
          <input
            type="checkbox"
            id="isCompleted"
            name="isCompleted"
            value="true"
            className="mr-2 w-4 h-4"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          <label htmlFor="isCompleted" className="text-sm">タスクを完了にする</label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 text-sm font-semibold shadow-sm disabled:bg-gray-400"
        >
          {isPending ? 'Saving…' : 'Edit'}
        </button>

        {state?.error && <p className="mt-2 text-red-500 text-sm">{state.error}</p>}
      </form>
    </div>
  )
}

