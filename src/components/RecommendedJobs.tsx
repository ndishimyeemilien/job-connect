import  { JobPost } from '../types';
import HorizontalJobCard from './HorizontalJobCard';
import { motion } from 'framer-motion';

interface RecommendedJobsProps {
  jobs: JobPost[];
  title?: string;
  subtitle?: string;
  limit?: number;
}

export default function RecommendedJobs({
  jobs,
  title = "Recommended Jobs",
  subtitle = "Based on your profile and search history",
  limit = 3
}: RecommendedJobsProps) {
  // Take a slice of jobs up to the limit
  const limitedJobs = jobs.slice(0, limit);
  
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {limitedJobs.map((job, index) => (
          <motion.div 
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4"
          >
            <HorizontalJobCard 
              job={job} 
              showActions={false} 
              compact={true} 
            />
          </motion.div>
        ))}
      </div>
      
      {limitedJobs.length === 0 && (
        <div className="p-6 text-center">
          <p className="text-gray-500 text-sm">No recommended jobs available at this moment.</p>
        </div>
      )}
    </div>
  );
}
 