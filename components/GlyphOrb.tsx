
import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { GLYPH_DICTIONARY } from '../constants';

interface Props {
  onInsert: (glyph: string) => void;
}

const GlyphOrb: React.FC<Props> = ({ onInsert }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = Array.from(new Set(GLYPH_DICTIONARY.map(g => g.category)));

  return (
    <div className="relative">
      {/* The Orb Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 shadow-2xl shadow-indigo-600/40 hover:scale-110 transition-transform duration-300 z-20"
        >
          <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
          <Sparkles className="w-8 h-8 text-white relative z-10" />
          <span className="absolute -bottom-8 text-xs text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity font-mono">GLYPHS</span>
        </button>
      )}

      {/* Expanded Palette */}
      {isOpen && (
        <div className="bg-[#0c0c1f]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-full animate-in fade-in zoom-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-indigo-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              GLYPH MATRIX
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {categories.map(cat => (
              <div key={cat}>
                <div className="text-[10px] uppercase text-indigo-400/70 font-bold mb-2 sticky top-0 bg-[#0c0c1f] py-1">{cat}</div>
                <div className="grid grid-cols-5 gap-2">
                  {GLYPH_DICTIONARY.filter(g => g.category === cat).map(g => (
                    <button
                      key={g.symbol}
                      onClick={() => onInsert(g.symbol)}
                      className="aspect-square flex flex-col items-center justify-center bg-white/5 hover:bg-indigo-500/20 hover:border-indigo-500/50 border border-transparent rounded-xl transition-all group"
                      title={`${g.name}: ${g.meaning}`}
                    >
                      <span className="text-lg mb-0.5 group-hover:scale-110 transition-transform">{g.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlyphOrb;
