import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Eraser, Trash2, Wand2, Undo, Redo, Grid, Sliders } from 'lucide-react';

const Canvas = ({ onPredict, isPredicting, mode = 'digits' }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(15);
  const [isEraser, setIsEraser] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  
  // Undo/Redo Stacks
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set white background for MNIST/EMNIST model helper
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Push initial blank state to undo stack
    setUndoStack([canvas.toDataURL()]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'c') clearCanvas();
      if (e.key.toLowerCase() === 'p') handlePredict();
      if (e.key.toLowerCase() === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleUndo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoStack, redoStack]);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const snapshot = canvas.toDataURL();
    setUndoStack(prev => [...prev, snapshot]);
    setRedoStack([]); // Clear redo stack on new action
  };

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
    ctx.strokeStyle = isEraser ? '#ffffff' : '#000000';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasState();
    }
  };

  const handleUndo = () => {
    if (undoStack.length <= 1) return; // Keep blank initial state

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const currentSnapshot = undoStack[undoStack.length - 1];
    const previousSnapshot = undoStack[undoStack.length - 2];
    
    // Move current state to redo stack
    setRedoStack(prev => [...prev, currentSnapshot]);
    setUndoStack(prev => prev.slice(0, -1));
    
    // Draw previous state
    const img = new Image();
    img.src = previousSnapshot;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const nextSnapshot = redoStack[redoStack.length - 1];
    
    setUndoStack(prev => [...prev, nextSnapshot]);
    setRedoStack(prev => prev.slice(0, -1));
    
    const img = new Image();
    img.src = nextSnapshot;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Push new cleared state
    saveCanvasState();
  };

  const handlePredict = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      onPredict(blob, canvas.toDataURL());
    }, 'image/png');
  };


  return (
    <div className="w-full max-w-md mx-auto glassmorphism p-6 rounded-3xl glow-border">
      
      {/* Title block */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-md font-bold text-slate-200 tracking-wide uppercase">
          {mode === 'digits' ? 'Draw Digit (0-9)' : 'Draw Letter (A-Z)'}
        </h3>
        
        {/* Toggleable Dot Grid Button */}
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-2 rounded-xl border transition-all ${
            showGrid 
              ? 'bg-slate-900 border-neon-blue/30 text-neon-blue' 
              : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
          }`}
          title="Toggle Grid Guide"
        >
          <Grid className="w-4 h-4" />
        </button>
      </div>
      
      {/* Custom Drawing Toolbar */}
      <div className="flex items-center justify-between gap-2 mb-4 bg-slate-950 p-2 rounded-2xl border border-slate-900">
        
        {/* Pen/Eraser Segmented Control */}
        <div className="flex bg-slate-900 p-1 rounded-xl">
          <button
            onClick={() => setIsEraser(false)}
            className={`p-2.5 rounded-lg transition-all ${
              !isEraser 
                ? 'bg-gradient-to-r from-neon-blue to-neon-violet text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Pen Tool"
          >
            <PenTool className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsEraser(true)}
            className={`p-2.5 rounded-lg transition-all ${
              isEraser 
                ? 'bg-gradient-to-r from-neon-blue to-neon-violet text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Eraser Tool"
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-slate-800 mx-1"></div>

        {/* Undo/Redo Controls */}
        <div className="flex gap-1.5">
          <button
            onClick={handleUndo}
            disabled={undoStack.length <= 1}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:border-slate-800 disabled:pointer-events-none transition-all"
            title="Undo stroke (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:border-slate-800 disabled:pointer-events-none transition-all"
            title="Redo stroke"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas wrapper */}
      <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-6 flex justify-center items-center group">
        
        {/* Dot-Grid guide overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] bg-[size:16px_16px] z-10"></div>
        )}

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
          className="cursor-crosshair touch-none relative z-0 bg-white"
        />
        
        {/* Canvas border hover glow */}
        <div className="absolute inset-0 border border-transparent group-hover:border-neon-blue/20 rounded-2xl pointer-events-none transition-all duration-300"></div>
      </div>

      {/* Brush Settings */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Sliders className="w-4 h-4 text-neon-blue" />
          <span className="text-xs font-bold uppercase tracking-wider">Thickness</span>
        </div>
        
        <div className="flex-grow flex items-center gap-4">
          <input 
            type="range" 
            min="6" 
            max="32" 
            value={brushSize} 
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-full accent-neon-blue h-1 bg-slate-800 rounded-lg cursor-pointer"
          />
          
          {/* Live Brush Size SVG preview circle */}
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 shrink-0">
            <span 
              className="rounded-full bg-slate-200 transition-all duration-75"
              style={{ 
                width: `${Math.max(4, brushSize)}px`, 
                height: `${Math.max(4, brushSize)}px`,
                backgroundColor: isEraser ? '#ffffff' : 'var(--color-accent-1)' 
              }}
            ></span>
          </div>
        </div>
      </div>
      
      {/* Primary Action Buttons */}
      <div className="flex gap-3">
        <button 
          onClick={clearCanvas}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-800 font-bold text-slate-300 text-sm"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
          Clear (C)
        </button>
        <button 
          onClick={handlePredict}
          disabled={isPredicting}
          className="flex-[2] relative group overflow-hidden rounded-xl font-bold disabled:opacity-50 text-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-violet group-hover:opacity-90 transition-opacity"></div>
          <span className="relative flex items-center justify-center gap-2 py-3.5 px-4 text-white">
            {isPredicting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Analyze Input (P)
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Canvas;

