import React from "react";
import PropTypes from "prop-types";

/**
 * Modern Input Component
 * Supports various input types with consistent styling
 */
const Input = ({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  size = "md",
  icon = null,
  iconPosition = "left",
  className = "",
  ...props
}) => {
  const baseInputClasses = [
    "w-full",
    "border",
    "border-border",
    "rounded-lg",
    "bg-surface",
    "text-primary",
    "transition-all",
    "duration-200",
    "focus:border-brand",
    "focus:ring-3",
    "focus:ring-primary-100",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
  ];

  const sizes = {
    sm: ["px-3", "py-2", "text-sm"],
    md: ["px-4", "py-2.5", "text-base"],
    lg: ["px-5", "py-3", "text-lg"],
  };

  const errorClasses = error
    ? ["border-error-500", "focus:border-error-500", "focus:ring-error-100"]
    : [];

  const iconClasses = icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : [];

  const inputClasses = [
    ...baseInputClasses,
    ...sizes[size],
    ...errorClasses,
    ...iconClasses,
    className,
  ].join(" ");

  return (
    <div className="w-full">
      {label && (
        <label className="block body-sm font-medium text-secondary mb-2">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div
            className={`absolute inset-y-0 ${
              iconPosition === "left" ? "left-0 pl-3" : "right-0 pr-3"
            } flex items-center pointer-events-none`}
          >
            <span className="text-tertiary">{icon}</span>
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />
      </div>

      {(error || helperText) && (
        <p className={`mt-2 body-sm ${error ? "text-error" : "text-tertiary"}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
};

/**
 * Textarea Component
 */
const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  rows = 4,
  className = "",
  ...props
}) => {
  const baseClasses = [
    "w-full",
    "border",
    "border-border",
    "rounded-lg",
    "bg-surface",
    "text-primary",
    "px-4",
    "py-2.5",
    "text-base",
    "transition-all",
    "duration-200",
    "focus:border-brand",
    "focus:ring-3",
    "focus:ring-primary-100",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "resize-y",
  ];

  const errorClasses = error
    ? ["border-error-500", "focus:border-error-500", "focus:ring-error-100"]
    : [];

  const textareaClasses = [...baseClasses, ...errorClasses, className].join(
    " "
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block body-sm font-medium text-secondary mb-2">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={rows}
        className={textareaClasses}
        {...props}
      />

      {(error || helperText) && (
        <p className={`mt-2 body-sm ${error ? "text-error" : "text-tertiary"}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  className: PropTypes.string,
};

export { Input, Textarea };
