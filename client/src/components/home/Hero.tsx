import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'wouter';
import { Exhibition } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: exhibition } = useQuery<Exhibition>({
    queryKey: ['/api/exhibitions/current'],
  });

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Sample background images (would be from the exhibition photos in a real implementation)
  const bgImages = [
    "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1536048810607-3dc7f86981cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bgImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [bgImages.length]);

  const dates = exhibition ? new Date(exhibition.startDate).toLocaleDateString() + ' - ' + new Date(exhibition.endDate).toLocaleDateString() : 'Time: 11 AM';

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImages[currentSlide]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-5xl"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white">
            <span className="block">DRISHYA</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-3 font-light uppercase tracking-widest">A Photography Exhibition</span>
          </h1>
          
          <div className="mt-8 mb-10 text-white max-w-2xl mx-auto">
            <p className="text-xl sm:text-2xl font-medium">
              {exhibition?.description || "Experience visual narratives through the lens of talented photographers at Utkansh."}
            </p>
            <p className="mt-6 text-white font-medium flex items-center justify-center gap-3 text-lg">
              {dates} | <Badge variant="secondary" className="animate-pulse bg-white/30 text-white hover:bg-white/40 text-lg py-1.5">🏛️ Venue: IT-Building </Badge>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 w-full max-w-md mx-auto">
            <Link href="/gallery" className="w-full sm:w-1/2">
              <a className="w-full px-8 py-3 bg-white text-black font-medium text-lg hover:bg-opacity-90 transition-colors inline-block text-center">
                Explore Gallery
              </a>
            </Link>
            <a href="https://www.utkansh.com/event/39" target="_blank" rel="noopener noreferrer" className="w-full sm:w-1/2 px-8 py-3 border border-white text-white font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors text-center inline-block">
              Register to Visit
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={scrollToContent}
      >
        <ChevronDown size={32} className="text-white" />
      </motion.div>
    </div>
  );
}
