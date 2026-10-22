import { useState, useEffect } from "react";
import logoIcon from "../assets/logo.png";

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
  showSkip?: boolean;
}

export default function Preloader({
  onComplete,
  minDuration = 2200,
  showSkip = true,
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "completed" | "revealing" | "done">("loading");

  // Lock body scroll while preloader is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Handle skip with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "loading") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  // Smooth loading progression
  useEffect(() => {
    if (phase !== "loading") return;

    const startTime = Date.now();
    const interval = 25; // 40fps updates

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / minDuration) * 100, 100);

      // Non-linear easing: snappy start, contemplative middle, swift finish
      let easedProgress = rawProgress;
      if (rawProgress < 40) {
        easedProgress = rawProgress * 1.1;
      } else if (rawProgress < 85) {
        easedProgress = 44 + (rawProgress - 40) * 0.95;
      } else {
        easedProgress = 86.75 + (rawProgress - 85) * 0.88;
      }

      const clamped = Math.min(Math.round(easedProgress), 100);
      setProgress(clamped);

      if (elapsed >= minDuration) {
        clearInterval(timer);
        setProgress(100);
        setPhase("completed");

        // Brief hold at 100% to savor the completed state
        setTimeout(() => {
          setPhase("revealing");

          // Allow curtain animation to conclude before unmounting
          setTimeout(() => {
            setPhase("done");
            if (onComplete) onComplete();
          }, 750);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [minDuration, onComplete, phase]);

  const handleSkip = () => {
    setProgress(100);
    setPhase("completed");
    setTimeout(() => {
      setPhase("revealing");
      setTimeout(() => {
        setPhase("done");
        if (onComplete) onComplete();
      }, 750);
    }, 150);
  };

  if (phase === "done") {
    return null;
  }

  // Dynamic legal phase descriptions based on progress
  const getStatusText = () => {
    if (progress < 25) return "Initializing Chambers Security Protocols...";
    if (progress < 50) return "Loading Appellate Records & Firm Profile...";
    if (progress < 75) return "Verifying Commercial & Maritime Mandates...";
    if (progress < 98) return "Establishing Privileged Legal Gateway...";
    return "Integrity · Diligence · Uncompromising Advocacy";
  };

  const isRevealing = phase === "revealing";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[99999] overflow-hidden select-none pointer-events-auto"
    >
      {/* ── SPLIT LUXURY CURTAINS (THEATRICAL COURTROOM REVEAL) ─────────────── */}
      {/* Top Curtain Half */}
      <div
        className={`fixed top-0 left-0 right-0 h-1/2 bg-[#001026] z-10 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isRevealing ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          borderBottom: "1px solid rgba(213, 170, 109, 0.35)",
          boxShadow: isRevealing ? "none" : "0 10px 30px rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* Bottom Curtain Half */}
      <div
        className={`fixed bottom-0 left-0 right-0 h-1/2 bg-[#001026] z-10 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isRevealing ? "translate-y-full" : "translate-y-0"
        }`}
        style={{
          borderTop: "1px solid rgba(213, 170, 109, 0.35)",
          boxShadow: isRevealing ? "none" : "0 -10px 30px rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* ── CORE STAGE CONTAINER (FADES & SCALES AS CURTAINS OPEN) ─────────── */}
      <div
        className={`relative z-20 w-full h-full flex flex-col items-center justify-center px-6 transition-all duration-500 ease-out ${
          isRevealing ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
        }`}
        style={{
          background: "radial-gradient(ellipse at center, #001f48 0%, #001229 60%, #000a17 100%)",
        }}
      >
        {/* Subtle decorative luxury court corner brackets */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#D5AA6D]/40 pointer-events-none hidden sm:block" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#D5AA6D]/40 pointer-events-none hidden sm:block" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#D5AA6D]/40 pointer-events-none hidden sm:block" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#D5AA6D]/40 pointer-events-none hidden sm:block" />

        {/* Ambient golden halo background glow */}
        <div
          className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full pointer-events-none transition-opacity duration-1000"
          style={{
            background: "radial-gradient(circle, rgba(213, 170, 109, 0.16) 0%, rgba(213, 170, 109, 0) 70%)",
            filter: "blur(40px)",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
        />

        {/* Skip button for immediate entry */}
        {showSkip && (
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-30 group flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-[#D5AA6D]/30 bg-[#001736]/70 backdrop-blur-md text-[11px] font-mono tracking-widest text-slate-300 uppercase transition-all duration-300 hover:border-[#D5AA6D] hover:text-[#D5AA6D] hover:bg-[#00204d]"
          >
            <span>Skip Intro</span>
            <span className="text-[10px] text-[#D5AA6D] opacity-70 group-hover:opacity-100">[ESC]</span>
          </button>
        )}

        {/* ── EMBLEM & INSIGNIA LOCKUP ───────────────────────────────────── */}
        <div className="relative flex flex-col items-center">
          {/* Concentric orbital rings */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center mb-6">
            {/* Outer rotating dashed ring */}
            <div
              className="absolute inset-0 rounded-full border border-dashed border-[#D5AA6D]/30"
              style={{
                animation: "spinSlow 30s linear infinite",
              }}
            />

            {/* Middle glowing steady ring */}
            <div
              className="absolute inset-2 rounded-full border border-[#D5AA6D]/50 flex items-center justify-center shadow-[0_0_30px_rgba(213,170,109,0.25)]"
              style={{
                background: "rgba(0, 24, 59, 0.85)",
              }}
            >
              {/* Inner golden seal emblem */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 p-2 flex items-center justify-center">
                <img
                  src={logoIcon}
                  alt="Stalwart Law Consult"
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(213,170,109,0.5)] transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Glowing orbital pulse dot */}
            <div
              className="absolute w-2 h-2 rounded-full bg-[#D5AA6D] shadow-[0_0_10px_#ECC88F]"
              style={{
                top: "2px",
                left: "50%",
                transform: "translateX(-50%)",
                animation: "spinSlow 8s linear infinite",
                transformOrigin: "center 68px",
              }}
            />
          </div>

          {/* Typography: Prestigious Brand Name */}
          <div className="text-center space-y-2 max-w-lg">
            <div className="inline-block">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.2em] sm:tracking-[0.28em] uppercase gold-gradient-text">
                STALWART
              </h1>
              <div className="font-serif text-lg sm:text-xl md:text-2xl font-light tracking-[0.22em] text-[#D5AA6D]/95 uppercase -mt-1">
                LAW CONSULT
              </div>
            </div>

            {/* Delicate luxury divider */}
            <div className="flex items-center justify-center gap-3 py-1">
              <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D5AA6D]/60" />
              <span className="text-[#D5AA6D] text-[10px] tracking-widest">❖</span>
              <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D5AA6D]/60" />
            </div>

            <p className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-slate-300/80">
              Advocates · Arbitrators · Solicitors
            </p>
          </div>

          {/* ── LUXURY PROGRESS GAUGE ─────────────────────────────────────── */}
          <div className="w-64 sm:w-80 md:w-96 mt-8 space-y-3">
            {/* The Hairline Golden Progress Bar */}
            <div className="relative w-full h-[3px] bg-white/10 rounded-full overflow-hidden border border-[#D5AA6D]/25 shadow-[0_0_12px_rgba(213,170,109,0.15)]">
              <div
                className="h-full gold-gradient-bg transition-all duration-150 ease-out relative"
                style={{
                  width: `${progress}%`,
                }}
              >
                {/* Glowing leading tip */}
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]"
                  style={{
                    opacity: progress > 0 ? 1 : 0,
                  }}
                />
              </div>
            </div>

            {/* Progress Metrics & Status Message */}
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-300/90 tracking-wide truncate max-w-[80%] pr-2">
                {getStatusText()}
              </span>
              <span className="text-[#D5AA6D] font-bold tabular-nums tracking-wider">
                {progress.toString().padStart(2, "0")}%
              </span>
            </div>
          </div>

          {/* Legal Jurisdictional Footnote */}
          <div className="mt-8 text-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D5AA6D]/50">
              Regulated by the Legal Practitioners Act · Federal Republic of Nigeria
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
