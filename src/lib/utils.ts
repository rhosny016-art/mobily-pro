import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Persian/Arabic digits? Keep Latin numerals for data (Space Grotesk) — Arabic UI text stays Arabic. */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}
