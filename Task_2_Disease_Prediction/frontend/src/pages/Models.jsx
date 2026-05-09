import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Activity, Brain, CheckSquare, Target } from 'lucide-react';

const Models = () => {
  const modelStats = [
    {
      disease: 'Breast Cancer',
      model: 'SVM',
      accuracy: 98.25,
      precision: 97.5,
      recall: 99.0,
      f1: 98.2,
      color: 'bg-rose-500'
    },
    {
      disease: 'Heart Disease',
      model: 'SVM',
      accuracy: 90.16,
      precision: 89.2,
      recall: 91.5,
      f1: 90.3,
      color: 'bg-medical-500'
    },
    {
      disease: 'Diabetes',
      model: 'Logistic Regression',
      accuracy: 75.32,
      precision: 74.1,
      recall: 76.5,
      f1: 75.2,
      color: 'bg-emerald-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Model Insights</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
          Detailed breakdown of our machine learning models' performance metrics across different disease categories.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {modelStats.map((stat, i) => (
          <motion.div
            key={stat.disease}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card relative overflow-hidden group"
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${stat.color}`}></div>
            <h3 className="text-xl font-bold mb-1">{stat.disease}</h3>
            <div className="text-sm text-slate-500 mb-6 flex items-center gap-2">
              <Brain size={14} /> {stat.model}
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>Accuracy</span>
                  <span>{stat.accuracy}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.accuracy}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className={`h-full ${stat.color}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Precision', val: stat.precision, icon: <Target size={12} /> },
                  { label: 'Recall', val: stat.recall, icon: <Activity size={12} /> },
                  { label: 'F1 Score', val: stat.f1, icon: <CheckSquare size={12} /> }
                ].map((m) => (
                  <div key={m.label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                      {m.icon} {m.label}
                    </div>
                    <div className="text-sm font-bold">{m.val}%</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card bg-medical-900 text-white p-12 border-none relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BarChart size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Our Training Methodology</h2>
          <p className="text-medical-100 mb-8 leading-relaxed">
            We utilize supervised learning classification techniques on standardized clinical datasets from the UC Irvine Machine Learning Repository. Each model undergoes rigorous preprocessing including outlier removal, median imputation for missing values, and standard scaling to ensure optimal convergence.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20">Cross-Validation</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20">Feature Importance Analysis</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20">Hyperparameter Tuning</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Models;
