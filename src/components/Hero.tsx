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
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const p = Math.min(1, window.scrollY / 630);
      media.current?.style.setProperty("--progress", String(p));
      media.current?.classList.toggle(styles.mini, p > 0.9);
      raf = 0;
    };
    const scroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
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
        <div className={styles.character}>
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
            src={asset("/images/cubbie-crew.png")}
            alt="Three Cubbie characters in their original outfits"
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
      <section className={styles.statement} aria-labelledby="hero-title">
        <p className={styles.overline}>Your schoolwork, connected</p>
        <h1 id="hero-title">
          <span className={styles.line}>Student Planner</span>
          <span className={`${styles.line} ${styles.middle}`}>
            Powered by Your
            <span className={styles.blue}>
              <img
                src={asset("/images/cubbie-blue.png")}
                alt=""
                width="2048"
                height="1106"
              />
            </span>
          </span>
          <span className={`${styles.line} ${styles.last}`}>
            AI School Assistant
            <span className={styles.pink}>
              <img
                src={asset("/images/cubbie-pink.png")}
                alt=""
                width="2048"
                height="1106"
              />
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
