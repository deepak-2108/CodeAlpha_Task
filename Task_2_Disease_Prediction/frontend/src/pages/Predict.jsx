import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Heart, ShieldAlert, ChevronRight } from 'lucide-react';
import { diseases } from '../data/diseases';
import PredictionForm from '../components/PredictionForm';
import ResultCard from '../components/ResultCard';
import { predictDisease } from '../api';

const Predict = () => {
  const [activeTab, setActiveTab] = useState(diseases[0]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (features) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await predictDisease(activeTab.id, features);
      setResult(data);
    } catch (err) {
      setError("Failed to connect to prediction server. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Heart': return <Heart size={20} />;
      case 'Activity': return <Activity size={20} />;
      case 'ShieldAlert': return <ShieldAlert size={20} />;
      default: return <Activity size={20} />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Disease Risk Prediction</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Select a disease category and provide the clinical parameters to calculate risk probability using our trained ML models.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl">
        {diseases.map((d) => (
          <button
            key={d.id}
            onClick={() => {
              setActiveTab(d);
              setResult(null);
              setError(null);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab.id === d.id
                ? 'bg-white dark:bg-slate-800 text-medical-600 shadow-md'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {getIcon(d.icon)}
            {d.name}
          </button>
        ))}
      </div>

      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="card p-8 lg:p-12 shadow-xl border-slate-200/60 dark:border-slate-800/60"
            >
              <div className="mb-8 flex items-start gap-4">
                <div className="p-3 bg-medical-50 dark:bg-medical-900/20 text-medical-600 rounded-2xl">
                  {getIcon(activeTab.icon)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{activeTab.name} Analysis</h2>
                  <p className="text-slate-500 dark:text-slate-400">{activeTab.description}</p>
                </div>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-600 dark:text-rose-400 text-sm flex items-center gap-3">
                  <Activity size={18} />
                  {error}
                </div>
              )}

              <PredictionForm 
                disease={activeTab} 
                onSubmit={handlePredict} 
                isLoading={isLoading} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ResultCard result={result} onReset={() => setResult(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Predict;
