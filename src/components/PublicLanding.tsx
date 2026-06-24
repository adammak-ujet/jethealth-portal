import React from 'react';
import { Shield, Users, CheckCircle, ArrowRight, Activity, Plane, Sparkles, MessageCircle, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from './Logo';
import JettieMascot from './JettieMascot';
import JettieChat from './JettieChat';

interface PublicLandingProps {
  onEnterMemberPortal: () => void;
  onEnterProviderPortal: () => void;
}

export default function PublicLanding({ onEnterMemberPortal, onEnterProviderPortal }: PublicLandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-white to-slate-50 font-sans text-slate-800">
      
      {/* Premium Top Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-30 border-b border-slate-100 shadow-xs">
        <Logo size="md" />
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-jetblue-500 transition-colors">Key Features</a>
          <a href="#jettie" className="hover:text-jetblue-500 transition-colors">Meet Jettie</a>
          <a href="#portals" className="hover:text-jetblue-500 transition-colors">Portals</a>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={onEnterMemberPortal}
            className="text-slate-600 hover:text-slate-900 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Member Log
          </button>
          <button 
            onClick={onEnterProviderPortal}
            className="bg-jetblue-500 hover:bg-jetblue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-500/10 transition-colors cursor-pointer"
          >
            Provider Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 md:pt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-jetblue-500 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
            Introducing the Next Flight in Healthcare
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            Higher Care.<br />
            <span className="text-jetblue-500">Faster Delivery.</span>
          </h1>
          
          <p className="text-slate-500 text-base sm:text-lg max-w-xl leading-relaxed">
            JetHealth coordinates premium member health plans and elite provider workspace intelligence into one single unified altitude. Experience zero-friction coverage and zero-delay scheduling.
          </p>

          {/* Quick Stats list */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="space-y-0.5 border-l-2 border-jetblue-500 pl-3">
              <div className="text-2xl font-extrabold text-slate-800">98.4%</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Claims Approved</div>
            </div>
            <div className="space-y-0.5 border-l-2 border-jetblue-500 pl-3">
              <div className="text-2xl font-extrabold text-slate-800">15m</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Check-in Wait</div>
            </div>
            <div className="space-y-0.5 border-l-2 border-jetblue-500 pl-3">
              <div className="text-2xl font-extrabold text-slate-800">24/7</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Digital Copilot</div>
            </div>
          </div>
        </div>

        {/* Mascot floating mockup visual */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-8">
          <div className="absolute inset-0 bg-blue-400/5 rounded-full blur-3xl -z-10"></div>
          
          {/* Animated Mascot display card */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xl w-full max-w-sm text-center relative overflow-hidden"
          >
            {/* Blue wing lines */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-jetblue-50 rounded-full blur-xl opacity-80"></div>
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-jetblue-50 rounded-full blur-xl opacity-80"></div>

            <JettieMascot type="standard" size={140} className="mx-auto" />
            
            <h3 className="font-bold text-lg text-slate-800 mt-4 flex items-center justify-center gap-1.5">
              Jettie Copilot <Sparkles className="w-4 h-4 text-yellow-400 fill-current" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              "We're cruising at a smooth, healthy altitude. Ready to file a dental claim, search providers, or explore your clinic dashboards?"
            </p>
          </motion.div>
        </div>
      </header>

      {/* Double Gate Portals Selection Section */}
      <section id="portals" className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16 border-t border-slate-100">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">Choose Your JetHealth Destination</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">We offer bespoke portal environments customized for both health members and clinic practitioners.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Member Portal card gateway (Geometric Balance White Card) */}
          <div className="group relative bg-white border border-slate-200 rounded-3xl p-10 flex flex-col justify-between min-h-[420px] transition-all hover:border-jetblue-500 hover:shadow-2xl hover:shadow-jetblue-100">
            <div className="absolute top-6 right-8 text-6xl font-black text-slate-100 opacity-15 group-hover:opacity-25 transition-opacity uppercase pointer-events-none select-none font-display">
              Members
            </div>
            
            <div className="z-10">
              <div className="w-12 h-12 bg-jetblue-50 text-jetblue-500 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4 text-slate-900 font-display">Personal Care Hub</h3>
              <p className="text-slate-500 leading-relaxed mb-6 text-sm">
                Log in to track active insurance enrollments (JHEA-001), browse network specialists, review copay schedules, and chat with Jettie.
              </p>
              
              <ul className="space-y-3 text-xs">
                <li className="flex items-center gap-3 text-slate-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-jetblue-500"></div> Dental Basic ($348) & RISE Premium ($1,349.49)
                </li>
                <li className="flex items-center gap-3 text-slate-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-jetblue-500"></div> Interactive Claims Calculator
                </li>
                <li className="flex items-center gap-3 text-slate-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-jetblue-500"></div> 24/7 Digital Jettie Copilot Access
                </li>
              </ul>
            </div>

            <button 
              onClick={onEnterMemberPortal}
              className="mt-8 w-full py-4 text-center font-bold text-jetblue-600 bg-jetblue-50 rounded-2xl group-hover:bg-jetblue-500 group-hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              Enter Member Portal <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Provider Portal card gateway (Geometric Balance Dark Card) */}
          <div className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col justify-between min-h-[420px] transition-all hover:shadow-2xl hover:shadow-jetblue-900/20">
            <div className="absolute top-6 right-8 text-6xl font-black text-white opacity-5 group-hover:opacity-10 transition-opacity uppercase pointer-events-none select-none font-display">
              Provider
            </div>
            
            <div className="z-10">
              <div className="w-12 h-12 bg-white/10 text-jetblue-500 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4 text-white font-display">Clinical Operations</h3>
              <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                Clinicians can manage appointments schedules, review digital medical chart files, authorize prescriptions, and analyze growth metrics.
              </p>
              
              <ul className="space-y-3 text-xs">
                <li className="flex items-center gap-3 text-slate-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-jetblue-500"></div> Instant Claims Processing & Scheduling
                </li>
                <li className="flex items-center gap-3 text-slate-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-jetblue-500"></div> Secure Electronic Chart Registry
                </li>
                <li className="flex items-center gap-3 text-slate-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-jetblue-500"></div> Auto Rx Formulary & Audit Logs
                </li>
              </ul>
            </div>

            <button 
              onClick={onEnterProviderPortal}
              className="mt-8 w-full py-4 text-center font-bold text-white bg-jetblue-500 rounded-2xl hover:bg-jetblue-600 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Access Provider Suite <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Meet Jettie Spotlights Section */}
      <section id="jettie" className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/50 rounded-3xl border border-slate-100/50">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-yellow-100 border border-yellow-200 text-yellow-800 font-bold px-3.5 py-1 rounded-full text-xs w-fit flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" /> Co-pilot active!
          </div>
          <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">Meet Jettie</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Jettie is JetHealth's custom digital health assistant. Whether answering health coverage plans, guiding dental claims calculations, verifying prescriptions speed, or helping clinic co-pilots run clinics, Jettie ensures no healthcare turbulence gets in your way.
          </p>
          
          <div className="space-y-3.5 pt-2 text-slate-600 text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
              <span>Full compliance & secure SHA-256 digital audits</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
              <span>Pediatric, general care, and dental plan navigation</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
              <span>Connected in real-time across Members & Providers</span>
            </div>
          </div>
        </div>

        {/* Embedded Active Chat with Jettie on Landing Page */}
        <div className="lg:col-span-7 h-[460px] border border-slate-100 shadow-lg rounded-2xl overflow-hidden">
          <JettieChat userRole="guest" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <Logo size="sm" iconOnly={false} />
          <div>© 2026 JetHealth Inc. All health flight plans subject to regulatory compliance. Confidential.</div>
        </div>
      </footer>

    </div>
  );
}
