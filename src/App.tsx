import { BackToTop } from "./components/BackToTop";
import { ChatBubble } from "./components/ChatBubble";
import { Contact } from "./components/Contact";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Network } from "./components/Network";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { WhyUs } from "./components/WhyUs";

export default function App() {
  return (
    <div dir="rtl" className="min-h-screen w-full overflow-x-clip bg-[#f5f8fa] font-heading text-[#102f4d]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[#0d304a] focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#f1bd55]/50"
      >
        تخطَّ إلى المحتوى الرئيسي
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <WhyUs />
        <Services />
        <Process />
        <Network />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <ChatBubble />
      <BackToTop />
    </div>
  );
}
