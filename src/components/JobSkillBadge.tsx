import  { ReactNode } from 'react';

interface JobSkillBadgeProps {
  skill: string;
  color?: 'blue' | 'indigo' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'; 
  icon?: ReactNode;
}

export default function JobSkillBadge({ 
  skill, 
  color = 'blue',
  icon
}: JobSkillBadgeProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800',
    gray: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {skill}
    </span>
  );
}
 