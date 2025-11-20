import React from 'react';
import { GLYPH_DICTIONARY } from '../constants';

interface Props {
  onInsert: (glyph: string) => void;
}

const GlyphPad: React.FC<Props> = ({ onInsert }) => {
  // Group by category for UI organization
  const categories = Array.from(new Set(GLYPH_DICTIONARY.map(g => g.category)));

  return (
    <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-2">
      {categories.map(cat => (
        <div key={cat} className="space-y-1">
          <div className="text-[10px] uppercase text-zinc-500 font-bold sticky top-0 bg-[#09090b] py-1 z-10">
            {cat}
          </div>
          <div className="grid grid-cols-6 gap-1">
            {GLYPH_DICTIONARY.filter(g => g.category === cat).map(g => (
              <button
                key={g.symbol}
                onClick={() => onInsert(g.symbol)}
                className="h-8 w-8 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded text-sm transition-colors text-zinc-200"
                title={`${g.name}: ${g.meaning}`}
              >
                {g.symbol}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GlyphPad;
