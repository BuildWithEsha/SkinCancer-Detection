import animationVideo from '../assets/animation1.mp4';
import { motion } from 'framer-motion';

export function WelcomeAnimation() {
  return (
    <motion.div
      className="h-screen flex items-center justify-center text-white bg-[#1f1f1f]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="border border-blue-400 rounded-md px-0.5 py-0 shadow-[0_0_25px_rgba(59,130,246,0.8)]">
        <video autoPlay loop muted className="w-[25v] h-[25v] object-contain bg-[#000000]">
          <source src={animationVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.div>
  );
}
