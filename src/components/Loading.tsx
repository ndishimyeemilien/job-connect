import  { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col space-y-3 p-2">
      <div className="animate-spin">
        <Loader className="h-8 w-8 text-indigo-600" />
      </div>
      <div className="text-base font-semibold text-gray-700">
        Loading...
      </div>
    </div>
  );
}
 