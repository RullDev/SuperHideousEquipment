import { useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

const GhibliImageConverter = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
        setError('Only JPEG/PNG formats are supported!');
        return;
      }

      setError(null);
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultUrl(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    multiple: false
  });

  const handleSubmit = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = async () => {
        const base64Image = reader.result;

        const payload = {
          imageUrl: base64Image
        };

        try {
          const { data } = await axios.post(
            '/api/transform-ghibli',
            payload,
            {
              headers: {
                'Content-Type': 'application/json'
              },
              timeout: 60000
            }
          );

          if (data?.success && data?.result) {
            setResultUrl(data.result);
          } else {
            throw new Error('Failed to process image');
          }
        } catch (err) {
          console.error('Error:', err);
          let errorMessage = 'Failed to process image';
          if (err.response) {
            errorMessage += ` (${err.response.status})`;
            if (err.response.data?.message) {
              errorMessage += `: ${err.response.data.message}`;
            }
          } else {
            errorMessage += `: ${err.message}`;
          }
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      };
    } catch (err) {
      console.error('Error reading file:', err);
      setError('Error reading file: ' + err.message);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreviewUrl(null);
    setResultUrl(null);
    setError(null);
  };

  const downloadImage = () => {
    if (resultUrl) {
      const link = document.createElement('a');
      link.href = resultUrl;
      link.download = 'ghibli-style-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="p-6 sm:p-8">
          <h2 className="text-3xl font-fantasy font-bold text-ghibli-blue mb-6 text-center">
            Ghibli Style Image Generator
          </h2>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            >
              {error}
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-6 mb-4 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[250px] ${
                  isDragActive ? 'border-ghibli-blue bg-blue-50' : 'border-gray-300 hover:border-ghibli-blue'
                } ${previewUrl ? 'bg-gray-50' : ''}`}
              >
                <input {...getInputProps()} ref={fileInputRef} />

                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-[230px] object-contain" 
                  />
                ) : (
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="mb-2"
                    >
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <p className="text-gray-600">
                      {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Only JPG/PNG formats are supported</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!image || loading}
                  onClick={handleSubmit}
                  className={`px-6 py-2 rounded-full font-medium ${
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
                  className="px-6 py-2 rounded-full font-medium border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  Reset
                </motion.button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="border-2 rounded-lg p-4 w-full min-h-[250px] bg-gray-50 flex items-center justify-center mb-4">
                {loading ? (
                  <div className="text-center p-8">
                    <div className="inline-block animate-bounce bg-ghibli-blue w-4 h-4 rounded-full mx-1 delay-0"></div>
                    <div className="inline-block animate-bounce bg-ghibli-green w-4 h-4 rounded-full mx-1 delay-150"></div>
                    <div className="inline-block animate-bounce bg-ghibli-yellow w-4 h-4 rounded-full mx-1 delay-300"></div>
                    <p className="text-gray-600 mt-4">Transforming your image...</p>
                    <p className="text-sm text-gray-500 mt-1">This may take up to a minute</p>
                  </div>
                ) : resultUrl ? (
                  <motion.img 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={resultUrl} 
                    alt="Result" 
                    className="max-h-[230px] object-contain"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <p>Your Ghibli-style image will appear here</p>
                  </div>
                )}
              </div>

              {resultUrl && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadImage}
                  className="px-6 py-2 rounded-full font-medium bg-ghibli-green text-white hover:bg-green-600 transition-colors"
                >
                  Download Image
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        <p>Powered by Ghibli AI. Create beautiful Studio Ghibli style images from your photos.</p>
      </motion.div>
    </div>
  );
};

export default GhibliImageConverter;