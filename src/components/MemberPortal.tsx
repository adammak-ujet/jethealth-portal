import React, { useState } from 'react';
import { 
  FileText, ShieldCheck, Search, Calendar, Heart, MessageSquare, 
  Sparkles, Download, CheckCircle, Clock, PlusCircle, ArrowRight, MapPin, Phone,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import JettieMascot from './JettieMascot';
import JettieChat from './JettieChat';
import { Patient, Appointment, Claim } from '../types';

interface MemberPortalProps {
  patients: Patient[];
  appointments: Appointment[];
  claims: Claim[];
  onAddAppointment: (appointment: Appointment) => void;
  onAddClaim: (claim: Claim) => void;
  onNavigateToProvider: () => void;
  onNavigateToHome: () => void;
}

export default function MemberPortal({
  patients,
  appointments,
  claims,
  onAddAppointment,
  onAddClaim,
  onNavigateToProvider,
  onNavigateToHome
}: MemberPortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'coverage' | 'doctors' | 'chat'>('dashboard');
  
  // New appointment form state
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<{name: string, specialty: string} | null>(null);
  const [aptDate, setAptDate] = useState('2026-06-25');
  const [aptTime, setAptTime] = useState('10:00 AM');
  const [aptReason, setAptReason] = useState('Routine Checkup');

  // New claim form state
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [selectedEnrollments, setSelectedEnrollments] = useState<string[]>([]);
  const [patientName, setPatientName] = useState('Jack Ledger');
  const [subscriberName, setSubscriberName] = useState('Dr. Bruce Wayne');
  const [claimSignature, setClaimSignature] = useState('');
  const [submittingClaim, setSubmittingClaim] = useState(false);

  // Doctors list
  const doctorsList = [
    { id: '1', name: 'Dr. Smith', specialty: 'General Practice & Sports Medicine', location: 'Anand Health Center', rating: '4.9', phone: '1-800-538-2273' },
    { id: '2', name: 'Dr. Bruce Wayne', specialty: 'Pediatrics & Family Medicine', location: 'Gotham Wellness Center', rating: '5.0', phone: '1-800-JET-CARE' },
    { id: '3', name: 'Dr. Sarah Miller', specialty: 'Dental Surgery & Aesthetics', location: 'Jet Dental Hub', rating: '4.8', phone: '1-800-538-2273' },
    { id: '4', name: 'Dr. Jack Ledger', specialty: 'Cardiology Specialist', location: 'Skyline Cardiovascular Center', rating: '4.9', phone: '1-800-JET-CARE' },
  ];

  // Enrollment options for the claim form
  const enrollmentOptions = [
    { name: 'Dental Basic', description: 'Basic family plan for dental coverage', rate: 348.00 },
    { name: 'RISE Premium', description: 'Healthcare program coverage for dependents under 23', rate: 1349.49 },
    { name: 'Vision Essential', description: 'Annual eye exams, contacts, and frame credits', rate: 180.00 },
    { name: 'Urgent Care Plus', description: 'Expedited urgent care scheduling and lower co-pays', rate: 290.00 },
  ];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: 'p-1', // Defaulting to Jack Ledger
      patientName: patientName,
      date: aptDate,
      time: aptTime,
      reason: aptReason,
      status: 'Scheduled'
    };

    onAddAppointment(newApt);
    setShowAppointmentModal(false);
    
    // Quick auto response alert
    alert(`Success! Scheduled appointment with ${selectedDoctor.name} on ${aptDate} at ${aptTime}. This has been synced to the clinic's master dashboard.`);
  };

  const handleClaimToggle = (name: string) => {
    setSelectedEnrollments(prev => 
      prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
    );
  };

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEnrollments.length === 0 || !claimSignature.trim()) {
      alert('Please select at least one enrollment item and sign the document.');
      return;
    }

    setSubmittingClaim(true);

    setTimeout(() => {
      selectedEnrollments.forEach((itemName) => {
        const option = enrollmentOptions.find(o => o.name === itemName);
        if (option) {
          const newClaim: Claim = {
            id: `JHEA-00${claims.length + 1}`,
            enrollmentItem: itemName === 'Dental Basic' ? 'Dental' : 'Healthcare Program',
            subItem: itemName,
            description: option.description,
            rate: option.rate,
            status: 'Processing',
            effectiveDate: new Date().toLocaleDateString(),
            subscriberName: subscriberName,
            patientName: patientName,
          };
          onAddClaim(newClaim);
        }
      });

      setSubmittingClaim(false);
      setShowClaimForm(false);
      setSelectedEnrollments([]);
      setClaimSignature('');
      alert('Application JHEA-002 successfully submitted! Jettie is now processing your request.');
    }, 1500);
  };

  // Tab navigation helper
  const navigateToTab = (tab: string) => {
    if (tab === 'doctors') setActiveTab('doctors');
    if (tab === 'patients' || tab === 'patients-list') setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Warning Banner / Switch Portals */}
      <div className="bg-slate-900 text-slate-100 text-xs px-4 py-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          JetHealth Workspace Demo Mode
        </span>
        <button 
          onClick={onNavigateToProvider}
          className="bg-jetblue-500 hover:bg-jetblue-600 font-semibold text-white px-3 py-1 rounded transition-colors flex items-center gap-1 text-[11px]"
        >
          Switch to Provider Portal <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Navigation Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm px-4 py-3 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onNavigateToHome}
            className="cursor-pointer hover:opacity-90 transition-opacity"
            title="Go to Home"
          >
            <Logo size="md" />
          </button>
          <button 
            onClick={onNavigateToHome}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-jetblue-500 hover:border-jetblue-300 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 transition-all cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
            <span>Home</span>
          </button>
        </div>
        
        {/* Role Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Signed in as</span>
            <span className="text-sm font-bold text-slate-800 flex items-center gap-1">
              Jack Ledger (Member) <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </span>
          </div>
          <div className="w-10 h-10 bg-jetblue-50 text-jetblue-500 rounded-full font-bold flex items-center justify-center border border-jetblue-100 shadow-inner">
            JL
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div className="bg-white border-b border-slate-100 shadow-sm px-4 md:px-8 overflow-x-auto">
        <div className="flex gap-6 max-w-7xl mx-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 text-sm font-semibold border-b-2 cursor-pointer transition-all ${
              activeTab === 'dashboard' 
                ? 'border-jetblue-500 text-jetblue-500' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My Dashboard
          </button>
          <button
            onClick={() => setActiveTab('coverage')}
            className={`py-3 text-sm font-semibold border-b-2 cursor-pointer transition-all ${
              activeTab === 'coverage' 
                ? 'border-jetblue-500 text-jetblue-500' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My Coverage (Form JHEA-001)
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`py-3 text-sm font-semibold border-b-2 cursor-pointer transition-all ${
              activeTab === 'doctors' 
                ? 'border-jetblue-500 text-jetblue-500' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Find a Doctor
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-3 text-sm font-semibold border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'chat' 
                ? 'border-jetblue-500 text-jetblue-500' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Ask Jettie Copilot
            <span className="bg-yellow-400 text-[10px] px-1.5 py-0.5 rounded-full text-slate-900 font-extrabold animate-pulse">
              AI
            </span>
          </button>
        </div>
      </div>

      {/* Page Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        <AnimatePresence mode="wait">
          
          {/* ================= MY DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Welcome Jettie Hero */}
              <div className="bg-gradient-to-r from-jetblue-500 to-jetblue-600 rounded-2xl text-white p-6 shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 z-10">
                  <span className="bg-white/10 text-xs text-blue-100 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Member Dashboard
                  </span>
                  <h2 className="text-3xl font-display font-bold">Welcome back, Jack! ✈️</h2>
                  <p className="text-slate-100 text-sm max-w-lg leading-relaxed">
                    All clear on your health logs. Your JHEA-001 enrollment items have been authorized. Jettie is monitoring your coverage for any turbulence!
                  </p>
                  
                  <div className="pt-2 flex flex-wrap gap-2">
                    <button 
                      onClick={() => setActiveTab('coverage')}
                      className="bg-white text-jetblue-600 font-semibold text-xs px-4 py-2 rounded-xl shadow hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      View JHEA-001 Application
                    </button>
                    <button 
                      onClick={() => setActiveTab('doctors')}
                      className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Find Network Doctor
                    </button>
                  </div>
                </div>
                
                {/* Floating mascot */}
                <div className="shrink-0 flex justify-center items-center relative pr-4">
                  <JettieMascot type="standard" size={130} />
                  <div className="absolute -top-3 -right-4 bg-yellow-400 text-slate-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-bounce transform rotate-6 border border-white">
                    "Health co-pilot active!"
                  </div>
                </div>
              </div>

              {/* Status Progress Tracker */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="text-jetblue-500 w-5 h-5" />
                    <h3 className="font-bold text-slate-800">Enrollment Application Status: JHEA-001</h3>
                  </div>
                  <span className="bg-blue-50 text-jetblue-600 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">
                    Form Submitted (Processing)
                  </span>
                </div>
                
                {/* Visual Progress Steps */}
                <div className="relative pt-4 pb-2">
                  <div className="absolute top-[37px] left-[5%] right-[5%] h-1 bg-slate-200 -z-0">
                    <div className="h-full bg-jetblue-500 w-[66%] rounded-full"></div>
                  </div>
                  
                  <div className="relative flex justify-between z-10">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-jetblue-500 text-white flex items-center justify-center font-bold text-xs shadow">
                        ✓
                      </div>
                      <span className="text-xs font-semibold mt-2 text-slate-800">Submitted</span>
                      <span className="text-[10px] text-slate-400">10/08/2025</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-jetblue-500 text-white flex items-center justify-center font-bold text-xs shadow">
                        ✓
                      </div>
                      <span className="text-xs font-semibold mt-2 text-slate-800">Document Audit</span>
                      <span className="text-[10px] text-slate-400">10/08/2025</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-jetblue-500 text-white flex items-center justify-center font-bold text-xs shadow animate-pulse">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-semibold mt-2 text-slate-800">Verified</span>
                      <span className="text-[10px] text-slate-500">Processing</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center font-bold text-xs">
                        4
                      </div>
                      <span className="text-xs font-semibold mt-2 text-slate-400">Complete</span>
                      <span className="text-[10px] text-slate-400">Pending Approval</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid: Quick stats, upcoming appointments, claims overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Active Insurance Claims summary card */}
                <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-emerald-500 w-5 h-5" />
                      <h3 className="font-bold text-slate-800">Coverage Items</h3>
                    </div>
                    <button 
                      onClick={() => setShowClaimForm(true)}
                      className="text-jetblue-500 hover:text-jetblue-600 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" /> Enroll in New Plans
                    </button>
                  </div>

                  <div className="space-y-3">
                    {claims.map((claim, idx) => (
                      <div 
                        key={`${claim.id}-${claim.enrollmentItem}-${idx}`} 
                        className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between hover:border-slate-200 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
                              {claim.id}
                            </span>
                            <span className="font-bold text-slate-800 text-sm">{claim.subItem}</span>
                          </div>
                          <p className="text-xs text-slate-500 max-w-sm">{claim.description}</p>
                          <div className="text-[10px] text-slate-400">
                            Effective Date: <span className="font-semibold">{claim.effectiveDate}</span> • Rate: <span className="font-semibold text-slate-600">${claim.rate.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1.5">
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                            claim.status === 'Purchased (Verified)' 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : claim.status === 'Processing'
                              ? 'bg-amber-50 text-amber-600 border border-amber-100'
                              : 'bg-blue-50 text-jetblue-600 border border-blue-100'
                          }`}>
                            {claim.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming appointments card */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-jetblue-500 w-5 h-5" />
                      <h3 className="font-bold text-slate-800">My Appointments</h3>
                    </div>
                    <button 
                      onClick={() => setActiveTab('doctors')}
                      className="text-jetblue-500 hover:text-jetblue-600 font-bold text-xs cursor-pointer"
                    >
                      Book Visit
                    </button>
                  </div>

                  <div className="space-y-3">
                    {appointments.length === 0 ? (
                      <div className="py-8 text-center space-y-2">
                        <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                        <p className="text-xs text-slate-500">No scheduled visits.</p>
                      </div>
                    ) : (
                      appointments.map((apt) => (
                        <div key={apt.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 hover:border-slate-200 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800">
                              {doctorsList.find(d => d.name === apt.patientName || apt.patientName === 'Jack Ledger') ? 'Dr. Smith' : apt.patientName}
                            </span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                              {apt.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 space-y-1">
                            <div>📅 {apt.date} at {apt.time}</div>
                            <div>📝 Reason: {apt.reason}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Co-Pilot helper shortcut */}
                  <div className="bg-gradient-to-r from-jetblue-50 to-sky-50 rounded-xl p-3 border border-jetblue-100 flex items-center gap-2.5">
                    <JettieMascot type="standard" size={32} className="shrink-0" />
                    <div className="text-[11px] text-slate-600">
                      Need help arranging transportation to your clinic? Ask me inside the <button onClick={() => setActiveTab('chat')} className="text-jetblue-600 hover:underline font-bold cursor-pointer">Live Chat</button>!
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ================= COVERAGE & JHEA FORM TRACKER ================= */}
          {activeTab === 'coverage' && (
            <motion.div
              key="coverage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Form header and action bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="text-jetblue-500 w-5 h-5" />
                    Application Record JHEA-001
                  </h3>
                  <p className="text-xs text-slate-500">Official JetHealth subscriber enrollment application & coverage summary.</p>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => {
                      alert("Downloading PDF of JHEA-001 Enrollment form... Your digital record has been archived locally.");
                    }}
                    className="flex-1 sm:flex-none border border-slate-200 hover:border-slate-300 bg-white font-bold text-xs text-slate-600 hover:text-slate-800 px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                  <button 
                    onClick={() => setShowClaimForm(true)}
                    className="flex-1 sm:flex-none bg-jetblue-500 hover:bg-jetblue-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" /> Submit Application JHEA-002
                  </button>
                </div>
              </div>

              {/* JETHEALTH ENROLLMENT APPLICATION FORM CONTAINER (Matches Collateral) */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 md:p-10 max-w-4xl mx-auto font-sans relative overflow-hidden text-slate-800">
                {/* Confidential Stamp */}
                <div className="absolute top-10 right-10 border-4 border-dashed border-red-500/20 text-red-500/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-lg transform rotate-12 select-none pointer-events-none">
                  Confidential
                </div>

                {/* Form Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                  <div className="flex items-center gap-3">
                    <Logo size="lg" iconOnly={true} />
                    <div>
                      <div className="text-xl font-bold tracking-tight text-slate-900 font-display">JETHEALTH</div>
                      <div className="text-[10px] text-slate-500 tracking-wider">JETHEALTH INC. COVERAGE REGISTRY</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <h2 className="text-sm md:text-base font-extrabold text-slate-900 uppercase font-display tracking-tight">
                      Enrollment Application Form
                    </h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                      Application Record JHEA-001
                    </p>
                  </div>
                </div>

                {/* Date Fields */}
                <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-100 text-xs text-slate-600">
                  <div>
                    Application Date: <span className="font-bold text-slate-800">10/8/2025</span>
                  </div>
                  <div className="text-right">
                    Status: <span className="font-extrabold text-slate-900 bg-amber-50 border border-amber-100 rounded px-2 py-0.5">Form Submitted</span>
                  </div>
                </div>

                {/* Block I: Record Item 1001 (Dental) */}
                <div className="my-6 border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-100 px-4 py-2.5 font-bold text-xs text-slate-700 border-b border-slate-200">
                    Block I: Record Item 1001
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    {/* Tooth Icon on left */}
                    <div className="md:col-span-1 border-r border-slate-100 flex items-center justify-center p-6 bg-slate-50/50">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-85 text-slate-500">
                        <path d="M4 11.5c0-1.5.5-3 1.5-4C6.5 6.5 8 6 9.5 6H10c.8 0 1.5.3 2 .8.5-.5 1.2-.8 2-.8h.5c1.5 0 3 .5 4 1.5 1 1 1.5 2.5 1.5 4a6.5 6.5 0 0 1-1.5 4c-.8.8-1.5 1.7-2 2.7l-.3.6a.5.5 0 0 1-.4.2.5.5 0 0 1-.4-.2l-.3-.6c-.5-1-1.2-1.9-2-2.7a6.5 6.5 0 0 1-1.5-4Z"/>
                        <path d="M12 6v14"/>
                        <path d="M7 11.5a3.5 3.5 0 0 1 3.5 3.5"/>
                      </svg>
                    </div>

                    {/* Records Details */}
                    <div className="md:col-span-3 p-4 space-y-2 text-xs">
                      <div className="grid grid-cols-3">
                        <span className="font-semibold text-slate-500">Enrollment Item:</span>
                        <span className="col-span-2 font-bold text-slate-800">Dental</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="font-semibold text-slate-500">Sub-Item:</span>
                        <span className="col-span-2 font-bold text-slate-800">Jet Dental Basic (Family)</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="font-semibold text-slate-500">Description:</span>
                        <span className="col-span-2 text-slate-600">Basic family plan for dental coverage.</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="font-semibold text-slate-500">Rate:</span>
                        <span className="col-span-2 font-bold text-slate-900">$348.00</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="font-semibold text-slate-500">Status:</span>
                        <span className="col-span-2 font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 inline" /> Purchased (Verified)
                        </span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="font-semibold text-slate-500">Effective Date:</span>
                        <span className="col-span-2 text-slate-700">10/6/2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Block II: Record Item 1002 (Healthcare Program) */}
                <div className="my-6 border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-100 px-4 py-2.5 font-bold text-xs text-slate-700 border-b border-slate-200">
                    Block II: Record Item 1002
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    {/* Medical Bag Icon on left */}
                    <div className="md:col-span-1 border-r border-slate-100 flex items-center justify-center p-6 bg-slate-50/50">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-85 text-slate-500">
                        <path d="M14 2H10A2 2 0 0 0 8 4V6H4A2 2 0 0 0 2 8V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V8A2 2 0 0 0 20 6H16V4A2 2 0 0 0 14 2Z"/>
                        <path d="M12 10v6"/>
                        <path d="M9 13h6"/>
                        <path d="M8 6h8"/>
                      </svg>
                    </div>

                    {/* Records Details */}
                    <div className="md:col-span-3 p-4 space-y-2 text-xs">
                      <div className="grid grid-cols-3">
                        <span className="font-semibold text-slate-500">Enrollment Item:</span>
                        <span className="col-span-2 font-bold text-slate-800">Healthcare Program</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="font-semibold text-slate-500">Sub-Item:</span>
                        <span className="col-span-2 font-bold text-slate-800">RISE Premium</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="font-semibold text-slate-500">Description:</span>
                        <span className="col-span-2 text-slate-600">Healthcare program coverage for dependents under the age of 23.</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="font-semibold text-slate-500">Rate:</span>
                        <span className="col-span-2 font-bold text-slate-900">$1,349.49</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="font-semibold text-slate-500">Status:</span>
                        <span className="col-span-2 font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 inline" /> Purchased (Verified)
                        </span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="font-semibold text-slate-500">Effective Date:</span>
                        <span className="col-span-2 text-slate-700">10/6/2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Record Summary Table */}
                <div className="my-6 border border-slate-200 rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 text-xs">
                  {/* Left Column: Summary */}
                  <div className="border-r border-slate-200">
                    <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700 border-b border-slate-200">
                      Record Summary
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Item 1 Rate:</span>
                        <span className="font-bold text-slate-700">$349.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Item 2 Rate:</span>
                        <span className="font-bold text-slate-700">$1,349.49</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200 pt-2 font-extrabold text-sm text-slate-900">
                        <span>TOTAL APPLIED RATE:</span>
                        <span>$1,088.49</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Authorization */}
                  <div>
                    <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700 border-b border-slate-200">
                      Authorization
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Authorized Subscriber:</span>
                        <span className="font-bold text-slate-800">[Dr. Bruce Wayne]</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Patient Name:</span>
                        <span className="font-bold text-slate-800">Jack Ledger</span>
                      </div>
                      
                      {/* Signature Box */}
                      <div className="border border-slate-200 bg-slate-50/50 p-2.5 rounded text-center mt-2 relative">
                        <div className="text-[9px] text-slate-400 absolute top-1 left-1.5 uppercase font-mono">Digital Signature</div>
                        <div className="font-serif italic text-lg text-slate-700 select-none py-1 border-b border-slate-200 inline-block font-bold">
                          Dr. Bruce Wayne
                        </div>
                        <div className="text-[9px] text-emerald-500 font-bold mt-1">✓ SECURE SHA-256 DIGITAL AUTH</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Footer */}
                <div className="border-t border-slate-200 pt-4 mt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-400">
                  <div>JetHealth Inc. - Internal Date Record. 2025 Edition. Confidential.</div>
                  <div className="font-bold">Pg. 1/1</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= FIND A DOCTOR ================= */}
          {activeTab === 'doctors' && (
            <motion.div
              key="doctors"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Doctor search header */}
              <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-800">Browse JetHealth Network Physicians</h3>
                  <p className="text-xs text-slate-500">
                    Get in-network, zero-deductible healthcare with top board-certified practitioners. Click 'Book Appointment' to instantly register a visit on their calendar.
                  </p>
                </div>

                {/* Search / Filter Box */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                    <input 
                      type="text" 
                      placeholder="Search doctors by name, specialty, or clinic..." 
                      className="w-full bg-slate-50 border border-slate-200 focus:border-jetblue-500 focus:bg-white text-sm pl-11 pr-4 py-2.5 rounded-xl text-slate-800"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="bg-slate-50 border border-slate-200 text-sm px-3 py-2.5 rounded-xl font-medium text-slate-600 focus:outline-none">
                      <option>All Specialties</option>
                      <option>General Practice</option>
                      <option>Dental</option>
                      <option>Pediatrics</option>
                      <option>Cardiology</option>
                    </select>
                    <select className="bg-slate-50 border border-slate-200 text-sm px-3 py-2.5 rounded-xl font-medium text-slate-600 focus:outline-none">
                      <option>Within 15 Miles</option>
                      <option>Within 25 Miles</option>
                      <option>Any Distance</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Doctors Directory Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {doctorsList.map((doc) => (
                  <div key={doc.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between gap-4">
                    <div className="flex gap-4 items-start">
                      {/* Doctor Avatar representation */}
                      <div className="w-14 h-14 rounded-full bg-jetblue-50 border border-jetblue-100 flex items-center justify-center font-bold text-jetblue-600 shrink-0 text-lg shadow-sm">
                        {doc.name.split(' ').map(n => n[0]).join('')}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800 text-base">{doc.name}</h4>
                          <span className="bg-amber-50 text-amber-600 font-extrabold text-[10px] px-2 py-0.5 rounded border border-amber-100">
                            ★ {doc.rating}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-jetblue-500">{doc.specialty}</p>
                        
                        <div className="text-xs text-slate-500 space-y-1 pt-1.5">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {doc.location}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {doc.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        ● Accepting New Patients
                      </span>
                      <button 
                        onClick={() => {
                          setSelectedDoctor({ name: doc.name, specialty: doc.specialty });
                          setShowAppointmentModal(true);
                        }}
                        className="bg-jetblue-500 hover:bg-jetblue-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer shadow-sm"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ================= ASK JETTIE ================= */}
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-3xl mx-auto h-[550px]"
            >
              <JettieChat userRole="member" onNavigateToTab={navigateToTab} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ================= BOOK APPOINTMENT MODAL ================= */}
      {showAppointmentModal && selectedDoctor && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-100"
          >
            <div className="bg-jetblue-500 text-white p-4">
              <h4 className="font-bold text-base">Book Appointment</h4>
              <p className="text-xs text-slate-100 mt-0.5">Scheduling with {selectedDoctor.name}</p>
            </div>

            <form onSubmit={handleBookAppointment} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Patient Name</label>
                <input 
                  type="text" 
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-jetblue-500 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Date</label>
                  <input 
                    type="date" 
                    value={aptDate}
                    onChange={(e) => setAptDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-jetblue-500 font-medium"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Preferred Time</label>
                  <select 
                    value={aptTime}
                    onChange={(e) => setAptTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-jetblue-500 font-medium"
                  >
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:30 AM</option>
                    <option>01:00 PM</option>
                    <option>02:30 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Reason for Appointment</label>
                <textarea 
                  value={aptReason}
                  onChange={(e) => setAptReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-jetblue-500 font-medium h-20 resize-none"
                  placeholder="Describe your symptoms or routine request..."
                  required
                ></textarea>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg text-[11px] text-slate-500 flex items-center gap-2">
                <JettieMascot type="standard" size={28} className="shrink-0" />
                <span>
                  By booking, Jettie instantly reserves this slot in {selectedDoctor.name}'s planner, making it visible to the clinic team.
                </span>
              </div>

              <div className="flex gap-2 pt-2 justify-end">
                <button 
                  type="button"
                  onClick={() => setShowAppointmentModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-jetblue-500 text-white rounded-xl text-xs font-bold shadow hover:bg-jetblue-600 cursor-pointer"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ================= ENROLLMENT APPLICATION (JHEA-002) MODAL ================= */}
      {showClaimForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-100 my-8"
          >
            <div className="bg-slate-900 text-white p-4">
              <h4 className="font-bold text-base font-display">New Enrollment Application (JHEA-002)</h4>
              <p className="text-xs text-slate-300 mt-0.5">Configure additional JetHealth coverage options.</p>
            </div>

            <form onSubmit={handleSubmitClaim} className="p-4 space-y-4">
              {/* Select plans */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">Select Coverages to Enroll</label>
                <div className="space-y-2">
                  {enrollmentOptions.map((opt) => (
                    <div 
                      key={opt.name}
                      onClick={() => handleClaimToggle(opt.name)}
                      className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                        selectedEnrollments.includes(opt.name)
                          ? 'border-jetblue-500 bg-blue-50/40'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/20'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <input 
                            type="checkbox" 
                            checked={selectedEnrollments.includes(opt.name)}
                            readOnly 
                            className="text-jetblue-500"
                          />
                          <span className="font-bold text-sm text-slate-800">{opt.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-normal pl-5">{opt.description}</p>
                      </div>
                      <span className="font-bold text-slate-900 text-xs">${opt.rate.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient and subscriber */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Patient Name</label>
                  <input 
                    type="text" 
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-jetblue-500 font-medium"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Authorized Subscriber</label>
                  <input 
                    type="text" 
                    value={subscriberName}
                    onChange={(e) => setSubscriberName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-jetblue-500 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Digital signature */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Authorized Subscriber Digital Signature (Type Name)</label>
                <input 
                  type="text" 
                  value={claimSignature}
                  onChange={(e) => setClaimSignature(e.target.value)}
                  placeholder="e.g. Dr. Bruce Wayne"
                  className="w-full bg-slate-50 border border-slate-200 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-jetblue-500 font-medium italic"
                  required
                />
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg text-[11px] text-slate-500 flex items-center gap-2">
                <JettieMascot type="standard" size={28} className="shrink-0" />
                <span>
                  Jettie will perform an immediate automated record verification on application JHEA-002 upon submission.
                </span>
              </div>

              <div className="flex gap-2 pt-2 justify-end border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setShowClaimForm(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submittingClaim}
                  className="px-4 py-2 bg-jetblue-500 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold shadow hover:bg-jetblue-600 flex items-center gap-1 cursor-pointer"
                >
                  {submittingClaim ? 'Verifying...' : 'Authorize & Submit Form'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 mt-12">
        <p>© 2026 JetHealth Inc. All health flight plans subject to regulatory compliance guidelines. Confidential.</p>
      </footer>
    </div>
  );
}
