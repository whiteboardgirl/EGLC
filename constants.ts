
import { EGLCGlyph } from './types';

export const EGLC_VERSION = "2.6.0 (Hydra/Quantum)";

export const GLYPH_DICTIONARY: EGLCGlyph[] = [
  // Structural
  { symbol: "[IN]", name: "Internal", meaning: "Internal source, introspection, memory", category: "core" },
  { symbol: "[EX]", name: "External", meaning: "External source, environment, input", category: "core" },
  { symbol: "[MO]", name: "Mood", meaning: "Mood, energy, affective field", category: "core" },
  { symbol: "Ψ", name: "Psi", meaning: "Cognitive field, state function, expression wrapper", category: "core" },
  
  // EGLC-1 Operators
  { symbol: "⧉", name: "Fusion", meaning: "Integration, embedding, deep synthesis", category: "operator" },
  { symbol: "∿", name: "Resonance", meaning: "Harmonic alignment, attention focus", category: "operator" },
  { symbol: "⇆", name: "Reciprocity", meaning: "Feedback loop, mutual exchange, balance", category: "operator" },
  { symbol: "∠", name: "Alignment", meaning: "Compatibility, structural fit", category: "operator" },
  { symbol: "∇", name: "Integration", meaning: "Fuse modules, combine", category: "operator" },
  { symbol: "→", name: "Evolve", meaning: "Transformation, output direction", category: "operator" },
  { symbol: "⇥", name: "Transition", meaning: "Move from plan to field", category: "operator" },
  { symbol: "⊢", name: "Conditional", meaning: "If-Then logic, implication", category: "operator" },
  
  // EGLC-2 CoT & Meta Operators
  { symbol: "⍟", name: "Step", meaning: "Reasoning step marker (⍟1, ⍟2)", category: "flow" },
  { symbol: "⍞", name: "Agent", meaning: "Switch agent context (⍞AI, ⍞HUMAN)", category: "flow" },
  { symbol: "⍢", name: "Loop", meaning: "Recursive refinement loop", category: "flow" },
  { symbol: "⍰", name: "Query", meaning: "Request for clarification/audit", category: "meta" },
  { symbol: "⍙", name: "Recursion", meaning: "Self-similarity, nested logic", category: "meta" },
  { symbol: "⍆", name: "Back Ref", meaning: "Reference previous state", category: "meta" },
  { symbol: "🔍", name: "Audit", meaning: "Traceability, fact-check", category: "meta" },
  { symbol: "💡", name: "Insight", meaning: "Emerged understanding", category: "meta" },
  
  // EGLC-2.1 Quantum/Branching
  { symbol: "⍦", name: "Branch", meaning: "Probabilistic fork", category: "flow" },
  { symbol: "⚛", name: "Quantum", meaning: "Superposition, uncertainty", category: "meta" },
  { symbol: "✦", name: "Entangle", meaning: "Linked states, shared updates", category: "flow" },
  { symbol: "🪐", name: "Collapse", meaning: "Measurement/Decision", category: "flow" },
  { symbol: "∑", name: "Sum", meaning: "Aggregation, consensus", category: "operator" },
  
  // Anchors
  { symbol: "⊚", name: "Anchor", meaning: "Ethical binding, convergence point", category: "anchor" },
  { symbol: "⊕", name: "Assert", meaning: "Assert principle", category: "anchor" },
  { symbol: "ETH", name: "Ethics", meaning: "Fairness, safety, non-harm", category: "anchor" },
  { symbol: "DGN", name: "Dignity", meaning: "Respect, representation, human value", category: "anchor" },
  { symbol: "IMG", name: "Imagination", meaning: "Creativity, generative potential", category: "anchor" },
  { symbol: "REC", name: "Reciprocity", meaning: "Mutual benefit, cycle of exchange", category: "anchor" },
  
  // Nature/Abstract
  { symbol: "🌱", name: "Seed", meaning: "Growth, potential, origin", category: "nature" },
  { symbol: "🌳", name: "Tree", meaning: "Structure, rootedness, lineage", category: "nature" },
  { symbol: "🌊", name: "Flow", meaning: "Circulation, adaptability", category: "nature" },
  { symbol: "🔥", name: "Fire", meaning: "Transformation, passion, energy", category: "nature" },
  { symbol: "🔮", name: "Vision", meaning: "Foresight, intuition, prediction", category: "abstract" },
  { symbol: "⚖️", name: "Balance", meaning: "Justice, equilibrium", category: "abstract" },
  { symbol: "🕊", name: "Peace", meaning: "Harmony, resolution", category: "abstract" },
  { symbol: "φ", name: "Phi", meaning: "Golden ratio, aesthetic balance", category: "abstract" },
  { symbol: "∞", name: "Infinity", meaning: "Iterative cycles, unbound", category: "abstract" },
  { symbol: "Λ", name: "Lambda", meaning: "Semantic concept, meaning unit", category: "meta" },
  { symbol: "Δ", name: "Delta", meaning: "Change, context marker", category: "meta" }
];

export const OPERATOR_WEIGHTS: Record<string, number> = {
  "⧉": 0.8,
  "∿": 0.7,
  "⇆": 0.6,
  "→": 0.4,
  "⇥": 0.5,
  "⊢": 0.7,
  "⊚": 1.0,
  "⊕": 0.9,
  "⍟": 0.3,
  "⍦": 0.4,
  "✦": 0.9,
  "🪐": 1.0,
  "⍙": 0.6
};
