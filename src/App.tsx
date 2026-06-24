import React, { useState } from 'react';
import PublicLanding from './components/PublicLanding';
import MemberPortal from './components/MemberPortal';
import ProviderPortal from './components/ProviderPortal';
import { Patient, Appointment, Prescription, Claim } from './types';

export default function App() {
  const [role, setRole] = useState<'public' | 'member' | 'provider'>('public');

  // Pre-populated medical database matching collateral exactly
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'p-1',
      name: 'John D.',
      insurance: 'BlueShield PPO',
      lastVisit: '2 Weeks Ago',
      dob: '1988-04-12',
      gender: 'Male',
      phone: '555-014-9988',
      email: 'johnd@blueshield.com',
      vitals: { 
        bloodPressure: '120/80', 
        heartRate: '72 bpm', 
        temperature: '98.4 °F', 
        weight: '172 lbs' 
      },
      notes: 'Patient recovering beautifully from minor ankle sprain. Range of motion is fully restored. Recommended daily stretching. No active medications needed.',
      activePrescriptions: [],
      medicalHistory: ['Ankle Sprain (2026)', 'Routine Health Check'],
    },
    {
      id: 'p-2',
      name: 'Sarah M.',
      insurance: 'Medicare Plan A',
      lastVisit: '1 Month Ago',
      dob: '1955-08-21',
      gender: 'Female',
      phone: '555-011-2244',
      email: 'sarahm@medicare.gov',
      vitals: { 
        bloodPressure: '135/85', 
        heartRate: '78 bpm', 
        temperature: '98.6 °F', 
        weight: '150 lbs' 
      },
      notes: 'Essential hypertension diagnosed in 2024. Blood pressure stable but slightly elevated. Continuing Lisinopril 10mg once daily.',
      activePrescriptions: ['Lisinopril 10mg'],
      medicalHistory: ['Essential Hypertension (2024)', 'Mild Asthma'],
    },
    {
      id: 'p-3',
      name: 'John T.',
      insurance: 'Medicare Plan B',
      lastVisit: '1 Month Ago',
      dob: '1962-11-05',
      gender: 'Male',
      phone: '555-018-8833',
      email: 'johnt@medicare.gov',
      vitals: { 
        bloodPressure: '118/76', 
        heartRate: '64 bpm', 
        temperature: '98.2 °F', 
        weight: '190 lbs' 
      },
      notes: 'Hyperlipidemia history. Cholesterol panel shows positive improvement with Atorvastatin 20mg. Advised balanced low-sodium diet.',
      activePrescriptions: ['Atorvastatin 20mg'],
      medicalHistory: ['Hyperlipidemia (2025)', 'Fractured Wrist (2020)'],
    },
    {
      id: 'p-4',
      name: 'Sarah M.',
      insurance: 'Medicare Plan A',
      lastVisit: '1 Month Ago',
      dob: '1979-06-14',
      gender: 'Female',
      phone: '555-019-7722',
      email: 'sarah.miller@medicare.gov',
      vitals: { 
        bloodPressure: '122/81', 
        heartRate: '70 bpm', 
        temperature: '98.7 °F', 
        weight: '142 lbs' 
      },
      notes: 'Routine checkup completed. Overall vitals in excellent condition. Instructed on maintaining standard exercise schedules. Sub-item pediatric dental records reviewed.',
      activePrescriptions: ['Multivitamins'],
      medicalHistory: ['Routine Annual Audits'],
    }
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt-1',
      patientId: 'p-1',
      patientName: 'John D.',
      date: '2026-06-24',
      time: '09:00 AM',
      reason: 'Ankle Sprain Follow-up',
      status: 'Completed',
    },
    {
      id: 'apt-2',
      patientId: 'p-2',
      patientName: 'Sarah M.',
      date: '2026-06-24',
      time: '11:30 AM',
      reason: 'Hypertension Review',
      status: 'Active',
    },
    {
      id: 'apt-3',
      patientId: 'p-3',
      patientName: 'John T.',
      date: '2026-06-25',
      time: '02:30 PM',
      reason: 'Cholesterol Consultation',
      status: 'Scheduled',
    }
  ]);

  const [claims, setClaims] = useState<Claim[]>([
    {
      id: 'JHEA-001',
      enrollmentItem: 'Dental',
      subItem: 'Jet Dental Basic (Family)',
      description: 'Basic family plan for dental coverage.',
      rate: 348.00,
      status: 'Purchased (Verified)',
      effectiveDate: '10/06/2025',
      subscriberName: 'Dr. Bruce Wayne',
      patientName: 'Jack Ledger',
    },
    {
      id: 'JHEA-001',
      enrollmentItem: 'Healthcare Program',
      subItem: 'RISE Premium',
      description: 'Healthcare program coverage for dependents under the age of 23.',
      rate: 1349.49,
      status: 'Purchased (Verified)',
      effectiveDate: '10/06/2025',
      subscriberName: 'Dr. Bruce Wayne',
      patientName: 'Jack Ledger',
    }
  ]);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: 'rx-1',
      patientId: 'p-2',
      patientName: 'Sarah M.',
      drugName: 'Lisinopril 10mg (Zestril)',
      dosage: 'Once daily',
      frequency: 'In the morning',
      refills: 3,
      dateWritten: '05/20/2026',
      status: 'Active',
    },
    {
      id: 'rx-2',
      patientId: 'p-3',
      patientName: 'John T.',
      drugName: 'Atorvastatin 20mg (Lipitor)',
      dosage: 'Once daily',
      frequency: 'At bedtime',
      refills: 5,
      dateWritten: '06/11/2026',
      status: 'Active',
    }
  ]);

  // Methods to modify data
  const handleAddPatient = (newPatient: Patient) => {
    setPatients((prev) => [...prev, newPatient]);
  };

  const handleUpdatePatientNotes = (patientId: string, updatedNotes: string) => {
    setPatients((prev) => 
      prev.map(p => p.id === patientId ? { ...p, notes: updatedNotes } : p)
    );
  };

  const handleAddPrescription = (newRx: Prescription) => {
    setPrescriptions((prev) => [newRx, ...prev]);
    // Also append the new prescription name to the patient file
    setPatients((prev) =>
      prev.map(p => 
        p.id === newRx.patientId 
          ? { ...p, activePrescriptions: [...p.activePrescriptions, newRx.drugName] } 
          : p
      )
    );
  };

  const handleAddAppointment = (newApt: Appointment) => {
    setAppointments((prev) => [newApt, ...prev]);
  };

  const handleAddClaim = (newClaim: Claim) => {
    setClaims((prev) => [...prev, newClaim]);
  };

  return (
    <div className="w-full min-h-screen">
      {role === 'public' && (
        <PublicLanding 
          onEnterMemberPortal={() => setRole('member')} 
          onEnterProviderPortal={() => setRole('provider')} 
        />
      )}
      
      {role === 'member' && (
        <MemberPortal 
          patients={patients}
          appointments={appointments}
          claims={claims}
          onAddAppointment={handleAddAppointment}
          onAddClaim={handleAddClaim}
          onNavigateToProvider={() => setRole('provider')}
        />
      )}

      {role === 'provider' && (
        <ProviderPortal 
          patients={patients}
          appointments={appointments}
          claims={claims}
          prescriptions={prescriptions}
          onAddPatient={handleAddPatient}
          onUpdatePatientNotes={handleUpdatePatientNotes}
          onAddPrescription={handleAddPrescription}
          onAddAppointment={handleAddAppointment}
          onNavigateToMember={() => setRole('member')}
        />
      )}
    </div>
  );
}
