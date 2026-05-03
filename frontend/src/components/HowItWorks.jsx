import React from 'react';
import { Edit3, Cpu, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Edit3 className="w-8 h-8 text-neon-blue" />,
      title: "1. Draw or Upload",
      description: "Draw a digit on our interactive canvas or upload an image."
    },
    {
      icon: <Cpu className="w-8 h-8 text-neon-violet" />,
      title: "2. Preprocessing & Inference",
      description: "The image is normalized and passed through our trained Convolutional Neural Network."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
      title: "3. Results",
      description: "Get real-time predictions with confidence scores and top alternative guesses."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">How It Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Our pipeline transforms your raw input into structured digital data in milliseconds.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-neon-blue/20 via-neon-violet/20 to-neon-blue/20 -translate-y-1/2 z-0"></div>
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glassmorphism p-8 rounded-2xl relative z-10 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center mb-6 shadow-lg glow-border">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
