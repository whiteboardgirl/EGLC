
import { GLYPH_DICTIONARY, OPERATOR_WEIGHTS } from '../constants';
import { EGLCAST, ParseNode, ParseLink, TrustPacket } from '../types';

export const parseEGLC = (input: string): EGLCAST => {
  const nodes: ParseNode[] = [];
  const links: ParseLink[] = [];
  
  // 1. Tokenize based on common EGLC patterns
  // Matches [...] blocks, unicode operators, single emojis, or text sequences
  // This regex is a simplified heuristic for demonstration.
  const tokenRegex = /(\[.*?\]|⊚\(.*?\)|[⧉∿⇆∠∇⊕→⇥⊢⍙⍰⚛ΨΛΔφ∞]|[^\s\[\]\(\)⧉∿⇆∠∇⊕→⇥⊢⍙⍰⚛ΨΛΔφ∞]+)/g;
  const tokens = input.match(tokenRegex)?.map(t => t.trim()).filter(t => t) || [];

  let lastNodeId: string | null = null;

  tokens.forEach((token, index) => {
    const id = `node-${index}`;
    let type: ParseNode['type'] = 'glyph';
    let label = token;

    // Identify type
    if (token.startsWith('[') && token.endsWith(']')) {
      type = 'glyph'; // Core block like [IN]
    } else if (token.startsWith('⊚')) {
      type = 'anchor';
    } else if (OPERATOR_WEIGHTS[token]) {
      type = 'operator';
    } else {
      // Check dictionary for match
      const def = GLYPH_DICTIONARY.find(g => g.symbol === token);
      if (def) {
        type = def.category === 'operator' ? 'operator' : 'glyph';
      } else {
         // Fallback for text or unknown emojis
         type = 'glyph';
      }
    }

    // Add Node
    nodes.push({ id, label, type, value: token });

    // Create Link if operator connects to previous
    if (type === 'operator' && lastNodeId) {
       // This operator links previous to next (handled in next iteration conceptually, 
       // but for D3 we link: prev -> operator -> next)
       // To simplify visualizer: Logic flows linear left-to-right in this simple parser
       links.push({ source: lastNodeId, target: id, type: 'flow' });
    } else if (lastNodeId) {
       // If we have two non-operators adjacent, link them implicitly or check if previous was operator
       const prevNode = nodes[index - 1];
       if (prevNode.type === 'operator') {
          links.push({ source: prevNode.id, target: id, type: 'flow' });
       } else {
          // implicit connection
          links.push({ source: lastNodeId, target: id, type: 'standard' });
       }
    }

    lastNodeId = id;
  });

  // Generate naive translation
  const translation = tokens.map(t => {
    const def = GLYPH_DICTIONARY.find(g => g.symbol === t || (t.startsWith(g.symbol)));
    if (def) return def.meaning;
    if (t.startsWith('⊚')) return "Anchored by (" + t.slice(2, -1) + ")";
    return t;
  }).join(" ");

  return { nodes, links, raw: input, translation };
};

export const generateTrustPacket = (input: string): TrustPacket => {
  const anchors = ['ETH', 'DGN', 'IMG', 'REC'];
  const foundAnchors = anchors.filter(a => input.includes(a));
  
  // Simulate metrics based on complexity
  const complexity = input.length / 100;
  const coherence = Math.min(0.99, 0.8 + (foundAnchors.length * 0.04));
  const drift = Math.max(0.01, 0.1 - (foundAnchors.length * 0.02));
  
  // Calculate ethical density (mu)
  // Simple heuristic: weight of anchors present vs total potential anchors
  const ethicalDensity = (foundAnchors.length / 4) * 0.8 + 0.2;

  // Generate mock hash
  const mockHash = Math.random().toString(16).slice(2, 10) + Date.now().toString(16);

  return {
    timestamp: new Date().toISOString(),
    expr_version: "2.6.0",
    anchors_confirmed: foundAnchors,
    metrics: {
      drift: Number(drift.toFixed(3)),
      coherence: Number(coherence.toFixed(3)),
      ethical_density: Number(ethicalDensity.toFixed(2)),
      rent_efficiency: Number((0.6 + Math.random() * 0.2).toFixed(2)) // p value
    },
    provenance: "ECHO_HUMAN_REQUEST",
    status: foundAnchors.length >= 2 ? 'verified' : 'pending',
    hash: `sha256:${mockHash}`
  };
};