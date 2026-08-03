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
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-2xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

export default function WhatsAppButton({ serviceTitle, children = "اطلب الخدمة", className = "", size = "md" }: Props) {
  return (
    <a
      href={whatsappServiceLink(serviceTitle)}
      target="_blank"
      rel="noopener noreferrer"
<<<<<<< HEAD
      className={`group inline-flex items-center justify-center gap-2 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30 ${sizes[size]} ${className}`}
      style={{ backgroundColor: "#25D366" }}
    >
      <WhatsAppIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
      {children}
=======
      className={`btn-whatsapp group ${sizes[size]} ${className}`}
    >
      <WhatsAppIcon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 drop-shadow-md" />
      <span className="relative z-10 drop-shadow-sm">{children}</span>
>>>>>>> 8d678b81a064516e1273629bda4e1ed58636207e
    </a>
  );
}
