import {
  BarChart3,
  Compass,
  Eye,
  Globe2,
  Map,
  MapPin,
  Megaphone,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "map-pin": MapPin,
  route: Route,
  star: Star,
  megaphone: Megaphone,
  sparkles: Sparkles,
  chart: BarChart3,
  target: Target,
  shield: ShieldCheck,
  users: Users,
  globe: Globe2,
  message: MessageCircle,
  eye: Eye,
  map: Map,
  compass: Compass,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = ICONS[name] ?? MapPin;
  return <Cmp className={className} aria-hidden="true" />;
}
