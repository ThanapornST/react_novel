import React from 'react';
import { Bot } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Bot className="w-8 h-8 text-white" />
      <span className="text-2xl font-bold ml-2 text-white">VOICE</span>
    </div>
  );
}