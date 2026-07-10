import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToHash from "@/components/ScrollToHash";
import AboutPage from "./pages/AboutPage";
import ProgramPage from "./pages/ProgramPage";
import PeoplePage from "./pages/PeoplePage";
import RecruitmentPage from "./pages/RecruitmentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Cinematic curtain transition between routes:
 * on exit the navy curtain descends to cover the old page,
 * on enter it lifts to reveal the new one — with a gold hairline edge.
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        {/* Curtain overlay */}
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{ backgroundColor: "hsl(var(--navy-deep))" }}
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          exit={{ y: "0%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Gold hairline on the curtain's leading edge */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.7), transparent)",
            }}
          />
        </motion.div>

        <Routes location={location}>
          <Route path="/" element={<AboutPage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/recruitment" element={<RecruitmentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
