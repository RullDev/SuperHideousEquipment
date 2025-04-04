
import { motion } from 'framer-motion';

const ImageResult = ({ loading, resultUrl }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-2 rounded-xl p-4 w-full min-h-[250px] bg-gray-50 flex items-center justify-center mb-4 shadow-md overflow-hidden">
        {loading ? (
          <div className="text-center p-8">
            <div className="flex justify-center space-x-2">
              <div className="inline-block animate-bounce bg-ghibli-blue w-4 h-4 rounded-full delay-0"></div>
              <div className="inline-block animate-bounce bg-ghibli-green w-4 h-4 rounded-full delay-150"></div>
              <div className="inline-block animate-bounce bg-ghibli-yellow w-4 h-4 rounded-full delay-300"></div>
            </div>
            <p className="text-gray-600 mt-4 font-medium">Transforming your image...</p>
            <p className="text-sm text-gray-500 mt-1">This may take up to a minute</p>
            <div className="w-64 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-ghibli-blue to-ghibli-green rounded-full"
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
            className="relative group"
          >
            <img 
              src={resultUrl} 
              alt="Result" 
              className="max-h-[230px] object-contain rounded-lg shadow-lg" 
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <p className="text-white text-center text-sm">Your Ghibli-styled masterpiece</p>
            </motion.div>
          </motion.div>
        ) : (
          <div className="text-center text-gray-500">
            <svg className="mx-auto h-16 w-16 text-ghibli-blue opacity-30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="mt-2">Your Ghibli-styled image will appear here</p>
            <p className="text-xs mt-1 text-ghibli-blue">Experience the magic of Studio Ghibli</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageResult;
