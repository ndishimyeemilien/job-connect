import  { useState, useEffect } from 'react';
import { Search, Clock, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface JobFiltersProps {
  onFilterChange: (filters: {
    search: string;
    location: string;
    jobType: string[];
    experienceLevel: string[];
    remote: boolean;
    salary: [number, number] | null;
    datePosted: string | null;
  }) => void;
  initialFilters?: {
    search?: string;
    location?: string;
    jobType?: string[];
    experienceLevel?: string[];
    remote?: boolean;
    salary?: [number, number] | null;
    datePosted?: string | null;
  };
  className?: string;
  compact?: boolean;
}

export default function JobFilters({
  onFilterChange,
  initialFilters = {},
  className = '',
  compact = false
}: JobFiltersProps) {
  const [search, setSearch] = useState(initialFilters.search || '');
  const [location, setLocation] = useState(initialFilters.location || '');
  const [jobType, setJobType] = useState<string[]>(initialFilters.jobType || []);
  const [experienceLevel, setExperienceLevel] = useState<string[]>(initialFilters.experienceLevel || []);
  const [remote, setRemote] = useState(initialFilters.remote || false);
  const [salary, setSalary] = useState<[number, number] | null>(initialFilters.salary || null);
  const [datePosted, setDatePosted] = useState<string | null>(initialFilters.datePosted || null);
  const [isFilterOpen, setIsFilterOpen] = useState(!compact);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'Executive'];
  const dateOptions = ['Last 24 hours', 'Last 3 days', 'Last 7 days', 'Last 14 days', 'Last 30 days'];

  // Calculate minimum and maximum salary values based on data for the range input
  const minSalary = 30000;
  const maxSalary = 200000;
  const step = 10000;

  useEffect(() => {
    // Notify parent component when filters change
    onFilterChange({
      search,
      location,
      jobType,
      experienceLevel,
      remote,
      salary,
      datePosted
    });
  }, [search, location, jobType, experienceLevel, remote, salary, datePosted, onFilterChange]);

  const handleJobTypeChange = (type: string) => {
    setJobType(prevTypes =>
      prevTypes.includes(type)
        ? prevTypes.filter(t => t !== type)
        : [...prevTypes, type]
    );
  };

  const handleExperienceLevelChange = (level: string) => {
    setExperienceLevel(prevLevels =>
      prevLevels.includes(level)
        ? prevLevels.filter(l => l !== level)
        : [...prevLevels, level]
    );
  };

  const handleDatePostedChange = (date: string) => {
    setDatePosted(prevDate => (prevDate === date ? null : date));
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSalary([minSalary, value]);
  };

  const resetFilters = () => {
    setSearch('');
    setLocation('');
    setJobType([]);
    setExperienceLevel([]);
    setRemote(false);
    setSalary(null);
    setDatePosted(null);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className={`${className}`}>
      {/* Search and Location Filters */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Job title, keywords, or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Location or 'Remote'"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Toggle for Compact Mode */}
      {compact && (
        <div className="mb-4">
          <button
            type="button"
            onClick={toggleFilters}
            className="flex items-center text-indigo-600 hover:text-indigo-900 font-medium"
          >
            <Filter className="h-4 w-4 mr-1" />
            Advanced Filters
            {isFilterOpen ? (
              <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </button>
        </div>
      )}

      {/* Advanced Filters */}
      {isFilterOpen && (
        <div className="space-y-4">
          {/* Job Type Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Job Type</h3>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    id={`filter-${type.replace(' ', '-').toLowerCase()}`}
                    name="job-type"
                    type="checkbox"
                    checked={jobType.includes(type)}
                    onChange={() => handleJobTypeChange(type)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`filter-${type.replace(' ', '-').toLowerCase()}`} className="ml-3 text-sm text-gray-700">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Level Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Experience Level</h3>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div key={level} className="flex items-center">
                  <input
                    id={`filter-${level.replace(' ', '-').toLowerCase()}`}
                    name="experience"
                    type="checkbox"
                    checked={experienceLevel.includes(level)}
                    onChange={() => handleExperienceLevelChange(level)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`filter-${level.replace(' ', '-').toLowerCase()}`} className="ml-3 text-sm text-gray-700">
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Remote Filter */}
          <div>
            <div className="flex items-center">
              <input
                id="remote-only"
                name="remote-only"
                type="checkbox"
                checked={remote}
                onChange={(e) => setRemote(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remote-only" className="ml-3 text-sm text-gray-700">
                Remote Only
              </label>
            </div>
          </div>

          {/* Salary Range Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Salary Range: {salary ? `$${salary[1].toLocaleString()}+` : 'Any'}
            </h3>
            <input
              type="range"
              min={minSalary}
              max={maxSalary}
              step={step}
              value={salary ? salary[1] : maxSalary}
              onChange={handleSalaryChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>${minSalary.toLocaleString()}</span>
              <span>${maxSalary.toLocaleString()}+</span>
            </div>
          </div>

          {/* Date Posted Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Date Posted</h3>
            <div className="space-y-2">
              {dateOptions.map((date) => (
                <div key={date} className="flex items-center">
                  <input
                    id={`filter-date-${date.replace(/\s+/g, '-').toLowerCase()}`}
                    name="date-posted"
                    type="radio"
                    checked={datePosted === date}
                    onChange={() => handleDatePostedChange(date)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor={`filter-date-${date.replace(/\s+/g, '-').toLowerCase()}`} className="ml-3 text-sm text-gray-700">
                    {date}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Reset Filters Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <X className="h-4 w-4 mr-1" />
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
 