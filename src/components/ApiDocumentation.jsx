
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeBlock = ({ language, children }) => (
  <div className="bg-gray-800 rounded-md overflow-x-auto my-3">
    <pre className="p-4 text-sm text-gray-100 font-mono">
      <code className={`language-${language}`}>
        {children}
      </code>
    </pre>
  </div>
);

const ApiDocumentation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'endpoints', label: 'Endpoints' },
    { id: 'examples', label: 'Examples' },
    { id: 'limits', label: 'Limits & Specs' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-16 max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
        <div 
          className="p-5 bg-gradient-to-r from-ghibli-blue to-ghibli-green flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h2 className="text-xl font-bold text-white">API Documentation</h2>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto p-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 mx-1 font-medium rounded-md transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-ghibli-blue text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-ghibli-blue/10 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ghibli-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Ghibli Image Transformer API</h3>
                    </div>
                    
                    <p className="text-gray-600">
                      Transform ordinary images into the beautiful and distinctive style of Studio Ghibli animations with our AI-powered API.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">Base URL</h4>
                      <CodeBlock language="bash">
                        https://your-app-url.replit.app
                      </CodeBlock>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <h4 className="font-semibold text-blue-700">Features</h4>
                        </div>
                        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                          <li>AI-powered image transformation</li>
                          <li>Fast processing (30-60 seconds)</li>
                          <li>Simple RESTful API</li>
                          <li>Secure data handling</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                          <h4 className="font-semibold text-green-700">Integration</h4>
                        </div>
                        <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                          <li>JavaScript/React support</li>
                          <li>Python compatibility</li>
                          <li>Node.js examples</li>
                          <li>Simple cURL requests</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'endpoints' && (
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-ghibli-green/10 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ghibli-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Transform Image to Ghibli Style</h3>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">POST</span>
                        <span className="font-mono text-sm">/api/transform-ghibli</span>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold mt-6 mb-2 text-gray-700">Request Body</h4>
                    <CodeBlock language="json">
{`{
  "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZ..." // Base64 encoded image
}`}
                    </CodeBlock>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-700">Success Response (200 OK)</h4>
                        <CodeBlock language="json">
{`{
  "success": true,
  "result": "data:image/png;base64,iVBOR..." // Base64 encoded transformed image
}`}
                        </CodeBlock>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-700">Error Response</h4>
                        <CodeBlock language="json">
{`{
  "success": false,
  "message": "Error message details"
}`}
                        </CodeBlock>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <h4 className="font-semibold text-orange-700">Error Codes</h4>
                      </div>
                      <ul className="list-disc list-inside text-sm text-orange-700 space-y-1">
                        <li><span className="font-semibold">400</span> - Missing image URL or invalid format</li>
                        <li><span className="font-semibold">413</span> - Image size too large (>5MB)</li>
                        <li><span className="font-semibold">415</span> - Unsupported image format</li>
                        <li><span className="font-semibold">429</span> - Rate limit exceeded</li>
                        <li><span className="font-semibold">500</span> - Internal server error</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {activeTab === 'examples' && (
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Integration Examples</h3>
                    </div>
                    
                    <div className="mb-8">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100">
                          <span className="text-yellow-700 font-bold text-sm">JS</span>
                        </div>
                        <h4 className="font-semibold text-gray-700">JavaScript/React Example</h4>
                      </div>
                      <CodeBlock language="javascript">
{`async function transformImage(file) {
  // Convert file to base64
  const base64Image = await convertToBase64(file);
  
  // Make API request
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
    throw new Error(data.message || 'Failed to process image');
  }
}

// Helper function to convert file to base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}`}
                      </CodeBlock>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                          <span className="text-blue-700 font-bold text-sm">PY</span>
                        </div>
                        <h4 className="font-semibold text-gray-700">Python Example</h4>
                      </div>
                      <CodeBlock language="python">
{`import requests
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
    raise Exception(f"Error: {response.json().get('message', 'Unknown error')}")`}
                      </CodeBlock>
                    </div>
                  </div>
                )}
                
                {activeTab === 'limits' && (
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-red-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Technical Specifications</h3>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700">Property</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700">Value</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 text-sm text-gray-600">Maximum image size</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">5MB</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-gray-600">Supported formats</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">JPEG, PNG</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-gray-600">Processing time</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">~30-60 seconds</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-gray-600">Rate limit</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">10 requests/hour/IP</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-gray-600">Response format</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">JSON with Base64 image</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="font-semibold text-blue-700">Tips for Best Results</h4>
                      </div>
                      <ul className="list-disc list-inside text-sm text-blue-700 space-y-1 ml-2">
                        <li>Use clear images with good lighting</li>
                        <li>Landscapes and nature scenes work particularly well</li>
                        <li>Avoid images with too many small details</li>
                        <li>For better performance, resize large images before uploading</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ApiDocumentation;
