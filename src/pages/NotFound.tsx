import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-24">
      <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl gradient-primary text-white shadow-lg shadow-blue-500/20">
          <MapPin className="h-10 w-10" aria-hidden="true" />
        </div>
        <p className="mt-6 text-sm font-black uppercase tracking-[0.28em] text-blue-600">404</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">يبدو أنك ضللت الطريق!</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-8 text-slate-600 sm:text-base">
          الصفحة التي تبحث عنها غير موجودة حالياً، لكن لا تقلق. نحن خبراء في وضع الأشياء على الخريطة وإعادة العملاء إلى المسار الصحيح.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:scale-[1.02]">
            العودة للرئيسية
          </Link>
          <Link to="/services" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-7 py-3.5 font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
            استكشف خدماتنا
          </Link>
        </div>
      </div>
    </div>
  );
}
