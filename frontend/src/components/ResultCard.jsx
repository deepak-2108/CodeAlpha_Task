import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Download, Share2, RotateCcw } from 'lucide-react';

const ResultCard = ({ result, onTryAgain }) => {
  if (!result) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto glassmorphism p-8 rounded-2xl glow-border relative overflow-hidden"
    >
      {result.confidence > 90 && (
        <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden flex items-center justify-center z-10">
          <Confetti width={400} height={400} recycle={false} numberOfPieces={200} />
        </div>
      )}
      
      <div className="text-center mb-6 relative z-20">
        <p className="text-slate-400 font-medium mb-2">Prediction</p>
        <h2 className="text-8xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
          {result.prediction}
        </h2>
        <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-neon-blue/10 border border-neon-blue/20">
          <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></div>
          <span className="text-neon-blue font-medium">{result.confidence.toFixed(1)}% Confidence</span>
        </div>
      </div>

      <div className="space-y-4 mb-8 relative z-20">
        <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Top Predictions</h4>
        {result.top_3.map((item, index) => (
          <div key={item.character} className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-slate-800 text-slate-300">
                  {isNaN(item.character) ? 'Letter' : 'Digit'} {item.character}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-neon-violet">
                  {item.confidence.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-800">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.confidence}%` }}
                transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${index === 0 ? 'bg-gradient-to-r from-neon-blue to-neon-violet' : 'bg-slate-600'}`}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 relative z-20">
        <button 
          onClick={onTryAgain}
          className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
        <button className="flex items-center justify-center p-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors">
          <Download className="w-4 h-4" />
        </button>
        <button className="flex items-center justify-center p-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default ResultCard;
