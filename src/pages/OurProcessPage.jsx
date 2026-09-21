import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OurProcessPage.css";

const processHeroVideo = "/videos/process-hero-01.mp4";

const processSteps = [
  {
    number: "01",
    title: "Raw Materials",
    subtitle: "THE FOUNDATION",
    description:
      "The ceramic journey begins with carefully selected mineral raw materials. Clay, feldspar, quartz, kaolin and other ceramic ingredients are prepared according to the required body and technical characteristics.",
    detail:
      "Material selection influences strength, colour, surface behaviour and final performance.",
    image:
      "https://www.marbizsurfaces.com/public/images/blog/17691677500_Tile-manufacturing-plant-in-Morbi.jpg",
  },
  {
    number: "02",
    title: "Batching & Grinding",
    subtitle: "PRECISION IN COMPOSITION",
    description:
      "The selected raw materials are proportioned and processed to create a consistent ceramic body. Grinding reduces the raw materials to a controlled particle size and produces a homogeneous mixture.",
    detail:
      "Consistent composition is essential for repeatable production and dimensional stability.",
    image:
      "https://www.platinumtiles.in/uploads/infrastructure/o_1bo1pcmav1jnraui19b5ok712lui.jpg",
  },
  {
    number: "03",
    title: "Spray Drying",
    subtitle: "FROM SLIP TO GRANULE",
    description:
      "The prepared ceramic slip is converted into granules with controlled moisture and particle distribution. These granules are designed to flow consistently into the pressing stage.",
    detail:
      "Controlled granulation helps create uniform pressing behaviour across the production line.",
    image:
      "https://www.marbizsurfaces.com/public/images/blog/17691677500_Tile-manufacturing-plant-in-Morbi.jpg",
  },
  {
    number: "04",
    title: "Pressing",
    subtitle: "FORMING THE TILE",
    description:
      "Ceramic granules are compacted under high pressure inside precision moulds. The pressing stage establishes the basic dimensions, density and geometry of the unfired tile.",
    detail:
      "Modern Morbi plants also use advanced pressing systems for large-format ceramic panels and slabs.",
    image:
      "https://storico.b-cdn.net/image/manufacturing-hub.webp",
  },
  {
    number: "05",
    title: "Drying",
    subtitle: "PREPARING FOR THE KILN",
    description:
      "After pressing, the unfired tile contains residual moisture. Controlled drying strengthens the green body and prepares it for decoration and high-temperature firing.",
    detail:
      "Careful drying reduces the risk of deformation and cracking during later thermal processing.",
    image:
      "https://www.thehawk.in/_next/image?q=75&url=https%3A%2F%2Fd2py10ayqu2jji.cloudfront.net%2Fd873dcff-2349-4af5-98c4-03aace2a1452-202601053628759-b54fd020-b014-4827-ad07-4b653d573e7f.jpeg&w=3840",
  },
  {
    number: "06",
    title: "Glazing & Digital Decoration",
    subtitle: "CREATING CHARACTER",
    description:
      "Surface treatments, engobes, glazes and digital decoration are applied to develop the final visual character. Modern digital printing technology can reproduce sophisticated marble, stone and other decorative patterns.",
    detail:
      "Morbi manufacturers use advanced digital decoration systems for detailed graphics and premium surface effects.",
    image:
      "https://m.economictimes.com/thumb/height-450%2Cwidth-600%2Cimgsize-115796%2Cmsid-130903398/employees-work-at-a-ceramic-tile-production-line-at-a-factory-in-morbi.jpg",
  },
  {
    number: "07",
    title: "Kiln Firing",
    subtitle: "TRANSFORMATION THROUGH HEAT",
    description:
      "The decorated tile enters a controlled high-temperature kiln. Thermal processing transforms the pressed body into a strong ceramic product while developing the required surface and technical properties.",
    detail:
      "Kiln temperature, atmosphere and firing cycle are carefully controlled for consistent results.",
    image:
      "https://awsimages.detik.net.id/community/media/visual/2026/03/06/dari-tanah-mentah-hingga-jadi-ubin-aktivitas-pabrik-keramik-di-gujarat-1772799482166_169.jpeg?q=90&w=700",
  },
  {
    number: "08",
    title: "Quality Inspection",
    subtitle: "EVERY DETAIL MATTERS",
    description:
      "Finished tiles are inspected for dimensions, surface appearance, shade, flatness, defects and overall consistency. Automated production and human inspection work together to maintain quality.",
    detail:
      "Inspection ensures that only products meeting the required specifications move forward.",
    image:
      "https://www.thehawk.in/_next/image?q=75&url=https%3A%2F%2Fd2py10ayqu2jji.cloudfront.net%2Fd873dcff-2349-4af5-98c4-03aace2a1452-202601053628759-b54fd020-b014-4827-ad07-4b653d573e7f.jpeg&w=3840",
  },
  {
    number: "09",
    title: "Sorting & Packing",
    subtitle: "READY FOR DELIVERY",
    description:
      "Approved tiles are sorted according to product, shade, size and batch before being securely packed. Packaging protects the finished surfaces during handling, storage and transportation.",
    detail:
      "Careful batch identification helps maintain consistency from production through delivery.",
    image:
      "https://storico.b-cdn.net/image/manufacturing-hub.webp",
  },
  {
    number: "10",
    title: "Dispatch & Logistics",
    subtitle: "FROM MORBI TO THE WORLD",
    description:
      "Once packed, finished products move into the logistics network for domestic distribution or export. Morbi's industrial ecosystem benefits from established road, rail and port connectivity.",
    detail:
      "Ports including Mundra, Kandla and Navlakhi support the region's broader export logistics.",
    image:
      "https://www.marbizsurfaces.com/public/images/blog/17691677500_Tile-manufacturing-plant-in-Morbi.jpg",
  },
];

