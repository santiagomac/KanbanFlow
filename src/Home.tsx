import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col p-10 md:p-0 md:flex-row items-center justify-center bg-slate-200 dark:bg-slate-950 dark:text-white font-customFont h-screen">
      <div className="flex flex-col md:flex-row md:w-[60%]">
        <div className="md:mr-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-3">KanbanFlow</h1>
          <p className="font-light mb-5 text-balance text-lg">
            <strong>KanbanFlow</strong> is a task management tool inspired by
            the Kanban methodology. You can use the app with local storage, but
            if you want to access all your tasks on another PC or device, you
            can log in and support me with a star on GitHub and on Patreon.
          </p>
          <div className="flex gap-x-5 mb-5 md:mb-0">
            <Link
              to="/task-management"
              className="cursor-pointer border dark:border-slate-800 border-slate-950 p-2 rounded-lg font-bold dark:hover:bg-slate-800"
            >
              Get Started
            </Link>
            <Link
              to="/pricing"
              className="cursor-pointer border dark:border-slate-800 border-slate-950 p-2 rounded-lg font-bold dark:hover:bg-slate-800"
            >
              Pricing
            </Link>
          </div>
        </div>
        <img
          src="/desktop.png"
          alt="Preview"
          className="rounded-lg md:w-[50%]"
        />
      </div>
    </div>
  );
};
