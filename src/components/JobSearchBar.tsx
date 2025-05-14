import  { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

interface JobSearchBarProps {
  className?: string;
  initialSearchTerm?: string;
  initialLocation?: string;
  compact?: boolean;
  onSearch?: (searchTerm: string, location: string) => void;
}

export default function JobSearchBar({
  className = '',
  initialSearchTerm = '',
  initialLocation = '',
  compact = false,
  onSearch
}: JobSearchBarProps) {
  const [search, setSearch] = useState(initialSearchTerm);
  const [location, setLocation] = useState(initialLocation);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(search, location);
    } else {
      // Navigate to jobs page with search params
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('q', search);
      if (location) queryParams.append('location', location);
      
      navigate(`/jobs?${queryParams.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={`flex flex-col md:flex-row ${compact ? 'gap-2' : 'gap-4'}`}>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              compact ? 'text-sm' : 'text-base'
            }`}
            placeholder="Job title, company, or keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              compact ? 'text-sm' : 'text-base'
            }`}
            placeholder="City, state, or remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`${
            compact ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'
          } bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm`}
        >
          Search Jobs
        </button>
      </div>
    </form>
  );
}
 