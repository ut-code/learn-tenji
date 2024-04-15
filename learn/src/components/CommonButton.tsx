import { MouseEventHandler } from "react";

type CommonButtonProps = {
  disabled?: boolean | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  variant?: "outlined" | "contained";
  children: React.ReactNode;
};

function CommonButton(props: CommonButtonProps) {
  const { disabled, onClick, variant, children } = props;
  const baseClassName =
    "mb-1 rounded border px-4 py-2 text-center font-medium ";
  let className = baseClassName;

  if (disabled) {
    if (variant === "contained") {
      className += "text-white bg-blue-300 dark:bg-white dark:text-blue-300";
    } else {
      className +=
        "border-blue-300 text-blue-300 dark:border-blue-300 dark:text-blue-300";
    }
  } else if (!disabled) {
    if (variant === "contained") {
      className += "text-white bg-blue-500 hover:text-blue-500 hover:bg-white";
    } else {
      className +=
        "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300";
    }
  }

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default CommonButton;
