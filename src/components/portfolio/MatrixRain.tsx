import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface MatrixRainProps {
  onClose: () => void;
}

const MatrixRain = ({ onClose }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(10, 15, 25, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00d4ff";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Create gradient effect
        const gradient = ctx.createLinearGradient(x, y - 100, x, y);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, "#00d4ff50");
        gradient.addColorStop(1, "#00d4ff");
        ctx.fillStyle = gradient;

        ctx.fillText(char, x, y);

        // Bright head of the drop
        ctx.fillStyle = "#ffffff";
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100]"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-mono font-bold text-primary glow-text mb-4">
            🎮 KONAMI CODE ACTIVATED!
          </h2>
          <p className="text-xl text-muted-foreground font-mono">
            You found the secret! You're a true gamer 🕹️
          </p>
          <p className="text-sm text-muted-foreground/60 mt-4 font-mono">
            ↑↑↓↓←→←→BA
          </p>
        </motion.div>
      </div>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-card/80 rounded-full border border-primary/50 text-primary hover:bg-primary/20 transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-muted-foreground/50 text-sm font-mono animate-pulse">
          Click anywhere or press ESC to close
        </p>
      </div>
    </motion.div>
  );
};

export default MatrixRain;
