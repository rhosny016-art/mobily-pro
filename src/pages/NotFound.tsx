import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-24">
      {/* Brand deep-cobalt backdrop */}
      <div className="absolute inset-0 bg-[#070E22]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0066CC]/5" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/8 blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="relative w-full max-w-xl rounded-[32px] border border-slate-200/60 bg-white/95 backdrop-blur-md p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-10">
        {/* Brand map-pin icon in deep-cobalt */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#0066CC] to-[#1E40AF] text-white shadow-lg shadow-blue-500/20">
          <MapPin className="h-10 w-10" aria-hidden="true" />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-sm font-black uppercase tracking-[0.28em] text-blue-600"
        >
          404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl"
        >
          يبدو أنك ضللت الطريق
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-4 max-w-md text-sm leading-8 text-slate-500 sm:text-base"
        >
          الصفحة التي تبحث عنها غير موجودة حالياً، لكن لا تقلق. نحن خبراء في وضع الأشياء على الخريطة وإعادة العملاء إلى المسار الصحيح.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0066CC] to-[#1E40AF] px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]"
          >
            <ArrowLeft className="w-4 h-4 ml-1" aria-hidden="true" />
            العودة للرئيسية
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-7 py-3.5 font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
          >
            استكشف خدماتنا
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
