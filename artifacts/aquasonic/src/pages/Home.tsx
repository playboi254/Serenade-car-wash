import { useEffect, useRef, useState, useCallback } from "react";

const JOURNEY_CARDS = [
  {
    tag: "For the dreamers",
    title: "For the Dreamers",
    img: "https://www.aquasoniccarwash.com/wp-content/uploads/2025/01/Electric-off-road-pick-up-truck-600x324.webp",
    alt: "A sleek electric pickup truck with off-road tires and LED lighting",
    text: "Here's to those who know that driving isn't just about getting there. It's about the memories you make along the way—the open skies, the untamed roads, and the freedom to explore.",
  },
  {
    tag: "For the lovers",
    title: "For the Lovers",
    img: "https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Woman_car_window_sunset-600x400.webp",
    alt: "A young woman leaning out of a car window, enjoying the golden hour",
    text: "You're not afraid of detours or the unknown. You embrace the unexpected and live for the thrill of what's around the next bend. Every mile is a mapless moment, and that's the point.",
  },
  {
    tag: "For the adventurers",
    title: "For the Adventurers",
    img: "https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Middle_aged_couple_sunset-600x337.webp",
    alt: "A smiling couple wearing sunglasses, driving at sunset",
    text: "Some see a car wash as routine. You see it as a celebration. A ritual that honors the road ahead and ensures your ride is ready for every adventure you have yet to take.",
  },
  {
    tag: "For the love of the road",
    title: "For the Love of the Road",
    img: "https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Young_couple_selfie_desert-600x336.webp",
    alt: "A cheerful couple in straw hats taking a selfie during a sunny road trip",
    text: "It's more than just a drive. It's a love affair with the journey. And for those who live for the road, every detail—every wash, every polish—is a commitment to the freedom that driving brings.",
  },
];

const NEWS_CARDS = [
  {
    img: "https://www.aquasoniccarwash.com/wp-content/uploads/2025/05/Untitled-design-21-600x338.png",
    tag: "Grand Launch · Article",
    title: "Wash Like A Boss, Pay Like A Genius: The Serenade Wash FoundersClub is Now On Sale!",
    date: "15th December 2025",
  },
];

const DIFF_CARDS = [
  { ico: "⚗️", label: "Chemistry", title: "Next-Gen Chemistry", desc: "Proprietary formulas for a finish that lasts far longer than traditional soaps." },
  { ico: "🤖", label: "Technology", title: "Smart Technology", desc: "Our system delivers a precisely calibrated clean, every time." },
  { ico: "💧", label: "Water", title: "Eco-Conscious Water Use", desc: "We reclaim and recycle over 90% of our water. Keeping your car clean shouldn't cost the planet." },
  { ico: "⚡", label: "Speed", title: "Lightning-Fast Service", desc: "From entry to exit in minutes. Freedom Pass members get priority access for zero wait-time." },
  { ico: "🌍", label: "Community", title: "Giving Back", desc: "Every wash contributes to our community fund. We partner with local initiatives to make a difference." },
];

const AQUA_RIBBON = ["#fortheloveoftheroad", "uthiru", "nairobi", "westlands", "karen", "lavington", "kilimani", "runda", "gigiri", "parklands", "muthaiga", "kileleshwa", "riverside", "upperhill"];
const NAVY_RIBBON = ["smart technology", "smarter chemistry", "unbeatable shine", "uthiru's smartest car wash", "professional care", "interior & exterior", "freedom pass", "ultimate wash"];

