import  { Star } from 'lucide-react';

interface TestimonialCardProps {
  avatar: string;
  name: string;
  position: string;
  testimonial: string;
  rating?: number;
  highlight?: boolean;
}

export default function TestimonialCard({ 
  avatar, 
  name, 
  position, 
  testimonial, 
  rating = 5,
  highlight = false
}: TestimonialCardProps) {
  return (
    <div className={`p-6 rounded-lg ${
      highlight 
        ? 'bg-indigo-50 border border-indigo-100' 
        : 'bg-white border border-gray-100'
    } shadow-sm h-full flex flex-col`}>
      <div className="flex items-start mb-4">
        <img 
          src={avatar} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4 shadow-sm"
        />
        <div>
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{position}</p>
        </div>
      </div>
      
      {rating > 0 && (
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
        </div>
      )}
      
      <p className="text-gray-700 flex-grow">{testimonial}</p>
      
      <div className="mt-6">
        <svg className="h-5 w-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" />
          <path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" />
        </svg>
      </div>
    </div>
  );
}
 