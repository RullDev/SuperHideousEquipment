
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { Buffer } from 'buffer';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Ghibli transformation endpoint
app.post('/api/transform-ghibli', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image provided' 
      });
    }

    // Forward request to Ghibli AI API
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
    
    if (!data.result) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to process image' 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      result: data.result 
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error',
      error: error.response ? error.response.data : null
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
