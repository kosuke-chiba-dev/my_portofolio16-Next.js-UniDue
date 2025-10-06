import Link from "next/link";
import { MdAddTask } from "react-icons/md";
import TaskCard from "../../components/TaskCard/TaskCard";
import UpComingTaskCard from "@/components/UpComingTaskCard/UpComingTaskCard";

const getAllTasks = async () => {
  const response = await fetch(`${process.env.API_URL}/tasks`, { cache: "no-store" });
  if (response.status !== 200) throw new Error();
  return response.json();
};

export default async function MainPage() {
  const allTasks = await getAllTasks();

  const upcomingTasks = allTasks.upcomingTasks ?? [];
  const overdueTasks = allTasks.overdueTasks ?? [];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-white to-slate-50/70 text-gray-800">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Tasks</h1>
            <p className="mt-1 text-sm text-slate-600">
              期限内と期限切れの課題を分けて表示されます。<br />
              期限内の課題は期限が近い順、期限切れの課題は期限が最近切れた順に表示されます。
            </p>
          </div>
          <Link
            href="/new"
            className="shrink-0 inline-flex items-center gap-2 rounded-full max-w-fit border border-slate-300 bg-gray-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 active:scale-[0.99]"
          >
            <MdAddTask className="size-5" />
            <span>Add Task</span>
          </Link>
        </header>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200 max-w-fit">
            期限内{" "}
            <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] ring-1 ring-emerald-200">
              {upcomingTasks.length}
            </span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-200 max-w-fit">
            期限切れ{" "}
            <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] ring-1 ring-rose-200">
              {overdueTasks.length}
            </span>
          </span>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-slate-900">期限内</h2>
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                Upcoming
              </span>
            </div>
          </div>


          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
            {upcomingTasks.length === 0 ? (
              <div className="col-[1/-1]">
                <div className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6">
                  <p className="text-sm text-slate-600">期限内の課題はありません。</p>
                </div>
              </div>
            ) : (
              upcomingTasks.map((task) => (
                <div key={task._id}>
                  <UpComingTaskCard task={task} isUpcoming />
                </div>
              ))
            )}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-rose-200 bg-white p-6 shadow-sm ring-1 ring-rose-100/60">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-rose-900">期限切れ</h2>
              <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-200">
                Overdue
              </span>
            </div>
          </div>

          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
            {overdueTasks.length === 0 ? (
              <div className="col-[1/-1]">
                <div className="rounded-xl border border-dashed border-rose-300 bg-rose-50/70 px-4 py-6">
                  <p className="text-sm text-rose-800/90">期限切れの課題はありません。</p>
                </div>
              </div>
            ) : (
              overdueTasks.map((task) => (
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
