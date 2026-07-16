import { useEffect, useState } from "react";
import "./styles/theme.css";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Event from "./components/Event";
import Gallery from "./components/Gallery";
import RSVP from "./components/RSVP";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't explicitly set a preference
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div data-theme={theme}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Story />
      <Event />
      <Gallery />
      <RSVP />
    </div>
  );
}

export default App;