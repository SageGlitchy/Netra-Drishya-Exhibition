import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from "@/components/layout/Layout";
import { Lightbox, Thumbnail } from '@/components/ui/lightbox';
import { Photo, Category, Photographer } from '@shared/schema';
import logo from '@/assets/logo.svg';

export default function GalleryPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [photographersMap, setPhotographersMap] = useState<Record<number, Photographer>>({});

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: photos = [] } = useQuery<Photo[]>({
    queryKey: ['/api/photos'],
  });

  const { data: photographers = [] } = useQuery<Photographer[]>({
    queryKey: ['/api/photographers'],
  });

  useEffect(() => {
    if (photographers.length > 0) {
      const map = photographers.reduce((acc, photographer) => {
        acc[photographer.id] = photographer;
        return acc;
      }, {} as Record<number, Photographer>);
      
      setPhotographersMap(map);
    }
  }, [photographers]);

  const filteredPhotos = selectedCategoryId 
    ? photos.filter(photo => photo.categoryId === selectedCategoryId)
    : photos;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const lightboxImages = filteredPhotos.map(photo => ({
    src: photo.imageUrl,
    alt: photo.title,
    title: photo.title,
    description: `${photo.description || ''} ${photographersMap[photo.photographerId]?.name ? `- By ${photographersMap[photo.photographerId]?.name}` : ''}`,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Photo Gallery
            </motion.h1>
            <motion.p 
              className="text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Browse through our curated collection of photographs showcasing different styles, subjects, and perspectives.
            </motion.p>

            {/* Category Filters */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                onClick={() => setSelectedCategoryId(null)}
                className={`px-4 py-2 text-sm font-medium transition-colors
                  ${!selectedCategoryId 
                    ? 'bg-white text-black' 
                    : 'bg-transparent text-white border border-white/30 hover:border-white/60'}`}
              >
                All
              </button>
              {categories
                .filter(category => !['City Life', 'Urban Moments'].includes(category.name))
                .map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`px-4 py-2 text-sm font-medium transition-colors
                      ${selectedCategoryId === category.id 
                        ? 'bg-white text-black' 
                        : 'bg-transparent text-white border border-white/30 hover:border-white/60'}`}
                  >
                    {category.name}
                  </button>
                ))}
            </motion.div>
          </div>

          {/* Photo Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategoryId?.toString() || 'all'}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {filteredPhotos.length > 0 ? (
                filteredPhotos.map((photo, index) => (
                  <motion.div 
                    key={photo.id} 
                    variants={item} 
                    className="group"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Thumbnail 
                      src={photo.imageUrl}
                      alt={photo.title}
                      onClick={() => openLightbox(index)}
                      className="aspect-square md:aspect-[4/3] rounded-sm overflow-hidden"
                    >
                      <div>
                        <h3 className="font-medium text-sm">{photo.title}</h3>
                        {photographersMap[photo.photographerId] && (
                          <p className="text-xs text-white/70">
                            By {photographersMap[photo.photographerId].name}
                          </p>
                        )}
                      </div>
                    </Thumbnail>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="col-span-full text-center py-12 text-gray-400"
                  variants={item}
                >
                  No photos found in this category.
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Lightbox 
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </Layout>
  );
}
