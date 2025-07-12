import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeAnimation } from './components/WelcomeAnimation.jsx';
import { MainPage } from './components/MainPage.jsx';

export function App() {
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 9500); // Slightly before 8000 for smoother exit
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {!showMain && (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <WelcomeAnimation />
          </motion.div>
        )}

        {showMain && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <MainPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
