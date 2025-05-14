import  { JobPost, UserType } from './types';

// Mock jobs data
export const mockJobs: JobPost[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    description: 'We are looking for a Senior Frontend Developer with expertise in React, TypeScript, and modern web technologies to join our product team. You will work on building and maintaining our customer-facing applications, collaborating with designers and backend engineers.',
    requirements: [
      'At least 5 years of experience with JavaScript and frontend frameworks',
      'Strong knowledge of React, Redux, and TypeScript',
      'Experience with responsive design and UI/UX principles',
      'Ability to write clean, maintainable code and follow best practices',
      'Good understanding of web performance optimization'
    ],
    responsibilities: [
      'Develop and maintain frontend components and applications',
      'Collaborate with designers to implement responsive, user-friendly interfaces',
      'Work with backend engineers to integrate APIs and services',
      'Optimize applications for maximum speed and scalability',
      'Write unit and integration tests'
    ],
    salary: '$120,000 - $150,000',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    skills: ['React', 'TypeScript', 'Redux', 'HTML', 'CSS', 'Jest'],
    postedDate: '2023-09-01',
    applicationDeadline: '2023-10-15',
    isRemote: true,
    companyLogo: 'https://via.placeholder.com/150',
    applicationCount: 24,
    status: 'active'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateX',
    location: 'New York, NY',
    description: 'InnovateX is seeking a talented Product Manager to join our growing team. You\'ll be responsible for driving the strategy and roadmap for one of our core products, working closely with engineering, design, and marketing teams.',
    requirements: [
      'Bachelor\'s degree in Business, Computer Science, or related field',
      '3+ years of experience in product management',
      'Strong analytical and problem-solving skills',
      'Excellent communication and interpersonal skills',
      'Experience with agile development methodologies'
    ],
    responsibilities: [
      'Define and prioritize product features and requirements',
      'Lead the product development lifecycle from conception to launch',
      'Work with cross-functional teams to deliver high-quality products',
      'Conduct market research and competitive analysis',
      'Track and analyze product metrics to inform decisions'
    ],
    salary: '$110,000 - $140,000',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    skills: ['Product Strategy', 'Agile', 'Market Research', 'User Stories', 'Roadmapping'],
    postedDate: '2023-09-05',
    applicationDeadline: '2023-10-10',
    isRemote: false,
    companyLogo: 'https://via.placeholder.com/150',
    applicationCount: 36,
    status: 'active'
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'Austin, TX',
    description: 'DesignHub is looking for a creative and user-focused UX/UI Designer to join our design team. You\'ll work on crafting beautiful, intuitive interfaces for our clients across various industries.',
    requirements: [
      'Bachelor\'s degree in Design, HCI, or related field',
      '2+ years of experience in UX/UI design',
      'Proficiency in design tools like Figma, Sketch, or Adobe XD',
      'Strong portfolio showcasing your design process',
      'Knowledge of user-centered design principles'
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with product managers and developers',
      'Create and maintain design systems',
      'Stay current with design trends and best practices'
    ],
    salary: '$90,000 - $120,000',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping', 'Design Systems'],
    postedDate: '2023-09-10',
    applicationDeadline: '2023-10-20',
    isRemote: true,
    companyLogo: 'https://via.placeholder.com/150',
    applicationCount: 42,
    status: 'active'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudFirst',
    location: 'Seattle, WA',
    description: 'CloudFirst is seeking a skilled DevOps Engineer to help us build and maintain our cloud infrastructure. You\'ll work on automating deployments, improving system reliability, and optimizing our development workflows.',
    requirements: [
      'Bachelor\'s degree in Computer Science or equivalent experience',
      '3+ years of experience in a DevOps role',
      'Strong knowledge of AWS, GCP, or Azure',
      'Experience with containerization and orchestration (Docker, Kubernetes)',
      'Proficiency in scripting languages (Python, Bash)'
    ],
    responsibilities: [
      'Build and maintain CI/CD pipelines',
      'Manage cloud infrastructure using IaC tools like Terraform',
      'Monitor system performance and troubleshoot issues',
      'Implement security best practices',
      'Collaborate with development teams to improve deployment processes'
    ],
    salary: '$115,000 - $145,000',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Python', 'CI/CD'],
    postedDate: '2023-09-07',
    applicationDeadline: '2023-10-07',
    isRemote: true,
    companyLogo: 'https://via.placeholder.com/150',
    applicationCount: 19,
    status: 'active'
  },
  {
    id: '5',
    title: 'Junior Data Analyst',
    company: 'DataDriven',
    location: 'Chicago, IL',
    description: 'DataDriven is looking for a Junior Data Analyst to join our analytics team. You\'ll help collect, process, and analyze data to provide insights that drive business decisions.',
    requirements: [
      'Bachelor\'s degree in Statistics, Mathematics, or related field',
      '0-2 years of experience in data analysis',
      'Proficiency in SQL and Excel',
      'Experience with data visualization tools (Tableau, Power BI)',
      'Basic understanding of statistical concepts'
    ],
    responsibilities: [
      'Collect and clean data from various sources',
      'Perform data analysis and create reports',
      'Build dashboards and visualizations',
      'Assist in developing and maintaining data models',
      'Communicate findings to stakeholders'
    ],
    salary: '$60,000 - $80,000',
    employmentType: 'full-time',
    experienceLevel: 'entry',
    skills: ['SQL', 'Excel', 'Tableau', 'Data Analysis', 'Statistics'],
    postedDate: '2023-09-12',
    applicationDeadline: '2023-10-12',
    isRemote: false,
    companyLogo: 'https://via.placeholder.com/150',
    applicationCount: 51,
    status: 'active'
  },
  {
    id: '6',
    title: 'Content Marketing Specialist',
    company: 'BrandBuilders',
    location: 'Boston, MA',
    description: 'BrandBuilders is seeking a creative Content Marketing Specialist to create compelling content that engages our audience and drives conversions. You\'ll work with our marketing team to develop and execute content strategies.',
    requirements: [
      'Bachelor\'s degree in Marketing, Communications, or related field',
      '2+ years of experience in content marketing',
      'Excellent writing and editing skills',
      'Experience with SEO and content management systems',
      'Knowledge of social media platforms and marketing channels'
    ],
    responsibilities: [
      'Create high-quality content for various channels (blog, social media, email)',
      'Develop and maintain content calendar',
      'Optimize content for SEO and conversions',
      'Analyze content performance and make data-driven recommendations',
      'Stay up-to-date with industry trends and best practices'
    ],
    salary: '$70,000 - $90,000',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    skills: ['Content Writing', 'SEO', 'Social Media', 'Content Strategy', 'Analytics'],
    postedDate: '2023-09-08',
    applicationDeadline: '2023-10-08',
    isRemote: true,
    companyLogo: 'https://via.placeholder.com/150',
    applicationCount: 28,
    status: 'active'
  },
  {
    id: '7',
    title: 'Backend Developer (Node.js)',
    company: 'ServerSide Inc.',
    location: 'Remote',
    description: 'ServerSide Inc. is looking for a Backend Developer with expertise in Node.js to join our engineering team. You\'ll work on building and maintaining APIs, services, and database integrations for our platform.',
    requirements: [
      'Bachelor\'s degree in Computer Science or equivalent experience',
      '3+ years of experience with Node.js development',
      'Knowledge of database systems (MongoDB, PostgreSQL)',
      'Experience with RESTful APIs and GraphQL',
      'Understanding of server-side architecture and performance optimization'
    ],
    responsibilities: [
      'Design, build, and maintain efficient, reusable, and reliable backend code',
      'Implement data storage solutions and integrations',
      'Ensure high performance and responsiveness of applications',
      'Write unit and integration tests',
      'Collaborate with frontend developers and other team members'
    ],
    salary: '$100,000 - $130,000',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'API Design', 'GraphQL'],
    postedDate: '2023-09-03',
    applicationDeadline: '2023-10-03',
    isRemote: true,
    companyLogo: 'https://via.placeholder.com/150',
    applicationCount: 31,
    status: 'active'
  },
  {
    id: '8',
    title: 'Human Resources Manager',
    company: 'PeopleFirst',
    location: 'Denver, CO',
    description: 'PeopleFirst is seeking an experienced HR Manager to oversee our human resources department. You\'ll be responsible for recruiting, employee relations, benefits administration, and ensuring compliance with labor laws.',
    requirements: [
      'Bachelor\'s degree in Human Resources, Business, or related field',
      '5+ years of experience in HR management',
      'Knowledge of HR best practices and employment laws',
      'Experience with HRIS and ATS systems',
      'Strong interpersonal and communication skills'
    ],
    responsibilities: [
      'Develop and implement HR policies and procedures',
      'Manage the recruitment and onboarding process',
      'Oversee employee benefits and compensation programs',
      'Handle employee relations issues and conflicts',
      'Ensure compliance with federal, state, and local employment laws'
    ],
    salary: '$95,000 - $125,000',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    skills: ['Recruiting', 'Employee Relations', 'Benefits Administration', 'HR Policy', 'Compliance'],
    postedDate: '2023-09-04',
    applicationDeadline: '2023-10-04',
    isRemote: false,
    companyLogo: 'https://via.placeholder.com/150',
    applicationCount: 22,
    status: 'active'
  }
];

