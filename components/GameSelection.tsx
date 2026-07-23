import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Plane, ArrowLeft, Gamepad2, ShieldCheck, UserCheck } from 'lucide-react';
import { SelectedGame, Platform } from '../types';

const MotionDiv = motion.div as any;

interface GameSelectionProps {
  onSelectGame: (game: SelectedGame) => void;
  onBack: () => void;
  userId: string;
  platform: Platform;
  t: any;
}

export const GameSelection: React.FC<GameSelectionProps> = ({
  onSelectGame,
  onBack,
  userId,
  platform,
  t,
}) => {
  const platformName = platform === 'linebet_v1' ? 'Greenbet' : 'PariPulse';

  return (
    <div className="flex flex-col min-h-full bg-transparent font-sans text-white selection:bg-green-500/30" dir="rtl">
      <div className="relative z-10 flex flex-col px-4 pt-4 pb-12 max-w-md mx-auto w-full">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center hover:border-green-500/50 hover:text-green-400 transition-all active:scale-95 shadow-lg"
            title="رجوع"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_var(--primary-color)]" />
            <span className="text-[10px] font-black tracking-widest uppercase text-green-400">
              {platformName} Server VIP
            </span>
          </div>
        </div>

        {/* User Info Bar */}
        {userId && (
          <div className="mb-6 p-3 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-zinc-400 font-black uppercase tracking-wider">الحساب المفعّل</span>
                <span className="text-xs font-mono font-bold text-white tracking-wider">ID: {userId}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-black text-green-400 bg-green-500/10 px-2.5 py-1 rounded-lg border border-green-500/20">
              <ShieldCheck className="w-3 h-3" />
              <span>مضمون 100%</span>
            </div>
          </div>
        )}

        {/* Main Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
            <Gamepad2 className="w-3.5 h-3.5 text-green-400 animate-bounce" />
            <span className="text-[10px] font-bold text-zinc-300">اختر السيرفر المباشر</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">
            اختر اللعبة للتوقع
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            حدّد اللعبة المراد استخراج خوارزمية التوقعات الخاصة بها
          </p>
        </div>

        {/* Game Cards */}
        <div className="flex flex-col gap-4">
          {/* Apple of Fortune Option */}
          <MotionDiv
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectGame('apple')}
            className="group relative bg-black/30 backdrop-blur-xl border border-white/15 hover:border-green-500/80 rounded-2xl p-5 cursor-pointer transition-all duration-300 shadow-xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-green-500/10 blur-2xl rounded-full group-hover:bg-green-500/25 transition-all" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-950/40 border border-green-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)] group-hover:scale-110 transition-transform">
                  <Apple className="w-8 h-8 text-green-400 fill-green-500/30" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-black text-white group-hover:text-green-400 transition-colors">
                      Apple of Fortune
                    </h2>
                    <span className="text-[9px] font-black bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                      تفاحة الحظ
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    توقعات أماكن التفاح السليم وتجنب التفاح الفاسد
                  </p>
                </div>
              </div>
            </div>
          </MotionDiv>

          {/* Crash Game Option */}
          <MotionDiv
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectGame('crash')}
            className="group relative bg-black/30 backdrop-blur-xl border border-white/15 hover:border-green-500/80 rounded-2xl p-5 cursor-pointer transition-all duration-300 shadow-xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-green-500/10 blur-2xl rounded-full group-hover:bg-green-500/25 transition-all" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-950/40 border border-green-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)] group-hover:scale-110 transition-transform">
                  <Plane className="w-8 h-8 text-green-400 -rotate-45" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-black text-white group-hover:text-green-400 transition-colors">
                      Crash
                    </h2>
                    <span className="text-[9px] font-black bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                      لعبة الطائرة
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    توقع معامل هبوط وسقوط الطائرة بدقة عالية
                  </p>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
            متصل بالسيرفر الرئيسي لـ {platformName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameSelection;
