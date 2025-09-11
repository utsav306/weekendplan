'use client';

import { motion } from 'framer-motion';

export default function TravelRoute() {
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 2,
        duration: 0.8,
        type: "spring",
        bounce: 0.6
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto my-12 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 via-orange-100/50 to-rose-100/50 rounded-3xl blur-3xl transform scale-110" />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
        <svg viewBox="0 0 600 300" className="w-full h-auto">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="12" height="12">
            <circle cx="6" cy="6" r="2.5" fill="url(#pathGradient)" opacity="0.8"/>
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Curved dotted path */}
        <motion.path
          d="M 50 150 Q 150 80, 250 150 T 550 150"
          stroke="url(#dots)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          filter="url(#glow)"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        
        {/* Saturday stop */}
        <motion.g 
          variants={iconVariants} 
          initial="hidden" 
          animate="visible"
        >
          <motion.g variants={floatingVariants} animate="animate">
            <circle cx="150" cy="120" r="30" fill="url(#pathGradient)" opacity="0.2"/>
            <circle cx="150" cy="120" r="25" fill="#FFFFFF" stroke="url(#pathGradient)" strokeWidth="3" filter="url(#glow)"/>
            <text x="150" y="85" textAnchor="middle" className="text-sm font-bold fill-amber-900">Saturday</text>
            <text x="150" y="128" textAnchor="middle" className="text-xl">🎯</text>
          </motion.g>
        </motion.g>
        
        {/* Sunday stop */}
        <motion.g 
          variants={iconVariants} 
          initial="hidden" 
          animate="visible"
        >
          <motion.g variants={floatingVariants} animate="animate" transition={{ delay: 0.5 }}>
            <circle cx="450" cy="120" r="30" fill="url(#pathGradient)" opacity="0.2"/>
            <circle cx="450" cy="120" r="25" fill="#FFFFFF" stroke="url(#pathGradient)" strokeWidth="3" filter="url(#glow)"/>
            <text x="450" y="85" textAnchor="middle" className="text-sm font-bold fill-amber-900">Sunday</text>
            <text x="450" y="128" textAnchor="middle" className="text-xl">🏁</text>
          </motion.g>
        </motion.g>
        
        {/* Activity icons along the path */}
        <motion.g variants={iconVariants} initial="hidden" animate="visible" transition={{ delay: 2.5 }}>
          <motion.g variants={floatingVariants} animate="animate" transition={{ delay: 1 }}>
            <text x="100" y="140" textAnchor="middle" className="text-3xl drop-shadow-lg">🎒</text>
          </motion.g>
        </motion.g>
        
        <motion.g variants={iconVariants} initial="hidden" animate="visible" transition={{ delay: 2.7 }}>
          <motion.g variants={floatingVariants} animate="animate" transition={{ delay: 1.5 }}>
            <text x="200" y="170" textAnchor="middle" className="text-3xl drop-shadow-lg">☕</text>
          </motion.g>
        </motion.g>
        
        <motion.g variants={iconVariants} initial="hidden" animate="visible" transition={{ delay: 2.9 }}>
          <motion.g variants={floatingVariants} animate="animate" transition={{ delay: 2 }}>
            <text x="350" y="130" textAnchor="middle" className="text-3xl drop-shadow-lg">🎬</text>
          </motion.g>
        </motion.g>
        
        <motion.g variants={iconVariants} initial="hidden" animate="visible" transition={{ delay: 3.1 }}>
          <motion.g variants={floatingVariants} animate="animate" transition={{ delay: 2.5 }}>
            <text x="500" y="160" textAnchor="middle" className="text-3xl drop-shadow-lg">🌞</text>
          </motion.g>
        </motion.g>
      </svg>
      </div>
    </div>
  );
}