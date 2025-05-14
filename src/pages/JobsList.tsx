import  { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import JobCard from '../components/JobCard';
import JobSearchBar from '../components/JobSearchBar';
import { useJobs } from '../context/JobContext';

export default function JobsList() {
  const { jobs, loading, searchJobs, filterJobs } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    jobType: [] as string[],
    experienceLevel: [] as string[],
    remote: false,
    salary: null as [number, number] | null,
    datePosted: null as string | null
  });
  
  const initialSearchTerm = searchParams.get('q') || '';
  const initialLocation = searchParams.get('location') || '';
  
  useEffect(() => {
    document.title = 'Find Jobs - JobConnect';
    
    // Apply initial search params
    if (initialSearchTerm || initialLocation) {
      const results = searchJobs(initialSearchTerm, initialLocation);
      setFilteredJobs(results);
    } else {
      setFilteredJobs(jobs);
    }
  }, [jobs, initialSearchTerm, initialLocation, searchJobs]);
  
  const handleSearch = (searchTerm: string, location: string) => {
    const params: { q?: string; location?: string } = {};
    if (searchTerm) params.q = searchTerm;
    if (location) params.location = location;
    
    setSearchParams(params);
    
    const results = searchJobs(searchTerm, location);
    const filtered = filterJobs({ ...filters });
    
    setFilteredJobs(
      results.filter(job => filtered.some(filteredJob => filteredJob.id === job.id))
    );
  };
  
  const handleFilterChange = (name: string, value: any) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    
    // Apply both search and filters
    const searchResults = searchJobs(initialSearchTerm, initialLocation);
    const filterResults = filterJobs(newFilters);
    
    setFilteredJobs(
      searchResults.filter(job => filterResults.some(filteredJob => filteredJob.id === job.id))
    );
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Perfect Job</h1>
          <JobSearchBar 
            initialSearchTerm={initialSearchTerm}
            initialLocation={initialLocation}
            onSearch={handleSearch}
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar */}
          <div className={`lg:block lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-5 rounded-lg shadow-sm sticky top-20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button 
                  onClick={() => setFilters({
                    jobType: [],
                    experienceLevel: [],
                    remote: false,
                    salary: null,
                    datePosted: null
                  })}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Clear all
                </button>
              </div>
              
              {/* Job Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Job Type</h3>
                <div className="space-y-2">
                  {['full-time', 'part-time', 'contract', 'internship', 'freelance'].map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        id={`job-type-${type}`}
                        name="job-type"
                        type="checkbox"
                        checked={filters.jobType.includes(type)}
                        onChange={(e) => {
                          const newJobTypes = e.target.checked
                            ? [...filters.jobType, type]
                            : filters.jobType.filter(t => t !== type);
                          handleFilterChange('jobType', newJobTypes);
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`job-type-${type}`} className="ml-2 block text-sm text-gray-700 capitalize">
                        {type.replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Experience Level Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Experience Level</h3>
                <div className="space-y-2">
                  {[
                    { value: 'entry', label: 'Entry Level' },
                    { value: 'mid', label: 'Mid Level' },
                    { value: 'senior', label: 'Senior Level' },
                    { value: 'executive', label: 'Executive' }
                  ].map((level) => (
                    <div key={level.value} className="flex items-center">
                      <input
                        id={`exp-level-${level.value}`}
                        name="exp-level"
                        type="checkbox"
                        checked={filters.experienceLevel.includes(level.value)}
                        onChange={(e) => {
                          const newLevels = e.target.checked
                            ? [...filters.experienceLevel, level.value]
                            : filters.experienceLevel.filter(l => l !== level.value);
                          handleFilterChange('experienceLevel', newLevels);
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`exp-level-${level.value}`} className="ml-2 block text-sm text-gray-700">
                        {level.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Remote Filter */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="remote"
                    name="remote"
                    type="checkbox"
                    checked={filters.remote}
                    onChange={(e) => handleFilterChange('remote', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remote" className="ml-2 block text-sm text-gray-700">
                    Remote Jobs Only
                  </label>
                </div>
              </div>
              
              {/* Date Posted Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Date Posted</h3>
                <div className="space-y-2">
                  {[
                    { value: 'today', label: 'Today' },
                    { value: 'week', label: 'Past Week' },
                    { value: 'month', label: 'Past Month' },
                    { value: 'any', label: 'Any Time' }
                  ].map((date) => (
                    <div key={date.value} className="flex items-center">
                      <input
                        id={`date-${date.value}`}
                        name="date-posted"
                        type="radio"
                        checked={filters.datePosted === date.value || (date.value === 'any' && !filters.datePosted)}
                        onChange={() => handleFilterChange('datePosted', date.value === 'any' ? null : date.value)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor={`date-${date.value}`} className="ml-2 block text-sm text-gray-700">
                        {date.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Job listings */}
          <div className="lg:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
              </h2>
              
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Jobs Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      jobType: [],
                      experienceLevel: [],
                      remote: false,
                      salary: null,
                      datePosted: null
                    });
                    setSearchParams({});
                    setFilteredJobs(jobs);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 