import classNames from "classnames";
import { FC } from "react";

export const Section: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        "w-full rounded-2xl bg-accent-strong px-4 py-4 md:px-4 md:py-4",
        className
      )}
    >
      {children}
    </div>
  );
};
