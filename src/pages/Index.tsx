import { useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/portfolio/ParticleBackground";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import InteractiveTerminal from "@/components/portfolio/InteractiveTerminal";
import ThemeSwitcher from "@/components/portfolio/ThemeSwitcher";
import TypingGame from "@/components/portfolio/TypingGame";
import FunFactsTicker from "@/components/portfolio/FunFactsTicker";
import CursorFollower from "@/components/portfolio/CursorFollower";
import VisitorCounter from "@/components/portfolio/VisitorCounter";
import MatrixRain from "@/components/portfolio/MatrixRain";
import { useKonamiCode } from "@/hooks/useKonamiCode";

const Index = () => {

  const { isActivated, resetCode } = useKonamiCode();
  const [showMatrix, setShowMatrix] = useState(false);

  useEffect(() => {
    if (isActivated) {
      setShowMatrix(true);
    }
  }, [isActivated]);

  const handleCloseMatrix = useCallback(() => {
    setShowMatrix(false);
    resetCode();
  }, [resetCode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showMatrix) {
        handleCloseMatrix();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showMatrix, handleCloseMatrix]);

  return (
    <div className="relative min-h-screen">
      {/* Custom Cursor */}
      <CursorFollower />


      {/* Konami Code Easter Egg */}
      <AnimatePresence>
        {showMatrix && <MatrixRain onClose={handleCloseMatrix} />}
      </AnimatePresence>

      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Visitor Counter */}
      <VisitorCounter />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />

        {/* Fun Facts Ticker */}
        <FunFactsTicker />

        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Features */}
      <InteractiveTerminal />
      <TypingGame />
    </div>
  );
};

export default Index;
