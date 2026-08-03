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
      className={`btn-whatsapp group ${sizes[size]} ${className}`}
    >
      <WhatsAppIcon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 drop-shadow-md" />
      <span className="relative z-10 drop-shadow-sm">{children}</span>
    </a>
  );
}