// Mock companies data
export const mockCompanies = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology',
    size: '501-1000 employees',
    description: 'TechCorp Solutions is a leading technology company specializing in cloud infrastructure and enterprise software solutions.',
    website: 'https://techcorp.example.com',
    location: 'San Francisco, CA',
    foundedYear: 2010
  },
  {
    id: '2',
    name: 'InnovateX',
    logo: 'https://via.placeholder.com/150',
    industry: 'Software',
    size: '51-200 employees',
    description: 'InnovateX builds cutting-edge productivity tools that help teams collaborate and work more efficiently.',
    website: 'https://innovatex.example.com',
    location: 'New York, NY',
    foundedYear: 2015
  },
  {
    id: '3',
    name: 'DesignHub',
    logo: 'https://via.placeholder.com/150',
    industry: 'Design',
    size: '11-50 employees',
    description: 'DesignHub is a creative agency that delivers exceptional design solutions for brands and digital products.',
    website: 'https://designhub.example.com',
    location: 'Austin, TX',
    foundedYear: 2018
  }
];

// Mock users data
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    userType: 'jobseeker' as UserType,
    photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: '2023-01-15',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    bio: 'Experienced frontend developer with a passion for creating user-friendly web applications.'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    userType: 'employer' as UserType,
    photoURL: 'https://randomuser.me/api/portraits/women/1.jpg',
    createdAt: '2023-02-20',
    companyName: 'TechCorp Solutions',
    companyLogo: 'https://via.placeholder.com/150',
    companyDescription: 'A leading technology company specializing in cloud infrastructure.'
  }
];

