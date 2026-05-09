import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, RefreshCw, Activity } from 'lucide-react';

const ResultCard = ({ result, onReset }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'High': return 'text-rose-500';
      case 'Medium': return 'text-amber-500';
      case 'Low': return 'text-emerald-500';
      default: return 'text-slate-500';
    }
  };

  const getBgColor = (level) => {
    switch (level) {
      case 'High': return 'bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-800/30';
      case 'Medium': return 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800/30';
      case 'Low': return 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30';
      default: return 'bg-slate-50';
    }
  };

  const percentage = (result.probability * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-8 rounded-3xl border-2 ${getBgColor(result.risk_level)} shadow-xl`}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`mb-6 p-4 rounded-full bg-white dark:bg-slate-800 shadow-sm ${getRiskColor(result.risk_level)}`}>
          {result.risk_level === 'High' ? <AlertTriangle size={48} /> : <CheckCircle size={48} />}
        </div>
        
        <h2 className="text-3xl font-bold mb-2">
          {result.risk_level} Risk Detected
        </h2>
        
        <div className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          {percentage}%
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm">
          Based on the clinical parameters provided, our {result.model_used} model estimates a {percentage}% probability of presence.
        </p>

        <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full mb-8 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${result.risk_level === 'High' ? 'bg-rose-500' : result.risk_level === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 text-left border border-white/20">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
              <Info size={12} /> Model Reliability
            </div>
            <div className="font-bold">Professional Grade</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 text-left border border-white/20">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
              <Info size={12} /> Model Architecture
            </div>
            <div className="font-bold truncate">{result.model_used}</div>
          </div>
        </div>

        {/* Health Tips Box */}
        <div className="w-full p-6 rounded-2xl bg-medical-50 dark:bg-medical-900/10 border border-medical-100 dark:border-medical-800/30 text-left mb-8">
          <h3 className="font-bold text-medical-800 dark:text-medical-300 mb-2 flex items-center gap-2">
            <Activity size={18} /> Recommended Health Tips
          </h3>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
            {result.risk_level === 'Low' && (
              <>
                <li>• Maintain a balanced diet rich in fiber and antioxidants.</li>
                <li>• Continue regular physical activity (at least 150 min/week).</li>
                <li>• Schedule annual routine check-ups for monitoring.</li>
              </>
            )}
            {result.risk_level === 'Medium' && (
              <>
                <li>• Consult a healthcare professional to discuss these results.</li>
                <li>• Monitor your vital signs (blood pressure/glucose) weekly.</li>
                <li>• Reduce intake of processed sugars and saturated fats.</li>
              </>
            )}
            {result.risk_level === 'High' && (
              <>
                <li>• <strong>Urgent:</strong> Please schedule an appointment with a specialist.</li>
                <li>• Follow any prescribed medication or treatment plans strictly.</li>
                <li>• Implement immediate sodium and sugar restrictions.</li>
              </>
            )}
          </ul>
        </div>

        <button
          onClick={onReset}
          className="btn-primary w-full sm:w-auto px-10"
        >
          <RefreshCw size={18} /> New Prediction
        </button>
      </div>
    </motion.div>
  );
};

export default ResultCard;
