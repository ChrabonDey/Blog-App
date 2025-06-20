'use client'

import React from 'react'
import Image from 'next/image'
import heroBg from '../../public/Gemini_Generated_Image_lgg6o8lgg6o8lgg6.png';
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="relative w-full max-w-[1280px] h-[75vh] md:h-[85vh] mx-auto rounded-[32px] overflow-hidden shadow-2xl">
      
      {/* Background Image */}
      <Image 
        src={heroBg}
        alt="Hero Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10 flex items-center">
        <div className="px-6 md:px-16 lg:px-24 max-w-[700px] space-y-4">
          
          {/* Category Label */}
      <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{
    scale: 1.05,
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
    transition: { duration: 0.3 },
  }}
  transition={{
    delay: 0.2,
    duration: 0.6,
    ease: 'easeOut',
  }}
  className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full backdrop-blur-md shadow-md cursor-pointer"
>
  Your Blog
</motion.div>
          {/* Headline */}
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
            Create and Read Blogs Effortlessly and Mindfully
          </h1>

          {/* Subheadline */}
          <p className="text-white text-sm md:text-lg font-light leading-relaxed">
            Integrating mindfulness practices helps developers cultivate present-moment awareness,
            fostering focus, problem-solving, and work-life balance.
          </p>
        </div>
      </div>
    </div>
  )
}
