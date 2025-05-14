import  { Link } from 'react-router-dom';
import { CalendarClock, MapPin, Briefcase, Clock } from 'lucide-react';
import { JobPost } from '../types';
import JobSkillBadge from './JobSkillBadge';

interface JobCardProps {
  job: JobPost;
}

export default function JobCard({ job }: JobCardProps) {
  // Format date to show how many days ago
  const formatDate = (dateString: string) => {
    const postedDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.company} className="h-full w-full object-cover" />
              ) : (
                <Briefcase className="h-5 w-5 text-gray-500" />
              )}
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600">
                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
              </h3>
              <p className="text-sm text-gray-600">{job.company}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-600">{formatDate(job.postedDate)}</span>
            {job.applicationCount !== undefined && (
              <span className="text-xs text-gray-500 mt-1">{job.applicationCount} applicants</span>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1" />
            <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
          </div>
          {job.salary && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{job.salary}</span>
            </div>
          )}
          {job.applicationDeadline && (
            <div className="flex items-center">
              <CalendarClock className="h-4 w-4 mr-1" />
              <span>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-2">
          {job.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {job.skills.slice(0, 5).map((skill, index) => (
            <JobSkillBadge key={index} skill={skill} />
          ))}
          {job.skills.length > 5 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{job.skills.length - 5} more
            </span>
          )}
        </div>
      </div>
      
      <div className="flex border-t border-gray-200">
        <Link 
          to={`/jobs/${job.id}`}
          className="flex-1 text-center py-3 text-indigo-600 font-medium text-sm hover:bg-indigo-50 transition-colors"
        >
          View Details
        </Link>
        <button 
          className="flex-1 text-center py-3 text-indigo-600 font-medium text-sm hover:bg-indigo-50 transition-colors border-l border-gray-200"
        >
          Quick Apply
        </button>
      </div>
    </div>
  );
}
 