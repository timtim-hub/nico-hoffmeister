'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Shows from './components/sections/Shows';
import Podcast from './components/sections/Podcast';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';

// Dynamically import Scene3D to avoid SSR issues with Three.js
const Scene3D = dynamic(() => import('./components/three/Scene3D'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
      
      <main className={`relative ${isLoading ? 'overflow-hidden h-screen' : ''}`}>
        <Scene3D />
        
        <div className="relative z-10">
          <Navigation />
          
          <Hero />
          <About />
          
          <Shows />
          
          <Podcast />
          
          <Contact />
          
          <Footer />
        </div>
      </main>
    </>
  );
}
