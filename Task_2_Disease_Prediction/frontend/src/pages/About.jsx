import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Award, Users, Activity } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6">About MediPredict AI</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          MediPredict AI is a state-of-the-art medical decision support platform designed to provide early risk assessment for chronic diseases using clinical data and advanced machine learning algorithms.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="text-medical-600" /> Our Mission
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            We aim to bridge the gap between complex medical datasets and actionable health insights. By providing accessible, data-driven risk scores, we empower both patients and healthcare providers with early-stage analysis.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-medical-500"></div>
              <span className="text-sm font-medium">Early detection through pattern recognition</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-medical-500"></div>
              <span className="text-sm font-medium">Standardized clinical data processing</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-medical-500"></div>
              <span className="text-sm font-medium">Open-access health technology</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="text-medical-600" /> Professional Grade
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Our models are trained on validated clinical records and peer-reviewed datasets. While not a replacement for professional medical diagnosis, MediPredict AI serves as a powerful initial screening tool.
          </p>
          <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 italic text-sm text-slate-500">
            "The integration of AI in healthcare is not about replacing experts, but about providing them with higher-resolution data for better decision making."
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-medical-50 dark:hover:bg-medical-900/30 text-slate-600 dark:text-slate-400 hover:text-medical-600 transition-all">
          <Globe size={24} />
        </button>
        <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-medical-50 dark:hover:bg-medical-900/30 text-slate-600 dark:text-slate-400 hover:text-medical-600 transition-all">
          <Activity size={24} />
        </button>
        <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-medical-50 dark:hover:bg-medical-900/30 text-slate-600 dark:text-slate-400 hover:text-medical-600 transition-all">
          <Mail size={24} />
        </button>
      </div>
    </div>
  );
};

export default About;
