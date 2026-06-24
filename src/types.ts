export interface Patient {
  id: string;
  name: string;
  insurance: string;
  lastVisit: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
  };
  notes: string;
  activePrescriptions: string[];
  medicalHistory: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  status: 'Scheduled' | 'Active' | 'Completed' | 'Cancelled';
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  drugName: string;
  dosage: string;
  frequency: string;
  refills: number;
  dateWritten: string;
  status: 'Active' | 'Filled' | 'Discontinued';
}

export interface Claim {
  id: string;
  enrollmentItem: string;
  subItem: string;
  description: string;
  rate: number;
  status: 'Purchased (Verified)' | 'Processing' | 'Approved' | 'Denied';
  effectiveDate: string;
  subscriberName: string;
  patientName: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'jettie';
  text: string;
  timestamp: string;
  typing?: boolean;
}
