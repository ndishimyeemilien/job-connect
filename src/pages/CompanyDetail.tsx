import  { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Globe, Calendar, Briefcase, Mail, Phone, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import JobCard from '../components/JobCard';
import { mockUsers } from '../mockData';
import { useJobs } from '../context/JobContext';

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const { getJobsForEmployer } = useJobs();
  
  // Find the employer in mock data
  const employer = mockUsers.find(user => user.id === id && user.userType === 'employer');
  
  if (!employer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Company not found</h2>
        <p className="mt-4 text-lg text-gray-500">
          The company you are looking for does not exist or has been removed.
        </p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  // Get company jobs
  const companyJobs = getJobsForEmployer(employer.id);
  
  // Mock company data (would come from the database in a real application)
  const companyData = {
    founded: "2015",
    employees: "50-200",
    industry: "Technology",
    website: "https://www.example.com",
    description: `${employer.name} is a leading technology company specializing in innovative solutions for businesses. Our mission is to revolutionize how companies approach technology by providing cutting-edge tools and exceptional services.

We believe in fostering a collaborative environment where creativity thrives and individuals can grow professionally. Our team consists of talented professionals dedicated to delivering excellence in everything we do.`,
    headquarters: "San Francisco, CA",
    specialties: ["Software Development", "Cloud Computing", "AI Solutions", "Mobile Applications"],
    photos: [
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw4fHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBidXNpbmVzcyUyMHRlYW0lMjB3b3JraW5nJTIwdG9nZXRoZXJ8ZW58MHx8fHwxNzQ2NzMwMzY1fDA&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw5fHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBidXNpbmVzcyUyMHRlYW0lMjB3b3JraW5nJTIwdG9nZXRoZXJ8ZW58MHx8fHwxNzQ2NzMwMzY1fDA&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800"
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company header */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="relative h-48 bg-indigo-700">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBidXNpbmVzcyUyMHRlYW0lMjB3b3JraW5nJTIwdG9nZXRoZXJ8ZW58MHx8fHwxNzQ2NzMwMzY1fDA&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800"
              alt="Company cover"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-indigo-800/50" />
          </div>
          
          <div className="relative px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row">
            <div className="flex-shrink-0 -mt-16 sm:-mt-20">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg bg-white p-2 shadow-md">
                {employer.avatar ? (
                  <img 
                    src={employer.avatar} 
                    alt={employer.name} 
                    className="h-full w-full rounded object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded bg-indigo-100 flex items-center justify-center">
                    <Briefcase className="h-12 w-12 text-indigo-600" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 sm:mt-0 sm:ml-6 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{employer.name}</h1>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    <span>{companyData.headquarters}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <a
                    href={`mailto:${employer.email}`}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </a>
                  <Link
                    to={`/jobs?company=${encodeURIComponent(employer.name)}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    View All Jobs
                  </Link>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <span>{companyData.employees} Employees</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <span>Founded {companyData.founded}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Globe className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500">
                    Company Website <ExternalLink className="inline h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* About section */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">About {employer.name}</h2>
              </div>
              <div className="px-6 py-5">
                <div className="prose max-w-none">
                  {companyData.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-600">{paragraph}</p>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-base font-medium text-gray-900 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {companyData.specialties.map((specialty, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Company photos */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Company Photos</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {companyData.photos.map((photo, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      <img
                        src={photo}
                        alt={`${employer.name} office ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Job openings */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Current Job Openings</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {companyJobs.length === 0 ? (
                  <div className="px-6 py-5 text-center">
                    <p className="text-gray-500">No current job openings.</p>
                  </div>
                ) : (
                  companyJobs.map(job => (
                    <div key={job.id} className="p-6">
                      <JobCard job={job} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Right column */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Company info card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Company Information</h2>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Industry</h3>
                  <p className="mt-1 text-sm text-gray-900">{companyData.industry}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company size</h3>
                  <p className="mt-1 text-sm text-gray-900">{companyData.employees} employees</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Founded</h3>
                  <p className="mt-1 text-sm text-gray-900">{companyData.founded}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Headquarters</h3>
                  <p className="mt-1 text-sm text-gray-900">{companyData.headquarters}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <div className="mt-1 space-y-2">
                    <p className="text-sm flex items-center text-gray-900">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      {employer.email}
                    </p>
                    <p className="text-sm flex items-center text-gray-900">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      +1 (555) 123-4567
                    </p>
                    <p className="text-sm flex items-center text-gray-900">
                      <Globe className="h-4 w-4 text-gray-400 mr-2" />
                      <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500">
                        {companyData.website.replace('https://', '')}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Similar companies */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Similar Companies</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {mockUsers
                  .filter(user => user.userType === 'employer' && user.id !== employer.id)
                  .slice(0, 3)
                  .map(company => (
                    <Link 
                      key={company.id} 
                      to={`/company/${company.id}`} 
                      className="block px-6 py-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        {company.avatar ? (
                          <img 
                            src={company.avatar} 
                            alt={company.name} 
                            className="h-10 w-10 rounded-lg" 
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-indigo-600" />
                          </div>
                        )}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{company.name}</p>
                          <p className="text-xs text-gray-500">Technology • San Francisco</p>
                        </div>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
 