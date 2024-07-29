import { ReactNode } from "react";

interface Props {
  title: string;
  className?: string;
  icon?: ReactNode;
  onClick: () => void;
}

export const Button = ({
  title,
  className,
  icon,
  onClick: changeStateOpen,
}: Props) => {
  return (
    <div
      className={`flex items-center justify-center gap-4
         border-2 dark:border-slate-800 w-[180px] text-center p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-white cursor-pointer ${className}`}
      onClick={changeStateOpen}
    >
      {icon}
      {title}
    </div>
  );
};
