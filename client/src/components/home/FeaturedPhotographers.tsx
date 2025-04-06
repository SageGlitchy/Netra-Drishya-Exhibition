import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'wouter';
import { Photographer } from '@shared/schema';
import { Instagram, Mail } from 'lucide-react';

export function FeaturedPhotographers() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { data: photographers = [] } = useQuery<Photographer[]>({
    queryKey: ['/api/photographers/featured'],
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-gray-950" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Photographers</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Get to know the talented artists behind the lens who capture moments and tell stories through their unique perspectives.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {photographers.map(photographer => (
            <motion.div 
              key={photographer.id} 
              variants={item}
              className="bg-black border border-gray-800 overflow-hidden group"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={photographer.profileImage} 
                  alt={photographer.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">{photographer.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{photographer.bio}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    {photographer.instagram && (
                      <a 
                        href={`https://instagram.com/${photographer.instagram}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                    {photographer.email && (
                      <a 
                        href={`mailto:${photographer.email}`}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Mail size={18} />
                      </a>
                    )}
                  </div>
                  
                  <Link href={`/photographers/${photographer.id}`}>
                    <a className="text-sm text-white/70 hover:text-white transition-colors">
                      View portfolio →
                    </a>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <Link href="/photographers">
            <a className="inline-block px-8 py-3 border border-white text-white font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
              Meet All Photographers
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
