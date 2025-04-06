import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Layout } from "@/components/layout/Layout";
import { Exhibition, Event } from '@shared/schema';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export default function EventPage() {
  const { id } = useParams<{ id?: string }>();
  const exhibitionId = id ? parseInt(id) : 1; // Default to exhibition ID 1 if none provided

  const { data: exhibition } = useQuery<Exhibition>({
    queryKey: [`/api/exhibitions/${exhibitionId}`],
  });

  const { data: events = [] } = useQuery<Event[]>({
    queryKey: [`/api/events/exhibition/${exhibitionId}`],
    enabled: !!exhibition,
  });

  if (!exhibition) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 flex justify-center">
          <div className="animate-pulse space-y-8 w-full max-w-4xl">
            <div className="h-8 bg-gray-800 rounded w-1/3"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <Layout>
      <section className="py-20 px-4 bg-black relative">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${exhibition.coverImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              {exhibition.name} Exhibition
            </h1>
            
            <div className="bg-black/70 backdrop-blur-sm p-6 md:p-8 rounded-sm mb-12">
              <p className="text-gray-300 mb-8">{exhibition.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-white mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Dates</h3>
                    <p className="text-gray-400">
                      {formatDate(exhibition.startDate)} - 
                      <br className="md:hidden" /> {formatDate(exhibition.endDate)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-white mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <p className="text-gray-400">{exhibition.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-white mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Entry</h3>
                    <p className="text-gray-400">
                      Free for students with ID card<br />
                      ₹100 for others
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-8 text-center">Event Schedule</h2>
            
            <div className="space-y-6">
              {sortedEvents.length > 0 ? (
                sortedEvents.map((event, index) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-gray-900 p-6 rounded-sm border-l-4 border-white"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-medium">{event.name}</h3>
                      <div className="flex items-center mt-2 md:mt-0 text-gray-400">
                        <Calendar size={16} className="mr-2" />
                        <span className="mr-4">{formatDate(event.date)}</span>
                        <Clock size={16} className="mr-2" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-300">{event.description}</p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  No events scheduled for this exhibition yet.
                </div>
              )}
            </div>
            
            {exhibition.mapUrl && (
              <motion.div 
                className="mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-center">Location</h2>
                <div className="h-[400px] w-full rounded-sm overflow-hidden">
                  <iframe
                    src={exhibition.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Exhibition Location"
                  ></iframe>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
