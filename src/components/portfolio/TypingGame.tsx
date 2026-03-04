import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, Trophy, RotateCcw, X, Zap } from "lucide-react";

const codeWords = [
  "function", "const", "async", "await", "return",
  "import", "export", "interface", "useState", "useEffect",
  "component", "props", "state", "render", "promise",
  "typescript", "javascript", "python", "django", "react",
  "fastapi", "docker", "kubernetes", "mongodb", "postgresql",
  "algorithm", "recursion", "callback", "middleware", "endpoint",
  "authentication", "authorization", "encryption", "database", "query",
];

const TypingGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("typing-game-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const getRandomWord = useCallback(() => {
    return codeWords[Math.floor(Math.random() * codeWords.length)];
  }, []);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setUserInput("");
    setCorrectChars(0);
    setCurrentWord(getRandomWord());
    startTimeRef.current = Date.now();
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          setGameOver(true);
          clearInterval(timer);

          // Calculate WPM
          const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
          const calculatedWpm = Math.round(correctChars / 5 / elapsedMinutes);
          setWpm(calculatedWpm);

          // Update high score
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("typing-game-highscore", score.toString());
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore, correctChars]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) return;

    const value = e.target.value;
    setUserInput(value);

    if (value === currentWord) {
      setScore((prev) => prev + currentWord.length * 10);
      setCorrectChars((prev) => prev + currentWord.length);
      setCurrentWord(getRandomWord());
      setUserInput("");
    }
  };

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) return "text-muted-foreground";
    if (userInput[index] === currentWord[index]) return "text-green-400";
    return "text-red-400";
  };

  return (
    <>
      {/* Game Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-secondary/20 border border-secondary text-secondary hover:bg-secondary/30 transition-all"
        title="Typing Speed Game"
      >
        <Keyboard className="w-6 h-6" />
      </motion.button>

      {/* Game Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-6 w-[90vw] max-w-lg relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold font-mono flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  Code Typing Challenge
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Type programming keywords as fast as you can!
                </p>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground font-mono">Score</p>
                  <p className="text-2xl font-bold text-primary">{score}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground font-mono">Time</p>
                  <p className={`text-2xl font-bold ${timeLeft <= 10 ? "text-red-400" : "text-foreground"}`}>
                    {timeLeft}s
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground font-mono">High Score</p>
                  <p className="text-2xl font-bold text-secondary">{highScore}</p>
                </div>
              </div>

              {/* Game Area */}
              {!isPlaying && !gameOver ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={startGame}
                  className="w-full py-4 bg-primary/20 border border-primary text-primary rounded-lg font-mono hover:bg-primary/30 transition-all"
                >
                  Start Game 🚀
                </motion.button>
              ) : gameOver ? (
                <div className="text-center">
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Game Over!</h3>
                  <p className="text-muted-foreground mb-1">
                    Final Score: <span className="text-primary font-bold">{score}</span>
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Typing Speed: <span className="text-secondary font-bold">{wpm} WPM</span>
                  </p>
                  {score >= highScore && score > 0 && (
                    <p className="text-green-400 text-sm mb-4 animate-pulse">
                      🎉 New High Score!
                    </p>
                  )}
                  <button
                    onClick={startGame}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-primary/20 border border-primary text-primary rounded-lg font-mono hover:bg-primary/30 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Play Again
                  </button>
                </div>
              ) : (
                <div>
                  {/* Word Display */}
                  <div className="bg-muted/30 rounded-lg p-6 mb-4 text-center">
                    <p className="text-3xl font-mono tracking-wider">
                      {currentWord.split("").map((char, i) => (
                        <span key={i} className={getCharacterClass(i)}>
                          {char}
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* Input */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={handleInput}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 font-mono text-lg text-center focus:outline-none focus:border-primary transition-colors"
                    placeholder="Start typing..."
                    autoComplete="off"
                    spellCheck={false}
                  />

                  {/* Progress Bar */}
                  <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: "100%" }}
                      animate={{ width: `${(timeLeft / 30) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TypingGame;
