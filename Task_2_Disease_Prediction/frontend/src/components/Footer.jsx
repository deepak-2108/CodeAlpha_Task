import React from 'react';
import { Activity } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center text-white">
              <Activity size={18} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-medical-600 to-medical-400 bg-clip-text text-transparent">
              MediPredict AI
            </span>
          </div>
          
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} MediPredict AI. All rights reserved. Professional Medical Decision Support.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-medical-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-medical-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
