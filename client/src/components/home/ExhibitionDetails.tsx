import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Exhibition, Event } from '@shared/schema';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export function ExhibitionDetails() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { data: exhibition } = useQuery<Exhibition>({
    queryKey: ['/api/exhibitions/current'],
  });

  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ['/api/events/exhibition/1'],
    enabled: !!exhibition,
  });

  if (!exhibition) {
    return null;
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

  return (
    <section className="py-20 bg-black relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Exhibition Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{exhibition.name} Exhibition</h2>
            <p className="text-gray-300 mb-8">{exhibition.description}</p>
            
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="mt-1 mr-4 text-white">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white">Dates</h4>
                  <p className="text-gray-400">
                    {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white">Location</h4>
                  <p className="text-gray-400">{exhibition.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 text-white">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white">Entry</h4>
                  <p className="text-gray-400">
                    Free for students with ID card<br />
                    ₹100 for others
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Events Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900 p-6 rounded-sm"
          >
            <h3 className="text-xl font-semibold mb-5">Event Schedule</h3>
            <div className="space-y-5">
              {events.map(event => (
                <div key={event.id} className="border-l-2 border-gray-700 pl-4">
                  <h4 className="font-medium text-white">{event.name}</h4>
                  <p className="text-sm text-gray-400 mb-2">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-3">{formatDate(event.date)}</span>
                    <Clock size={14} className="mr-1" />
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Google Map */}
        {exhibition.mapUrl && (
          <motion.div 
            className="mt-16 h-[400px] w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
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
          </motion.div>
        )}
      </div>
    </section>
  );
}
