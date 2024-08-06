import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { BiHome, BiMoon, BiPlus, BiSun } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Button } from "./components/Button";
import { Column } from "./components/Column";
import { Modal } from "./components/Modal";
import { useStore } from "./zustand/store";
import { useThemeStore } from "./zustand/theme-store";

export const TaskPage = () => {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleThemeState = useThemeStore((state) => state.toggleThemeState);
  const initialDataTodo = useStore((state) => state.initialData);
  const moveTask = useStore((state) => state.moveTask);
  const isOpen = useStore((state) => state.isOpen);
  const changeModalState = useStore((state) => state.changeModalState);

  function onDragEnd(result: DropResult) {
    //TODO: reorder our column
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    moveTask(destination, source, draggableId);
  }

  const darkModeHandler = () => {
    const theme = !isDark ? "dark" : "light";
    toggleThemeState();
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  };
  return (
    <div className="h-screen 2xsm:h-full xsm:h-screen bg-slate-100 dark:bg-slate-950 dark:text-white flex flex-col font-customFont sm:h-screen pb-3">
      {isOpen && <Modal />}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col items-center mt-20 mb-8 md:mb-0">
          <div className="flex items-end gap-x-2">
            <h1 className="text-4xl text-center">KanbanFlow</h1>
            <span className="text-red-400">v1.0</span>
          </div>
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
            <Link to="/">
              <BiHome
                size={40}
                className="border-2 border-slate-800  p-2 rounded-lg cursor-pointer hover:bg-slate-800"
              />
            </Link>
            {isDark ? (
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

        <Button
          title="Add new task"
          className="absolute top-[262px] left-[10px] md:top-64 md:left-[10px] lg:top-60 lg:left-[10px]"
          icon={
            <BiPlus
              className="dark:border dark:border-slate-800 rounded-full p-1"
              size={25}
            />
          }
          onClick={changeModalState}
        />
        <div className="h-full mt-10 md:mt-0 flex flex-col md:flex-row md:gap-x-5 gap-y-4 px-3 items-center justify-center ">
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
};
