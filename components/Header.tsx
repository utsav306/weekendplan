"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function Header({
  title,
  subtitle,
  className = "",
}: HeaderProps) {
  return (
    <motion.header
      className={`text-center ${className} relative`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-16 h-16 bg-amber-200/30 rounded-full blur-sm"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-12 h-12 bg-orange-200/40 rounded-full blur-sm"
          animate={{
            y: [0, 15, 0],
            x: [0, -5, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <motion.h1
        className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 mb-4 relative z-10"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        {title}
        {/* Floating sparkles */}
        <motion.span
          className="absolute -top-2 -right-2 text-2xl"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨
        </motion.span>
        <motion.span
          className="absolute -bottom-1 -left-2 text-xl"
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          🌟
        </motion.span>
      </motion.h1>

      {/* Animated underline */}
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mx-auto mb-4"
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      {subtitle && (
        <motion.p
          className="text-lg md:text-xl text-gray-700 font-medium relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
}
