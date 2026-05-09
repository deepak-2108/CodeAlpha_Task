import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold font-poppins tracking-tight mb-8">
            Turn handwriting into <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-violet">
              digital intelligence.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-slate-300 mx-auto mb-10">
            State-of-the-art Convolutional Neural Networks designed to recognize your handwriting in real-time. Experience the future of digitisation.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#demo" className="relative group inline-flex items-center justify-center">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-violet rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-200"></div>
              <button className="relative flex items-center gap-2 bg-slate-900 px-8 py-4 rounded-lg text-lg font-medium hover:bg-slate-800 transition-colors border border-slate-700">
                <Sparkles className="w-5 h-5 text-neon-violet" />
                Try Live Demo
              </button>
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/10 rounded-full blur-[120px] -z-10"></div>
    </div>
  );
};

export default Hero;
