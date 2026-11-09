"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { features } from "@/lib/content";
import { asset } from "@/lib/assets";
import styles from "./FeatureStack.module.css";
export function FeatureStack() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const cards =
        root.current?.querySelectorAll<HTMLElement>("[data-feature]");
      let nearest = Infinity,
        index = 0;
      cards?.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
        const scale = Math.max(0.62, 1 - (d / window.innerHeight) * 0.38);
        card.style.setProperty("--card-scale", String(scale));
        if (d < nearest) {
          nearest = d;
          index = i;
        }
      });
      setActive(index);
      frame = 0;
    };
    const tick = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", tick, { passive: true });
    return () => {
      window.removeEventListener("scroll", tick);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section
      ref={root}
      className={styles.section}
      id="overview"
      aria-labelledby="features-title"
    >
      <div className={styles.heading}>
        <p className="eyebrow">All features</p>
        <h2 id="features-title">
          One student planner for
          <br />
          the whole school week
        </h2>
      </div>
      <div className={styles.stage}>
        <div className={styles.labels}>
          <span>One student planner</span>
          <span className={styles.current}>{features[active].title}</span>
        </div>
        <div className={styles.cards}>
          {features.map((feature, i) => (
            <a
              key={feature.title}
              data-feature
              href={feature.href}
              className={`${styles.card} ${styles[feature.theme]}`}
              aria-label={`${feature.title}: ${feature.link}`}
            >
              <div className={styles.image}>
                <img
                  src={asset(`/images/${feature.image}`)}
                  alt={`Cubbie character — ${feature.title}`}
                  width="2048"
                  height="1106"
                  loading="lazy"
                />
                <span className={styles.number}>0{i + 1}</span>
              </div>
              <div className={styles.caption}>
                <h3>{feature.title}</h3>
                <div>
                  <p>{feature.description}</p>
                  <span className={styles.link}>
                    {feature.link}
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <p className={styles.note}>
        Cubbie helps you organize, understand and prepare your work. You check
        the information, follow your course rules and submit your own work.
      </p>
      <a className="button" href="https://cubbie.ai/features">
        All features
        <ArrowUpRight size={14} />
      </a>
    </section>
  );
}
