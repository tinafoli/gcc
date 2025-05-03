import { motion } from 'framer-motion';

declare module 'framer-motion' {
  import { ComponentType, ReactNode } from 'react';

  export interface MotionProps {
    variants?: any;
    initial?: any;
    animate?: any;
    exit?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    transition?: any;
    className?: string;
    children?: ReactNode;
  }

  export const motion: {
    div: ComponentType<MotionProps>;
    [key: string]: ComponentType<MotionProps>;
  };

  export const AnimatePresence: ComponentType<{
    children?: ReactNode;
  }>;
} 