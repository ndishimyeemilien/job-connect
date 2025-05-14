import  { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Building, CheckCircle, ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import JobCard from '../components/JobCard';
import FeaturedJobBanner from '../components/FeaturedJobBanner';
import LogoCloud from '../components/LogoCloud';
import { useJobs } from '../context/JobContext';
import { mockStatistics, mockTestimonials } from '../mockData';

export default function Home() {
  const { jobs, loading } = useJobs();
  
  useEffect(() => {
    document.title = 'JobConnect - Find Your Dream Job';
  }, []);

  // Featured jobs (first 4)
  const featuredJobs = jobs.slice(0, 4);
  
  // Featured job for banner (first job)
  const featuredJob = jobs[0];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Logo Cloud */}
      <LogoCloud />
      
      {/* Statistics Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              The #1 Job Board for Top Talent
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Thousands of companies and job seekers trust JobConnect for their hiring and career needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mockStatistics.map((stat, index) => {
              const Icon = () => {
                switch (stat.icon) {
                  case 'Briefcase':
                    return <Briefcase className="h-6 w-6" />;
                  case 'Users':
                    return <Users className="h-6 w-6" />;
                  case 'Building':
                    return <Building className="h-6 w-6" />;
                  case 'CheckCircle':
                    return <CheckCircle className="h-6 w-6" />;
                  default:
                    return <Briefcase className="h-6 w-6" />;
                }
              };
              
              const colorClasses = {
                indigo: 'bg-indigo-500 text-white',
                emerald: 'bg-emerald-500 text-white',
                amber: 'bg-amber-500 text-white',
                rose: 'bg-rose-500 text-white'
              };
              
              return (
                <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 rounded-md p-3 ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                        <Icon />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.title}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {stat.value.toLocaleString()}
                          </div>
                          {stat.change && (
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                              <span>↑ {stat.change}%</span>
                            </div>
                          )}
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Featured Job Banner */}
      {featuredJob && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedJobBanner
              imageUrl="https://images.unsplash.com/photo-1551434678-e076c223a692?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjB3b3JrZXJzJTIwdGVhbSUyMG1lZXRpbmd8ZW58MHx8fHwxNzQ3MTkzMzMzfDA&ixlib=rb-4.1.0&fit=fillmax&h=800&w=1200"
              title={featuredJob.title}
              company={featuredJob.company}
              location={featuredJob.location}
              jobType={featuredJob.employmentType.replace('-', ' ')}
              jobId={featuredJob.id}
            />
          </div>
        </section>
      )}
      
      {/* Featured Jobs Grid */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Jobs</h2>
            <Link 
              to="/jobs" 
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View all jobs
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link
              to="/jobs"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse All Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How JobConnect Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to jump-start your career or find the perfect candidate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 rounded-full p-4">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create an Account</h3>
              <p className="text-gray-600">
                Register as a job seeker or employer in minutes. Fill out your profile and showcase your skills or company.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 rounded-full p-4">
                  <Briefcase className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {`Find Jobs or Post Positions`}
              </h3>
              <p className="text-gray-600">
                Search for jobs matching your skills or post open positions to attract qualified candidates.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 rounded-full p-4">
                  <CheckCircle className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect and Succeed</h3>
              <p className="text-gray-600">
                Apply to jobs with one click or review applicants through our streamlined process. Success awaits!
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from job seekers and employers who found success with JobConnect.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {mockTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
                <div className="mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-${i < testimonial.rating ? 'yellow-400' : 'gray-300'}`}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.testimonial}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs text-gray-600">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Take the Next Step?
          </h2>
          <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
            Join thousands of professionals finding their dream jobs or ideal candidates on JobConnect.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Sign Up Now
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
 