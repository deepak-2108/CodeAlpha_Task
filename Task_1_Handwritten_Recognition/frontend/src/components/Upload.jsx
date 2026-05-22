import React, { useCallback, useState } from 'react';
import { Upload as UploadIcon, FileText, Image as ImageIcon, X, Sparkles, FileImage } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Upload = ({ onPredict, isPredicting, mode = 'digits' }) => {
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
    if (!selectedFile.type.match('image/jpeg') && !selectedFile.type.match('image/png') && !selectedFile.type.match('image/jpg')) {
      alert("Please upload a valid image file (JPEG/PNG).");
      return;
    }
    
    setFile(selectedFile);
    
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

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 1;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const submitPrediction = () => {
    if (file) {
      onPredict(file, preview);
    }
  };


  return (
    <div className="w-full max-w-md mx-auto glassmorphism p-6 rounded-3xl glow-border">
      <h3 className="text-md font-bold text-slate-200 tracking-wide uppercase mb-6 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-neon-blue" />
        Analyze Image File
      </h3>
      
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div 
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`relative border border-dashed rounded-2xl p-10 text-center transition-all ${
              dragActive 
                ? 'border-neon-blue bg-neon-blue/5 shadow-[0_0_20px_rgba(0,243,255,0.05)]' 
                : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/80'
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
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:border-neon-blue/20">
              <UploadIcon className="w-6 h-6 text-neon-blue" />
            </div>

            <p className="text-slate-300 font-bold text-sm mb-1.5">Drag and drop file here</p>
            <p className="text-xs text-slate-500 mb-4">Accepts PNG, JPG, or JPEG formats</p>
            
            <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 pointer-events-none">
              Browse Files
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/80 p-4 relative"
          >
            {/* Delete button */}
            <button 
              onClick={clearFile}
              className="absolute top-3 right-3 p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors z-30"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Thumbnail Frame */}
            <div className="rounded-xl overflow-hidden bg-white border border-slate-800 flex items-center justify-center p-3 mb-4 shadow-inner">
              <img src={preview} alt="Upload Preview" className="max-h-44 object-contain rounded-md select-none" />
            </div>

            {/* File Metadata */}
            {file && (
              <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                <FileImage className="w-5 h-5 text-neon-blue shrink-0" />
                <div className="flex-grow min-w-0">
                  <p className="text-xs font-bold text-slate-200 truncate">{file.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{formatBytes(file.size)}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-5">
        <button 
          onClick={submitPrediction}
          disabled={!file || isPredicting}
          className="w-full relative group overflow-hidden rounded-xl font-bold disabled:opacity-50 text-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-violet group-hover:opacity-90 transition-opacity"></div>
          <span className="relative flex items-center justify-center gap-2 py-3.5 px-4 text-white">
            {isPredicting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze Uploaded Image
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Upload;

