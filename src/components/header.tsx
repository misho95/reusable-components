import { useLayoutEffect, useState } from "react";

const Header = () => {
  const [theme, setTheme] = useState("dark");

  useLayoutEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <header className="sticky top-0 h-[80px] flex justify-between items-center px-20 bg-slate-100 dark:bg-slate-800/80 backdrop-blur-lg">
      header
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        switch theme
      </button>
    </header>
  );
};

export default Header;
