import  { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AnimatedNumberCounter from './AnimatedNumberCounter';

interface StatisticCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  description?: string;
  color: 'indigo' | 'emerald' | 'amber' | 'rose';
}

export default function StatisticCard({ 
  icon, 
  title, 
  value, 
  description,
  color 
}: StatisticCardProps) {
  
  const colorClasses = {
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-100 text-amber-600',
    rose: 'bg-rose-100 text-rose-600'
  };
  
  return (
    <motion.div 
      className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300 border border-gray-100"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <motion.div 
            className={`flex-shrink-0 rounded-md p-3 ${colorClasses[color]}`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-3xl font-semibold text-gray-900">
                {typeof value === 'number' ? 
                  <AnimatedNumberCounter value={value} /> : 
                  value
                }
              </dd>
              {description && (
                <dd className="mt-1 text-sm text-gray-500">{description}</dd>
              )}
            </dl>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
 