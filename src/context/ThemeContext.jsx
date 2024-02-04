import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isLight, setIsLight] = useState(() => {
    const prevTheme = localStorage.getItem("theme");
    if (prevTheme) {
      return JSON.parse(prevTheme);
    }

    return false;
  });

  return (
    <ThemeContext.Provider value={{ isLight, setIsLight }}>
      {children}
    </ThemeContext.Provider>
  );
}
