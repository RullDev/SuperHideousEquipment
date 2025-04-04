
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ 
  onDrop, 
  previewUrl, 
  isDragActive, 
  getInputProps, 
  getRootProps 
}) => {
  const fileInputRef = useRef();

  return (
    <div className="flex flex-col">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 mb-4 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[250px] ${
          isDragActive ? 'border-ghibli-blue bg-blue-50' : 'border-gray-300 hover:border-ghibli-blue'
        } ${previewUrl ? 'bg-gray-50' : ''}`}
      >
        <input {...getInputProps()} ref={fileInputRef} />
        
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="max-h-[230px] object-contain rounded-lg shadow-md" 
          />
        ) : (
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-2"
            >
              <svg className="mx-auto h-14 w-14 text-ghibli-blue opacity-70" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <p className="text-gray-600 font-medium">
              {isDragActive 
                ? 'Drop your image here...' 
                : 'Drag & drop an image here, or click to select'}
            </p>
            <p className="text-sm text-gray-500 mt-1">Only JPG/PNG formats are supported</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ImageUploader;
