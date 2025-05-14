import  { useState } from 'react';
import { FileText, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { storage, storageRef, uploadBytes, getDownloadURL } from '../services/firebase';
import { JobPost } from '../types';
import { motion } from 'framer-motion';

interface ApplicationFormProps {
  job: JobPost;
  onSuccess?: () => void;
}

export default function ApplicationForm({ job, onSuccess }: ApplicationFormProps) {
  const [coverLetter, setCoverLetter] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { currentUser } = useAuth();
  const { applyToJob } = useJobs();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit');
        return;
      }
      
      // Check file type (PDF, DOC, DOCX)
      const fileType = selectedFile.type;
      if (
        fileType !== 'application/pdf' &&
        fileType !== 'application/msword' &&
        fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        setError('Only PDF, DOC and DOCX files are allowed');
        return;
      }
      
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('You must be logged in to apply');
      return;
    }
    
    if (!file) {
      setError('Please upload your resume/CV');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Upload file to Firebase Storage
      const fileName = `${currentUser.id}_${Date.now()}_${file.name}`;
      const fileRef = storageRef(storage, `resumes/${fileName}`);
      
      // Upload file
      await uploadBytes(fileRef, file);
      
      // Get download URL
      const resumeUrl = await getDownloadURL(fileRef);
      
      // Create application
      await applyToJob({
        jobId: job.id,
        userId: currentUser.id,
        resumeUrl,
        coverLetter: coverLetter || undefined
      });
      
      setSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error applying to job:', err);
      setError(`Failed to apply: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        className="text-center py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Application submitted!</h3>
        <p className="mt-1 text-sm text-gray-500">
          Your application has been successfully submitted. The employer will review it and get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
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
      
      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
          Resume/CV*
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="resume"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PDF, DOC up to 5MB
            </p>
            {file && (
              <p className="text-sm text-indigo-600">
                <FileText className="inline-block mr-1 h-4 w-4" />
                {file.name}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
          Cover Letter (Optional)
        </label>
        <div className="mt-1">
          <textarea
            id="coverLetter"
            name="coverLetter"
            rows={4}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Tell the employer why you're a good fit for this position..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          A brief message explaining why you're interested in this position and what makes you a good candidate.
        </p>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}
 