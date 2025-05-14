import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Briefcase, MapPin, Phone, FileText, Save, Camera, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProfileImageUpload from '../components/ProfileImageUpload';
 

export default function Profile() {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate saving profile
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>
          
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                   <ProfileImageUpload 
                    currentImage={currentUser?.avatar}
                    userName={currentUser?.name || ''}
                    userType={currentUser?.userType || 'jobseeker'}
                  />
 

                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        {currentUser?.userType === 'employer' ? 'Company Name' : 'Full Name'}
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        {currentUser?.userType === 'employer' ? 'Company Description' : 'Bio'}
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder={currentUser?.userType === 'employer' 
                            ? 'Tell us about your company...' 
                            : 'Tell us about yourself...'}
                        />
                      </div>
                    </div>
                  </div>

                  {currentUser?.userType === 'jobseeker' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Resume/CV</label>
                      <div className="mt-1 flex items-center">
                        <div className="flex-shrink-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                          <FileText className="h-5 w-5 text-gray-400 mr-2" />
                          Upload Resume
                          <input
                            type="file"
                            className="sr-only"
                            accept=".pdf,.doc,.docx"
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          PDF, DOC, DOCX up to 5MB
                        </span>
                      </div>
                    </div>
                  )}

                  {currentUser?.userType === 'jobseeker' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Skills</label>
                      <div className="mt-1">
                        <input
                          type="text"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Add skills separated by commas (e.g. JavaScript, React, Node.js)"
                        />
                      </div>
                    </div>
                  )}

                  {currentUser?.userType === 'jobseeker' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Experience</label>
                      <div className="mt-1 border border-gray-300 rounded-md p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-medium text-gray-900">Add Work Experience</h4>
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                          <p className="text-sm text-gray-500 text-center">
                            No work experience added yet.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentUser?.userType === 'jobseeker' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Education</label>
                      <div className="mt-1 border border-gray-300 rounded-md p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-medium text-gray-900">Add Education</h4>
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                          <p className="text-sm text-gray-500 text-center">
                            No education history added yet.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Save className={`h-4 w-4 mr-2 ${saving ? 'animate-spin' : ''}`} />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {currentUser?.userType === 'employer' && (
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
        )}

        {currentUser?.userType === 'employer' && (
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Company Details</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Additional information about your company.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                          Company Website
                        </label>
                        <div className="mt-1">
                          <input
                            type="url"
                            name="website"
                            id="website"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                          Industry
                        </label>
                        <div className="mt-1">
                          <select
                            id="industry"
                            name="industry"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>Select an industry</option>
                            <option>Technology</option>
                            <option>Healthcare</option>
                            <option>Finance</option>
                            <option>Education</option>
                            <option>Manufacturing</option>
                            <option>Retail</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                          Company Size
                        </label>
                        <div className="mt-1">
                          <select
                            id="size"
                            name="size"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>Select company size</option>
                            <option>1-10 employees</option>
                            <option>11-50 employees</option>
                            <option>51-200 employees</option>
                            <option>201-500 employees</option>
                            <option>501-1000 employees</option>
                            <option>1000+ employees</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="founded" className="block text-sm font-medium text-gray-700">
                          Founded Year
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            name="founded"
                            id="founded"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="e.g. 2010"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
  