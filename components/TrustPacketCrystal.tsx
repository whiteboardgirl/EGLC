
import React from 'react';
import { TrustPacket } from '../types';
import { Shield, Lock, Activity, Hexagon } from 'lucide-react';

interface Props {
  packet: TrustPacket;
}

const TrustPacketCrystal: React.FC<Props> = ({ packet }) => {
  const mu = packet.metrics.ethical_density.toFixed(2);
  const sigma = packet.metrics.drift.toFixed(3);
  const isVerified = packet.status.includes('VERIFIED') || packet.status === 'verified';

  return (
    <div className="relative group">
      {/* Crystal Background Shape */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-purple-900/40 backdrop-blur-md rounded-3xl border border-white/10 transform transition-all duration-500 group-hover:scale-[1.02] group-hover:border-indigo-400/30" />
      
      {/* Content */}
      <div className="relative p-6 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-indigo-300">
            <Hexagon className="w-5 h-5 animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase">Trust Packet</span>
          </div>
          <div className={`px-3 py-1 rounded-full border ${isVerified ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' : 'bg-amber-500/20 border-amber-500/30 text-amber-300'} text-[10px] font-bold flex items-center gap-2`}>
            {isVerified ? <Shield className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            {packet.status}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/20 rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-zinc-400 mb-1 uppercase tracking-wider">Ethical Density (μ)</div>
            <div className="text-2xl font-bold text-white flex items-baseline gap-1">
              {mu}
              <span className="text-[10px] text-emerald-400 font-normal">High</span>
            </div>
            <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${parseFloat(mu) * 100}%` }} />
            </div>
          </div>
          <div className="bg-black/20 rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-zinc-400 mb-1 uppercase tracking-wider">Drift (σ)</div>
            <div className="text-2xl font-bold text-white flex items-baseline gap-1">
              {sigma}
              <span className="text-[10px] text-indigo-400 font-normal">Stable</span>
            </div>
            <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${Math.max(5, (1 - parseFloat(sigma)) * 100)}%` }} />
            </div>
          </div>
        </div>

        {/* Anchors */}
        <div className="space-y-3">
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Active Anchors</div>
          <div className="flex flex-wrap gap-2">
            {packet.anchors_confirmed.map((anchor) => (
              <div key={anchor} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                <span className="text-xs text-indigo-100 font-mono">{anchor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Hash */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-zinc-500 font-mono truncate">
          <Activity className="w-3 h-3 text-zinc-600" />
          <span className="truncate">{packet.hash || `sha256:${Date.now().toString(16)}`}</span>
        </div>
      </div>
    </div>
  );
};

export default TrustPacketCrystal;
