import { Droppable } from "@hello-pangea/dnd";
import { ColumnItem, TaskItem } from "../initialData";
import { Task } from "./Task";

interface Props {
  column: ColumnItem;
  tasks?: TaskItem[];
}

export const Column = ({ column, tasks = [] }: Props) => {
  return (
    <>
      <div
        className={`bg-white h-full dark:bg-slate-950 dark:border-slate-800 dark:border-2 w-full p-5 rounded-lg shadow-lg md:h-2/3 md:w-1/3`}
      >
        <h2 className="font-bold text-2xl mb-2">{column.title}</h2>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              className={`flex flex-col h-[90%] overflow-hidden gap-y-5 ${
                snapshot.isDraggingOver &&
                "bg-gray-200 dark:bg-slate-400 rounded p-1"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => {
                return <Task key={task.id} task={task} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};
