
import { motion } from 'framer-motion';

const ActionButtons = ({ 
  image, 
  loading, 
  resultUrl, 
  handleSubmit, 
  handleReset, 
  downloadImage,
  previewUrl
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        disabled={!image || loading}
        className={`px-6 py-3 rounded-lg font-medium text-white shadow-lg transition-all ${
          !image || loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-ghibli-blue hover:bg-blue-600'
        } transform hover:-translate-y-1`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : 'Transform to Ghibli Style'}
      </motion.button>
      
      {(previewUrl || resultUrl) && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-lg transform hover:-translate-y-1 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Reset
        </motion.button>
      )}
      
      {resultUrl && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadImage}
          className="px-6 py-3 rounded-lg font-medium bg-ghibli-green hover:bg-green-600 text-white shadow-lg transform hover:-translate-y-1 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Image
        </motion.button>
      )}
    </div>
  );
};

export default ActionButtons;
