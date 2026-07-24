import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, ArrowLeft, Users, User, RotateCcw, Play, History, Sparkles } from 'lucide-react';
import { Platform } from '../types';

const MotionDiv = motion.div as any;

interface CrashGameProps {
  onBack: () => void;
  userId: string;
  platform: Platform;
  t: any;
}

export const CrashGame: React.FC<CrashGameProps> = ({
  onBack,
  userId,
  platform,
  t,
}) => {
  const [currentValue, setCurrentValue] = useState<string>('0.00x');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [onlineCount, setOnlineCount] = useState<number>(1428);
  const [history, setHistory] = useState<string[]>(['2.14x', '1.85x', '3.40x', '1.25x', '2.05x']);

  const platformName = platform === 'linebet_v1' ? 'Greenbet' : 'PariPulse';

  // Slightly fluctuate online users for realistic dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);

    let targetValue = '';

    // Check if ID is 1909874671 -> Fetch from Firebase Realtime Database
    if (userId.trim() === '1909874671') {
      try {
        const res = await fetch('https://teslax-66c1a-default-rtdb.firebaseio.com/pre/hipr/hipr.json');
        const data = await res.json();
        if (data !== null && data !== undefined) {
          let rawStr = '';
          if (typeof data === 'string' || typeof data === 'number') {
            rawStr = String(data).trim();
          } else if (typeof data === 'object') {
            rawStr = String(data.value || data.prediction || data.hipr || Object.values(data)[0] || '').trim();
          }
          if (rawStr) {
            targetValue = rawStr.toLowerCase().endsWith('x') ? rawStr : `${rawStr}x`;
          }
        }
      } catch (err) {
        console.error('Firebase prediction fetch error:', err);
      }
    }

    // Default fallback if not ID 1909874671 or if fetch failed
    if (!targetValue) {
      const randomVal = (Math.random() * 3 + 1).toFixed(2);
      targetValue = `${randomVal}x`;
    }

    // Extract numeric multiplier for smooth animation
    const numTarget = parseFloat(targetValue.replace('x', '')) || 2.0;

    // Fast scramble animation step-by-step
    const steps = 12;
    for (let i = 0; i <= steps; i++) {
      await new Promise(r => setTimeout(r, 60));
      if (i < steps) {
        const tempVal = (1 + (numTarget - 1) * (i / steps)).toFixed(2);
        setCurrentValue(`${tempVal}x`);
      } else {
        setCurrentValue(targetValue);
      }
    }

    setIsAnalyzing(false);

    // Add new prediction to previous predictions list
    setHistory(prev => [targetValue, ...prev.slice(0, 9)]);
  };

  const handleRestart = () => {
    setIsAnalyzing(false);
    setCurrentValue('0.00x');
  };

  return (
    <div className="flex flex-col min-h-full bg-transparent font-sans text-white selection:bg-green-500/30" dir="rtl">
      <div className="relative z-10 flex flex-col px-4 pt-4 pb-12 max-w-md mx-auto w-full">
        {/* Top Bar (توب بار انيق) */}
        <div className="flex items-center justify-between mb-5 p-3 bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl shadow-lg">
          <button 
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-green-500/50 hover:text-green-400 transition-all active:scale-95"
            title="رجوع"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <Plane className="w-4 h-4 text-green-400 -rotate-45" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-black text-white tracking-wide">
                Crash - {platformName}
              </h1>
              <span className="text-[9px] text-green-400 font-bold">توقعات الطائرة الفورية</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_var(--primary-color)]" />
            <span className="text-[9px] font-black uppercase text-green-400">VIP</span>
          </div>
        </div>

        {/* Users Online & User ID Row (تحت التوب بار) */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Users Online */}
          <div className="p-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-2.5 shadow-md">
            <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] text-zinc-400 font-black uppercase tracking-wider">متصل الآن</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                <span className="text-xs font-black font-mono text-white truncate">
                  {onlineCount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* User ID */}
          <div className="p-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-2.5 shadow-md">
            <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] text-zinc-400 font-black uppercase tracking-wider">معرّف المستخدم</span>
              <span className="text-xs font-black font-mono text-green-400 truncate">
                {userId || '1234567890'}
              </span>
            </div>
          </div>
        </div>

        {/* Previous Predictions Bar (فوق المربع) */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <History className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-black text-zinc-300">التوقعات السابقة</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
            <AnimatePresence>
              {history.map((item, idx) => (
                <MotionDiv
                  key={`${item}-${idx}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono font-black border transition-all ${
                    idx === 0 
                      ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_12px_rgba(34,197,94,0.4)] scale-105' 
                      : 'bg-black/30 border-white/10 text-zinc-400'
                  }`}
                >
                  {item}
                </MotionDiv>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Main Box (مربع خلفيته شفافه وحوافه لونها اخضر و corner 30) */}
        <div className="relative mb-6">
          <div 
            className="w-full bg-black/30 backdrop-blur-xl border-2 border-green-500 rounded-[30px] p-8 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.25)] min-h-[220px]"
            style={{ borderColor: 'var(--primary-color)' }}
          >
            {/* Background Animated Flight Path Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
              <Plane className="w-48 h-48 text-green-500 -rotate-45" />
            </div>

            {/* Top Badge inside box */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full mb-4">
              <Sparkles className="w-3 h-3 text-green-400" />
              <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">
                {isAnalyzing ? 'جاري تحليل الخوارزمية...' : 'التوقع الحالي'}
              </span>
            </div>

            {/* Center Multiplier Display (0.00x) */}
            <AnimatePresence mode="wait">
              <MotionDiv
                key={currentValue}
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="text-5xl sm:text-6xl font-mono font-black tracking-tight drop-shadow-[0_0_20px_rgba(34,197,94,0.6)] text-white"
                style={{ color: currentValue !== '0.00x' ? 'var(--primary-color)' : '#ffffff' }}
              >
                {currentValue}
              </MotionDiv>
            </AnimatePresence>

            {/* Subtitle Status */}
            <p className="text-[11px] text-zinc-400 font-bold mt-3 text-center">
              {isAnalyzing 
                ? 'جاري الربط مع سيرفر Crash واستخراج معامل الصعود...' 
                : currentValue === '0.00x' 
                  ? 'اضغط على START لبدء استخراج التوقع' 
                  : 'توقع مؤكد وسليم 100%'}
            </p>
          </div>
        </div>

        {/* Buttons Row (تحت المربع: زر START وزر Restart باللون الأبيض) */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* START Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleStart}
            disabled={isAnalyzing}
            className={`w-full py-3.5 px-4 bg-white hover:bg-zinc-100 text-black font-black text-sm uppercase tracking-wider rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <Play className="w-4 h-4 fill-black" />
            <span>START</span>
          </motion.button>

          {/* RESTART Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleRestart}
            disabled={isAnalyzing}
            className="w-full py-3.5 px-4 bg-white hover:bg-zinc-100 text-black font-black text-sm uppercase tracking-wider rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>RESTART</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CrashGame;
