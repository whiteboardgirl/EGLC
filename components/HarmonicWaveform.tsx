import React, { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';
import { EGLCAST } from '../types';
import { OPERATOR_WEIGHTS } from '../constants';

interface Props {
  ast: EGLCAST;
}

const HarmonicWaveform: React.FC<Props> = ({ ast }) => {
  const data = useMemo(() => {
    // Convert AST nodes into a waveform dataset
    // Operators spike values, glyphs sustain them. Anchors stabilize.
    let currentValue = 0.5;
    return ast.nodes.map((node, idx) => {
      if (node.type === 'operator') {
        const weight = OPERATOR_WEIGHTS[node.value] || 0.5;
        currentValue = 0.2 + (weight * 0.8); // Spikes
      } else if (node.type === 'anchor') {
        currentValue = 0.9; // High stability
      } else {
        currentValue = 0.4 + Math.random() * 0.2; // Narrative noise
      }
      return {
        name: idx,
        value: currentValue,
        label: node.value
      };
    });
  }, [ast]);

  return (
    <div className="w-full h-32 bg-zinc-900/50 rounded border border-zinc-800 p-2">
       <div className="text-[10px] text-zinc-500 uppercase font-mono mb-1">Harmonic Waveform (φ-Resonance)</div>
       <ResponsiveContainer width="100%" height="100%">
         <LineChart data={data}>
           <YAxis domain={[0, 1]} hide />
           <XAxis dataKey="label" interval={0} tick={{fontSize: 10, fill: '#71717a'}} />
           <Tooltip 
             contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', color: '#fff' }}
             itemStyle={{ color: '#a78bfa' }}
           />
           <Line 
             type="monotone" 
             dataKey="value" 
             stroke="#8b5cf6" 
             strokeWidth={2} 
             dot={{r: 2, fill: '#c4b5fd'}}
             activeDot={{r: 4, fill: '#fff'}}
           />
         </LineChart>
       </ResponsiveContainer>
    </div>
  );
};

export default HarmonicWaveform;
