'use client';

import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function Header({ title, subtitle, className = "" }: HeaderProps) {
  return (
    <motion.header 
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-amber-900 mb-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p 
          className="text-lg md:text-xl text-amber-800 font-medium"
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