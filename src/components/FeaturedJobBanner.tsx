import  { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

interface FeaturedJobBannerProps {
  imageUrl: string; 
  title: string;
  company: string;
  location: string;
  jobType?: string;
  jobId: string;
  children?: ReactNode;
}

export default function FeaturedJobBanner({ 
  imageUrl, 
  title, 
  company, 
  location,
  jobType = 'Full-time',
  jobId,
  children 
}: FeaturedJobBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-xl h-96 mb-8">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-700/60 z-10" />
      <img 
        src={imageUrl} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end p-6 sm:p-8">
        <div className="mb-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            Featured Job
          </span>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        
        <p className="text-xl text-indigo-100 mb-4">{company}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-indigo-200 mb-6">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-1" />
            <span>{jobType}</span>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <Link 
            to={`/jobs/${jobId}`}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Details
          </Link>
          <Link 
            to={`/jobs/${jobId}`}
            className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Quick Apply
          </Link>
        </div>
        
        {children}
      </div>
    </div>
  );
}
 