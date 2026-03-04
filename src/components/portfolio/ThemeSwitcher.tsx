import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";

const themes = [
  {
    name: "Cyberpunk",
    id: "cyberpunk",
    primary: "190 100% 50%",
    secondary: "260 100% 65%",
    preview: "from-cyan-400 to-purple-500",
  },
  {
    name: "Matrix",
    id: "matrix",
    primary: "120 100% 50%",
    secondary: "120 80% 35%",
    preview: "from-green-400 to-green-600",
  },
  {
    name: "Sunset",
    id: "sunset",
    primary: "25 100% 55%",
    secondary: "340 100% 60%",
    preview: "from-orange-400 to-pink-500",
  },
  {
    name: "Ocean",
    id: "ocean",
    primary: "200 100% 50%",
    secondary: "220 100% 60%",
    preview: "from-blue-400 to-indigo-500",
  },
  {
    name: "Aurora",
    id: "aurora",
    primary: "280 100% 65%",
    secondary: "160 100% 50%",
    preview: "from-purple-400 to-emerald-400",
  },
];

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("cyberpunk");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") || "cyberpunk";
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--accent", theme.primary);
    root.style.setProperty("--ring", theme.primary);
    root.style.setProperty("--secondary", theme.secondary);
    root.style.setProperty("--glow-primary", theme.primary);
    root.style.setProperty("--glow-secondary", theme.secondary);
    root.style.setProperty("--gradient-start", theme.primary);
    root.style.setProperty("--gradient-end", theme.secondary);
  };

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
    localStorage.setItem("portfolio-theme", themeId);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-24 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-card/80 border border-primary/30 text-primary hover:bg-primary/20 transition-all backdrop-blur-sm"
      >
        <Palette className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="absolute top-0 right-14 bg-card/95 backdrop-blur-xl border border-border rounded-lg p-4 min-w-[200px]"
          >
            <h3 className="font-mono text-sm text-muted-foreground mb-3">
              Choose Theme
            </h3>
            <div className="space-y-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    currentTheme === theme.id
                      ? "bg-primary/20 border border-primary/50"
                      : "hover:bg-muted"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${theme.preview}`}
                  />
                  <span className="font-mono text-sm flex-1 text-left">
                    {theme.name}
                  </span>
                  {currentTheme === theme.id && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
