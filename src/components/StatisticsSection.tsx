import  { motion } from 'framer-motion';
import { Briefcase, CheckCircle, Building, ThumbsUp } from 'lucide-react';
import AnimatedNumberCounter from './AnimatedNumberCounter';

interface Statistic {
  title: string;
  value: string | number;
  description: string;
  icon: string;
  color: 'indigo' | 'emerald' | 'amber' | 'rose';
}

interface StatisticsSectionProps {
  statistics: Statistic[];
}

export default function StatisticsSection({ statistics }: StatisticsSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="h-6 w-6" />;
      case 'CheckCircle':
        return <CheckCircle className="h-6 w-6" />;
      case 'Building':
        return <Building className="h-6 w-6" />;
      case 'ThumbsUp':
        return <ThumbsUp className="h-6 w-6" />;
      default:
        return <Briefcase className="h-6 w-6" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'indigo':
        return 'bg-indigo-100 text-indigo-600';
      case 'emerald':
        return 'bg-emerald-100 text-emerald-600';
      case 'amber':
        return 'bg-amber-100 text-amber-600';
      case 'rose':
        return 'bg-rose-100 text-rose-600';
      default:
        return 'bg-indigo-100 text-indigo-600';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            By The Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            JobConnect has helped thousands of employers and job seekers make meaningful connections.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className={`w-12 h-12 rounded-full ${getColorClasses(stat.color)} flex items-center justify-center mb-4`}>
                {getIcon(stat.icon)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                <AnimatedNumberCounter 
                  value={typeof stat.value === 'number' ? stat.value : parseInt(stat.value)} 
                  suffix={typeof stat.value === 'number' && stat.title === 'User Satisfaction' ? '%' : ''}
                />
              </h3>
              <p className="font-medium text-gray-900 mb-2">{stat.title}</p>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
 