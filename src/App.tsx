import { useEffect, lazy, Suspense } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import LoadingFallback from "@/components/LoadingFallback";

// Lazy-load client pages
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogDetail = lazy(() => import("@/pages/BlogDetail"));
const About = lazy(() => import("@/pages/About"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Lazy-load dashboard pages
const DashboardLogin = lazy(() => import("@/pages/dashboard/Login"));
const DashboardLayout = lazy(() => import("@/pages/dashboard/DashboardLayout"));
const DashboardStats = lazy(() => import("@/pages/dashboard/Stats"));
const DashboardServices = lazy(() => import("@/pages/dashboard/Services"));
const DashboardRequests = lazy(() => import("@/pages/dashboard/Requests"));
const DashboardSettings = lazy(() => import("@/pages/dashboard/Settings"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/dashboard/login" element={<DashboardLogin />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardStats />} />
            <Route path="services" element={<DashboardServices />} />
            <Route path="requests" element={<DashboardRequests />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
