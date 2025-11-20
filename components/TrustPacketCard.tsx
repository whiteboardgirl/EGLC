import React from 'react';
import { TrustPacket } from '../types';
import { ShieldCheck, AlertTriangle, Lock } from 'lucide-react';

interface Props {
  packet: TrustPacket;
}

const TrustPacketCard: React.FC<Props> = ({ packet }) => {
  const isVerified = packet.status === 'verified';

  return (
    <div className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 font-mono text-xs space-y-3">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-2 text-zinc-400">
          <Lock size={14} />
          <span>TRUST PACKET</span>
        </div>
        <div className={`flex items-center gap-1 ${isVerified ? 'text-emerald-400' : 'text-amber-400'}`}>
          {isVerified ? <ShieldCheck size={14} /> : <AlertTriangle size={14} />}
          <span className="uppercase">{packet.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-zinc-500 block mb-1">ETHICAL DENSITY (μ)</span>
          <div className="text-lg text-zinc-200 font-bold">{packet.metrics.ethical_density.toFixed(2)}</div>
          <div className="w-full bg-zinc-800 h-1 mt-1 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500" 
              style={{ width: `${packet.metrics.ethical_density * 100}%` }}
            ></div>
          </div>
        </div>
        <div>
          <span className="text-zinc-500 block mb-1">SEMANTIC DRIFT (σ)</span>
          <div className="text-lg text-zinc-200 font-bold">{packet.metrics.drift.toFixed(3)}</div>
          <div className="w-full bg-zinc-800 h-1 mt-1 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500" 
              style={{ width: `${packet.metrics.drift * 1000}%` }} // Scale for viz
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-zinc-500">ACTIVE ANCHORS</span>
        <div className="flex flex-wrap gap-2">
          {packet.anchors_confirmed.length > 0 ? (
            packet.anchors_confirmed.map(a => (
              <span key={a} className="px-2 py-0.5 bg-indigo-900/30 text-indigo-300 border border-indigo-800 rounded text-[10px]">
                ⊚ {a}
              </span>
            ))
          ) : (
            <span className="text-zinc-600 italic">None detected</span>
          )}
        </div>
      </div>

      <div className="pt-2 text-[10px] text-zinc-600 flex justify-between">
        <span>V{packet.expr_version}</span>
        <span>{packet.timestamp}</span>
      </div>
    </div>
  );
};

export default TrustPacketCard;
