export  default function LogoCloud() {
  const companies = [
    { name: 'Microsoft', logo: 'https://via.placeholder.com/150x50?text=Microsoft' },
    { name: 'Google', logo: 'https://via.placeholder.com/150x50?text=Google' },
    { name: 'Amazon', logo: 'https://via.placeholder.com/150x50?text=Amazon' },
    { name: 'Apple', logo: 'https://via.placeholder.com/150x50?text=Apple' },
    { name: 'Netflix', logo: 'https://via.placeholder.com/150x50?text=Netflix' },
    { name: 'Meta', logo: 'https://via.placeholder.com/150x50?text=Meta' },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-lg font-medium text-gray-600 mb-8">
          Trusted by the world's leading companies
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {companies.map((company, idx) => (
            <div key={idx} className="flex justify-center items-center col-span-1">
              <img
                className="h-12 object-contain filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                src={company.logo}
                alt={company.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 