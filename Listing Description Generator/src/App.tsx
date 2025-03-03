import React, { useState } from 'react';
import { Send, Loader2, Home, Copy, CheckCheck } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
    features: '',
    tone: 'professional'
  });

  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const prompt = `Write a compelling rental listing description for a ${formData.propertyType} with ${formData.bedrooms} bedrooms and ${formData.bathrooms} bathrooms located in ${formData.location}. Key features include: ${formData.features}. The tone should be ${formData.tone}.`;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are a professional real estate copywriter who specializes in creating compelling rental property descriptions.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Error generating description');
      }
      
      setDescription(data.choices[0].message.content.trim());
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate description. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 flex items-center gap-3" style={{ backgroundColor: '#80cb27' }}>
            <Home className="text-white h-8 w-8" />
            <h1 className="text-2xl font-bold text-white">Free Rental Listing Description Generator from Utility Profit</h1>
          </div>
          
          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Property Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select property type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="Single-Family Home">Single-Family Home</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Studio">Studio</option>
                    <option value="Loft">Loft</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      id="bedrooms"
                      name="bedrooms"
                      min="0"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      id="bathrooms"
                      name="bathrooms"
                      min="0"
                      step="0.5"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location (City, Neighborhood)
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Downtown Seattle"
                  />
                </div>
                
                <div>
                  <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1">
                    Key Features
                  </label>
                  <textarea
                    id="features"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., hardwood floors, updated kitchen, pool, garage, etc."
                  />
                </div>
                
                <div>
                  <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">
                    Tone
                  </label>
                  <select
                    id="tone"
                    name="tone"
                    value={formData.tone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="luxury">Luxury</option>
                    <option value="friendly">Friendly</option>
                    <option value="modern">Modern</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-70"
                  style={{ backgroundColor: loading ? '#6b9e1f' : '#80cb27', borderColor: '#80cb27' }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Generate Description
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Results Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Generated Description</h2>
              
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                  {error}
                </div>
              )}
              
              <div className={`bg-gray-50 border ${description ? 'border-indigo-200' : 'border-gray-200'} rounded-md p-4 h-[350px] overflow-y-auto`}>
                {description ? (
                  <div className="relative">
                    <p className="text-gray-800 whitespace-pre-line">{description}</p>
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-0 right-0 p-2 text-gray-500 hover:text-indigo-600"
                      title="Copy to clipboard"
                    >
                      {copied ? <CheckCheck className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    Your generated property description will appear here...
                  </p>
                )}
              </div>
              
              {description && (
                <div className="text-sm text-gray-600">
                  <p>
                    This description was generated using AI and may need minor edits for accuracy.
                    Always verify details before publishing.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              © 2025 Rental Listing Description Generator | Powered by Utility Profit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;