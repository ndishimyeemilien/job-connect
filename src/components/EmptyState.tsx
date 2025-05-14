import  { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  secondaryActionText?: string;
  secondaryActionLink?: string;
  secondaryActionOnClick?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionText,
  actionLink,
  secondaryActionText,
  secondaryActionLink,
  secondaryActionOnClick
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">{description}</p>
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
        {actionText && actionLink && (
          <Link
            to={actionLink}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {actionText}
          </Link>
        )}
        
        {secondaryActionText && (secondaryActionLink || secondaryActionOnClick) && (
          secondaryActionLink ? (
            <Link
              to={secondaryActionLink}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              {secondaryActionText}
            </Link>
          ) : (
            <button
              onClick={secondaryActionOnClick}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              {secondaryActionText}
            </button>
          )
        )}
      </div>
    </div>
  );
}
 