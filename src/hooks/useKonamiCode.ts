import { useEffect, useState, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export const useKonamiCode = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  const resetCode = useCallback(() => {
    setIsActivated(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.code].slice(-KONAMI_CODE.length);
      setKeySequence(newSequence);

      if (newSequence.join(",") === KONAMI_CODE.join(",")) {
        setIsActivated(true);
        setKeySequence([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keySequence]);

  return { isActivated, resetCode };
};
