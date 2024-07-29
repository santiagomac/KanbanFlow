import { create } from "zustand";
import { ColumnItem, initialData, InitialData, TaskItem } from "../initialData";
import { DraggableLocation } from "@hello-pangea/dnd";

type Store = {
  initialData: InitialData;
  isOpen: boolean;
  changeModalState: () => void;
  moveTask: (
    destination: DraggableLocation,
    source: DraggableLocation,
    draggableId: string
  ) => void;
  addNewTask: (task: TaskItem) => void;
};

export const useStore = create<Store>()((set, get) => ({
  initialData: setInitalData(),
  isOpen: false,
  changeModalState: () => set((state) => ({ isOpen: !state.isOpen })),
  moveTask: (destination, source, draggableId) =>
    set((state) => ({
      initialData: moveTask(
        state.initialData,
        destination,
        source,
        draggableId
      ),
    })),
  addNewTask: (task: TaskItem) => {
    const { changeModalState } = get();
    set((state) => ({
      initialData: addNewTask(state.initialData, task),
    }));
    changeModalState();
  },
}));

// Methods to update the state

function moveTask(
  initialData: InitialData,
  destination: DraggableLocation,
  source: DraggableLocation,
  draggableId: string
) {
  const start = initialData.columns[source.droppableId];
  const finish = initialData.columns[destination.droppableId];

  if (start === finish) {
    const newTasksIds = Array.from(start.taskIds);
    newTasksIds.splice(source.index, 1);
    newTasksIds.splice(destination.index, 0, draggableId);

    const newColumn: ColumnItem = {
      ...start,
      taskIds: newTasksIds,
    };

    const newState: InitialData = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [newColumn.id]: newColumn,
      },
    };
    return newState;
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
    ...initialData,
    columns: {
      ...initialData.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    },
  };

  localStorage.setItem("data", JSON.stringify(newState));

  return newState;
}

function addNewTask(initialData: InitialData, task: TaskItem) {
  const columnTodo = initialData.columns["column-todo"];

  const newColumn: ColumnItem = {
    ...columnTodo,
    taskIds: [...columnTodo.taskIds, task.id],
  };
  const newState: InitialData = {
    ...initialData,
    tasks: {
      ...initialData.tasks,
      [task.id]: task,
    },
    columns: {
      ...initialData.columns,
      ["column-todo"]: newColumn,
    },
  };

  //Guardar en local storage
  localStorage.setItem("data", JSON.stringify(newState));

  //Actualizar el estado
  return newState;
}

function setInitalData() {
  const data = localStorage.getItem("data");
  if (data) {
    return JSON.parse(data);
  }
  return initialData;
}
