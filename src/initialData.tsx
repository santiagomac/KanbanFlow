export const initialData: InitialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook diner" },
  },
  columns: {
    "column-todo": {
      id: "column-todo",
      title: "To do",
      taskIds: [],
    },
    "column-in-progress": {
      id: "column-in-progress",
      title: "In progress",
      taskIds: [],
    },
    "column-done": {
      id: "column-done",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-todo", "column-in-progress", "column-done"],
};

export type InitialData = {
  tasks: TaskParent;
  columns: ColumnParent;
  columnOrder: string[];
};

type TaskParent = {
  [key: string]: TaskItem;
};

export type TaskItem = {
  id: string;
  content: string;
};

type ColumnParent = {
  [key: string]: ColumnItem;
};

export type ColumnItem = {
  id: string;
  title: string;
  taskIds: string[];
};