function OurProcessPage() {
  const [isPageLoading, setIsPageLoading] = useState(() => {
    try {
      const navigation = performance.getEntriesByType("navigation")[0];
      return navigation?.type === "reload";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Always enter the Process page at the top so a previous page's
    // scroll position cannot expose a blank/black transition frame.
    window.scrollTo(0, 0);

    if (!isPageLoading) return undefined;

    document.body.classList.add("process-loader-active");
    const timer = window.setTimeout(() => {
      setIsPageLoading(false);
      document.body.classList.remove("process-loader-active");
    }, 1050);

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("process-loader-active");
    };
  }, [isPageLoading]);
  const [activeStep, setActiveStep] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const updateHeroProgress = () => {
      const hero = document.querySelector(".process-hero");
      if (!hero) return;

      const range = Math.max(1, hero.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / range));
      setHeroProgress(progress);

      const viewport = hero.querySelector(".process-hero-viewport");
      const curtain = hero.querySelector(".process-horizontal-curtain");
      const media = hero.querySelector(".process-hero-media");
      const content = hero.querySelector(".process-hero-content");
      const overlay = hero.querySelector(".process-hero-overlay");

      if (viewport) viewport.style.setProperty("--hero-progress", progress.toFixed(4));
      if (curtain) curtain.style.transform = `translate3d(${progress * 100}%, 0, 0)`;
      if (media) media.style.transform = `scale(${1 + progress * 0.06})`;
      if (content) {
        content.style.transform = `translate3d(0, ${progress * -8}%, 0)`;
        content.style.opacity = String(1 - progress * 0.2);
      }
      if (overlay) overlay.style.opacity = String(1 - progress * 0.12);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        updateHeroProgress();
      });
    };

    updateHeroProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const steps = document.querySelectorAll(".process-stage-card");
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.step);
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.55 }
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);



  return (
    <main className="process-page">
      {isPageLoading && (
        <div className="process-page-loader" aria-label="Loading VED EXIM">
          <div className="process-loader-inner">
            <div className="process-loader-logo-wrap">
              <img
                src="/logo.png"
                alt="VED EXIM"
                className="process-loader-logo"
                onError={(event) => { event.currentTarget.style.display = "none"; }}
              />
              <span className="process-loader-logo-fallback">VED EXIM</span>
            </div>
            <div className="process-loader-progress">
              <span className="process-loader-progress-bar" />
            </div>
            <div className="process-loader-percent">100%</div>
          </div>
        </div>
      )}
      {/* =================================================
          CINEMATIC HERO
      ================================================= */}
      <section className="process-hero">
        <div className="process-hero-viewport">
          <div className="process-hero-media process-hero-video-wrap">
          <video
            className="process-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={processSteps[0].image}
            aria-label="Ceramic tile manufacturing process"
            onError={(event) => event.currentTarget.classList.add("video-failed")}
          >
            <source src={processHeroVideo} type="video/mp4" />
          </video>

          <img
            className="process-hero-fallback"
            src={processSteps[0].image}
            alt="Ceramic manufacturing process"
          />
        </div>

        <div className="process-hero-overlay" />

        <div
          className="process-hero-content"
        >
          <div className="process-hero-kicker">
            <span>OUR PROCESS</span>
            <i />
          </div>

          <h1>
            From Raw Earth
            <br />
            To <em>Refined Surfaces</em>
          </h1>

          <p>
            A journey of precision, technology and craftsmanship.
            Discover how we create premium ceramic tiles that define
            spaces and stand the test of time.
          </p>

          <a className="process-scroll-cue" href="#process-stages">
            <span>SCROLL</span>
            <strong>DOWN</strong>
            <i>↓</i>
          </a>
        </div>

        <div className="process-hero-meta">
          <span>VED EXIM · MORBI · GUJARAT</span>
          <span>10 STAGES</span>
          <span>CRAFT · TECHNOLOGY · PRECISION</span>
        </div>

          <div className="process-hero-progress">
            <span style={{ transform: `scaleX(${Math.max(0.08, heroProgress)})` }} />
          </div>

          <div className="process-horizontal-curtain" aria-hidden="true">
            <div className="process-horizontal-curtain-line" />
            <span>VED EXIM · CERAMIC PROCESS</span>
          </div>
        </div>
      </section>

      {/* =================================================
          INTRO
      ================================================= */}
      <section className="process-intro">
        <div className="process-section-label">
          <span>01</span>
          <p>THE MORBI ECOSYSTEM</p>
        </div>

        <div className="process-intro-grid">
          <h2>
            Where ceramic
            <br />
            <em>becomes an industry.</em>
          </h2>

          <div className="process-intro-copy">
            <p>
              Morbi, Gujarat has evolved into one of India's most important
              ceramic manufacturing clusters.
            </p>
            <p>
              The region brings together raw material suppliers, manufacturers,
              technology providers, designers, skilled workers, packaging and
              logistics into a highly connected production ecosystem.
            </p>
            <p>
              For VED EXIM, this ecosystem means access to a broad world of
              ceramic surfaces and manufacturing capabilities — from everyday
              tiles to sophisticated large-format surfaces.
            </p>
          </div>
        </div>

        <div className="process-stat-grid">
          <div>
            <strong>90%</strong>
            <span>OF INDIA'S CERAMIC TILE PRODUCTION — INDUSTRY ESTIMATE</span>
          </div>
          <div>
            <strong>1,800+</strong>
            <span>MANUFACTURING FACILITIES IN THE MORBI CLUSTER</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>CONTINUOUS INDUSTRIAL PRODUCTION ENVIRONMENT</span>
          </div>
        </div>
      </section>

      {/* =================================================
          PROCESS STAGES
      ================================================= */}
      <section className="process-stages" id="process-stages">
        <div className="process-stages-heading">
          <div>
            <div className="process-section-label process-section-label-dark">
              <span>02</span>
              <p>THE JOURNEY</p>
            </div>
            <h2>
              Ten stages.
              <br />
              <em>One surface.</em>
            </h2>
          </div>

          <p>
            Every finished ceramic surface is the result of a sequence of
            controlled processes. Explore each stage below.
          </p>
        </div>

        <div className="process-stage-line">
          <span style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }} />
        </div>

        <div className="process-stage-grid">
          {processSteps.map((step, index) => (
            <article
              className={`process-stage-card ${index === activeStep ? "is-active" : ""}`}
              data-step={index}
             
              key={step.number}
            >
              <div className="process-stage-card-top">
                <span className="process-stage-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.subtitle}</p>
                </div>
              </div>

              <div className="process-stage-image">
                <img
                  src={step.image}
                  alt={`${step.title} in ceramic manufacturing`}
                  loading={index < 4 ? "eager" : "lazy"}
                />
                <span className="process-image-arrow">↗</span>
              </div>

              <p className="process-stage-description">{step.description}</p>

              <div className="process-stage-detail">
                <span>DETAIL</span>
                <p>{step.detail}</p>
              </div>

              <div className="process-stage-footer">
                <span>STAGE {step.number}</span>
                <span>VED EXIM · MORBI</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =================================================
          TECHNOLOGY
      ================================================= */}
      <section className="process-technology">
        <div className="process-technology-image">
          <img
            src="https://www.marbizsurfaces.com/public/images/blog/17691677500_Tile-manufacturing-plant-in-Morbi.jpg"
            alt="Modern ceramic production line in Morbi"
            loading="lazy"
          />
        </div>

        <div className="process-technology-content">
          <div className="process-section-label">
            <span>03</span>
            <p>TECHNOLOGY & PRECISION</p>
          </div>
          <h2>
            Craftsmanship,
            <br />
            <em>scaled by technology.</em>
          </h2>
          <p>
            Modern Morbi manufacturing combines industrial automation with
            highly controlled ceramic processes. Digital decoration, advanced
            pressing, automated handling and sophisticated glazing systems
            allow manufacturers to create increasingly detailed and large-format
            surfaces.
          </p>
          <p>
            The result is a production environment where consistency, design
            flexibility and scale can work together.
          </p>
        </div>
      </section>

      {/* =================================================
          QUALITY
      ================================================= */}
      <section className="process-quality">
        <div className="process-section-label">
          <span>04</span>
          <p>QUALITY AT EVERY STAGE</p>
        </div>

        <div className="process-quality-grid">
          <h2>
            Detail is not
            <br />
            <em>the final step.</em>
          </h2>

          <div className="process-quality-list">
            {[
              ["01", "Material consistency", "Controlled raw material composition supports repeatable production."],
              ["02", "Dimensional accuracy", "Pressing, drying and firing are carefully controlled to maintain product consistency."],
              ["03", "Surface quality", "Decoration, glaze and finishing stages define the visual character."],
              ["04", "Final inspection", "Finished products are checked before sorting, packing and dispatch."],
            ].map(([number, title, text]) => (
              <div key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          CTA
      ================================================= */}
      <section className="process-cta">
        <p className="process-eyebrow">VED EXIM</p>
        <h2>
          Know the process.
          <br />
          <em>Choose with confidence.</em>
        </h2>
        <p>
          Explore our collections or speak with the VED EXIM team about your
          next project.
        </p>

        <div className="process-cta-links">
          <Link to="/collections">
            EXPLORE COLLECTIONS <span>↗</span>
          </Link>
          <Link to="/contact">
            START AN ENQUIRY <span>↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default OurProcessPage;
