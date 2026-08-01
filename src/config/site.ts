export const site = {
  name: "دلني",
  tagline: "نضع نشاطك التجاري على خريطة النجاح",
  url: "https://dalni.agency",
  phoneDisplay: "+20 100 000 0000",
  phoneHref: "tel:+201000000000",
  whatsappNumber: "201000000000",
  email: "hello@dalni.agency",
  emailHref: "mailto:hello@dalni.agency",
  cities: "القاهرة · الرياض · دبي",
  workingHours: "السبت – الخميس · 9 ص – 6 م",
  socials: {
    instagram: "https://www.instagram.com",
    linkedin: "https://www.linkedin.com",
  },
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
