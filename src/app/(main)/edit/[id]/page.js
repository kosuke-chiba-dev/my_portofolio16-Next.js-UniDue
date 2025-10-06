import EditTaskForm from '@/components/EditTaskForm/EditTaskForm';

const getTask = async (id) => {
  const response = await fetch(`${process.env.API_URL}/tasks/${id}`,{
    cache: "no-store"
  })
  const data = await response.json();
  return data.task
}

const EditTaskPage = async ({ params }) => {
  const { id } = await params;
  const task = await getTask(id);
  return (
    <div className="flex flex-col justify-center py-20">
      <h2 className="text-center text-2xl font-bold">Edit Task</h2>
      <EditTaskForm task={task}/>
    </div>
  );
};

export default EditTaskPage;
