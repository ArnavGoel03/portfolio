"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FocusParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export default function FocusParagraph({
  children,
  className,
}: FocusParagraphProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.38, 1]);

  return (
    <motion.div ref={ref} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
}
