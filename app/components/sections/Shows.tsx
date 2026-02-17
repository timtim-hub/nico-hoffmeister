'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Ticket, ExternalLink, Star } from 'lucide-react';

const shows = [
  {
    id: 1,
    title: 'Satire Slam',
    venue: 'HAHA Comedy Club',
    location: 'Köln',
    date: 'Jeden Freitag',
    time: '20:00 Uhr',
    description: 'Die heißeste Comedy-Show im Rheinland. Direkt, ehrlich, unvergesslich.',
    price: 'Ab 15€',
    featured: true,
    color: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    id: 2,
    title: 'Stand-Up Spezial',
    venue: 'Comedy Lounge',
    location: 'Düsseldorf',
    date: '15. März 2025',
    time: '19:30 Uhr',
    description: 'Ein Abend voller Lacher mit Nico Hoffmeister und Gästen.',
    price: 'Ab 20€',
    featured: false,
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 3,
    title: 'Comedy Night',
    venue: 'Theaterhaus',
    location: 'Bonn',
    date: '22. März 2025',
    time: '20:00 Uhr',
    description: 'Die beste Comedy-Auswahl der Region.',
    price: 'Ab 18€',
    featured: false,
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: 4,
    title: 'Open Mic',
    venue: 'HAHA Comedy',
    location: 'Köln',
    date: 'Jeden Mittwoch',
    time: '19:00 Uhr',
    description: 'Neue Talente und erprobte Profis auf einer Bühne.',
    price: 'Freier Eintritt',
    featured: false,
    color: 'from-green-500/20 to-teal-500/20',
  },
];

function ShowCard({ show, index }: { show: typeof shows[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
      }}
      className="relative group"
    >
      <div className={`absolute -inset-1 bg-gradient-to-r ${show.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className={`relative glass rounded-2xl p-6 h-full transition-all duration-300 ${
        show.featured ? 'border-yellow-400/30' : 'border-purple-500/20'
      } hover:border-yellow-400/50`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            show.featured 
              ? 'bg-yellow-400/20 text-yellow-400' 
              : 'bg-purple-500/20 text-purple-300'
          }`}>
            {show.featured ? (
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" /> Highlight
              </span>
            ) : (
              'Live-Show'
            )}
          </div>
          
          <span className="text-lg font-bold gradient-text">{show.price}</span>
        </div>

        <h3 className="text-2xl font-bold text-purple-100 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          {show.title}
        </h3>

        <p className="text-purple-300/80 text-sm mb-4">{show.description}</p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-purple-300">
            <MapPin className="w-4 h-4 text-yellow-400" />
            <span>{show.venue}, {show.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-purple-300">
            <Calendar className="w-4 h-4 text-yellow-400" />
            <span>{show.date} · {show.time}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 group/btn"
        >
          <Ticket className="w-4 h-4" />
          <span>Tickets</span>
          <ExternalLink className="w-4 h-4 opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Shows() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      id="shows"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-yellow-400" />
            <span className="text-sm text-yellow-400 tracking-[0.2em] uppercase">Shows & Events</span>
            <div className="h-px w-12 bg-yellow-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="text-purple-100">Kommende </span>
            <span className="gradient-text">Auftritte</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-purple-300/80 max-w-2xl mx-auto"
          >
            Erlebe Nico Hoffmeister live auf der Bühne. Direkt, authentisch, unvergesslich.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shows.map((show, index) => (
            <ShowCard key={show.id} show={show} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-purple-400 text-sm">
            Weitere Shows folgen in Kürze.{' '}
            <a href="#contact" className="text-yellow-400 hover:underline">
              Newsletter abonnieren
            </a>{' '}
            für Updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
