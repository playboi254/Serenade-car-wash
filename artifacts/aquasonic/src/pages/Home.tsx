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
  { img: "https://www.aquasoniccarwash.com/wp-content/uploads/2025/07/aquasonic-car-wash-new-port-richey-florida-exterior-600x338.webp", tag: "Grand Launch · Blog", title: "AquaSonic NPR Grand Reopening: What's Happening & When!", date: "30th April 2026" },
  { img: "https://www.aquasoniccarwash.com/wp-content/uploads/2026/04/aquasonic-car-wash-new-port-richey-florida-exterior-800x450-1-600x338.png", tag: "Grand Launch · Blog", title: "AquaSonic TPA Grand Opening: What's Happening & When!", date: "30th April 2026" },
  { img: "https://www.aquasoniccarwash.com/wp-content/uploads/2026/03/aquasonic_new_port_richey_opening_soon_02-1-1-600x234.png", tag: "Grand Launch · Article", title: "AquaSonic Car Wash Announces Grand Opening of Second Location in Tampa, Florida", date: "26th March 2026" },
  { img: "https://www.aquasoniccarwash.com/wp-content/uploads/2025/05/Untitled-design-21-600x338.png", tag: "Grand Launch · Article", title: "Wash Like A Boss, Pay Like A Genius: The AquaSonic Tampa FoundersClub is Now On Sale!", date: "15th December 2025" },
  { img: "https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Woman_out_of_sunroof_viewing_sunset-600x336.webp", tag: "Grand Launch · Article", title: "AquaSonic Car Wash Breaks Ground on Third Florida Location in Orlando", date: "18th November 2025" },
  { img: "https://www.aquasoniccarwash.com/wp-content/uploads/2025/06/AquaSonic_New_Port_Richey_Front_Elevation-600x338.webp", tag: "News Update · Article", title: "New Car Wash, Who Dis? AquaSonic Is Opening in New Port Richey on June 25", date: "12th June 2025" },
  { img: "https://www.aquasoniccarwash.com/wp-content/uploads/2025/05/AquaSonic-New-Port-Richey-Selects-Charity-Partner-1-600x234.webp", tag: "Charity · Article", title: "AquaSonic & Runaways Rescue: Washing Cars, Saving Lives", date: "27th May 2025" },
  { img: "https://www.aquasoniccarwash.com/wp-content/uploads/2025/05/Untitled-design-17-600x338.webp", tag: "Insight · Blog", title: "Is It Safe to Wash My Truck or Soft Top at AquaSonic? Absolutely. Here's Why.", date: "14th May 2025" },
];

const DIFF_CARDS = [
  { ico: "⚗️", label: "Chemistry", title: "Next-Gen Chemistry", desc: "Proprietary nano-tech formulas infused with ceramic and graphene for a finish that lasts far longer than traditional soaps." },
  { ico: "🤖", label: "Technology", title: "Smart Technology", desc: "Our AI-powered wash system reads your vehicle's profile and delivers a precisely calibrated clean, every time." },
  { ico: "💧", label: "Water", title: "Eco-Conscious Water Use", desc: "We reclaim and recycle over 90% of our water. Keeping your car clean shouldn't cost the planet." },
  { ico: "⚡", label: "Speed", title: "Lightning-Fast Service", desc: "From entry to exit in minutes. FreedomPass members get priority lanes for zero wait-time access." },
  { ico: "🌍", label: "Community", title: "Giving Back", desc: "Every wash contributes to our community fund. We partner with local charities to make a difference beyond the drive-through." },
];

