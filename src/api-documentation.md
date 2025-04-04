
# Ghibli Image Transformer API

![Studio Ghibli Style](https://i.imgur.com/sample-image.jpg)

> Transform ordinary images into the beautiful and distinctive style of Studio Ghibli animations with our AI-powered API.

## 🚀 Quick Start

```bash
# Example using curl
curl -X POST \
  https://your-app-url.replit.app/api/transform-ghibli \
  -H 'Content-Type: application/json' \
  -d '{"imageUrl":"data:image/jpeg;base64,/9j/4AAQSkZJRg..."}'
```

## 📋 API Reference

### Transform Image to Ghibli Style

```http
POST /api/transform-ghibli
```

Transforms an uploaded image into Studio Ghibli style using AI.

#### Request

| Parameter | Type   | Description                   | Required |
|-----------|--------|-------------------------------|----------|
| `imageUrl`| string | Base64 encoded image data     | Yes      |

**Example Request Body:**

```json
{
  "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBD..."
}
```

#### Responses

**Success Response:**

```http
Status: 200 OK
```

```json
{
  "success": true,
  "result": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA..."
}
```

**Error Response:**

```http
Status: 400 BAD REQUEST
```

```json
{
  "success": false,
  "message": "Missing or invalid image data"
}
```

## 🛠️ Usage Examples

### JavaScript (Browser)

```javascript
async function transformImage(file) {
  try {
    // Convert file to base64
    const base64Image = await readFileAsBase64(file);
    
    // Send request to API
    const response = await fetch('/api/transform-ghibli', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imageUrl: base64Image })
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.result; // Base64 image result
    } else {
      throw new Error(data.message || 'Failed to transform image');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Helper function to convert file to base64
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
```

### Python

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

### Node.js

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

## ⚙️ Technical Specifications

| Property                | Value                         |
|-------------------------|-------------------------------|
| Maximum image size      | 5MB                           |
| Supported formats       | JPEG, PNG                     |
| Processing time         | 30-60 seconds                 |
| Rate limit              | 10 requests per hour per IP   |
| Response format         | JSON with Base64 image data   |

## 🔍 Error Codes

| Code | Description                         |
|------|-------------------------------------|
| 400  | Missing image URL or invalid format |
| 413  | Image size too large (>5MB)         |
| 415  | Unsupported image format            |
| 429  | Rate limit exceeded                 |
| 500  | Internal server error               |
| 504  | Processing timeout                  |

## 📝 Notes

- The transformation process uses AI to analyze and convert your image into a Ghibli-style artwork
- Processing time may vary depending on server load and image complexity
- For optimal results, use clear images with good lighting and minimal background clutter

## 🔒 Security

The API only accepts valid JPEG or PNG images encoded in base64 format. All image data is processed securely and is not stored on our servers after processing is complete.

## 🎨 Credits

Powered by the Ghibli AI API. Inspired by the timeless and magical art style of Studio Ghibli films.
