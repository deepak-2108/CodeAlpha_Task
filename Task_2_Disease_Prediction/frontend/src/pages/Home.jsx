import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, BarChart3, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Predict <span className="text-medical-600">disease risk</span> before symptoms appear.
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg">
                Advanced AI-powered health analytics. Get professional-grade insights into heart health, diabetes, and cancer risk using data-driven machine learning models.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/predict" className="btn-primary py-4 px-8 text-lg">
                  Start Prediction <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="px-8 py-4 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-medical-500/10 blur-3xl rounded-full"></div>
              <img
                src="/hero.png"
                alt="Medical Dashboard"
                className="relative rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800 w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Trust MediPredict AI?</h2>
            <p className="text-slate-600 dark:text-slate-400">Our platform combines medical research with state-of-the-art AI.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="text-emerald-500" />,
                title: "Data Security",
                desc: "Your medical data is processed with the highest security standards and never stored without consent."
              },
              {
                icon: <Zap className="text-orange-500" />,
                title: "Real-time Analysis",
                desc: "Get instant probability scores and risk assessments using our optimized inference engine."
              },
              {
                icon: <BarChart3 className="text-medical-500" />,
                title: "High Accuracy",
                desc: "Trained on gold-standard UCI datasets with rigorous cross-validation and feature selection."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="card group hover:border-medical-500/50"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-medical-50 dark:group-hover:bg-medical-900/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
