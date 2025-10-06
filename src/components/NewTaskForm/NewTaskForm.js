'use client'

import { createTask } from '@/actions/task'
import { useActionState, useState } from 'react'

const initialState = { error: '' }

export default function NewTaskForm() {
  const [state, formAction, isPending] = useActionState(createTask, initialState)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

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
          <div className="mt-1 text-right text-xs text-slate-500">
            {title.length}/20
          </div>
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
          <div className="mt-1 text-right text-xs text-slate-500">
            {description.length}/30
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="dueDate" className="block text-sm font-medium">
            期限
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            min="2020-01-01"
            max="2999-12-31"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 text-sm font-semibold shadow-sm disabled:bg-gray-400"
        >
          {isPending ? 'Creating...' : 'Create'}
        </button>

        {state?.error && (
          <p className="mt-2 text-red-500 text-sm">{state.error}</p>
        )}
      </form>
    </div>
  )
}