// Mock statistics
export const mockStatistics = [
  {
    id: '1',
    title: 'Active Jobs',
    value: 1200,
    icon: 'Briefcase',
    change: 15,
    period: 'month',
    color: 'indigo'
  },
  {
    id: '2',
    title: 'Registered Companies',
    value: 350,
    icon: 'Building',
    change: 8,
    period: 'month',
    color: 'emerald'
  },
  {
    id: '3',
    title: 'Job Seekers',
    value: 5400,
    icon: 'Users',
    change: 12,
    period: 'month',
    color: 'amber'
  },
  {
    id: '4',
    title: 'Successful Placements',
    value: 875,
    icon: 'CheckCircle',
    change: 7,
    period: 'month',
    color: 'rose'
  }
];

// Mock testimonials
export const mockTestimonials = [
  {
    id: '1',
    name: 'Michael Johnson',
    position: 'Software Engineer',
    company: 'TechCorp Solutions',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    testimonial: 'JobConnect helped me find my dream job within just two weeks of signing up. The interface is intuitive, and the job recommendations were spot on!',
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah Williams',
    position: 'HR Director',
    company: 'InnovateX',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    testimonial: 'As an employer, I\'ve found JobConnect to be an excellent platform for recruiting talent. The quality of candidates is consistently high, and the tools for managing applications are very efficient.',
    rating: 5
  },
  {
    id: '3',
    name: 'David Chen',
    position: 'UX Designer',
    company: 'DesignHub',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    testimonial: 'I was looking for a remote UX position, and JobConnect made it easy to filter for exactly what I wanted. I received multiple offers within a month!',
    rating: 4
  }
];

// Mock popular job categories
export const mockJobCategories = [
  {
    id: '1',
    name: 'Software Development',
    count: 428,
    icon: 'Code'
  },
  {
    id: '2',
    name: 'Design',
    count: 235,
    icon: 'Palette'
  },
  {
    id: '3',
    name: 'Marketing',
    count: 189,
    icon: 'TrendingUp'
  },
  {
    id: '4',
    name: 'Customer Service',
    count: 142,
    icon: 'Headphones'
  },
  {
    id: '5',
    name: 'Sales',
    count: 112,
    icon: 'DollarSign'
  },
  {
    id: '6',
    name: 'Finance',
    count: 87,
    icon: 'CreditCard'
  }
];

// Popular job search keywords
export const mockPopularKeywords = [
  'Remote',
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'UX Designer',
  'Frontend',
  'Backend',
  'Full Stack',
  'DevOps',
  'AI',
  'Machine Learning',
  'Marketing',
  'Sales',
  'Customer Support',
  'Finance',
  'Healthcare',
  'Entry Level',
  'Senior',
  'Part-time',
  'Contract'
];
 