import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RevealOnScrollProps {
  children: ReactNode;
  duration?: number;
  offsetY?: number;
  delay?: number;
}

/**
 * Mirrors RevealOnScroll from the Flutter app: fades and slides content up
 * the first time it crosses 20% visibility in the viewport.
 */
export default function RevealOnScroll({
  children,
  duration = 600,
  offsetY = 30,
  delay = 0,
}: RevealOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier curve (easeOutQuart)
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
