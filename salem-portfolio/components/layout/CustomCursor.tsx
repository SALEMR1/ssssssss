'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const isPointerRef = useRef(false);
  const isHiddenRef  = useRef(false);

  // Raw position — updated directly without React re-render
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Outer ring follows with spring lag
  const springX = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.5 });

  // Inner dot follows tightly
  const dotX = useSpring(rawX, { stiffness: 600, damping: 30 });
  const dotY = useSpring(rawY, { stiffness: 600, damping: 30 });

  const scaleMotion  = useMotionValue(1);
  const opacityMotion = useMotionValue(1);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 20);
      rawY.set(e.clientY - 20);

      const target = e.target as HTMLElement;
      const pointer =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON';

      if (pointer !== isPointerRef.current) {
        isPointerRef.current = pointer;
        scaleMotion.set(pointer ? 1.5 : 1);
      }
    };

    const onLeave = () => { isHiddenRef.current = true;  opacityMotion.set(0); };
    const onEnter = () => { isHiddenRef.current = false; opacityMotion.set(1); };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [rawX, rawY, scaleMotion, opacityMotion]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-violet-500/60 pointer-events-none z-[999] hidden lg:block mix-blend-difference"
        style={{ x: springX, y: springY, scale: scaleMotion, opacity: opacityMotion }}
      />
      {/* Inner dot */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-violet-500 pointer-events-none z-[999] hidden lg:block"
        style={{ x: dotX, y: dotY, translateX: 16, translateY: 16, opacity: opacityMotion }}
      />
    </>
  );
}
