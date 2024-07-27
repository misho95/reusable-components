import { FC, ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  title: string;
};

const Title: FC<PropsType> = ({ children, title }) => {
  return (
    <fieldset className="w-fit h-fit flex justify-start items-start py-1 px-3 border-[1px] border-slate-500 text-slate-700 dark:text-slate-300 select-none">
      <legend className="text-center px-3 uppercase">{title}</legend>
      <div className="flex justify-center items-center gap-3">{children}</div>
    </fieldset>
  );
};

export default Title;
