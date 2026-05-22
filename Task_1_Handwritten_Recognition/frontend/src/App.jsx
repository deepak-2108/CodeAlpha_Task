import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Canvas from './components/Canvas';
import Upload from './components/Upload';
import ResultCard from './components/ResultCard';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import { predictImage, checkHealth } from './utils/api';
import toast from 'react-hot-toast';
import { Clock, Trash2, Sparkles, BrainCircuit, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [result, setResult] = useState(null);
  const [canvasImage, setCanvasImage] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');
  const [inputMode, setInputMode] = useState('draw'); // 'draw' or 'upload'
  const [predictionMode, setPredictionMode] = useState('digits'); // 'digits' or 'letters'
  
  // Theme state: 'cyber', 'emerald', 'indigo', 'sunset'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('inkmind-theme') || 'cyber';
  });

  // History state: loaded from localStorage
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('inkmind-history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Synchronize theme to localStorage and body tag
  useEffect(() => {
    localStorage.setItem('inkmind-theme', theme);
  }, [theme]);

  // Synchronize history to localStorage
  useEffect(() => {
    localStorage.setItem('inkmind-history', JSON.stringify(history));
  }, [history]);

  // Check backend health on initial load
  useEffect(() => {
    checkHealth()
      .then(data => {
        setServerStatus(data.status);
        if (data.status === 'model_missing') {
          toast.error("Backend running, but model is missing! Check logs.");
        }
      })
      .catch(() => {
        setServerStatus('offline');
        toast.error("Backend server is unreachable.");
      });
  }, []);

  // Main prediction handler called from Canvas or Upload components
  const handlePredict = async (imageBlob, dataURL) => {
    if (serverStatus !== 'healthy') {
      toast.error("Backend server is not ready.");
      return;
    }
    
    setIsPredicting(true);
    setResult(null);
    setCanvasImage(dataURL);
    
    try {
      const data = await predictImage(imageBlob, predictionMode);
      setResult(data);
      
      // Save to prediction history shelf
      const newHistoryItem = {
        id: Date.now().toString(),
        image: dataURL,
        prediction: data.prediction,
        confidence: data.confidence,
        mode: predictionMode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 7)]); // Keep max 8 items
      toast.success("Prediction complete!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to predict image.");
    } finally {
      setIsPredicting(false);
    }
  };

  const handleTryAgain = () => {
    setResult(null);
    setCanvasImage(null);
  };

  const clearHistory = () => {
    setHistory([]);
    toast.success("History cleared.");
  };

  const removeHistoryItem = (id, e) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(item => item.id !== id));
    toast.success("Record deleted.");
  };

  return (
    <div className={`min-h-screen text-white font-inter relative selection:bg-neon-blue/30 selection:text-neon-blue flex flex-col theme-${theme} bg-[#070b13] transition-colors duration-500`}>
      
      {/* Global dynamic background mesh effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 transition-all duration-700 opacity-60" 
          style={{ backgroundImage: 'var(--color-bg-mesh)' }}
        ></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 flex-grow">
        <Navbar theme={theme} setTheme={setTheme} serverStatus={serverStatus} />
        
        <main>
          <Hero />
          
          <section id="demo" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Controls & Mode selection */}
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-5xl font-black font-poppins mb-6">
                  Live Sandbox
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto mb-8 font-medium">
                  {serverStatus === 'healthy' 
                    ? `Backend Connected. Draw a character or drop an image file below.` 
                    : "Connecting to backend deep learning server..."}
                </p>
                
                {/* Switch Selectors */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  
                  {/* Mode toggle */}
                  <div className="inline-flex bg-slate-950 p-1.5 rounded-2xl border border-slate-900 shadow-xl">
                    <button 
                      onClick={() => setPredictionMode('digits')}
                      className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                        predictionMode === 'digits' 
                          ? 'bg-gradient-to-r from-neon-blue to-neon-violet text-white shadow-lg' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Digits (0-9)
                    </button>
                    <button 
                      onClick={() => setPredictionMode('letters')}
                      className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                        predictionMode === 'letters' 
                          ? 'bg-gradient-to-r from-neon-blue to-neon-violet text-white shadow-lg' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Letters (A-Z)
                    </button>
                  </div>
                  
                  <div className="hidden sm:block w-px h-8 bg-slate-900"></div>

                  {/* Input toggle */}
                  <div className="inline-flex bg-slate-950 p-1.5 rounded-2xl border border-slate-900 shadow-xl">
                    <button 
                      onClick={() => setInputMode('draw')}
                      className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                        inputMode === 'draw' 
                          ? 'bg-slate-900 text-white shadow-lg border border-slate-800' 
                          : 'text-slate-500 hover:text-slate-300 border border-transparent'
                      }`}
                    >
                      Draw Canvas
                    </button>
                    <button 
                      onClick={() => setInputMode('upload')}
                      className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                        inputMode === 'upload' 
                          ? 'bg-slate-900 text-white shadow-lg border border-slate-800' 
                          : 'text-slate-500 hover:text-slate-300 border border-transparent'
                      }`}
                    >
                      File Upload
                    </button>
                  </div>

                </div>
              </div>
              
              {/* Working Demonstration Sandbox */}
              <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto mb-28">
                
                {/* Left Area: Drawing Canvas or Upload drag-drop */}
                <div className="flex flex-col items-center">
                  {inputMode === 'draw' ? (
                    <Canvas onPredict={handlePredict} isPredicting={isPredicting} mode={predictionMode} />
                  ) : (
                    <Upload onPredict={handlePredict} isPredicting={isPredicting} mode={predictionMode} />
                  )}
                </div>
                
                {/* Right Area: Dial gauge predictions or scanner graphics waiting badge */}
                <div className="flex items-center justify-center min-h-[460px]">
                  <AnimatePresence mode="wait">
                    {result ? (
                      <ResultCard key="result" result={result} onTryAgain={handleTryAgain} canvasImage={canvasImage} />
                    ) : (
                      <motion.div 
                        key="placeholder"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center p-10 border border-slate-850 rounded-3xl w-full max-w-md h-[460px] flex flex-col items-center justify-center text-slate-500 bg-slate-950/40 relative overflow-hidden group"
                      >
                        {/* Interactive scanning animation wires */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c101b_1px,transparent_1px),linear-gradient(to_bottom,#0c101b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 z-0"></div>
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-blue to-transparent animate-[bounce_4000ms_infinite] opacity-30"></div>
                        
                        <div className="relative w-20 h-20 rounded-2xl bg-slate-950 border border-slate-900 flex items-center justify-center mb-6 shadow-2xl group-hover:border-neon-blue/20 transition-all duration-300 z-10">
                          <BrainCircuit className="w-8 h-8 text-slate-400 group-hover:text-neon-blue transition-colors duration-300 animate-pulse" />
                        </div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 z-10">Awaiting Signature</h4>
                        <p className="text-xs text-slate-600 max-w-xs leading-relaxed z-10">
                          Input a handwritten letter or digit on the canvas panel and trigger analyze to feed the neural networks.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* History Shelf Dashboard Widget */}
              {history.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-5xl mx-auto bg-slate-950/60 rounded-3xl border border-slate-900 p-8 shadow-2xl mb-24"
                >
                  <div className="flex items-center justify-between pb-5 border-b border-slate-900 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <Clock className="w-5 h-5 text-neon-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-200">Prediction History</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Your most recent neural network classifications</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={clearHistory}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-900 bg-slate-950 hover:bg-slate-900 text-slate-500 hover:text-red-400 text-xs font-bold transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear History
                    </button>
                  </div>
                  
                  {/* History List Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {history.map((item) => (
                      <div 
                        key={item.id}
                        className="group relative flex flex-col bg-slate-950 border border-slate-900 hover:border-slate-800 rounded-2xl p-3.5 transition-all duration-200 cursor-pointer"
                        onClick={() => {
                          setResult({
                            prediction: item.prediction,
                            confidence: item.confidence,
                            top_3: [{ character: item.prediction, confidence: item.confidence }]
                          });
                          setCanvasImage(item.image);
                        }}
                      >
                        {/* Mini Image Preview frame */}
                        <div className="rounded-xl overflow-hidden bg-white border border-slate-900 p-2 mb-3.5 h-24 flex items-center justify-center shadow-inner relative">
                          <img src={item.image} alt="Thumbnail" className="max-h-20 object-contain rounded select-none" />
                          <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-[10px] uppercase font-bold text-white px-2 py-1 rounded bg-slate-950 border border-slate-850">
                              Restore
                            </span>
                          </div>
                        </div>
                        
                        {/* Prediction info details */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">
                              {item.mode === 'digits' ? 'Digit' : 'Letter'}
                            </span>
                            <p className="text-xs font-bold text-slate-400 mt-0.5">{item.confidence.toFixed(1)}%</p>
                          </div>
                          
                          {/* Character Circle badge */}
                          <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-md font-black text-neon-blue group-hover:border-neon-blue/30 transition-all">
                            {item.prediction}
                          </div>
                        </div>

                        {/* Individual Delete Badge */}
                        <button
                          onClick={(e) => removeHistoryItem(item.id, e)}
                          className="absolute -top-1.5 -right-1.5 p-1 rounded-md bg-slate-900 border border-slate-800 hover:border-red-500/30 hover:bg-red-950/20 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all z-20"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>
          </section>

          <HowItWorks />
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;

