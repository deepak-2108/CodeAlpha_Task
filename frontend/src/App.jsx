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

function App() {
  const [result, setResult] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');
  const [inputMode, setInputMode] = useState('draw'); // 'draw' or 'upload'
  const [predictionMode, setPredictionMode] = useState('digits'); // 'digits' or 'letters'

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
  const handlePredict = async (imageBlob) => {
    if (serverStatus !== 'healthy') {
      toast.error("Backend server is not ready.");
      return;
    }
    
    setIsPredicting(true);
    setResult(null);
    
    try {
      const data = await predictImage(imageBlob, predictionMode);
      setResult(data);
      toast.success("Prediction complete!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to predict image.");
    } finally {
      setIsPredicting(false);
    }
  };

  const handleTryAgain = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-inter relative selection:bg-neon-blue/30 selection:text-neon-blue flex flex-col">
      {/* Global background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-violet/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 flex-grow">
        <Navbar />
        
        <main>
          <Hero />
          
          <section id="demo" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-poppins mb-4">Live Demonstration</h2>
                <p className="text-slate-400 mb-8">
                  {serverStatus === 'healthy' 
                    ? "Backend Connected. Choose how you want to input a digit." 
                    : "Connecting to backend server..."}
                </p>
                
                {/* Input Mode Toggle */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <div className="inline-flex bg-slate-800 p-1 rounded-xl">
                    <button 
                      onClick={() => setPredictionMode('digits')}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${predictionMode === 'digits' ? 'bg-gradient-to-r from-neon-blue to-neon-violet text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                    >
                      Digits (0-9)
                    </button>
                    <button 
                      onClick={() => setPredictionMode('letters')}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${predictionMode === 'letters' ? 'bg-gradient-to-r from-neon-blue to-neon-violet text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                    >
                      Letters (A-Z)
                    </button>
                  </div>
                  
                  <div className="hidden sm:block w-px h-8 bg-slate-700"></div>

                  <div className="inline-flex bg-slate-800 p-1 rounded-xl">
                    <button 
                      onClick={() => setInputMode('draw')}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${inputMode === 'draw' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                    >
                      Draw
                    </button>
                    <button 
                      onClick={() => setInputMode('upload')}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${inputMode === 'upload' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                    >
                      Upload Image
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
                <div className="flex flex-col items-center">
                  {inputMode === 'draw' ? (
                    <Canvas onPredict={handlePredict} isPredicting={isPredicting} />
                  ) : (
                    <Upload onPredict={handlePredict} isPredicting={isPredicting} />
                  )}
                </div>
                
                <div className="flex items-center justify-center min-h-[400px]">
                  {result ? (
                    <ResultCard result={result} onTryAgain={handleTryAgain} />
                  ) : (
                    <div className="text-center p-8 border border-dashed border-slate-700 rounded-2xl w-full max-w-md h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900/30">
                      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
                        <span className="text-2xl text-slate-400">?</span>
                      </div>
                      <p>Your prediction will appear here</p>
                    </div>
                  )}
                </div>
              </div>
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
