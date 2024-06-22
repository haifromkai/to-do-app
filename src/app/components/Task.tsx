import { ITask } from "../../../types/tasks"
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <tr key={task.id}>
        <td className="w-full">{task.text}</td>
        <td className="flex gap-5">
          <FiEdit cursor="pointer" className="text-blue-700" size={22} />
          <FiTrash2 cursor="pointer" className="text-red-600" size={22} />
        </td>
    </tr>
  )
}

export default Task