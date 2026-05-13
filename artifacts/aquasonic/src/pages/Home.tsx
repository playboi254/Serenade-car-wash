import { useEffect, useRef, useState, useCallback, MouseEvent } from "react";

/* ─── Constants ─────────────────────────────────────────────── */
const WA_NUMBER = "254115566775";
const CALL_NUMBER = "0769248566";
const PORTFOLIO_URL = "https://barrackwambura-ec7h.vercel.app/";
const WHATSAPP_GROUP = "https://chat.whatsapp.com/J153u1LlU1NBexFfGfiIaI";

function waLink(msg: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
const WA = {
  book:        waLink("Hello Serenade Wash, I would like to book an appointment."),
  membership:  waLink("Hello Serenade Wash, I would like to join the Freedom Pass membership."),
  ultimate:    waLink("Hello Serenade Wash, I am interested in the Ultimate Wash package (KSh 450)."),
  pro:         waLink("Hello Serenade Wash, I am interested in the Pro Wash package (KSh 300)."),
  lite:        waLink("Hello Serenade Wash, I am interested in the Lite Wash package (KSh 100)."),
  contact:     waLink("Hello Serenade Wash, I would like to inquire about your services."),
  homeService: waLink("Hello Serenade Wash, I would like to book a home car wash service at my location."),
  freedomPass: waLink("Hello Serenade Wash, I would like to join the Freedom Pass — KSh 1,300 per week."),
};

const QR_WASH = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello Serenade Wash, I would like to book an appointment."))}&bgcolor=0d2240&color=00c2e0&margin=5`;
const QR_PORTFOLIO = `https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(PORTFOLIO_URL)}&bgcolor=0d2240&color=00c2e0&margin=5`;

const JOURNEY_CARDS = [
  { tag:"For the dreamers", title:"For the Dreamers", img:"https://www.aquasoniccarwash.com/wp-content/uploads/2025/01/Electric-off-road-pick-up-truck-600x324.webp", alt:"A sleek electric pickup truck", text:"Here's to those who know that driving isn't just about getting there. It's about the memories you make along the way—the open skies, the untamed roads, and the freedom to explore." },
  { tag:"For the lovers", title:"For the Lovers", img:"https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Woman_car_window_sunset-600x400.webp", alt:"A young woman leaning out of a car window at golden hour", text:"You're not afraid of detours or the unknown. You embrace the unexpected and live for the thrill of what's around the next bend. Every mile is a mapless moment, and that's the point." },
  { tag:"For the adventurers", title:"For the Adventurers", img:"https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Middle_aged_couple_sunset-600x337.webp", alt:"A smiling couple at sunset", text:"Some see a car wash as routine. You see it as a celebration. A ritual that honors the road ahead and ensures your ride is ready for every adventure you have yet to take." },
  { tag:"For the love of the road", title:"For the Love of the Road", img:"https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Young_couple_selfie_desert-600x336.webp", alt:"A couple on a sunny road trip", text:"It's more than just a drive. It's a love affair with the journey. And for those who live for the road, every detail—every wash, every polish—is a commitment to freedom." },
];

const DIFF_CARDS = [
  { ico:"⚗️", label:"Chemistry",  title:"Next-Gen Chemistry",    desc:"Proprietary formulas for a finish that lasts far longer than traditional soaps." },
  { ico:"🤖", label:"Technology", title:"Smart Technology",       desc:"Our system delivers a precisely calibrated clean, every time." },
  { ico:"💧", label:"Water",      title:"Eco-Conscious Water Use", desc:"We reclaim and recycle over 90% of our water. Keeping your car clean shouldn't cost the planet." },
  { ico:"⚡", label:"Speed",      title:"Lightning-Fast Service",  desc:"Freedom Pass members get priority access for zero wait-time." },
  { ico:"🌍", label:"Community",  title:"Giving Back",             desc:"Every wash contributes to our community fund. We partner with local initiatives to make a difference." },
];

const AQUA_RIBBON = ["Premium Smart Wash","#fortheloveoftheroad","uthiru","nairobi","westlands","karen","lavington","kilimani","runda","gigiri","parklands","muthaiga","kileleshwa","utawala","upperhill"];
const NAVY_RIBBON = ["smart technology","smarter chemistry","ceramic protection","ultra shine","uthiru's smartest car wash","professional care","interior & exterior","freedom pass","ultima wash","mobile detailing"];

const PACKAGES = [
  { featured:true,  badge:"Most Popular", ico:"✨", label:"Ultimate Wash", name:"Ultimate Wash", sub:"Showroom Finish, Ultimate Care", price:"KSh 450",
    desc:"Complete premium wash including interior, exterior, mats, tires and rims. Full vehicle detailing twice a day.",
    features:["Interior wash","Exterior wash","Mats cleaning","Tires & rims cleaning","Full body wash","Available two times a day"], wa:WA.ultimate },
  { featured:false, badge:null,           ico:"🔵", label:"Pro Wash",      name:"Pro Wash",      sub:"Deep Clean, Lasting Protection", price:"KSh 300",
    desc:"Professional daily wash covering interior, exterior, mats, and tires once a day.",
    features:["Interior wash","Exterior wash","Mats cleaning","Tires cleaning","One wash per day"], wa:WA.pro },
  { featured:false, badge:null,           ico:"💧", label:"Lite Wash",     name:"Lite Wash",     sub:"Quick Clean, No Compromise",    price:"KSh 100",
    desc:"Affordable single-service option for customers who only need interior or exterior cleaning.",
    features:["Interior wash only OR","Exterior wash only","Single service package","Affordable quick cleaning"], wa:WA.lite },
];

const SKILLS = [
  { label:"Web Development", pct:95 },
  { label:"UI/UX Design",    pct:88 },
  { label:"Digital Solutions", pct:82 },
];

/* ─── Particles config ──────────────────────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left:  `${Math.random() * 100}%`,
  size:  `${2 + Math.random() * 4}px`,
  delay: `${Math.random() * 12}s`,
  dur:   `${8 + Math.random() * 14}s`,
  bot:   `${Math.random() * 100}%`,
}));

/* ─── Helpers ───────────────────────────────────────────────── */
function addRipple(e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
  const btn = e.currentTarget;
  const circle = document.createElement("span");
  const rect = btn.getBoundingClientRect();
  const sz = Math.max(rect.width, rect.height);
  circle.className = "btn-ripple";
  Object.assign(circle.style, {
    width: `${sz}px`, height: `${sz}px`,
    left:  `${e.clientX - rect.left  - sz / 2}px`,
    top:   `${e.clientY - rect.top   - sz / 2}px`,
  });
  btn.appendChild(circle);
  circle.addEventListener("animationend", () => circle.remove());
}

function useTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width)  * 100;
    const my = ((e.clientY - r.top)  / r.height) * 100;
    const rx = ((e.clientY - r.top)  / r.height - 0.5) * -10;
    const ry = ((e.clientX - r.left) / r.width  - 0.5) *  10;
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
    const glow = el.querySelector<HTMLElement>(".jcard-glow,.pkg-glow");
    if (glow) glow.style.opacity = "1";
  }, [ref]);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    const glow = el.querySelector<HTMLElement>(".jcard-glow,.pkg-glow");
    if (glow) glow.style.opacity = "0";
  }, [ref]);
  return { onMouseMove: onMove, onMouseLeave: onLeave };
}

