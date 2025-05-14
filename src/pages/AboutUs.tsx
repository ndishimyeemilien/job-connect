import  { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, CheckCircle, Globe } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-indigo-700">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-30"
            src="https://images.unsplash.com/photo-1559523182-a284c3fb7cff?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjB3b3JrZXJzJTIwdGVhbSUyMG1lZXRpbmd8ZW58MHx8fHwxNzQ3MTkzMzMzfDA&ixlib=rb-4.1.0&fit=fillmax&h=800&w=1200"
            alt="Team working together"
          />
          <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About JobConnect</h1>
          <p className="mt-6 max-w-2xl text-xl text-indigo-100">
            We're on a mission to connect talented professionals with the right opportunities and help employers find the perfect candidates.
          </p>
        </div>
      </div>

      {/* Our mission */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                At JobConnect, we believe that the right job can change someone's life, and the right candidate can transform a company. Our platform is designed to make these connections happen efficiently and effectively.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    Create a seamless experience for job seekers to find meaningful career opportunities
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    Provide employers with tools to discover and connect with top talent
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    Leverage technology to make job searching and recruitment more efficient
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    Promote diversity, inclusion, and fair opportunities for all job seekers
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjB3b3JrZXJzJTIwdGVhbSUyMG1lZXRpbmd8ZW58MHx8fHwxNzQ3MTkzMzMzfDA&ixlib=rb-4.1.0&fit=fillmax&h=800&w=1200"
                  alt="Team collaboration"
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our story */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:col-start-2">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Story
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                JobConnect was founded in 2020 by a team of HR professionals and tech enthusiasts who saw the need for a more human-centered approach to job searching and recruitment. We noticed that traditional job boards were focused on quantity over quality, and wanted to create a platform that prioritizes meaningful connections.
              </p>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Starting with just a handful of partner companies, we've grown to serve thousands of employers and job seekers across various industries. Our platform is continuously evolving based on feedback from our users and the changing needs of the job market.
              </p>
              <div className="mt-8">
                <Link
                  to="/jobs"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Explore Jobs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjB3b3JrZXJzJTIwdGVhbSUyMG1lZXRpbmd8ZW58MHx8fHwxNzQ3MTkzMzMzfDA&ixlib=rb-4.1.0&fit=fillmax&h=800&w=1200"
                  alt="Team meeting"
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Impact
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
              We've helped thousands of companies and job seekers connect and thrive.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-50 rounded-lg shadow px-6 py-8 text-center">
              <div className="flex justify-center mb-4">
                <Briefcase className="h-10 w-10 text-indigo-600" />
              </div>
              <p className="text-5xl font-extrabold text-indigo-600">5K+</p>
              <p className="mt-2 text-lg font-medium text-gray-900">Jobs Posted</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow px-6 py-8 text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-10 w-10 text-indigo-600" />
              </div>
              <p className="text-5xl font-extrabold text-indigo-600">10K+</p>
              <p className="mt-2 text-lg font-medium text-gray-900">Registered Users</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow px-6 py-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-indigo-600" />
              </div>
              <p className="text-5xl font-extrabold text-indigo-600">2K+</p>
              <p className="mt-2 text-lg font-medium text-gray-900">Successful Hires</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow px-6 py-8 text-center">
              <div className="flex justify-center mb-4">
                <Globe className="h-10 w-10 text-indigo-600" />
              </div>
              <p className="text-5xl font-extrabold text-indigo-600">20+</p>
              <p className="mt-2 text-lg font-medium text-gray-900">Countries Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
              Passionate professionals dedicated to transforming the job search experience.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'John Smith',
                role: 'CEO & Co-Founder',
                image: 'https://randomuser.me/api/portraits/men/32.jpg',
                bio: 'With over 15 years of experience in HR and recruitment, John founded JobConnect to revolutionize how people find jobs.'
              },
              {
                name: 'Sarah Johnson',
                role: 'CTO',
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
                bio: 'Sarah leads our technology team, ensuring that our platform is innovative, secure, and user-friendly.'
              },
              {
                name: 'Michael Chen',
                role: 'Head of Customer Success',
                image: 'https://randomuser.me/api/portraits/men/76.jpg',
                bio: 'Michael and his team work tirelessly to support our users and ensure they have a positive experience on JobConnect.'
              }
            ].map((person, index) => (
              <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                <img className="w-full h-60 object-cover" src={person.image} alt={person.name} />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{person.name}</h3>
                  <p className="text-sm text-indigo-600 mb-3">{person.role}</p>
                  <p className="text-gray-500">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to find your next opportunity?</span>
            <span className="block text-indigo-200">Join JobConnect today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Browse jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 