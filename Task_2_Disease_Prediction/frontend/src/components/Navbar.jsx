import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, Activity, LayoutDashboard, Info, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Predict', path: '/predict', icon: <Activity size={18} /> },
    { name: 'Models', path: '/models', icon: <LayoutDashboard size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-medical-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Activity size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-medical-600 to-medical-400 bg-clip-text text-transparent">
              MediPredict AI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-medical-600'
                    : 'text-slate-600 dark:text-slate-400 hover:text-medical-500'
                }`}
              >
                {link.icon}
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-medical-600"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:scale-110 active:scale-95 transition-all duration-200"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
