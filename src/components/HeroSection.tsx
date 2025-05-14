import  { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import JobSearchBar from './JobSearchBar';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-indigo-700 opacity-90" />
      
      {/* Background image */}
      <div 
        className="absolute inset-0 z-[-1]"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjB3b3JrZXJzJTIwdGVhbSUyMG1lZXRpbmd8ZW58MHx8fHwxNzQ3MTkzMzMzfDA&ixlib=rb-4.1.0&fit=fillmax&h=800&w=1200')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Content */}
      <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl mb-6">
            <span className="block">Find Your Dream Job</span>
            <span className="block text-indigo-200">Connect with Top Employers</span>
          </h1>
          
          <p className="mt-3 text-lg text-indigo-100 sm:mt-5 sm:text-xl max-w-2xl mx-auto mb-12">
            Search thousands of jobs from top companies around the world. Your next career opportunity is just a click away.
          </p>
          
          <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
            <JobSearchBar />
          </div>
          
          <div className="mt-8 flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse All Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              For Employers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 