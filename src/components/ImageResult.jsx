import { motion } from 'framer-motion';

const ImageResult = ({ loading, resultUrl }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="image-container w-full min-h-[200px] flex items-center justify-center mb-4 overflow-hidden">
        {loading ? (
          <div className="text-center p-6">
            <div className="flex justify-center space-x-2 mb-3">
              <div className="inline-block animate-bounce bg-yellow-400 w-3 h-3 rounded-full delay-0"></div>
              <div className="inline-block animate-bounce bg-yellow-400 w-3 h-3 rounded-full delay-150"></div>
              <div className="inline-block animate-bounce bg-yellow-400 w-3 h-3 rounded-full delay-300"></div>
            </div>
            <p className="text-gray-400 text-sm mb-2 mono-font">Processing image...</p>
            <div className="w-48 h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 30, repeat: Infinity }}
              />
            </div>
          </div>
        ) : resultUrl ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img 
              src={resultUrl} 
              alt="Transformed Ghibli-style"
              className="max-w-full max-h-48 object-contain rounded-lg" 
            />
          </motion.div>
        ) : (
          <div className="text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-400 text-sm">Transform result will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageResult;