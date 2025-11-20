
export interface EGLCGlyph {
  symbol: string;
  name: string;
  meaning: string;
  category: 'core' | 'operator' | 'anchor' | 'flow' | 'meta' | 'nature' | 'abstract' | 'human';
}

export interface ParseNode {
  id: string;
  label: string;
  type: 'glyph' | 'operator' | 'anchor' | 'modifier' | 'unknown';
  value: string;
}

export interface ParseLink {
  source: string;
  target: string;
  label?: string;
  type: 'flow' | 'resonance' | 'fusion' | 'exchange' | 'standard';
}

export interface EGLCAST {
  nodes: ParseNode[];
  links: ParseLink[];
  raw: string;
  translation: string;
}

export interface TrustPacket {
  timestamp: string;
  expr_version: string;
  anchors_confirmed: string[];
  metrics: {
    drift: number;
    coherence: number;
    ethical_density: number; // mu
    rent_efficiency?: number; // p
  };
  provenance: string;
  federated_agents?: string[];
  status: 'verified' | 'repaired' | 'pending';
  hash?: string;
  english?: string;
  eglc?: string;
}

export type AgentId = 'GEMINI' | 'GROK' | 'DEEPSEEK' | 'QWEN' | 'OPENAI' | 'ECHO';

export interface ChatMessage {
  role: 'user' | 'model';
  agent?: AgentId;
  content: string;
  packet?: TrustPacket;
  ast?: EGLCAST;
  english?: string;
  eglc?: string;
}
