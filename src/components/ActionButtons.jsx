
import { motion } from 'framer-motion';

const ActionButtons = ({ 
  image, 
  loading, 
  resultUrl, 
  handleSubmit, 
  handleReset, 
  downloadImage 
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!image || loading}
        onClick={handleSubmit}
        className={`px-6 py-2 rounded-full font-medium shadow-md ${
          !image || loading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-ghibli-blue text-white hover:bg-blue-600'
        } transition-colors`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Generate Ghibli Style'
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleReset}
        className="px-6 py-2 rounded-full font-medium border border-gray-300 hover:bg-gray-100 transition-colors shadow-sm"
      >
        Reset
      </motion.button>
      
      {resultUrl && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadImage}
          className="px-6 py-2 rounded-full font-medium bg-ghibli-green text-white hover:bg-green-600 transition-colors shadow-md"
        >
          Download Image
        </motion.button>
      )}
    </div>
  );
};

export default ActionButtons;
