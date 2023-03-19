"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface IThemeContext {
  theme: "dark" | "light" | null;
  setLight: () => void;
  setDark: () => void;
  toggle: () => void;
}

const ThemeContext = createContext<IThemeContext>({
  theme: null,
  setLight: () => {},
  setDark: () => {},
  toggle: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.body.classList.add("dark");
    } else {
      setTheme("light");
      document.body.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (theme !== null) {
      localStorage.theme = theme;
      if (theme === "light") {
        document.body.classList.remove("dark");
      }
      if (theme === "dark") {
        document.body.classList.add("dark");
      }
    }
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider
        value={{
          theme: theme,
          setLight: () => {
            setTheme("light");
            localStorage.theme = "light";
          },
          setDark: () => {
            setTheme("dark");
            localStorage.theme = "dark";
          },
          toggle: () => {
            if (theme === "light") {
              setTheme("dark");
              localStorage.theme = "dark";
            } else {
              setTheme("light");
              localStorage.theme = "light";
            }
          },
        }}
      >
        {children}
      </ThemeContext.Provider>
    </>
  );
}

const useTheme = () => useContext(ThemeContext);
export default useTheme;

export { ThemeProvider };
