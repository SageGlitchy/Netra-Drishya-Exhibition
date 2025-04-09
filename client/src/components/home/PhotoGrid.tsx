import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Photo, Category } from '@shared/schema';
import { Lightbox, Thumbnail } from '../ui/lightbox';

export function PhotoGrid() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: photos = [] } = useQuery<Photo[]>({
    queryKey: ['/api/photos'],
  });

  const filteredPhotos = selectedCategoryId 
    ? photos.filter(photo => photo.categoryId === selectedCategoryId)
    : photos;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    description: photo.description || '',
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-16 bg-gray-950" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Collections</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Immerse yourself in diverse perspectives and visual stories captured by NETRA's photographers.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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
        </div>

        {/* Photo Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo, index) => (
              <motion.div key={photo.id} variants={item} className="aspect-[4/3]">
                <Thumbnail 
                  src={photo.thumbnailUrl} 
                  alt={photo.title}
                  onClick={() => openLightbox(index)}
                  className="h-full rounded-sm overflow-hidden"
                >
                  <h3 className="font-medium text-sm">{photo.title}</h3>
                </Thumbnail>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">
              No photos found in this category.
            </div>
          )}
        </motion.div>
      </div>

      <Lightbox 
        images={lightboxImages} 
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
