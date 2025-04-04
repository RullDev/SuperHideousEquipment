
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
        className={`px-6 py-3 rounded-lg font-medium text-white shadow-md transition-colors ${
          !image || loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-ghibli-blue hover:bg-blue-600'
        }`}
      >
        {loading ? 'Processing...' : 'Transform to Ghibli Style'}
      </motion.button>
      
      {(previewUrl || resultUrl) && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-md ${
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
          className="px-6 py-3 rounded-lg font-medium bg-ghibli-green hover:bg-green-600 text-white shadow-md"
        >
          Download Image
        </motion.button>
      )}
    </div>
  );
};

export default ActionButtons;
