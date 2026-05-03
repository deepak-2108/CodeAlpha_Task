import React, { useCallback, useState } from 'react';
import { Upload as UploadIcon, Image as ImageIcon, X } from 'lucide-react';

const Upload = ({ onPredict, isPredicting }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    // Check if it's an image
    if (!selectedFile.type.match('image/jpeg') && !selectedFile.type.match('image/png') && !selectedFile.type.match('image/jpg')) {
      alert("Please upload a valid image file (JPEG/PNG).");
      return;
    }
    
    setFile(selectedFile);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const submitPrediction = () => {
    if (file) {
      onPredict(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto glassmorphism p-6 rounded-2xl glow-border">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <ImageIcon className="w-5 h-5 text-neon-violet" />
        Upload an Image
      </h3>
      
      {!preview ? (
        <div 
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive ? 'border-neon-blue bg-neon-blue/10' : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            accept="image/jpeg, image/png, image/jpg" 
            onChange={handleChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <UploadIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-300 font-medium mb-1">Drag and drop an image</p>
          <p className="text-sm text-slate-500">or click to browse (JPEG, PNG)</p>
        </div>
      ) : (
        <div className="relative border-2 border-slate-600 rounded-xl overflow-hidden bg-slate-800/50 flex flex-col items-center justify-center p-4">
          <button 
            onClick={clearFile}
            className="absolute top-2 right-2 p-1 bg-slate-900/80 rounded-full hover:bg-slate-700 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
          <img src={preview} alt="Preview" className="max-h-48 object-contain rounded-md" />
        </div>
      )}
      
      <div className="mt-4">
        <button 
          onClick={submitPrediction}
          disabled={!file || isPredicting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-neon-blue to-neon-violet hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
        >
          {isPredicting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Predict Image'
          )}
        </button>
      </div>
    </div>
  );
};

export default Upload;
