'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, Star, Zap } from 'lucide-react';

const stats = [
  { value: '10+', label: 'Jahre Bühne' },
  { value: '500+', label: 'Shows' },
  { value: '50K+', label: 'Follower' },
  { value: '100%', label: 'Authentisch' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-yellow-400" />
                <span className="text-sm text-yellow-400 tracking-[0.2em] uppercase">Über mich</span>
              </div>

              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-black mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span className="text-purple-100">Der </span>
                <span className="gradient-text">Comedy-Mastermind</span>
                <span className="text-purple-100"> aus Köln</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-purple-200/80 text-lg leading-relaxed"
            >
              <p>
                Nico Hoffmeister ist ein Stand-up-Comedian aus Köln, der mit seinem 
                <span className="text-yellow-400 font-medium">direkten, kompromisslosen Humor</span>{' '}
                die Bühnen Deutschlands rockt. Als Mastermind hinter{' '}
                <span className="text-purple-400 font-medium">HAHA Comedy</span> hat er sich einen 
                Namen als einer der authentischsten Stimmen der deutschen Comedy-Szene gemacht.
              </p>
              
              <p>
                Sein Podcast <span className="text-yellow-400 font-medium">"Nicole"</span> ist eine 
                Institution für alle, die Comedy lieben, die keine Tabus kennt und genau das 
                sagt, was alle denken – aber niemand aussprechen würde.
              </p>

              <div className="glass rounded-2xl p-6 my-8 relative">
                <Quote className="absolute -top-4 -left-2 w-8 h-8 text-yellow-400/50" />
                <p className="text-purple-100 italic text-xl">
                  "Komödie ist keine Kunst für Feiglinge. Wenn du die Wahrheit sagen willst, 
                  musst du bereit sein, dafür zu brennen."
                </p>
                <p className="text-yellow-400 mt-4 text-sm">— Nico Hoffmeister</p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center p-4 rounded-xl glass"
                >
                  <div className="text-3xl md:text-4xl font-black gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-purple-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image/Visual */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/20 to-yellow-500/20 rounded-3xl blur-xl" />
              
              <div className="relative glass rounded-3xl p-2">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900 to-purple-950 flex items-center justify-center">
                  <div className="text-center p-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-32 h-32 mx-auto mb-6 rounded-full border-2 border-yellow-400/30 flex items-center justify-center"
                    >
                      <Zap className="w-16 h-16 text-yellow-400" />
                    </motion.div>
                    
                    <p className="text-2xl font-bold text-purple-200 mb-2">NICO HOFFMEISTER</p>
                    <p className="text-purple-400 text-sm">Comedian · Entertainer · Podcast-Host</p>
                    
                    <div className="flex items-center justify-center gap-1 mt-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 glass rounded-full px-4 py-2 flex items-center gap-2"
              >
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-purple-200">HAHA Comedy</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 glass rounded-full px-4 py-2 flex items-center gap-2"
              >
                <Mic className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-200">Satire Slam</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mic({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}
