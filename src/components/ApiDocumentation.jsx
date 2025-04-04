
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ApiDocumentation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-12 max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
        <div 
          className="p-4 bg-gradient-to-r from-ghibli-blue to-ghibli-green flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-xl font-bold text-white">API Documentation</h2>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 text-white transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Transform Image to Ghibli Style</h3>
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-sm font-semibold text-gray-700">POST /api/transform-ghibli</p>
              </div>
              
              <h4 className="font-semibold mt-4 mb-2 text-gray-700">Request Body</h4>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                {`{
  "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZ..." // Base64 encoded image
}`}
              </pre>
              
              <h4 className="font-semibold mt-4 mb-2 text-gray-700">Response (Success)</h4>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                {`{
  "success": true,
  "result": "data:image/png;base64,iVBOR..." // Base64 encoded transformed image
}`}
              </pre>
              
              <h4 className="font-semibold mt-4 mb-2 text-gray-700">Response (Error)</h4>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                {`{
  "success": false,
  "message": "Error message details"
}`}
              </pre>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Integration Example</h3>
              <div className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                <code className="language-javascript">{`// Example using fetch API
async function transformImage(imageFile) {
  // Convert file to base64
  const base64Image = await convertToBase64(imageFile);
  
  // Make API request
  const response = await fetch('/api/transform-ghibli', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ imageUrl: base64Image })
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Use the transformed image
    return data.result;
  } else {
    throw new Error(data.message);
  }
}

// Helper function to convert File to base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}`}
                </code>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Rate Limits & Constraints</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Maximum image size: 5MB</li>
                <li>Supported formats: JPEG, PNG</li>
                <li>Processing time: ~30-60 seconds per image</li>
                <li>Rate limit: 10 requests per hour per IP</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ApiDocumentation;
