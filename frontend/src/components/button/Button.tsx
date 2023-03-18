import classNames from "classnames";
import { FC, ReactNode } from "react";
import Icon, { IconName } from "../Icon/Icon";
import { Spinner } from "../spinner/Spinner";

type ButtonType = "primary" | "secondary";

type ButtonProps = {
  children?: ReactNode | ReactNode[];
  small?: boolean;
  type?: ButtonType;
  outline?: boolean;
  active?: boolean;
  disabled?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
  style?: any;
  onClick?: any;
  formType?: any;
  className?: string;
  loading?: boolean;
};

const Button: FC<ButtonProps> = ({
  leftIcon,
  rightIcon,
  disabled,
  outline,
  small,
  children,
  style,
  onClick,
  formType,
  className,
  loading,
}) => {
  return (
    <button
      onClick={(e) => {
        onClick && onClick();
      }}
      type={formType ? formType : "button"}
    >
      <div className="select-none">
        <div
          style={style ?? style}
          // @TODO
          // className={classNames()}
          className={(children
            ? outline == true
              ? disabled == true
                ? "w-maxx flex h-[40px] items-center justify-center rounded-2xl border bg-section py-2 px-4 text-accent-strong opacity-40"
                : "w-maxx flex h-[40px] items-center justify-center rounded-2xl border bg-section py-2 px-4 text-accent-strong hover:border-accent-strong hover:bg-accent-weak hover:opacity-80 active:bg-accent-strong active:text-section active:opacity-50 "
              : disabled == true
              ? "w-maxx flex h-[40px] items-center justify-center rounded-2xl bg-accent-weak py-2 px-4 text-section opacity-20"
              : "w-maxx flex h-[40px] items-center justify-center rounded-2xl bg-accent-weak py-2 px-4 text-section hover:opacity-80 active:opacity-50"
            : outline == true
            ? disabled == true
              ? "flex h-[40px] w-[40px] items-center justify-center rounded-2xl border bg-section py-2 px-4 text-accent-strong opacity-40"
              : "[40px] flex h-[40px] items-center justify-center rounded-2xl border bg-section py-2 px-4 text-accent-strong hover:border-accent-strong hover:bg-accent-weak hover:opacity-80 active:bg-accent-strong active:text-section active:opacity-50 "
            : disabled == true
            ? "flex h-[40px] w-[40px] items-center justify-center rounded-2xl bg-accent-strong py-2 px-4 text-section opacity-20"
            : "flex h-[40px] w-[40px] items-center justify-center rounded-2xl bg-accent-strong py-2 px-4 text-section hover:opacity-80 active:opacity-50"
          )
            .concat(" ")
            .concat(className ? className : "")}
        >
          <h1
            className={classNames(
              "flex items-center justify-center gap-1 text-special-white",
              small ? "button-small" : "button-large"
            )}
          >
            {leftIcon &&
              (loading ? (
                <Spinner />
              ) : (
                <Icon
                  icon={leftIcon}
                  size={small == true ? 12 : 16}
                  className={
                    outline
                      ? disabled
                        ? "bg-accent-medium"
                        : "bg-accent"
                      : "bg-special-white"
                  }
                  // color={darkMode ? "white" : accent-strong}
                />
              ))}
            {!leftIcon && !rightIcon ? (
              <>{loading ? <Spinner /> : children}</>
            ) : (
              children
            )}
            {rightIcon &&
              (loading ? (
                <Spinner />
              ) : (
                <Icon
                  icon={rightIcon}
                  size={small == true ? 12 : 16}
                  className={
                    outline
                      ? disabled
                        ? "bg-accent-medium"
                        : "bg-accent"
                      : "bg-special-white"
                  }
                  // color={darkMode ? "white" : accent-strong}
                />
              ))}
          </h1>
        </div>
      </div>
    </button>
  );
};

export { Button };
