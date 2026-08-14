
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Platform } from '../types';
import { Check, ChevronRight, Zap, Lock, Shield, Globe, Cpu, Radio, Target, Terminal, Wifi } from 'lucide-react';
import { audioManager } from '../utils/audioManager';

interface PlatformSelectionProps {
  onSelect: (platform: Platform) => void;
  t: any;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const PlatformSelection: React.FC<PlatformSelectionProps> = ({ onSelect, t }) => {
  const [selected, setSelected] = useState<Platform>('linebet_v1');
  const [scanLinePos, setScanLinePos] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("تحديد موقع العقدة...");
  const [onlineUsers, setOnlineUsers] = useState(Math.floor(Math.random() * (2500 - 1800) + 1800));
  
  const platforms = [
    {
      id: 'linebet_v1' as Platform,
      name: 'Greenbet',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEj5eP5tNE8iMZoLHE9i4q-JYLMiLmHaIMKatrmBePA&s=10',
      tagline: 'عقدة استراتيجية: ألفا',
      status: 'محسن',
      latency: '14ms',
      geo: 'عالمي',
      ip: '192.168.1.104'
    },
    {
      id: 'linebet_v2' as Platform,
      name: 'Winwin',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDBd0TpCQWUvWfxuU9DfJRgEs604mfmOEr0EHZOY0b9w&s=10',
      tagline: 'عقدة استراتيجية: برافو',
      status: 'مؤكد',
      latency: '18ms',
      geo: 'إقليمي',
      ip: '172.16.254.1'
    }
  ];

  const selectedNode = platforms.find(p => p.id === selected) || platforms[0];

  useEffect(() => {
    const root = document.documentElement;
    if (selected === 'linebet_v2') {
      root.style.setProperty('--primary-color', '#ef4444');
      root.style.setProperty('--primary-color-rgb', '239, 68, 68');
      root.style.setProperty('--primary-glow', 'rgba(239, 68, 68, 0.5)');
    } else {
      root.style.setProperty('--primary-color', '#22c55e');
      root.style.setProperty('--primary-color-rgb', '34, 197, 94');
      root.style.setProperty('--primary-glow', 'rgba(34, 197, 94, 0.5)');
    }
  }, [selected]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
        const next = prev + change;
        return Math.max(1500, Math.min(3000, next));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLinePos(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isConnecting) {
      const duration = 4000;
      const interval = 40;
      const totalSteps = duration / interval;
      const stepValue = 100 / totalSteps;

      const timer = setInterval(() => {
        setProgress(prev => {
          const next = prev + stepValue;
          
          if (next < 25) setStatusText("بدء المصافحة...");
          else if (next < 50) setStatusText("تجاوز جدار الحماية...");
          else if (next < 75) setStatusText("مزامنة قاعدة البيانات...");
          else if (next < 95) setStatusText("تحسين التحليلات...");
          else setStatusText("تم تأمين الاتصال");

          if (next >= 100) {
            clearInterval(timer);
            return 100;
          }
          return next;
        });
      }, interval);

      const finishTimer = setTimeout(() => {
        onSelect(selected);
      }, duration + 500);

      return () => {
        clearInterval(timer);
        clearTimeout(finishTimer);
      };
    }
  }, [isConnecting, onSelect, selected]);

  const handleProceed = () => {
    audioManager.playClick();
    setIsConnecting(true);
  };

  const handlePlatformSelect = (id: Platform) => {
    if (!isConnecting) {
      audioManager.playClick();
      setSelected(id);
    }
  };

  return (
    <div className="flex flex-col relative bg-transparent font-sans">
      {/* Background Matrix/Grid Layer */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-color-rgb),0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-color-rgb),0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-green-500/5" />
      </div>

