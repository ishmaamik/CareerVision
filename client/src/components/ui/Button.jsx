import React from "react";
import PropTypes from "prop-types";

/**
 * Modern Button Component
 * Supports multiple variants, sizes, and states
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = "left",
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses = [
    "inline-flex",
    "items-center",
    "justify-center",
    "font-medium",
    "transition-all",
    "duration-200",
    "focus-ring",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
  ];

  const variants = {
    primary: [
      "bg-brand",
      "text-white",
      "hover:bg-brand-hover",
      "shadow-sm",
      "hover:shadow-md",
    ],
    secondary: [
      "bg-surface",
      "text-primary",
      "border",
      "border-border",
      "hover:bg-surface-secondary",
      "hover:border-border-strong",
    ],
    ghost: ["bg-transparent", "text-primary", "hover:bg-surface-secondary"],
    danger: [
      "bg-red-500",
      "text-white",
      "hover:bg-red-600",
      "shadow-sm",
      "hover:shadow-md",
    ],
    success: [
      "bg-green-500",
      "text-white",
      "hover:bg-green-600",
      "shadow-sm",
      "hover:shadow-md",
    ],
  };

  const sizes = {
    sm: ["px-3", "py-2", "text-sm", "rounded-md", "gap-1.5"],
    md: ["px-4", "py-2.5", "text-base", "rounded-lg", "gap-2"],
    lg: ["px-6", "py-3", "text-lg", "rounded-lg", "gap-2.5"],
    xl: ["px-8", "py-4", "text-xl", "rounded-xl", "gap-3"],
  };

  const classes = [
    ...baseClasses,
    ...variants[variant],
    ...sizes[size],
    className,
  ].join(" ");

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {!loading && icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}

      {children}

      {!loading && icon && iconPosition === "right" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "ghost",
    "danger",
    "success",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
