import  { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Tag, X } from 'lucide-react';

interface TrendingKeywordsProps {
  keywords: string[];
}

export default function TrendingKeywords({ keywords }: TrendingKeywordsProps) {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const toggleKeyword = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };
  
  const searchJobs = () => {
    if (selectedKeywords.length === 0) return;
    
    const query = selectedKeywords.join(' ');
    navigate(`/jobs?q=${encodeURIComponent(query)}`);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Tag className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Popular Keywords</h3>
        </div>
        
        {selectedKeywords.length > 0 && (
          <button
            onClick={() => setSelectedKeywords([])}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {keywords.map((keyword, index) => (
          <motion.button
            key={keyword}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => toggleKeyword(keyword)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedKeywords.includes(keyword)
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {keyword}
          </motion.button>
        ))}
      </div>
      
      {selectedKeywords.length > 0 && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="text-sm text-gray-600 mb-2">Selected Keywords:</div>
            <div className="flex flex-wrap gap-2">
              {selectedKeywords.map(keyword => (
                <div 
                  key={keyword}
                  className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm flex items-center"
                >
                  {keyword}
                  <button 
                    onClick={() => toggleKeyword(keyword)}
                    className="ml-1 text-indigo-600 hover:text-indigo-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={searchJobs}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors text-sm font-medium"
          >
            Search Jobs with Selected Keywords
          </button>
        </div>
      )}
    </div>
  );
}
 