import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Trash2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import JettieMascot from './JettieMascot';
import { Message } from '../types';

interface JettieChatProps {
  userRole?: 'member' | 'provider' | 'guest';
  onNavigateToTab?: (tabName: string) => void;
}

export default function JettieChat({ userRole = 'guest', onNavigateToTab }: JettieChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'jettie',
      text: userRole === 'provider' 
        ? "Greetings, Dr. Smith! 👨‍✈️ Co-pilot Jettie here. Ready to cruise through today's patient schedule, review practice performance, or authorize some speedy prescriptions? What's our flight path today?"
        : userRole === 'member'
        ? "Welcome aboard JetHealth, Jack! ✈️ I'm Jettie, your personal health flight navigator. Need me to track your JHEA-001 enrollment, verify your dental benefits, or locate a network provider? Let's soar toward great health!"
        : "Welcome to JetHealth! ✈️ I'm Jettie, your health navigator. Looking for premium healthcare coverage or provider portals? Ask me anything—we're cruising at a smooth, turbulence-free altitude!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompts based on active role
  const suggestions = {
    guest: [
      "What plans does JetHealth offer?",
      "How do I sign up as a Member?",
      "Is there a Provider portal?",
    ],
    member: [
      "Check JHEA-001 Status",
      "Is my Dental plan active?",
      "Tell me about RISE Premium",
      "How do I find a doctor?",
    ],
    provider: [
      "Search Dr. Smith's Patients",
      "How do I write a prescription?",
      "Check clinic performance",
      "What is Jettie's support number?",
    ]
  };

  const currentSuggestions = suggestions[userRole];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate Jettie's typing and response
    setTimeout(() => {
      const jettieText = generateJettieResponse(text);
      const jettieMsg: Message = {
        id: `jettie-${Date.now()}`,
        sender: 'jettie',
        text: jettieText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, jettieMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const generateJettieResponse = (input: string): string => {
    const query = input.toLowerCase();

    // Member and enrollment triggers
    if (query.includes('jhea') || query.includes('enrollment') || query.includes('status') || query.includes('application')) {
      return "Roger that! Let's check our flight instruments. 🛰️ I see JHEA-001 has been submitted and is currently in 'Processing' status. It includes Jet Dental Basic and RISE Premium with a total applied rate of $1,088.49. No turbulence expected, Dr. Bruce Wayne has digitally authorized it for Jack Ledger! Click the 'My Coverage' tab to review the exact breakdown!";
    }
    
    if (query.includes('dental') || query.includes('teeth') || query.includes('dentist')) {
      return "Ah, Jet Dental Basic! 🦷 Perfect for keeping your pearly whites ready for high-altitude smiles! This plan has been 'Purchased & Verified' on your account. It covers preventative care at 100%, basic fillings at 80%, and orthodontics at 50% up to $2,000 per year. Ready to schedule a cleaning? Just let me know!";
    }

    if (query.includes('rise') || query.includes('premium') || query.includes('dependent') || query.includes('child')) {
      return "Soaring high with RISE Premium! 🚀 This is our premium healthcare program covering dependents under the age of 23. It's 'Purchased (Verified)' on your account. It unlocks 24/7 pediatric telehealth, direct coordinate access, and 0% copays for in-network urgent care. Jack, your family's coverage is secured in our main cabin!";
    }

    if (query.includes('find') || query.includes('doctor') || query.includes('specialist') || query.includes('physician')) {
      if (onNavigateToTab && userRole === 'member') {
        setTimeout(() => onNavigateToTab('doctors'), 1000);
        return "Preparing coordinates... 🗺️ Initiating flight path to 'Find a Doctor'! I am switching your navigation view right now so you can search our premier network of physicians nearby. Sit back, relax, and let's find your care provider!";
      }
      return "Locating flight coordinates! 🗺️ JetHealth has a network of over 14,000 premier, board-certified providers across all specialties. As a Member, you have access to doctors like Dr. Bruce Wayne and Dr. Smith with zero pre-approvals required. Simply head over to our 'Find a Doctor' section to search!";
    }

    // Provider triggers
    if (query.includes('patient') || query.includes('records') || query.includes('john') || query.includes('sarah')) {
      if (onNavigateToTab && userRole === 'provider') {
        setTimeout(() => onNavigateToTab('patients'), 1000);
        return "Opening cockpit flight logs! 📋 I am navigating you directly to 'Patient Records' where you can search Dr. Smith's patients in real-time. We have John D. (BlueShield PPO), Sarah M. (Medicare Plan A), and John T. (Medicare Plan B) registered. Prepare for landing on the Patient directory!";
      }
      return "Reviewing patient logs! 📋 Dr. Smith currently has 4 primary patients scheduled: John D. (BlueShield PPO), Sarah M. (Medicare Plan A, last visit 1 month ago), John T. (Medicare Plan B), and Sarah M. (second). You can search, edit, view vitals, or add records directly in the 'Patients' portal tab!";
    }

    if (query.includes('prescription') || query.includes('med') || query.includes('rx') || query.includes('drug')) {
      if (onNavigateToTab && userRole === 'provider') {
        setTimeout(() => onNavigateToTab('prescriptions'), 1000);
        return "Routing to Rx Dispatch! 💊 Navigating to the 'Prescriptions' control desk. Here you can write and digitally authorize prescriptions directly to local pharmacies. Let's get those meds delivered at jet-speed!";
      }
      return "Prescription dispatch fully operational! 💊 Providers can instantly authorize and transmit Rx orders to over 60,000 partner pharmacies. Patients can track refills on their Member Dashboard. Fast, secure, and paperless—just like a digital flight plan!";
    }

    if (query.includes('performance') || query.includes('analytics') || query.includes('chart') || query.includes('practice')) {
      if (onNavigateToTab && userRole === 'provider') {
        setTimeout(() => onNavigateToTab('performance'), 1000);
        return "Initiating diagnostic scans! 📊 Switching view to 'Practice Performance' analytics. You will see interactive graphs covering patient volume growth, billing claims verification speed (98.4% success!), and clinical outcomes. Our practice is in excellent cruising conditions!";
      }
      return "Clinic instruments check! 📊 Dr. Smith's clinic is performing wonderfully with a 98.4% Claims Approval Rate, a median urgent-care check-in under 15 minutes, and a 12% quarter-over-quarter patient roster expansion! See all performance charts in the Provider dashboard.";
    }

    if (query.includes('support') || query.includes('hours') || query.includes('address') || query.includes('phone') || query.includes('contact')) {
      return "Coordinates logged! 📍 Our ground support headquarters is at 2361 Main Anand Bve, Rondon, TH 30003. You can dial us directly at 1-800-JET-CARE (1-800-538-2273). Our support engines are active Monday to Friday from 7:00 AM to 6:30 PM, with premium chat support running 1:00 AM to 7:30 PM!";
    }

    if (query.includes('plan') || query.includes('cost') || query.includes('rate') || query.includes('sign up')) {
      return "A health journey of a thousand miles begins with a solid plan! ✈️ We offer robust coverage packages including Comprehensive Medical Care, Dental Essentials, and our signature RISE family protector program. For signups, you can fill out our standard digital application form on the Member dashboard!";
    }

    if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('jettie')) {
      return "Hello! Co-pilot Jettie reporting for duty! 👋 Ready to soar to new healthcare heights? Tell me how I can help you pilot your JetHealth experience today!";
    }

    // Default response filled with plane puns
    return `Roger that! ✈️ I'm processing your inquiry through my JetHealth Flight Brain. Since we're cruising in mockup airspace, I highly recommend checking out our interactive tabs or asking about: 'JHEA-001 status', 'Dental plans', 'RISE Premium', or 'Clinic analytics'! Clear skies ahead! ☀️`;
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'jettie',
        text: "Radar sweep complete! 📡 Live logs cleared. Co-pilot Jettie back on standby. Let me know which direction we're headed next!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden font-sans">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-jetblue-500 to-jetblue-600 px-4 py-3 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-1.5 rounded-full border border-white/20">
            <JettieMascot type={userRole === 'provider' ? 'headset' : 'standard'} size={38} className="!-my-1.5" />
          </div>
          <div>
            <h4 className="font-bold tracking-tight text-sm md:text-base flex items-center gap-1.5">
              Jettie Copilot <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse fill-yellow-300" />
            </h4>
            <p className="text-xs text-slate-100 opacity-90 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              Cruising at 30,000 ft ✈️
            </p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-100 hover:text-white"
          title="Clear chat log"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-3 min-h-[220px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.sender === 'jettie' && (
                <div className="shrink-0 bg-white border border-slate-100 p-1 rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                  <JettieMascot type={userRole === 'provider' ? 'headset' : 'standard'} size={24} />
                </div>
              )}
              <div>
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-jetblue-500 text-white rounded-tr-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block px-1 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-2 max-w-[85%] items-start">
              <div className="shrink-0 bg-white border border-slate-100 p-1 rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                <JettieMascot type={userRole === 'provider' ? 'headset' : 'standard'} size={24} />
              </div>
              <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions Chips */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none scroll-smooth">
        {currentSuggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => handleSend(suggestion)}
            className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-medium hover:border-jetblue-500 hover:text-jetblue-500 transition-colors cursor-pointer shrink-0"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Chat Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputText);
        }}
        className="p-3 bg-white border-t border-slate-100 flex gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask copilot Jettie anything...`}
          className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-jetblue-500 focus:bg-white transition-colors text-slate-800"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="bg-jetblue-500 hover:bg-jetblue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white p-2 rounded-xl transition-colors shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