function useDragCarousel(ref: React.RefObject<HTMLDivElement | null>) {
  const isDown = useRef(false); const startX = useRef(0); const scrollLeft = useRef(0);
  const onMouseDown  = useCallback((e: MouseEvent<HTMLDivElement>) => { if (!ref.current) return; isDown.current = true; startX.current = e.pageX - ref.current.offsetLeft; scrollLeft.current = ref.current.scrollLeft; }, [ref]);
  const onMouseLeave = useCallback(() => { isDown.current = false; }, []);
  const onMouseUp    = useCallback(() => { isDown.current = false; }, []);
  const onMouseMove  = useCallback((e: MouseEvent<HTMLDivElement>) => { if (!isDown.current || !ref.current) return; e.preventDefault(); ref.current.scrollLeft = scrollLeft.current - (e.pageX - ref.current.offsetLeft - startX.current) * 1.5; }, [ref]);
  return { onMouseDown, onMouseLeave, onMouseUp, onMouseMove };
}

/* ─── Wave Divider SVG ──────────────────────────────────────── */
function WaveDivider({ fromColor, toColor, flip = false }: { fromColor: string; toColor: string; flip?: boolean }) {
  return (
    <div className={`wave-divider${flip ? " wave-flip" : ""}`} style={{ background: fromColor, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ height: 70, width: "100%" }}>
        <path d="M0,40 C360,90 1080,-10 1440,40 L1440,70 L0,70 Z" fill={toColor} />
      </svg>
    </div>
  );
}

