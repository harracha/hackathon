import classnames from "classnames";

export const Spinner = ({
  white,
  className,
}: {
  className?: string;
  white?: boolean;
}) => {
  return (
    <span
      className={classnames(
        `inline-block h-4 w-4 animate-spin rounded-full border-b-2 border-r-2`,
        white ? "border-special-white" : "border-neutral",
        className
      )}
    />
  );
};
