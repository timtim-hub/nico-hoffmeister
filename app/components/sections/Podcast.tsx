'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Headphones, Play, Music, Podcast as PodcastIcon, Rss, Clock, Users, Star } from 'lucide-react';

const platforms = [
  { name: 'Spotify', icon: Music, color: 'bg-green-500' },
  { name: 'Apple Podcasts', icon: PodcastIcon, color: 'bg-purple-500' },
  { name: 'RSS Feed', icon: Rss, color: 'bg-orange-500' },
];

const episodes = [
  {
    id: 1,
    title: 'Folge 47: Tabus brechen',
    duration: '1:23:45',
    description: 'Warum wir über das Sprechen müssen, worüber niemand spricht.',
    date: '12. Feb 2025',
    listeners: '12.5K',
  },
  {
    id: 2,
    title: 'Folge 46: Comedy im Wandel',
    duration: '58:32',
    description: 'Wie sich die Comedy-Szene in Deutschland verändert.',
    date: '5. Feb 2025',
    listeners: '9.8K',
  },
  {
    id: 3,
    title: 'Folge 45: Gästespecial',
    duration: '1:45:12',
    description: 'Ein wilder Ritt mit Überraschungsgästen aus der Szene.',
    date: '29. Jan 2025',
    listeners: '15.2K',
  },
];

export default function Podcast() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      id="podcast"
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-yellow-400" />
              <span className="text-sm text-yellow-400 tracking-[0.2em] uppercase">Der Podcast</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="gradient-text">"Nicole"</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-purple-200/90 mb-6"
            >
              Comedy ohne Filter. Meinungen ohne Kompromisse.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-purple-300/80 mb-8 leading-relaxed"
            >
              Im Podcast "Nicole" spreche ich über alles, was andere auslassen. 
              Von Comedy über Politik bis hin zu persönlichen Geschichten – nichts 
              ist tabu. Neue Folgen jeden Freitag.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              <div className="text-center p-4 glass rounded-xl">
                <div className="text-3xl font-black gradient-text">50+</div>
                <div className="text-xs text-purple-400">Folgen</div>
              </div>
              
              <div className="text-center p-4 glass rounded-xl">
                <div className="text-3xl font-black gradient-text">100K</div>
                <div className="text-xs text-purple-400">Downloads</div>
              </div>
              
              <div className="text-center p-4 glass rounded-xl">
                <div className="text-3xl font-black gradient-text">4.9</div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-purple-400">Bewertung</span>
                </div>
              </div>
            </motion.div>

            {/* Platforms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {platforms.map((platform) => (
                <motion.a
                  key={platform.name}
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-purple-500/10 transition-colors"
                >
                  <platform.icon className="w-5 h-5 text-purple-300" />
                  <span className="text-sm text-purple-200">{platform.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Episodes */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-purple-100">Neueste Folgen</h3>
                <a href="#" className="text-sm text-yellow-400 hover:underline">Alle ansehen →</a>
              </div>

              <div className="space-y-4">
                {episodes.map((episode, index) => (
                  <motion.div
                    key={episode.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group p-4 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-black ml-0.5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-purple-100 font-semibold mb-1 truncate">
                          {episode.title}
                        </h4>
                        <p className="text-purple-400 text-sm mb-2 line-clamp-2">
                          {episode.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-purple-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {episode.duration}
                          </span>
                          
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {episode.listeners}
                          </span>
                          
                          <span>{episode.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
