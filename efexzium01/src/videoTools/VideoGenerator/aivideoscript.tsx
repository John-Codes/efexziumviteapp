import React, { useState } from 'react';

const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [script, setScript] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const geminiApiKey = 'AIzaSyDhj6vZRMTraVDXN12yOyVZ4oaZJADFEbQ';

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = JSON.stringify({ title, description, tags, script });
      const fullPrompt = `${prompt}\n\nCurrent Data:\n${data}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a helpful assistant that edits JSON data. Please respond with a valid JSON object containing the updated title, description, tags, and script based on the following prompt: ${fullPrompt}. Ensure the response is in this format: { "title": "...", "description": "...", "tags": "...", "script": "..." }`
            }]
          }]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch response from Gemini API: ${errorData.error?.message || response.statusText}`);
      }

      const result = await response.json();
      const generatedText = result.candidates[0]?.content?.parts[0]?.text;

      if (!generatedText) {
        throw new Error('No text was generated from the Gemini API');
      }

      try {
        const parsedData = JSON.parse(generatedText);
        setTitle(parsedData.title || '');
        setDescription(parsedData.description || '');
        setTags(parsedData.tags || '');
        setScript(parsedData.script || '');
      } catch (parseError) {
        throw new Error('Invalid JSON response from Gemini API');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 p-6 text-white">
      
      <div className="max-w-4xl mx-auto bg-gray-700 p-8 rounded-lg shadow-md mt-16">
        <h1 className="text-3xl font-bold mb-6 text-white">Content Editor</h1>

        {/* Title Input */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            placeholder="Enter title..."
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            rows={4}
            placeholder="Enter description..."
          />
        </div>

        {/* Tags Input */}
        <div className="mb-6">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            placeholder="Enter tags (comma separated)..."
          />
        </div>

        {/* Script Input */}
        <div className="mb-6">
          <label htmlFor="script" className="block text-sm font-medium text-gray-300 mb-2">Script</label>
          <textarea
            id="script"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            rows={8}
            placeholder="Enter script..."
          />
        </div>


        {/* Prompt Input */}
        <div className="mb-6">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">Prompt</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            rows={4}
            placeholder="Enter your prompt to edit the content..."
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default App;
