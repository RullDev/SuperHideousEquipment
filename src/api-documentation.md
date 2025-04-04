
# Ghibli Image Transformer API Documentation

This API allows you to transform ordinary images into the beautiful and distinctive style of Studio Ghibli animations.

## Base URL

```
https://your-app-url.replit.app
```

## Endpoints

### Transform Image to Ghibli Style

Transforms an uploaded image into Studio Ghibli style using AI.

**URL**: `/api/transform-ghibli`

**Method**: `POST`

**Content-Type**: `application/json`

**Request Body**:

| Parameter | Type   | Description                         | Required |
|-----------|--------|-------------------------------------|----------|
| imageUrl  | string | Base64 encoded image data           | Yes      |

**Example Request**:

```json
{
  "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBD..."
}
```

**Success Response**:

**Code**: `200 OK`

**Content**:

```json
{
  "success": true,
  "result": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA..."
}
```

**Error Response**:

**Code**: `400 BAD REQUEST` or `500 INTERNAL SERVER ERROR`

**Content**:

```json
{
  "success": false,
  "message": "Error message details"
}
```

## Rate Limits and Constraints

- Maximum image size: 5MB
- Supported formats: JPEG and PNG
- Processing time: Approximately 30-60 seconds per image
- Rate limit: 10 requests per hour per IP address

## Integration Examples

### JavaScript/React Example

```javascript
import axios from 'axios';

async function transformImage(file) {
  try {
    // Convert file to base64
    const base64Image = await readFileAsBase64(file);
    
    // API request
    const response = await axios.post('/api/transform-ghibli', {
      imageUrl: base64Image
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 60000 // 1 minute timeout
    });
    
    if (response.data.success) {
      return response.data.result;
    } else {
      throw new Error('Failed to process image');
    }
  } catch (error) {
    console.error('Error transforming image:', error);
    throw error;
  }
}

// Helper function to read file as base64
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
```

### Python Example

```python
import requests
import base64

def transform_image(image_path):
    # Read and encode image
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    
    # Prepare the image URL with proper format
    image_url = f"data:image/jpeg;base64,{encoded_string}"
    
    # Make API request
    response = requests.post(
        "https://your-app-url.replit.app/api/transform-ghibli",
        json={"imageUrl": image_url},
        timeout=60
    )
    
    # Process response
    if response.status_code == 200:
        result = response.json()
        if result.get("success"):
            return result.get("result")
    
    # Handle errors
    raise Exception(f"Error: {response.json().get('message', 'Unknown error')}")
```

### Node.js Server-Side Example

```javascript
const fs = require('fs');
const axios = require('axios');
const path = require('path');

async function transformImage(imagePath) {
  try {
    // Read file and convert to base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    
    // Make API request
    const response = await axios.post('https://your-app-url.replit.app/api/transform-ghibli', {
      imageUrl: base64Image
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 60000
    });
    
    if (response.data.success) {
      // Save the result image
      const base64Data = response.data.result.split(',')[1];
      const outputPath = path.join(__dirname, 'ghibli-output.png');
      fs.writeFileSync(outputPath, Buffer.from(base64Data, 'base64'));
      return outputPath;
    } else {
      throw new Error(response.data.message || 'Failed to process image');
    }
  } catch (error) {
    console.error('Error transforming image:', error);
    throw error;
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400  | Missing image URL or invalid format |
| 413  | Image size too large (>5MB) |
| 415  | Unsupported image format |
| 429  | Rate limit exceeded |
| 500  | Internal server error |
| 504  | Processing timeout |

## Credits

Powered by Ghibli AI API
