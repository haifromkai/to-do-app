"use client";

import { ITask } from "../../../types/tasks"
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteToDo, editToDo } from "../../../api";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditToDo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editToDo({
      id: task.id,
      text: taskToEdit
    });
    // setTaskToEdit("");
    setOpenModalEdit(false);
    router.refresh();
  }

  const handleDeleteTask = async (id: string) => {
    await deleteToDo(id);
    setOpenModalDelete(false);
    router.refresh();
  }

  return (
    <tr key={task.id}>
        <td className="w-full">{task.text}</td>

        <td className="flex gap-5">
          <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-700" size={22} />
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditToDo}>
              <h3 className="font-bold text-lg">Edit this task</h3>
              <div className="modal-action">
                <input
                  value={taskToEdit}
                  onChange={e => setTaskToEdit(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <button type="submit" className="btn">Submit</button>
              </div>
            </form>
          </Modal>

          <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-600" size={22} />
          <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
            <h3 className="text-lg">Confirm Deletion?</h3>
            <div className="modal-action">
              <button 
                onClick={() => handleDeleteTask(task.id)}
                className="btn"
              >Yes</button>
            </div>
          </Modal>
        </td>
    </tr>
  )
}

export default Task