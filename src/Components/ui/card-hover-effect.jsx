'use client';

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion"; // Fixed typo: from "motion/react" to "framer-motion"
import { useState } from "react";

// Main HoverEffect component
export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-10", className)}>
      {items.map((item, idx) => (
        <a
          href={item?.link || '#'} // fallback for missing links
          key={item?.link || `feature-${idx}`} // ✅ Proper unique key
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-black dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>

          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

// Card container component
export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white border-2 border-black dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// Card title text
export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-black font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

// Card description text
export const CardDescription = ({ className, children }) => {
  return (
    <p className={cn("mt-8 text-black tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </p>
  );
};
