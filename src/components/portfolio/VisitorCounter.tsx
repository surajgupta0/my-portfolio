import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Users, Clock } from "lucide-react";

const VisitorCounter = () => {
  const [views, setViews] = useState(0);
  const [displayViews, setDisplayViews] = useState(0);
  const [timeOnSite, setTimeOnSite] = useState(0);

  useEffect(() => {
    // Get or initialize view count from localStorage
    const storedViews = localStorage.getItem("portfolio-views");
    const newViews = storedViews ? parseInt(storedViews) + 1 : 1;
    localStorage.setItem("portfolio-views", newViews.toString());
    setViews(newViews);

    // Animate the counter
    const duration = 2000;
    const steps = 60;
    const increment = newViews / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= newViews) {
        setDisplayViews(newViews);
        clearInterval(timer);
      } else {
        setDisplayViews(Math.floor(current));
      }
    }, duration / steps);

    // Time on site counter
    const timeTimer = setInterval(() => {
      setTimeOnSite((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(timeTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed left-6 bottom-24 z-40 hidden lg:block"
    >
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Eye className="w-3 h-3 text-primary" />
          <span className="text-muted-foreground">Views:</span>
          <span className="text-primary font-bold">{displayViews}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <Clock className="w-3 h-3 text-secondary" />
          <span className="text-muted-foreground">Time:</span>
          <span className="text-secondary font-bold">{formatTime(timeOnSite)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default VisitorCounter;
