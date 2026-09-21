import { useState, useEffect } from "react";
import logoIcon from "../../assets/logo.png";
import logoFull from "../../assets/logo2.png";
import okpakoImg from "../../assets/okpako.jpg";
import tamunoImg from "../../assets/tamuno.jpg";
import menyazinoImg from "../../assets/menyazino.jpg";
import boardroomImg from "../../assets/hero_boardroom.jpg";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Practice Areas", href: "#practice" },
  { label: "Track Record", href: "#portfolio" },
  { label: "Our Counsel", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const PRACTICE_AREAS = [
  {
    id: "corporate",
    title: "Business & Corporate Law",
    tag: "Commercial & M&A",
    desc: "Pre/post incorporation services, transaction structuring, syndicated loan documentation, regulatory compliance, and cross-border capital raise advisory.",
    highlights: ["M&A Due Diligence", "Shareholder Agreements", "Statutory Compliance"],
    icon: (
      <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "litigation",
    title: "Commercial & Civil Litigation",
    tag: "Dispute Resolution",
    desc: "Aggressive advocacy across all courts of record in Nigeria and arbitration tribunals. Resolving high-stakes contract disputes, asset freezes, and debt recovery.",
    highlights: ["Appellate Practice", "Arbitration & ADR", "Injunctions & Caveats"],
    icon: (
      <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    id: "energy",
    title: "Energy & Natural Resources",
    tag: "Oil, Gas & Power",
    desc: "Deep sector experience covering NESI syndicated facilities, Liquefied Petroleum Gas (LPG), Automated Gas Oil (AGO) off-takes, and power plant privatization.",
    highlights: ["Power Plant Concessions", "Gas Sale Agreements", "Regulatory Clearances"],
    icon: (
      <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "maritime",
    title: "Admiralty & Maritime Law",
    tag: "Shipping & Ports",
    desc: "Filing caveats against vessel arrests, handling charterparties, maritime liens, salvage claims, crew labour disputes, and bill of lading contestations.",
    highlights: ["Vessel Arrest & Release", "Charterparty Disputes", "Cabotage Advisory"],
    icon: (
      <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m0-16a2 2 0 100-4 2 2 0 000 4zm0 16a8 8 0 01-8-8m8 8a8 8 0 008-8M4 12h16" />
      </svg>
    ),
  },
  {
    id: "ip",
    title: "Intellectual Property & Tech",
    tag: "Proprietary Rights",
    desc: "Securing patents, trademarks, design registrations, and software licensing. We defend proprietary innovations against industrial infringement and trade secret misappropriation.",
    highlights: ["Trademark Registry", "Tech Transfer Agreements", "Licensing & Royalty"],
    icon: (
      <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: "startups",
    title: "Emerging Ventures & Start-Ups",
    tag: "Founders & Scale-Ups",
    desc: "Strategic legal architecture for tech and early-stage founders. SAFEs, vesting mechanisms, data privacy compliance, and Series financing roadmaps.",
    highlights: ["SAFE & Convertible Notes", "Vesting Charters", "Fintech Compliance"],
    icon: (
      <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.458 14.98 14.98 0 012.759-.302z" />
      </svg>
    ),
  },
];

const TEAM = [
  {
    name: "Aghogho F. Okpako, Esq.",
    title: "Principal Partner",
    focus: "Corporate, Energy & Litigation",
    experience: "15+ Years",
    image: okpakoImg,
    bar: "Nigerian Bar Association (NBA), IBA",
    bio: "Aghogho, called to the Nigerian Bar in 2008, holds a Masters degree in International Maritime/ Commercial Law from Swansea University, United Kingdom. He has over the years developed solid skills in negotiations, risk management, government relations, transaction structuring, enterprise and start-ups. He is a result driven lawyer with commercial nouse and awesome negotiation and transactional skills. He has advised in plethora of business and commercial transactions cutting across electricity, oil and gas, agriculture, debt recovery, capital raise, etc. He has also participated as a delegate and resource person/ speaker in both local and international seminars, summits and conferences. Aghogho is a member of the Nigerian Bar Association (NBA), Nigerian Maritime Law Association (NMLA), etc.",
  },
  {
    name: "Tamuno Amiesimaka, Esq.",
    title: "Partner",
    focus: "Maritime, Admiralty & Start-Ups",
    experience: "10+ Years",
    image: tamunoImg,
    bar: "Nigerian Bar Association (NBA), MLA",
    bio: "Tamuno holds a Masters degree in International Maritime/ Commercial Law from Swansea University, United Kingdom, and has over the years developed skills in Alternative Dispute Resolution and Human Resources Management. He is also a Lecturer at the Department of Business Law, Faculty of Law at the Rivers State University. Tamuno is a member of the Nigerian Bar Association (NBA), Nigerian Maritime Law Association (NMLA), Commonwealth Association of Lawyers, and the Mediation Training Institute (Nigeria). He is also a certified Project Manager (PRINCE2(Associate) with experience in the AGILE/Scrum method of Project Management). During his stint as a Senior Assistant to the Attorney General & Justice in Rivers State (2015-2018), our Tamuno was deeply involved in all litigation, contract negotiations, and legal drafting connected to the Rivers State Government. Prior to that, Tamuno worked with the Legal Aid Council of Nigeria and contributed immensely to the Port Harcourt Prisons decongestion. He is currently pursuing a Doctorate degree in Arbitration and International Trade Law at the Rivers State University.",
  },
  {
    name: "Menyazino O. Egware, Esq.",
    title: "Senior Associate",
    focus: "Corporate Governance & Intellectual Property",
    experience: "7+ Years",
    image: menyazinoImg,
    bar: "Nigerian Bar Association (NBA)",
    bio: "Egware holds a degree in law from Delta State University Delta Nigeria, and has over the years developed skills in criminal and civil litigation, Legal Drafting and alternative dispute resolution (ADR). Egware is a member of the Nigerian Bar Association (NBA), and also an associate member of the Legal Aid Council of Nigeria Rivers State. As an Attorney, Egware has been involved in litigation, negotiations and legal drafting for the Firm. Prior to joining the firm, Egware worked with the Law Firm of Sterling Law Alliance and there after the firm of Owubokiri & Co where he worked in the capacity of Head of Chambers and contributed immensely to the Administration of the firm until he left."
  },
];

const PORTFOLIO = [
  {
    value: "NGN 220B+",
    badge: "Syndicated Energy Finance",
    label: "Electricity Distribution Facility",
    detail: "Comprehensive legal advisory and documentation for final drawdown under the Nigerian Electricity Sector Industry (NESI) syndicated credit facility.",
  },
  {
    value: "95% Equity",
    badge: "Debt & Asset Restructuring",
    label: "AMCON Resolution Solicitors",
    detail: "Mandated by the Asset Management Corporation of Nigeria (AMCON) for high-value debt recovery, structuring, and legacy loan resolution for a prime oil service firm.",
  },
  {
    value: "State Concession",
    badge: "Government & Privatization",
    label: "Olympia Hotels & Afam Power",
    detail: "Lead legal counsel on the high-level government negotiation, concession restructuring, and transaction review of prime hospitality and power generation assets.",
  },
  {
    value: "40+ Years",
    badge: "Combined Partnership",
    label: "Unbroken Record of Excellence",
    detail: "Consistently engineering pragmatic legal frameworks that solve complex commercial challenges and protect balance sheets across West Africa.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Stalwart Law Consult handled our NGN 220B+ sector facility with unparalleled technical dexterity. Their capacity to untangle convoluted regulatory clauses and protect our corporate interests is world-class.",
    author: "Engr. O. Adeleke",
    title: "Executive Director of Finance, Power Consortium",
  },
  {
    quote:
      "When our offshore vessel faced an unjust arrest notice at the port, Okpako and his maritime team obtained a caveat within 24 hours. Their speed, network, and courtroom poise saved our firm millions.",
    author: "Capt. Donald Briggs",
    title: "Managing Director, Gulf of Guinea Logistics",
  },
  {
    quote:
      "Stalwart is the standard for corporate law in the South-South region. They don't merely cite legal statutes; they understand commercial dynamics and structure contracts that make growth inevitable.",
    author: "Barr. K. Wokoma",
    title: "General Counsel, Pan-African Industrial Holdings",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePractice, setActivePractice] = useState(PRACTICE_AREAS[0].id);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Business & Corporate Law",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "Business & Corporate Law",
      message: "",
    });
  };

  return (
    <div
      className="min-h-screen selection:bg-[var(--accent)] selection:text-[var(--primary)]"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* ── LUXURY ROYAL NAVY NAVIGATION BAR ──────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 shadow-lg" : "py-4"
          }`}
        style={{
          background: "var(--primary)",
          borderBottom: "1px solid var(--accent)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo Lockup */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div
              className="w-10 h-10 rounded-sm p-1.5 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105"
              style={{
                background: "rgba(213, 170, 109, 0.15)",
                border: "1px solid var(--accent)",
              }}
            >
              <img
                src={logoIcon}
                alt="Stalwart Law Consult Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider text-white group-hover:text-[var(--accent)] transition-colors leading-tight">
                STALWART{" "}
                <span className="font-normal" style={{ color: "var(--accent)" }}>
                  LAW CONSULT
                </span>
              </span>
              <span
                className="text-[9px] font-mono tracking-widest uppercase"
                style={{ color: "var(--accent)", opacity: 0.9 }}
              >
                Barristers & Solicitors · Nigeria
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-white/90 hover:text-[var(--accent)] transition-colors py-1"
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Nav Right CTA */}
          <div className="flex items-center gap-4">
            <a
              href="https://portal.stalwartlc.com"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-300 shadow-md"
              style={{
                background: "var(--accent)",
                color: "var(--primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(213, 170, 109, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>Client Portal</span>
              <span className="text-sm font-bold">→</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-sm"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: "var(--accent)" }}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div
            className="lg:hidden px-6 pt-4 pb-6 flex flex-col gap-4 shadow-xl border-t border-white/10"
            style={{ background: "var(--primary)" }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium tracking-wide text-white hover:text-[var(--accent)] py-1.5 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://portal.stalwartlc.com"
              onClick={() => setMenuOpen(false)}
              className="mt-2 py-3 text-xs font-bold uppercase tracking-wider text-center rounded-sm"
              style={{ background: "var(--accent)", color: "var(--primary)" }}
            >
              Access Client Portal →
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO SECTION: PREVIOUS CRISP COLOR COMBINATION ───────────────────── */}
      <section
        className="relative min-h-[92vh] flex items-center pt-24 pb-20 overflow-hidden"
        style={{ background: "var(--background)" }}
      >
        {/* Split canvas background: Clean luminous left, Deep navy framed canvas right */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="w-full lg:w-7/12 h-full" style={{ background: "var(--background)" }} />
          <div
            className="hidden lg:block w-5/12 h-full relative"
            style={{ background: "var(--primary)" }}
          >
            <img
              src={boardroomImg}
              alt="Stalwart Law Consult Executive Boardroom"
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, var(--background) 0%, transparent 20%, transparent 100%)",
              }}
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-0.5 w-8" style={{ background: "var(--accent)" }} />
              <span
                className="text-xs font-mono tracking-widest uppercase font-bold"
                style={{ color: "var(--accent)" }}
              >
                Port Harcourt · Lagos · Abuja · Nigeria
              </span>
            </div>

            <h1
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 tracking-tight"
              style={{ color: "var(--primary)" }}
            >
              Resolute.
              <br />
              <em className="font-normal" style={{ color: "var(--accent)" }}>
                Principled.
              </em>
              <br />
              Relentless.
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl font-light"
              style={{ color: "var(--muted-foreground)" }}
            >
              We consistently discover practical solutions that extend beyond the law. Four decades
              of combined legal mastery across energy, maritime, corporate transactions, and
              commercial dispute resolution in Nigeria.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-7 py-4 text-xs font-bold uppercase tracking-widest rounded-sm shadow-md transition-all duration-200 flex items-center gap-2"
                style={{ background: "var(--primary)", color: "white" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--primary)";
                  e.currentTarget.style.color = "white";
                }}
              >
                <span>Schedule a Consultation</span>
                <span className="text-sm font-bold">→</span>
              </a>

              <a
                href="https://portal.stalwartlc.com"
                className="px-7 py-4 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-200 flex items-center gap-2"
                style={{
                  border: "2px solid var(--accent)",
                  color: "var(--primary)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--primary)";
                }}
              >
                <span>Access Client Portal</span>
                <span className="text-sm">↗</span>
              </a>
            </div>

            {/* Key Metrics Bar */}
            <div
              className="grid grid-cols-3 gap-6 mt-14 pt-8"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div>
                <div
                  className="font-serif text-3xl sm:text-4xl font-bold mb-1"
                  style={{ color: "var(--primary)" }}
                >
                  40<span style={{ color: "var(--accent)" }}>+</span>
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  Years Combined Experience
                </div>
              </div>
              <div>
                <div
                  className="font-serif text-3xl sm:text-4xl font-bold mb-1"
                  style={{ color: "var(--accent)" }}
                >
                  ₦500B<span style={{ color: "var(--primary)" }}>+</span>
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  Matters & Facilities Handled
                </div>
              </div>
              <div>
                <div
                  className="font-serif text-3xl sm:text-4xl font-bold mb-1"
                  style={{ color: "var(--primary)" }}
                >
                  100<span style={{ color: "var(--accent)" }}>%</span>
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  Partner Level Advocacy
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Mandates Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div
              className="p-8 rounded-sm shadow-xl text-white"
              style={{
                background: "var(--primary)",
                border: "1px solid rgba(213, 170, 109, 0.3)",
              }}
            >
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <img src={logoFull} alt="Stalwart Emblem" className="h-16 w-auto object-contain" />
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">Stalwart Law Consult</h2>
                  <p className="text-xs font-mono" style={{ color: "var(--accent)" }}>
                    Institutional Briefing
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded bg-white/5 border border-white/10 flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-1 shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  <div>
                    <span className="font-semibold text-white">AMCON Mandated Resolution:</span>
                    <p className="text-slate-300 mt-0.5">
                      Acted as Resolution Solicitors for a prime oil servicing firm's legacy debt restructuring.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded bg-white/5 border border-white/10 flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-1 shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  <div>
                    <span className="font-semibold text-white">NESI Syndicated Energy Facility:</span>
                    <p className="text-slate-300 mt-0.5">
                      Structured drawdown documentation exceeding NGN 220 Billion in national power distribution.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded bg-white/5 border border-white/10 flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-1 shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  <div>
                    <span className="font-semibold text-white">Maritime Caveat & Port Expeditions:</span>
                    <p className="text-slate-300 mt-0.5">
                      Urgent caveats and injunctive relief safeguarding vessel release across Nigerian coastal waters.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span>CONFIDENTIAL · PRIVILEGED</span>
                <span style={{ color: "var(--accent)" }}>PORT HARCOURT · NIGERIA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE FIRM ──────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-24 lg:py-32"
        style={{
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-center">
          {/* Narrative */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-0.5 w-10" style={{ background: "var(--accent)" }} />
              <span
                className="text-xs font-mono tracking-widest uppercase font-bold"
                style={{ color: "var(--accent)" }}
              >
                About the Firm
              </span>
            </div>

            <h2
              className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-6"
              style={{ color: "var(--primary)" }}
            >
              Built on principle.
              <br />
              <em className="font-normal" style={{ color: "var(--accent)" }}>
                Driven by results.
              </em>
            </h2>

            <p
              className="text-base leading-relaxed mb-6 font-light"
              style={{ color: "var(--muted-foreground)" }}
            >
              Stalwart Law Consult is a results-driven law firm in Nigeria with significant depth,
              cross-disciplinary resources, and hands-on courtroom and dealroom experience.
            </p>

            <p
              className="text-base leading-relaxed mb-8 font-light"
              style={{ color: "var(--muted-foreground)" }}
            >
              At Stalwart Law, we do not only seek to do more than solving our clients’ problems at a
              reasonable cost — we thrive to always exceed our clients’ expectations. Our innovative
              and pragmatic frameworks extend beyond the law to safeguard your enterprise and
              commercial continuity.
            </p>

            {/* Partner Quote Badge */}
            <div
              className="p-6 rounded-sm mb-6"
              style={{
                background: "var(--background)",
                borderLeft: "4px solid var(--accent)",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
              }}
            >
              <p
                className="text-sm italic font-serif leading-relaxed mb-3"
                style={{ color: "var(--primary)" }}
              >
                “Our clients face complex regulatory intersections and high commercial stakes. We commit
                our partnership intellect, rigor, and relentless advocacy to ensure they emerge victorious.”
              </p>
              <div
                className="flex items-center justify-between text-xs font-mono font-bold"
                style={{ color: "var(--accent)" }}
              >
                <span>AGHOGHO F. OKPAKO, ESQ.</span>
                <span className="text-slate-400 font-normal">PRINCIPAL PARTNER</span>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Virtual Meetings",
                desc: "Seamless consultations and dispute briefings across multiple time zones.",
                icon: "🌐",
              },
              {
                title: "Secure Cloud-Based Access",
                desc: "Encrypted documentation, process filings, and 24/7 evidentiary synchronization.",
                icon: "🔒",
              },
              {
                title: "Upfront Risk Assessment",
                desc: "We rigorously evaluate core dispute contingencies and exposure before proceeding.",
                icon: "⚖️",
              },
              {
                title: "Secure Electronic Payment",
                desc: "Trusted institutional retainer and multi-currency escrow facilitation.",
                icon: "💳",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-sm transition-all duration-300 group hover:-translate-y-1"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(213, 170, 109, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.04)";
                }}
              >
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center text-lg mb-4"
                  style={{
                    background: "rgba(213, 170, 109, 0.15)",
                    color: "var(--primary)",
                    border: "1px solid var(--accent)",
                  }}
                >
                  {pillar.icon}
                </div>
                <h3
                  className="font-serif text-base font-bold mb-2 transition-colors group-hover:text-[var(--accent)]"
                  style={{ color: "var(--primary)" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS: CLEAN IVORY WITH GOLD ACCENTS ───────────────────── */}
      <section
        id="practice"
        className="py-24 lg:py-32"
        style={{ background: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10" style={{ background: "var(--accent)" }} />
                <span
                  className="text-xs font-mono tracking-widest uppercase font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  Practice Areas
                </span>
              </div>
              <h2
                className="font-serif text-4xl sm:text-5xl font-bold"
                style={{ color: "var(--primary)" }}
              >
                Where We Excel
              </h2>
            </div>
            <p
              className="text-sm max-w-sm mt-4 md:mt-0 font-light"
              style={{ color: "var(--muted-foreground)" }}
            >
              Six focused disciplines. One uncompromising standard of institutional diligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICE_AREAS.map((pa, idx) => (
              <div
                key={pa.id}
                className="p-8 rounded-sm transition-all duration-300 relative group flex flex-col justify-between"
                style={{
                  background: "var(--card)",
                  border:
                    activePractice === pa.id
                      ? "1px solid var(--accent)"
                      : "1px solid var(--border)",
                  boxShadow:
                    activePractice === pa.id
                      ? "0 8px 25px rgba(213, 170, 109, 0.2)"
                      : "0 1px 3px rgba(0, 0, 0, 0.04)",
                }}
                onMouseEnter={() => setActivePractice(pa.id)}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-sm flex items-center justify-center shadow-sm"
                      style={{
                        background: "var(--primary)",
                        border: "1px solid var(--accent)",
                      }}
                    >
                      {pa.icon}
                    </div>
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <span
                    className="inline-block text-[10px] font-mono uppercase tracking-widest mb-2 font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    {pa.tag}
                  </span>

                  <h3
                    className="font-serif text-xl font-bold mb-3 transition-colors"
                    style={{ color: "var(--primary)" }}
                  >
                    {pa.title}
                  </h3>

                  <p
                    className="text-xs leading-relaxed mb-6 font-light"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {pa.desc}
                  </p>
                </div>

                <div>
                  <div
                    className="space-y-1.5 pt-4 mb-6"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    {pa.highlights.map((h) => (
                      <div
                        key={h}
                        className="text-[11px] flex items-center gap-2"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        <span style={{ color: "var(--accent)" }}>▪</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors"
                    style={{ color: "var(--primary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--primary)")}
                  >
                    <span>Inquire for this practice</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTABLE ENGAGEMENTS (PORTFOLIO) ─────────────────────────────────── */}
      <section
        id="portfolio"
        className="py-24 lg:py-32"
        style={{
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10" style={{ background: "var(--accent)" }} />
                <span
                  className="text-xs font-mono tracking-widest uppercase font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  Notable Engagements
                </span>
              </div>
              <h2
                className="font-serif text-4xl sm:text-5xl font-bold"
                style={{ color: "var(--primary)" }}
              >
                A Record of Consequence
              </h2>
            </div>
            <p
              className="text-sm max-w-sm mt-4 md:mt-0 font-light"
              style={{ color: "var(--muted-foreground)" }}
            >
              Measurable commercial outcomes in state privatizations, energy facilities, and asset resolutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTFOLIO.map((item) => (
              <div
                key={item.label}
                className="p-8 rounded-sm transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(213, 170, 109, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.04)";
                }}
              >
                <div>
                  <span
                    className="inline-block px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider mb-5 font-bold"
                    style={{
                      background: "rgba(213, 170, 109, 0.15)",
                      color: "var(--primary)",
                      border: "1px solid var(--accent)",
                    }}
                  >
                    {item.badge}
                  </span>

                  <div
                    className="font-serif text-3xl font-bold mb-2 transition-colors"
                    style={{ color: "var(--accent)" }}
                  >
                    {item.value}
                  </div>

                  <h3
                    className="text-sm font-bold mb-3"
                    style={{ color: "var(--primary)" }}
                  >
                    {item.label}
                  </h3>

                  <p
                    className="text-xs leading-relaxed font-light"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {item.detail}
                  </p>
                </div>

                <div
                  className="mt-8 pt-4 flex items-center justify-between text-[10px] font-mono uppercase"
                  style={{
                    borderTop: "1px solid var(--border)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  <span>CONFIDENTIAL</span>
                  <span style={{ color: "var(--accent)" }} className="font-bold">
                    VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE TEAM (LEADERSHIP & COUNSEL) ─────────────────────────────────── */}
      <section
        id="team"
        className="py-24 lg:py-32"
        style={{ background: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10" style={{ background: "var(--accent)" }} />
                <span
                  className="text-xs font-mono tracking-widest uppercase font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  Our Team
                </span>
              </div>
              <h2
                className="font-serif text-4xl sm:text-5xl font-bold"
                style={{ color: "var(--primary)" }}
              >
                The Counsel You Deserve
              </h2>
            </div>
            <p
              className="text-sm max-w-sm mt-4 md:mt-0 font-light"
              style={{ color: "var(--muted-foreground)" }}
            >
              Direct partner involvement in every engagement. Experienced barristers admitted to the Supreme Court of Nigeria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="rounded-sm overflow-hidden transition-all duration-300 flex flex-col group hover:-translate-y-1"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 29, 66, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
                }}
              >
                {/* Photo with Accent Tag */}
                <div className="relative h-80 overflow-hidden" style={{ background: "var(--secondary)" }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/70 via-transparent to-transparent" />

                  {/* Experience Badge */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-sm text-[11px] font-mono font-bold shadow-md"
                    style={{
                      background: "var(--primary)",
                      color: "var(--accent)",
                      border: "1px solid var(--accent)",
                    }}
                  >
                    {member.experience}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-serif text-xl font-bold mb-1"
                      style={{ color: "var(--primary)" }}
                    >
                      {member.name}
                    </h3>
                    <div
                      className="text-xs font-mono font-bold uppercase tracking-wider mb-3"
                      style={{ color: "var(--accent)" }}
                    >
                      {member.title}
                    </div>

                    <div
                      className="inline-block text-[11px] font-medium px-2.5 py-1 rounded-sm mb-4"
                      style={{
                        background: "var(--secondary)",
                        color: "var(--secondary-foreground)",
                      }}
                    >
                      {member.focus}
                    </div>

                    <p
                      className="text-xs leading-relaxed font-light mb-6"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {member.bio}
                    </p>
                  </div>

                  <div
                    className="pt-4 flex items-center justify-between text-[11px]"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <span className="font-mono" style={{ color: "var(--muted-foreground)" }}>
                      {member.bar}
                    </span>
                    <a
                      href="#contact"
                      className="font-bold hover:underline"
                      style={{ color: "var(--primary)" }}
                    >
                      Consult →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT ENDORSEMENTS ─────────────────────────────────────────────── */}
      <section
        id="testimonials"
        className="py-24 lg:py-32"
        style={{
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-0.5 w-8" style={{ background: "var(--accent)" }} />
              <span
                className="text-xs font-mono tracking-widest uppercase font-bold"
                style={{ color: "var(--accent)" }}
              >
                Client Testimonials
              </span>
              <div className="h-0.5 w-8" style={{ background: "var(--accent)" }} />
            </div>
            <h2
              className="font-serif text-3xl sm:text-4xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-sm flex flex-col justify-between"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div
                  className="text-4xl font-serif mb-4 leading-none"
                  style={{ color: "var(--accent)" }}
                >
                  “
                </div>
                <p
                  className="text-sm leading-relaxed font-light italic mb-6"
                  style={{ color: "var(--primary)" }}
                >
                  {t.quote}
                </p>
                <div
                  className="pt-4"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div className="font-serif text-sm font-bold" style={{ color: "var(--primary)" }}>
                    {t.author}
                  </div>
                  <div
                    className="text-xs font-mono mt-0.5"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {t.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT & CONSULTATION SECTION ──────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 lg:py-32"
        style={{ background: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-10" style={{ background: "var(--accent)" }} />
                <span
                  className="text-xs font-mono tracking-widest uppercase font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  Contact
                </span>
              </div>

              <h2
                className="font-serif text-4xl sm:text-5xl font-bold mb-6"
                style={{ color: "var(--primary)" }}
              >
                Begin Your Consultation
              </h2>

              <p
                className="text-base leading-relaxed mb-10 font-light"
                style={{ color: "var(--muted-foreground)" }}
              >
                We respond to all inquiries within one business day. Virtual meetings available
                across all international time zones.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 shadow-sm"
                    style={{
                      background: "var(--primary)",
                      color: "var(--accent)",
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div
                      className="text-xs font-mono uppercase tracking-wider font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      Phone
                    </div>
                    <div className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                      +234 (0)907 588 9362
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 shadow-sm"
                    style={{
                      background: "var(--primary)",
                      color: "var(--accent)",
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div
                      className="text-xs font-mono uppercase tracking-wider font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      Email
                    </div>
                    <div className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                      info@stalwartlc.com
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 shadow-sm"
                    style={{
                      background: "var(--primary)",
                      color: "var(--accent)",
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div
                      className="text-xs font-mono uppercase tracking-wider font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      Location
                    </div>
                    <div className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                      Port Harcourt, Rivers State, Nigeria
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-6 rounded-sm mt-8"
              style={{
                background: "var(--secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="text-xs font-mono uppercase tracking-widest mb-1 font-bold"
                style={{ color: "var(--primary)" }}
              >
                Hours of Chamber Sitting
              </div>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Monday – Friday: 8:00 AM - 5:00 PM (WAT)<br />
                Emergency Admiralty / Caveat Line Available 24/7
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Form with Navy & Gold Styling */}
          <div className="lg:col-span-7">
            <div
              className="p-8 sm:p-10 rounded-sm shadow-xl"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              {submitted && (
                <div
                  className="p-4 mb-6 rounded-sm text-xs leading-relaxed flex items-center gap-3"
                  style={{
                    background: "rgba(213, 170, 109, 0.15)",
                    border: "1px solid var(--accent)",
                    color: "var(--primary)",
                  }}
                >
                  <span className="text-base font-bold">✓</span>
                  <span>
                    Thank you. We will be in touch within one business day.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-xs font-mono uppercase tracking-wider mb-2"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Adeleke"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-sm outline-none transition-colors"
                      style={{
                        background: "var(--secondary)",
                        border: "1px solid var(--border)",
                        color: "var(--foreground)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-mono uppercase tracking-wider mb-2"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="adeleke@energycorp.ng"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-sm outline-none transition-colors"
                      style={{
                        background: "var(--secondary)",
                        border: "1px solid var(--border)",
                        color: "var(--foreground)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-xs font-mono uppercase tracking-wider mb-2"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Direct Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 (0)800 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-sm outline-none transition-colors"
                      style={{
                        background: "var(--secondary)",
                        border: "1px solid var(--border)",
                        color: "var(--foreground)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-mono uppercase tracking-wider mb-2"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Subject / Practice Area
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-sm outline-none transition-colors"
                      style={{
                        background: "var(--secondary)",
                        border: "1px solid var(--border)",
                        color: "var(--foreground)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    >
                      {PRACTICE_AREAS.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                      <option value="General Legal Retainer">General Legal Retainer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-mono uppercase tracking-wider mb-2"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Briefly describe your commercial matter, dispute background, or transaction timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-sm outline-none transition-colors resize-none"
                    style={{
                      background: "var(--secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 shadow-md"
                  style={{
                    background: "var(--primary)",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent)";
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--primary)";
                    e.currentTarget.style.color = "white";
                  }}
                >
                  Send Enquiry →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER: PREVIOUS ROYAL NAVY WITH ACCENTS ────────────────────────── */}
      <footer
        className="pt-16 pb-12 text-xs"
        style={{
          background: "var(--primary)",
          color: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoIcon} alt="Stalwart Logo" className="w-8 h-8 object-contain" />
              <span className="font-serif text-base font-bold text-white">
                STALWART{" "}
                <span style={{ color: "var(--accent)" }}>LAW CONSULT</span>
              </span>
            </div>
            <p className="leading-relaxed mb-4 text-xs font-light text-slate-300">
              Barristers, Solicitors & Commercial Legal Consultants admitted to practice throughout the Federation of Nigeria.
            </p>
            <div
              className="text-[11px] font-mono font-bold"
              style={{ color: "var(--accent)" }}
            >
              PORT HARCOURT · RIVERS STATE · NIGERIA
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div
              className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              Quick Navigation
            </div>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-slate-300 hover:text-[var(--accent)] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Practices */}
          <div>
            <div
              className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              Key Practice Areas
            </div>
            <ul className="space-y-2.5 text-slate-300">
              <li>Corporate & Commercial M&A</li>
              <li>Civil & Commercial Litigation</li>
              <li>Energy, Oil & Gas Transactions</li>
              <li>Admiralty & Vessel Caveats</li>
              <li>Intellectual Property Law</li>
              <li>Emerging Start-Up Structuring</li>
            </ul>
          </div>

          {/* Col 4: Secure Portal */}
          <div>
            <div
              className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              Clients & Portals
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed font-light">
              Clients can view active matters, inspect filed court processes, and securely transmit documentary evidence.
            </p>
            <a
              href="https://portal.stalwartlc.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              style={{
                background: "var(--accent)",
                color: "var(--primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span>Access Client Portal</span>
              <span>→</span>
            </a>
          </div>
        </div>

        <div
          className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          <div>
            © {new Date().getFullYear()} Stalwart Law Consult. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span>Privileged & Confidential</span>
            <span>Regulated by the Legal Practitioners Act</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
