
import React, { useEffect, useState } from 'react';
import { EGLCAST } from '../types';

interface Props {
  ast: EGLCAST;
  size?: number;
}

const HarmonicGauge: React.FC<Props> = ({ ast, size = 300 }) => {
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    // Calculate a pseudo-harmonic intensity based on AST complexity
    const operatorCount = ast.nodes.filter(n => n.type === 'operator').length;
    const anchorCount = ast.nodes.filter(n => n.type === 'anchor').length;
    const score = Math.min(1, (operatorCount * 0.1) + (anchorCount * 0.2) + 0.3);
    setIntensity(score);
  }, [ast]);

  const center = size / 2;
  const radius = (size / 2) - 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (intensity * circumference);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
      
      <svg width={size} height={size} className="relative z-10 transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        {/* Inner Decorative Rings */}
        <circle
          cx={center}
          cy={center}
          r={radius * 0.8}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
          fill="transparent"
          className="animate-spin-slow"
          style={{ animationDuration: '20s' }}
        />
        <circle
          cx={center}
          cy={center}
          r={radius * 0.6}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
          fill="transparent"
          className="animate-reverse-spin"
          style={{ animationDuration: '15s' }}
        />
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
        <div className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent filter drop-shadow-lg">
          {(intensity * 100).toFixed(0)}%
        </div>
        <div className="text-xs text-purple-300/70 font-mono mt-1 tracking-widest uppercase">Harmonic Resonance</div>
        <div className="text-[10px] text-white/30 mt-2 font-mono">φ = 1.618</div>
      </div>
    </div>
  );
};

export default HarmonicGauge;
