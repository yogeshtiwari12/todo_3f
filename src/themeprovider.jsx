import React, { createContext, useEffect, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Custom Hook for easier access
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
