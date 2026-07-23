import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../utils/translations';
import { ShieldCheck, Zap, Sparkles } from 'lucide-react';

const MotionDiv = motion.div as any;

interface SplashScreenProps {
  onComplete: () => void;
  language?: Language;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, language = 'en' }) => {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const duration = 4000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const calculatedProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => setExit(true), 500);
        setTimeout(() => {
          onCompleteRef.current();
        }, 1200);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []); 

  const isArabic = language === 'ar';
  const logoUrl = "https://www.image2url.com/r2/default/images/1776207454999-cea10406-23d7-4372-b0ff-3f6d143a9715.jpeg";

  const loadingSteps = isArabic ? [
    "تأمين الاتصال...",
    "مزامنة البيانات...",
    "تحسين الأداء...",
    "النظام جاهز"
  ] : [
    "SECURING CONNECTION...",
    "SYNCING DATA...",
    "OPTIMIZING PERFORMANCE...",
    "SYSTEM READY"
  ];

  const currentStep = Math.min(Math.floor((progress / 100) * loadingSteps.length), loadingSteps.length - 1);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out 
      bg-transparent overflow-hidden
      ${exit ? 'opacity-0 scale-105' : 'opacity-100 scale-100'} 
      ${isArabic ? 'font-ar' : ''}`}>
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-green-500/15 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-emerald-600/15 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[30%] left-[40%] w-[25%] h-[25%] bg-green-400/10 blur-[80px] rounded-full" />
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-6">
        <MotionDiv 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="relative mb-12"
        >
          {/* Logo Aura */}
          <div className="absolute -inset-12 bg-gradient-to-tr from-green-600/30 to-emerald-400/30 blur-[60px] rounded-full animate-pulse" />
          
          {/* Rotating Border */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border border-green-500/30 rounded-[3rem]"
          />

          {/* Logo Container */}
          <div className="relative w-40 h-40 rounded-[2.5rem] overflow-hidden border border-green-500/40 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <img 
              src={logoUrl} 
              className="w-full h-full object-cover" 
              alt="logo" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Shimmer Effect */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-12"
            />
          </div>

          {/* Floating Status Icons */}
          <MotionDiv 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-green-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]"
          >
            <ShieldCheck className="w-6 h-6 text-green-400" />
          </MotionDiv>
          
          <MotionDiv 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-6 -left-6 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-green-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]"
          >
            <Zap className="w-6 h-6 text-emerald-400" />
          </MotionDiv>
        </MotionDiv>

        {/* Brand Name */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-1"
          >
            <h1 className="text-4xl font-black text-white tracking-[0.2em] uppercase">
              APPLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]">HACK</span>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-green-500/50" />
              <Sparkles className="w-3.5 h-3.5 text-green-400 animate-pulse" />
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-green-500/50" />
            </div>
          </motion.div>

          {/* Status Text */}
          <div className="h-6">
            <AnimatePresence mode="wait">
              <motion.p 
                key={currentStep}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[10px] font-bold text-green-400/90 uppercase tracking-[0.3em]"
              >
                {loadingSteps[currentStep]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="absolute bottom-20 w-full max-w-[280px] space-y-4 z-10">
        <div className="flex justify-center items-center px-1">
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
            {isArabic ? "تحميل النظام" : "System Load"}
          </span>
        </div>
        
        <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/10">
          <motion.div 
            className="h-full bg-gradient-to-r from-green-600 via-green-400 to-emerald-300 shadow-[0_0_15px_rgba(34,197,94,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Bottom Decorative Elements */}
        <div className="flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: progress > (i + 1) * 20 ? 1 : 0.2,
                scale: progress > (i + 1) * 20 ? 1.2 : 1
              }}
              className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]"
            />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');
        .font-ar {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
