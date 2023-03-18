import classNames from "classnames";
import { FC } from "react";

export const Stack: FC<{
  children: React.ReactNode;
  cols?: number;
  mobileCols?: number;
}> = ({ children, cols, mobileCols }) => {
  return (
    <div
      className={classNames(
        "grid",
        "w-full",
        "gap-2",
        cols ? `md:grid-cols-${cols}` : "md:grid-cols-1",
        mobileCols ? `grid-cols-${mobileCols}` : "grid-cols-1"
      )}
    >
      {children}
    </div>
  );
};

export const PageStack: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex w-full flex-col gap-10">{children}</div>;
};
