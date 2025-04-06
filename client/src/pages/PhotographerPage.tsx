import { useState } from 'react';
import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Layout } from "@/components/layout/Layout";
import { Lightbox, Thumbnail } from '@/components/ui/lightbox';
import { Photographer, Photo } from '@shared/schema';
import { Instagram, Mail } from 'lucide-react';

export default function PhotographerPage() {
  const { id } = useParams<{ id: string }>();
  const photographerId = parseInt(id);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data: photographer, isLoading: loadingPhotographer } = useQuery<Photographer>({
    queryKey: [`/api/photographers/${photographerId}`],
    enabled: !isNaN(photographerId),
  });

  const { data: photos = [], isLoading: loadingPhotos } = useQuery<Photo[]>({
    queryKey: [`/api/photos/photographer/${photographerId}`],
    enabled: !isNaN(photographerId),
  });

  const isLoading = loadingPhotographer || loadingPhotos || isNaN(photographerId);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 flex justify-center">
          <div className="animate-pulse space-y-8 w-full max-w-4xl">
            <div className="flex items-center space-x-6">
              <div className="rounded-full bg-gray-800 h-24 w-24"></div>
              <div className="space-y-3 flex-1">
                <div className="h-6 bg-gray-800 rounded w-1/3"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3"></div>
              </div>
            </div>
            <div className="h-32 bg-gray-800 rounded"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!photographer) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Photographer Not Found</h1>
          <p className="text-gray-400">The photographer you're looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }

  const lightboxImages = photos.map(photo => ({
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
    <Layout>
      <div className="container mx-auto py-16 px-4">
        {/* Photographer Profile */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden"
            >
              <img 
                src={photographer.profileImage} 
                alt={photographer.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 text-center md:text-left"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{photographer.name}</h1>
              
              <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                {photographer.instagram && (
                  <a 
                    href={`https://instagram.com/${photographer.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Instagram size={16} />
                    <span>{photographer.instagram}</span>
                  </a>
                )}
                {photographer.email && (
                  <a 
                    href={`mailto:${photographer.email}`}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Mail size={16} />
                    <span className="sr-only md:not-sr-only">Contact</span>
                  </a>
                )}
              </div>
              
              <p className="text-gray-300">{photographer.bio}</p>
            </motion.div>
          </div>
        </div>
        
        {/* Photographer's Portfolio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Portfolio</h2>
          
          {photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {photos.map((photo, index) => (
                <motion.div 
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Thumbnail
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    onClick={() => openLightbox(index)}
                    className="aspect-square rounded-sm overflow-hidden"
                  >
                    <h3 className="font-medium">{photo.title}</h3>
                  </Thumbnail>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              No photos available in this portfolio yet.
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
    </Layout>
  );
}
