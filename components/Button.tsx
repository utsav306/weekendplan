'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = "",
  type = 'button'
}: ButtonProps) {
  const baseClasses = "font-semibold rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300/50";
  
  const variantClasses = {
    primary: "bg-amber-500 hover:bg-amber-600 text-white border-amber-500 hover:border-amber-600 shadow-lg hover:shadow-xl",
    secondary: "bg-transparent hover:bg-amber-50 text-amber-700 border-amber-300 hover:border-amber-400"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", bounce: 0.3 }}
    >
      {children}
    </motion.button>
  );
}