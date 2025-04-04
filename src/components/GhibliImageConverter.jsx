import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ImageUploader from './ImageUploader';
import ImageResult from './ImageResult';
import ActionButtons from './ActionButtons';

const GhibliImageConverter = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState('');
  const [uploadedCount, setUploadedCount] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);

  const handleReset = () => {
    setImage(null);
    setResultUrl('');
  };

  const handleSubmit = async () => {
    if (!image) return;

    try {
      setLoading(true);

      // Create form data for API request
      const formData = new FormData();
      formData.append('image', image);

      // Use the local API endpoint
      const response = await axios.post('/api/transform-ghibli', {
        imageUrl: await convertToBase64(image)
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000 
      });

      if (response.data && response.data.result) {
        setResultUrl(response.data.result);
        setProcessedCount(prev => prev + 1);
      } else {
        console.error('Invalid response:', response.data);
        alert('Failed to transform image. Please try again.');
      }
    } catch (error) {
      console.error('Error transforming image:', error);
      alert('Error: ' + (error.response?.data?.message || error.message || 'Failed to transform image'));
    } finally {
      setLoading(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const downloadImage = () => {
    if (!resultUrl) return;

    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = 'ghibli-style-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageChange = (newImage) => {
    setImage(newImage);
    if (newImage) {
      setUploadedCount(prev => prev + 1);
    }
  };

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="neoxr-card p-5 max-w-xl mx-auto"  {/* Added max-width for neater layout */}
        >
          <div className="flex items-center mb-4">
            <div className="neoxr-icon text-yellow-400 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">UPLOAD</h2> {/*Simplified header text*/}
              <p className="text-gray-400 mono-font">{uploadedCount.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          <ImageUploader onImageChange={handleImageChange} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="neoxr-card p-5 max-w-xl mx-auto" {/* Added max-width for neater layout */}
        >
          <div className="flex items-center mb-4">
            <div className="neoxr-icon text-yellow-400 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">RESULT</h2>
              <p className="text-gray-400 mono-font">{processedCount.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          <ImageResult loading={loading} resultUrl={resultUrl} />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="neoxr-card p-5 max-w-3xl mx-auto" {/* Added max-width for neater layout */}
      >
        <div className="flex items-center mb-4"> {/*Simplified header structure */}
          <h2 className="text-xl font-bold text-white">How it works</h2> {/*Simplified header text*/}
        </div>

        <div className="pl-4 border-l-2 border-yellow-400/20 mb-4">
          <p className="text-gray-300 text-sm">
            This service transforms regular photos into the beautiful Studio Ghibli art style.
            Upload an image, click transform, and download your Ghibli-style creation.
          </p>
        </div>

        <ActionButtons 
          image={image}
          loading={loading}
          resultUrl={resultUrl}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          downloadImage={downloadImage}
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="neoxr-card p-5 max-w-xl mx-auto" {/* Added max-width for neater layout */}
      >
        <h2 className="text-xl font-bold text-white mb-1">Recent Updates</h2> {/*Simplified header text*/}
        <div className="h-1 w-8 bg-yellow-400 mb-4"></div> {/* Added margin for better spacing */}

        <div className="mt-6 relative">
          <div className="timeline-line"></div>

          <div className="pl-6 relative mb-6">
            <div className="timeline-dot"></div>
            <div className="neoxr-card p-3 bg-opacity-50">
              <p className="text-gray-400 mono-font text-sm">{new Date().toLocaleDateString()} - {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}</p>
              <p className="text-gray-300">[New] Ghibli style transformation engine 🚀</p>
            </div>
          </div>

          <div className="pl-6 relative">
            <div className="timeline-dot"></div>
            <div className="neoxr-card p-3 bg-opacity-50">
              <p className="text-gray-400 mono-font text-sm">{new Date().toLocaleDateString()} - {new Date().getHours()-1}:{String(new Date().getMinutes()).padStart(2, '0')}</p>
              <p className="text-gray-300">[Fix] Image processing optimization ✨</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GhibliImageConverter;