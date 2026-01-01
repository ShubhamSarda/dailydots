import * as React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  ariaLabel?: string; // use only for icon-only buttons
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function AccessibleButton({
  children,
  onClick,
  variant = "primary",
  ariaLabel,
  type = "button",
  disabled,
}: Props) {
  const className =
    variant === "primary"
      ? "btn btn-primary"
      : "btn btn-secondary";

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
