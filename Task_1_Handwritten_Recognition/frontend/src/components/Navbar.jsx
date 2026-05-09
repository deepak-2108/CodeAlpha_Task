import React from 'react';
import { Brain, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glassmorphism border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-neon-blue" />
            <span className="text-xl font-poppins font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-violet">
              InkMind AI
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="hover:text-neon-blue transition-colors px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#demo" className="hover:text-neon-blue transition-colors px-3 py-2 rounded-md text-sm font-medium">Demo</a>
              <a href="#how-it-works" className="hover:text-neon-blue transition-colors px-3 py-2 rounded-md text-sm font-medium">How It Works</a>
            </div>
          </div>

          <div className="md:hidden">
            <Menu className="w-6 h-6" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
