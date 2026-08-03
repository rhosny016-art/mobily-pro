import { whatsappServiceLink } from "@/lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";
import type { ReactNode } from "react";

interface Props {
  serviceTitle?: string;
  children?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function WhatsAppButton({ serviceTitle, children = "اطلب الخدمة", className = "", size = "md" }: Props) {
  return (
    <a
      href={whatsappServiceLink(serviceTitle)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] ${sizes[size]} ${className}`}
      style={{ 
        background: "linear-gradient(135deg, rgba(37, 211, 102, 0.9) 0%, rgba(18, 140, 126, 0.95) 100%)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }}
    >
      {/* Glossy Reflection Effect */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl pointer-events-none" />
      
      <WhatsAppIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 drop-shadow-md relative z-10" />
      <span className="relative z-10 drop-shadow-sm">{children}</span>
    </a>
  );
}
