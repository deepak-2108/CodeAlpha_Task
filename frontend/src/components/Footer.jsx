import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-12 mt-20 relative z-10 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
        <p className="font-medium text-slate-400">© 2026 InkMind AI. All rights reserved.</p>
        <p className="mt-2 text-sm">Powered by React, Tailwind CSS, Flask, and TensorFlow.</p>
      </div>
    </footer>
  );
};

export default Footer;
