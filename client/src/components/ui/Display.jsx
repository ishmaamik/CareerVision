import React from "react";
import PropTypes from "prop-types";

/**
 * Modern Badge Component
 * Used for status indicators, tags, and labels
 */
const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClasses = [
    "inline-flex",
    "items-center",
    "font-medium",
    "rounded-full",
    "border",
  ];

  const variants = {
    default: ["bg-neutral-100", "text-neutral-800", "border-neutral-200"],
    primary: ["bg-primary-100", "text-primary-800", "border-primary-200"],
    secondary: [
      "bg-secondary-100",
      "text-secondary-800",
      "border-secondary-200",
    ],
    success: ["bg-success-100", "text-success-800", "border-success-200"],
    warning: ["bg-warning-100", "text-warning-800", "border-warning-200"],
    error: ["bg-error-100", "text-error-800", "border-error-200"],
    outline: ["bg-transparent", "text-neutral-700", "border-neutral-300"],
  };

  const sizes = {
    sm: ["px-2", "py-0.5", "text-xs"],
    md: ["px-2.5", "py-1", "text-sm"],
    lg: ["px-3", "py-1.5", "text-base"],
  };

  const classes = [
    ...baseClasses,
    ...variants[variant],
    ...sizes[size],
    className,
  ].join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "outline",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};

/**
 * Avatar Component
 * For user profile pictures and initials
 */
const Avatar = ({
  src,
  alt,
  initials,
  size = "md",
  className = "",
  ...props
}) => {
  const sizes = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl",
    "2xl": "h-20 w-20 text-2xl",
  };

  const baseClasses = [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-full",
    "bg-neutral-100",
    "text-neutral-600",
    "font-medium",
    "overflow-hidden",
  ];

  const classes = [...baseClasses, sizes[size], className].join(" ");

  if (src) {
    return <img src={src} alt={alt} className={classes} {...props} />;
  }

  return (
    <div className={classes} {...props}>
      <span>{initials}</span>
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  initials: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "2xl"]),
  className: PropTypes.string,
};

/**
 * Progress Bar Component
 */
const Progress = ({
  value = 0,
  max = 100,
  size = "md",
  variant = "primary",
  showLabel = false,
  className = "",
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const variants = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
    success: "bg-success-500",
    warning: "bg-warning-500",
    error: "bg-error-500",
  };

  const containerClasses = [
    "w-full",
    "bg-neutral-200",
    "rounded-full",
    "overflow-hidden",
    sizes[size],
    className,
  ].join(" ");

  const barClasses = [
    "h-full",
    "transition-all",
    "duration-300",
    "ease-out",
    variants[variant],
  ].join(" ");

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="body-sm text-secondary">Progress</span>
          <span className="body-sm font-medium text-primary">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={containerClasses} {...props}>
        <div className={barClasses} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

Progress.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
  ]),
  showLabel: PropTypes.bool,
  className: PropTypes.string,
};

export { Badge, Avatar, Progress };
