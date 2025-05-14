import  { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
}

export default function CTASection({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundImage
}: CTASectionProps) {
  return (
    <section 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-indigo-900 bg-opacity-80"></div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${backgroundImage ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 ${backgroundImage ? 'text-indigo-100' : 'text-gray-600'}`}>
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={primaryButtonLink}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              {primaryButtonText}
            </Link>
            
            {secondaryButtonText && secondaryButtonLink && (
              <Link
                to={secondaryButtonLink}
                className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm ${
                  backgroundImage 
                    ? 'text-white bg-transparent border-white hover:bg-white hover:bg-opacity-10' 
                    : 'text-indigo-600 bg-white border-indigo-600 hover:bg-indigo-50'
                } transition`}
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
 