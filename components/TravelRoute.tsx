'use client';

import { motion } from 'framer-motion';

export default function TravelRoute() {
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 2,
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
        delay: 1.5,
        duration: 0.5,
        type: "spring",
        bounce: 0.4
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12">
      <svg viewBox="0 0 600 300" className="w-full h-auto">
        <defs>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="10" height="10">
            <circle cx="5" cy="5" r="2" fill="#D97706" opacity="0.6"/>
          </pattern>
        </defs>
        
        {/* Curved dotted path */}
        <motion.path
          d="M 50 150 Q 150 80, 250 150 T 550 150"
          stroke="url(#dots)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        
        {/* Saturday stop */}
        <motion.g variants={iconVariants} initial="hidden" animate="visible">
          <circle cx="150" cy="120" r="25" fill="#FED7AA" stroke="#D97706" strokeWidth="3"/>
          <text x="150" y="90" textAnchor="middle" className="text-sm font-semibold fill-amber-900">Saturday</text>
          <text x="150" y="128" textAnchor="middle" className="text-lg">🎯</text>
        </motion.g>
        
        {/* Sunday stop */}
        <motion.g variants={iconVariants} initial="hidden" animate="visible">
          <circle cx="450" cy="120" r="25" fill="#FED7AA" stroke="#D97706" strokeWidth="3"/>
          <text x="450" y="90" textAnchor="middle" className="text-sm font-semibold fill-amber-900">Sunday</text>
          <text x="450" y="128" textAnchor="middle" className="text-lg">🏁</text>
        </motion.g>
        
        {/* Activity icons along the path */}
        <motion.g variants={iconVariants} initial="hidden" animate="visible">
          <text x="100" y="140" textAnchor="middle" className="text-2xl">🎒</text>
        </motion.g>
        
        <motion.g variants={iconVariants} initial="hidden" animate="visible">
          <text x="200" y="170" textAnchor="middle" className="text-2xl">☕</text>
        </motion.g>
        
        <motion.g variants={iconVariants} initial="hidden" animate="visible">
          <text x="350" y="130" textAnchor="middle" className="text-2xl">🎬</text>
        </motion.g>
        
        <motion.g variants={iconVariants} initial="hidden" animate="visible">
          <text x="500" y="160" textAnchor="middle" className="text-2xl">🌞</text>
        </motion.g>
      </svg>
    </div>
  );
}