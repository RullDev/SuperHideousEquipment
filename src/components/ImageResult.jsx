
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
            <p className="mt-2">Your Ghibli-style image will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageResult;
