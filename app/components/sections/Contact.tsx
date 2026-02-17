'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Instagram, Mic2, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormState({ name: '', email: '', message: '' });
    alert('Nachricht gesendet!');
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-yellow-400" />
            <span className="text-sm text-yellow-400 tracking-[0.2em] uppercase">Kontakt</span>
            <div className="h-px w-12 bg-yellow-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="text-purple-100">Lass uns </span>
            <span className="gradient-text">arbeiten</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-purple-300/80 max-w-2xl mx-auto"
          >
            Buchungsanfragen, Kooperationen oder einfach nur Hallo sagen – 
            ich freue mich auf deine Nachricht!
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-purple-100 mb-6">
                House of Hoff
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-purple-100 font-medium">Adresse</p>
                    <p className="text-purple-300/80">
                      Colmantstr. 22<br />
                      53115 Bonn
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-purple-100 font-medium">E-Mail</p>
                    <a href="mailto:haha@hahacomedy.de" className="text-purple-300/80 hover:text-yellow-400 transition-colors">
                      haha@hahacomedy.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-purple-100 font-medium">Social Media</p>
                    <a 
                      href="https://instagram.com/hoffelpantoffel" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300/80 hover:text-yellow-400 transition-colors flex items-center gap-1"
                    >
                      @hoffelpantoffel
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                href="https://instagram.com/hoffelpantoffel"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 glass rounded-xl p-4 text-center hover:bg-purple-500/10 transition-colors"
              >
                <Instagram className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <span className="text-sm text-purple-300">Instagram</span>
              </motion.a>

              <motion.a
                href="#podcast"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 glass rounded-xl p-4 text-center hover:bg-purple-500/10 transition-colors"
              >
                <Mic2 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <span className="text-sm text-purple-300">Podcast</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-purple-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-purple-950/50 border border-purple-500/20 rounded-xl text-purple-100 placeholder-purple-500/50 focus:outline-none focus:border-yellow-400/50 transition-colors"
                    placeholder="Dein Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-purple-300 mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-purple-950/50 border border-purple-500/20 rounded-xl text-purple-100 placeholder-purple-500/50 focus:outline-none focus:border-yellow-400/50 transition-colors"
                    placeholder="deine@email.de"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-purple-300 mb-2">
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-purple-950/50 border border-purple-500/20 rounded-xl text-purple-100 placeholder-purple-500/50 focus:outline-none focus:border-yellow-400/50 transition-colors resize-none"
                    placeholder="Deine Nachricht..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Wird gesendet...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Nachricht senden</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
