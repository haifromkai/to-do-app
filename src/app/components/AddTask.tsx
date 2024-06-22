"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addToDo } from "../../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewToDo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addToDo({
      id: uuidv4(),
      text: newTaskValue
    })
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  }

  return (
    <div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary w-full"
        >
          ADD NEW TASK <AiOutlinePlus className="ml-2" size={18}/>
        </button>

        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitNewToDo}>
            <h3 className="font-bold text-lg">Add a new task</h3>
            <div className="modal-action">
              <input
                value={newTaskValue}
                onChange={e => setNewTaskValue(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
    </div>
  )
}

export default AddTask