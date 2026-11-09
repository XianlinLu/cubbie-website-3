"use client";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { asset } from "@/lib/assets";
import styles from "./Hero.module.css";
export function Hero({
  onWatch,
  onStart,
}: {
  onWatch: () => void;
  onStart: () => void;
}) {
  const media = useRef<HTMLButtonElement>(null);
  const character = useRef<HTMLDivElement>(null);
  const statement = useRef<HTMLElement>(null);
  useEffect(() => {
    let raf = 0;
    let previous = window.scrollY;
    let direction = 1;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const vw = window.innerWidth;
      const y = window.scrollY;
      if (Math.abs(y - previous) > 0.1) direction = y > previous ? 1 : -1;
      previous = y;
      const wide = vw - 80;
      const initial = (((vw + 16) * (vw < 1430 ? 5 : 4)) / 12) * 0.5625;
      const scale = Math.max(170 / wide, 1 - (y + initial) / (0.5625 * vw));
      const progress = (1 - scale) / (1 - 170 / wide);
      const visibleWidth = wide * scale;
      media.current?.style.setProperty("--media-width", `${visibleWidth}px`);
      media.current?.classList.toggle(styles.mini, visibleWidth < 260);
      if (character.current) {
        character.current.style.left = `${vw - 40 - visibleWidth - vw * 0.25}px`;
        character.current.style.top = `${vw * 0.16 + (visibleWidth * 0.5625) / 2 - (vw * 0.211) / 2 - 2 * progress * vw * 0.1 + Math.min(0, 0.49 * vw - y - initial)}px`;
        character.current.style.visibility =
          y > vw * 0.65 ? "hidden" : "visible";
      }
      statement.current
        ?.querySelectorAll<HTMLElement>("[data-title-line]")
        .forEach((line, index) => {
          const r = line.getBoundingClientRect();
          const distance = innerHeight / 2 - r.top - 0.7 * r.height;
          const travel = Math.min(0, distance / (innerHeight / 2));
          const sign = index % 2 ? -1 : 1;
          line.style.setProperty(
            "--title-x",
            reduced.matches ? "0px" : `${(sign * travel * vw) / 4}px`,
          );
          line.style.setProperty(
            "--title-skew",
            reduced.matches || distance >= 0
              ? "0deg"
              : `${sign * direction * -15}deg`,
          );
          line.classList.toggle(styles.settled, distance >= 0);
        });
      raf = 0;
    };
    const scroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    document.fonts.ready.then(scroll);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <section
        className={styles.hero}
        id="top"
        aria-label="Your schoolwork, connected"
      >
        <div ref={character} className={styles.character}>
          <img
            src={asset("/images/cubbie-red.png")}
            alt="Cubbie character in a red knit hat holding a pink lollipop"
            width="2048"
            height="1106"
            fetchPriority="high"
          />
        </div>
        <div className={styles.intro}>
          <p className="eyebrow">Your schoolwork, connected</p>
          <button className="button yellow" onClick={onStart}>
            Get started
            <ArrowUpRight size={14} />
          </button>
        </div>
        <button
          ref={media}
          className={styles.media}
          onClick={onWatch}
          aria-label="See how Cubbie works"
        >
          <img
            src={asset("/images/cubbie-spotlight.png")}
            alt="Original Cubbie characters beneath blue stage lights"
            width="2048"
            height="1106"
            fetchPriority="high"
          />
          <span className={styles.play}>
            <Play size={20} fill="currentColor" />
            <span>See how it works</span>
          </span>
        </button>
      </section>
      <section
        ref={statement}
        className={styles.statement}
        aria-labelledby="hero-title"
      >
        <p className={styles.overline}>Your schoolwork, connected</p>
        <h1 id="hero-title">
          <span data-title-line className={styles.line}>
            <span className={styles.titleTravel}>
              <span className={styles.titleText}>Student Planner</span>
            </span>
          </span>
          <span data-title-line className={`${styles.line} ${styles.middle}`}>
            <span className={styles.titleTravel}>
              <span className={styles.titleText}>Powered by Your</span>
              <span className={styles.blue}>
                <img
                  src={asset("/images/cubbie-blue.png")}
                  alt=""
                  width="2048"
                  height="1106"
                />
              </span>
            </span>
          </span>
          <span data-title-line className={`${styles.line} ${styles.last}`}>
            <span className={styles.titleTravel}>
              <span className={styles.titleText}>AI School Assistant</span>
              <span className={styles.pink}>
                <img
                  src={asset("/images/cubbie-pink.png")}
                  alt=""
                  width="2048"
                  height="1106"
                />
              </span>
            </span>
          </span>
        </h1>
        <div className={styles.summary}>
          <p>
            Bring assignments, course materials, school email, your calendar and
            reminders into one conversation. Cubbie helps you find what matters,
            see what comes next and stay in charge of your work.
          </p>
          <a className="button" href="#overview">
            All features
            <ArrowDown size={14} />
          </a>
          <small>
            Connect only the accounts you choose. Cubbie asks before it sends an
            email.
          </small>
        </div>
      </section>
    </>
  );
}
