import  { useState } from 'react';
import { User, Briefcase, Image, X } from 'lucide-react';

interface ProfileImageUploadProps {
  currentImage?: string | null;
  userName: string;
  onImageSelected?: (file: File) => void;
  userType: 'jobseeker' | 'employer';
}

export default function ProfileImageUpload({
  currentImage,
  userName,
  onImageSelected,
  userType
}: ProfileImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files?.length) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File is too large. Maximum size is 5MB.');
      return;
    }

    // Create preview URL and pass file to parent
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageSelected?.(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  // Generate initials for the avatar fallback
  const getInitials = () => {
    return userName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`relative w-32 h-32 rounded-full overflow-hidden ${
          isDragging ? 'border-2 border-indigo-500 bg-indigo-50' : 'border border-gray-200'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {previewUrl || currentImage ? (
          <>
            <img 
              src={previewUrl || currentImage || ''} 
              alt={userName}
              className="w-full h-full object-cover"
            />
            <button 
              onClick={removeImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md"
              title="Remove image"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            userType === 'jobseeker' ? 'bg-indigo-100' : 'bg-emerald-100'
          }`}>
            {userType === 'jobseeker' ? (
              <User size={40} className="text-indigo-600" />
            ) : (
              <Briefcase size={40} className="text-emerald-600" />
            )}
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity">
          <label 
            htmlFor="profile-image-upload"
            className="cursor-pointer p-2 rounded-full hover:bg-black hover:bg-opacity-20 flex items-center justify-center"
          >
            <span className="sr-only">Upload image</span>
            <Image className="h-6 w-6 text-white opacity-0 hover:opacity-100" />
          </label>
          <input 
            id="profile-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
      
      <p className="mt-4 text-sm text-gray-600">
        {isDragging ? 'Drop your image here' : 'Drag an image or click to browse'}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        JPEG, PNG or GIF • Max 5MB
      </p>
    </div>
  );
}
 