import { useEffect, useRef } from "react";
import "./Process.css";
import SplitHeading from "../components/SplitHeading";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand your project, design direction and surface requirements before recommending the right solutions.",
  },
  {
    number: "02",
    title: "Select",
    description:
      "Explore carefully selected ceramic surfaces, textures, finishes and formats suited to your space.",
  },
  {
    number: "03",
    title: "Refine",
    description:
      "Compare materials and details with our team to create a cohesive and considered surface palette.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "From selection to final delivery, we focus on dependable service and a smooth experience.",
  },
];

function Process() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("process-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="process-section" id="process" ref={sectionRef}>
      {/* HEADER */}
      <div className="process-header">
        <div>
          <p className="process-label">OUR PROCESS</p>
          <SplitHeading
            tag="h2"
            lines={[
              { text: "From idea" },
              { text: "to space.", italic: true },
            ]}
            className="process-title"
            visibleClass="process-visible"
            baseDelay={100}
            charDelay={40}
            lineGap={80}
          />
        </div>

        <p className="process-intro">
          A considered approach to helping you discover, select and bring the
          right surfaces into your project.
        </p>
      </div>

      {/* PROCESS STEPS */}
      <div className="process-grid">
        {steps.map((step) => (
          <div className="process-item" key={step.number}>
            <div className="process-item-top">
              <span className="process-number">{step.number}</span>
              <span className="process-line" />
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>

      {/* BOTTOM */}
      <div className="process-bottom">
        <span>VED EXIM</span>
        <span>A SIMPLE APPROACH</span>
        <span>01 — 04</span>
      </div>
    </section>
  );
}

export default Process;
