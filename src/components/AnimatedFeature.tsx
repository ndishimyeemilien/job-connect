import  { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedFeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function AnimatedFeature({ 
  icon, 
  title, 
  description,
  delay = 0 
}: AnimatedFeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
 