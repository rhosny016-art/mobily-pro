import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Megaphone, Search, Star, Share2, Layers } from 'lucide-react';

const SERVICES_NODES = [
  { id: 'maps', label: 'خرائط جوجل', icon: MapPin, color: 'text-emerald-400', stroke: 'stroke-emerald-400/50', bg: 'bg-emerald-400/20', border: 'border-emerald-400/30', glow: 'shadow-[0_0_20px_rgba(52,211,153,0.3)]', desc: 'تصدر نتائج البحث المحلية', pos: { x: 0, y: -40 } },
  { id: 'ads', label: 'الحملات الإعلانية', icon: Megaphone, color: 'text-blue-400', stroke: 'stroke-blue-400/50', bg: 'bg-blue-400/20', border: 'border-blue-400/30', glow: 'shadow-[0_0_20px_rgba(96,165,250,0.3)]', desc: 'استهداف دقيق وعائد مرتفع', pos: { x: 38, y: -15 } },
  { id: 'seo', label: 'SEO', icon: Search, color: 'text-purple-400', stroke: 'stroke-purple-400/50', bg: 'bg-purple-400/20', border: 'border-purple-400/30', glow: 'shadow-[0_0_20px_rgba(192,132,252,0.3)]', desc: 'الظهور في النتائج الأولى', pos: { x: 25, y: 35 } },
  { id: 'reviews', label: 'إدارة التقييمات', icon: Star, color: 'text-amber-400', stroke: 'stroke-amber-400/50', bg: 'bg-amber-400/20', border: 'border-amber-400/30', glow: 'shadow-[0_0_20px_rgba(251,191,36,0.3)]', desc: 'بناء ثقة العملاء', pos: { x: -25, y: 35 } },
  { id: 'social', label: 'السوشيال ميديا', icon: Share2, color: 'text-pink-400', stroke: 'stroke-pink-400/50', bg: 'bg-pink-400/20', border: 'border-pink-400/30', glow: 'shadow-[0_0_20px_rgba(244,114,182,0.3)]', desc: 'تفاعل وبناء العلامة', pos: { x: -38, y: -15 } },
];

export default function ServicesNodeMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!activeNode) {
        setAutoRotate((prev) => (prev + 1) % SERVICES_NODES.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeNode]);

  const displayNodeIndex = activeNode 
    ? SERVICES_NODES.findIndex(n => n.id === activeNode) 
    : autoRotate;
  
  const currentService = SERVICES_NODES[displayNodeIndex];

  return (
    <div className="relative w-full aspect-square max-w-[600px] flex items-center justify-center">
      {/* Background Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80%] h-[80%] rounded-full border border-blue-500/10 border-dashed animate-[spin_40s_linear_infinite]" />
        <div className="absolute w-[50%] h-[50%] rounded-full border border-purple-500/10 border-dashed animate-[spin_30s_linear_infinite_reverse]" />
      </div>

      {/* Central SVG for Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {SERVICES_NODES.map((node, index) => {
          const isActive = displayNodeIndex === index;
          return (
            <line
              key={`line-${node.id}`}
              x1="50%"
              y1="50%"
              x2={`${50 + node.pos.x}%`}
              y2={`${50 + node.pos.y}%`}
              strokeWidth={isActive ? "2" : "1"}
              strokeDasharray={isActive ? "none" : "4 4"}
              className={`transition-all duration-500 ${isActive ? node.stroke : 'stroke-white/10'}`}
            />
          );
        })}
      </svg>

      {/* Center Hub */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)] border border-white/10 z-20 relative"
        >
          <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping opacity-20" />
        </motion.div>
        
        {/* Dynamic info box in the center below the hub */}
        <div className="absolute top-[120%] w-48 text-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentService.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl py-2 px-4 border border-white/5"
            >
              <h3 className={`font-bold text-sm ${currentService.color}`}>{currentService.label}</h3>
              <p className="text-xs text-gray-400 mt-1">{currentService.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Orbiting Nodes */}
      {SERVICES_NODES.map((node, index) => {
        const isActive = displayNodeIndex === index;
        const Icon = node.icon;
        
        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
            className="absolute z-30"
            style={{
              left: `calc(50% + ${node.pos.x}%)`,
              top: `calc(50% + ${node.pos.y}%)`,
            }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            <motion.div
              className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              animate={isActive ? { scale: 1.15 } : { scale: 1 }}
              whileHover={{ scale: 1.15 }}
            >
              {/* Pulse effect when active */}
              {isActive && (
                <motion.div 
                  layoutId="active-node-ring"
                  className={`absolute inset-0 rounded-full border-2 ${node.border} scale-150 opacity-50`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              )}
              
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${node.bg} ${node.border} border ${isActive ? node.glow : 'hover:border-white/30'}`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? node.color : 'text-gray-400 group-hover:text-white transition-colors'}`} />
              </div>

              {/* Label for desktop */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs sm:text-sm font-bold text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                  {node.label}
                </span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
