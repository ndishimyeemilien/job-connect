export  type UserType = 'jobseeker' | 'employer';

export interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  skills: string[];
  postedDate: string;
  applicationDeadline?: string;
  isRemote: boolean;
  companyLogo?: string;
  applicationCount?: number;
  status?: 'active' | 'closed' | 'draft';
}

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  photoURL?: string;
  createdAt: string;
}

export interface JobSeekerProfile extends User {
  skills: string[];
  experience: Experience[];
  education: Education[];
  bio?: string;
  resume?: string;
  location?: string;
  savedJobs?: string[];
  appliedJobs?: string[];
}

export interface EmployerProfile extends User {
  companyName: string;
  companyDescription?: string;
  industry?: string;
  companySize?: string;
  companyWebsite?: string;
  companyLogo?: string;
  location?: string;
  postedJobs?: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrentRole?: boolean;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  isCurrentlyStudying?: boolean;
  description?: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  resumeUrl?: string;
  coverLetter?: string;
  appliedDate: string;
  status: 'pending' | 'reviewing' | 'interviewed' | 'offered' | 'rejected' | 'withdrawn';
}
 