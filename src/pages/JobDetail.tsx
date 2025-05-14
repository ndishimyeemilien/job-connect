import  { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  CalendarClock, 
  ArrowLeft, 
  Bookmark, 
  Share, 
  CheckCircle, 
  Building,
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import JobSkillBadge from '../components/JobSkillBadge';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const { getJobById, loading: jobsLoading } = useJobs();
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(id ? getJobById(id) : undefined);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  
  useEffect(() => {
    if (id) {
      const jobData = getJobById(id);
      setJob(jobData);
      
      if (jobData) {
        document.title = `${jobData.title} at ${jobData.company} - JobConnect`;
      } else {
        document.title = 'Job Not Found - JobConnect';
      }
    }
  }, [id, getJobById]);
  
  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    
    // Mock application submission
    setTimeout(() => {
      setApplicationSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };
  
  if (jobsLoading) {
    return <Loading />;
  }
  
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 lg:px-8">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Job Not Found</h1>
          <p className="mt-4 text-lg text-gray-600">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <div className="mt-8">
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Browse All Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
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
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {applicationSuccess && (
          <div className="bg-green-50 p-4 rounded-md mb-6 flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Application Submitted</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Your application for {job.title} at {job.company} has been submitted successfully. 
                  You can track your application status from your dashboard.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Back button */}
        <Link
          to="/jobs"
          className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Jobs
        </Link>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                    {job.companyLogo ? (
                      <img src={job.companyLogo} alt={job.company} className="h-full w-full object-cover" />
                    ) : (
                      <Building className="h-8 w-8 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                    <p className="text-lg text-gray-600">{job.company}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100">
                    <Share className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1 text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-1 text-gray-400" />
                  <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-1 text-gray-400" />
                    <span>{job.salary}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <CalendarClock className="h-5 w-5 mr-1 text-gray-400" />
                  <span>Posted {formatDate(job.postedDate)}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className={`prose prose-indigo max-w-none ${!showFullDescription && 'line-clamp-4'}`}>
                  <p>{job.description}</p>
                </div>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium inline-flex items-center"
                >
                  {showFullDescription ? (
                    <>
                      Show less
                      <ChevronUp className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Read more
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Responsibilities */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
            
            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <JobSkillBadge key={index} skill={skill} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/3">
            {/* Apply Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Apply for this job</h2>
              
              {!applicationSuccess && (
                <button
                  onClick={handleApply}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
                >
                  Apply Now
                </button>
              )}
              
              <div className="text-sm text-gray-600">
                {job.applicationDeadline ? (
                  <p className="flex items-center mb-2">
                    <CalendarClock className="h-4 w-4 mr-1 text-gray-400" />
                    Application deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                  </p>
                ) : null}
                
                {job.applicationCount !== undefined && (
                  <p className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                    {job.applicationCount} people have applied
                  </p>
                )}
              </div>
              
              {isAuthenticated && currentUser?.userType === 'employer' && (
                <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 text-sm rounded-md">
                  You are logged in as an employer. To apply for jobs, please sign in with a job seeker account.
                </div>
              )}
            </div>
            
            {/* Company Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About the company</h2>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.company} className="h-full w-full object-cover" />
                  ) : (
                    <Building className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{job.company}</h3>
                  <p className="text-sm text-gray-600">{job.location}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                {job.company} is a leading company in the industry, known for innovation and quality.
                Visit their website to learn more about their mission and culture.
              </p>
              <a 
                href={`https://${job.company.toLowerCase().replace(/\s+/g, '')}.example.com`} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Visit company website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 