      {/* Header Section - Static Compact Pill */}
      <div className="pt-6 pb-4 flex justify-center z-50">
        <header 
          className="flex items-center gap-3 px-5 py-1.5 bg-zinc-900/90 backdrop-blur-xl border rounded-full shadow-[0_0_15px_rgba(var(--primary-color-rgb),0.2)]"
          style={{ borderColor: 'rgba(var(--primary-color-rgb), 0.3)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_var(--primary-color)]" style={{ backgroundColor: 'var(--primary-color)' }} />
          <span className="text-[9px] text-white/70 font-black tracking-widest uppercase">المتصلين:</span>
          <span className="text-sm font-mono font-black tabular-nums tracking-tight" style={{ color: 'var(--primary-color)' }}>
            {onlineUsers.toLocaleString()}
          </span>
        </header>
      </div>

      {/* Main Selection Area - Dual Core Layout */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 my-auto">
        <div className="grid grid-cols-1 gap-8 w-full max-w-sm">
          {platforms.map((p, idx) => {
            const isPari = p.id === 'linebet_v2';
            const itemColor = isPari ? '#ef4444' : '#22c55e';
            return (
            <button
              key={p.id}
              onClick={() => handlePlatformSelect(p.id)}
              disabled={isConnecting}
              className="relative group outline-none"
            >
              {/* Static Selection Ring */}
              {selected === p.id && (
                <div 
                  className="absolute -inset-3 border rounded-3xl pointer-events-none"
                  style={{ borderColor: `${itemColor}50` }}
                />
              )}

              <div className={`relative flex items-center gap-6 p-6 rounded-[2rem] border-2 transition-all duration-300 ${
                selected === p.id 
                  ? 'bg-transparent border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
                  : 'bg-transparent border-white/30 hover:border-white/70'
              }`}>
                {/* Hexagon/Circle Image Container */}
                <div className="relative shrink-0">
                  <div className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    selected === p.id ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-white/30 grayscale opacity-50'
                  }`}>
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  
                  {/* Status Indicator Dot */}
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-black flex items-center justify-center ${
                    selected === p.id ? 'bg-white' : 'bg-zinc-800'
                  }`}>
                    {selected === p.id && <Check className="w-2.5 h-2.5 text-black stroke-[4px]" />}
                  </div>
                </div>

                <div className="flex-1 text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-2xl font-black tracking-tighter transition-colors ${
                      selected === p.id ? 'text-white' : 'text-zinc-400'
                    }`}>{p.name}</h3>
                    <span className={`text-[8px] font-mono px-2 py-0.5 rounded border ${
                      selected === p.id ? 'border-white/60 text-white' : 'border-zinc-800 text-zinc-600'
                    }`}>{p.latency}</span>
                  </div>
                  <p className={`text-[9px] uppercase tracking-widest font-bold transition-colors ${
                    selected === p.id ? 'text-white/80' : 'text-zinc-600'
                  }`}>{p.tagline}</p>
                  
                  {/* Technical Static Mini-Graph */}
                  <div className="flex gap-1 h-3 items-end">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i}
                        style={{ 
                          height: selected === p.id ? `${(i % 3 + 1) * 3 + 2}px` : '4px',
                          backgroundColor: selected === p.id ? itemColor : '#27272a'
                        }}
                        className="w-1 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Coordinates */}
              <div className="absolute -bottom-4 left-8 flex gap-4 opacity-20">
                <span className="text-[6px]" style={{ color: itemColor }}>X: {idx * 142}.22</span>
                <span className="text-[6px]" style={{ color: itemColor }}>Y: {idx * 89}.45</span>
              </div>
            </button>
          );
          })}
        </div>
      </main>

      {/* Footer / Action Area */}
      <footer className="relative z-10 p-8 pb-12 shrink-0">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center px-2">
            <div className="flex flex-col">
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest">العقدة النشطة</span>
              <span className="text-[10px] text-white font-black uppercase tracking-widest">
                {selectedNode.name}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest">الحالة</span>
              <div className="flex items-center gap-1.5 justify-end">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary-color)' }} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--primary-color)' }}>جاهز</span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleProceed}
            disabled={isConnecting}
            className="group relative w-full h-16 rounded-2xl bg-transparent border-2 border-white hover:bg-white/10 text-white font-black text-lg tracking-[0.2em] uppercase flex items-center justify-center gap-4 overflow-hidden transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 transition-colors">اختيار المنصه</span>
            <ChevronRight className="relative z-10 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>

          <div className="flex justify-center gap-8 opacity-20">
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3 text-green-500" />
              <span className="text-[7px] uppercase tracking-widest">وصول المحطة</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-green-500" />
              <span className="text-[7px] uppercase tracking-widest">ارتباط آمن</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Connection dialog removed per request */}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default PlatformSelection;
