import Link from 'next/link';
import { FaPen } from 'react-icons/fa';


const TaskEditButton = ({ id }) => {
  return (
    <Link href={`/edit/${id}`}>
      <FaPen className='hover:text-gray-700 text-lg cursor-pointer'/>
    </Link>
  )
}

export default TaskEditButton