import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const ImageUploader = ({ onImageChange }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onImageChange(file);
    }
  }, [onImageChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  return (
    <div className="mt-2">
      <motion.div 
        {...getRootProps()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`image-container cursor-pointer p-4 flex flex-col items-center justify-center h-48 transition-all ${
          isDragActive ? 'border-blue-500 bg-blue-500/10' : ''
        }`}
      >
        <input {...getInputProps()} />
        <svg 
          className={`h-12 w-12 mb-3 ${isDragActive ? 'text-blue-400' : 'text-gray-400'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-center text-gray-300 text-sm mb-1">
          {isDragActive ? 'Drop your image here...' : 'Drag & drop an image here'}
        </p>
        <p className="text-center text-gray-500 text-xs">
          or click to select a file
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Supported: JPEG, PNG (Max: 5MB)
        </p>
      </motion.div>
    </div>
  );
};

export default ImageUploader;