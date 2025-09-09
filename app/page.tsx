'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Button from '@/components/Button';
import TravelRoute from '@/components/TravelRoute';

export default function Home() {
  const router = useRouter();

  const handleStartPlanning = () => {
    router.push('/planner');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-25 to-orange-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <Header 
          title="Weekendly"
          subtitle="Plan your perfect weekend journey ✨"
          className="mb-8"
        />

        {/* Travel Route Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <TravelRoute />
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <Button 
            onClick={handleStartPlanning}
            variant="primary"
            size="lg"
            className="shadow-2xl"
          >
            Start Planning 🚀
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="text-center text-amber-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          Built with Next.js + TailwindCSS
        </motion.footer>
      </div>
    </div>
  );
}