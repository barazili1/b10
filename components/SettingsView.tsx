import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ArrowRight, 
  Download, 
  CreditCard, 
  ShieldCheck, 
  Fingerprint, 
  Lock, 
  ArrowLeft, 
  Zap, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Globe, 
  CheckCircle2,
  Send,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Platform } from '../types';
import { audioManager } from '../utils/audioManager';

const MotionDiv = motion.div as any;

interface SettingsViewProps {
  onComplete: (userId: string) => void;
  onBack: () => void;
  lang: Language;
  t: any;
  platform: Platform;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onComplete, onBack, lang, t, platform }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState<{ userId?: boolean; userIdLength?: boolean }>({});
  
  const platformName = platform === 'linebet_v1' ? 'Greenbet' : 'PariPulse';
  const platformImg = platform === 'linebet_v1' 
    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEj5eP5tNE8iMZoLHE9i4q-JYLMiLmHaIMKatrmBePA&s=10'
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg6-yMiToAplqRqnBnaYACm49Od_26EabD95SDPxqLgg&s=10';

  const greenbetDownloadUrl = "https://refpa79184.com/L?tag=d_5848868m_188307c_&site=5848868&ad=188307";
  const xbetDownloadUrl = "https://pari-pulse.com/Mlstr-app";
  const downloadUrl = platform === 'linebet_v1' ? greenbetDownloadUrl : xbetDownloadUrl;
  const telegramUrl = "https://t.me/+w3sTqpPkfwE0ZjM0";

  const handleCopy = () => {
    audioManager.playCopy();
    navigator.clipboard.writeText("B10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 15) {
      setUserId(val);
      if (val.length >= 10) {
        setErrors({ userId: false, userIdLength: false });
      }
    }
  };

  const validateAndSubmit = () => {
    audioManager.playClick();
    const trimmedId = userId.trim();
    const isLengthValid = trimmedId.length >= 10 && trimmedId.length <= 15;
    
    const newErrors = {
      userId: !trimmedId,
      userIdLength: !isLengthValid,
    };

    setErrors(newErrors);

    if (!newErrors.userId && !newErrors.userIdLength) {
      onComplete(trimmedId);
    }
  };

  const goToNextStep = () => {
    audioManager.playClick();
    if (activeStep < 4) {
      setActiveStep(prev => prev + 1);
    }
  };

  const goToPrevStep = () => {
    audioManager.playClick();
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const stepsList = [
    {
      id: 0,
      number: "01",
      title: t.install_app || "تثبيت التطبيق",
      subtitle: `تحميل تطبيق ${platformName} الرسمي`,
      icon: Download
    },
    {
      id: 1,
      number: "02",
      title: "قناة التلجرام",
      subtitle: "الاشتراك بالقناة الرسمية",
      icon: Send
    },
    {
      id: 2,
      number: "03",
      title: t.registration || "التسجيل بالبروموكود",
      subtitle: "استخدام كود B10 الخصمي",
      icon: Lock
    },
    {
      id: 3,
      number: "04",
      title: t.activation_deposit || "إيداع التفعيل",
      subtitle: "الحد الأدنى لتفعيل التوقعات",
      icon: CreditCard
    },
    {
      id: 4,
      number: "05",
      title: t.verify_account || "تأكيد الحساب",
      subtitle: "إدخال ID وتأكيد المزامنة",
      icon: Fingerprint
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-transparent font-sans text-white selection:bg-green-500/30" dir="rtl">
      {/* Background Grid & Ambient Glow */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-color-rgb),0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-color-rgb),0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col px-3 sm:px-6 pt-4 pb-16 max-w-2xl mx-auto w-full">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-5">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center hover:border-green-500/50 hover:text-green-500 transition-all active:scale-95 shadow-md"
            title="رجوع"
          >
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
          
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_var(--primary-color)]" />
            <span className="text-xs font-black tracking-widest uppercase text-green-500">
              شروط تفعيل {platformName}
            </span>
          </div>
        </div>

        {/* Step Wizard Nav Badges (5 Steps Horizontal Grid) */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-5">
          {stepsList.map((step) => {
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;
            const StepIcon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => {
                  audioManager.playClick();
                  setActiveStep(step.id);
                }}
                className={`relative flex flex-col items-center p-2 sm:p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 text-center ${
                  isActive 
                    ? 'bg-green-500/15 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.25)] scale-[1.02]' 
                    : isCompleted
                      ? 'bg-black/40 border-green-500/40 text-green-400'
                      : 'bg-black/30 border-white/10 text-zinc-400 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <StepIcon className={`w-3.5 h-3.5 ${isActive ? 'text-green-500 animate-pulse' : 'text-zinc-500'}`} />
                  )}
                  <span className={`text-xs font-black ${isActive ? 'text-green-400' : 'text-zinc-400'}`}>
                    {step.number}
                  </span>
                </div>
                <span className={`text-[9px] sm:text-[11px] font-bold line-clamp-1 truncate w-full ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                  {step.title}
                </span>
                
                {/* Active Underline Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-1 right-1 h-1 bg-green-500 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Step Card Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <MotionDiv
              key={activeStep}
              initial={{ opacity: 0, x: -15, scale: 0.99 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 15, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative bg-black/30 backdrop-blur-xl border border-white/15 rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Background Accent Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.9)]" />

              {/* STEP 01: INSTALL APP */}
              {activeStep === 0 && (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-black border border-white/15 p-2 overflow-hidden flex items-center justify-center shadow-md">
                        <img src={platformImg} alt={platformName} className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <span className="text-xs text-green-500 font-black uppercase tracking-widest block mb-0.5">الشرط الأول (01)</span>
                        <h2 className="text-lg sm:text-xl font-black text-white">{t.install_app || "تثبيت التطبيق الرسمي"}</h2>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Download className="w-5 h-5 text-green-500" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                    قم بتنزيل وتثبيت تطبيق منصة <span className="text-green-400 font-bold">{platformName}</span> الرسمي المعتمد لربط الحساب مع سيرفر التوقعات بنجاح.
                  </p>

                  <a 
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => audioManager.playClick()}
                    className="w-full h-16 sm:h-18 rounded-2xl bg-white hover:bg-green-500 text-black font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl group"
                  >
                    <span>{t.install_btn || "تثبيت التطبيق الآن"}</span>
                    <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  </a>

                  {/* Next Step Button Underneath */}
                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                      onClick={goToNextStep}
                      className="w-full sm:w-auto px-6 h-12 rounded-xl bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-green-500/30 transition-all active:scale-95"
                    >
                      <span>الشرط التالي (الاشتراك بالتلجرام)</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 02: TELEGRAM SUBSCRIPTION */}
              {activeStep === 1 && (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#0088cc]/10 border border-[#0088cc]/30 flex items-center justify-center shadow-md">
                        <Send className="w-6 h-6 text-[#0088cc]" />
                      </div>
                      <div>
                        <span className="text-xs text-[#0088cc] font-black uppercase tracking-widest block mb-0.5">الشرط الثاني (02)</span>
                        <h2 className="text-lg sm:text-xl font-black text-white">الاشتراك في قناة التلجرام</h2>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-[#0088cc]" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                    انضم إلى القناة الرسمية على التلجرام لمتابعة التحديثات الحصرية واستلام الإشارات الفورية قبل تشغيل التوقع.
                  </p>

                  <a 
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => audioManager.playClick()}
                    className="w-full h-16 sm:h-18 rounded-2xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_25px_rgba(0,136,204,0.4)] group"
                  >
                    <span>الانضمام لقناة التلجرام الآن</span>
                    <Send className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  {/* Navigation Buttons Underneath */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={goToPrevStep}
                      className="px-5 h-12 rounded-xl bg-zinc-800 text-zinc-200 hover:text-white font-black text-xs sm:text-sm uppercase flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>السابق</span>
                    </button>

                    <button
                      onClick={goToNextStep}
                      className="flex-1 sm:flex-initial px-6 h-12 rounded-xl bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-green-500/30 transition-all active:scale-95"
                    >
                      <span>الشرط التالي (البروموكود)</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 03: REGISTRATION & PROMOCODE */}
              {activeStep === 2 && (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-md">
                        <Lock className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <span className="text-xs text-green-500 font-black uppercase tracking-widest block mb-0.5">الشرط الثالث (03)</span>
                        <h2 className="text-lg sm:text-xl font-black text-white">{t.registration || "التسجيل بالبروموكود"}</h2>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-green-500" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                    عند إنشاء حسابك الجديد على المنصة، تأكد من إدخال الرمز الترويجي التالي لتفعيل خصم السيرفر وضمان مزامنة التوقعات:
                  </p>

                  <div 
                    onClick={handleCopy}
                    className="relative bg-black/40 backdrop-blur-sm rounded-2xl border-2 border-dashed border-green-500/50 hover:border-green-500 p-4 sm:p-5 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-zinc-400 font-black uppercase tracking-widest mb-1 block">كود البروموكود المعتمد</span>
                        <span className="text-2xl sm:text-3xl font-black tracking-[0.2em] text-green-400">B10</span>
                      </div>
                      <div className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                        copied ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-white/10 text-white group-hover:bg-green-500/20'
                      }`}>
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>تم النسخ!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>نسخ الكود (B10)</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons Underneath */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={goToPrevStep}
                      className="px-5 h-12 rounded-xl bg-zinc-800 text-zinc-200 hover:text-white font-black text-xs sm:text-sm uppercase flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>السابق</span>
                    </button>

                    <button
                      onClick={goToNextStep}
                      className="flex-1 sm:flex-initial px-6 h-12 rounded-xl bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-green-500/30 transition-all active:scale-95"
                    >
                      <span>الشرط التالي (إيداع التفعيل)</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 04: ACTIVATION DEPOSIT */}
              {activeStep === 3 && (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-md">
                        <CreditCard className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <span className="text-xs text-green-500 font-black uppercase tracking-widest block mb-0.5">الشرط الرابع (04)</span>
                        <h2 className="text-lg sm:text-xl font-black text-white">{t.activation_deposit || "إيداع التفعيل الأول"}</h2>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-green-500" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                    يتطلب تفعيل الخوارزمية إجراء أول عملية إيداع بالحساب للحد الأدنى المطلوب لتأكيد ربط الحساب مع الخادم:
                  </p>

                  <div className="grid grid-cols-2 gap-4" dir="ltr">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/15 p-4 sm:p-5 rounded-2xl flex flex-col items-center justify-center text-center">
                      <span className="text-xs text-zinc-400 font-black uppercase tracking-widest mb-1">بالدولار ($)</span>
                      <span className="text-2xl sm:text-3xl font-black text-green-400">$5.00</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/15 p-4 sm:p-5 rounded-2xl flex flex-col items-center justify-center text-center">
                      <span className="text-xs text-zinc-400 font-black uppercase tracking-widest mb-1">بالجنيه (L.E)</span>
                      <span className="text-2xl sm:text-3xl font-black text-green-400">250 L.E</span>
                    </div>
                  </div>

                  {/* Navigation Buttons Underneath */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={goToPrevStep}
                      className="px-5 h-12 rounded-xl bg-zinc-800 text-zinc-200 hover:text-white font-black text-xs sm:text-sm uppercase flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>السابق</span>
                    </button>

                    <button
                      onClick={goToNextStep}
                      className="flex-1 sm:flex-initial px-6 h-12 rounded-xl bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-green-500/30 transition-all active:scale-95"
                    >
                      <span>الشرط الأخير (تأكيد الحساب)</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 05: VERIFY USER ID */}
              {activeStep === 4 && (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-md">
                        <Fingerprint className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <span className="text-xs text-green-500 font-black uppercase tracking-widest block mb-0.5">الشرط الخامس والأخير (05)</span>
                        <h2 className="text-lg sm:text-xl font-black text-white">{t.verify_account || "تأكيد ومعرفة ID الحساب"}</h2>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                    أدخل رقم معرف حسابك (ID) المكون من 10 إلى 15 رقم للتحقق من المزامنة وبدء التوقعات فوراً:
                  </p>

                  <div className="relative">
                    <label className="block text-xs text-zinc-300 mb-1.5 uppercase font-black tracking-widest">
                      {t.userid_label || "معرف حسابك (User ID)"}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 w-13 flex items-center justify-center border-l border-white/15">
                        <Fingerprint className={`w-6 h-6 ${userId ? 'text-green-500' : 'text-zinc-500'}`} />
                      </div>
                      <input 
                        type="tel" 
                        value={userId}
                        onChange={handleUserIdChange}
                        placeholder="أدخل ID حسابك هنا (مثال: 1234567890)"
                        maxLength={15}
                        className={`w-full bg-black/40 backdrop-blur-sm border text-white font-mono text-lg sm:text-xl pr-16 pl-4 py-3.5 rounded-2xl focus:outline-none transition-all text-right ${
                          errors.userId || errors.userIdLength 
                            ? 'border-red-500/80 focus:border-red-500' 
                            : 'border-white/20 focus:border-green-500'
                        }`}
                      />
                    </div>
                    {(errors.userId || errors.userIdLength) && (
                      <p className="text-red-400 text-xs font-bold mt-2 mr-1">
                        يرجى إدخال رقم ID صحيح مكون من 10 إلى 15 أرقام.
                      </p>
                    )}
                  </div>

                  {/* Navigation & Submit Buttons Underneath */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={goToPrevStep}
                      className="px-5 h-12 rounded-xl bg-zinc-800 text-zinc-200 hover:text-white font-black text-xs sm:text-sm uppercase flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>السابق</span>
                    </button>

                    <button 
                      onClick={validateAndSubmit}
                      className="flex-1 sm:flex-initial px-6 h-12 sm:h-13 rounded-xl bg-green-500 hover:bg-green-400 text-black font-black text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-[0.98] uppercase"
                    >
                      <span>{t.submit_verification || "تأكيد وتفعيل الحساب"}</span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>
              )}
            </MotionDiv>
          </AnimatePresence>
        </div>

        {/* Horizontal All Conditions Overview / Summary Below */}
        <div className="mt-5 p-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-between text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-500 animate-pulse" />
            <span>يتم التأكد من صحة البيانات تلقائياً عبر السيرفر الفوري</span>
          </div>
          <span className="font-bold text-zinc-400">{activeStep + 1} / 5</span>
        </div>

        {/* Footer Info */}
        <div className="mt-4 flex flex-col items-center gap-1.5 opacity-30">
          <div className="h-px w-10 bg-zinc-800" />
          <span className="text-[7.5px] font-black uppercase tracking-[0.3em] text-center">
            تشفير حماية عالي الأمان | بروتوكول أبل هاك
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
