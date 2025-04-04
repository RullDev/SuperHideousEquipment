
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ImageUploader = ({ onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      onImageChange(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-full image-container flex flex-col items-center justify-center p-6 cursor-pointer transition-all ${
          isDragging ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-700/50'
        } hover:border-yellow-400/50 hover:bg-yellow-400/5`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ minHeight: '200px' }}
      >
        {previewUrl ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-w-full max-h-48 object-contain rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
              <p className="text-white text-sm">Click to change image</p>
            </div>
          </motion.div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="text-gray-300 mb-2 font-medium">Drag & drop image here</p>
            <p className="text-gray-500 text-sm">or click to browse</p>
          </div>
        )}
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        accept="image/*" 
        className="hidden" 
      />
      
      <div className="text-center mt-3">
        <p className="text-xs text-gray-500">Supports JPG, PNG, GIF up to 5MB</p>
      </div>
    </div>
  );
};

export default ImageUploader;
