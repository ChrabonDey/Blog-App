'use client'

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import illustration from '../../public/Gemini_Generated_Image_lgg6o8lgg6o8lgg6.png' // your illustration image
import { HoverEffect } from './ui/card-hover-effect' // make sure this component is properly set up

const features = [
  {
    title: 'Instant Publishing',
    description: 'Write and publish blogs instantly with rich formatting and embedded media.',
  },
  {
    title: 'AI Writing Assistant',
    description: 'Boost creativity and productivity with AI-powered writing suggestions.',
  },
  {
    title: 'SEO Optimization',
    description: 'Improve your blog’s visibility with built-in SEO tips and tools.',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track engagement and reach with a clear and simple stats dashboard.',
  },
]

export default function Features() {
  return (
    <>
    <div className="max-w-7xl text-left px-12 mx-auto ">
      <h1 className='font-bold text-3xl'>BlogPosts Features</h1>
    </div>
    
    <section className="max-w-7xl mx-auto px-4 md:px-10  grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
     
      {/* Left - Hover Cards */}
      <div className="max-w-2xl w-full">
        <HoverEffect items={features} />
      </div>

      {/* Right - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex justify-center"
      >
      <div className='rounded-full overflow-hidden shadow-2xl'>
          <Image
          src={illustration}
          alt="Blog platform illustration"
          width={500}
          height={500}
          className="w-full max-w-md rounded-full "
        />
      </div>
      </motion.div>
    </section>
    </>
  )
}