/* ─── Loading Screen ────────────────────────────────────────── */
function Loader({ done }: { done: boolean }) {
  return (
    <div className={`loader${done ? " hidden" : ""}`}>
      <div className="loader-ripple"><div className="loader-core" /></div>
      <div className="loader-logo">Serenade<span> Wash</span></div>
      <div className="loader-tagline">Uthiru's Smartest Car Wash</div>
      <div className="loader-bar"><div className="loader-bar-fill" /></div>
    </div>
  );
}

/* ─── Phone Slider ──────────────────────────────────────────── */
function PhoneSlider() {
  const [slide, setSlide] = useState(0);
  const [prev,  setPrev]  = useState<number | null>(null);
  const total = 3;
  const goTo = useCallback((idx: number) => {
    setPrev(slide); setSlide(idx);
    setTimeout(() => setPrev(null), 600);
  }, [slide]);
  useEffect(() => {
    const t = setInterval(() => goTo((slide + 1) % total), 4500);
    return () => clearInterval(t);
  }, [slide, goTo]);
  const cls = (i: number) => i === slide ? "phone-screen active" : i === prev ? "phone-screen exit" : "phone-screen";

  return (
    <>
      <div className="phone-slider">
        {/* Screen 1 */}
        <div className={cls(0)}>
          <div className="ps1-logo">Serenade<span> Wash</span></div>
          <div className="ps1-banner">
            <div className="ps1-banner-tag">Premium Smart Wash</div>
            <div className="ps1-banner-title">Uthiru's Finest Car Care</div>
          </div>
          <div className="ps1-price">From KSh 100</div>
          <div className="ps1-qr"><img src={QR_WASH} alt="Book via WhatsApp" /></div>
          <a href={WA.book} target="_blank" rel="noreferrer" className="ps1-cta">Book Now →</a>
        </div>
        {/* Screen 2 */}
        <div className={cls(1)}>
          <div className="ps2-avatar">BR</div>
          <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" className="ps2-name">Barrack Rabuku</a>
          <div className="ps2-role">Web Developer · UI/UX · Digital Solutions</div>
          <div className="ps2-skills">
            {SKILLS.map((s) => (
              <div key={s.label} className="ps2-skill">
                <span>{s.label}</span>
                <div className="ps2-skill-bar"><div className="ps2-skill-fill" style={{ width: slide === 1 ? `${s.pct}%` : "0%" }} /></div>
              </div>
            ))}
          </div>
          <div className="ps2-qr"><img src={QR_PORTFOLIO} alt="Portfolio QR" /></div>
          <div className="ps2-powered">Built by Barrack · Powered by Innovation</div>
        </div>
        {/* Screen 3 */}
        <div className={cls(2)}>
          <div className="ps3-grid" /><div className="ps3-glow" />
          <div className="ps3-badge">⚙️</div>
          <div className="ps3-brand">Tech<span> Forge</span></div>
          <div className="ps3-tag">Sponsored by Tech Forge</div>
          <div className="ps3-services">
            {["Web Dev","Branding","Automation","Systems"].map((s) => (
              <div key={s} className="ps3-svc">{s}</div>
            ))}
          </div>
          <div style={{ fontSize:".48rem",color:"rgba(255,255,255,.3)",textAlign:"center",letterSpacing:".1em",textTransform:"uppercase" }}>
            Futuristic · Premium · Innovative
          </div>
        </div>
      </div>
      <div className="phone-dots-nav">
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} className={`phone-dot-nav${slide === i ? " active" : ""}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </>
  );
}

/* ─── Tiltable Journey Card ─────────────────────────────────── */
function JCard({ card, delay }: { card: typeof JOURNEY_CARDS[0]; delay: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const tilt = useTilt(ref);
  return (
    <div ref={ref} className={`jcard rv`} style={{ transitionDelay: delay }} {...tilt}>
      <div className="jcard-glow" />
      <div className="jcard-imgwrap"><img src={card.img} alt={card.alt} loading="lazy" /></div>
      <div className="jcard-body">
        <div className="jtag">{card.tag}</div>
        <h3>{card.title}</h3>
        <p>{card.text}</p>
      </div>
    </div>
  );
}

/* ─── Tiltable Package Card ─────────────────────────────────── */
function PkgCard({ pkg }: { pkg: typeof PACKAGES[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const tilt = useTilt(ref);
  return (
    <div ref={ref} className={`pkg-card${pkg.featured ? " featured" : ""}`} {...tilt}>
      <div className="pkg-glow" />
      {pkg.badge && <div className="pkg-badge">{pkg.badge}</div>}
      <div className="pkg-ico">{pkg.ico}</div>
      <div className="pkg-label">{pkg.label}</div>
      <h3 className="pkg-name">{pkg.name}</h3>
      <div className="pkg-sub">{pkg.sub}</div>
      <div className="pkg-price">{pkg.price}</div>
      <p className="pkg-desc">{pkg.desc}</p>
      <ul className="pkg-features">{pkg.features.map((f, fi) => <li key={fi}>{f}</li>)}</ul>
      <a href={pkg.wa} target="_blank" rel="noreferrer" className="pkg-link" onClick={addRipple}>Book Now →</a>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function Home() {
  const [loaderDone,      setLoaderDone]      = useState(false);
  const [scrolled,        setScrolled]        = useState(false);
  const [scrollPct,       setScrollPct]       = useState(0);
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);
  const [showSticky,      setShowSticky]      = useState(false);
  const [jeepZoomed,      setJeepZoomed]      = useState(false);
  const jeepRef    = useRef<HTMLDivElement>(null);
  const pkgWrapRef = useRef<HTMLDivElement>(null);
  const newsWrapRef= useRef<HTMLDivElement>(null);
  const pkgDrag  = useDragCarousel(pkgWrapRef);
  const newsDrag = useDragCarousel(newsWrapRef);

  /* Loader */
  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 2400);
    return () => clearTimeout(t);
  }, []);

  /* Scroll */
  useEffect(() => {
    const onScroll = () => {
      const sy  = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(sy > 40);
      setScrollPct(max > 0 ? (sy / max) * 100 : 0);
      setShowSticky(sy > 500 && !stickyDismissed);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [stickyDismissed]);

  /* Reveal observers */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("vis");
          if (e.target === jeepRef.current) setJeepZoomed(true);
        }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv").forEach((el) => observer.observe(el));
    if (jeepRef.current) observer.observe(jeepRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Loader done={loaderDone} />

      {/* SCROLL PROGRESS */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* HEADER */}
      <header id="site-header" className={scrolled ? "scrolled" : ""}>
        <a href="#" className="hdr-logo">
          <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="20" stroke="#00c2e0" strokeWidth="1.5" />
            <path d="M7 26 Q13 14 21 21 Q29 28 35 16" stroke="#00c2e0" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M7 30 Q13 18 21 25 Q29 32 35 20" stroke="rgba(0,194,224,.35)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </svg>
          <span className="hdr-wordmark">Serenade<span> Wash</span></span>
        </a>
        <nav className="hdr-nav">
          <a href="#">Wash Packages</a>
          <a href="#">Freedom Pass</a>
          <a href="#">Locations</a>
          <a href="#">Help &amp; Support</a>
          <a href={WA.contact} target="_blank" rel="noreferrer" className="btn-login">Login</a>
        </nav>
        <button className={`burger${mobileOpen ? " open" : ""}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </header>

      {/* MOBILE MENU */}
      <div className={`mob-menu${mobileOpen ? " open" : ""}`}>
        <a href="#" onClick={() => setMobileOpen(false)}>Home</a>
        <a href="#" onClick={() => setMobileOpen(false)}>Wash Packages</a>
        <a href="#" onClick={() => setMobileOpen(false)}>Freedom Pass</a>
        <a href="#" onClick={() => setMobileOpen(false)}>Locations</a>
        <a href="#" onClick={() => setMobileOpen(false)}>Help &amp; Support</a>
        <a href={WA.book} target="_blank" rel="noreferrer" style={{ color:"var(--aqua)",marginTop:"18px" }} onClick={() => setMobileOpen(false)}>Book an Appointment →</a>
      </div>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline
          poster="https://www.aquasoniccarwash.com/wp-content/uploads/2024/12/aquasonic-sunset-roadtrip-woman-enjoying-car-journey.webp">
          <source src="https://www.aquasoniccarwash.com/wp-content/uploads/2024/11/woman_sunset_beach_1920.webm" type="video/webm" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-ambient" />

        {/* Floating particles */}
        <div className="hero-particles">
          {PARTICLES.map((p) => (
            <span key={p.id} className="hero-particle" style={{
              left: p.left, bottom: p.bot,
              width: p.size, height: p.size,
              animationDuration: p.dur, animationDelay: p.delay,
            }} />
          ))}
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Start Your Journey</p>
          <h1>Welcome to<br /><em>Serenade Wash</em></h1>
          <p className="hero-sub">
            Uthiru's Smartest Car Wash<br />
            Professional interior and exterior car care with affordable wash plans for every customer.
            We also offer home car wash services where our team comes to you.
          </p>
          <div className="hero-ctas">
            <a href={WA.membership} target="_blank" rel="noreferrer" className="btn-primary" onClick={addRipple}>Membership</a>
            <a href={WA.book}       target="_blank" rel="noreferrer" className="btn-ghost"   onClick={addRipple}>Book an Appointment</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── RIBBON ────────────────────────────────────────────── */}
      <div className="ribbon-wrap">
        <div className="rib-row rib-row-aqua">
          <div className="rib-track">
            {[...AQUA_RIBBON,...AQUA_RIBBON].map((item, i) => (
              <span key={i} className="rib-item">{item}<span className="rib-dot" /></span>
            ))}
          </div>
        </div>
        <div className="rib-row rib-row-navy">
          <div className="rib-track">
            {[...NAVY_RIBBON,...NAVY_RIBBON].map((item, i) => (
              <span key={i} className="rib-item">{item}<span className="rib-dot" /></span>
            ))}
          </div>
        </div>
      </div>

      <WaveDivider fromColor="#ffffff" toColor="#f4f7fb" />

      {/* ── JOURNEY ───────────────────────────────────────────── */}
      <section className="sec sec-gray" style={{ position:"relative",overflow:"hidden" }}>
        <div className="sec-glow" style={{ width:600,height:600,top:-200,right:-200,opacity:.5 }} />
        <div className="container">
          <div className="journey-hdr rv">
            <p className="sec-label">We Are Here For The Journey</p>
            <h2 className="sec-title">Wherever that <em>takes you.</em></h2>
            <p className="sec-sub mx-auto t-center">Here's to those who know that driving isn't just about getting there. It's about the memories you make along the way.</p>
          </div>
          <div className="jgrid">
            {JOURNEY_CARDS.map((card, i) => (
              <JCard key={i} card={card} delay={`${i * 0.1}s`} />
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#f4f7fb" toColor="#0a1628" />

      {/* ── JEEP BAND ─────────────────────────────────────────── */}
      <div className={`jeep-band${jeepZoomed ? " zoomed" : ""}`} ref={jeepRef}>
        <img src="https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Jeep_by_lake-600x336.webp" alt="An SUV parked near a lake at sunset" loading="lazy" />
        <div className="jeep-overlay">
          <div className="jeep-quote"><span>#fortheloveoftheroad</span></div>
        </div>
      </div>

      {/* ── LOCATION FINDER ───────────────────────────────────── */}
      <section className="finder">
        <div className="finder-grid-bg" />
        <div className="container">
          <p className="sec-label rv" style={{ textAlign:"center" }}>#fortheloveoftheroad</p>
          <h2 className="sec-title rv" style={{ color:"#fff",textAlign:"center",marginTop:"6px" }}>
            Find a Serenade Wash near you…<br /><em style={{ color:"var(--aqua)" }}>it's just a click away!</em>
          </h2>
          <p className="sec-sub rv mx-auto t-center" style={{ color:"rgba(255,255,255,.46)",marginTop:"0",marginBottom:"16px" }}>
            Two branches in Nairobi — Uthiru &amp; Utawala. We also come to you with our home service.
          </p>
          <div className="branches-row rv">
            <div className="branch-pill">📍 Serenade Apartments, Uthiru, Nairobi</div>
            <div className="branch-pill">📍 Utawala, Nairobi</div>
            <div className="branch-pill">🏠 Home Service Available</div>
          </div>
          <div className="finder-form rv" style={{ marginTop:"30px" }}>
            <input type="text" className="finder-input" placeholder="Enter your location or area" />
            <button className="finder-btn" onClick={() => window.open(WA.contact,"_blank")}>Search</button>
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#0a1628" toColor="#ffffff" flip />

      {/* ── WASH PACKAGES ─────────────────────────────────────── */}
      <section className="sec" style={{ position:"relative",overflow:"hidden" }}>
        <div className="sec-glow" style={{ width:500,height:500,bottom:-200,left:-100,opacity:.4 }} />
        <div className="container">
          <div className="pkg-hdr rv">
            <p className="sec-label">Our Wash Packages</p>
            <h2 className="sec-title">Industry-leading car washes in<br /><em>three smart packages</em></h2>
            <p className="drag-hint">← Drag to explore →</p>
          </div>
        </div>
        <div className="carousel-wrap" ref={pkgWrapRef} style={{ overflowX:"auto",scrollbarWidth:"none" }} {...pkgDrag}>
          <div className="carousel-track">
            {PACKAGES.map((pkg, i) => <PkgCard key={i} pkg={pkg} />)}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#ffffff" toColor="#0a1628" />

      {/* ── FREEDOM PASS ──────────────────────────────────────── */}
      <section className="sec sec-navy" style={{ position:"relative",overflow:"hidden" }}>
        <div className="sec-glow" style={{ width:700,height:700,top:-200,left:-200,opacity:.6 }} />
        <div className="container">
          <div className="fp-wrap">
            <div className="fp-text rv">
              <div className="fp-kicker">★ This isn't just a membership, it's complete freedom…</div>
              <p className="sec-label">Welcome to</p>
              <h2 className="sec-title" style={{ color:"#fff",fontSize:"clamp(2.2rem,4vw,3.3rem)" }}>Freedom Pass</h2>
              <p className="sec-sub" style={{ color:"rgba(255,255,255,.52)" }}>
                Get the Pro Wash plan for one full week at only KSh 1,300. Designed for customers who want consistent daily cleaning at an affordable price.
              </p>
              <a href={WA.freedomPass} target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop:"36px" }} onClick={addRipple}>Freedom Pass</a>
            </div>
            <div className="fp-card rv d2">
              <div className="fp-name">Freedom<span> Pass</span></div>
              <div className="fp-tagline">Uthiru's Smartest Membership</div>
              <ul className="fp-list">
                <li>Pro Wash access for 1 week</li>
                <li>Daily interior cleaning</li>
                <li>Daily exterior cleaning</li>
                <li>Mats &amp; tires included</li>
                <li>Affordable weekly package — KSh 1,300</li>
                <li>Use at any Serenade Wash location</li>
              </ul>
              <a href={WA.freedomPass} target="_blank" rel="noreferrer" className="btn-primary" onClick={addRipple}>Join Freedom Pass</a>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#0a1628" toColor="#ffffff" flip />

      {/* ── MEDIA SPLIT ───────────────────────────────────────── */}
      <div className="media-split">
        <div className="media-side parallax-img-wrap">
          <img src="https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Young_woman_selfie_party-600x338.webp" alt="Joyful Journeys Begin with Serenade Wash" loading="lazy" />
        </div>
        <div className="media-side">
          <video autoPlay muted loop playsInline poster="https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Young_woman_selfie_party-600x338.webp">
            <source src="https://www.aquasoniccarwash.com/wp-content/uploads/2024/12/dog-car-window.webm" type="video/webm" />
          </video>
        </div>
      </div>

      <WaveDivider fromColor="#ffffff" toColor="#f4f7fb" />

      {/* ── CONTACT / PHONE ───────────────────────────────────── */}
      <section className="sec sec-gray" style={{ position:"relative",overflow:"hidden" }}>
        <div className="sec-glow" style={{ width:600,height:600,top:-100,right:-200,opacity:.5 }} />
        <div className="container">
          <div className="app-inner">
            <div className="rv">
              <p className="sec-label">Get In Touch</p>
              <h2 className="sec-title">We come to <em>you.</em></h2>
              <p className="sec-sub" style={{ marginBottom:"28px" }}>
                Visit us at either of our two Nairobi branches, or book a home service and our team will come and wash your vehicle at your location.
              </p>
              <div style={{ display:"flex",flexDirection:"column",gap:"10px",marginBottom:"28px" }}>
                {[
                  { ico:"📍", label:"Branch 1:",     val:"Serenade Apartments, Uthiru, Nairobi" },
                  { ico:"📍", label:"Branch 2:",     val:"Utawala, Nairobi" },
                  { ico:"🏠", label:"Home Service:", val:"We come and wash your vehicle at your location" },
                ].map((r) => (
                  <div key={r.label} style={{ fontSize:".8rem",color:"var(--body)",display:"flex",alignItems:"flex-start",gap:"10px" }}>
                    <span style={{ color:"var(--aqua)",fontSize:"1rem",flexShrink:0 }}>{r.ico}</span>
                    <span><strong>{r.label}</strong> {r.val}</span>
                  </div>
                ))}
              </div>
              <div className="store-btns">
                <a href={`tel:${CALL_NUMBER}`} className="store-btn">
                  <span className="store-btn-ico">📞</span>
                  <div className="store-btn-txt"><small>Call us</small><strong>{CALL_NUMBER}</strong></div>
                </a>
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="store-btn">
                  <span className="store-btn-ico">💬</span>
                  <div className="store-btn-txt"><small>WhatsApp</small><strong>0115566775</strong></div>
                </a>
                <a href="mailto:bowambura123@gmail.com" className="store-btn">
                  <span className="store-btn-ico">✉️</span>
                  <div className="store-btn-txt"><small>Email us</small><strong>bowambura123@gmail.com</strong></div>
                </a>
                <a href={WA.homeService} target="_blank" rel="noreferrer" className="store-btn" style={{ borderColor:"rgba(0,194,224,.3)" }}>
                  <span className="store-btn-ico">🏠</span>
                  <div className="store-btn-txt"><small>Home Service</small><strong>Book via WhatsApp</strong></div>
                </a>
              </div>
            </div>
            <div className="phone-wrap rv d3">
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center" }}>
                <div className="phone"><PhoneSlider /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#f4f7fb" toColor="#ffffff" />

      {/* ── NEWS ──────────────────────────────────────────────── */}
      <section className="sec">
        <div className="container">
          <div className="news-hdr rv">
            <div>
              <p className="sec-label">Word on the Street</p>
              <h2 className="sec-title">Get the lowdown on our latest news, events,<br /><em>and all things Serenade Wash.</em></h2>
            </div>
            <a href={WHATSAPP_GROUP} target="_blank" rel="noreferrer" className="btn-primary" style={{ flexShrink:0,whiteSpace:"nowrap",alignSelf:"flex-end" }} onClick={addRipple}>View All News</a>
          </div>
        </div>
        <div className="carousel-wrap" ref={newsWrapRef} style={{ overflowX:"auto",scrollbarWidth:"none" }} {...newsDrag}>
          <div className="carousel-track">
            <a href={WHATSAPP_GROUP} target="_blank" rel="noreferrer" className="news-card">
              <img className="news-img" src="https://www.aquasoniccarwash.com/wp-content/uploads/2025/05/Untitled-design-21-600x338.png" alt="Join the Serenade Wash Community" loading="lazy" />
              <div className="news-body">
                <div className="news-tag">Community · WhatsApp</div>
                <h3 className="news-title">Join the Serenade Wash Community</h3>
                <p style={{ fontSize:".78rem",color:"var(--mgray)",lineHeight:"1.6",margin:"6px 0 10px" }}>
                  Get exclusive offers, wash updates, discounts, booking assistance, and connect directly with the Serenade Wash team.
                </p>
                <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:"4px",marginBottom:"14px" }}>
                  {["Exclusive offers","Priority updates","Customer support","Community discounts"].map((item) => (
                    <li key={item} style={{ fontSize:".72rem",color:"var(--aqua)",fontWeight:700,letterSpacing:".04em" }}>✦ {item}</li>
                  ))}
                </ul>
                <div className="news-wa-btn">Join WhatsApp Group →</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#ffffff" toColor="#060e1c" />

      {/* ── DIFFERENCE ────────────────────────────────────────── */}
      <section className="sec sec-dark" style={{ position:"relative",overflow:"hidden" }}>
        <div className="sec-glow" style={{ width:800,height:800,top:"50%",left:"50%",transform:"translate(-50%,-50%)",opacity:.4 }} />
        <div className="container">
          <div className="diff-hdr rv">
            <p className="sec-label">The Serenade Wash Difference</p>
            <h2 className="sec-title">Why Uthiru's most passionate<br /><em style={{ color:"var(--aqua)" }}>customers choose us.</em></h2>
            <p className="sec-sub">Five pillars that set Serenade Wash apart from every other car wash on the road.</p>
          </div>
          <div className="diff-grid">
            {DIFF_CARDS.map((card, i) => (
              <div key={i} className={`diff-card rv d${i + 1}`}>
                <span className="diff-ico">{card.ico}</span>
                <div className="diff-label">{card.label}</div>
                <div className="diff-title">{card.title}</div>
                <div className="diff-desc">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HASHTAG BAR ───────────────────────────────────────── */}
      <div className="hashtag-bar">#fortheloveoftheroad — wash it like you mean it.</div>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer>
        <div className="container">
          <div className="foot-grid">
            <div className="foot-col">
              <div className="foot-logo">Serenade<span> Wash</span></div>
              <p className="foot-tagline">Uthiru's Smartest Car Wash. Professional interior and exterior car care. Home service available. #fortheloveoftheroad</p>
              <div style={{ fontSize:".72rem",color:"rgba(255,255,255,.3)",lineHeight:"1.9",margin:"12px 0 16px" }}>
                <div>📍 Serenade Apartments, Uthiru, Nairobi</div>
                <div>📍 Utawala, Nairobi</div>
                <div>🏠 Home Service Available</div>
              </div>
              <div className="socials">
                <a href="#" className="soc">f</a><a href="#" className="soc">in</a>
                <a href="#" className="soc">X</a><a href="#" className="soc">yt</a><a href="#" className="soc">ig</a>
              </div>
              <div style={{ marginTop:"20px" }}>
                <div style={{ fontSize:".72rem",color:"rgba(255,255,255,.3)",marginBottom:"6px" }}>📞 <a href={`tel:${CALL_NUMBER}`} style={{ color:"rgba(255,255,255,.5)" }}>{CALL_NUMBER}</a></div>
                <div style={{ fontSize:".72rem",color:"rgba(255,255,255,.3)",marginBottom:"6px" }}>✉️ <a href="mailto:bowambura123@gmail.com" style={{ color:"rgba(255,255,255,.5)" }}>bowambura123@gmail.com</a></div>
                <div style={{ fontSize:".72rem",color:"rgba(255,255,255,.3)" }}>💬 <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" style={{ color:"rgba(255,255,255,.5)" }}>WhatsApp: 0115566775</a></div>
              </div>
            </div>
            <div className="foot-col">
              <h4>Car Wash</h4>
              <ul>
                <li><a href={WA.ultimate}    target="_blank" rel="noreferrer">Ultimate Wash — KSh 450</a></li>
                <li><a href={WA.pro}         target="_blank" rel="noreferrer">Pro Wash — KSh 300</a></li>
                <li><a href={WA.lite}        target="_blank" rel="noreferrer">Lite Wash — KSh 100</a></li>
                <li><a href={WA.freedomPass} target="_blank" rel="noreferrer">Freedom Pass — KSh 1,300/wk</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Services</h4>
              <ul>
                <li><a href={WA.contact}     target="_blank" rel="noreferrer">Interior Wash — KSh 100</a></li>
                <li><a href={WA.contact}     target="_blank" rel="noreferrer">Exterior Wash — KSh 100</a></li>
                <li><a href={WA.contact}     target="_blank" rel="noreferrer">Mats &amp; Tires — KSh 100</a></li>
                <li><a href={WA.homeService} target="_blank" rel="noreferrer">Home Service</a></li>
                <li><a href={WA.book}        target="_blank" rel="noreferrer">Book an Appointment</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Support</h4>
              <ul>
                <li><a href={WA.contact}    target="_blank" rel="noreferrer">Help Centre</a></li>
                <li><a href={WA.contact}    target="_blank" rel="noreferrer">FAQs</a></li>
                <li><a href="#">Locations</a></li>
                <li><a href={WHATSAPP_GROUP} target="_blank" rel="noreferrer">WhatsApp Community</a></li>
                <li><a href="#">Accessibility</a></li>
              </ul>
            </div>
          </div>

          <div className="dev-credit rv">
            <div className="dev-credit-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(PORTFOLIO_URL)}&bgcolor=0a1628&color=00c2e0&margin=8`}
                alt="Developer QR Code"
                className="dev-qr"
              />
              <div className="dev-info">
                <div className="dev-label">Designed &amp; Built by</div>
                <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" className="dev-name">Barrack Rabuku</a>
                <div className="dev-sub">Scan the QR code or click the name to view portfolio</div>
              </div>
            </div>
          </div>

          <div className="foot-bottom">
            <div className="foot-copy">© 2026 Serenade Wash. All rights reserved.</div>
            <div className="foot-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── STICKY BAR ────────────────────────────────────────── */}
      {!stickyDismissed && (
        <div className={`sticky-bar${showSticky ? " show" : ""}`}>
          <div className="sticky-bar-txt">
            <strong>Join Freedom Pass</strong> — Pro Wash for a full week at just KSh 1,300.
          </div>
          <div className="sticky-bar-actions">
            <a href={WA.freedomPass} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding:"10px 28px" }} onClick={addRipple}>Join Now</a>
            <button className="bar-dismiss" onClick={() => { setStickyDismissed(true); setShowSticky(false); }}>✕</button>
          </div>
        </div>
      )}

      {/* ── FLOATING ACTION BUTTONS ───────────────────────────── */}
      <div className="fab-group">
        <a href={`tel:${CALL_NUMBER}`} className="fab fab-call" aria-label="Call us">
          <span className="fab-tooltip">Call Us</span>📞
        </a>
        <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello Serenade Wash, I would like to inquire about your services.")}`}
          target="_blank" rel="noreferrer" className="fab fab-wa" aria-label="WhatsApp">
          <span className="fab-tooltip">WhatsApp Us</span>💬
        </a>
      </div>
    </>
  );
}
