import  { Link } from 'react-router-dom';
import { MapPin, Calendar, Briefcase, BookmarkPlus, Share2 } from 'lucide-react';
import { JobPost } from '../types';
import { motion } from 'framer-motion';

interface HorizontalJobCardProps {
  job: JobPost;
  showActions?: boolean;
  showCompanyLink?: boolean;
  compact?: boolean;
}

export default function HorizontalJobCard({ 
  job, 
  showActions = true,
  showCompanyLink = true,
  compact = false
}: HorizontalJobCardProps) {
  const formattedDate = new Date(job.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const jobTypeColors = {
    fulltime: 'bg-green-100 text-green-800',
    parttime: 'bg-blue-100 text-blue-800',
    contract: 'bg-yellow-100 text-yellow-800',
    remote: 'bg-purple-100 text-purple-800'
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
      whileHover={{ y: -3, boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`${compact ? 'p-4' : 'p-6'}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold text-gray-900 mb-1`}>
              <Link to={`/jobs/${job.id}`} className="hover:text-indigo-600 transition-colors duration-200">
                {job.title}
              </Link>
            </h3>
            {showCompanyLink ? (
              <Link to={`/company/${job.employerId}`} className="text-gray-700 hover:text-indigo-600 font-medium">
                {job.company}
              </Link>
            ) : (
              <p className="text-gray-700 font-medium">{job.company}</p>
            )}
          </div>
          <span className={`text-xs font-semibold inline-block py-1 px-2 rounded-full uppercase last:mr-0 mr-1 ${jobTypeColors[job.type]}`}>
            {job.type === 'fulltime' ? 'Full-time' : 
              job.type === 'parttime' ? 'Part-time' : 
              job.type === 'contract' ? 'Contract' : 'Remote'}
          </span>
        </div>

        <div className={`${compact ? 'mt-2' : 'mt-4'} flex items-center text-sm text-gray-500 space-x-4 flex-wrap`}>
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{job.location}</span>
          </div>
          {job.salary && (
            <div className="flex items-center">
              <Briefcase className="mr-1 h-4 w-4" />
              <span>{job.salary}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>Posted {formattedDate}</span>
          </div>
        </div>

        {!compact && (
          <p className="mt-3 text-gray-600 line-clamp-2">{job.description}</p>
        )}

        <div className={`${compact ? 'mt-2' : 'mt-4'} flex justify-between items-center`}>
          <Link 
            to={`/jobs/${job.id}`} 
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors duration-200 flex items-center"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {showActions && (
            <div className="flex space-x-2">
              <button className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                <BookmarkPlus className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
 