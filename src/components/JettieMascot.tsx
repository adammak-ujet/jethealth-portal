import React from 'react';
import { motion } from 'motion/react';

interface JettieProps {
  className?: string;
  type?: 'standard' | 'headset' | 'stethoscope' | 'doctor';
  size?: number;
}

export default function JettieMascot({ className = '', type = 'standard', size = 120 }: JettieProps) {
  return (
    <motion.div
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      animate={{ 
        y: [0, -6, 0],
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 4, 
        ease: "easeInOut" 
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Shadow under Jettie */}
        <ellipse cx="100" cy="180" rx="45" ry="8" fill="rgba(15, 23, 42, 0.08)" />

        {/* Jet Wings/Stabilizers (Left and Right stumpy jet wings) */}
        {/* Left Wing */}
        <path
          d="M60 110C40 108 20 115 15 125C10 135 25 140 50 135L62 128"
          fill="#cbd5e1"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M25 124C28 128 35 128 42 127" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

        {/* Right Wing */}
        <path
          d="M140 110C160 108 180 115 185 125C190 135 175 140 150 135L138 128"
          fill="#cbd5e1"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M175 124C172 128 165 128 158 127" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

        {/* Jet Thrusters/Engines (Back/Sides) */}
        {/* Left Engine */}
        <rect x="48" y="115" width="16" height="25" rx="8" fill="#475569" stroke="#334155" strokeWidth="2" />
        <ellipse cx="56" cy="140" rx="5" ry="2" fill="#ef4444" />

        {/* Right Engine */}
        <rect x="136" y="115" width="16" height="25" rx="8" fill="#475569" stroke="#334155" strokeWidth="2" />
        <ellipse cx="144" cy="140" rx="5" ry="2" fill="#ef4444" />

        {/* Main Body - Highly capsule/egg shaped */}
        <circle cx="100" cy="100" r="65" fill="#ffffff" stroke="#cbd5e1" strokeWidth="4" />
        {/* Highlight on head */}
        <path d="M60 65C70 52 100 48 130 55" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />

        {/* Cute Face */}
        {/* Eyes */}
        <circle cx="80" cy="95" r="7" fill="#0f172a" />
        <circle cx="120" cy="95" r="7" fill="#0f172a" />
        {/* Eye highlights */}
        <circle cx="78" cy="93" r="2.5" fill="#ffffff" />
        <circle cx="118" cy="93" r="2.5" fill="#ffffff" />

        {/* Cheeks */}
        <circle cx="70" cy="104" r="5" fill="#fca5a5" opacity="0.6" />
        <circle cx="130" cy="104" r="5" fill="#fca5a5" opacity="0.6" />

        {/* Happy Smile */}
        <path
          d="M93 108C93 112 107 112 107 108"
          stroke="#0f172a"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* ================= TYPE SPECIFIC ADDONS ================= */}

        {/* HEADSET TYPE */}
        {type === 'headset' && (
          <g id="headset-accessory">
            {/* Headband arching over Jettie */}
            <path
              d="M50 80C50 48 150 48 150 80"
              stroke="#334155"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Left Ear Cushion */}
            <rect x="42" y="70" width="12" height="22" rx="6" fill="#0ea5e9" stroke="#1e293b" strokeWidth="2" />
            <rect x="40" y="74" width="3" height="14" rx="1.5" fill="#1e293b" />
            
            {/* Right Ear Cushion */}
            <rect x="146" y="70" width="12" height="22" rx="6" fill="#0ea5e9" stroke="#1e293b" strokeWidth="2" />
            <rect x="157" y="74" width="3" height="14" rx="1.5" fill="#1e293b" />

            {/* Microphone Arm coming from right ear */}
            <path
              d="M152 82C152 100 132 108 122 106"
              stroke="#1e293b"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Mic Tip */}
            <rect x="116" y="103" width="7" height="6" rx="2" fill="#0f172a" />
          </g>
        )}

        {/* STETHOSCOPE TYPE */}
        {type === 'stethoscope' && (
          <g id="stethoscope-accessory">
            {/* Earpieces behind neck */}
            <path
              d="M68 120C65 140 75 145 100 145C125 145 135 140 132 120"
              stroke="#475569"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Chestpiece hanging down */}
            <path
              d="M100 145V165"
              stroke="#475569"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Diaphragm / Bell */}
            <circle cx="100" cy="167" r="10" fill="#cbd5e1" stroke="#475569" strokeWidth="3" />
            <circle cx="100" cy="167" r="5" fill="#ffffff" />
          </g>
        )}

        {/* DOCTOR TYPE (Stethoscope + Doctor Lab Coat + Name Tag) */}
        {type === 'doctor' && (
          <g id="doctor-accessory">
            {/* Doctor's White Lab Coat Overlay */}
            {/* Base white coat */}
            <path
              d="M50 142C50 155 58 165 72 165H128C142 165 150 155 150 142C150 136 142 128 135 125L100 138L65 125C58 128 50 136 50 142Z"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* V-neck outline */}
            <path d="M65 125L100 148L135 125" stroke="#cbd5e1" strokeWidth="3" fill="none" />
            {/* Coat split down the middle */}
            <path d="M100 148V165" stroke="#cbd5e1" strokeWidth="3" />
            
            {/* Little medical green lapel trim or pockets */}
            <rect x="62" y="148" width="12" height="1.5" rx="0.5" fill="#0d9488" />
            <rect x="126" y="148" width="12" height="1.5" rx="0.5" fill="#0d9488" />

            {/* Name Tag "JETTIE" */}
            <g transform="translate(112, 138)">
              {/* Badge clip */}
              <rect x="12" y="0" width="6" height="3" fill="#64748b" />
              {/* Badge Card */}
              <rect x="0" y="3" width="30" height="16" rx="2" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1" />
              {/* White badge body */}
              <rect x="2" y="7" width="26" height="10" rx="1" fill="white" />
              {/* Text representation */}
              <text x="15" y="13" fill="#0ea5e9" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">JETTIE</text>
            </g>

            {/* Stethoscope around neck */}
            <path
              d="M72 120C72 135 80 142 100 142C120 142 128 135 128 120"
              stroke="#0d9488"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M100 142V155" stroke="#0d9488" strokeWidth="3.5" />
            <circle cx="100" cy="156" r="6" fill="#cbd5e1" stroke="#0d9488" strokeWidth="2" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
