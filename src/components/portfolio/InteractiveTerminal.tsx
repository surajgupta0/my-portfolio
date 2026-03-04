import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minus, Square } from "lucide-react";

const commands: Record<string, string | (() => string)> = {
  help: `Available commands:
  about     - Learn about me
  skills    - View my technical skills
  projects  - See my projects
  contact   - Get my contact info
  experience- View work experience
  joke      - Get a programming joke
  quote     - Get an inspirational quote
  clear     - Clear the terminal
  matrix    - Toggle matrix mode
  coffee    - Essential developer fuel
  sudo hire - The most important command`,

  about: `╔══════════════════════════════════════════════════════════╗
║  SURAJ KUMAR GUPTA                                       ║
║  Full Stack Developer | AI/ML Engineer                   ║
╠══════════════════════════════════════════════════════════╣
║  2+ years of experience building scalable applications   ║
║  Specialized in Python, Django, FastAPI & LLM integrations║
║  Passionate about creating AI-powered solutions          ║
╚══════════════════════════════════════════════════════════╝`,

  skills: `
┌─────────────────┬─────────────────────────────────────┐
│ Category        │ Technologies                        │
├─────────────────┼─────────────────────────────────────┤
│ Languages       │ Python, JavaScript, PHP, Java       │
│ Frameworks      │ Django, FastAPI, React.js, Flask    │
│ AI/ML           │ LLMs, RAG, NLP, OpenAI, Pandas      │
│ Databases       │ PostgreSQL, MongoDB, Redis          │
│ DevOps          │ Docker, CI/CD, Git, Linux           │
└─────────────────┴─────────────────────────────────────┘`,

  projects: `
🚀 Featured Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 ChatyZone - AI Document Assistant
   Tech: FastAPI, React, PostgreSQL, OpenAI
   ⭐ 95% text extraction accuracy

📈 Stock Market Predictor
   Tech: Django, Python, LSTM
   ⭐ 75% prediction accuracy

🎬 Movie Recommendation System
   Tech: Python, Streamlit, Pandas
   ⭐ Used by 100+ users`,

  contact: `
📧 Email: kumar.suraj9918@gmail.com
📱 Phone: +91-8433573748
🔗 LinkedIn: linkedin.com/in/suraj-gupta-mca
🐙 GitHub: github.com/surajgupta0
📍 Location: Mumbai, Maharashtra`,

  experience: `
💼 Work Experience:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 GetSetHome (Jan 2025 - Present)
   Role: Python Developer
   → Built SaaS platform with multi-tenant architecture
   → Developed AI-powered sales chatbot

🏢 Softaculous (Dec 2021 - Oct 2022)
   Role: Software Developer
   → Optimized queries, reduced load times by 20%

🏢 WebPerfecto (Oct 2022 - Oct 2023)
   Role: WordPress Developer
   → Built 15+ websites, increased engagement 30%`,

  joke: () => {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 🍺",
      "Why do Java developers wear glasses? Because they don't C#! 👓",
      "There are only 10 types of people in the world: those who understand binary and those who don't.",
      "// This code works, I have no idea why 🤷‍♂️",
      "A programmer's wife tells him: 'Go to the store and buy a loaf of bread. If they have eggs, buy a dozen.' He comes home with 12 loaves of bread. 🍞",
      "Why was the JavaScript developer sad? Because he didn't Node how to Express himself! 😢",
      "!false - It's funny because it's true! 😄",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  },

  quote: () => {
    const quotes = [
      '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
      '"First, solve the problem. Then, write the code." - John Johnson',
      '"The best error message is the one that never shows up." - Thomas Fuchs',
      '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
      '"Simplicity is the soul of efficiency." - Austin Freeman',
      '"Make it work, make it right, make it fast." - Kent Beck',
      '"Programming isn\'t about what you know; it\'s about what you can figure out." - Chris Pine',
    ];
    return `💡 ${quotes[Math.floor(Math.random() * quotes.length)]}`;
  },

  coffee: `
        ( (
         ) )
      .______.
      |      |]
      \\      /
       '----'
   ☕ COFFEE LOADED!
   Energy: ████████████ 100%
   Productivity: MAXIMUM
   Bugs: TEMPORARILY SCARED`,

  "sudo hire": `
🎉 CONGRATULATIONS! 🎉
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You've made an excellent decision!

📧 Contact me at: kumar.suraj9918@gmail.com
📱 Or call: +91-8433573748

Let's build something amazing together! 🚀`,

  matrix: "🔋 Matrix mode activated! Press Ctrl+M or check the easter egg...",
  
  whoami: "You are an awesome person visiting an even more awesome portfolio! 🌟",
  
  ls: "README.md  portfolio/  skills.json  projects/  dreams.txt  ambitions.unlimited",
  
  pwd: "/home/suraj/awesome-developer-portfolio",
  
  date: () => new Date().toString(),
  
  neofetch: `
   _____ _    _ ____      _     _ 
  / ____| |  | |  _ \\    / \\   | |
 | (___ | |  | | |_) |  / _ \\  | |
  \\___ \\| |  | |  _ <  / ___ \\ | |
  ____) | |__| | |_) |/ /   \\ \\| |____
 |_____/ \\____/|____/_/     \\_\\______|
 
 OS: Developer Mode 2.0
 Host: Portfolio v1.0
 Kernel: React 18.3.1
 Uptime: Since 2021
 Packages: 50+ npm packages
 Shell: TypeScript
 Theme: Cyberpunk Dark
 CPU: Brain @ 100% (when caffeinated)
 Memory: 2+ years of experience`,
};

const InteractiveTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [history, setHistory] = useState<{ command: string; output: string }[]>([
    { command: "", output: 'Welcome to Suraj\'s Terminal! Type "help" for available commands.' },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    let output: string;
    const commandHandler = commands[trimmedCmd];
    
    if (commandHandler) {
      output = typeof commandHandler === "function" ? commandHandler() : commandHandler;
    } else if (trimmedCmd === "") {
      output = "";
    } else {
      output = `Command not found: ${trimmedCmd}. Type "help" for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  return (
    <>
      {/* Floating Terminal Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary/20 border border-primary text-primary hover:bg-primary/30 transition-all glow-primary ${
          isOpen ? "hidden" : ""
        }`}
      >
        <Terminal className="w-6 h-6" />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: isMinimized ? 0 : 1, 
              y: isMinimized ? 100 : 0, 
              scale: isMinimized ? 0.8 : 1 
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-2xl"
          >
            <div className="rounded-lg overflow-hidden border border-primary/30 shadow-2xl">
              {/* Title Bar */}
              <div className="bg-card flex items-center justify-between px-4 py-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm text-muted-foreground">
                    suraj@portfolio:~$
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    <Minus className="w-4 h-4 text-yellow-500" />
                  </button>
                  <button className="p-1 hover:bg-muted rounded transition-colors">
                    <Square className="w-3 h-3 text-green-500" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              {/* Terminal Content */}
              <div
                ref={terminalRef}
                onClick={() => inputRef.current?.focus()}
                className="bg-background/95 backdrop-blur-xl p-4 h-80 overflow-y-auto font-mono text-sm cursor-text"
              >
                {history.map((item, index) => (
                  <div key={index} className="mb-2">
                    {item.command && (
                      <div className="flex items-center gap-2">
                        <span className="text-primary">➜</span>
                        <span className="text-green-400">~</span>
                        <span className="text-foreground">{item.command}</span>
                      </div>
                    )}
                    <pre className="text-muted-foreground whitespace-pre-wrap mt-1 pl-6">
                      {item.output}
                    </pre>
                  </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center gap-2">
                  <span className="text-primary">➜</span>
                  <span className="text-green-400">~</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-foreground caret-primary"
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Terminal */}
      {isOpen && isMinimized && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary/20 border border-primary text-primary hover:bg-primary/30 transition-all glow-primary"
        >
          <Terminal className="w-6 h-6" />
        </motion.button>
      )}
    </>
  );
};

export default InteractiveTerminal;
