import { useState, useRef } from 'react';

export function MainPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(''); 
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('http://127.0.0.1:8080/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setResult('Oops! We couldn’t analyze the image.');
    } finally {
      setLoading(false);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative h-screen flex flex-col justify-between bg-[#211e1e] text-white">

      <div className="flex flex-1 items-center justify-center mt-20">
        <div className="border border-blue-200 rounded-md p-10 shadow-[0_0_25px_rgba(59,130,246,0.8)] relative z-0">
          <div className="absolute -top-16 -left-16 z-10">
            <img src="/butterfly.gif" alt="Butterfly Animation" className="w-32 h-32" />
          </div>
          <div className="flex flex-col items-center text-center max-w-sm w-full">
            <h2 className="text-3xl font-bold mb-6">Upload Skin Image</h2>

            <div className="mb-6 flex items-center space-x-3">
              <button
                type="button"
                onClick={openFileDialog}
                className="text-sm text-purple-400 hover:text-purple-600 border border-gray-500 rounded-md px-3 py-2 font-medium focus:outline-none cursor-pointer hover:border-blue-300 transition"
              >
                Upload Image
              </button>

              <span className="text-sm text-gray-300 truncate max-w-xs">
                {image ? image.name : 'No file chosen'}
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-36 h-36 object-cover rounded-xl shadow mb-6"
              />
            )}

            <button
              onClick={handleAnalyze}
              disabled={!image || loading}
              className={`bg-[#1a1a1a] text-white px-5 py-2 rounded-md border border-gray-500 hover:border-blue-300 transition ${
                (!image || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {loading ? 'Analyzing...' : 'Analyze Image'}
            </button>

            {result && (
              <div className="mt-6 text-xl font-semibold text-gray-300">
                {result}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-400 px-9 py-8">
        <p>© 2025 Skin Scan | Not a replacement for professional diagnosis.</p>
        <p>Made with 💜 by Esha & Arooj</p>
      </footer>
    </div>
  );
}