const PACKAGES = [
  {
    featured: true,
    badge: "Most Popular",
    ico: "✨",
    label: "Ultimate Wash",
    name: "Ultimate Wash",
    sub: "Showroom Finish, Ultimate Care",
    price: "KSh 450",
    desc: "Complete premium wash package including interior cleaning, exterior cleaning, mats, tires, and rims. Full vehicle detailing available two times a day.",
    features: ["Interior wash", "Exterior wash", "Mats cleaning", "Tires & rims cleaning", "Full body wash", "Available two times a day"],
  },
  {
    featured: false,
    badge: null,
    ico: "🔵",
    label: "Pro Wash",
    name: "Pro Wash",
    sub: "Deep Clean, Lasting Protection",
    price: "KSh 300",
    desc: "Professional daily wash package covering interior cleaning, exterior cleaning, mats, and tires once a day.",
    features: ["Interior wash", "Exterior wash", "Mats cleaning", "Tires cleaning", "One wash per day"],
  },
  {
    featured: false,
    badge: null,
    ico: "💧",
    label: "Lite Wash",
    name: "Lite Wash",
    sub: "Quick Clean, No Compromise",
    price: "KSh 100",
    desc: "Affordable single-service wash option for customers who only need interior or exterior cleaning.",
    features: ["Interior wash only OR", "Exterior wash only", "Single service package", "Affordable quick cleaning"],
  },
];

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
    const walk = (x - startX.current) * 1.5;
    ref.current.scrollLeft = scrollLeft.current - walk;
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
          <div className="has-drop">
            <a href="#">Company</a>
            <div className="drop">
              <a href="#">About Serenade Wash</a>
              <a href="#">Sustainability</a>
              <a href="#">Newsroom</a>
              <a href="#">Careers</a>
              <a href="#">Giving Back</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <a href="#">Help &amp; Support</a>
          <a href="#" className="btn-login">Login</a>
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
        <a href="#" onClick={() => setMobileOpen(false)}>About Serenade Wash</a>
        <a href="#" onClick={() => setMobileOpen(false)}>Sustainability</a>
        <a href="#" onClick={() => setMobileOpen(false)}>Newsroom</a>
        <a href="#" onClick={() => setMobileOpen(false)}>Careers</a>
        <a href="#" onClick={() => setMobileOpen(false)}>Help &amp; Support</a>
        <a href="#" style={{ color: "var(--aqua)", marginTop: "18px" }} onClick={() => setMobileOpen(false)}>Login →</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://www.aquasoniccarwash.com/wp-content/uploads/2024/12/aquasonic-sunset-roadtrip-woman-enjoying-car-journey.webp"
        >
          <source src="https://www.aquasoniccarwash.com/wp-content/uploads/2024/11/woman_sunset_beach_1920.webm" type="video/webm" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">Start Your Journey</p>
          <h1>Welcome to<br /><em>Serenade Wash</em></h1>
          <p className="hero-sub">
            Uthiru's Smartest Car Wash<br />
            Professional interior and exterior car care with affordable wash plans for every customer.
          </p>
          <div className="hero-ctas">
            <a href="#" className="btn-primary">Membership</a>
            <a href="#" className="btn-ghost">Book an Appointment</a>
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
                <div className="jcard-imgwrap">
                  <img src={card.img} alt={card.alt} loading="lazy" />
                </div>
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
          <p className="sec-sub rv mx-auto t-center" style={{ color: "rgba(255,255,255,.46)", marginTop: "0", marginBottom: "44px" }}>
            Find a Serenade Wash near you…
          </p>
          <div className="finder-form rv">
            <input type="text" className="finder-input" placeholder="Enter your location or area" />
            <button className="finder-btn">Search</button>
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
        <div
          className="carousel-wrap"
          ref={pkgWrapRef}
          style={{ overflowX: "auto", scrollbarWidth: "none" }}
          {...pkgDrag}
        >
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
                  {pkg.features.map((f, fi) => (
                    <li key={fi}>{f}</li>
                  ))}
                </ul>
                <a href="#" className="pkg-link">Book Now →</a>
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
              <a href="#" className="btn-primary" style={{ marginTop: "36px" }}>Freedom Pass</a>
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
              <a href="#" className="btn-primary">Join Freedom Pass</a>
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
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Young_woman_selfie_party-600x338.webp"
          >
            <source src="https://www.aquasoniccarwash.com/wp-content/uploads/2024/12/dog-car-window.webm" type="video/webm" />
          </video>
        </div>
      </div>

      {/* APP DOWNLOAD */}
      <section className="sec sec-gray">
        <div className="container">
          <div className="app-inner">
            <div className="rv">
              <p className="sec-label">Feeling Serenade Wash</p>
              <h2 className="sec-title">Get your first wash <em>free!</em></h2>
              <p className="sec-sub" style={{ marginBottom: "32px" }}>Download our app today and get started on your journey to a cleaner, shinier ride. Available on iOS and Android.</p>
              <div className="app-badge">🎁 <span>Free wash</span> with your first app download</div>
              <div className="store-btns">
                <a href="https://apps.apple.com/us/app/aquasonic-car-wash/id6739219490" className="store-btn" target="_blank" rel="noreferrer">
                  <span className="store-btn-ico">🍎</span>
                  <div className="store-btn-txt">
                    <small>Download on the</small>
                    <strong>App Store</strong>
                  </div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.aquasoniccarwash.app" className="store-btn" target="_blank" rel="noreferrer">
                  <span className="store-btn-ico">▶</span>
                  <div className="store-btn-txt">
                    <small>Get it on</small>
                    <strong>Google Play</strong>
                  </div>
                </a>
              </div>
              <div style={{ marginTop: "28px", display: "flex", gap: "18px", flexWrap: "wrap" }}>
                <a href="tel:0115566775" className="store-btn">
                  <span className="store-btn-ico">📞</span>
                  <div className="store-btn-txt">
                    <small>Call us</small>
                    <strong>0115566775</strong>
                  </div>
                </a>
                <a href="https://wa.me/254115566775" className="store-btn" target="_blank" rel="noreferrer">
                  <span className="store-btn-ico">💬</span>
                  <div className="store-btn-txt">
                    <small>WhatsApp</small>
                    <strong>0115566775</strong>
                  </div>
                </a>
              </div>
            </div>
            <div className="phone-wrap rv d3">
              <div className="phone">
                <div className="phone-logo">Serenade<span> Wash</span></div>
                <div className="phone-sub">Uthiru's Smartest Car Wash</div>
                <div className="phone-dots"><span /><span /><span /></div>
                <div className="phone-wave" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="sec">
        <div className="container">
          <div className="news-hdr rv">
            <div>
              <p className="sec-label">Word on the Street</p>
              <h2 className="sec-title">Get the lowdown on our latest news, events,<br /><em>and all things Serenade Wash.</em></h2>
            </div>
            <a href="#" className="btn-primary" style={{ flexShrink: 0, whiteSpace: "nowrap", alignSelf: "flex-end" }}>View All News</a>
          </div>
        </div>
        <div
          className="carousel-wrap"
          ref={newsWrapRef}
          style={{ overflowX: "auto", scrollbarWidth: "none" }}
          {...newsDrag}
        >
          <div className="carousel-track">
            {NEWS_CARDS.map((card, i) => (
              <a key={i} href="#" className="news-card">
                <img className="news-img" src={card.img} alt={card.title} loading="lazy" />
                <div className="news-body">
                  <div className="news-tag">{card.tag}</div>
                  <h3 className="news-title">{card.title}</h3>
                  <div className="news-date">{card.date}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* THE DIFFERENCE */}
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
      <div className="hashtag-bar">
        #fortheloveoftheroad — wash it like you mean it.
      </div>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="foot-grid">
            <div className="foot-col">
              <div className="foot-logo">Serenade<span> Wash</span></div>
              <p className="foot-tagline">Uthiru's Smartest Car Wash. Professional interior and exterior car care with affordable plans for every customer. #fortheloveoftheroad</p>
              <div className="socials">
                <a href="#" className="soc">f</a>
                <a href="#" className="soc">in</a>
                <a href="#" className="soc">X</a>
                <a href="#" className="soc">yt</a>
                <a href="#" className="soc">ig</a>
              </div>
              <div style={{ marginTop: "20px" }}>
                <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)", marginBottom: "6px" }}>📞 <a href="tel:0115566775" style={{ color: "rgba(255,255,255,.5)" }}>0115566775</a></div>
                <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)", marginBottom: "6px" }}>✉️ <a href="mailto:bowambura123@gmail.com" style={{ color: "rgba(255,255,255,.5)" }}>bowambura123@gmail.com</a></div>
                <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.3)" }}>💬 <a href="https://wa.me/254115566775" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,.5)" }}>WhatsApp: 0115566775</a></div>
              </div>
            </div>
            <div className="foot-col">
              <h4>Car Wash</h4>
              <ul>
                <li><a href="#">Wash Packages</a></li>
                <li><a href="#">Ultimate Wash — KSh 450</a></li>
                <li><a href="#">Pro Wash — KSh 300</a></li>
                <li><a href="#">Lite Wash — KSh 100</a></li>
                <li><a href="#">Freedom Pass — KSh 1,300/wk</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Serenade Wash</a></li>
                <li><a href="#">Sustainability</a></li>
                <li><a href="#">Newsroom</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Giving Back</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Centre</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Locations</a></li>
                <li><a href="#">Book an Appointment</a></li>
                <li><a href="#">Accessibility</a></li>
              </ul>
            </div>
          </div>

          {/* DEVELOPER CREDIT */}
          <div className="dev-credit rv">
            <div className="dev-credit-inner">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://barrackwambura-ec7h.vercel.app/&bgcolor=0a1628&color=00c2e0&margin=8"
                alt="Developer QR Code"
                className="dev-qr"
              />
              <div className="dev-info">
                <div className="dev-label">Designed &amp; Built by</div>
                <a
                  href="https://barrackwambura-ec7h.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="dev-name"
                >
                  Barrack Rabuku
                </a>
                <div className="dev-sub">Scan the QR code to view portfolio</div>
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
            <strong>Join Freedom Pass</strong> — Pro Wash access for a full week at just KSh 1,300. Book today.
          </div>
          <div className="sticky-bar-actions">
            <a href="#" className="btn-primary" style={{ padding: "10px 28px" }}>Join Now</a>
            <button className="bar-dismiss" onClick={() => { setStickyDismissed(true); setShowSticky(false); }}>✕</button>
          </div>
        </div>
      )}
    </>
  );
}
