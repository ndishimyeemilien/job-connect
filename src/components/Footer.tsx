import  { Link } from 'react-router-dom';
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">JobConnect</span>
            </div>
            <p className="mt-3 text-sm">
              Connecting talented professionals with top employers worldwide.
            </p>
            <div className="mt-5 space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-sm">123 Market St, San Francisco, CA</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-sm">(123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-sm">contact@jobconnect.com</span>
              </div>
            </div>
          </div>
          
          {/* For Job Seekers */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-white mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-sm hover:text-indigo-400 transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm hover:text-indigo-400 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm hover:text-indigo-400 transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-sm hover:text-indigo-400 transition-colors">
                  Job Alerts
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-indigo-400 transition-colors">
                  Career Resources
                </a>
              </li>
            </ul>
          </div>
          
          {/* For Employers */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-white mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register?type=employer" className="text-sm hover:text-indigo-400 transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-indigo-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-indigo-400 transition-colors">
                  Recruitment Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-indigo-400 transition-colors">
                  Employer Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-indigo-400 transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-indigo-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-indigo-400 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} JobConnect. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-indigo-400">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
 