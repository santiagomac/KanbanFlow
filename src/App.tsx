import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Column } from "./components/Column";
import { ColumnItem, InitialData, initialData } from "./initialData";
import { useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

function App() {
  const [dark, setDark] = useState<boolean>(false);
  const [initialDataTodo, setInitalDataTodo] =
    useState<InitialData>(initialData);

  function onDragEnd(result: DropResult) {
    //TODO: reorder our column
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = initialDataTodo.columns[source.droppableId];
    const finish = initialDataTodo.columns[destination.droppableId];

    if (start === finish) {
      const newTasksIds = Array.from(start.taskIds);
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);

      const newColumn: ColumnItem = {
        ...start,
        taskIds: newTasksIds,
      };

      const newState: InitialData = {
        ...initialDataTodo,
        columns: {
          ...initialDataTodo.columns,
          [newColumn.id]: newColumn,
        },
      };
      setInitalDataTodo(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart: ColumnItem = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish: ColumnItem = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...initialDataTodo,
      columns: {
        ...initialDataTodo.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setInitalDataTodo(newState);
  }

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="relative dark:bg-slate-950 dark:text-white h-full md:h-screen flex flex-col font-customFont pb-3">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col items-center mt-20 mb-5">
          <h1 className="text-4xl text-center">Task Kanban Management</h1>
          <p className="mb-2 md:mb-0">This is an app developed with:</p>
          <div className="flex gap-x-4 flex-wrap w-[200px] md:w-1/2 text-center justify-center">
            <span className="text-purple-500">@Vite</span>
            <span className="text-blue-500">@Tailwind</span>
            <a
              href="https://www.npmjs.com/package/@hello-pangea/dnd"
              target="_blank"
              className="text-orange-300"
            >
              @hello-pangea/dnd
            </a>
          </div>
          <div className="absolute right-4 top-4 flex gap-x-5">
            {dark ? (
              <BiSun
                size={40}
                className="border-2 border-slate-800  p-2 rounded-lg cursor-pointer hover:bg-slate-800"
                onClick={darkModeHandler}
              />
            ) : (
              <BiMoon
                size={40}
                className="border-2 border-gray-200 hover:bg-gray-300 dark:border-slate-800 p-2 rounded-lg cursor-pointer hover:dark:bg-slate-800 hover:text-white"
                onClick={darkModeHandler}
              />
            )}
          </div>
        </div>

        <div className="h-full flex flex-col md:flex-row md:gap-x-5 gap-y-4 px-3 items-center justify-center ">
          {initialDataTodo.columnOrder.map((columnId) => {
            const column = initialDataTodo.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => initialDataTodo.tasks[taskId]
            );

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
