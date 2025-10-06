import TaskDeleteButton from './TaskDeleteButton/TaskDeleteButton';
import TaskEditButton from './TaskEditButton/TaskEditButton';



const TaskCard = ({task}) => {
  return (
    <div
      className="h-52 p-4 bg-white rounded-md shadow-md 
  flex flex-col justify-between"
    >
      <header className='overflow-y-auto h-[110px]'>
        <h1 className="text-lg font-semibold [overflow-wrap:anywhere]">{task.title}</h1>
        <div className="mt-1 text-sm [overflow-wrap:anywhere]">{task.description}</div>
      </header>
      <div>
        <div className="text-sm">{new Date(task.dueDate).toISOString().slice(0,10)}</div>
        <div className="flex justify-between items-center">
          <div
            className={`mt-1 text-sm px-2 py-1 w-24 text-center text-white 
        rounded-full shadow-sm ${task.isCompleted ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {task.isCompleted ? 'Completed' : 'Incomplete'}
          </div>
          <div className="flex gap-4">
            <TaskEditButton id={task._id} />
            <TaskDeleteButton id={task._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
