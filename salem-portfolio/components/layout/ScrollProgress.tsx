'use client';

import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 via-pink-500 to-violet-600 z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
