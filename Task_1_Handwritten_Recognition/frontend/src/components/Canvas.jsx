import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Trash2, Wand2, Upload } from 'lucide-react';

const Canvas = ({ onPredict, isPredicting, mode = 'digits' }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(15);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set white background for MNIST model (which expects white digit on black, we invert later in backend)
    // Actually, MNIST is white digits on black background. So let's draw black on white, and invert.
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'c') clearCanvas();
      if (e.key.toLowerCase() === 'p') handlePredict();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = '#000000'; // Draw in black
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handlePredict = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      onPredict(blob);
    }, 'image/png');
  };

  return (
    <div className="w-full max-w-md mx-auto glassmorphism p-6 rounded-2xl glow-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Upload className="w-5 h-5 text-neon-blue" />
          {mode === 'digits' ? 'Draw a Digit (0-9)' : 'Draw a Letter (A-Z)'}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Brush:</span>
          <input 
            type="range" 
            min="5" 
            max="30" 
            value={brushSize} 
            onChange={(e) => setBrushSize(e.target.value)}
            className="w-24 accent-neon-violet"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden border-2 border-slate-700 shadow-inner mb-4 flex justify-center">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair touch-none"
        />
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={clearCanvas}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-600 font-medium"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
          Clear (C)
        </button>
        <button 
          onClick={handlePredict}
          disabled={isPredicting}
          className="flex-[2] flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-neon-blue to-neon-violet hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
        >
          {isPredicting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              Predict (P)
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Canvas;
