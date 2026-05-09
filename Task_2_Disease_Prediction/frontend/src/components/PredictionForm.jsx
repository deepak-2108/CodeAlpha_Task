import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

const PredictionForm = ({ disease, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState(
    disease.features.reduce((acc, f) => ({ ...acc, [f.name]: f.default }), {})
  );

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Map features explicitly based on the order in disease.features to ensure correct model input
    let features = disease.features.map(f => formData[f.name] || 0);
    
    // For cancer, we need 30 features but we only show 10. Pad with 0s.
    if (disease.id === 'cancer' && features.length < 30) {
      features = [...features, ...Array(30 - features.length).fill(0)];
    }
    onSubmit(features);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {disease.features.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="input-field"
              >
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                step={field.step || 1}
                min={field.min}
                max={field.max}
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="input-field"
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
          isLoading 
            ? 'bg-slate-400 cursor-not-allowed' 
            : 'bg-medical-600 hover:bg-medical-700 shadow-lg shadow-medical-600/20 active:scale-[0.98]'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Analyzing Data...
          </>
        ) : (
          <>
            <Activity size={20} />
            Predict Risk Probability
          </>
        )}
      </button>
    </motion.form>
  );
};

export default PredictionForm;
