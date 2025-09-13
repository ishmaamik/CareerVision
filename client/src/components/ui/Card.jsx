import React from "react";
import PropTypes from "prop-types";

/**
 * Modern Card Component
 * Flexible container for content with consistent styling
 */
const Card = ({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  hover = false,
  interactive = false,
  ...props
}) => {
  const baseClasses = [
    "bg-surface",
    "border",
    "border-border",
    "rounded-xl",
    "transition-all",
    "duration-200",
  ];

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  const interactiveClasses = interactive
    ? [
        "cursor-pointer",
        "hover:shadow-lg",
        "hover:border-border-strong",
        "hover:-translate-y-1",
      ]
    : [];

  const hoverClasses = hover ? ["hover:shadow-lg"] : [];

  const classes = [
    ...baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    ...interactiveClasses,
    ...hoverClasses,
    className,
  ].join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(["none", "sm", "md", "lg", "xl"]),
  shadow: PropTypes.oneOf(["none", "sm", "md", "lg", "xl"]),
  hover: PropTypes.bool,
  interactive: PropTypes.bool,
};

/**
 * Card Header Component
 */
const CardHeader = ({ children, className = "", ...props }) => {
  const classes = ["border-b", "border-border", "pb-4", "mb-6", className].join(
    " "
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Card Content Component
 */
const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Card Footer Component
 */
const CardFooter = ({ children, className = "", ...props }) => {
  const classes = ["border-t", "border-border", "pt-4", "mt-6", className].join(
    " "
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
