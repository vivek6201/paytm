import { type ReactNode } from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="rounded-md p-10 bg-slate-300 dark:bg-zinc-900">
      <p className="text-2xl mb-5 font-bold ">{title}</p>
      <div className="flex flex-col gap-y-5">{children}</div>
    </div>
  );
}
