import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Download, Share2, RotateCcw, Award, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const ResultCard = ({ result, onTryAgain, canvasImage }) => {
  if (!result) return null;

  const handleDownload = () => {
    if (!canvasImage) {
      toast.error("No drawing preview available to download.");
      return;
    }
    const link = document.createElement('a');
    link.download = `inkmind-drawing-${result.prediction}.png`;
    link.href = canvasImage;
    link.click();
    toast.success("Drawing saved to downloads!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'InkMind AI Prediction',
        text: `InkMind AI classified my drawing as "${result.prediction}" with ${result.confidence.toFixed(1)}% confidence!`,
        url: window.location.href,
      })
      .then(() => toast.success("Shared successfully!"))
      .catch(() => {});
    } else {
      navigator.clipboard.writeText(`InkMind AI predicted: "${result.prediction}" with ${result.confidence.toFixed(1)}% confidence!`);
      toast.success("Results copied to clipboard!");
    }
  };

  // SVGs for the circular gauge ring indicator
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (result.confidence / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="w-full max-w-md mx-auto glassmorphism p-8 rounded-3xl glow-border relative overflow-hidden"
    >
      {/* Spark Confetti on excellent prediction score */}
      {result.confidence > 85 && (
        <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden flex items-center justify-center z-10">
          <Confetti width={400} height={400} recycle={false} numberOfPieces={120} />
        </div>
      )}
      
      <div className="text-center mb-8 relative z-20 flex flex-col items-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Classification Result</p>
        
        {/* Ring Dial Gauge Indicator */}
        <div className="relative flex items-center justify-center w-40 h-40 mb-6">
          <svg className="w-full h-full -rotate-90">
            {/* Background ring */}
            <circle
              className="text-slate-900 stroke-current"
              strokeWidth={stroke}
              fill="transparent"
              r={normalizedRadius}
              cx={80}
              cy={80}
            />
            {/* Active percentage ring with dynamic glow */}
            <motion.circle
              className="text-neon-blue stroke-current"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              fill="transparent"
              r={normalizedRadius}
              cx={80}
              cy={80}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          
          {/* Central character display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-7xl font-black font-poppins text-white text-glow mb-1">
              {result.prediction}
            </h2>
          </div>
        </div>

        {/* Pulse Confidence Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 border border-slate-900 shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-neon-blue animate-pulse shadow-[0_0_8px_var(--color-accent-glow)]"></div>
          <span className="text-sm font-bold text-slate-200">{result.confidence.toFixed(1)}% Confidence</span>
        </div>
      </div>

      {/* Alternative Top Predictions */}
      <div className="space-y-4 mb-8 relative z-20">
        <div className="flex items-center justify-between pb-2 border-b border-slate-900">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alternative Guesses</h4>
          <Award className="w-4 h-4 text-slate-600" />
        </div>

        {result.top_3.map((item, index) => (
          <div key={item.character} className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-1 rounded-lg bg-slate-950 border border-slate-900 text-slate-300">
                Char "{item.character}"
              </span>
              <span className="text-xs font-bold text-neon-blue">
                {item.confidence.toFixed(1)}%
              </span>
            </div>
            
            <div className="overflow-hidden h-2.5 rounded-full bg-slate-950 border border-slate-900 flex">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.confidence}%` }}
                transition={{ duration: 1.2, delay: 0.1 * index, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  index === 0 
                    ? 'bg-gradient-to-r from-neon-blue to-neon-violet shadow-[0_0_10px_var(--color-accent-glow)]' 
                    : 'bg-slate-800'
                }`}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Action Bar */}
      <div className="flex gap-3 relative z-20">
        <button 
          onClick={onTryAgain}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-slate-800 rounded-xl bg-slate-950 hover:bg-slate-900 hover:border-slate-700 transition-all font-bold text-xs text-slate-300 hover:text-white"
        >
          <RotateCcw className="w-4 h-4 text-neon-violet" /> Reset Demo
        </button>
        <button 
          onClick={handleDownload}
          disabled={!canvasImage}
          className="flex items-center justify-center p-3.5 border border-slate-800 rounded-xl bg-slate-950 hover:bg-slate-900 hover:border-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
          title="Download Drawing File"
        >
          <Download className="w-4 h-4 text-neon-blue" />
        </button>
        <button 
          onClick={handleShare}
          className="flex items-center justify-center p-3.5 border border-slate-800 rounded-xl bg-slate-950 hover:bg-slate-900 hover:border-slate-700 transition-all"
          title="Share Analysis results"
        >
          <Share2 className="w-4 h-4 text-neon-blue" />
        </button>
      </div>
    </motion.div>
  );
};

export default ResultCard;

