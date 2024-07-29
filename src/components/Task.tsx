import { Draggable } from "@hello-pangea/dnd";
import { TaskItem } from "../initialData";

interface Props {
  task: TaskItem;
  index: number;
}

export const Task = ({ task, index }: Props) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        const isDraggin = snapshot.isDragging;
        return (
          <div
            className={`dark:border-slate-800 dark:border-2 shadow-inner p-3 rounded-md font-semibold cursor-pointer ${
              isDraggin
                ? "bg-gradient-to-r from-cyan-200 to-green-200 dark:border-transparent"
                : "bg-white dark:bg-slate-950"
            }`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p className="">{task.content}</p>
          </div>
        );
      }}
    </Draggable>
  );
};
