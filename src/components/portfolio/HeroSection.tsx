import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const roles = [
  "Full Stack Developer",
  "AI/ML Engineer",
  "Python Expert",
  "Problem Solver",
];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative pt-20"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-primary mb-4"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            <span className="text-gradient">Suraj Kumar Gupta</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-5xl font-bold text-muted-foreground mb-6 h-16"
          >
            I'm a{" "}
            <span className="text-primary font-mono">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed"
          >
            Building scalable SaaS platforms, AI-powered solutions, and crafting
            exceptional digital experiences. Specialized in Python, Django,
            FastAPI, and LLM integrations with 2+ years of hands-on experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 font-mono text-sm overflow-hidden rounded-lg"
            >
              <span className="absolute inset-0 bg-primary/20 border border-primary rounded-lg transition-all group-hover:bg-primary/30" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative text-primary">View My Work</span>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 font-mono text-sm border border-muted hover:border-primary text-muted-foreground hover:text-primary rounded-lg transition-all"
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-6"
          >
            <a
              href="https://github.com/surajgupta0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/suraj-gupta-mca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:kumar.suraj9918@gmail.com"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all"
            >
              <Mail className="w-6 h-6" />
            </a>
            <span className="w-24 h-px bg-muted-foreground/30" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
