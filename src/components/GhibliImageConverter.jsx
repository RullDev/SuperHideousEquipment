import { useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import ImageUploader from './ImageUploader';
import ImageResult from './ImageResult';
import ActionButtons from './ActionButtons';

const GhibliImageConverter = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // These are dummy props since we're not using react-dropzone anymore
  const getRootProps = () => ({});
  const getInputProps = () => ({});
  const isDragActive = false;

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
              <ImageUploader 
                onDrop={onDrop}
                previewUrl={previewUrl}
                isDragActive={isDragActive}
                getInputProps={getInputProps}
                getRootProps={getRootProps}
              />
            </div>

            <div className="flex flex-col">
              <ImageResult 
                loading={loading}
                resultUrl={resultUrl}
              />
            </div>
          </div>

          <ActionButtons 
            image={image}
            loading={loading}
            resultUrl={resultUrl}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            downloadImage={downloadImage}
          />
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