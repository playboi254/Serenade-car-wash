import { useEffect, useRef, useState, useCallback } from "react";

const WA_NUMBER = "254115566775";
const CALL_NUMBER = "0769248566";
const PORTFOLIO_URL = "https://barrackwambura-ec7h.vercel.app/";
const WHATSAPP_GROUP = "https://chat.whatsapp.com/J153u1LlU1NBexFfGfiIaI";

function waLink(msg: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const WA = {
  book: waLink("Hello Serenade Wash, I would like to book an appointment."),
  membership: waLink("Hello Serenade Wash, I would like to join the Freedom Pass membership."),
  ultimate: waLink("Hello Serenade Wash, I am interested in the Ultimate Wash package (KSh 450)."),
  pro: waLink("Hello Serenade Wash, I am interested in the Pro Wash package (KSh 300)."),
  lite: waLink("Hello Serenade Wash, I am interested in the Lite Wash package (KSh 100)."),
  contact: waLink("Hello Serenade Wash, I would like to inquire about your services."),
  homeService: waLink("Hello Serenade Wash, I would like to book a home car wash service at my location."),
  freedomPass: waLink("Hello Serenade Wash, I would like to join the Freedom Pass — KSh 1,300 per week."),
};

const JOURNEY_CARDS = [
  {
    tag: "For the dreamers", title: "For the Dreamers",
    img: "https://www.aquasoniccarwash.com/wp-content/uploads/2025/01/Electric-off-road-pick-up-truck-600x324.webp",
    alt: "A sleek electric pickup truck",
    text: "Here's to those who know that driving isn't just about getting there. It's about the memories you make along the way—the open skies, the untamed roads, and the freedom to explore.",
  },
  {
    tag: "For the lovers", title: "For the Lovers",
    img: "https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Woman_car_window_sunset-600x400.webp",
    alt: "A young woman leaning out of a car window at golden hour",
    text: "You're not afraid of detours or the unknown. You embrace the unexpected and live for the thrill of what's around the next bend. Every mile is a mapless moment, and that's the point.",
  },
  {
    tag: "For the adventurers", title: "For the Adventurers",
    img: "https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Middle_aged_couple_sunset-600x337.webp",
    alt: "A smiling couple at sunset",
    text: "Some see a car wash as routine. You see it as a celebration. A ritual that honors the road ahead and ensures your ride is ready for every adventure you have yet to take.",
  },
  {
    tag: "For the love of the road", title: "For the Love of the Road",
    img: "https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Young_couple_selfie_desert-600x336.webp",
    alt: "A couple on a sunny road trip",
    text: "It's more than just a drive. It's a love affair with the journey. And for those who live for the road, every detail—every wash, every polish—is a commitment to freedom.",
  },
];

const DIFF_CARDS = [
  { ico: "⚗️", label: "Chemistry", title: "Next-Gen Chemistry", desc: "Proprietary formulas for a finish that lasts far longer than traditional soaps." },
  { ico: "🤖", label: "Technology", title: "Smart Technology", desc: "Our system delivers a precisely calibrated clean, every time." },
  { ico: "💧", label: "Water", title: "Eco-Conscious Water Use", desc: "We reclaim and recycle over 90% of our water. Keeping your car clean shouldn't cost the planet." },
  { ico: "⚡", label: "Speed", title: "Lightning-Fast Service", desc: "Freedom Pass members get priority access for zero wait-time." },
  { ico: "🌍", label: "Community", title: "Giving Back", desc: "Every wash contributes to our community fund. We partner with local initiatives to make a difference." },
];

const AQUA_RIBBON = ["#fortheloveoftheroad", "uthiru", "nairobi", "westlands", "karen", "lavington", "kilimani", "runda", "gigiri", "parklands", "muthaiga", "kileleshwa", "utawala", "upperhill"];
const NAVY_RIBBON = ["smart technology", "smarter chemistry", "unbeatable shine", "uthiru's smartest car wash", "professional care", "interior & exterior", "freedom pass", "ultimate wash"];

const PACKAGES = [
  {
    featured: true, badge: "Most Popular", ico: "✨", label: "Ultimate Wash", name: "Ultimate Wash",
    sub: "Showroom Finish, Ultimate Care", price: "KSh 450",
    desc: "Complete premium wash package including interior cleaning, exterior cleaning, mats, tires, and rims. Full vehicle detailing available two times a day.",
    features: ["Interior wash", "Exterior wash", "Mats cleaning", "Tires & rims cleaning", "Full body wash", "Available two times a day"],
    wa: WA.ultimate,
  },
  {
    featured: false, badge: null, ico: "🔵", label: "Pro Wash", name: "Pro Wash",
    sub: "Deep Clean, Lasting Protection", price: "KSh 300",
    desc: "Professional daily wash package covering interior cleaning, exterior cleaning, mats, and tires once a day.",
    features: ["Interior wash", "Exterior wash", "Mats cleaning", "Tires cleaning", "One wash per day"],
    wa: WA.pro,
  },
  {
    featured: false, badge: null, ico: "💧", label: "Lite Wash", name: "Lite Wash",
    sub: "Quick Clean, No Compromise", price: "KSh 100",
    desc: "Affordable single-service wash option for customers who only need interior or exterior cleaning.",
    features: ["Interior wash only OR", "Exterior wash only", "Single service package", "Affordable quick cleaning"],
    wa: WA.lite,
  },
];

const SKILLS = [
  { label: "Web Development", pct: 95 },
  { label: "UI/UX Design", pct: 88 },
  { label: "Digital Solutions", pct: 82 },
];

const QR_WASH = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello Serenade Wash, I would like to book an appointment."))}&bgcolor=0d2240&color=00c2e0&margin=5`;
const QR_PORTFOLIO = `https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(PORTFOLIO_URL)}&bgcolor=0d2240&color=00c2e0&margin=5`;

function PhoneSlider() {
  const [slide, setSlide] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const total = 3;

  const goTo = useCallback((idx: number) => {
    setPrev(slide);
    setSlide(idx);
    setTimeout(() => setPrev(null), 600);
  }, [slide]);

  useEffect(() => {
    const t = setInterval(() => {
      goTo((slide + 1) % total);
    }, 4500);
    return () => clearInterval(t);
  }, [slide, goTo]);

  const screenClass = (i: number) => {
    if (i === slide) return "phone-screen active";
    if (i === prev) return "phone-screen exit";
    return "phone-screen";
  };

  return (
    <>
      <div className="phone-slider">
        {/* Screen 1 — Serenade Wash */}
        <div className={screenClass(0)}>
          <div className="ps1-logo">Serenade<span> Wash</span></div>
          <div className="ps1-banner">
            <div className="ps1-banner-tag">Premium Smart Wash</div>
            <div className="ps1-banner-title">Uthiru's Finest Car Care</div>
          </div>
          <div className="ps1-price">From KSh 100</div>
          <div className="ps1-qr">
            <img src={QR_WASH} alt="Book via WhatsApp" />
          </div>
          <a href={WA.book} target="_blank" rel="noreferrer" className="ps1-cta">
            Book Now →
          </a>
        </div>

        {/* Screen 2 — Developer */}
        <div className={screenClass(1)}>
          <div className="ps2-avatar">BR</div>
          <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" className="ps2-name">
            Barrack Rabuku
          </a>
          <div className="ps2-role">Web Developer · UI/UX · Digital Solutions</div>
          <div className="ps2-skills">
            {SKILLS.map((s) => (
              <div key={s.label} className="ps2-skill">
                <span>{s.label}</span>
                <div className="ps2-skill-bar">
                  <div className="ps2-skill-fill" style={{ width: slide === 1 ? `${s.pct}%` : "0%" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="ps2-qr">
            <img src={QR_PORTFOLIO} alt="Portfolio QR" />
          </div>
          <div className="ps2-powered">Built by Barrack · Powered by Innovation</div>
        </div>

        {/* Screen 3 — Tech Forge */}
        <div className={screenClass(2)}>
          <div className="ps3-grid" />
          <div className="ps3-glow" />
          <div className="ps3-badge">⚙️</div>
          <div className="ps3-brand">Tech<span> Forge</span></div>
          <div className="ps3-tag">Sponsored by Tech Forge</div>
          <div className="ps3-services">
            {["Web Dev", "Branding", "Automation", "Systems"].map((s) => (
              <div key={s} className="ps3-svc">{s}</div>
            ))}
          </div>
          <div style={{ fontSize: ".48rem", color: "rgba(255,255,255,.3)", textAlign: "center", letterSpacing: ".1em", textTransform: "uppercase" }}>
            Futuristic · Premium · Innovative
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="phone-dots-nav">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            className={`phone-dot-nav${slide === i ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

function useDragCarousel(ref: React.RefObject<HTMLDivElement | null>) {
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    isDown.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  }, [ref]);
  const onMouseLeave = useCallback(() => { isDown.current = false; }, []);
  const onMouseUp = useCallback(() => { isDown.current = false; }, []);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDown.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  }, [ref]);
  return { onMouseDown, onMouseLeave, onMouseUp, onMouseMove };
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [jeepZoomed, setJeepZoomed] = useState(false);
  const jeepRef = useRef<HTMLDivElement>(null);
  const pkgWrapRef = useRef<HTMLDivElement>(null);
  const newsWrapRef = useRef<HTMLDivElement>(null);
  const pkgDrag = useDragCarousel(pkgWrapRef);
  const newsDrag = useDragCarousel(newsWrapRef);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowSticky(window.scrollY > 500 && !stickyDismissed);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [stickyDismissed]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("vis");
          if (e.target === jeepRef.current) setJeepZoomed(true);
        }
      }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".rv").forEach((el) => observer.observe(el));
    if (jeepRef.current) observer.observe(jeepRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
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
        <a href={WA.book} target="_blank" rel="noreferrer" style={{ color: "var(--aqua)", marginTop: "18px" }} onClick={() => setMobileOpen(false)}>Book an Appointment →</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline
          poster="https://www.aquasoniccarwash.com/wp-content/uploads/2024/12/aquasonic-sunset-roadtrip-woman-enjoying-car-journey.webp">
          <source src="https://www.aquasoniccarwash.com/wp-content/uploads/2024/11/woman_sunset_beach_1920.webm" type="video/webm" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">Start Your Journey</p>
          <h1>Welcome to<br /><em>Serenade Wash</em></h1>
          <p className="hero-sub">
            Uthiru's Smartest Car Wash<br />
            Professional interior and exterior car care with affordable wash plans for every customer.
            We also offer home car wash services where our team comes to you.
          </p>
          <div className="hero-ctas">
            <a href={WA.membership} target="_blank" rel="noreferrer" className="btn-primary">Membership</a>
            <a href={WA.book} target="_blank" rel="noreferrer" className="btn-ghost">Book an Appointment</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* RIBBON */}
      <div className="ribbon-wrap">
        <div className="rib-row rib-row-aqua">
          <div className="rib-track">
            {[...AQUA_RIBBON, ...AQUA_RIBBON].map((item, i) => (
              <span key={i} className="rib-item">{item}<span className="rib-dot" /></span>
            ))}
          </div>
        </div>
        <div className="rib-row rib-row-navy">
          <div className="rib-track">
            {[...NAVY_RIBBON, ...NAVY_RIBBON].map((item, i) => (
              <span key={i} className="rib-item">{item}<span className="rib-dot" /></span>
            ))}
          </div>
        </div>
      </div>

      {/* JOURNEY */}
      <section className="sec sec-gray">
        <div className="container">
          <div className="journey-hdr rv">
            <p className="sec-label">We Are Here For The Journey</p>
            <h2 className="sec-title">Wherever that <em>takes you.</em></h2>
            <p className="sec-sub mx-auto t-center">Here's to those who know that driving isn't just about getting there. It's about the memories you make along the way.</p>
          </div>
          <div className="jgrid">
            {JOURNEY_CARDS.map((card, i) => (
              <div key={i} className={`jcard rv d${i + 1}`}>
                <div className="jcard-imgwrap"><img src={card.img} alt={card.alt} loading="lazy" /></div>
                <div className="jcard-body">
                  <div className="jtag">{card.tag}</div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JEEP BAND */}
      <div className={`jeep-band${jeepZoomed ? " zoomed" : ""}`} ref={jeepRef}>
        <img src="https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Jeep_by_lake-600x336.webp" alt="An SUV parked near a lake at sunset" loading="lazy" />
        <div className="jeep-overlay">
          <div className="jeep-quote"><span>#fortheloveoftheroad</span></div>
        </div>
      </div>

      {/* LOCATION FINDER */}
      <section className="finder">
        <div className="container">
          <p className="sec-label rv" style={{ textAlign: "center" }}>#fortheloveoftheroad</p>
          <h2 className="sec-title rv" style={{ color: "#fff", textAlign: "center", marginTop: "6px" }}>
            Find a Serenade Wash near you…<br /><em style={{ color: "var(--aqua)" }}>it's just a click away!</em>
          </h2>
          <p className="sec-sub rv mx-auto t-center" style={{ color: "rgba(255,255,255,.46)", marginTop: "0", marginBottom: "16px" }}>
            Two branches in Nairobi — Uthiru &amp; Utawala. We also come to you with our home service.
          </p>
          <div className="branches-row rv">
            <div className="branch-pill">📍 Serenade Apartments, Uthiru, Nairobi</div>
            <div className="branch-pill">📍 Utawala, Nairobi</div>
            <div className="branch-pill">🏠 Home Service Available</div>
          </div>
          <div className="finder-form rv" style={{ marginTop: "30px" }}>
            <input type="text" className="finder-input" placeholder="Enter your location or area" />
            <button className="finder-btn" onClick={() => window.open(WA.contact, "_blank")}>Search</button>
          </div>
        </div>
      </section>

      {/* WASH PACKAGES */}
      <section className="sec">
        <div className="container">
          <div className="pkg-hdr rv">
            <p className="sec-label">Our Wash Packages</p>
            <h2 className="sec-title">Industry-leading car washes in<br /><em>three smart packages</em></h2>
            <p className="drag-hint">← Drag to explore →</p>
          </div>
        </div>
        <div className="carousel-wrap" ref={pkgWrapRef} style={{ overflowX: "auto", scrollbarWidth: "none" }} {...pkgDrag}>
          <div className="carousel-track">
            {PACKAGES.map((pkg, i) => (
              <div key={i} className={`pkg-card${pkg.featured ? " featured" : ""}`}>
                {pkg.badge && <div className="pkg-badge">{pkg.badge}</div>}
                <div className="pkg-ico">{pkg.ico}</div>
                <div className="pkg-label">{pkg.label}</div>
                <h3 className="pkg-name">{pkg.name}</h3>
                <div className="pkg-sub">{pkg.sub}</div>
                <div className="pkg-price">{pkg.price}</div>
                <p className="pkg-desc">{pkg.desc}</p>
                <ul className="pkg-features">
                  {pkg.features.map((f, fi) => <li key={fi}>{f}</li>)}
                </ul>
                <a href={pkg.wa} target="_blank" rel="noreferrer" className="pkg-link">Book Now →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREEDOMPASS */}
      <section className="sec sec-navy">
        <div className="container">
          <div className="fp-wrap">
            <div className="fp-text rv">
              <div className="fp-kicker">★ This isn't just a membership, it's complete freedom…</div>
              <p className="sec-label">Welcome to</p>
              <h2 className="sec-title" style={{ color: "#fff", fontSize: "clamp(2.2rem,4vw,3.3rem)" }}>Freedom Pass</h2>
              <p className="sec-sub" style={{ color: "rgba(255,255,255,.52)" }}>
                Get the Pro Wash plan for one full week at only KSh 1,300. Designed for customers who want consistent daily cleaning at an affordable price.
              </p>
              <a href={WA.freedomPass} target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: "36px" }}>Freedom Pass</a>
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
              <a href={WA.freedomPass} target="_blank" rel="noreferrer" className="btn-primary">Join Freedom Pass</a>
            </div>
          </div>
        </div>
      </section>

      {/* MEDIA SPLIT */}
      <div className="media-split">
        <div className="media-side">
          <img src="https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Young_woman_selfie_party-600x338.webp" alt="Joyful Journeys Begin with Serenade Wash" loading="lazy" />
        </div>
        <div className="media-side">
          <video autoPlay muted loop playsInline poster="https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Young_woman_selfie_party-600x338.webp">
            <source src="https://www.aquasoniccarwash.com/wp-content/uploads/2024/12/dog-car-window.webm" type="video/webm" />
          </video>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <section className="sec sec-gray">
        <div className="container">
          <div className="app-inner">
            <div className="rv">
              <p className="sec-label">Get In Touch</p>
              <h2 className="sec-title">We come to <em>you.</em></h2>
              <p className="sec-sub" style={{ marginBottom: "28px" }}>
                Visit us at either of our two Nairobi branches, or book a home service and our team will come and wash your vehicle at your location.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {[
                  { ico: "📍", label: "Branch 1:", val: "Serenade Apartments, Uthiru, Nairobi" },
                  { ico: "📍", label: "Branch 2:", val: "Utawala, Nairobi" },
                  { ico: "🏠", label: "Home Service:", val: "We come and wash your vehicle at your location" },
                ].map((r) => (
                  <div key={r.label} style={{ fontSize: ".8rem", color: "var(--body)", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "var(--aqua)", fontSize: "1rem", flexShrink: 0 }}>{r.ico}</span>
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
                <a href={WA.homeService} target="_blank" rel="noreferrer" className="store-btn" style={{ borderColor: "rgba(0,194,224,.3)" }}>
                  <span className="store-btn-ico">🏠</span>
                  <div className="store-btn-txt"><small>Home Service</small><strong>Book via WhatsApp</strong></div>
                </a>
              </div>
            </div>

            {/* 3-SCREEN PHONE SLIDER */}
            <div className="phone-wrap rv d3">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="phone">
                  <PhoneSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS / COMMUNITY */}
      <section className="sec">
        <div className="container">
          <div className="news-hdr rv">
            <div>
              <p className="sec-label">Word on the Street</p>
              <h2 className="sec-title">Get the lowdown on our latest news, events,<br /><em>and all things Serenade Wash.</em></h2>
            </div>
            <a href={WHATSAPP_GROUP} target="_blank" rel="noreferrer" className="btn-primary" style={{ flexShrink: 0, whiteSpace: "nowrap", alignSelf: "flex-end" }}>View All News</a>
          </div>
        </div>
        <div className="carousel-wrap" ref={newsWrapRef} style={{ overflowX: "auto", scrollbarWidth: "none" }} {...newsDrag}>
          <div className="carousel-track">
            <a href={WHATSAPP_GROUP} target="_blank" rel="noreferrer" className="news-card">
              <img className="news-img" src="https://www.aquasoniccarwash.com/wp-content/uploads/2025/05/Untitled-design-21-600x338.png" alt="Join the Serenade Wash Community" loading="lazy" />
              <div className="news-body">
                <div className="news-tag">Community · WhatsApp</div>
                <h3 className="news-title">Join the Serenade Wash Community</h3>
                <p style={{ fontSize: ".78rem", color: "var(--mgray)", lineHeight: "1.6", margin: "6px 0 10px" }}>
                  Get exclusive offers, wash updates, discounts, booking assistance, and connect directly with the Serenade Wash team.
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px", marginBottom: "14px" }}>
                  {["Exclusive offers", "Priority updates", "Customer support", "Community discounts"].map((item) => (
                    <li key={item} style={{ fontSize: ".72rem", color: "var(--aqua)", fontWeight: 700, letterSpacing: ".04em" }}>✦ {item}</li>
                  ))}
                </ul>
                <div className="news-wa-btn">Join WhatsApp Group →</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section className="sec sec-dark">
        <div className="container">
          <div className="diff-hdr rv">
            <p className="sec-label">The Serenade Wash Difference</p>
            <h2 className="sec-title">Why Uthiru's most passionate<br /><em style={{ color: "var(--aqua)" }}>customers choose us.</em></h2>
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

      {/* HASHTAG BAR */}
      <div className="hashtag-bar">#fortheloveoftheroad — wash it like you mean it.</div>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="foot-grid">
            <div className="foot-col">
              <div className="foot-logo">Serenade<span> Wash</span></div>
              <p className="foot-tagline">Uthiru's Smartest Car Wash. Professional interior and exterior car care. Home service available. #fortheloveoftheroad</p>
              <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)", lineHeight: "1.9", margin: "12px 0 16px" }}>
                <div>📍 Serenade Apartments, Uthiru, Nairobi</div>
                <div>📍 Utawala, Nairobi</div>
                <div>🏠 Home Service Available</div>
              </div>
              <div className="socials">
                <a href="#" className="soc">f</a><a href="#" className="soc">in</a>
                <a href="#" className="soc">X</a><a href="#" className="soc">yt</a><a href="#" className="soc">ig</a>
              </div>
              <div style={{ marginTop: "20px" }}>
                <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)", marginBottom: "6px" }}>📞 <a href={`tel:${CALL_NUMBER}`} style={{ color: "rgba(255,255,255,.5)" }}>{CALL_NUMBER}</a></div>
                <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)", marginBottom: "6px" }}>✉️ <a href="mailto:bowambura123@gmail.com" style={{ color: "rgba(255,255,255,.5)" }}>bowambura123@gmail.com</a></div>
                <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)" }}>💬 <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,.5)" }}>WhatsApp: 0115566775</a></div>
              </div>
            </div>
            <div className="foot-col">
              <h4>Car Wash</h4>
              <ul>
                <li><a href={WA.ultimate} target="_blank" rel="noreferrer">Ultimate Wash — KSh 450</a></li>
                <li><a href={WA.pro} target="_blank" rel="noreferrer">Pro Wash — KSh 300</a></li>
                <li><a href={WA.lite} target="_blank" rel="noreferrer">Lite Wash — KSh 100</a></li>
                <li><a href={WA.freedomPass} target="_blank" rel="noreferrer">Freedom Pass — KSh 1,300/wk</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Services</h4>
              <ul>
                <li><a href={WA.contact} target="_blank" rel="noreferrer">Interior Wash — KSh 100</a></li>
                <li><a href={WA.contact} target="_blank" rel="noreferrer">Exterior Wash — KSh 100</a></li>
                <li><a href={WA.contact} target="_blank" rel="noreferrer">Mats &amp; Tires — KSh 100</a></li>
                <li><a href={WA.homeService} target="_blank" rel="noreferrer">Home Service</a></li>
                <li><a href={WA.book} target="_blank" rel="noreferrer">Book an Appointment</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Support</h4>
              <ul>
                <li><a href={WA.contact} target="_blank" rel="noreferrer">Help Centre</a></li>
                <li><a href={WA.contact} target="_blank" rel="noreferrer">FAQs</a></li>
                <li><a href="#">Locations</a></li>
                <li><a href={WHATSAPP_GROUP} target="_blank" rel="noreferrer">WhatsApp Community</a></li>
                <li><a href="#">Accessibility</a></li>
              </ul>
            </div>
          </div>

          {/* DEVELOPER CREDIT */}
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

      {/* STICKY BAR */}
      {!stickyDismissed && (
        <div className={`sticky-bar${showSticky ? " show" : ""}`}>
          <div className="sticky-bar-txt">
            <strong>Join Freedom Pass</strong> — Pro Wash for a full week at just KSh 1,300.
          </div>
          <div className="sticky-bar-actions">
            <a href={WA.freedomPass} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: "10px 28px" }}>Join Now</a>
            <button className="bar-dismiss" onClick={() => { setStickyDismissed(true); setShowSticky(false); }}>✕</button>
          </div>
        </div>
      )}

      {/* FLOATING ACTION BUTTONS */}
      <div className="fab-group">
        <a href={`tel:${CALL_NUMBER}`} className="fab fab-call" aria-label="Call us">
          <span className="fab-tooltip">Call Us</span>
          📞
        </a>
        <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello Serenade Wash, I would like to inquire about your services.")}`} target="_blank" rel="noreferrer" className="fab fab-wa" aria-label="WhatsApp">
          <span className="fab-tooltip">WhatsApp Us</span>
          💬
        </a>
      </div>
    </>
  );
}
