import { useEffect, useState, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import SectionHeading from "@/components/SectionHeading";

const GEOJSON_URL = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const CITIES = [
  { id: "riyadh", name: "الرياض", coords: [46.7167, 24.7136] as [number, number], angle: 5 },
  { id: "jeddah", name: "جدة", coords: [39.1979, 21.4858] as [number, number], angle: 30 },
  { id: "dubai", name: "دبي", coords: [55.2708, 25.2048] as [number, number], angle: -25 },
  { id: "kuwait", name: "الكويت", coords: [47.9774, 29.3759] as [number, number], angle: -50 },
  { id: "oman", name: "عمان", coords: [58.4059, 23.5859] as [number, number], angle: -75 },
  { id: "qatar", name: "قطر", coords: [51.5310, 25.2854] as [number, number], angle: -100 },
  { id: "bahrain", name: "البحرين", coords: [50.5876, 26.2235] as [number, number], angle: -125 },
  { id: "iraq", name: "العراق", coords: [44.3615, 33.3128] as [number, number], angle: -150 },
  { id: "jordan", name: "الأردن", coords: [35.9284, 31.9454] as [number, number], angle: 60 },
  { id: "lebanon", name: "لبنان", coords: [35.5018, 33.8938] as [number, number], angle: 85 },
  { id: "tunisia", name: "تونس", coords: [10.1815, 36.8065] as [number, number], angle: 120 },
  { id: "morocco", name: "المغرب", coords: [-7.5898, 33.5731] as [number, number], angle: 150 },
];

const ORIGIN: [number, number] = [31.2357, 30.0444]; // Cairo

export default function InteractiveAgencyMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [geoData, setGeoData] = useState<any>(null);
  
  useEffect(() => {
    fetch(GEOJSON_URL)
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Failed to load map data", err));
  }, []);

  const width = 800;
  const height = 800;
  const globeScale = 240;
  const labelRadius = 340;
  
  const projection = useMemo(() => {
    return d3.geoOrthographic()
      .scale(globeScale)
      .translate([width / 2, height / 2])
      .clipAngle(90);
  }, []);

  useEffect(() => {
    if (!geoData || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    let currentRotation = -42;
    projection.rotate([currentRotation, -26, 0]);
    const path = d3.geoPath().projection(projection);
    
    const defs = svg.append("defs");
    const lineGradient = defs.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");
    
    lineGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#fbbf24") 
      .attr("stop-opacity", 1);
      
    lineGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#38bdf8") 
      .attr("stop-opacity", 0.2);

    const graticule = d3.geoGraticule().step([10, 10]);
    const graticulePath = svg.append("path")
      .datum(graticule())
      .attr("class", "graticule")
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", "rgba(100, 149, 237, 0.15)")
      .style("stroke-width", "0.5px");

    const landPath = svg.append("g")
      .selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", path as any)
      .style("fill", "#0f172a") 
      .style("stroke", "rgba(148, 163, 184, 0.2)") 
      .style("stroke-width", "1px");

    // Groups for markers and lines
    const originG = svg.append("g");
    const citiesG = svg.append("g");
    
    const renderDynamicElements = () => {
      // Clear dynamic groups
      originG.selectAll("*").remove();
      citiesG.selectAll("*").remove();

      // Origin
      const originPos = projection(ORIGIN);
      if (originPos) {
        originG.append("circle")
          .attr("cx", originPos[0])
          .attr("cy", originPos[1])
          .attr("r", 20)
          .style("fill", "rgba(245, 158, 11, 0.2)") 
          .style("filter", "blur(5px)");
        
        originG.append("circle")
          .attr("cx", originPos[0])
          .attr("cy", originPos[1])
          .attr("r", 8)
          .style("fill", "#f59e0b")
          .style("stroke", "#fff")
          .style("stroke-width", "2px");
      }

      CITIES.forEach((city) => {
        const destPos = projection(city.coords);
        if (destPos) {
          // Draw path from origin to city
          const route = {
            type: "LineString",
            coordinates: [ORIGIN, city.coords]
          };
          
          citiesG.append("path")
            .datum(route)
            .attr("d", path as any)
            .style("fill", "none")
            .style("stroke", "url(#line-gradient)")
            .style("stroke-width", "2.5px")
            .style("stroke-linecap", "round")
            .style("filter", "drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))");

          // Draw pin at city
          citiesG.append("circle")
            .attr("cx", destPos[0])
            .attr("cy", destPos[1])
            .attr("r", 4)
            .style("fill", "#fbbf24")
            .style("filter", "drop-shadow(0 0 5px #fbbf24)");
            
          // Draw faint connection line to label
          const angleRad = (city.angle * Math.PI) / 180;
          const labelX = width / 2 + Math.cos(angleRad) * labelRadius;
          const labelY = height / 2 + Math.sin(angleRad) * labelRadius;

          citiesG.append("line")
            .attr("x1", destPos[0])
            .attr("y1", destPos[1])
            .attr("x2", labelX)
            .attr("y2", labelY)
            .style("stroke", "rgba(251, 191, 36, 0.3)")
            .style("stroke-width", "1px")
            .style("stroke-dasharray", "3 3");
        }
      });
    };

    renderDynamicElements();

    let animationFrame: number;
    const animate = () => {
      currentRotation += 0.05; // Slow rotate
      projection.rotate([currentRotation, -26, 0]);
      
      // Update paths
      graticulePath.attr("d", path);
      landPath.attr("d", path as any);
      
      // Re-render dynamic elements
      renderDynamicElements();
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [geoData, projection]);

  return (
    <section id="network" ref={containerRef} className="relative py-16 md:py-32 bg-[#060b1a] overflow-hidden" dir="rtl">
      <div className="relative max-w-7xl mx-auto px-2 lg:px-8 z-10 flex flex-col items-center">
        <SectionHeading
          eyebrow="الشبكة الجغرافية"
          title="نصل بخدماتنا إلى جميع أنحاء الشرق الأوسط"
          subtitle="شبكة واسعة من العلاقات والمشاريع الناجحة في مختلف الدول العربية والخليجية."
          light={true}
        />

        <div className="relative mt-8 md:mt-16 w-full flex justify-center items-center">
          <div className="relative w-full max-w-[800px] aspect-square flex justify-center items-center">
            {/* Background glowing circle for globe */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#1e293b_0%,#020617_80%)] shadow-[inset_0_0_80px_rgba(0,0,0,1)] border border-slate-800/50" 
              style={{ width: `${(globeScale * 2 / 800) * 100}%`, height: `${(globeScale * 2 / 800) * 100}%` }}
            />
            
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-900/30 shadow-[0_0_100px_rgba(30,58,138,0.2)] pointer-events-none" 
              style={{ width: `${(globeScale * 2 / 800) * 100}%`, height: `${(globeScale * 2 / 800) * 100}%` }}
            />

            <svg 
              ref={svgRef} 
              viewBox="0 0 800 800" 
              className="absolute inset-0 w-full h-full z-10 overflow-visible" 
            />

            <div className="absolute inset-0 w-full h-full z-20 pointer-events-none" style={{ transform: "scale(1)" }}>
              {/* Spread-out Labels */}
              {CITIES.map((city, i) => {
                const angleRad = (city.angle * Math.PI) / 180;
                const labelX = (800 / 2) + Math.cos(angleRad) * labelRadius;
                const labelY = (800 / 2) + Math.sin(angleRad) * labelRadius;
                
                const isLeft = labelX < 400;
                
                return (
                  <motion.div
                    key={city.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 + (i * 0.1), duration: 0.5 }}
                    className="absolute -translate-y-1/2 flex items-center gap-2"
                    style={{ 
                      left: `${(labelX / 800) * 100}%`, 
                      top: `${(labelY / 800) * 100}%`,
                      transform: `translate(${isLeft ? '-100%' : '0%'}, -50%)`,
                      paddingLeft: isLeft ? '0' : '4px',
                      paddingRight: isLeft ? '4px' : '0'
                    }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-[#0a0a0a]/90 backdrop-blur-sm border border-amber-500/30 rounded-full py-1 sm:py-1.5 px-2.5 sm:px-4 shadow-[0_0_15px_rgba(245,158,11,0.15)] pointer-events-auto hover:scale-105 hover:border-amber-500/80 transition-all cursor-default">
                      <span className="text-white text-[10px] sm:text-xs md:text-sm font-bold whitespace-nowrap">{city.name}</span>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30 hidden sm:flex">
                        <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
