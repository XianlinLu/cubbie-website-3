"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { asset } from "@/lib/assets";
import styles from "./Header.module.css";
const menus = [
  {
    label: "Features",
    links: [
      ["All Features", "#overview"],
      ["Coursework Help", "#coursework"],
      ["Assignment Drafting", "https://cubbie.ai/features/assignment-drafting"],
      [
        "Student Productivity Agent",
        "https://cubbie.ai/features/student-productivity-agent",
      ],
      ["Professor Reviews", "https://cubbie.ai/features/professor-reviews"],
    ],
  },
  {
    label: "Integrations",
    links: [
      ["All Integrations", "#email-calendar"],
      ["Canvas", "#canvas"],
    ],
  },
  {
    label: "Use Cases",
    links: [
      ["All Use Cases", "#week"],
      ["Never Miss a Canvas Deadline", "#canvas"],
      ["Course Planning", "#how-it-works"],
    ],
  },
  {
    label: "Resources",
    links: [
      ["Study Guides", "https://cubbie.ai/blog"],
      ["Questions students ask", "#faq"],
    ],
  },
];
export function Header({ onStart }: { onStart: () => void }) {
  const [compact, setCompact] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [menu, setMenu] = useState<number | null>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const scroll = () => setCompact(window.scrollY > 140);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    const outside = (e: PointerEvent) => {
      if (!nav.current?.contains(e.target as Node)) {
        setMenu(null);
        setExpanded(false);
      }
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setExpanded(false);
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", key);
    };
  }, []);
  return (
    <header className={styles.header}>
      <nav
        ref={nav}
        aria-label="Main"
        className={`${styles.nav} ${compact ? styles.compact : ""} ${expanded ? styles.expanded : ""}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => {
          setExpanded(false);
          setMenu(null);
        }}
      >
        <a href="#top" className={styles.logo} aria-label="Cubbie home">
          <img
            src={asset("/images/cubbie-logo.png")}
            alt="Cubbie"
            width="2109"
            height="745"
          />
        </a>
        <button
          className={styles.mark}
          aria-label="Expand desktop navigation"
          aria-expanded={expanded}
          onClick={() => setExpanded(true)}
        >
          <span className={styles.skull}>
            <img
              src={asset("/images/cubbie-logo.png")}
              alt=""
              width="2109"
              height="745"
            />
          </span>
        </button>
        <div className={styles.items}>
          {menus.map((item, i) => (
            <div
              className={styles.item}
              key={item.label}
              onMouseEnter={() => setMenu(i)}
            >
              <button
                className={styles.navButton}
                aria-expanded={menu === i}
                aria-controls={`nav-menu-${i}`}
                onClick={() => setMenu(i)}
              >
                {item.label}
                <ChevronDown size={10} />
              </button>
              <div
                id={`nav-menu-${i}`}
                className={styles.dropdown}
                hidden={menu !== i}
              >
                {item.links.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => {
                      setMenu(null);
                      setExpanded(false);
                    }}
                  >
                    {label}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
      {compact && (
        <button className={`button yellow ${styles.start}`} onClick={onStart}>
          Get started
          <ArrowUpRight size={14} />
        </button>
      )}
    </header>
  );
}
