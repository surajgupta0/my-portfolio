import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const funFacts = [
  "☕ Powered by 3+ cups of coffee daily",
  "💻 Written 50,000+ lines of code",
  "🐛 Squashed 1000+ bugs (and counting)",
  "🌙 Night owl coder since 2019",
  "🎮 Konami code works here! Try: ↑↑↓↓←→←→BA",
  "🚀 Deployed 20+ projects to production",
  "📚 Read 100+ tech articles monthly",
  "🎯 95% uptime on production systems",
  "⚡ Reduced load times by 20%",
  "🤖 Built 5+ AI-powered applications",
  "🔧 Favorite debug tool: console.log('here')",
  "🎨 Dark theme enthusiast",
  "⌨️ Keyboard shortcuts > Mouse clicks",
  "🐍 Python is my first love",
  "⚛️ React makes me happy",
];

const FunFactsTicker = () => {
  // Double the array for seamless loop
  const duplicatedFacts = [...funFacts, ...funFacts];

  return (
    <div className="w-full overflow-hidden bg-card/50 border-y border-border py-3">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4 flex items-center gap-2 text-primary">
          <Sparkles className="w-4 h-4" />
          <span className="font-mono text-sm font-semibold">Fun Facts</span>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{
              x: [0, -50 * funFacts.length],
            }}
            transition={{
              x: {
                duration: funFacts.length * 4,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicatedFacts.map((fact, index) => (
              <span
                key={index}
                className="text-muted-foreground font-mono text-sm"
              >
                {fact}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FunFactsTicker;
