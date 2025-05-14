import  { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: 'indigo' | 'emerald' | 'amber' | 'sky';
}

export default function FeatureCard({ 
  icon, 
  title, 
  description,
  color = 'indigo'
}: FeatureCardProps) {
  
  const colorClasses = {
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-100 text-amber-600',
    sky: 'bg-sky-100 text-sky-600'
  };
  
  return (
    <div className="text-center group">
      <div className="flex justify-center">
        <div className={`${colorClasses[color]} rounded-full p-3 inline-flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
      <h3 className="mt-6 text-xl font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">{title}</h3>
      <p className="mt-2 text-base text-gray-500">
        {description}
      </p>
    </div>
  );
}
 