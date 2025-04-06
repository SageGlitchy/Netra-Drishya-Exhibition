import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layout } from "@/components/layout/Layout";
import { Camera, Image, Award, Users } from 'lucide-react';

export default function AboutPage() {
  const [historyRef, historyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ 
              backgroundImage: `url(https://images.unsplash.com/photo-1520853504280-249b72dc947c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80)` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About NETRA</h1>
            <p className="text-xl text-gray-300 mb-8">
              NETRA Photography Club is a community of passionate photographers dedicated to the art of visual storytelling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our History Section */}
      <section 
        className="py-16 px-4 bg-gray-950" 
        ref={historyRef}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={historyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our History</h2>
              <p className="text-gray-300 mb-4">
                Founded in 2015 by a group of photography enthusiasts from various departments, NETRA has grown to become one of the most active cultural clubs on campus.
              </p>
              <p className="text-gray-300 mb-4">
                The name "NETRA" means "eye" in Sanskrit, symbolizing our vision to see the world through different perspectives and capture meaningful moments that tell compelling stories.
              </p>
              <p className="text-gray-300">
                Over the years, we have organized numerous exhibitions, workshops, and photography trips, providing a platform for students to showcase their talent and learn from each other.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={historyInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-sm overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                alt="Photography exhibition"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section 
        className="py-16 px-4 bg-black" 
        ref={missionRef}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={missionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1 rounded-sm overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1605547560182-b491252b6b4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                alt="Photography equipment"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                NETRA aims to foster a vibrant community of photographers who inspire, learn, and create together. We believe in the power of photography to communicate, evoke emotions, and drive change.
              </p>
              <p className="text-gray-300 mb-4">
                Our mission is to provide resources, knowledge, and opportunities for aspiring photographers to develop their skills and express their unique vision through the lens.
              </p>
              <p className="text-gray-300">
                We strive to make photography accessible to all students, regardless of their background or experience level, and to promote visual literacy and appreciation of the art form.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section 
        className="py-16 px-4 bg-gray-950" 
        ref={valuesRef}
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              The principles that guide us in everything we do as a photography community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Camera className="h-8 w-8 text-white" />,
                title: "Creativity",
                description: "We encourage experimental approaches and unique perspectives in photography."
              },
              {
                icon: <Image className="h-8 w-8 text-white" />,
                title: "Quality",
                description: "We value technical excellence and thoughtful composition in photographic work."
              },
              {
                icon: <Users className="h-8 w-8 text-white" />,
                title: "Community",
                description: "We foster a supportive environment where members learn from and inspire each other."
              },
              {
                icon: <Award className="h-8 w-8 text-white" />,
                title: "Growth",
                description: "We are committed to continuous learning and improvement in our craft."
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 border border-gray-800 rounded-sm"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-gray-300 mb-8">
              NETRA welcomes students of all skill levels who are passionate about photography and visual storytelling. Become a part of our creative community today!
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
