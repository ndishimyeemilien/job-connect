import  { motion } from 'framer-motion';
import { Users, Globe, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';

export default function AboutUs() {
  const teamImages = [
    {
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw5fHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBidXNpbmVzcyUyMHRlYW0lMjB3b3JraW5nJTIwdG9nZXRoZXJ8ZW58MHx8fHwxNzQ2NzMwMzY1fDA&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800",
      alt: "Team working together on laptops"
    },
    {
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxMHx8cHJvZmVzc2lvbmFsJTIwb2ZmaWNlJTIwYnVzaW5lc3MlMjB0ZWFtJTIwd29ya2luZyUyMHRvZ2V0aGVyfGVufDB8fHx8MTc0NjczMDM2NXww&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800",
      alt: "Business team in discussion"
    },
    {
      url: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBidXNpbmVzcyUyMHRlYW0lMjB3b3JraW5nJTIwdG9nZXRoZXJ8ZW58MHx8fHwxNzQ2NzMwMzY1fDA&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800",
      alt: "Two business women in discussion"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-700">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw3fHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBidXNpbmVzcyUyMHRlYW0lMjB3b3JraW5nJTIwdG9nZXRoZXJ8ZW58MHx8fHwxNzQ2NzMwMzY1fDA&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800"
            alt="Team collaborating together"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-indigo-900 mix-blend-multiply" />
        </div>
        
        <div className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About JobConnect
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
              We're on a mission to connect talented professionals with great companies. 
              Learn more about our journey, our team, and our vision for the future of work.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <motion.h2 
                className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Our Story
              </motion.h2>
              <motion.div 
                className="mt-3 text-lg text-gray-500 space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p>
                  JobConnect was founded in 2021 with a simple idea: make the job search process more efficient and human-centered.
                </p>
                <p>
                  Having experienced the challenges of finding the right talent and the right job firsthand, our founders set out to build a platform that prioritizes meaningful connections over quantity.
                </p>
                <p>
                  Today, we're proud to have connected thousands of professionals with their dream jobs and helped companies build exceptional teams that drive innovation and growth.
                </p>
              </motion.div>
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link to="/jobs" className="text-indigo-600 font-medium hover:text-indigo-500">
                  Explore job opportunities <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="mt-12 lg:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw2fHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBidXNpbmVzcyUyMHRlYW0lMjB3b3JraW5nJTIwdG9nZXRoZXJ8ZW58MHx8fHwxNzQ2NzMwMzY1fDA&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800" 
                  alt="Business professional signing document" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2 
              className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Values
            </motion.h2>
            <motion.p 
              className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              The principles that guide our mission and vision
            </motion.p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Community First</h3>
              <p className="text-gray-500">
                We prioritize the needs of our community of job seekers and employers, creating an ecosystem where everyone can thrive.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quality Connections</h3>
              <p className="text-gray-500">
                We focus on creating meaningful matches rather than overwhelming quantities of applications.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Global Opportunity</h3>
              <p className="text-gray-500">
                We believe talent knows no borders, and we're committed to connecting people with opportunities worldwide.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-500">
                We strive for excellence in everything we do, from the user experience on our platform to the support we provide.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Team</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Meet the passionate individuals behind JobConnect
            </p>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <ImageCarousel images={teamImages} />
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Our team brings together expertise in recruitment, technology, and user experience to create a platform that truly serves the needs of job seekers and employers alike.
            </p>
            
            <div className="mt-8">
              <Link 
                to="/jobs" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Explore Opportunities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 