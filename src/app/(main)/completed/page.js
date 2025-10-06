import TaskCard from '@/components/TaskCard/TaskCard'

const getCompletedTasks = async () => {
  const res = await fetch(`${process.env.API_URL}/tasks/completed`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch completed tasks: ${res.status}`)
  const data = await res.json()
  return data?.tasks ?? []
}

export default async function CompletedTaskPage() {
  let completedTasks = []
  try {
    completedTasks = await getCompletedTasks()
  } catch (e) {
    console.error(e)
    completedTasks = []
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-white to-slate-50/70 text-gray-800">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Completed Tasks</h1>
            <p className="mt-1 text-sm text-slate-600">
              完了済みの課題一覧です。<br/>課題は期限が最新順に表示されます。
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200 max-w-fit shrink-0">
            完了済み
            <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] ring-1 ring-indigo-200">
              {completedTasks.length}
            </span>
          </span>
        </header>

        <section className="mt-8 rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm ring-1 ring-indigo-100/60">
          <div className="mb-5 flex items-center gap-3">
            <h2 className="text-lg font-semibold text-indigo-900">完了済み</h2>
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200">
              Completed
            </span>
          </div>

          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
            {completedTasks.length === 0 ? (
              <div className="col-[1/-1]">
                <div className="rounded-xl border border-dashed border-indigo-300 bg-indigo-50/70 px-4 py-6">
                  <p className="text-sm text-indigo-800/90">完了済みの課題はありません。</p>
                </div>
              </div>
            ) : (
              completedTasks.map((task) => (
                <div key={task._id}>
                  <TaskCard task={task} />
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}


