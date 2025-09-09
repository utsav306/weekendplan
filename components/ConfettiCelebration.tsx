"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiCelebrationProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function ConfettiCelebration({
  isActive,
  onComplete,
}: ConfettiCelebrationProps) {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (isActive) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        onComplete();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <>
      <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        recycle={false}
        numberOfPieces={200}
        gravity={0.3}
        colors={["#F59E0B", "#D97706", "#92400E", "#FED7AA", "#FEF3C7"]}
      />

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl text-center relative">
              {/* Close button */}
              <button
                onClick={() => {
                  setShowMessage(false);
                  onComplete();
                }}
                className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 focus:outline-none z-10"
                style={{ pointerEvents: "auto" }}
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                <span className="text-6xl mb-4 block">🏆</span>
              </motion.div>
              <h2 className="text-3xl font-bold text-amber-900 mb-2">
                Weekend Complete!
              </h2>
              <p className="text-lg text-amber-700">
                Amazing job planning and completing your weekend journey! 🎉
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
