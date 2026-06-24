import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
}

export default function Logo({ className = '', iconOnly = false, size = 'md', variant = 'dark' }: LogoProps) {
  const sizeMap = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 40, text: 'text-2xl' },
    lg: { icon: 56, text: 'text-3xl' },
    xl: { icon: 72, text: 'text-4xl' },
  };

  const selectedSize = sizeMap[size];
  const textColor = variant === 'dark' ? 'text-slate-900' : 'text-white';
  const jetColor = 'text-jetblue-500';

  return (
    <div className={`flex items-center gap-2 font-display ${className}`}>
      {/* JetHealth Custom SVG Icon */}
      <svg
        width={selectedSize.icon}
        height={selectedSize.icon}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        {/* Globe Base */}
        <circle cx="60" cy="60" r="45" fill="white" />
        <circle cx="60" cy="60" r="45" stroke="#38bdf8" strokeWidth="4" />
        
        {/* Globe Latitude Lines */}
        <path d="M15 60H105" stroke="#38bdf8" strokeWidth="3" />
        <path d="M22 40H98" stroke="#38bdf8" strokeWidth="2.5" />
        <path d="M22 80H98" stroke="#38bdf8" strokeWidth="2.5" />
        <path d="M38 20H82" stroke="#38bdf8" strokeWidth="2.5" />
        <path d="M38 100H82" stroke="#38bdf8" strokeWidth="2.5" />
        
        {/* Globe Longitude Lines */}
        <path d="M60 15V105" stroke="#38bdf8" strokeWidth="3" />
        <path d="M60 15C40 30 40 90 60 105" stroke="#38bdf8" strokeWidth="3" fill="none" />
        <path d="M60 15C80 30 80 90 60 105" stroke="#38bdf8" strokeWidth="3" fill="none" />
        <path d="M60 15C20 35 20 85 60 105" stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="2 2" />
        <path d="M60 15C100 35 100 85 60 105" stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="2 2" />

        {/* Wings (Left Wing) */}
        <path
          d="M48 55C35 48 20 40 4 22C6 35 12 48 30 58C18 64 8 68 5 74C14 74 25 72 38 65C28 72 20 78 18 84C28 83 38 78 48 70C42 76 38 82 38 86C46 84 54 78 60 70"
          fill="#0284c7"
          stroke="white"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Wings (Right Wing) */}
        <path
          d="M72 55C85 48 100 40 116 22C114 35 108 48 90 58C102 64 112 68 115 74C106 74 95 72 82 65C92 72 100 78 102 84C92 83 82 78 72 70C78 76 82 82 82 86C74 84 66 78 60 70"
          fill="#0284c7"
          stroke="white"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* White Border for Cross */}
        <path
          d="M45 42H52V35C52 31.1 55.1 28 59 28H61C64.9 28 68 31.1 68 35V42H75C78.9 42 82 45.1 82 49V51C82 54.9 78.9 58 75 58H68V65C68 68.9 64.9 72 61 72H59C55.1 72 52 68.9 52 65V58H45C41.1 58 38 54.9 38 51V49C38 45.1 41.1 42 45 42Z"
          fill="white"
          stroke="white"
          strokeWidth="1"
        />

        {/* Red Cross */}
        <path
          d="M48 44H54V38C54 35.8 55.8 34 58 34H62C64.2 34 66 35.8 66 38V44H72C74.2 44 76 45.8 76 48V52C76 54.2 74.2 56 72 56H66V62C66 64.2 64.2 66 62 66H58C55.8 66 54 64.2 54 62V56H48C45.8 56 44 54.2 44 52V48C44 45.8 45.8 44 48 44Z"
          fill="#d62222"
        />
      </svg>

      {!iconOnly && (
        <span className={`font-bold tracking-tight select-none ${textColor}`}>
          <span className="text-jetblue-500 font-extrabold">Jet</span>Health
        </span>
      )}
    </div>
  );
}
