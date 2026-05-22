import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu, Wand2 } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative pt-36 pb-24 sm:pt-44 sm:pb-32 overflow-hidden flex flex-col justify-center items-center">
      
      {/* Premium Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 z-0 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle micro-badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md mb-8 hover:border-neon-blue/30 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-neon-blue animate-pulse" />
            <span className="text-xs font-semibold text-slate-300 tracking-wide">
              Empowered by Deep Learning CNNs
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black font-poppins tracking-tight mb-8 leading-[1.1] sm:leading-none">
            InkMind <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-violet-400 to-neon-violet text-glow">
              AI Classifier
            </span>
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-slate-400 mx-auto mb-12 font-medium leading-relaxed">
            Experience state-of-the-art Convolutional Neural Networks recognizing handwritten digits and letters in real-time. Simply draw or drop an image.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <a href="#demo" className="relative group inline-flex w-full sm:w-auto items-center justify-center">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-neon-violet rounded-2xl blur opacity-35 group-hover:opacity-100 transition duration-300"></div>
              <button className="relative w-full sm:w-auto flex items-center justify-center gap-2.5 bg-slate-950 px-9 py-4.5 rounded-xl text-lg font-bold text-white hover:bg-slate-900 transition-colors border border-slate-800">
                <Wand2 className="w-5 h-5 text-neon-blue" />
                Launch Live Demo
              </button>
            </a>
            
            <a href="#how-it-works" className="w-full sm:w-auto text-slate-400 hover:text-white font-semibold text-md px-6 py-3 transition-colors duration-200">
              Explore Architecture &rarr;
            </a>
          </div>
        </motion.div>
      </div>

      {/* Modern Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[140px] -z-10 pointer-events-none animate-pulse duration-[6000ms]"></div>
    </div>
  );
};

export default Hero;

