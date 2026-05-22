import React, { useState, useEffect } from 'react';
import { Cpu, HelpCircle, Layers, Settings, BarChart2, CheckCircle2, ChevronRight, Play, Pause, RefreshCw, Grid, Minimize2, ZoomIn, Eye, Activity, Sliders, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Retro 8x8 character pixel patterns for the Dataset Explorer
const CHAR_PATTERNS = {
  digits: {
    '0': [
      [0,0,1,1,1,1,0,0],
      [0,1,1,0,0,1,1,0],
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,0,1,1],
      [0,1,1,0,0,1,1,0],
      [0,0,1,1,1,1,0,0]
    ],
    '1': [
      [0,0,0,1,1,0,0,0],
      [0,0,1,1,1,0,0,0],
      [0,1,1,1,1,0,0,0],
      [0,0,0,1,1,0,0,0],
      [0,0,0,1,1,0,0,0],
      [0,0,0,1,1,0,0,0],
      [0,0,0,1,1,0,0,0],
      [0,1,1,1,1,1,1,0]
    ],
    '3': [
      [0,1,1,1,1,1,0,0],
      [1,1,0,0,0,1,1,0],
      [0,0,0,0,1,1,0,0],
      [0,0,1,1,1,0,0,0],
      [0,0,0,0,1,1,0,0],
      [0,0,0,0,0,1,1,0],
      [1,1,0,0,0,1,1,0],
      [0,1,1,1,1,1,0,0]
    ],
    '7': [
      [1,1,1,1,1,1,1,1],
      [1,1,0,0,0,1,1,0],
      [0,0,0,0,1,1,0,0],
      [0,0,0,1,1,0,0,0],
      [0,0,1,1,0,0,0,0],
      [0,0,1,1,0,0,0,0],
      [0,1,1,0,0,0,0,0],
      [0,1,1,0,0,0,0,0]
    ],
    '8': [
      [0,0,1,1,1,1,0,0],
      [0,1,1,0,0,1,1,0],
      [0,1,1,0,0,1,1,0],
      [0,0,1,1,1,1,0,0],
      [0,1,1,0,0,1,1,0],
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,0,1,1],
      [0,1,1,1,1,1,1,0]
    ]
  },
  letters: {
    'A': [
      [0,0,0,1,1,0,0,0],
      [0,0,1,1,1,1,0,0],
      [0,1,1,0,0,1,1,0],
      [0,1,1,0,0,1,1,0],
      [0,1,1,1,1,1,1,0],
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,0,1,1]
    ],
    'B': [
      [1,1,1,1,1,1,0,0],
      [1,1,0,0,0,1,1,0],
      [1,1,0,0,0,1,1,0],
      [1,1,1,1,1,1,0,0],
      [1,1,0,0,0,1,1,0],
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,1,1,0],
      [1,1,1,1,1,1,0,0]
    ],
    'E': [
      [1,1,1,1,1,1,1,1],
      [1,1,0,0,0,0,0,0],
      [1,1,0,0,0,0,0,0],
      [1,1,1,1,1,1,0,0],
      [1,1,0,0,0,0,0,0],
      [1,1,0,0,0,0,0,0],
      [1,1,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1]
    ],
    'H': [
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,0,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,0,1,1]
    ],
    'S': [
      [0,1,1,1,1,1,1,0],
      [1,1,0,0,0,0,1,1],
      [1,1,0,0,0,0,0,0],
      [0,1,1,1,1,1,0,0],
      [0,0,0,0,0,1,1,0],
      [0,0,0,0,0,1,1,0],
      [1,1,0,0,0,1,1,0],
      [0,1,1,1,1,1,0,0]
    ]
  }
};

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('cnn');

  // Theme support context check (will style according to global CSS variables)
  const tabs = [
    { id: 'cnn', name: 'CNN Explorer', icon: <Layers className="w-4 h-4" /> },
    { id: 'preprocess', name: 'Preprocessing Pipeline', icon: <Settings className="w-4 h-4" /> },
    { id: 'datasets', name: 'Benchmarking Datasets', icon: <BarChart2 className="w-4 h-4" /> },
  ];

  // 1. CNN ARCHITECTURE EXPLORER STATE
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [isPlayingConv, setIsPlayingConv] = useState(true);
  const [convIndex, setConvIndex] = useState(0);
  const [denseDropout, setDenseDropout] = useState(false);
  const [softmaxScores, setSoftmaxScores] = useState([4.8, 1.2, 0.3, 0.1, -1.5]); // Logits for Softmax
  const [softmaxProbs, setSoftmaxProbs] = useState([]);
  
  // Input Matrix Interactive State
  const [inputMatrixGrid, setInputMatrixGrid] = useState([
    [0, 0, 0, 0, 0],
    [0, 255, 255, 0, 0],
    [0, 0, 255, 0, 0],
    [0, 0, 255, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  // Max Pooling Hover quadrant
  const [poolingQuadrant, setPoolingQuadrant] = useState(null);
  const maxPoolingGrid = [
    [12, 45, 89, 21],
    [34, 18, 55, 76],
    [101, 23, 4, 9],
    [67, 88, 30, 42]
  ];

  // CNN layer data definition
  const layersData = [
    {
      name: "Input Matrix",
      dimensions: "28x28x1 Grayscale",
      formula: "I(x,y) \\in [0, 255]",
      description: "Drawings are parsed into single-channel grayscale 2D grids. Values range from 0 (background pixel black) to 255 (stroke activation white).",
      insights: "Modern high-resolution displays scale inputs down using bilinear interpolation to retain vector shape edges."
    },
    {
      name: "Conv2D + ReLU",
      dimensions: "32 Filters (3x3)",
      formula: "f(x) = \\max(0, \\sum (w_i \\cdot a_i) + b)",
      description: "Slides 32 mathematical 3x3 kernels over the pixels to map micro-features like lines, gradients, and sharp angles. The ReLU rectifier suppresses negative values.",
      insights: "ReLUs are structurally essential to keep training linear, avoiding vanishing gradient bottlenecks common in older networks."
    },
    {
      name: "MaxPooling",
      dimensions: "2x2 Size, Stride 2",
      formula: "P_{max} = \\max(Q_{2x2})",
      description: "Downsamples feature grids by extracts the peak response within contiguous 2x2 blocks, stripping out noise and rendering features rotation and offset invariant.",
      insights: "Halving dimensions dynamically drops parameters, boosting processing speeds while reducing memory utilization by 75%."
    },
    {
      name: "Dense (Dropout)",
      dimensions: "128 Neurons (ReLU)",
      formula: "Y = \\text{Dropout}(W \\cdot X + B, p=0.25)",
      description: "Flattens the 2D feature matrix into a 1D vector, connecting all parameters into a 128-neuron dense layer. Dropout randomly deactivates connections to boost model generalization.",
      insights: "Dropout acts as a powerful regularizer, forcing neurons to learn robust features rather than co-adapting with neighbors."
    },
    {
      name: "Softmax Output",
      dimensions: "10 / 26 Classes",
      formula: "S(z_i) = \\frac{e^{z_i}}{\\sum e^{z_j}}",
      description: "Translates high-dimensional neuron outputs (logits) into a probability distribution. The outputs are scaled exponentially, forcing values to sum exactly to 1.0 (100%).",
      insights: "This creates sharp outputs, clearly highlighting correct letters/numbers while lowering the noise ceiling of incorrect guesses."
    }
  ];

  // Convolution Animation tick loop
  useEffect(() => {
    let interval;
    if (isPlayingConv && selectedLayer === 1) {
      interval = setInterval(() => {
        setConvIndex((prev) => (prev + 1) % 9);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingConv, selectedLayer]);

  // Softmax mathematical computation logic
  useEffect(() => {
    const exps = softmaxScores.map(score => Math.exp(score));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    const probs = exps.map(exp => (exp / sumExps) * 100);
    setSoftmaxProbs(probs);
  }, [softmaxScores]);

  // Interactive Input Matrix pixel toggle helper
  const handlePixelClick = (r, c) => {
    const updated = [...inputMatrixGrid];
    updated[r][c] = updated[r][c] === 255 ? 0 : 255;
    setInputMatrixGrid(updated);
  };

  // 2. PREPROCESSING PIPELINE STATE
  const [rgbColor, setRgbColor] = useState({ r: 45, g: 197, b: 244 });
  const [grayscaleValue, setGrayscaleValue] = useState(157);
  const [isInverted, setIsInverted] = useState(true);
  const [alignSimulated, setAlignSimulated] = useState(false);

  useEffect(() => {
    // Recalculate luminosity grayscale formula
    const gray = Math.round(0.299 * rgbColor.r + 0.587 * rgbColor.g + 0.114 * rgbColor.b);
    setGrayscaleValue(gray);
  }, [rgbColor]);

  // 3. BENCHMARKING DATASETS STATE
  const [datasetMode, setDatasetMode] = useState('digits'); // 'digits' or 'letters'
  const [selectedChar, setSelectedChar] = useState('0');

  useEffect(() => {
    if (datasetMode === 'digits') {
      setSelectedChar('0');
    } else {
      setSelectedChar('A');
    }
  }, [datasetMode]);

  return (
    <section id="how-it-works" className="py-24 relative z-10 border-t border-slate-900 bg-slate-950/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/60 text-xs font-bold text-neon-blue uppercase tracking-widest mb-4"
          >
            <Cpu className="w-3.5 h-3.5 animate-pulse" /> Model Architecture
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-black font-poppins mb-4 tracking-tight">
            Under The Hood
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
            Take a deep dive into the neural architecture, pre-processing mathematics, and training sets that power InkMind AI.
          </p>
        </div>

        {/* Dynamic Navigation Tabs Menu */}
        <div className="flex bg-slate-950/90 p-1.5 rounded-2xl border border-slate-900 max-w-2xl mx-auto mb-12 shadow-2xl justify-between relative z-10 backdrop-blur-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all relative ${
                activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-slate-900 border border-slate-800 rounded-xl -z-10 shadow-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {tab.icon}
              <span className="hidden md:inline">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Primary Educational Panels Container */}
        <div className="relative min-h-[580px]">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: CNN ARCHITECTURE EXPLORER */}
            {activeTab === 'cnn' && (
              <motion.div 
                key="cnn-explorer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Side: Interlocking Pipeline Chain */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <div className="mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Interactive Pipeline</span>
                    <h3 className="text-lg font-black text-slate-200 mt-0.5">Select a CNN Layer</h3>
                  </div>

                  {layersData.map((layer, index) => {
                    const isSelected = selectedLayer === index;
                    return (
                      <div key={index} className="relative">
                        <button
                          onClick={() => setSelectedLayer(index)}
                          className={`w-full flex items-center justify-between p-4.5 rounded-2xl border text-left transition-all duration-300 relative group overflow-hidden ${
                            isSelected 
                              ? 'bg-slate-900 border-neon-blue/40 shadow-[0_0_20px_rgba(0,243,255,0.06)]' 
                              : 'bg-slate-950/40 border-slate-900/60 hover:border-slate-800 hover:bg-slate-900/20'
                          }`}
                        >
                          {/* Pulsing indicator node inside buttons */}
                          <div className="flex items-center gap-4 relative z-10">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border ${
                              isSelected 
                                ? 'bg-gradient-to-br from-neon-blue to-neon-violet border-transparent text-white' 
                                : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-slate-200 group-hover:border-slate-700'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <h4 className={`text-sm font-bold transition-colors ${
                                isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                              }`}>
                                {layer.name}
                              </h4>
                              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-0.5">
                                {layer.dimensions}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 relative z-10">
                            <code className={`text-[10px] px-2 py-0.5 rounded font-mono border ${
                              isSelected 
                                ? 'bg-slate-950 border-neon-blue/20 text-neon-blue' 
                                : 'bg-slate-950/50 border-slate-900 text-slate-500'
                            }`}>
                              {layer.formula.split('\\')[0] || layer.formula}
                            </code>
                            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                              isSelected ? 'text-neon-blue translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                            }`} />
                          </div>

                          {/* Hover dynamic color border flashes */}
                          <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-neon-blue to-neon-violet transition-opacity duration-300 ${
                            isSelected ? 'opacity-100' : 'opacity-0'
                          }`} />
                        </button>
                        
                        {/* Connecting visual pipeline dots */}
                        {index < layersData.length - 1 && (
                          <div className="flex justify-center my-0.5">
                            <div className="w-[1.5px] h-3.5 bg-gradient-to-b from-slate-850 to-slate-900" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Right Side: Interactive Visual Details Widget Panel */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />
                  
                  <div>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-900 pb-5 mb-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-neon-blue tracking-widest uppercase bg-neon-blue/10 px-2 py-0.5 rounded border border-neon-blue/20">
                            Layer {selectedLayer + 1}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold uppercase">{layersData[selectedLayer].dimensions}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-100 mt-1">{layersData[selectedLayer].name}</h3>
                      </div>
                      
                      {/* Latex Math Code Container */}
                      <div className="bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-850 font-mono text-xs text-slate-300 select-all">
                        <span className="text-slate-500 mr-2 text-[10px] uppercase font-bold tracking-wider">Formula</span>
                        {layersData[selectedLayer].formula}
                      </div>
                    </div>

                    {/* Explanatory description text */}
                    <div className="space-y-4 mb-8">
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {layersData[selectedLayer].description}
                      </p>
                      
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/30 border border-slate-900 text-xs text-slate-400">
                        <HelpCircle className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
                        <p><strong>Technical Insight:</strong> {layersData[selectedLayer].insights}</p>
                      </div>
                    </div>
                  </div>

                  {/* LIVE INTERACTIVE DEMONSTRATIVE WIDGET */}
                  <div className="border border-slate-900 rounded-2xl bg-slate-900/20 p-5 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
                    <div className="absolute top-2 left-3 flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-neon-blue animate-pulse" />
                      <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Live Mathematical Playground</span>
                    </div>

                    {/* WIDGET 1: INPUT MATRIX INTERACTIVE PIXEL GRID */}
                    {selectedLayer === 0 && (
                      <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 w-full">
                        <div className="grid grid-cols-5 gap-1.5 p-2 bg-slate-950 rounded-xl border border-slate-900 shrink-0">
                          {inputMatrixGrid.map((row, r) => 
                            row.map((val, c) => (
                              <button
                                key={`${r}-${c}`}
                                onClick={() => handlePixelClick(r, c)}
                                className={`w-8 h-8 rounded-md transition-all border flex items-center justify-center text-[8px] font-bold ${
                                  val === 255 
                                    ? 'bg-neon-blue/20 border-neon-blue text-neon-blue shadow-[0_0_8px_rgba(0,243,255,0.2)]' 
                                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-600'
                                }`}
                                title={`Toggle Pixel (${r}, ${c})`}
                              >
                                {val}
                              </button>
                            ))
                          )}
                        </div>

                        <div className="text-left flex-grow">
                          <h4 className="text-xs font-bold text-slate-300 mb-1">Normalized Grid Array</h4>
                          <p className="text-[10px] text-slate-500 leading-relaxed mb-3">
                            Click any coordinate in the 5x5 grid left to toggle between activation and zero matrix values.
                          </p>
                          
                          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 font-mono text-[9px] text-neon-blue overflow-x-auto max-w-[280px]">
                            {"["}
                            {inputMatrixGrid.map((row, index) => (
                              <div key={index} className="pl-3">
                                {"["}{row.join(", ")}{"]"}{index < 4 ? "," : ""}
                              </div>
                            ))}
                            {"]"}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* WIDGET 2: CONV2D FILTER SCANNING ANIMATION */}
                    {selectedLayer === 1 && (
                      <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 w-full justify-around">
                        {/* 5x5 Grid showing sliding highlight */}
                        <div className="relative p-2 bg-slate-950 rounded-xl border border-slate-900">
                          <div className="grid grid-cols-5 gap-1">
                            {Array.from({ length: 25 }).map((_, idx) => {
                              const r = Math.floor(idx / 5);
                              const c = idx % 5;
                              
                              // Calculate if cell is inside active 3x3 kernel (convIndex defines top-left cell 0,0 to 2,2)
                              const kr = Math.floor(convIndex / 3);
                              const kc = convIndex % 3;
                              const isScanning = r >= kr && r < kr + 3 && c >= kc && c < kc + 3;

                              // Highlight center pixel of 3x3 scan
                              const isCenter = r === kr + 1 && c === kc + 1;

                              return (
                                <div
                                  key={idx}
                                  className={`w-6 h-6 rounded-sm flex items-center justify-center text-[7px] font-mono border transition-all ${
                                    isScanning
                                      ? isCenter
                                        ? 'bg-neon-violet/40 border-neon-violet text-white font-bold'
                                        : 'bg-neon-blue/20 border-neon-blue/40 text-slate-300'
                                      : 'bg-slate-900 border-slate-850 text-slate-700'
                                  }`}
                                >
                                  {isScanning ? (isCenter ? 'A' : 'w') : '0'}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Controls & Math logic display */}
                        <div className="text-left max-w-xs">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-slate-400">Scanning Convolution</span>
                            <button
                              onClick={() => setIsPlayingConv(!isPlayingConv)}
                              className="p-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white"
                              title={isPlayingConv ? "Pause Animation" : "Play Animation"}
                            >
                              {isPlayingConv ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                            </button>
                          </div>
                          
                          <p className="text-[10px] text-slate-500 leading-relaxed mb-3">
                            The 3x3 kernel (filters) scans step-by-step. Dot product operations sum activations to register spatial parameters.
                          </p>

                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 font-mono text-[10px] space-y-1.5">
                            <div className="flex justify-between text-slate-400">
                              <span>Sum Product:</span>
                              <span className="text-neon-blue font-bold">142.85</span>
                            </div>
                            <div className="flex justify-between text-slate-400 border-t border-slate-900 pt-1.5">
                              <span>ReLU Output:</span>
                              <span className="text-neon-violet font-bold">max(0, 142.85) = 142.85</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* WIDGET 3: MAX POOLING QUADRANTS WIDGET */}
                    {selectedLayer === 2 && (
                      <div className="flex flex-col sm:flex-row items-center gap-8 mt-4 w-full justify-center">
                        
                        {/* 4x4 Input Grid with Quadrants */}
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-500 mb-1.5 block text-center">4x4 Feature Map</span>
                          <div className="grid grid-cols-4 gap-1 p-2 bg-slate-950 rounded-xl border border-slate-900">
                            {maxPoolingGrid.map((row, r) => 
                              row.map((val, c) => {
                                // Define 4 quadrants
                                const quadId = `${Math.floor(r / 2)}-${Math.floor(c / 2)}`;
                                const isQuadActive = poolingQuadrant === quadId;

                                // Colors per quadrant
                                let bgClass = 'bg-slate-900 border-slate-850';
                                if (quadId === '0-0') bgClass = isQuadActive ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-red-950/10 border-red-950/60 text-red-500/70';
                                if (quadId === '0-1') bgClass = isQuadActive ? 'bg-neon-blue/20 border-neon-blue text-neon-blue' : 'bg-neon-blue/5 border-neon-blue/10 text-neon-blue/50';
                                if (quadId === '1-0') bgClass = isQuadActive ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-amber-950/10 border-amber-950/60 text-amber-500/70';
                                if (quadId === '1-1') bgClass = isQuadActive ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-emerald-950/10 border-emerald-950/60 text-emerald-500/70';

                                return (
                                  <div
                                    key={`${r}-${c}`}
                                    onMouseEnter={() => setPoolingQuadrant(quadId)}
                                    onMouseLeave={() => setPoolingQuadrant(null)}
                                    className={`w-7 h-7 rounded-md border flex items-center justify-center text-[9px] font-bold font-mono transition-all cursor-crosshair ${bgClass}`}
                                  >
                                    {val}
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>

                        {/* Interactive Arrows */}
                        <div className="hidden sm:block text-slate-700 animate-pulse">
                          <ChevronRight className="w-8 h-8" />
                        </div>

                        {/* 2x2 Downsampled Result Grid */}
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-500 mb-1.5 block text-center">Pooled Result</span>
                          <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-950 rounded-xl border border-slate-900 w-24">
                            {[
                              { id: '0-0', val: 45, color: 'text-red-400 border-red-900/60 bg-red-950/10' },
                              { id: '0-1', val: 89, color: 'text-neon-blue border-neon-blue/20 bg-neon-blue/5' },
                              { id: '1-0', val: 101, color: 'text-amber-400 border-amber-900/60 bg-amber-950/10' },
                              { id: '1-1', val: 42, color: 'text-emerald-400 border-emerald-900/60 bg-emerald-950/10' }
                            ].map((pool) => {
                              const isQuadActive = poolingQuadrant === pool.id;
                              return (
                                <div
                                  key={pool.id}
                                  onMouseEnter={() => setPoolingQuadrant(pool.id)}
                                  onMouseLeave={() => setPoolingQuadrant(null)}
                                  className={`w-8 h-8 rounded-lg border flex flex-col items-center justify-center font-mono font-bold text-xs transition-all duration-200 ${
                                    isQuadActive 
                                      ? 'scale-105 shadow-lg border-white text-white z-10 font-black' 
                                      : pool.color
                                  }`}
                                >
                                  {pool.val}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* WIDGET 4: DENSE NODES & DROPOUT SIMULATOR */}
                    {selectedLayer === 3 && (
                      <div className="flex flex-col items-center mt-4 w-full gap-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setDenseDropout(!denseDropout)}
                            className={`px-4 py-1.5 rounded-xl border text-[10px] font-bold uppercase transition-all duration-200 flex items-center gap-1.5 ${
                              denseDropout 
                                ? 'bg-red-500/20 border-red-500/40 text-red-400' 
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <Minimize2 className="w-3.5 h-3.5" />
                            {denseDropout ? "Disable Dropout" : "Apply 25% Dropout"}
                          </button>
                          
                          <span className="text-[10px] text-slate-500 font-medium">
                            {denseDropout ? "Active neurons: 24 / 32" : "Active neurons: 32 / 32"}
                          </span>
                        </div>

                        {/* Node Cluster visualization */}
                        <div className="grid grid-cols-8 gap-3.5 p-3.5 bg-slate-950 rounded-2xl border border-slate-900">
                          {Array.from({ length: 32 }).map((_, idx) => {
                            // Seed pseudo-random dropout state for 25% of elements
                            const isDropped = denseDropout && (idx % 4 === 1);
                            return (
                              <motion.div
                                key={idx}
                                animate={{ 
                                  scale: isDropped ? 0.8 : [1, 1.05, 1],
                                  opacity: isDropped ? 0.15 : 1
                                }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity, 
                                  delay: idx * 0.05 
                                }}
                                className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center text-[6px] text-white/50 ${
                                  isDropped
                                    ? 'bg-slate-900 border-slate-850'
                                    : 'bg-gradient-to-r from-neon-blue to-neon-violet border-transparent shadow-[0_0_8px_rgba(0,243,255,0.4)]'
                                }`}
                              >
                                {isDropped && "x"}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* WIDGET 5: SOFTMAX OUTPUT SLIDERS */}
                    {selectedLayer === 4 && (
                      <div className="w-full mt-2 grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                        <div className="space-y-2">
                          <span className="text-[9px] uppercase font-bold text-slate-500">Logits (Raw Neuron Scores)</span>
                          {softmaxScores.map((score, idx) => {
                            const labels = ['Digit 0', 'Digit 1', 'Digit 2', 'Digit 3', 'Digit 4'];
                            return (
                              <div key={idx} className="flex items-center gap-2">
                                <span className="text-[10px] font-semibold text-slate-400 w-12 text-left">{labels[idx]}</span>
                                <input
                                  type="range"
                                  min="-3"
                                  max="6"
                                  step="0.5"
                                  value={score}
                                  onChange={(e) => {
                                    const updated = [...softmaxScores];
                                    updated[idx] = parseFloat(e.target.value);
                                    setSoftmaxScores(updated);
                                  }}
                                  className="flex-grow accent-neon-blue h-1 bg-slate-900 rounded-lg cursor-pointer"
                                />
                                <span className="text-[10px] font-mono text-slate-500 w-8 text-right">{score.toFixed(1)}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="space-y-3.5 bg-slate-950/80 p-4 rounded-xl border border-slate-900">
                          <span className="text-[9px] uppercase font-bold text-slate-500 block">Calculated Probabilities (Softmax)</span>
                          
                          {softmaxProbs.map((prob, idx) => {
                            const isMax = prob === Math.max(...softmaxProbs);
                            return (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-[10px]">
                                  <span className={`font-bold ${isMax ? 'text-neon-blue' : 'text-slate-400'}`}>Digit {idx}</span>
                                  <span className="font-mono text-slate-400">{prob.toFixed(1)}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-850">
                                  <motion.div
                                    animate={{ width: `${prob}%` }}
                                    transition={{ duration: 0.3 }}
                                    className={`h-full rounded-full ${
                                      isMax 
                                        ? 'bg-gradient-to-r from-neon-blue to-neon-violet' 
                                        : 'bg-slate-700'
                                    }`}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: PREPROCESSING PIPELINE STEPPER */}
            {activeTab === 'preprocess' && (
              <motion.div 
                key="preprocessing-stepper"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Left Side: Pipeline Process Steps */}
                <div className="lg:col-span-6 flex flex-col justify-between gap-5">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Mathematical Pipeline</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-200 mt-1 mb-4">Grayscale, Invert, Center</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      Canvas strokes are full of vector details that can confuse deep learning parameters. Our backend transforms files in real time using strict mathematical preprocessing.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Stepper Node 1 */}
                    <div className="flex gap-4 items-start p-4 rounded-2xl bg-slate-950/40 border border-slate-900">
                      <div className="w-7 h-7 rounded-lg bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center font-bold text-xs text-neon-blue shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Canvas grayscaling</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                          Converts RGB coordinate structures to luminance Grayscale arrays. Reduces file processing depth.
                        </p>
                        <code className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-900 text-slate-400 mt-1.5 inline-block font-mono">
                          Y = 0.299R + 0.587G + 0.114B
                        </code>
                      </div>
                    </div>

                    {/* Stepper Node 2 */}
                    <div className="flex gap-4 items-start p-4 rounded-2xl bg-slate-950/40 border border-slate-900">
                      <div className="w-7 h-7 rounded-lg bg-neon-violet/10 border border-neon-violet/30 flex items-center justify-center font-bold text-xs text-neon-violet shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Threshold Inversion</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                          Neural networks are trained to map white characters on absolute black spacing. We invert user matrices instantly.
                        </p>
                        <code className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-900 text-slate-400 mt-1.5 inline-block font-mono">
                          P_{inv} = 255 - P_{orig}
                        </code>
                      </div>
                    </div>

                    {/* Stepper Node 3 */}
                    <div className="flex gap-4 items-start p-4 rounded-2xl bg-slate-950/40 border border-slate-900">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-xs text-amber-400 shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Center of Mass Centering</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                          Calculates weighted visual centroids to shift signatures, avoiding margin predictions distortions.
                        </p>
                        <code className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-900 text-slate-400 mt-1.5 inline-block font-mono">
                          xc = \sum (x \cdot I) / \sum I
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Stepper Interactive Widgets Dashboard */}
                <div className="lg:col-span-6 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-neon-violet/5 rounded-full blur-[100px] pointer-events-none" />

                  {/* Widget Panel 1: Grayscale Live Slider */}
                  <div className="border border-slate-900 rounded-2xl bg-slate-900/10 p-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <span className="text-[10px] font-bold text-neon-blue uppercase tracking-widest flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5" /> 1. Luminosity Calculator
                      </span>
                      <span className="text-[9.5px] font-mono text-slate-500">Grayscale: <strong className="text-white">{grayscaleValue}</strong></span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 w-4 font-bold">R</span>
                          <input
                            type="range"
                            min="0"
                            max="255"
                            value={rgbColor.r}
                            onChange={(e) => setRgbColor({ ...rgbColor, r: parseInt(e.target.value) })}
                            className="flex-grow accent-red-500 h-1 bg-slate-900 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 w-4 font-bold">G</span>
                          <input
                            type="range"
                            min="0"
                            max="255"
                            value={rgbColor.g}
                            onChange={(e) => setRgbColor({ ...rgbColor, g: parseInt(e.target.value) })}
                            className="flex-grow accent-green-500 h-1 bg-slate-900 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 w-4 font-bold">B</span>
                          <input
                            type="range"
                            min="0"
                            max="255"
                            value={rgbColor.b}
                            onChange={(e) => setRgbColor({ ...rgbColor, b: parseInt(e.target.value) })}
                            className="flex-grow accent-sky-500 h-1 bg-slate-900 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Colored preview frame box */}
                      <div className="flex items-center justify-around bg-slate-950 p-2.5 rounded-xl border border-slate-900 h-20">
                        <div className="flex flex-col items-center">
                          <div 
                            className="w-8 h-8 rounded-lg border border-slate-800 shadow"
                            style={{ backgroundColor: `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})` }}
                          />
                          <span className="text-[9px] text-slate-500 mt-1 font-mono uppercase">RGB Source</span>
                        </div>
                        
                        <div className="text-slate-700 font-bold">
                          <ChevronRight className="w-5 h-5" />
                        </div>

                        <div className="flex flex-col items-center">
                          <div 
                            className="w-8 h-8 rounded-lg border border-slate-800 shadow"
                            style={{ backgroundColor: `rgb(${grayscaleValue}, ${grayscaleValue}, ${grayscaleValue})` }}
                          />
                          <span className="text-[9px] text-slate-500 mt-1 font-mono uppercase font-bold">Grayscale</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Widget Panel 2: Threshold Inversion Toggle */}
                  <div className="border border-slate-900 rounded-2xl bg-slate-900/10 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <span className="text-[10px] font-bold text-neon-violet uppercase tracking-widest flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> 2. Contrast Inversion
                      </span>
                      <button
                        onClick={() => setIsInverted(!isInverted)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {isInverted ? (
                          <div className="flex items-center gap-1 text-[10px] text-neon-violet font-bold">
                            Active <ToggleRight className="w-5 h-5 text-neon-violet" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold">
                            Inverted <ToggleLeft className="w-5 h-5 text-slate-700" />
                          </div>
                        )}
                      </button>
                    </div>

                    <div className="flex justify-around items-center h-20 bg-slate-950 p-2.5 rounded-xl border border-slate-900">
                      {/* Original character representation drawing */}
                      <div className={`relative w-24 h-14 rounded-lg flex items-center justify-center border transition-all ${
                        isInverted ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                      }`}>
                        <span className="font-poppins font-black text-xl select-none">M</span>
                        <span className="absolute bottom-0.5 text-[8px] uppercase tracking-wider font-semibold opacity-60">Source File</span>
                      </div>

                      <div className="text-slate-700 font-bold">
                        <ChevronRight className="w-5 h-5 animate-pulse" />
                      </div>

                      {/* Inverted Character Preview representation */}
                      <div className={`relative w-24 h-14 rounded-lg flex items-center justify-center border transition-all ${
                        isInverted ? 'bg-slate-950 border-neon-violet/30 text-neon-violet shadow-[0_0_12px_rgba(188,19,254,0.1)]' : 'bg-white border-slate-350 text-slate-800'
                      }`}>
                        <span className={`font-poppins font-black text-xl select-none ${isInverted ? 'text-glow' : ''}`}>M</span>
                        <span className="absolute bottom-0.5 text-[8px] uppercase tracking-wider font-bold opacity-80">Preprocessed</span>
                      </div>
                    </div>
                  </div>

                  {/* Widget Panel 3: Bounding Centering Bounding Box */}
                  <div className="border border-slate-900 rounded-2xl bg-slate-900/10 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Grid className="w-3.5 h-3.5" /> 3. Centering & Resize Matrix
                      </span>
                      
                      <button
                        onClick={() => setAlignSimulated(!alignSimulated)}
                        className="px-3 py-1 rounded border border-amber-550/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-[9px] uppercase tracking-wide transition-all"
                      >
                        {alignSimulated ? "Reset Align" : "Trigger Align"}
                      </button>
                    </div>

                    <div className="flex justify-center items-center h-22 bg-slate-950 rounded-xl border border-slate-900 relative p-3">
                      {/* Box grid layout frames */}
                      <div className="relative w-16 h-16 bg-slate-900 rounded border border-slate-850 flex items-center justify-center overflow-hidden">
                        {/* Mesh grid guide guides */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#151b2a_1px,transparent_1px),linear-gradient(to_bottom,#151b2a_1px,transparent_1px)] bg-[size:0.5rem_0.5rem] opacity-40"></div>
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] border-t border-dashed border-slate-800"></div>
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-slate-800"></div>

                        {/* Animated character dot target box */}
                        <motion.div
                          animate={{ 
                            x: alignSimulated ? 0 : -14, 
                            y: alignSimulated ? 0 : -12,
                            scale: alignSimulated ? 1 : 0.8
                          }}
                          transition={{ type: "spring", stiffness: 120 }}
                          className={`w-7 h-7 rounded bg-amber-500/20 border border-amber-500 flex items-center justify-center text-xs font-black text-amber-400 relative z-10 shadow-[0_0_8px_rgba(245,158,11,0.2)]`}
                        >
                          R
                        </motion.div>
                      </div>

                      <div className="text-[10px] text-slate-500 max-w-[200px] text-left pl-6 leading-relaxed">
                        <strong>Bounding Crop:</strong> Calculates stroke coordinates, eliminates blank borders, and aligns characters centered on the center of mass.
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 3: BENCHMARKING DATASETS */}
            {activeTab === 'datasets' && (
              <motion.div 
                key="datasets-info"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in"
              >
                {/* Left Side: Stats cards comparatives */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Benchmark parameters</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-200 mt-0.5">Benchmarking Databases</h3>
                  </div>

                  {/* MNIST Info card details */}
                  <div 
                    onClick={() => setDatasetMode('digits')}
                    className={`p-5 rounded-3xl border text-left cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                      datasetMode === 'digits' 
                        ? 'bg-slate-900 border-neon-blue/40 shadow-[0_0_20px_rgba(0,243,255,0.06)]' 
                        : 'bg-slate-950/40 border-slate-900/60 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold text-neon-blue uppercase bg-neon-blue/10 px-2 py-0.5 rounded border border-neon-blue/20">
                        MNIST Dataset
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold font-mono">Accuracy Target: ~99.4%</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-200 group-hover:text-white">Handwritten Digits Set</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2 mb-4">
                      The industry-standard machine learning verification database. Consists of cleanly formatted numbers written by high schoolers and census employees.
                    </p>

                    <table className="w-full text-[10.5px] text-slate-500 border-t border-slate-850">
                      <tbody>
                        <tr className="border-b border-slate-850/50">
                          <td className="py-2.5 font-semibold text-slate-400">Total Training set</td>
                          <td className="py-2.5 text-right font-bold text-slate-200">60,000 grids</td>
                        </tr>
                        <tr className="border-b border-slate-850/50">
                          <td className="py-2.5 font-semibold text-slate-400">Total Verification set</td>
                          <td className="py-2.5 text-right font-bold text-slate-200">10,000 grids</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-semibold text-slate-400">Target Output classes</td>
                          <td className="py-2.5 text-right font-bold text-slate-200">10 digits (0 - 9)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* EMNIST Info card details */}
                  <div 
                    onClick={() => setDatasetMode('letters')}
                    className={`p-5 rounded-3xl border text-left cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                      datasetMode === 'letters' 
                        ? 'bg-slate-900 border-neon-violet/40 shadow-[0_0_20px_rgba(188,19,254,0.06)]' 
                        : 'bg-slate-950/40 border-slate-900/60 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold text-neon-violet uppercase bg-neon-violet/10 px-2 py-0.5 rounded border border-neon-violet/20">
                        EMNIST Dataset
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold font-mono">Accuracy Target: ~92.5%</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-200 group-hover:text-white">Handwritten Letters Set</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2 mb-4">
                      Extended MNIST, utilizing the same parameters structure as standard MNIST, but mapping written character grids directly to alphanumeric characters.
                    </p>

                    <table className="w-full text-[10.5px] text-slate-500 border-t border-slate-850">
                      <tbody>
                        <tr className="border-b border-slate-850/50">
                          <td className="py-2.5 font-semibold text-slate-400">Total Training set</td>
                          <td className="py-2.5 text-right font-bold text-slate-200">124,800 grids</td>
                        </tr>
                        <tr className="border-b border-slate-850/50">
                          <td className="py-2.5 font-semibold text-slate-400">Total Verification set</td>
                          <td className="py-2.5 text-right font-bold text-slate-200">20,800 grids</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-semibold text-slate-400">Target Output classes</td>
                          <td className="py-2.5 text-right font-bold text-slate-200">26 Letters (A - Z)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Side: RETRO 8x8 GLOWING DYNAMIC MATRIX EXPLORER */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[500px]">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Live Downsampling preview</span>
                        <h4 className="text-lg font-black text-slate-200 mt-0.5">8x8 Pixel Grid Renderer</h4>
                      </div>

                      {/* Character switch bar */}
                      <div className="flex gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-850">
                        {Object.keys(CHAR_PATTERNS[datasetMode]).map((char) => (
                          <button
                            key={char}
                            onClick={() => setSelectedChar(char)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center ${
                              selectedChar === char 
                                ? datasetMode === 'digits'
                                  ? 'bg-neon-blue text-slate-950 font-black shadow' 
                                  : 'bg-neon-violet text-slate-950 font-black shadow'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                          >
                            {char}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      Models are optimized for standardized 8x8 downsampled grids to ensure lightning-fast real-time inference speeds. Hover over cells to see individual pixel states.
                    </p>
                  </div>

                  {/* Retro glowing grid render canvas frame */}
                  <div className="flex flex-col items-center justify-center my-6">
                    <div className="p-3 bg-slate-900/40 rounded-2xl border border-slate-900">
                      <div className="grid grid-cols-8 gap-1.5 bg-slate-950 p-2.5 rounded-xl border border-slate-900/60 shadow-inner">
                        {CHAR_PATTERNS[datasetMode][selectedChar]?.map((row, r) => 
                          row.map((val, c) => {
                            const isActive = val === 1;
                            const glowClass = isActive 
                              ? datasetMode === 'digits'
                                ? 'bg-neon-blue border-neon-blue shadow-[0_0_12px_rgba(0,243,255,0.4)]'
                                : 'bg-neon-violet border-neon-violet shadow-[0_0_12px_rgba(188,19,254,0.4)]'
                              : 'bg-slate-900/40 border-slate-900/40 hover:border-slate-800';

                            return (
                              <motion.div
                                key={`${r}-${c}`}
                                whileHover={{ scale: 1.15 }}
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md border transition-all cursor-cell flex items-center justify-center text-[7px] font-bold ${glowClass} ${
                                  isActive ? 'text-slate-950' : 'text-slate-800'
                                }`}
                              >
                                {isActive ? '255' : '0'}
                              </motion.div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-900 text-[11px] text-slate-400">
                    <Sparkles className="w-4 h-4 text-neon-blue shrink-0 animate-pulse" />
                    <p>
                      <strong>Standardized Dimensions:</strong> Each cell in the 8x8 matrix reflects a floating-point normalized scaling factor mapped between 0.0 and 1.0 (converted to 0 - 255 integer weights above).
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
