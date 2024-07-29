import { useState } from "react";
import { useStore } from "../zustand/store";
import { Form } from "./Form";
import { v4 as uuidv4 } from "uuid";
import { TaskItem } from "../initialData";

export const Modal = () => {
  const changeModalState = useStore((state) => state.changeModalState);
  const [descriptionChange, setDescriptionChange] = useState("");
  const addNewTask = useStore((state) => state.addNewTask);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionChange(e.target.value);
  };

  const handleSubmit = () => {
    if (descriptionChange.trim() === "") return;
    const newTask: TaskItem = {
      id: uuidv4(),
      content: descriptionChange,
    };
    console.log(newTask);
    addNewTask(newTask);
  };
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg flex flex-col items-center">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <Form
                  description={descriptionChange}
                  setDescription={handleChange}
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 w-1/2 flex items-center justify-between">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={handleSubmit}
              >
                Create task
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={changeModalState}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
