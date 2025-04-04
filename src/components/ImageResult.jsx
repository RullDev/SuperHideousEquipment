
import { motion } from 'framer-motion';

const ImageResult = ({ loading, resultUrl }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-2 rounded-lg p-4 w-full min-h-[250px] bg-gray-50 flex items-center justify-center mb-4 shadow-md">
        {loading ? (
          <div className="text-center p-8">
            <div className="inline-block animate-bounce bg-ghibli-blue w-4 h-4 rounded-full mx-1 delay-0"></div>
            <div className="inline-block animate-bounce bg-ghibli-green w-4 h-4 rounded-full mx-1 delay-150"></div>
            <div className="inline-block animate-bounce bg-ghibli-yellow w-4 h-4 rounded-full mx-1 delay-300"></div>
            <p className="text-gray-600 mt-4 font-medium">Transforming your image...</p>
            <p className="text-sm text-gray-500 mt-1">This may take up to a minute</p>
          </div>
        ) : resultUrl ? (
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={resultUrl} 
            alt="Result" 
            className="max-h-[230px] object-contain rounded-lg shadow"
          />
        ) : (
          <div className="text-center text-gray-500">
            <svg className="mx-auto h-16 w-16 text-ghibli-blue opacity-30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">Your Ghibli-style image will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageResult;
