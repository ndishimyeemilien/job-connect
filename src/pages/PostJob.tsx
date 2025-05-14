import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { AlertCircle, Briefcase, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export const PostJob = () => {
  const { currentUser } = useAuth();
  const { createJob } = useJobs();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(currentUser?.name || '');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [type, setType] = useState('fulltime');
  const [benefits, setBenefits] = useState('');
  const [skills, setSkills] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('You must be logged in to post a job');
      return;
    }
    
    if (currentUser.userType !== 'employer') {
      setError('Only employers can post jobs');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const requirementsArray = requirements
        .split('\n')
        .map(req => req.trim())
        .filter(Boolean);
      
      const skillsArray = skills
        .split(',')
        .map(skill => skill.trim())
        .filter(Boolean);
      
      const benefitsArray = benefits
        .split('\n')
        .map(benefit => benefit.trim())
        .filter(Boolean);
      
      const jobData = {
        title,
        company,
        location,
        salary: salary || undefined,
        description,
        requirements: requirementsArray,
        employerId: currentUser.id,
        type,
        skills: skillsArray.length > 0 ? skillsArray : undefined,
        benefits: benefitsArray.length > 0 ? benefitsArray : undefined,
        applicationDeadline: applicationDeadline || undefined,
        isActive: true
      };
      
      const newJob = await createJob(jobData);
      navigate(`/jobs/${newJob.id}`);
    } catch (err) {
      console.error('Error posting job:', err);
      setError(`Failed to post job: ${err}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center">
              <Briefcase className="mx-auto h-12 w-12 text-indigo-600" />
              <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Post a Job</h2>
              <p className="mt-2 text-sm text-gray-600">
                Fill out the form below to post a new job opportunity
              </p>
            </div>
          </div>
          
          {error && (
            <div className="mt-8 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title*
                </label>
                <div className="mt-1">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company Name*
                </label>
                <div className="mt-1">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g. Acme Inc."
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location*
                  </label>
                  <div className="mt-1">
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g. San Francisco, CA (Remote)"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                    Salary Range (Optional)
                  </label>
                  <div className="mt-1">
                    <input
                      id="salary"
                      name="salary"
                      type="text"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g. $80,000 - $100,000"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Job Type*
                </label>
                <div className="mt-1">
                  <select
                    id="type"
                    name="type"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Job Description*
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Provide a detailed description of the job..."
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Write a clear description of the job responsibilities and expectations.
                </p>
              </div>
              
              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                  Requirements*
                </label>
                <div className="mt-1">
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={4}
                    required
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="- 5+ years experience with JavaScript/TypeScript
- Experience with React
- Familiar with modern frontend build tools"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  List each requirement on a new line. These will be displayed as bullet points.
                </p>
              </div>
              
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                  Skills (Optional)
                </label>
                <div className="mt-1">
                  <input
                    id="skills"
                    name="skills"
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g. JavaScript, React, Node.js"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Comma-separated list of skills required for the job.
                </p>
              </div>
              
              <div>
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
                  Benefits (Optional)
                </label>
                <div className="mt-1">
                  <textarea
                    id="benefits"
                    name="benefits"
                    rows={3}
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="- Health insurance
- 401(k) matching
- Flexible work hours"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  List each benefit on a new line. These will be displayed as bullet points.
                </p>
              </div>
              
              <div>
                <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
                  Application Deadline (Optional)
                </label>
                <div className="mt-1">
                  <input
                    id="applicationDeadline"
                    name="applicationDeadline"
                    type="date"
                    value={applicationDeadline}
                    onChange={(e) => setApplicationDeadline(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-gray-500">
                  * Required fields
                </span>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? (
                  'Posting Job...'
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Post Job
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default PostJob;
 