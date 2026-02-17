'use client';

import { motion } from 'framer-motion';
import { Instagram, Mic2, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-6 border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <motion.a
              href="#hero"
              className="inline-block text-3xl font-black tracking-tighter gradient-text mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
              whileHover={{ scale: 1.05 }}
            >
              NICO HOFFMEISTER
            </motion.a>
            
            <p className="text-purple-400/80 text-sm">
              Comedy aus Köln. Direkt, authentisch, unvergesslich.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-purple-100 font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '#hero' },
                { name: 'Über mich', href: '#about' },
                { name: 'Shows', href: '#shows' },
                { name: 'Podcast', href: '#podcast' },
                { name: 'Kontakt', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-purple-400/80 hover:text-yellow-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-purple-100 font-semibold mb-4">Kontakt</h4>
            <div className="space-y-2 text-sm text-purple-400/80">
              <p>House of Hoff</p>
              <p>Colmantstr. 22</p>
              <p>53115 Bonn</p>
              <p className="mt-4">
                <a href="mailto:haha@hahacomedy.de" className="hover:text-yellow-400 transition-colors">
                  haha@hahacomedy.de
                </a>
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/hoffelpantoffel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-purple-400 hover:text-yellow-400 hover:bg-purple-500/10 transition-colors"
              >
                <Instagram size={18} />
              </a>
              
              <a
                href="#podcast"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-purple-400 hover:text-yellow-400 hover:bg-purple-500/10 transition-colors"
              >
                <Mic2 size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-500/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-purple-500/60 text-sm">
            © {currentYear} Nico Hoffmeister. Alle Rechte vorbehalten.
          </p>

          <p className="text-purple-500/60 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Cologne
          </p>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-purple-500/60 hover:text-purple-400 transition-colors">
              Impressum
            </a>
            <a href="#" className="text-purple-500/60 hover:text-purple-400 transition-colors">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
