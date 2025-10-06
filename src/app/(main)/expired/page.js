import TaskCard from '@/components/TaskCard/TaskCard';

const getExpiredTasks = async () => {
  const res = await fetch(`${process.env.API_URL}/tasks/expired`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch expired tasks: ${res.status}`);
  const data = await res.json();
  return data?.tasks ?? [];
};

export default async function ExpiredTaskPage() {
  let expiredTasks = [];
  try {
    expiredTasks = await getExpiredTasks();
  } catch (e) {
    console.error(e);
    expiredTasks = [];
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-white to-slate-50/70 text-gray-800">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expired Tasks</h1>
            <p className="mt-1 text-sm text-slate-600">
              期限切れ（期限が今日より前）かつ、未完了の課題一覧です。<br/>最近期限が切れた順に表示されます。
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-200 max-w-fit shrink-0">
            期限切れ
            <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] ring-1 ring-rose-200">
              {expiredTasks.length}
            </span>
          </span>
        </header>

        <section className="mt-8 rounded-2xl border border-rose-200 bg-white p-6 shadow-sm ring-1 ring-rose-100/60">
          <div className="mb-5 flex items-center gap-3">
            <h2 className="text-lg font-semibold text-rose-900">期限切れ</h2>
            <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-200">
              Overdue
            </span>
          </div>

          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
            {expiredTasks.length === 0 ? (
              <div className="col-[1/-1]">
                <div className="rounded-xl border border-dashed border-rose-300 bg-rose-50/70 px-4 py-6">
                  <p className="text-sm text-rose-800/90">期限切れの課題はありません。</p>
                </div>
              </div>
            ) : (
              expiredTasks.map((task) => (
                <div key={task._id}>
                  <TaskCard task={task} />
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
