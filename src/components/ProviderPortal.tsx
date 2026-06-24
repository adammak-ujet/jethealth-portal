import React, { useState } from 'react';
import { 
  Home, Users, Calendar, Pill, BarChart3, MessageCircle, 
  Search, Phone, MapPin, Clock, Plus, Trash2, ArrowLeft, 
  CheckCircle, FileText, Activity, AlertCircle, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import JettieMascot from './JettieMascot';
import JettieChat from './JettieChat';
import { Patient, Appointment, Prescription, Claim } from '../types';

interface ProviderPortalProps {
  patients: Patient[];
  appointments: Appointment[];
  claims: Claim[];
  prescriptions: Prescription[];
  onAddPatient: (patient: Patient) => void;
  onUpdatePatientNotes: (patientId: string, notes: string) => void;
  onAddPrescription: (rx: Prescription) => void;
  onAddAppointment: (apt: Appointment) => void;
  onNavigateToMember: () => void;
}

export default function ProviderPortal({
  patients,
  appointments,
  claims,
  prescriptions,
  onAddPatient,
  onUpdatePatientNotes,
  onAddPrescription,
  onAddAppointment,
  onNavigateToMember
}: ProviderPortalProps) {
  // Navigation tabs matching collateral
  const [activeTab, setActiveTab] = useState<'home' | 'patients' | 'schedule' | 'support' | 'prescriptions' | 'performance'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected patient for detail expansion
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [editableNotes, setEditableNotes] = useState('');

  // Register Patient Modal state
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newPatName, setNewPatName] = useState('');
  const [newPatInsurance, setNewPatInsurance] = useState('BlueShield PPO');
  const [newPatDob, setNewPatDob] = useState('1990-01-01');
  const [newPatGender, setNewPatGender] = useState('Female');
  const [newPatPhone, setNewPatPhone] = useState('555-019-2834');
  const [newPatEmail, setNewPatEmail] = useState('');
  const [newPatNotes, setNewPatNotes] = useState('');
  const [newPatBp, setNewPatBp] = useState('120/80');
  const [newPatHr, setNewPatHr] = useState('72');
  const [newPatTemp, setNewPatTemp] = useState('98.6');
  const [newPatWeight, setNewPatWeight] = useState('155');

  // New prescription state
  const [showRxModal, setShowRxModal] = useState(false);
  const [rxPatientId, setRxPatientId] = useState('');
  const [rxDrug, setRxDrug] = useState('Lisinopril 10mg');
  const [rxDosage, setRxDosage] = useState('Once daily');
  const [rxFrequency, setRxFrequency] = useState('In the morning');
  const [rxRefills, setRxRefills] = useState(3);
  const [sendingRx, setSendingRx] = useState(false);

  // New appointment state inside provider portal
  const [showAptModal, setShowAptModal] = useState(false);
  const [aptPatId, setAptPatId] = useState('');
  const [aptTime, setAptTime] = useState('09:00 AM');
  const [aptDate, setAptDate] = useState('2026-06-25');
  const [aptReason, setAptReason] = useState('Follow-up Consult');

  // Chart hover interaction state
  const [hoveredData, setHoveredData] = useState<{label: string, value: string | number} | null>(null);

  // Filter patients list based on search
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.insurance.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPatient = (p: Patient) => {
    setSelectedPatientId(p.id);
    setEditableNotes(p.notes);
  };

  const handleSaveNotes = (patientId: string) => {
    onUpdatePatientNotes(patientId, editableNotes);
    alert('Patient records updated successfully! Auto-synced with Jettie cloud database.');
  };

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatName.trim()) return;

    const newPatient: Patient = {
      id: `p-${Date.now()}`,
      name: newPatName,
      insurance: newPatInsurance,
      lastVisit: 'Just Registered',
      dob: newPatDob,
      gender: newPatGender,
      phone: newPatPhone,
      email: newPatEmail || `${newPatName.toLowerCase().replace(' ', '')}@example.com`,
      vitals: {
        bloodPressure: newPatBp,
        heartRate: `${newPatHr} bpm`,
        temperature: `${newPatTemp} °F`,
        weight: `${newPatWeight} lbs`,
      },
      notes: newPatNotes || 'Patient registration complete. Awaiting initial consult.',
      activePrescriptions: [],
      medicalHistory: ['Initial Enrollment'],
    };

    onAddPatient(newPatient);
    setShowRegisterModal(false);
    
    // Clear fields
    setNewPatName('');
    setNewPatNotes('');
    alert(`Success! ${newPatName} is now registered under Dr. Smith's care.`);
  };

  const handleDispatchRx = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === rxPatientId);
    if (!patient) {
      alert('Please select a patient.');
      return;
    }

    setSendingRx(true);
    
    setTimeout(() => {
      const newRx: Prescription = {
        id: `rx-${Date.now()}`,
        patientId: rxPatientId,
        patientName: patient.name,
        drugName: rxDrug,
        dosage: rxDosage,
        frequency: rxFrequency,
        refills: rxRefills,
        dateWritten: new Date().toLocaleDateString(),
        status: 'Active',
      };

      onAddPrescription(newRx);
      setSendingRx(false);
      setShowRxModal(false);
      alert(`Prescription dispatched at Jet-Speed! 🚀 Autologged to ${patient.name}'s medical chart and transmitted to the pharmacy.`);
    }, 1800);
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === aptPatId);
    if (!patient) return;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: aptPatId,
      patientName: patient.name,
      date: aptDate,
      time: aptTime,
      reason: aptReason,
      status: 'Scheduled',
    };

    onAddAppointment(newApt);
    setShowAptModal(false);
    alert(`Appointment successfully scheduled on ${aptDate} at ${aptTime} for ${patient.name}.`);
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
          onClick={onNavigateToMember}
          className="bg-jetblue-500 hover:bg-jetblue-600 font-semibold text-white px-3 py-1 rounded transition-colors flex items-center gap-1 text-[11px]"
        >
          Switch to Member Portal <ArrowLeft className="w-3 h-3" />
        </button>
      </div>

      {/* Portal Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm px-4 py-3 md:px-8 flex items-center justify-between">
        <Logo size="md" />
        
        {/* Role Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Provider Workspace</span>
            <span className="text-sm font-bold text-slate-800 flex items-center gap-1">
              Dr. Smith, MD <CheckCircle className="w-4 h-4 text-jetblue-500 fill-blue-50" />
            </span>
          </div>
          <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center shadow-inner overflow-hidden">
            <JettieMascot type="doctor" size={42} className="mt-1" />
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-6">
        
        {/* Navigation Sidebar (Desktop Sidebar / Mobile Top bar) */}
        <aside className="w-full md:w-64 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm h-fit space-y-2">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 block mb-2">Navigation Console</span>
          <button
            onClick={() => { setActiveTab('home'); setSelectedPatientId(null); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'home' 
                ? 'bg-jetblue-500 text-white shadow-md shadow-blue-500/10' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Home className="w-4.5 h-4.5" /> Provider Dashboard
          </button>
          
          <button
            onClick={() => { setActiveTab('patients'); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'patients' 
                ? 'bg-jetblue-500 text-white shadow-md shadow-blue-500/10' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Users className="w-4.5 h-4.5" /> Dr. Smith's Patients
          </button>

          <button
            onClick={() => { setActiveTab('schedule'); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'schedule' 
                ? 'bg-jetblue-500 text-white shadow-md shadow-blue-500/10' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4.5 h-4.5" /> My Schedule
          </button>

          <button
            onClick={() => { setActiveTab('prescriptions'); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'prescriptions' 
                ? 'bg-jetblue-500 text-white shadow-md shadow-blue-500/10' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Pill className="w-4.5 h-4.5" /> Write Prescriptions
          </button>

          <button
            onClick={() => { setActiveTab('performance'); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'performance' 
                ? 'bg-jetblue-500 text-white shadow-md shadow-blue-500/10' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4.5 h-4.5" /> Practice Performance
          </button>

          <div className="border-t border-slate-100 my-3 pt-3">
            <button
              onClick={() => { setActiveTab('support'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'support' 
                  ? 'bg-jetblue-500 text-white shadow-md shadow-blue-500/10' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <MessageCircle className="w-4.5 h-4.5" /> Support & Copilot
            </button>
          </div>
        </aside>

        {/* Workspace Display Area */}
        <section className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            
            {/* ================= HOME DASHBOARD VIEW ================= */}
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Greeting Banner */}
                <div className="bg-gradient-to-r from-jetblue-500 to-jetblue-600 rounded-2xl text-white p-6 shadow-md flex items-center justify-between gap-6 relative overflow-hidden">
                  <div className="space-y-1.5 z-10">
                    <span className="bg-white/10 text-xs text-blue-100 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Workspace active
                    </span>
                    <h2 className="text-3xl font-display font-extrabold tracking-tight">Welcome, Dr. Smith</h2>
                    <p className="text-slate-100 text-sm max-w-lg">
                      Clinic is operating smoothly at normal cruising speed. Let co-pilot Jettie assist with scheduling, logs, and prescriptions today!
                    </p>
                  </div>
                  
                  {/* Waving mascot with headset */}
                  <div className="shrink-0 flex justify-center items-center">
                    <JettieMascot type="headset" size={110} />
                  </div>
                </div>

                {/* Dashboard grid buttons (Exact replica of image 2) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Card 1: My Schedule */}
                  <button 
                    onClick={() => setActiveTab('schedule')}
                    className="bg-jetblue-500 hover:bg-jetblue-600 text-white p-6 rounded-2xl shadow-md border border-jetblue-600/30 text-left transition-all hover:scale-[1.01] flex flex-col justify-between h-44 group cursor-pointer"
                  >
                    <div className="bg-white/10 p-3 rounded-xl w-fit">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display leading-tight">My Schedule</h3>
                      <p className="text-xs text-slate-100 opacity-90 mt-1">Review calendars & check-in scheduled clinic visits.</p>
                    </div>
                  </button>

                  {/* Card 2: Patient Records */}
                  <button 
                    onClick={() => setActiveTab('patients')}
                    className="bg-jetblue-500 hover:bg-jetblue-600 text-white p-6 rounded-2xl shadow-md border border-jetblue-600/30 text-left transition-all hover:scale-[1.01] flex flex-col justify-between h-44 group cursor-pointer"
                  >
                    <div className="bg-white/10 p-3 rounded-xl w-fit">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display leading-tight">Patient Records</h3>
                      <p className="text-xs text-slate-100 opacity-90 mt-1">Search chart files, view diagnostic histories, and update clinical logs.</p>
                    </div>
                  </button>

                  {/* Card 3: Prescriptions */}
                  <button 
                    onClick={() => setActiveTab('prescriptions')}
                    className="bg-jetblue-500 hover:bg-jetblue-600 text-white p-6 rounded-2xl shadow-md border border-jetblue-600/30 text-left transition-all hover:scale-[1.01] flex flex-col justify-between h-44 group cursor-pointer"
                  >
                    <div className="bg-white/10 p-3 rounded-xl w-fit">
                      <Pill className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display leading-tight">Prescriptions</h3>
                      <p className="text-xs text-slate-100 opacity-90 mt-1">Write, digitally sign, and dispatch pharmaceuticals instantly.</p>
                    </div>
                  </button>

                  {/* Card 4: Practice Performance */}
                  <button 
                    onClick={() => setActiveTab('performance')}
                    className="bg-jetblue-500 hover:bg-jetblue-600 text-white p-6 rounded-2xl shadow-md border border-jetblue-600/30 text-left transition-all hover:scale-[1.01] flex flex-col justify-between h-44 group cursor-pointer"
                  >
                    <div className="bg-white/10 p-3 rounded-xl w-fit">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display leading-tight">Practice Performance</h3>
                      <p className="text-xs text-slate-100 opacity-90 mt-1">View clinic metrics, claims approval rates, and growth analytics.</p>
                    </div>
                  </button>
                </div>

                {/* View All Patients Large Button */}
                <button
                  onClick={() => setActiveTab('patients')}
                  className="w-full bg-jetblue-500 hover:bg-jetblue-600 text-white font-extrabold py-4 px-6 rounded-2xl text-center shadow hover:scale-[1.005] active:scale-[0.995] transition-all font-display tracking-wide cursor-pointer"
                >
                  View All Patients
                </button>
              </motion.div>
            )}

            {/* ================= DR SMITH'S PATIENTS VIEW ================= */}
            {activeTab === 'patients' && (
              <motion.div
                key="patients"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Header (matches Image 3 exactly) */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <JettieMascot type="stethoscope" size={48} className="!-my-2" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-extrabold text-slate-800 tracking-tight">Dr. Smith's Patients</h3>
                      <p className="text-xs text-slate-500">Master register of enrolled active patients.</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowRegisterModal(true)}
                    className="bg-jetblue-500 hover:bg-jetblue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Register Patient
                  </button>
                </div>

                {/* Real-time Search bar */}
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search patients by name, insurance carrier, or DOB..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-jetblue-500 text-sm pl-12 pr-4 py-3.5 rounded-2xl text-slate-800 shadow-xs"
                  />
                </div>

                {/* Layout splitting list and details */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  
                  {/* Patients Card List */}
                  <div className="lg:col-span-2 space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
                    {filteredPatients.length === 0 ? (
                      <div className="bg-white border border-slate-100 p-8 rounded-2xl text-center space-y-2">
                        <Users className="w-10 h-10 text-slate-300 mx-auto" />
                        <p className="text-sm font-semibold text-slate-500">No patients found</p>
                      </div>
                    ) : (
                      filteredPatients.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleSelectPatient(p)}
                          className={`bg-white border p-4 rounded-2xl shadow-xs hover:shadow-md hover:border-jetblue-400 transition-all cursor-pointer flex items-center gap-4 relative ${
                            selectedPatientId === p.id 
                              ? 'border-jetblue-500 ring-2 ring-jetblue-500/10' 
                              : 'border-slate-150'
                          }`}
                        >
                          {/* Circle initials badge */}
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-extrabold text-slate-600 shrink-0 shadow-sm border border-slate-200 text-sm">
                            {p.name.split(' ').map(n => n[0]).join('')}
                          </div>

                          <div className="space-y-0.5">
                            <h4 className="font-extrabold text-slate-850 text-base">{p.name}</h4>
                            <p className="text-xs font-semibold text-jetblue-500">{p.insurance}</p>
                            <p className="text-[10px] text-slate-400 font-medium">Last Visit {p.lastVisit}</p>
                          </div>

                          {p.activePrescriptions.length > 0 && (
                            <span className="absolute top-3 right-3 bg-blue-50 text-jetblue-500 text-[9px] font-bold px-1.5 py-0.5 rounded">
                              💊 Rx Active
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Expanded Patient Clinical Profile details panel */}
                  <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                      {selectedPatientId ? (
                        (() => {
                          const p = patients.find(pat => pat.id === selectedPatientId);
                          if (!p) return null;
                          return (
                            <motion.div
                              key={p.id}
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-5"
                            >
                              {/* Clinical Header */}
                              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div>
                                  <h3 className="text-lg font-bold text-slate-800">{p.name}</h3>
                                  <p className="text-xs text-slate-400">DOB: <span className="font-semibold">{p.dob}</span> • Gender: <span className="font-semibold">{p.gender}</span></p>
                                </div>
                                <span className="bg-slate-50 border border-slate-200 text-[10px] font-mono px-2 py-1 rounded">
                                  ID: {p.id}
                                </span>
                              </div>

                              {/* Vitals Panel */}
                              <div className="space-y-2">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                  <Activity className="w-4 h-4 text-emerald-500" /> Patient Vitals (Recent)
                                </h4>
                                <div className="grid grid-cols-4 gap-2.5">
                                  <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                                    <div className="text-[10px] text-slate-400">Blood Pressure</div>
                                    <div className="font-bold text-slate-800 text-sm mt-0.5">{p.vitals.bloodPressure}</div>
                                  </div>
                                  <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                                    <div className="text-[10px] text-slate-400">Heart Rate</div>
                                    <div className="font-bold text-slate-800 text-sm mt-0.5">{p.vitals.heartRate}</div>
                                  </div>
                                  <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                                    <div className="text-[10px] text-slate-400">Temperature</div>
                                    <div className="font-bold text-slate-800 text-sm mt-0.5">{p.vitals.temperature}</div>
                                  </div>
                                  <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                                    <div className="text-[10px] text-slate-400">Weight</div>
                                    <div className="font-bold text-slate-800 text-sm mt-0.5">{p.vitals.weight}</div>
                                  </div>
                                </div>
                              </div>

                              {/* Form: Edit Clinical Notes */}
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Clinical Visit Logs & Notes</label>
                                <textarea
                                  value={editableNotes}
                                  onChange={(e) => setEditableNotes(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 h-28 focus:outline-none focus:border-jetblue-500 focus:bg-white transition-all resize-none"
                                />
                                <div className="flex justify-end">
                                  <button
                                    onClick={() => handleSaveNotes(p.id)}
                                    className="bg-jetblue-500 hover:bg-jetblue-600 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                                  >
                                    Save Record Update
                                  </button>
                                </div>
                              </div>

                              {/* Medication List */}
                              <div className="space-y-2 pt-2 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Prescriptions</h4>
                                  <button 
                                    onClick={() => {
                                      setRxPatientId(p.id);
                                      setShowRxModal(true);
                                    }}
                                    className="text-jetblue-500 hover:text-jetblue-600 font-bold text-[11px] flex items-center gap-0.5 cursor-pointer"
                                  >
                                    + Prescribe Medication
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {p.activePrescriptions.length === 0 ? (
                                    <span className="text-xs text-slate-400 italic">No active medications registered.</span>
                                  ) : (
                                    p.activePrescriptions.map((med, i) => (
                                      <span key={i} className="bg-blue-50 text-jetblue-600 text-xs px-2.5 py-1 rounded-full border border-blue-100 font-medium">
                                        💊 {med}
                                      </span>
                                    ))
                                  )}
                                </div>
                              </div>

                              {/* Quick Actions */}
                              <div className="pt-2 border-t border-slate-100 flex gap-2">
                                <button
                                  onClick={() => {
                                    setAptPatId(p.id);
                                    setShowAptModal(true);
                                  }}
                                  className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <Calendar className="w-3.5 h-3.5 text-slate-500" /> Schedule Visit
                                </button>
                                <button
                                  onClick={() => {
                                    setRxPatientId(p.id);
                                    setShowRxModal(true);
                                  }}
                                  className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <Pill className="w-3.5 h-3.5 text-slate-500" /> Issue Rx Form
                                </button>
                              </div>
                            </motion.div>
                          );
                        })()
                      ) : (
                        <div className="bg-white border border-slate-150 rounded-2xl p-10 text-center space-y-3 shadow-xs h-full flex flex-col items-center justify-center text-slate-400">
                          <FileText className="w-12 h-12 text-slate-300" />
                          <p className="font-semibold text-slate-500 text-sm">No Patient Selected</p>
                          <p className="text-xs max-w-xs leading-normal">Select a patient card on the left to review active vitals, write prescriptions, schedule appointments, or edit clinical notes.</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ================= MY SCHEDULE VIEW ================= */}
            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-slate-800 tracking-tight">Clinic Schedule Manager</h3>
                    <p className="text-xs text-slate-500">Dr. Smith's incoming patient calendar.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      if (patients.length === 0) return;
                      setAptPatId(patients[0].id);
                      setShowAptModal(true);
                    }}
                    className="bg-jetblue-500 hover:bg-jetblue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Appointment
                  </button>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                  <div className="space-y-3">
                    {appointments.length === 0 ? (
                      <div className="py-12 text-center text-slate-400">
                        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm font-semibold">No appointments scheduled today</p>
                      </div>
                    ) : (
                      appointments.map((apt) => (
                        <div key={apt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-800 text-sm">{apt.patientName}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                apt.status === 'Completed' 
                                  ? 'bg-emerald-50 text-emerald-600'
                                  : apt.status === 'Active'
                                  ? 'bg-amber-50 text-amber-600 animate-pulse'
                                  : 'bg-blue-50 text-jetblue-600'
                              }`}>
                                {apt.status}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
                              <span>📅 Date: <span className="font-semibold text-slate-700">{apt.date}</span></span>
                              <span>⏰ Time: <span className="font-semibold text-slate-700">{apt.time}</span></span>
                              <span>📝 Reason: <span className="font-semibold text-slate-700">{apt.reason}</span></span>
                            </div>
                          </div>

                          <div className="flex gap-1.5 w-full sm:w-auto">
                            {apt.status === 'Scheduled' && (
                              <button
                                onClick={() => {
                                  apt.status = 'Active';
                                  setActiveTab('patients');
                                  const pat = patients.find(p => p.name === apt.patientName);
                                  if (pat) handleSelectPatient(pat);
                                }}
                                className="flex-1 sm:flex-none bg-jetblue-500 hover:bg-jetblue-600 text-white font-bold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer"
                              >
                                Check-In Patient
                              </button>
                            )}
                            {apt.status === 'Active' && (
                              <button
                                onClick={() => {
                                  apt.status = 'Completed';
                                  alert('Appointment visit completed successfully! Autologged to records.');
                                  setActiveTab('home');
                                }}
                                className="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer"
                              >
                                Complete Visit
                              </button>
                            )}
                            <button
                              onClick={() => {
                                const pat = patients.find(p => p.name === apt.patientName);
                                if (pat) {
                                  setActiveTab('patients');
                                  handleSelectPatient(pat);
                                } else {
                                  alert('Loading patient records file...');
                                }
                              }}
                              className="flex-1 sm:flex-none bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                            >
                              Chart File
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= WRITE PRESCRIPTIONS VIEW ================= */}
            {activeTab === 'prescriptions' && (
              <motion.div
                key="prescriptions"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-slate-800 tracking-tight">Rx Prescription Desk</h3>
                    <p className="text-xs text-slate-500">Formulary authorization and digital dispatch hub.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      if (patients.length === 0) return;
                      setRxPatientId(patients[0].id);
                      setShowRxModal(true);
                    }}
                    className="bg-jetblue-500 hover:bg-jetblue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Issue Prescription
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Prescriptions Form Card */}
                  <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4 md:col-span-1">
                    <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Authorized Dispatch Control</h4>
                    
                    <form onSubmit={handleDispatchRx} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 block">Select Patient</label>
                        <select
                          value={rxPatientId}
                          onChange={(e) => setRxPatientId(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-xs px-2.5 py-2 rounded-lg font-medium"
                          required
                        >
                          <option value="">-- Choose Patient --</option>
                          {patients.map(p => (
                            <option key={p.id} value={p.id}>{p.name} ({p.insurance})</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 block">Select Formulary Drug</label>
                        <select
                          value={rxDrug}
                          onChange={(e) => setRxDrug(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-xs px-2.5 py-2 rounded-lg font-medium"
                        >
                          <option>Metformin 500mg (Glucophage)</option>
                          <option>Lisinopril 10mg (Zestril)</option>
                          <option>Atorvastatin 20mg (Lipitor)</option>
                          <option>Amoxicillin 500mg</option>
                          <option>Albuterol HFA Inhaler</option>
                          <option>Losartan 50mg (Cozaar)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 block">Dosage</label>
                          <input
                            type="text"
                            value={rxDosage}
                            onChange={(e) => setRxDosage(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-xs px-2.5 py-2 rounded-lg font-medium"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 block">Frequency</label>
                          <input
                            type="text"
                            value={rxFrequency}
                            onChange={(e) => setRxFrequency(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-xs px-2.5 py-2 rounded-lg font-medium"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 block">Authorized Refills</label>
                        <input
                          type="number"
                          min="0"
                          max="12"
                          value={rxRefills}
                          onChange={(e) => setRxRefills(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 text-xs px-2.5 py-2 rounded-lg font-medium"
                        />
                      </div>

                      <div className="bg-slate-50 p-2 rounded text-[10px] text-slate-400">
                        ✓ Secured signature: Dr. Smith, MD (SHA-256 Auth Registered)
                      </div>

                      <button
                        type="submit"
                        disabled={sendingRx}
                        className="w-full bg-jetblue-500 hover:bg-jetblue-600 disabled:bg-slate-300 text-white text-xs font-extrabold py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {sendingRx ? 'Transmitting to Pharmacy...' : 'Authorize & Dispatch Rx'}
                      </button>
                    </form>
                  </div>

                  {/* Active Prescriptions Table / History */}
                  <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4 md:col-span-2">
                    <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Rx Dispatch Logs</h4>
                    
                    <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                      {prescriptions.length === 0 ? (
                        <div className="py-12 text-center text-slate-400">
                          <Pill className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm font-semibold">No prescriptions authored in this session</p>
                        </div>
                      ) : (
                        prescriptions.map((rx) => (
                          <div key={rx.id} className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-between hover:border-slate-250 transition-colors">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-slate-800 text-xs">{rx.patientName}</span>
                                <span className="text-[9px] font-mono bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                                  {rx.id}
                                </span>
                              </div>
                              <p className="text-xs font-bold text-jetblue-600">{rx.drugName}</p>
                              <div className="text-[10px] text-slate-400 flex gap-x-3">
                                <span>Dosage: <span className="font-semibold text-slate-600">{rx.dosage} {rx.frequency}</span></span>
                                <span>Refills: <span className="font-semibold text-slate-600">{rx.refills}</span></span>
                                <span>Date: <span className="font-semibold text-slate-600">{rx.dateWritten}</span></span>
                              </div>
                            </div>

                            <span className="bg-emerald-50 text-emerald-600 font-extrabold text-[10px] px-2 py-1 rounded-full border border-emerald-100">
                              Dispatched
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= PRACTICE PERFORMANCE VIEW ================= */}
            {activeTab === 'performance' && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-display font-extrabold text-slate-800 tracking-tight">Practice Performance Hub</h3>
                  <p className="text-xs text-slate-500">Real-time clinic metrics, patient roster expansion, and automated claim audits.</p>
                </div>

                {/* Scorecards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm space-y-1.5 hover:border-jetblue-200 transition-colors">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Total Clinic Roster</span>
                    <div className="text-2xl font-extrabold text-slate-800 flex items-center justify-between">
                      <span>142 Patients</span>
                      <span className="text-xs text-emerald-500 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">+12.4%</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm space-y-1.5 hover:border-jetblue-200 transition-colors">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Claim Audit Approval Speed</span>
                    <div className="text-2xl font-extrabold text-slate-800 flex items-center justify-between">
                      <span>98.4% Success</span>
                      <span className="text-xs text-emerald-500 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Instant</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm space-y-1.5 hover:border-jetblue-200 transition-colors">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Avg. Check-In Wait Time</span>
                    <div className="text-2xl font-extrabold text-slate-800 flex items-center justify-between">
                      <span>14.5 Minutes</span>
                      <span className="text-xs text-emerald-500 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">-3.2m</span>
                    </div>
                  </div>
                </div>

                {/* Interactive custom SVG / CSS charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Chart 1: Patient growth chart */}
                  <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <h4 className="font-bold text-slate-800 text-sm">Patient Roster Growth (Monthly)</h4>
                      <span className="text-[10px] font-semibold text-slate-400">Past 6 Months</span>
                    </div>

                    {/* Custom SVG Line Chart representation with tooltips on hover */}
                    <div className="h-56 relative flex items-end justify-between pt-6 px-4">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 pt-6">
                        <div className="border-b border-slate-100 w-full"></div>
                        <div className="border-b border-slate-100 w-full"></div>
                        <div className="border-b border-slate-100 w-full"></div>
                        <div className="border-b border-slate-100 w-full"></div>
                      </div>

                      {/* SVG Line representation */}
                      <svg className="absolute inset-0 w-full h-full pb-6 pt-6 px-4" viewBox="0 0 400 150">
                        {/* Area gradient under curve */}
                        <defs>
                          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0091FF" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#0091FF" stopOpacity="0.00" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 20 130 C 60 120, 100 95, 140 85 C 180 75, 220 50, 260 40 C 300 30, 340 18, 380 10 L 380 150 L 20 150 Z"
                          fill="url(#areaGrad)"
                        />
                        {/* Line path */}
                        <path
                          d="M 20 130 C 60 120, 100 95, 140 85 C 180 75, 220 50, 260 40 C 300 30, 340 18, 380 10"
                          fill="none"
                          stroke="#0091FF"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                        />
                        {/* Interactive Data nodes */}
                        <circle cx="20" cy="130" r="5" fill="#0091FF" stroke="white" strokeWidth="2" className="cursor-pointer hover:r-7 transition-all" onMouseEnter={() => setHoveredData({label: 'Jan Roster', value: '88 Patients'})} onMouseLeave={() => setHoveredData(null)} />
                        <circle cx="92" cy="100" r="5" fill="#0091FF" stroke="white" strokeWidth="2" className="cursor-pointer hover:r-7 transition-all" onMouseEnter={() => setHoveredData({label: 'Feb Roster', value: '102 Patients'})} onMouseLeave={() => setHoveredData(null)} />
                        <circle cx="164" cy="80" r="5" fill="#0091FF" stroke="white" strokeWidth="2" className="cursor-pointer hover:r-7 transition-all" onMouseEnter={() => setHoveredData({label: 'Mar Roster', value: '114 Patients'})} onMouseLeave={() => setHoveredData(null)} />
                        <circle cx="236" cy="46" r="5" fill="#0091FF" stroke="white" strokeWidth="2" className="cursor-pointer hover:r-7 transition-all" onMouseEnter={() => setHoveredData({label: 'Apr Roster', value: '128 Patients'})} onMouseLeave={() => setHoveredData(null)} />
                        <circle cx="308" cy="24" r="5" fill="#0091FF" stroke="white" strokeWidth="2" className="cursor-pointer hover:r-7 transition-all" onMouseEnter={() => setHoveredData({label: 'May Roster', value: '135 Patients'})} onMouseLeave={() => setHoveredData(null)} />
                        <circle cx="380" cy="10" r="5" fill="#0091FF" stroke="white" strokeWidth="2" className="cursor-pointer hover:r-7 transition-all" onMouseEnter={() => setHoveredData({label: 'Jun Roster', value: '142 Patients'})} onMouseLeave={() => setHoveredData(null)} />
                      </svg>

                      {/* X-Axis labels */}
                      <span className="text-[9px] font-bold text-slate-400 z-10 pb-1">Jan</span>
                      <span className="text-[9px] font-bold text-slate-400 z-10 pb-1">Feb</span>
                      <span className="text-[9px] font-bold text-slate-400 z-10 pb-1">Mar</span>
                      <span className="text-[9px] font-bold text-slate-400 z-10 pb-1">Apr</span>
                      <span className="text-[9px] font-bold text-slate-400 z-10 pb-1">May</span>
                      <span className="text-[9px] font-bold text-slate-400 z-10 pb-1">Jun</span>
                    </div>
                  </div>

                  {/* Chart 2: Claims Audits Verification Speed (Bar Chart) */}
                  <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <h4 className="font-bold text-slate-800 text-sm">Monthly Claims Registry Audits</h4>
                      <span className="text-[10px] font-semibold text-slate-400">98.4% Approvals</span>
                    </div>

                    <div className="h-56 flex items-end justify-around relative px-4 pb-4">
                      {/* Grid Lines */}
                      <div className="absolute inset-x-0 inset-y-4 flex flex-col justify-between pointer-events-none">
                        <div className="border-b border-slate-100 w-full"></div>
                        <div className="border-b border-slate-100 w-full"></div>
                        <div className="border-b border-slate-100 w-full"></div>
                      </div>

                      {/* Interactive Bar 1 */}
                      <div className="flex flex-col items-center gap-1 z-10 group cursor-pointer w-10">
                        <div className="w-6 bg-slate-200 h-44 rounded-t-lg relative overflow-hidden group-hover:bg-slate-300 transition-all flex items-end" onMouseEnter={() => setHoveredData({label: 'Jan Claims Auth', value: '94% Approved'})} onMouseLeave={() => setHoveredData(null)}>
                          <div className="w-full bg-jetblue-500 h-[94%] rounded-t-lg"></div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400">Jan</span>
                      </div>

                      {/* Bar 2 */}
                      <div className="flex flex-col items-center gap-1 z-10 group cursor-pointer w-10">
                        <div className="w-6 bg-slate-200 h-44 rounded-t-lg relative overflow-hidden group-hover:bg-slate-300 transition-all flex items-end" onMouseEnter={() => setHoveredData({label: 'Feb Claims Auth', value: '96% Approved'})} onMouseLeave={() => setHoveredData(null)}>
                          <div className="w-full bg-jetblue-500 h-[96%] rounded-t-lg"></div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400">Feb</span>
                      </div>

                      {/* Bar 3 */}
                      <div className="flex flex-col items-center gap-1 z-10 group cursor-pointer w-10">
                        <div className="w-6 bg-slate-200 h-44 rounded-t-lg relative overflow-hidden group-hover:bg-slate-300 transition-all flex items-end" onMouseEnter={() => setHoveredData({label: 'Mar Claims Auth', value: '97.5% Approved'})} onMouseLeave={() => setHoveredData(null)}>
                          <div className="w-full bg-jetblue-500 h-[97.5%] rounded-t-lg"></div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400">Mar</span>
                      </div>

                      {/* Bar 4 */}
                      <div className="flex flex-col items-center gap-1 z-10 group cursor-pointer w-10">
                        <div className="w-6 bg-slate-200 h-44 rounded-t-lg relative overflow-hidden group-hover:bg-slate-300 transition-all flex items-end" onMouseEnter={() => setHoveredData({label: 'Apr Claims Auth', value: '98% Approved'})} onMouseLeave={() => setHoveredData(null)}>
                          <div className="w-full bg-jetblue-500 h-[98%] rounded-t-lg"></div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400">Apr</span>
                      </div>

                      {/* Bar 5 */}
                      <div className="flex flex-col items-center gap-1 z-10 group cursor-pointer w-10">
                        <div className="w-6 bg-slate-200 h-44 rounded-t-lg relative overflow-hidden group-hover:bg-slate-300 transition-all flex items-end" onMouseEnter={() => setHoveredData({label: 'May Claims Auth', value: '98.4% Approved'})} onMouseLeave={() => setHoveredData(null)}>
                          <div className="w-full bg-jetblue-500 h-[98.4%] rounded-t-lg"></div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400">May</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Floating Log display for interactive hovered data */}
                <div className="h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xs border border-slate-200 text-slate-600 transition-all">
                  {hoveredData ? (
                    <span className="font-bold text-jetblue-600 flex items-center gap-1">
                      📊 Instrument Readout: <span className="text-slate-800 font-extrabold">{hoveredData.label}</span> — <span className="bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm text-slate-700 font-bold">{hoveredData.value}</span>
                    </span>
                  ) : (
                    <span className="italic text-slate-400 flex items-center gap-1">
                      💡 Hover over custom chart data points or bars to reveal detailed clinical metrics.
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* ================= SUPPORT & JETTIE ASSISTANCE VIEW ================= */}
            {activeTab === 'support' && (
              <motion.div
                key="support"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-6"
              >
                {/* Support details panel (Matches Image 4 exactly) */}
                <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between items-center text-center space-y-6">
                  <div className="space-y-1.5 w-full">
                    <Logo size="md" className="justify-center" />
                    <h3 className="text-2xl font-display font-extrabold text-jetblue-500 tracking-tight mt-3">Need Assistance?</h3>
                  </div>

                  {/* Large Support Phone Number */}
                  <div className="space-y-1">
                    <div className="p-3 bg-blue-50 rounded-full w-fit mx-auto text-jetblue-500 border border-blue-100">
                      <Phone className="w-7 h-7" />
                    </div>
                    <a 
                      href="tel:18005382273"
                      className="text-lg md:text-xl font-black text-jetblue-500 hover:underline block"
                    >
                      1-800-JET-CARE
                    </a>
                    <span className="text-xs text-slate-400 font-bold tracking-wide block">
                      (1-800-538-2273)
                    </span>
                  </div>

                  {/* Mascot display */}
                  <JettieMascot type="headset" size={110} />

                  {/* Details Block */}
                  <div className="w-full text-xs text-slate-500 space-y-4 pt-4 border-t border-slate-100 text-left">
                    <div className="space-y-1">
                      <span className="font-extrabold text-[10px] text-slate-400 uppercase tracking-widest block">Office Address</span>
                      <div className="flex items-start gap-1 text-slate-700">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>2361 Main Anand Bve, Rondon, TH 30003</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-extrabold text-[10px] text-slate-400 uppercase tracking-widest block">Support Hours</span>
                      <div className="space-y-0.5 text-slate-700">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Monts: AM - 6:30 PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                          <span>Support: 1AM - 7:30 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Chat Panel */}
                <div className="lg:col-span-3 h-[520px]">
                  <JettieChat userRole="provider" onNavigateToTab={(tab) => {
                    if (tab === 'patients' || tab === 'patients-list') setActiveTab('patients');
                    if (tab === 'prescriptions') setActiveTab('prescriptions');
                    if (tab === 'performance') setActiveTab('performance');
                  }} />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </section>

      </div>

      {/* ================= REGISTER PATIENT MODAL ================= */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-100 my-8"
          >
            <div className="bg-jetblue-500 text-white p-4">
              <h4 className="font-bold text-base font-display">Register New Patient File</h4>
              <p className="text-xs text-slate-100 mt-0.5">Initialize a secure electronic clinical record.</p>
            </div>

            <form onSubmit={handleRegisterPatient} className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 block">Full Patient Name</label>
                  <input 
                    type="text" 
                    value={newPatName}
                    onChange={(e) => setNewPatName(e.target.value)}
                    placeholder="e.g. Sarah Miller"
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-jetblue-500 font-medium"
                    required
                  />
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-500 block">Insurance Carrier Plan</label>
                  <select 
                    value={newPatInsurance}
                    onChange={(e) => setNewPatInsurance(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-jetblue-500 font-medium"
                  >
                    <option>BlueShield PPO</option>
                    <option>Medicare Plan A</option>
                    <option>Medicare Plan B</option>
                    <option>JetHealth Prime HMO</option>
                    <option>Self-Pay / Private</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Date of Birth</label>
                  <input 
                    type="date" 
                    value={newPatDob}
                    onChange={(e) => setNewPatDob(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Gender</label>
                  <select 
                    value={newPatGender}
                    onChange={(e) => setNewPatGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg focus:outline-none"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Contact Phone</label>
                  <input 
                    type="text" 
                    value={newPatPhone}
                    onChange={(e) => setNewPatPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Initial vitals */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Initial Vitals Logging</span>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">BP (e.g. 120/80)</label>
                    <input type="text" value={newPatBp} onChange={(e) => setNewPatBp(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs p-1.5 rounded-lg text-center font-medium" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">HR (bpm)</label>
                    <input type="text" value={newPatHr} onChange={(e) => setNewPatHr(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs p-1.5 rounded-lg text-center font-medium" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Temp (°F)</label>
                    <input type="text" value={newPatTemp} onChange={(e) => setNewPatTemp(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs p-1.5 rounded-lg text-center font-medium" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Weight (lbs)</label>
                    <input type="text" value={newPatWeight} onChange={(e) => setNewPatWeight(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs p-1.5 rounded-lg text-center font-medium" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Initial Doctor's Consultation Notes</label>
                <textarea 
                  value={newPatNotes}
                  onChange={(e) => setNewPatNotes(e.target.value)}
                  placeholder="Record symptoms, clinical history overview, or initial diagnostic goals..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg focus:outline-none h-16 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2 justify-end border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-jetblue-500 text-white rounded-xl text-xs font-bold shadow hover:bg-jetblue-600 cursor-pointer"
                >
                  Register Chart File
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ================= RX PRESCRIBE MODAL ================= */}
      {showRxModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-100"
          >
            <div className="bg-slate-900 text-white p-4">
              <h4 className="font-bold text-base font-display">Quick Rx Authorize Box</h4>
              <p className="text-xs text-slate-300 mt-0.5">Direct formulation transmission tool.</p>
            </div>

            <form onSubmit={handleDispatchRx} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Active Patient</label>
                <input 
                  type="text" 
                  value={patients.find(p => p.id === rxPatientId)?.name || 'No Patient Selected'} 
                  className="w-full bg-slate-100 border border-slate-200 text-xs px-3 py-2 rounded-lg font-bold text-slate-700" 
                  disabled 
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Drug Name</label>
                <select
                  value={rxDrug}
                  onChange={(e) => setRxDrug(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-2.5 py-2.5 rounded-lg font-medium"
                >
                  <option>Metformin 500mg (Glucophage)</option>
                  <option>Lisinopril 10mg (Zestril)</option>
                  <option>Atorvastatin 20mg (Lipitor)</option>
                  <option>Amoxicillin 500mg</option>
                  <option>Albuterol HFA Inhaler</option>
                  <option>Losartan 50mg (Cozaar)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Dosage</label>
                  <input type="text" value={rxDosage} onChange={(e) => setRxDosage(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Frequency</label>
                  <input type="text" value={rxFrequency} onChange={(e) => setRxFrequency(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Refills</label>
                <input type="number" min="0" max="12" value={rxRefills} onChange={(e) => setRxRefills(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg" />
              </div>

              <div className="flex gap-2 pt-2 justify-end border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setShowRxModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={sendingRx}
                  className="px-4 py-2 bg-jetblue-500 text-white rounded-xl text-xs font-bold shadow hover:bg-jetblue-600 cursor-pointer"
                >
                  {sendingRx ? 'Transmitting...' : 'Authorize Signature'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ================= CLINICAL APPOINTMENT MODAL ================= */}
      {showAptModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-100"
          >
            <div className="bg-jetblue-500 text-white p-4">
              <h4 className="font-bold text-base">Schedule Clinic Appointment</h4>
              <p className="text-xs text-slate-100 mt-0.5">Register visit directly on Dr. Smith's calendar.</p>
            </div>

            <form onSubmit={handleCreateAppointment} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Select Patient</label>
                <select
                  value={aptPatId}
                  onChange={(e) => setAptPatId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-2.5 py-2.5 rounded-lg font-medium"
                  required
                >
                  <option value="">-- Choose Patient --</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.insurance})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Date</label>
                  <input type="date" value={aptDate} onChange={(e) => setAptDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Preferred Time</label>
                  <select value={aptTime} onChange={(e) => setAptTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg">
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
                <label className="text-xs font-bold text-slate-500 block">Consultation Reason</label>
                <input type="text" value={aptReason} onChange={(e) => setAptReason(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg" required />
              </div>

              <div className="flex gap-2 pt-2 justify-end border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setShowAptModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-jetblue-500 text-white rounded-xl text-xs font-bold shadow hover:bg-jetblue-600 cursor-pointer"
                >
                  Create Schedule
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 mt-12">
        <p>© 2026 JetHealth Inc. Clinical workspace system. All logs are digitally authorized under HIPAA regulations. Confidential.</p>
      </footer>
    </div>
  );
}
