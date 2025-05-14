import  { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected?: (file: File) => void;
  maxSizeMB?: number;
  className?: string;
  acceptedFormats?: string;
  placeholder?: string;
}

export default function ImageUploader({
  onImageSelected,
  maxSizeMB = 5,
  className = "",
  acceptedFormats = "image/jpeg, image/png, image/gif",
  placeholder = "Drop an image here or click to browse"
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    setError(null);
    
    if (files.length === 0) return;
    
    const file = files[0];
    
    // Check file type
    if (!acceptedFormats.includes(file.type)) {
      setError(`Invalid file type. Please upload ${acceptedFormats.replace(/,/g, ' or')}`);
      return;
    }
    
    // Check file size
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    if (onImageSelected) {
      onImageSelected(file);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <div className={`w-full ${className}`}>
      {error && (
        <div className="mb-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
          {error}
        </div>
      )}
      
      {previewUrl ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-48 object-cover"
          />
          <button 
            onClick={clearImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100 transition-colors"
            type="button"
          >
            <X className="h-4 w-4 text-red-500" />
          </button>
        </div>
      ) : (
        <div 
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-48 ${
            isDragging 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          } transition-colors cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <ImageIcon className="h-10 w-10 text-gray-400 mb-3" />
          <p className="text-sm text-gray-600 text-center">{placeholder}</p>
          <p className="text-xs text-gray-500 mt-2">Max size: {maxSizeMB}MB</p>
          
          <input 
            id="file-input" 
            type="file"
            accept={acceptedFormats}
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
 