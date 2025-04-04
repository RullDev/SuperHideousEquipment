
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { Buffer } from 'buffer';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit to handle large images

// Ghibli AI transformation endpoint
app.post('/api/transform-ghibli', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ 
        success: false, 
        message: 'Image URL is required' 
      });
    }

    // Send to Ghibli AI service
    const { data } = await axios.post(
      'https://ghibliai-worker.ahmadjandal.workers.dev/generate',
      { imageUrl },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 1 minute timeout
      }
    );

    if (!data?.result) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to process image' 
      });
    }

    // Return the result
    return res.json({ 
      success: true, 
      result: data.result 
    });
    
  } catch (error) {
    console.error('Error processing image:', error);
    
    let errorMessage = 'Error processing image';
    if (error.response) {
      errorMessage += ` (${error.response.status})`;
      if (error.response.data?.message) {
        errorMessage += `: ${error.response.data.message}`;
      }
    } else if (error.message) {
      errorMessage += `: ${error.message}`;
    }
    
    return res.status(500).json({ 
      success: false, 
      message: errorMessage 
    });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
