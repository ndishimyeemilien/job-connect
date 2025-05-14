import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { JobPost } from '../types';
import { mockJobs } from '../mockData';

interface JobContextType {
  jobs: JobPost[];
  loading: boolean;
  error: string | null;
  getJobById: (id: string) => JobPost | undefined;
  searchJobs: (query: string, location: string) => JobPost[];
  filterJobs: (filters: any) => JobPost[];
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialJobs = async () => {
      try {
        // Simulate API call delay
        setTimeout(() => {
          setJobs(mockJobs);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load jobs');
        setLoading(false);
      }
    };

    loadInitialJobs();
  }, []);

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  const searchJobs = (query: string, location: string) => {
    return jobs.filter(job => {
      const matchesQuery = query
        ? job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase()) ||
          job.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
        : true;

      const matchesLocation = location
        ? job.location.toLowerCase().includes(location.toLowerCase()) ||
          (job.isRemote && location.toLowerCase().includes('remote'))
        : true;

      return matchesQuery && matchesLocation;
    });
  };

  const filterJobs = (filters: any) => {
    return jobs.filter(job => {
      // Filter logic for more advanced filters
      let matches = true;

      // Job type filter
      if (filters.jobType && filters.jobType.length > 0) {
        matches = matches && filters.jobType.includes(job.employmentType);
      }

      // Experience level filter
      if (filters.experienceLevel && filters.experienceLevel.length > 0) {
        matches = matches && filters.experienceLevel.includes(job.experienceLevel);
      }

      // Remote filter
      if (filters.remote) {
        matches = matches && job.isRemote;
      }

      // Salary range filter
      if (filters.salary && job.salary) {
        const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ''));
        matches = matches && jobSalary >= filters.salary[0] && jobSalary <= filters.salary[1];
      }

      // Date posted filter
      if (filters.datePosted) {
        const jobDate = new Date(job.postedDate);
        const currentDate = new Date();
        const daysDifference = Math.floor((currentDate.getTime() - jobDate.getTime()) / (1000 * 3600 * 24));

        switch (filters.datePosted) {
          case 'today':
            matches = matches && daysDifference < 1;
            break;
          case 'week':
            matches = matches && daysDifference < 7;
            break;
          case 'month':
            matches = matches && daysDifference < 30;
            break;
          default:
            break;
        }
      }

      return matches;
    });
  };

  return (
    <JobContext.Provider value={{ jobs, loading, error, getJobById, searchJobs, filterJobs }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}
 