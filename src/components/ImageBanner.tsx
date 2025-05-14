import  { ReactNode } from 'react';

interface ImageBannerProps {
  imageUrl: string;
  height?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  children?: ReactNode;
  rounded?: boolean;
  className?: string;
}

export default function ImageBanner({
  imageUrl,
  height = "h-64",
  overlay = true,
  overlayColor = "from-indigo-900",
  overlayOpacity = 60,
  children,
  rounded = true,
  className = ""
}: ImageBannerProps) {
  return (
    <div className={`relative ${height} overflow-hidden ${rounded ? 'rounded-lg' : ''} ${className}`}>
      <img 
        src={imageUrl}
        alt="Banner" 
        className="absolute w-full h-full object-cover"
      />
      {overlay && (
        <div className={`absolute inset-0 bg-gradient-to-r ${overlayColor} to-black opacity-${overlayOpacity}`} />
      )}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
 