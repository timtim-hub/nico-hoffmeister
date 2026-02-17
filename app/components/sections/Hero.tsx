'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Mic2, Sparkles } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-sm md:text-base text-purple-300 tracking-[0.3em] uppercase">
            Comedy aus Köln
          </span>
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span className="gradient-text">NICO</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span className="text-purple-400">HOFFMEISTER</span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto mb-6 font-light"
        >
          Direkter, kompromissloser Humor
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-sm text-purple-400 tracking-wider mb-12"
        >
          HAHA Comedy Mastermind · Podcast-Host
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#shows"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-full overflow-hidden"
          >
            <span className="relative z-10">Shows ansehen</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          <motion.a
            href="#about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-purple-500/50 text-purple-200 font-medium rounded-full hover:border-yellow-400 hover:text-yellow-400 transition-colors"
          >
            Mehr erfahren
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex items-center justify-center gap-6 mt-12"
        >
          <motion.a
            href="https://instagram.com/hoffelpantoffel"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -2 }}
            className="text-purple-400 hover:text-yellow-400 transition-colors"
          >
            <Instagram size={24} />
          </motion.a>
          
          <motion.a
            href="#podcast"
            whileHover={{ scale: 1.2, y: -2 }}
            className="text-purple-400 hover:text-yellow-400 transition-colors"
          >
            <Mic2 size={24} />
          </motion.a>
        </motion.div>

        {/* Instagram Handle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="mt-4 text-sm text-purple-500"
        >
          @hoffelpantoffel
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0], y: [0, 12] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-yellow-400 rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0612] to-transparent pointer-events-none" />
    </section>
  );
}
