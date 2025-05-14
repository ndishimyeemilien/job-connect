import  { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { 
  Briefcase, 
  FileText, 
  Users, 
  Settings, 
  ChevronRight, 
  Bell, 
  AlertCircle,
  Check,
  X,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { JobPost, JobApplication } from '../types';
import Loading from '../components/Loading';
import { motion } from 'framer-motion';
import HorizontalJobCard from '../components/HorizontalJobCard';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { getJobs, getUserApplications, getJobById } = useJobs();
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [applicationDetails, setApplicationDetails] = useState<Map<string, JobPost>>(new Map());
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        
        if (currentUser.userType === 'employer') {
          // Fetch jobs posted by this employer
          const employerJobs = await getJobs({ employerId: currentUser.id });
          setJobs(employerJobs);
        } else {
          // Fetch user's job applications
          const userApplications = await getUserApplications(currentUser.id);
          setApplications(userApplications);
          
          // Get details for each job application
          const jobDetailsMap = new Map<string, JobPost>();
          
          await Promise.all(
            userApplications.map(async (application) => {
              const jobDetails = await getJobById(application.jobId);
              if (jobDetails) {
                jobDetailsMap.set(application.jobId, jobDetails);
              }
            })
          );
          
          setApplicationDetails(jobDetailsMap);
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, [currentUser, getJobs, getUserApplications, getJobById]);

  if (loading) {
    return <Loading />;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'reviewed':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'accepted':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {currentUser?.userType === 'employer' ? 'Employer Dashboard' : 'Jobseeker Dashboard'}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back, {currentUser?.name}!
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              to="/profile"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Settings className="h-4 w-4 mr-2" />
              Profile Settings
            </Link>
            {currentUser?.userType === 'employer' && (
              <Link
                to="/post-job"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Post a New Job
              </Link>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`${
                  activeTab === 'dashboard'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Dashboard
              </button>
              
              {currentUser?.userType === 'employer' ? (
                <>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className={`${
                      activeTab === 'jobs'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                  >
                    My Jobs
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('applicants')}
                    className={`${
                      activeTab === 'applicants'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                  >
                    Applicants
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className={`${
                      activeTab === 'applications'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                  >
                    My Applications
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('saved')}
                    className={`${
                      activeTab === 'saved'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                  >
                    Saved Jobs
                  </button>
                </>
              )}
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`${
                  activeTab === 'notifications'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Notifications
              </button>
            </nav>
          </div>

          <div className="px-4 py-5 sm:p-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            {/* Dashboard Overview */}
            {activeTab === 'dashboard' && (
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Dashboard Overview</h3>
                
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {currentUser?.userType === 'employer' ? (
                    <>
                      <motion.div 
                        className="bg-white overflow-hidden shadow rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                              <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Active Job Listings</dt>
                                <dd className="text-3xl font-semibold text-gray-900">{jobs.length}</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                          <div className="text-sm">
                            <Link to="/post-job" className="font-medium text-indigo-600 hover:text-indigo-500">
                              Post a new job <ChevronRight className="inline h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-white overflow-hidden shadow rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                              <Users className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Applicants</dt>
                                <dd className="text-3xl font-semibold text-gray-900">24</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                          <div className="text-sm">
                            <button 
                              onClick={() => setActiveTab('applicants')}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              View all applicants <ChevronRight className="inline h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-white overflow-hidden shadow rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                              <Bell className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">New Notifications</dt>
                                <dd className="text-3xl font-semibold text-gray-900">5</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                          <div className="text-sm">
                            <button 
                              onClick={() => setActiveTab('notifications')}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              View all notifications <ChevronRight className="inline h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div 
                        className="bg-white overflow-hidden shadow rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                              <FileText className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Active Applications</dt>
                                <dd className="text-3xl font-semibold text-gray-900">{applications.length}</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                          <div className="text-sm">
                            <button 
                              onClick={() => setActiveTab('applications')}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              View all applications <ChevronRight className="inline h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-white overflow-hidden shadow rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                              <Check className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Accepted Applications</dt>
                                <dd className="text-3xl font-semibold text-gray-900">
                                  {applications.filter(app => app.status === 'accepted').length}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                          <div className="text-sm">
                            <button 
                              onClick={() => setActiveTab('applications')}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              View accepted applications <ChevronRight className="inline h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-white overflow-hidden shadow rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                              <Bell className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">New Notifications</dt>
                                <dd className="text-3xl font-semibold text-gray-900">3</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                          <div className="text-sm">
                            <button 
                              onClick={() => setActiveTab('notifications')}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              View all notifications <ChevronRight className="inline h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Recent Activity */}
                <div className="mt-8">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
                  
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul role="list" className="divide-y divide-gray-200">
                      {currentUser?.userType === 'employer' ? (
                        jobs.length > 0 ? (
                          jobs.slice(0, 5).map((job) => (
                            <motion.li 
                              key={job.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Link to={`/jobs/${job.id}`} className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-indigo-600 truncate">
                                      {job.title}
                                    </p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {job.type === 'fulltime' ? 'Full-time' : 
                                         job.type === 'parttime' ? 'Part-time' : 
                                         job.type === 'contract' ? 'Contract' : 'Remote'}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                      <p className="flex items-center text-sm text-gray-500">
                                        <Briefcase className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                        {job.company}
                                      </p>
                                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {job.location}
                                      </p>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                      </svg>
                                      <p>
                                        Posted on{' '}
                                        {new Date(job.createdAt).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric'
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </motion.li>
                          ))
                        ) : (
                          <li className="px-4 py-5 sm:px-6 text-center text-gray-500">
                            You haven't posted any jobs yet.{' '}
                            <Link to="/post-job" className="text-indigo-600 hover:text-indigo-900">
                              Post your first job
                            </Link>
                          </li>
                        )
                      ) : (
                        applications.length > 0 ? (
                          applications.slice(0, 5).map((application) => {
                            const job = applicationDetails.get(application.jobId);
                            if (!job) return null;
                            
                            return (
                              <motion.li 
                                key={application.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <Link to={`/jobs/${application.jobId}`} className="block hover:bg-gray-50">
                                  <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                      <p className="text-sm font-medium text-indigo-600 truncate">
                                        {job.title}
                                      </p>
                                      <div className="ml-2 flex-shrink-0 flex">
                                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(application.status)}`}>
                                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                      <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                          <Briefcase className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                          {job.company}
                                        </p>
                                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                          </svg>
                                          {job.location}
                                        </p>
                                      </div>
                                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        <p>
                                          Applied on{' '}
                                          {new Date(application.appliedAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                          })}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </motion.li>
                            );
                          })
                        ) : (
                          <li className="px-4 py-5 sm:px-6 text-center text-gray-500">
                            You haven't applied to any jobs yet.{' '}
                            <Link to="/jobs" className="text-indigo-600 hover:text-indigo-900">
                              Browse jobs
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* My Jobs (for employers) */}
            {activeTab === 'jobs' && currentUser?.userType === 'employer' && (
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">My Job Listings</h3>
                
                <div className="mt-4">
                  {jobs.length > 0 ? (
                    <div className="space-y-4">
                      {jobs.map((job) => (
                        <HorizontalJobCard 
                          key={job.id} 
                          job={job} 
                          showCompanyLink={false}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 px-4 bg-white rounded-lg border border-gray-200">
                      <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        You haven't posted any jobs yet.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/post-job"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <Briefcase className="-ml-1 mr-2 h-5 w-5" />
                          Post a New Job
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* My Applications (for job seekers) */}
            {activeTab === 'applications' && currentUser?.userType === 'jobseeker' && (
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">My Applications</h3>
                
                <div className="mt-4">
                  {applications.length > 0 ? (
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Job</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Applied</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">View</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {applications.map((application) => {
                            const job = applicationDetails.get(application.jobId);
                            if (!job) return null;
                            
                            return (
                              <tr key={application.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {job.title}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{job.company}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(application.status)}`}>
                                    {getStatusIcon(application.status)}
                                    <span className="ml-1">
                                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                    </span>
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {new Date(application.appliedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <Link to={`/jobs/${application.jobId}`} className="text-indigo-600 hover:text-indigo-900">
                                    View<span className="sr-only">, {job.title}</span>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 px-4 bg-white rounded-lg border border-gray-200">
                      <FileText className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        You haven't applied to any jobs yet.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/jobs"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <Search className="-ml-1 mr-2 h-5 w-5" />
                          Browse Jobs
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Saved Jobs (for job seekers) */}
            {activeTab === 'saved' && currentUser?.userType === 'jobseeker' && (
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Saved Jobs</h3>
                
                <div className="text-center py-8 px-4 bg-white rounded-lg border border-gray-200">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No saved jobs</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven't saved any jobs yet. Browse jobs and click the bookmark icon to save them for later.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/jobs"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Search className="-ml-1 mr-2 h-5 w-5" />
                      Browse Jobs
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Applicants (for employers) */}
            {activeTab === 'applicants' && currentUser?.userType === 'employer' && (
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Job Applicants</h3>
                
                <div className="text-center py-8 px-4 bg-white rounded-lg border border-gray-200">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No applicants yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You don't have any applicants for your job listings yet. Check back later.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/post-job"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Briefcase className="-ml-1 mr-2 h-5 w-5" />
                      Post Another Job
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Notifications</h3>
                
                <div className="flow-root">
                  <ul role="list" className="-mb-8">
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                              <Check className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {currentUser?.userType === 'employer' 
                                  ? 'Your job posting for "Senior Frontend Developer" is now live.'
                                  : 'Your application for "Senior Frontend Developer" at Acme Inc. was received.'}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              2h ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                              <Bell className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {currentUser?.userType === 'employer'
                                  ? 'New application received for "UX Designer" position.'
                                  : 'Your profile has been viewed by 5 employers in the last week.'}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              1d ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                              <Briefcase className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {currentUser?.userType === 'employer'
                                  ? '3 candidates matched your "Backend Developer" job posting.'
                                  : 'New job matching your skills: "Frontend Developer" at Tech Solutions.'}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              2d ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 