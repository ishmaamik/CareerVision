import React from "react";
import { ThemeProvider } from "../../context/ThemeContext";

const AppThemeProvider = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default AppThemeProvider;
