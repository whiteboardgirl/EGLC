
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { EGLCAST } from '../types';

interface Props {
  ast: EGLCAST;
  className?: string;
}

const LatticeVisualizer: React.FC<Props> = ({ ast, className }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ast.nodes.length || !svgRef.current) return;

    const container = svgRef.current.parentElement;
    if (!container) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible");

    // Gradient definition
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "link-gradient")
      .attr("gradientUnits", "userSpaceOnUse");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#818cf8");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#c084fc");

    // Data preparation
    const nodes = ast.nodes.map(n => ({ ...n }));
    const links = ast.links.map(l => ({ source: l.source, target: l.target, type: l.type }));

    // Simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(50));

    // Render Links
    const link = svg.append("g")
      .attr("stroke-opacity", 0.4)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "url(#link-gradient)")
      .attr("stroke-width", 2);

    // Render Nodes (Groups)
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(drag(simulation) as any);

    // Glow effect
    node.append("circle")
      .attr("r", 35)
      .attr("fill", (d) => {
        if (d.type === 'anchor') return "rgba(251, 191, 36, 0.1)"; 
        return "rgba(139, 92, 246, 0.1)";
      })
      .attr("filter", "blur(8px)");

    // Core Node Circle
    node.append("circle")
      .attr("r", 28)
      .attr("fill", "#0f172a")
      .attr("stroke", (d) => {
        if (d.type === 'anchor') return "#fbbf24"; // amber
        if (d.type === 'operator') return "#8b5cf6"; // violet
        return "#3b82f6"; // blue
      })
      .attr("stroke-width", 2)
      .attr("class", "transition-all duration-300 hover:scale-110 cursor-pointer");

    // Node Text
    node.append("text")
      .text(d => d.value)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "white")
      .attr("font-size", "16px")
      .attr("class", "font-mono font-bold select-none pointer-events-none");

    // Node Label
    node.append("text")
      .text(d => d.type !== 'glyph' ? d.type : '')
      .attr("text-anchor", "middle")
      .attr("dy", "2.8em")
      .attr("fill", "#94a3b8")
      .attr("font-size", "9px")
      .attr("class", "uppercase tracking-wider select-none pointer-events-none");

    // Tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

  }, [ast]);

  return (
    <div className={`w-full h-[400px] bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden relative ${className}`}>
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
        <span className="text-[10px] text-indigo-300 font-mono uppercase tracking-widest">Live Lattice</span>
      </div>
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default LatticeVisualizer;
