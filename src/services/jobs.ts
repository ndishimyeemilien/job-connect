import  { 
  db, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs, 
  addDoc,
  serverTimestamp,
  orderBy
} from './firebase';
import { JobPost, JobApplication } from '../types';

export const fetchJobs = async (filters?: {
  employerId?: string;
  search?: string;
  location?: string;
  type?: string;
  remote?: boolean;
}) => {
  try {
    let jobsQuery = collection(db, 'jobs');
    
    if (filters) {
      if (filters.employerId) {
        jobsQuery = query(jobsQuery, where('employerId', '==', filters.employerId));
      }
      
      if (filters.type) {
        jobsQuery = query(jobsQuery, where('type', '==', filters.type));
      }
      
      if (filters.remote) {
        jobsQuery = query(jobsQuery, where('remote', '==', true));
      }
    }
    
    jobsQuery = query(jobsQuery, orderBy('postedDate', 'desc'));
    
    const querySnapshot = await getDocs(jobsQuery);
    let jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobPost));
    
    // Filter by search term and location if provided
    if (filters?.search || filters?.location) {
      jobs = jobs.filter(job => {
        let matchesSearch = true;
        let matchesLocation = true;
        
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          matchesSearch = job.title.toLowerCase().includes(searchTerm) || 
                          job.company.toLowerCase().includes(searchTerm) ||
                          job.description.toLowerCase().includes(searchTerm) ||
                          job.skills.some(skill => skill.toLowerCase().includes(searchTerm));
        }
        
        if (filters.location) {
          const locationTerm = filters.location.toLowerCase();
          matchesLocation = job.location.toLowerCase().includes(locationTerm);
        }
        
        return matchesSearch && matchesLocation;
      });
    }
    
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchJobById = async (id: string): Promise<JobPost | null> => {
  try {
    const jobDoc = await getDoc(doc(db, 'jobs', id));
    if (jobDoc.exists()) {
      return { id: jobDoc.id, ...jobDoc.data() } as JobPost;
    }
    return null;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};

export const createJob = async (
  jobData: Omit<JobPost, 'id' | 'postedDate' | 'applications' | 'isActive'>
): Promise<string> => {
  try {
    const jobRef = await addDoc(collection(db, 'jobs'), {
      ...jobData,
      postedDate: serverTimestamp(),
      applications: [],
      isActive: true
    });
    return jobRef.id;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const updateJob = async (id: string, jobData: Partial<JobPost>): Promise<boolean> => {
  try {
    await updateDoc(doc(db, 'jobs', id), {
      ...jobData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

export const deleteJob = async (id: string): Promise<boolean> => {
  try {
    await updateDoc(doc(db, 'jobs', id), {
      isActive: false,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

export const applyToJob = async (
  jobId: string,
  applicationData: Omit<JobApplication, 'id' | 'jobId' | 'status' | 'appliedDate'>
): Promise<string> => {
  try {
    // First, check if job exists and is active
    const jobDoc = await getDoc(doc(db, 'jobs', jobId));
    if (!jobDoc.exists() || !jobDoc.data().isActive) {
      throw new Error('Job not found or is no longer active');
    }
    
    // Create application
    const applicationRef = await addDoc(collection(db, 'applications'), {
      ...applicationData,
      jobId,
      status: 'pending',
      appliedDate: serverTimestamp()
    });
    
    // Update job with application ID
    await updateDoc(doc(db, 'jobs', jobId), {
      applications: arrayUnion(applicationRef.id)
    });
    
    return applicationRef.id;
  } catch (error) {
    console.error('Error applying to job:', error);
    throw error;
  }
};

export const getApplicationsForEmployer = async (jobId: string): Promise<JobApplication[]> => {
  try {
    const applicationsQuery = query(collection(db, 'applications'), where('jobId', '==', jobId));
    const querySnapshot = await getDocs(applicationsQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobApplication));
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

export const getApplicationsForJobseeker = async (jobseekerId: string): Promise<JobApplication[]> => {
  try {
    const applicationsQuery = query(collection(db, 'applications'), where('jobseekerId', '==', jobseekerId));
    const querySnapshot = await getDocs(applicationsQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobApplication));
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (
  applicationId: string, 
  status: JobApplication['status'],
  notes?: string
): Promise<boolean> => {
  try {
    const updates: any = { status, updatedAt: serverTimestamp() };
    if (notes) updates.notes = notes;
    
    await updateDoc(doc(db, 'applications', applicationId), updates);
    return true;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};
 