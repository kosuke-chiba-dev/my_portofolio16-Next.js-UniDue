import TaskDeleteButton from './TaskDeleteButton/TaskDeleteButton';
import TaskEditButton from './TaskEditButton/TaskEditButton';


function getJstYmd(date) {
  const shifted = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return { y: shifted.getUTCFullYear(), m: shifted.getUTCMonth(), d: shifted.getUTCDate() };
}
function jstStartOfDayUtc(y, m, d) {
  return new Date(Date.UTC(y, m, d, -9, 0, 0));
}
function diffDaysFromTodayJst(targetDate) {
  const now = new Date();
  const { y: ty, m: tm, d: td } = getJstYmd(now);
  const todayStartUtc = jstStartOfDayUtc(ty, tm, td);

  const { y: dy, m: dm, d: dd } = getJstYmd(targetDate);
  const dueStartUtc = jstStartOfDayUtc(dy, dm, dd);

  const DAY = 24 * 60 * 60 * 1000;
  return Math.floor((dueStartUtc - todayStartUtc) / DAY);
}


const UpComingTaskCard = ({ task, isUpcoming = false }) => {
  const due = new Date(task.dueDate);
  const isoDate = due.toISOString().slice(0, 10);

  let relText = null;
  let relClass = '';
  if (isUpcoming) {
    const diff = diffDaysFromTodayJst(due);
    if (diff === 0) {
      relText = '今日中';
      relClass = 'bg-red-600 text-white';
    } else if (diff === 1) {
      relText = '1日後';
      relClass = 'bg-orange-500 text-white';
    } else if (diff === 2) {
      relText = '2日後';
      relClass = 'bg-green-500 text-white';
    }
  }

  return (
    <div className="h-52 p-4 bg-white rounded-xl shadow-sm ring-1 ring-slate-100 flex flex-col justify-between">
      <header className="overflow-y-auto h-[110px]">

        <div className="flex items-start gap-2">
          <h1 className="flex-1 min-w-0 text-lg font-semibold leading-tight text-slate-900 [overflow-wrap:anywhere]">
            {task.title}
          </h1>
        </div>

        <div className="mt-1 text-sm text-slate-600 [overflow-wrap:anywhere]">
          {task.description}
        </div>
      </header>

      <div>
        <div className="flex items-center gap-2">
          <time className="text-sm text-slate-700" dateTime={isoDate}>
            {isoDate}
          </time>
          {relText && (
            <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${relClass}`}>
              {relText}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div
            className={`mt-1 text-sm px-2 py-1 w-24 text-center text-white 
        rounded-full shadow-sm ${task.isCompleted ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {task.isCompleted ? 'Completed' : 'Incomplete'}
          </div>

          <div className="flex gap-3">
            <TaskEditButton id={task._id} />
            <TaskDeleteButton id={task._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpComingTaskCard;