const AQUA_RIBBON = ["#fortheloveof", "theroad", "newportrichey", "tampa", "jacksonville", "portstlucie", "lakeworth", "sarasota", "stpete", "bradenton", "orlando", "charleston", "ocoee", "davenport"];
const NAVY_RIBBON = ["smart technology", "smarter chemistry", "unbeatable shine", "america's smartest car wash", "nano-tech regeneration", "ceramic protection", "freedompass™", "ultimawash™"];

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
          <span className="hdr-wordmark">Aqua<span>Sonic</span>™</span>
        </a>

        <nav className="hdr-nav">
          <a href="#">Wash Packages</a>
          <a href="#">FreedomPass™</a>
          <a href="#">Locations</a>
          <div className="has-drop">
            <a href="#">Company</a>
            <div className="drop">
              <a href="#">About AquaSonic</a>
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
        <a href="#" onClick={() => setMobileOpen(false)}>FreedomPass™</a>
        <a href="#" onClick={() => setMobileOpen(false)}>Locations</a>
        <a href="#" onClick={() => setMobileOpen(false)}>About AquaSonic</a>
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
          <h1>Welcome to<br /><em>AquaSonic™</em></h1>
          <p className="hero-sub">America's Smartest Car Wash:<br />Smart technology. Smarter chemistry. Unbeatable shine.</p>
          <div className="hero-ctas">
            <a href="#" className="btn-primary">Memberships</a>
            <a href="#" className="btn-ghost">Locations</a>
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
            Find an AquaSonic car wash near you…<br /><em style={{ color: "var(--aqua)" }}>it's just a click away!</em>
          </h2>
          <p className="sec-sub rv mx-auto t-center" style={{ color: "rgba(255,255,255,.46)", marginTop: "0", marginBottom: "44px" }}>
            Find an AquaSonic™ near you…
          </p>
          <div className="finder-form rv">
            <input type="text" className="finder-input" placeholder="Enter your Zip code" />
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
            <div className="pkg-card featured">
              <div className="pkg-badge">Most Popular</div>
              <div className="pkg-ico">✨</div>
              <div className="pkg-label">UltimaWash™</div>
              <h3 className="pkg-name">UltimaWash™</h3>
              <div className="pkg-sub">Showroom Finish, Ultimate Care</div>
              <p className="pkg-desc">Indulge your vehicle with our most advanced care package. Using nano-tech regeneration powered by ceramic, graphene, and next gen chemistry, the result is a flawless showroom finish. This is the ultimate in car care.</p>
              <a href="#" className="pkg-link">Discover More →</a>
            </div>
            <div className="pkg-card">
              <div className="pkg-ico">🔵</div>
              <div className="pkg-label">ProWash™</div>
              <h3 className="pkg-name">ProWash™</h3>
              <div className="pkg-sub">Deep Clean, Lasting Protection</div>
              <p className="pkg-desc">Experience a thorough clean with added ceramic protection. Includes premium surface treatments and AquaGloss™ tire shine for a long-lasting shine and durable finish.</p>
              <a href="#" className="pkg-link">Discover More →</a>
            </div>
            <div className="pkg-card">
              <div className="pkg-ico">💧</div>
              <div className="pkg-label">LiteWash™</div>
              <h3 className="pkg-name">LiteWash™</h3>
              <div className="pkg-sub">Quick Clean, No Compromise</div>
              <p className="pkg-desc">A fast and effective soap and water wash for when you need a refresh without the frills. Perfect for maintaining your car's appearance on the go. Available at select locations for a limited time.</p>
              <a href="#" className="pkg-link">Discover More →</a>
            </div>
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
              <h2 className="sec-title" style={{ color: "#fff", fontSize: "clamp(2.2rem,4vw,3.3rem)" }}>FreedomPass™</h2>
              <p className="sec-sub" style={{ color: "rgba(255,255,255,.52)" }}>
                Experience the ultimate car care with FreedomPass, AquaSonic's all-inclusive membership package. Enjoy unlimited washes, exclusive perks, and lightning-fast service, all at one unbeatable price. Click through to discover how easy it is to keep your car road-ready, every day.
              </p>
              <a href="#" className="btn-primary" style={{ marginTop: "36px" }}>FreedomPass™</a>
            </div>
            <div className="fp-card rv d2">
              <div className="fp-name">Freedom<span>Pass</span>™</div>
              <div className="fp-tagline">America's Smartest Membership</div>
              <ul className="fp-list">
                <li>Unlimited washes every single day — no caps, no catches</li>
                <li>Lightning-fast service with priority access lanes</li>
                <li>Exclusive member-only perks and seasonal offers</li>
                <li>One unbeatable monthly price — transparent, always</li>
                <li>Ceramic protection and next-gen chemistry included</li>
                <li>Use at any AquaSonic location nationwide</li>
              </ul>
              <a href="#" className="btn-primary">Join FreedomPass™</a>
            </div>
          </div>
        </div>
      </section>

      {/* MEDIA SPLIT */}
      <div className="media-split">
        <div className="media-side">
          <img src="https://www.aquasoniccarwash.com/wp-content/uploads/2024/10/Young_woman_selfie_party-600x338.webp" alt="Joyful Journeys Begin with AquaSonic" loading="lazy" />
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
              <p className="sec-label">Feeling AquaSonic™</p>
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
            </div>
            <div className="phone-wrap rv d3">
              <div className="phone">
                <div className="phone-logo">Aqua<span>Sonic</span>™</div>
                <div className="phone-sub">America's Smartest Car Wash</div>
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
              <h2 className="sec-title">Get the lowdown on our latest news, events,<br /><em>and all things AquaSonic.</em></h2>
              <p className="drag-hint">← Drag to explore →</p>
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
            <p className="sec-label">The AquaSonic Difference</p>
            <h2 className="sec-title">Why America's most passionate<br /><em style={{ color: "var(--aqua)" }}>drivers choose us.</em></h2>
            <p className="sec-sub">Five pillars that set AquaSonic apart from every other car wash on the road.</p>
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
              <div className="foot-logo">Aqua<span>Sonic</span>™</div>
              <p className="foot-tagline">America's Smartest Car Wash. Smart technology. Smarter chemistry. Unbeatable shine. #fortheloveoftheroad</p>
              <div className="socials">
                <a href="#" className="soc">f</a>
                <a href="#" className="soc">in</a>
                <a href="#" className="soc">X</a>
                <a href="#" className="soc">yt</a>
                <a href="#" className="soc">ig</a>
              </div>
            </div>
            <div className="foot-col">
              <h4>Car Wash</h4>
              <ul>
                <li><a href="#">Wash Packages</a></li>
                <li><a href="#">UltimaWash™</a></li>
                <li><a href="#">ProWash™</a></li>
                <li><a href="#">LiteWash™</a></li>
                <li><a href="#">FreedomPass™</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About AquaSonic</a></li>
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
                <li><a href="#">App Download</a></li>
                <li><a href="#">Accessibility</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <div className="foot-copy">© 2026 AquaSonic Car Wash. All rights reserved.</div>
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
            <strong>Join FreedomPass™</strong> — Unlimited washes from just $29.99/mo. First month free for new members.
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
